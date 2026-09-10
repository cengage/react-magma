---
name: release-react-magma
description: Prepare, audit, dry-run, and complete React Magma stable releases for the v5 (`dev` to `main`) or v4 (`v4/dev` to `v4/main`) tracks. Use when Codex is asked to compare fixes across v5 and v4, identify backport or forward-port candidates, open or review a release branch, reconcile Changesets prerelease state, predict package versions and changelogs, fix release lockfiles, validate publishing readiness, or synchronize stable branches back into their development branches after release.
---

# Release React Magma

Prepare releases without pushing directly to a stable branch. Treat a push to
`main` or `v4/main` as a production publishing action.

## Establish The Track

1. Read `AGENTS.md`, `openwiki/quickstart.md`, and the release section in
   `openwiki/workflows/contributing-and-tooling.md`. If the selected branch does
   not contain them, read them from `origin/dev` as policy context and verify
   every command and configuration claim against the selected branch.
2. Read `references/release-checklist.md` in this skill.
3. Fetch `origin` before comparing branches.
4. Select exactly one track:
   - v5: integration `dev`, stable `main`.
   - v4: integration `v4/dev`, stable `v4/main`.
5. Inspect `.github/workflows/publish.yml`, root `package.json`,
   `.changeset/config.json`, `.changeset/pre.json`, and `lerna.json` on the
   selected refs. Repository configuration overrides stale wiki descriptions.
6. Run `scripts/audit-cross-track-fixes.sh` and classify every unmatched fix in
   both directions as required, already ported, superseded, or track-specific.
   Block the release on unclassified or required-but-unported fixes.
7. For v4, block release until the intended npm stable dist-tag is confirmed.
   The wiki names `v4-latest`, but the unified workflow may not configure it.

## Prepare The Release Branch

Create `build/releaseX.Y.Z` from the stable branch, then merge the integration
branch. Never reconstruct integration by copying selected package files.

Verify both ancestors:

```bash
git merge-base --is-ancestor origin/main HEAD       # v5 stable
git merge-base --is-ancestor origin/dev HEAD        # v5 integration
git merge-base --is-ancestor origin/v4/main HEAD    # v4 stable
git merge-base --is-ancestor origin/v4/dev HEAD     # v4 integration
```

Compare package source against integration. Investigate every difference beyond
release metadata; do not silently retain release-only source changes.

## Audit Release Metadata

Apply these invariants:

- Keep the release branch in prerelease mode. The stable workflow runs
  `version:exit`; do not commit generated stable versions during preparation.
- Ensure `pre.json.initialVersions` equals the package versions on the selected
  stable branch. Do not inherit obsolete baselines from older release lines.
- Derive the prerelease tag from the selected integration branch. Current v5
  uses `rc`; current v4 uses `next`.
- Determine stable versions from all changesets. Changesets flatten multiple
  bumps per package to the highest requested semver bump.
- Scope each changeset to the package containing the published change. Follow
  `AGENTS.md` for docs and release-infrastructure ownership.
- Write summaries for adopters: name the component or public option and describe
  observable behavior. Avoid vague text such as "small fixes" or implementation
  shorthand such as "dedupe."
- Remove only changesets already consumed by a prior stable release. Keep files
  introduced or changed since the selected stable branch, including changesets
  added after the latest prerelease.
- Remove unreleased prerelease sections from package changelogs while preserving
  complete stable history. Stable versioning will create the new top section.
- Keep package manifests and `package-lock.json` synchronized. If `npm ci
  --legacy-peer-deps` reports `EUSAGE`, update only the lockfile, review the diff,
  and rerun the exact clean install.

## Curate Adopter Release Notes

Treat every changeset summary as final changelog copy. Rewrite unclear inherited
summaries without changing their semver bump or package scope unless the source
diff proves those fields are wrong. Use exact public API names, state defaults
for new options, and describe the behavior adopters will observe rather than the
implementation or PR process.

Clean accumulated prerelease sections from changelogs while preserving every
stable release section. After the dry run, read each generated stable section
end to end and require the new stable heading to sit directly above the previous
stable heading.

Run the bundled dry run from a clean, committed release branch:

```bash
.agents/skills/release-react-magma/scripts/dry-run-release.sh v5
.agents/skills/release-react-magma/scripts/dry-run-release.sh v4
```

Require each generated changelog to place the new stable version directly above
the previous stable version, with no RC/next sections between them.

## Validate And Merge

Run all checks required by `AGENTS.md`: clean install, compiler checks, lint,
tests, and build. Complete the breaking-change audit. Open the release PR against
`main` for v5 or `v4/main` for v4. Do not merge until CI, version predictions,
changelogs, package ownership, and npm dist-tags are approved.

After merge, wait for publishing to complete and verify npm versions/tags,
GitHub tags, generated changelogs, and docs deployment.

## Draft The Slack Announcement

After publish verification, read `references/slack-message.md` and return a
copy-ready team-channel announcement to the user. Build it from the published
package versions and final adopter-facing changelogs. If the user supplies a
previous announcement, match its structure and tone. Do not claim the release is
available before publish verification, and do not send the message unless the
user explicitly requests that action.

## Synchronize Stable Back

Block new integration PRs until synchronization finishes:

- v5: merge the published `main` back into `dev`.
- v4: merge the published `v4/main` back into `v4/dev`.

Perform this synchronization manually because the repository's sync automation
is not reliable. Create a sync branch from the integration branch, merge the
latest stable branch, resolve versioned files to the published stable state,
remove consumed changesets, and target the integration branch. After merge,
verify that its publish workflow re-enters the correct prerelease mode before
accepting new feature work.
