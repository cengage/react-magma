#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: audit-cross-track-fixes.sh [options]

Compare fix commits between two React Magma integration branches. Defaults to the
two active tracks (v7 origin/dev and v6 origin/v6/dev). Unmatched commits are
review candidates, not proof that a port is required.

Options:
  --a-ref REF           first integration ref (default: origin/dev)
  --b-ref REF           second integration ref (default: origin/v6/dev)
  --since YYYY-MM-DD    show source fixes committed on or after this date
  --include-matched     also list fixes matched by patch, PR number, or subject
  -h, --help            show this help
EOF
}

track_label() {
  case "$1" in
    origin/dev | dev) echo "v7" ;;
    origin/v6/dev | v6/dev) echo "v6" ;;
    origin/v5/dev | v5/dev) echo "v5" ;;
    origin/v4/dev | v4/dev) echo "v4" ;;
    *) echo "$1" ;;
  esac
}

a_ref="origin/dev"
b_ref="origin/v6/dev"
since_date=""
include_matched="0"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --a-ref)
      [[ $# -ge 2 ]] || { usage >&2; exit 2; }
      a_ref="$2"
      shift 2
      ;;
    --b-ref)
      [[ $# -ge 2 ]] || { usage >&2; exit 2; }
      b_ref="$2"
      shift 2
      ;;
    --since)
      [[ $# -ge 2 ]] || { usage >&2; exit 2; }
      since_date="$2"
      shift 2
      ;;
    --include-matched)
      include_matched="1"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "error: unknown option: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

if [[ -n "$since_date" && ! "$since_date" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
  echo "error: --since must use YYYY-MM-DD" >&2
  exit 2
fi

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

for ref in "$a_ref" "$b_ref"; do
  if ! git rev-parse --verify --quiet "${ref}^{commit}" >/dev/null; then
    echo "error: missing ref $ref; run git fetch origin" >&2
    exit 1
  fi
done

a_label="$(track_label "$a_ref")"
b_label="$(track_label "$b_ref")"

common_base="$(git merge-base "$a_ref" "$b_ref")"
tmp_dir="$(mktemp -d "/tmp/react-magma-fix-audit.XXXXXX")"
cleanup() {
  rm -rf "$tmp_dir"
}
trap cleanup EXIT

echo "React Magma cross-track fix audit"
echo "$a_label: $a_ref ($(git rev-parse --short "$a_ref"))"
echo "$b_label: $b_ref ($(git rev-parse --short "$b_ref"))"
echo "common base: $(git rev-parse --short "$common_base")"
if [[ -n "$since_date" ]]; then
  echo "source commit date filter: $since_date or later"
else
  echo "source commit date filter: full branch divergence"
fi

audit_direction() {
  local source_label="$1"
  local source_ref="$2"
  local target_label="$3"
  local target_ref="$4"
  local file_prefix="$tmp_dir/${source_label}-to-${target_label}"

  git cherry -v "$target_ref" "$source_ref" "$common_base" \
    >"${file_prefix}.cherry"
  git log --format='%H%x09%cs%x09%s' "$source_ref" \
    >"${file_prefix}.source-log"
  git log --format='%H%x09%cs%x09%s' "$target_ref" \
    >"${file_prefix}.target-log"

  node - \
    "$source_label" \
    "$target_label" \
    "$since_date" \
    "$include_matched" \
    "${file_prefix}.cherry" \
    "${file_prefix}.source-log" \
    "${file_prefix}.target-log" <<'NODE'
const fs = require('fs');

const [
  sourceLabel,
  targetLabel,
  sinceDate,
  includeMatched,
  cherryPath,
  sourceLogPath,
  targetLogPath,
] = process.argv.slice(2);

function readLog(path) {
  const commits = new Map();
  const raw = fs.readFileSync(path, 'utf8').trim();

  if (!raw) return commits;

  for (const line of raw.split('\n')) {
    const [sha, date, ...subjectParts] = line.split('\t');
    commits.set(sha, { sha, date, subject: subjectParts.join('\t') });
  }

  return commits;
}

function isFix(subject) {
  return (
    /^(?:v[0-9]+\/)?(?:fix|hotfix|bugfix)(?:\([^)]*\))?[!:]/i.test(subject) ||
    /^revert\b.*\bfix(?:\b|\(|:)/i.test(subject)
  );
}

function prNumbers(subject) {
  return [...subject.matchAll(/#([0-9]+)/g)].map(match => match[1]);
}

function normalizeSubject(subject) {
  let normalized = subject.trim().toLowerCase().replace(/^v[0-9]+\//, '');

  while (/\s+\(#[0-9]+\)\s*$/.test(normalized)) {
    normalized = normalized.replace(/\s+\(#[0-9]+\)\s*$/, '');
  }

  return normalized.replace(/\s+/g, ' ');
}

const sourceCommits = readLog(sourceLogPath);
const targetCommits = [...readLog(targetLogPath).values()];
const targetByPr = new Map();
const targetBySubject = new Map();

for (const commit of targetCommits) {
  for (const pr of prNumbers(commit.subject)) {
    if (!targetByPr.has(pr)) targetByPr.set(pr, commit);
  }

  const normalized = normalizeSubject(commit.subject);
  if (!targetBySubject.has(normalized)) {
    targetBySubject.set(normalized, commit);
  }
}

const candidates = [];
const cherryRaw = fs.readFileSync(cherryPath, 'utf8').trim();

if (cherryRaw) {
  for (const line of cherryRaw.split('\n')) {
    const match = line.match(/^([+-]) ([0-9a-f]+) (.*)$/);
    if (!match) continue;

    const [, patchStatus, sha, fallbackSubject] = match;
    const commit = sourceCommits.get(sha) || {
      sha,
      date: '',
      subject: fallbackSubject,
    };

    if (!isFix(commit.subject)) continue;
    if (sinceDate && commit.date < sinceDate) continue;

    let matchedBy = '';
    let targetCommit;

    if (patchStatus === '-') {
      matchedBy = 'patch identity';
    } else {
      for (const pr of prNumbers(commit.subject)) {
        if (targetByPr.has(pr)) {
          matchedBy = `shared PR #${pr}`;
          targetCommit = targetByPr.get(pr);
          break;
        }
      }

      if (!matchedBy) {
        targetCommit = targetBySubject.get(normalizeSubject(commit.subject));
        if (targetCommit) matchedBy = 'normalized subject';
      }
    }

    candidates.push({ ...commit, matchedBy, targetCommit });
  }
}

const unmatched = candidates.filter(candidate => !candidate.matchedBy);
const matched = candidates.filter(candidate => candidate.matchedBy);

console.log(`\n${sourceLabel} fixes to review against ${targetLabel}`);
console.log(`candidates: ${candidates.length}; unmatched: ${unmatched.length}; matched: ${matched.length}`);

if (unmatched.length === 0) {
  console.log('No unmatched fix candidates.');
} else {
  console.log('\nUnmatched candidates:');
  for (const commit of unmatched) {
    console.log(`- ${commit.sha.slice(0, 10)} ${commit.date} ${commit.subject}`);
  }
}

if (includeMatched === '1' && matched.length > 0) {
  console.log('\nHeuristic matches:');
  for (const commit of matched) {
    const target = commit.targetCommit
      ? ` -> ${commit.targetCommit.sha.slice(0, 10)}`
      : '';
    console.log(
      `- ${commit.sha.slice(0, 10)} ${commit.date} ${commit.subject} [${commit.matchedBy}${target}]`
    );
  }
}
NODE
}

audit_direction "$a_label" "$a_ref" "$b_label" "$b_ref"
audit_direction "$b_label" "$b_ref" "$a_label" "$a_ref"

echo
echo "Classify every unmatched candidate as required, already ported, superseded, or track-specific."
