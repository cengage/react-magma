# Old-docs CodeSandbox patches

These files are overlaid onto **old release tags** by
[`.github/workflows/deploy-old-docs.yml`](../../.github/workflows/deploy-old-docs.yml)
when it rebuilds a version's documentation site. They retrofit the durable,
client-side "Edit in CodeSandbox" fix (PR #2495) onto releases that predate it.

## Why these exist

Old docs used the `react-codesandboxer` npm library, whose API request now
fails, so the "Edit in CodeSandbox" button is broken on every deployed
old-version docs site. PR #2495 replaced the library with a pure client-side
call — build the sandbox files, `lz-string`-compress them, and `window.open`
the CodeSandbox [Define API](https://codesandbox.io/docs/learn/sandboxes/cli-api)
(`/api/v1/sandboxes/define`). No third-party library, no server round-trip, so
it does not break again.

The old release tags are immutable, so the fix is applied at build time as an
overlay rather than by editing history.

## The files

| File | Applied to | Notes |
|------|-----------|-------|
| `actions-v2.tsx` | major 2 (e.g. 2.6.2) | `@emotion/core`; older magma palette (`foundation02` / `neutral07`). |
| `actions-emotion-core.tsx` | major 3 + v4 tags on `@emotion/core` (3.11.0, 4.0.0–4.4.0) | `primary700` / `neutral200` palette. |
| `actions-emotion-react.tsx` | v4 tags on `@emotion/react` (4.5.0+) | Same as above but `@emotion/react` import. |
| `update-package.js` | all patched tags | Removes `react-codesandboxer`, adds `lz-string@^1.5.0` in the docs `package.json`. |

Each `.tsx` is a full-file replacement of
`website/react-magma-docs/src/components/CodeBlock/actions.tsx` that preserves
that tag's exports and sibling constants while swapping in the new
CodeSandbox launch logic. They keep `@cengage-patterns/header` and
`@react-magma/schema-renderer` in the sandbox dependency map because the
pre-removal tags still ship those deps.

## How the workflow chooses

The workflow **auto-detects** everything — there is no per-version table to
maintain:

- **Skip entirely** if the checked-out tag's `package.json` no longer contains
  `react-codesandboxer` (i.e. it already ships the #2495 fix).
- **Variant**: `actions-v2` for major 2; otherwise `actions-emotion-react` if
  the tag has `@emotion/react`, else `actions-emotion-core`.

So when a new version ages out of "latest", it is patched (or skipped)
correctly with no edits here.

## Keeping in sync

If the canonical fix in
`website/react-magma-docs/src/components/CodeBlock/actions.tsx` changes
meaningfully on `dev`, refresh these variants to match (preserving each
family's emotion import + palette + the extra sandbox deps the old tags need).
