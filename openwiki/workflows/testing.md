# Testing Guidance

Three layers of testing cover this repo: unit/a11y tests (Jest), Storybook-driven end-to-end tests (Playwright), and visual regression (Chromatic, run in CI). See [Contributing & Tooling](contributing-and-tooling.md#ci-workflows) for when these run in CI.

## Unit & accessibility tests — Jest

- Root `jest.config.js` runs across all packages (`testPathIgnorePatterns` excludes `dist/`, `.nx/`, `tests/playwright/`, legacy/archived package folders, etc.). `testEnvironment: 'jsdom'`; `@emotion/jest/serializer` handles Emotion snapshot serialization; `jest-axe/extend-expect` and `@testing-library/jest-dom` are loaded globally via `setupFilesAfterEnv`.
- Tests are **colocated** with components: `ComponentName.test.js` lives in the component folder next to the implementation/re-export files, using React Testing Library + `@testing-library/user-event`, asserting both behavior and accessibility (`jest-axe`) where relevant.
- Snapshot tests live under each component's `__snapshots__/` — review diffs deliberately; don't blindly regenerate.
- Run:
  - `npm test` from the repo root (runs `pretest` → `compiler-checks` first, then Jest across packages).
  - `npm run test-watch` for watch mode.
  - `npm run test-dom` to run only `react-magma-dom` tests in watch mode.
  - `npm test -- --coverage` to generate coverage reports (output in `/coverage`). No enforced coverage threshold.

## End-to-end tests — Playwright against Storybook

- Config: `tests/playwright/playwright.config.ts`. Boots Storybook's dev server as a `webServer` (`cd .. && npm run storybook`, `http://localhost:6006/`) and runs specs against it in both Chromium and WebKit projects.
- Specs live under `tests/playwright/tests/storybook/<component>/<component>.spec.ts` for components that currently have Playwright coverage (for example, `accordion/accordion.spec.ts`). They drive the actual Storybook stories rather than a separate test harness. This means covered Storybook stories are a real testing surface, not just documentation/demo — keep stories accurate and stable (avoid renaming story IDs/args casually).
- Run: `npm run playwright:test` (all specs), `npm run playwright:report` (view last HTML report), `npm run playwright:codegen` (record a new spec), `npm run playwright:realtime` (Playwright UI mode).
- CI runs Playwright with 2 retries and a single worker (`preview.yml`).

## Visual regression — Chromatic

- Triggered in `.github/workflows/preview.yml` on PRs targeting `dev`/`main`, using `storybook-static` (built via `npm run build-storybook`) with `onlyChanged: true`. Treated as advisory (`exitZeroOnChanges: true`) rather than a hard gate.
- Local equivalent: `npm run chromatic`.

## What to run when changing an area

| Change area | Run |
|---|---|
| A single component's logic/props | `npm run test-dom` (or the package's `npm test`), plus its Storybook story if behavior/interaction changed |
| Shared theme/i18n/hooks | Broad `npm test` from repo root (many components depend on these) |
| Anything affecting DOM structure, ARIA, or keyboard interaction | Check `jest-axe` assertions in the component's test file, and update the corresponding Playwright spec under `tests/playwright/tests/storybook/<component>/` when one exists or the change warrants new E2E coverage |
| Public API additions/removals | `npm run compiler-checks` (catches downstream type breakage across the workspace) |
| Charts/Dropzone | That package's own tests (`packages/charts`/`packages/dropzone` `jest.config.js`) plus its Storybook stories |
| Docs site content | `npm run docs` locally to visually verify the MDX page renders and prop tables are correct |

Always finish with `npm run build` before considering a change done (`AGENTS.md`'s definition of done) — it re-runs `compiler-checks` + `lint` and builds every package, catching cross-package breakage that unit tests alone might miss.
