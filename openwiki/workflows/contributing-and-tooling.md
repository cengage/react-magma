# Contributing, Tooling & Release Workflow

This page explains the *why* behind the monorepo tooling; for the exact command/flag reference, `AGENTS.md` at the repo root is the source of truth and should be read alongside this page.

## Monorepo orchestration: Lerna + Nx

- **npm workspaces** (`package.json`): `workspaces: ["website/*", "packages/*"]`. Every folder under those two directories with a `package.json` is a workspace package.
- **Lerna** (`lerna.json`) runs cross-package scripts (`build`, `lint`, `test`, `compiler-checks`) and handles independent semantic versioning (`"version": "independent"`) plus publishing rules (allowed branches: `dev`, `main`, `v4/dev`, `v4/main`, `hotfix/*`).
- **Nx** (`nx.json`) layers task caching on top of Lerna's task running. `targetDefaults` cache `build`/`lint`/`compiler-checks`/`test`; per-project overrides declare real dependency graphs — e.g. `charts` and `dropzone` both `dependsOn: ["react-magma-dom:build"]`, so their builds only re-run when `react-magma-dom`'s build output actually changes.
- Root `package.json` scripts wrap these tools: `npm run build` (`compiler-checks` + `lint` via `prebuild`, then `lerna run build`), `npm run build:lite` (`lerna run build --ignore react-magma-docs`, without the root `prebuild` checks — useful when you only need package builds, not the docs site, and is what `postinstall` runs after `npm ci`).

## Scaffolding new components

`npm run plop` (→ `ts-node scripts/plopfile.ts`, generator config in `plop-templates/`) scaffolds a new component consistently:

- Prompts for component name, description, and whether it uses the theme, i18n, and/or inverse theming.
- Generates the component package under `packages/react-magma-dom/src/components/{ComponentName}/` from `plop-templates/component-pkg/**`.
- Generates the matching docs stub at `website/react-magma-docs/src/pages/api/{kebab-case-name}.mdx` from `plop-templates/website/component.mdx.hbs`.

This keeps new components aligned with the conventions in [Component Library Architecture](../architecture/component-library.md) from the start — prefer this over hand-rolling a new component folder.

## Changesets and release flow

- **Every user-facing change to a published package needs a changeset**: a hand-written file at `.changeset/<descriptive-name>.md` (do not rely on the `npm run changeset` interactive prompt — write it directly per `AGENTS.md`):

  ```md
  ---
  'react-magma-dom': patch
  ---

  fix(Button): correct disabled focus ring
  ```

  List every affected package (`react-magma-dom`, `@react-magma/charts`, `@react-magma/dropzone`); use `patch`/`minor`/`major` per semver impact.
- The repo runs in **prerelease mode** much of the time — recent commit history shows a repeating `chore: enter prerelease mode` commit pattern that bumps `.changeset/pre.json` and package `CHANGELOG.md`/`package.json` versions as changesets accumulate (`version:prerelease`/`version:exit` scripts wrap `changeset pre enter/exit`).
- `npm run release` (`changeset publish`) and the `publish` script (`copy:readme` + `lerna publish`) drive the actual npm publish, gated by CI (`.github/workflows/publish.yml`).

## Branching, commits, PRs

- Branch from and target **`dev`**, not `main`.
- **Conventional Commits scoped by component, package, or docs area**, e.g. `feat(TreeView): support folder expansion`, `fix(chart): add accessible chart role`, `docs(OpenWiki): correct repository guidance`, `docs(AGENTS): clarify commit rules`. Husky's `commit-msg` hook validates via commitlint; `pre-commit` runs lint-staged (`eslint --fix` + prettier) — see `.lintstagedrc`, `commitlint.config.js`, `.husky/`.
- PRs should link the issue, describe the change, include UI screenshots/GIFs for visual changes, list test steps/edge cases, and update docs for any public-API change.

## Breaking-change review

Because many downstream products consume these packages, a backward-incompatible change is high-cost. Before finalizing any change, `AGENTS.md` calls for an expert review pass (e.g. via a subagent) specifically auditing the diff for: removed/renamed exports or props, changed prop types or defaults, altered DOM structure or class/`data-*` hooks, accessibility regressions, theme-token removals, and changed runtime behavior of existing public APIs. If found: flag it, bump the changeset to `major`, and prefer an additive/deprecation-first migration path over a hard break.

## CI workflows (`.github/workflows/`)

- **`preview.yml`** — runs on PRs to `dev`/`main`/`v4/dev`/`v4/main`: `npm ci`, `npm test` (Jest, includes `pretest` compiler checks), Playwright browser install + `npm run playwright:test`, `npm run build:docs`, `npm run build-storybook`, then (only when targeting `dev`/`main`) a Chromatic visual-regression run, and finally Netlify preview deploys of both the docs site and Storybook, tagged `v4`/`v5` based on the target branch.
- **`publish.yml`** — the release pipeline (versioning/publishing packages).
- **`deploy-old-docs.yml`** — deploys documentation for older major versions.
- **`snyk-monitor.yml` / `snyk-pr.yml`** — dependency vulnerability scanning.

## Definition of done (summary — see `AGENTS.md` for the authoritative list)

1. `npm run compiler-checks`, `npm run lint`, `npm test`, and `npm run build` all pass clean.
2. A changeset file exists for any user-facing change.
3. Docs/stories are updated for public-API changes.
4. Breaking-change review completed (see above) for anything touching a public API.
