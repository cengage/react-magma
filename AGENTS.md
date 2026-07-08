# Repository Guidelines

React Magma is Cengage's accessible React component library. This file orients coding agents; humans should also read `CONTRIBUTING.md`.

## Project Structure & Module Organization

Lerna + Nx npm workspace (`workspaces`: `packages/*`, `website/*`).

- `packages/react-magma-dom` — the core browser component library (`react-magma-dom`).
- `packages/charts` (`@react-magma/charts`) and `packages/dropzone` (`@react-magma/dropzone`) — add-on packages.
- `website/react-magma-docs` — Gatsby documentation site (MDX).
- `website/react-magma-landing` — marketing/landing site.
- `tests/playwright` — Playwright checks against Storybook (`scope: playwright`).
- `plop-templates/` + `scripts/plopfile.ts` — scaffolding for new components.
- `examples/` — standalone consumer demos (e.g. `token-demo`).

Inside `packages/react-magma-dom/src/`: `components/` (one folder per component), `hooks/`, `i18n/`, `inverse/` (inverse/dark-surface theming), `theme/` (the Magma theme + tokens), `utils/`. Each component folder is `ComponentName/index.tsx`, with colocated `ComponentName.test.js`, `ComponentName.stories.tsx`, and `__snapshots__/`. Shared internal styled pieces live in their own folders (e.g. `StyledButton/`). Public surface is re-exported from `src/index.ts` (named `export { X }` + `export type { XProps }`).

## Build, Test, and Development Commands

Use Node `>=22.14.0` and npm `>=11.11.0` (`.nvmrc` pins `v22.14.0`); install with `npm ci`. The library targets React 18 (`peerDependencies: react ^18.3.1`) and Emotion 11.

- `npm run storybook` — Storybook on port 6006.
- `npm run docs` — Gatsby docs site locally (port 8000).
- `npm run build` — `compiler-checks` + `lint` (via `prebuild`), then builds all packages.
- `npm run build:lite` — builds all packages except the docs site.
- `npm run compiler-checks` — TypeScript checks across workspaces.
- `npm run lint` / `npm run lint:fix` — ESLint check / autofix.
- `npm run format` — Prettier write across `src`; `npm run fix:all` runs format + lint:fix.
- `npm test` / `npm run test-watch` — Jest from the repo root (`pretest` runs compiler-checks).
- `npm run test-dom` — `react-magma-dom` tests in watch mode.
- `npm run playwright:test` — Playwright Storybook tests.
- `npm run plop` — scaffold a component with index, test, stories, and docs.
- `npm run changeset` — add a changeset for user-facing changes.
- `npm run check:pkgs` / `npm run fix:pkgs` — manypkg workspace consistency.

## Coding Style & Naming Conventions

Match existing components before introducing new patterns (`CONTRIBUTING.md`: stay consistent, stay focused, discuss API changes with the team first).

- **TypeScript + React**, function components with `React.forwardRef`. PascalCase folders/components; component code in `index.tsx`; tests as `ComponentName.test.js`.
- **Styling**: Emotion `@emotion/styled`. Never hard-code colors or reference the Magma theme directly — read from `ThemeContext` (default = Magma theme) and theme tokens. Support inverse surfaces via `useIsInverse` / the `inverse` module.
- **Variants** as string `enum`s exported alongside the component (e.g. `ButtonColor`, `ButtonSize`); document defaults with `@default` JSDoc on the props interface.
- **Ids**: use `useGenerateId` from `utils`; do not generate ids inline.
- **i18n**: user-facing strings come through `I18nContext`, not literals.
- **Prettier**: 2-space indent, 80-char width, single quotes, semicolons, `trailingComma: es5`, `arrowParens: avoid`, LF endings.
- **ESLint** (warnings block CI via `lint:ci`): alphabetized `import/order` with `react` first and `newlines-between: always`; React Hooks + `jsx-a11y` recommended; `no-console` (only `warn`/`error`); blank line required before `return` and after `const`/`let`/`var` blocks; unused vars allowed only when prefixed `_`; avoid `any` (warns).

## Testing Guidelines

Jest + Testing Library + `@testing-library/jest-dom` + Emotion snapshots + `jest-axe`. Add tests beside changed components, assert behavior and accessibility (`jest-axe`) where relevant, and update `__snapshots__` intentionally (review diffs). Playwright specs under `tests/playwright/tests/storybook/**` cover Storybook flows. No enforced coverage threshold; reports land in `coverage/`.

## Branching, Commits & Pull Requests

- **Branch off `dev`** (the active integration branch) and target `dev` in PRs — not `main`.
- **Conventional Commits**, scoped by component: `feat(TreeView): support folder expansion`, `fix(chart): add accessible chart role`. commitlint relaxes subject/scope casing; husky `commit-msg` validates and `pre-commit` runs lint-staged (eslint --fix + prettier).
- **Changesets are always added manually**: create a file under `.changeset/<descriptive-name>.md` for every change, including code, docs, CI, dependency, and workflow-only changes. Format — YAML frontmatter mapping each changed package to a semver bump, then a one-line summary:

  ```md
  ---
  'react-magma-dom': patch
  ---

  fix(Button): correct disabled focus ring
  ```

  Use `patch` for fixes, docs, CI, dependency, and workflow-only changes; `minor` for additive features; and `major` for breaking changes. List every affected package (`react-magma-dom`, `@react-magma/charts`, `@react-magma/dropzone`, `react-magma-docs`); for repo infrastructure that primarily affects docs, Storybook, previews, or publishing workflows, use `react-magma-docs`. Do not rely on `npm run changeset`'s prompts — write the file directly.
- **PRs**: link the issue, describe the change, include UI screenshots/GIFs for visual changes, list test steps and edge cases, update docs for public-API changes. Expect thorough review — keep PRs focused; raise unrelated fixes with the team rather than bundling them.

## Definition of Done

Before considering a change complete:

1. `npm run compiler-checks`, `npm run lint`, `npm test`, and `npm run build` all pass clean. A change is not done until tests and the build are green.
2. A changeset file exists for every change.
3. Docs/stories are updated for public-API changes.
4. **Breaking-change review**: this library is consumed by many downstream products, so a backward-incompatible change is high-cost. Before finalizing, launch an expert review agent (e.g. via the `Agent` tool / `general-purpose` subagent) to audit the diff specifically for changes that break adopters — removed/renamed exports or props, changed prop types or defaults, altered DOM structure or class/`data-*` hooks, accessibility regressions, theme-token removals, and changed runtime behavior of existing public APIs. If any are found, flag them, bump the changeset to `major`, and document a migration path; prefer an additive, deprecation-first approach over a hard break.

## Documentation Notes

New or changed public components need Storybook stories and an MDX page under `website/react-magma-docs/src/pages/api/`, plus design guidance under `src/pages/design/` when appropriate. Keep wording and structure consistent with existing docs pages.
