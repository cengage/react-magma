# React Magma Release Checklist

Use this checklist after selecting v5 or v4 in `SKILL.md`. Run commands from the
repository root.

## Source Priority

When instructions disagree, use this order:

1. Current `.github/workflows/publish.yml`, package scripts, Changesets config,
   and branch contents.
2. `AGENTS.md` and checked-in OpenWiki documentation. When the selected track
   does not contain these files, read them from `origin/dev` as policy context,
   then verify commands and configuration against the selected track.
3. GitHub wiki pages `Releasing React Magma` and
   `React Magma V5 Branching Strategy`.

The GitHub wiki may describe older split workflows. The current repository uses
one publish workflow triggered by `dev`, `main`, `v4/dev`, and `v4/main`.

## Track Matrix

| Track | Integration | Stable | Current pre tag | Stable PR target |
| --- | --- | --- | --- | --- |
| v5 | `origin/dev` | `origin/main` | inspect; currently `rc` | `main` |
| v4 | `origin/v4/dev` | `origin/v4/main` | inspect; currently `next` | `v4/main` |

Do not infer npm dist-tags from branch names. Inspect the workflow and npm state.
For v4, verify that publishing cannot move the package's default `latest` tag
back to a v4 version. Stop and obtain an approved workflow/tag fix if this is not
explicitly guaranteed.

## 1. Refresh And Branch

```bash
git fetch origin
git status --short --branch
```

Require a clean worktree. For v5:

```bash
git switch --detach origin/main
git switch -c build/releaseX.Y.Z
git merge origin/dev
```

For v4, replace `origin/main`/`origin/dev` with
`origin/v4/main`/`origin/v4/dev`.

Never push the stable branch while resolving a release. A push triggers publish.

## 2. Audit Fix Parity Across V5 And V4

Run the two-way audit after fetching both integration branches:

```bash
.agents/skills/release-react-magma/scripts/audit-cross-track-fixes.sh
```

The script scans fix commits on both sides of the v5/v4 branch divergence. It
recognizes exact patch equivalents, shared PR numbers, and normalized matching
subjects. These are heuristics: an unmatched commit is a review candidate, not
proof that a fix is missing, and a heuristic match still needs a quick
applicability check.

For every unmatched candidate in both directions:

1. Read the source diff, changeset or changelog entry, tests, and linked PR.
2. Check whether the affected package and behavior exist on the target track.
3. Record exactly one disposition in the release PR:
   - required: port it in a focused PR to the target integration branch;
   - already ported: cite the target commit or PR the heuristic missed;
   - superseded: cite the target change that replaced it;
   - track-specific: explain the React, dependency, or architecture difference.
4. For required ports, preserve adopter behavior rather than copying code
   mechanically, add the target track's changeset and tests, and rerun the audit.

Use `--since YYYY-MM-DD` only as a supplementary focused view; the release gate
uses the default full-divergence audit. Use `--include-matched` when validating
why the script considered a fix present. Do not proceed with an unclassified
candidate or a required fix that has not reached its integration branch.

## 3. Prove Branch Completeness

Verify the stable and integration refs are ancestors of the release branch. A
successful command has exit code zero:

```bash
git merge-base --is-ancestor <stable-ref> HEAD
git merge-base --is-ancestor <integration-ref> HEAD
```

Review package differences from integration:

```bash
git diff --name-status <integration-ref>..HEAD -- packages
```

Expected differences are versions, changelog cleanup, lockfile-related package
metadata, or explicitly approved release fixes. If exact integration source is
required, all source and test files must match integration byte-for-byte.

## 4. Reconcile Changesets And Adopter Copy

List and read every changeset:

```bash
find .changeset -maxdepth 1 -type f -name '*.md' -print | sort
npx changeset status --verbose
```

For each file, verify:

- Frontmatter names every affected published package and no unrelated package.
- `patch`, `minor`, or `major` matches adopter impact.
- Summary names the component/API and observable outcome.
- Public options use exact spelling, such as `chartToolbar.titleLevel`.
- New options state relevant defaults or accepted values when that helps adopters.
- Summary reads as release notes, not an internal commit log or implementation
  note.
- Docs and release infrastructure follow the ownership rules in `AGENTS.md`.
- The same adopter change is not represented twice.

Find release-window changesets by comparing stable and integration. Treat files
already present unchanged on stable as candidates already consumed by a prior
release; verify history before deleting them. Do not delete a file merely because
it is absent from `pre.json.changesets`: it may have been added after the latest
prerelease and still needs release.

## 5. Validate Prerelease State

Require `.changeset/pre.json` with `mode: pre`. Compare every
`initialVersions` entry to the corresponding package version on the stable ref.
The initial versions are stable baselines, not current RC/next versions.

Inspect package versions independently. DOM, Charts, Dropzone, docs, and landing
do not necessarily advance together. For example, a DOM minor and Charts minor
can release as `5.1.0` and `14.1.0` while Dropzone remains unchanged.

Do not commit the output of `version:exit` or `version:pkgs` to the release
branch. The stable publish workflow performs those steps after merge.

## 6. Clean Changelogs

Before the dry run, each package changelog should begin with the latest stable
release. Remove accumulated RC/next sections for the pending release, but retain
all stable sections and their content.

After the dry run, require this order:

```text
new stable version
previous stable version
older stable versions
```

Reject duplicate headings, prerelease headings between the two stable versions,
missing prior stable history, or entries scoped to the wrong package.

Read the complete generated section as an adopter. Rewrite any vague, redundant,
misleading, or overly internal entry and rerun the dry run before approval.

## 7. Lockfile And Tests

Use the repository-pinned Node and npm versions. Run:

```bash
npm ci --legacy-peer-deps
```

If npm reports manifests and lockfile are out of sync:

```bash
npm install --package-lock-only --legacy-peer-deps
git diff -- package-lock.json
npm ci --legacy-peer-deps
```

Do not accept unrelated dependency churn. Then run the complete checks required
by `AGENTS.md`, including compiler checks, lint, tests, and build.

## 8. Stable Dry Run

Commit release-preparation changes first, then run:

```bash
.agents/skills/release-react-magma/scripts/dry-run-release.sh <v5|v4>
```

The script clones the committed release state into `/tmp`, exits prerelease mode,
versions packages, and prints generated versions and the first two stable
changelog headings. It never publishes and never modifies the working tree.

Review all generated changelog additions, dependency bumps, and package versions.
Changesets may print prerelease peer-range warnings that disappear for the stable
version; confirm the final stable range actually satisfies the dependency before
accepting such a warning.

## 9. Merge And Verify Publish

Open the PR from the release branch to the selected stable branch. After approval
and green CI, merge once. Wait for the publish workflow to finish before syncing.

Verify:

- Exact npm package versions and intended dist-tags.
- Git tags and the stable branch's generated version commit.
- New changelog sections.
- Versioned docs and Storybook deployment.
- No second workflow run is unintentionally publishing duplicate versions.

After verification, generate the copy-ready team-channel message using
`references/slack-message.md`. Derive versions and highlights from the published
artifacts, not from prerelease package files.

## 10. Sync Stable Back To Integration

Do this manually before new integration PRs merge. Do not wait for or rely on the
repository's sync automation; it is known to fail.

For v5, start from `dev` and merge `main`; target `dev`. For v4, start from
`v4/dev` and merge `v4/main`; target `v4/dev`.

During conflict resolution:

- Keep published stable package versions and stable changelog sections.
- Apply deletion of changesets consumed by the stable version commit.
- Preserve only genuinely newer integration work; normally none should land
  during the release/sync window.
- Do not restore stale prerelease package versions or stale `pre.json` content.

After the sync merges, verify the integration publish workflow recreates
`.changeset/pre.json` and uses the track's expected prerelease tag. Confirm the
stable commit is now an ancestor of integration:

```bash
git merge-base --is-ancestor origin/main origin/dev
git merge-base --is-ancestor origin/v4/main origin/v4/dev
```

Only reopen integration for feature PRs after this verification passes.
