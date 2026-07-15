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

if [[ "$track" == "v4" ]]; then
  echo "warning: confirm the approved v4 stable npm dist-tag before merging;" >&2
  echo "the current unified workflow does not explicitly set v4-latest" >&2
fi

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

echo
echo "Generated changelog order:"
while IFS= read -r changelog; do
  [[ -z "$changelog" ]] && continue
  echo "$changelog"
  awk '/^## [0-9]+\.[0-9]+\.[0-9]+($| )/ { print "  " $0; count++ } count == 2 { exit }' \
    "$tmp_dir/$changelog"
done < <(git -C "$tmp_dir" diff --name-only -- '*CHANGELOG.md' | sort)

echo
echo "Generated release files:"
git -C "$tmp_dir" status --short
