#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: dry-run-release.sh <v5|v4> [release-ref]

Dry-runs React Magma stable versioning from a clean, committed release ref.
The default release ref is HEAD. Nothing is published or changed in the source
worktree. Set KEEP_DRY_RUN=1 to retain the temporary clone.
EOF
}

if [[ $# -lt 1 || $# -gt 2 ]]; then
  usage >&2
  exit 2
fi

track="$1"
release_ref="${2:-HEAD}"

case "$track" in
  v5)
    stable_ref="origin/main"
    integration_ref="origin/dev"
    ;;
  v4)
    stable_ref="origin/v4/main"
    integration_ref="origin/v4/dev"
    ;;
  *)
    usage >&2
    exit 2
    ;;
esac

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "error: worktree is dirty; commit release preparation before dry-run" >&2
  exit 1
fi

for ref in "$release_ref" "$stable_ref" "$integration_ref"; do
  if ! git rev-parse --verify --quiet "${ref}^{commit}" >/dev/null; then
    echo "error: missing ref $ref; run git fetch origin" >&2
    exit 1
  fi
done

release_commit="$(git rev-parse "${release_ref}^{commit}")"

if [[ "$track" == "v4" ]]; then
  publish_workflow="$(git show "$release_commit:.github/workflows/publish.yml")"
  if [[ "$publish_workflow" != *"npm run release -- --tag v4-latest"* ]]; then
    echo "error: v4 stable publishing is not pinned to the v4-latest npm dist-tag" >&2
    exit 1
  fi
fi

if ! git merge-base --is-ancestor "$stable_ref" "$release_commit"; then
  echo "error: $stable_ref is not an ancestor of $release_ref" >&2
  exit 1
fi

if ! git merge-base --is-ancestor "$integration_ref" "$release_commit"; then
  echo "error: $integration_ref is not an ancestor of $release_ref" >&2
  exit 1
fi

changeset_bin="$repo_root/node_modules/.bin/changeset"
if [[ ! -x "$changeset_bin" ]]; then
  echo "error: $changeset_bin is missing; run npm ci --legacy-peer-deps" >&2
  exit 1
fi

tmp_dir="$(mktemp -d "/tmp/react-magma-${track}-release.XXXXXX")"
cleanup() {
  if [[ "${KEEP_DRY_RUN:-0}" == "1" ]]; then
    echo "Temporary clone retained at: $tmp_dir"
  else
    rm -rf "$tmp_dir"
  fi
}
trap cleanup EXIT

git clone --no-hardlinks --quiet "$repo_root" "$tmp_dir"
git -C "$tmp_dir" checkout --detach --quiet "$release_commit"
ln -s "$repo_root/node_modules" "$tmp_dir/node_modules"

if [[ ! -f "$tmp_dir/.changeset/pre.json" ]]; then
  echo "error: release ref is not in Changesets prerelease mode" >&2
  exit 1
fi

release_pre_tag="$(node -e '
  const pre = require(process.argv[1]);
  process.stdout.write(pre.tag || "");
' "$tmp_dir/.changeset/pre.json")"
integration_pre_tag="$(git show "$integration_ref:.changeset/pre.json" | node -e '
  let raw = "";
  process.stdin.on("data", chunk => (raw += chunk));
  process.stdin.on("end", () => process.stdout.write(JSON.parse(raw).tag || ""));
')"

if [[ -z "$release_pre_tag" || "$release_pre_tag" != "$integration_pre_tag" ]]; then
  echo "error: prerelease tag mismatch: release=$release_pre_tag integration=$integration_pre_tag" >&2
  exit 1
fi

echo "Prerelease mode: $release_pre_tag"

pre_versions="$tmp_dir/pre-versions.tsv"
stable_versions="$tmp_dir/stable-versions.tsv"

node - "$tmp_dir/.changeset/pre.json" >"$pre_versions" <<'NODE'
const fs = require('fs');

const prePath = process.argv[2];
const pre = JSON.parse(fs.readFileSync(prePath, 'utf8'));

if (pre.mode !== 'pre') {
  throw new Error(`expected pre.json mode "pre", found "${pre.mode}"`);
}

for (const [name, initialVersion] of Object.entries(pre.initialVersions || {})) {
  console.log(`${name}\t${initialVersion}`);
}
NODE

while IFS= read -r package_path; do
  [[ "$package_path" =~ ^(packages|website|patterns|tests)/[^/]+/package.json$ ]] || continue
  git show "$stable_ref:$package_path" | node -e '
    let raw = "";
    process.stdin.on("data", chunk => (raw += chunk));
    process.stdin.on("end", () => {
      const pkg = JSON.parse(raw);
      process.stdout.write(`${pkg.name}\t${pkg.version}\n`);
    });
  '
done < <(git ls-tree -r --name-only "$stable_ref") >"$stable_versions"

declare -A stable_version_by_name=()
while IFS=$'\t' read -r package_name package_version; do
  stable_version_by_name["$package_name"]="$package_version"
done <"$stable_versions"

baseline_errors=()
while IFS=$'\t' read -r package_name initial_version; do
  stable_version="${stable_version_by_name[$package_name]:-}"
  if [[ -n "$stable_version" && "$stable_version" != "$initial_version" ]]; then
    baseline_errors+=(
      "$package_name: pre.json=$initial_version, $stable_ref=$stable_version"
    )
  fi
done <"$pre_versions"

if (( ${#baseline_errors[@]} )); then
  echo "error: prerelease baselines do not match stable:" >&2
  printf '  %s\n' "${baseline_errors[@]}" >&2
  exit 1
fi

echo "Prerelease baselines match stable package versions."
rm -f "$pre_versions" "$stable_versions"

echo
echo "Package source differences from $integration_ref:"
source_diff="$(git diff --name-only "$integration_ref..$release_commit" -- packages \
  ':(exclude)packages/*/package.json' \
  ':(exclude)packages/*/CHANGELOG.md')"
if [[ -n "$source_diff" ]]; then
  printf '%s\n' "$source_diff"
  echo "Review every listed file; release source is not identical to integration."
else
  echo "none"
fi

(
  cd "$tmp_dir"
  "$changeset_bin" pre exit
  "$changeset_bin" version
)

echo
echo "Generated package versions:"
node - "$tmp_dir" <<'NODE'
const fs = require('fs');
const path = require('path');

const root = process.argv[2];
for (const group of ['packages', 'website', 'patterns', 'tests']) {
  const groupPath = path.join(root, group);
  if (!fs.existsSync(groupPath)) continue;
  for (const entry of fs.readdirSync(groupPath).sort()) {
    const packagePath = path.join(groupPath, entry, 'package.json');
    if (!fs.existsSync(packagePath)) continue;
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    console.log(`${pkg.name}: ${pkg.version}`);
  }
}
NODE

if [[ "$track" == "v4" ]]; then
  node - "$tmp_dir" <<'NODE'
const fs = require('fs');
const path = require('path');

const root = process.argv[2];
const expectedMajors = {
  '@react-magma/charts': 13,
  '@react-magma/dropzone': 13,
  'react-magma-dom': 4,
};
const packagePaths = {
  '@react-magma/charts': 'packages/charts/package.json',
  '@react-magma/dropzone': 'packages/dropzone/package.json',
  'react-magma-dom': 'packages/react-magma-dom/package.json',
};

for (const [name, expectedMajor] of Object.entries(expectedMajors)) {
  const packagePath = path.join(root, packagePaths[name]);
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const actualMajor = Number(pkg.version.split('.')[0]);

  if (actualMajor !== expectedMajor) {
    throw new Error(
      `v4 compatibility requires ${name} ${expectedMajor}.x, generated ${pkg.version}`
    );
  }
}

for (const name of ['@react-magma/charts', 'react-magma-dom']) {
  const packagePath = path.join(root, packagePaths[name]);
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const reactPeer = pkg.peerDependencies && pkg.peerDependencies.react;

  if (!reactPeer || !/(^|[^0-9])17([^0-9]|$)/.test(reactPeer)) {
    throw new Error(
      `v4 compatibility requires ${name} to retain a React 17 peer range, found ${reactPeer || 'none'}`
    );
  }
}

for (const [name, relativePath] of Object.entries(packagePaths)) {
  const packagePath = path.join(root, relativePath);
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  for (const field of [
    'dependencies',
    'devDependencies',
    'optionalDependencies',
    'peerDependencies',
  ]) {
    for (const [dependency, range] of Object.entries(pkg[field] || {})) {
      if (
        (dependency.startsWith('@react-magma/') || dependency === 'react-magma-dom') &&
        typeof range === 'string' &&
        range.includes('-next.')
      ) {
        throw new Error(
          `stable ${name} retains prerelease dependency ${dependency}@${range} in ${field}`
        );
      }
    }
  }
}

console.log('v4 compatibility: DOM 4.x, Charts 13.x, Dropzone 13.x, React 17 peers.');
NODE
fi

echo
echo "Generated changelog order:"
changelog_order_errors=()
while IFS= read -r changelog; do
  [[ -z "$changelog" ]] && continue
  echo "$changelog"
  mapfile -t stable_headings < <(
    awk '/^## [0-9]+\.[0-9]+\.[0-9]+($| )/ { print; count++ } count == 2 { exit }' \
      "$tmp_dir/$changelog"
  )
  printf '  %s\n' "${stable_headings[@]}"

  duplicate_stable_headings="$(
    awk '
      /^## [0-9]+\.[0-9]+\.[0-9]+($| )/ { counts[$0]++ }
      END { for (heading in counts) if (counts[heading] > 1) print heading }
    ' "$tmp_dir/$changelog" | sort
  )"
  if [[ -n "$duplicate_stable_headings" ]]; then
    changelog_order_errors+=(
      "$changelog: duplicate stable headings: ${duplicate_stable_headings//$'\n'/, }"
    )
  fi

  previous_stable_heading="$(
    git show "$stable_ref:$changelog" | \
      awk '!found && /^## [0-9]+\.[0-9]+\.[0-9]+($| )/ { print; found = 1 }'
  )"
  if [[ ${#stable_headings[@]} -lt 2 || \
    "${stable_headings[1]}" != "$previous_stable_heading" ]]; then
    changelog_order_errors+=("$changelog: expected second stable heading $previous_stable_heading")
  fi
done < <(git -C "$tmp_dir" diff --name-only -- '*CHANGELOG.md' | sort)

if (( ${#changelog_order_errors[@]} )); then
  echo "error: generated changelog order is invalid:" >&2
  printf '  %s\n' "${changelog_order_errors[@]}" >&2
  exit 1
fi

echo
echo "Generated release files:"
git -C "$tmp_dir" status --short --untracked-files=no
