# Testing Guidance

Two automated testing layers cover this repo: unit/accessibility tests (Jest) and Storybook-driven end-to-end tests (Playwright). See [Contributing & Tooling](contributing-and-tooling.md#ci-workflows) for when these run in CI.

## Unit & accessibility tests — Jest

- Root `jest.config.js` selects the package Jest projects, which keeps Playwright outside the Jest run. Jest 26 uses jsdom by default; `@emotion/jest/serializer` handles Emotion snapshots, while `jest-axe/extend-expect` and `@testing-library/jest-dom` are loaded through package setup.
- Tests are **colocated** with components: `ComponentName.test.js` lives in the component folder next to the implementation/re-export files, using React Testing Library + `@testing-library/user-event`, asserting both behavior and accessibility (`jest-axe`) where relevant.
- Snapshot tests live under each component's `__snapshots__/` — review diffs deliberately; don't blindly regenerate.
- Run:
  - `npm test` from the repo root (Jest across package projects).
  - `npm run test-watch` for watch mode.
  - `npm run test-dom` to run only `react-magma-dom` tests in watch mode.
  - `npm test -- --coverage` to generate coverage reports (output in `/coverage`). No enforced coverage threshold.

## End-to-end tests — Playwright against Storybook

- Config: `tests/playwright/playwright.config.ts`. Boots Storybook's dev server as a `webServer` (`cd .. && npm run storybook`, `http://localhost:6006/`) and runs specs in Chromium, Firefox, WebKit, and Edge projects.
- Specs live under `tests/playwright/tests/storybook/<component>/<component>.spec.ts` for components that currently have Playwright coverage (for example, `accordion/accordion.spec.ts`). They drive the actual Storybook stories rather than a separate test harness. This means covered Storybook stories are a real testing surface, not just documentation/demo — keep stories accurate and stable (avoid renaming story IDs/args casually).
- Run: `npm run playwright:test` (all specs), `npm run playwright:report` (view last HTML report), `npm run playwright:codegen` (record a new spec), `npm run playwright:realtime` (Playwright UI mode).
- CI runs Playwright with 2 retries and a single worker (`preview.yml`).

## What to run when changing an area

| Change area | Run |
|---|---|
| A single component's logic/props | `npm run test-dom` (or the package's `npm test`), plus its Storybook story if behavior/interaction changed |
| Shared theme/i18n/hooks | Broad `npm test` from repo root (many components depend on these) |
| Anything affecting DOM structure, ARIA, or keyboard interaction | Check `jest-axe` assertions in the component's test file, and update the corresponding Playwright spec under `tests/playwright/tests/storybook/<component>/` when one exists or the change warrants new E2E coverage |
| Public API additions/removals | The affected package tests plus `npm run build` for emitted types and cross-workspace compatibility |
| Charts/Dropzone | That package's own tests (`packages/charts`/`packages/dropzone` `jest.config.js`) plus its Storybook stories |
| Docs site content | `npm run docs` locally to visually verify the MDX page renders and prop tables are correct |

Run `npm run lint`, `npm test`, and `npm run build` separately before considering a change done (`AGENTS.md`'s definition of done). The build compiles every workspace package and catches cross-package breakage that unit tests alone might miss.
