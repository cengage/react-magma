# React Magma — OpenWiki Quickstart

React Magma is Cengage's accessible, themeable React component library. This monorepo contains the core component library, two satellite packages, the public documentation site, and the tooling that keeps them all consistent.

This is the React 17 v4 track: work integrates through `v4/dev`, stable releases merge to `v4/main`, and v4 packages publish under the `v4-latest` npm dist-tag so they remain separate from v5.

If you're new here, read this page first, then follow the links into the section that matches what you're changing.

## What this repository is

- **Product**: a design-system component library (`react-magma-dom`) used across multiple Cengage products, plus add-on packages for data visualization (`@react-magma/charts`) and file uploads (`@react-magma/dropzone`).
- **Consumers**: downstream product teams install these npm packages into their own React apps. Because of this, **backward compatibility is a first-class concern** — see [Contributing & Tooling](workflows/contributing-and-tooling.md#breaking-change-review).
- **Structure**: Lerna + Nx orchestrated npm workspaces (`workspaces`: `packages/*`, `website/*`, `tests/*`; see root [package.json](../package.json) and [nx.json](../nx.json)).

## Repository map

| Path | What it is | Docs |
|---|---|---|
| `packages/react-magma-dom` | Core component library (~70 components), theme, i18n, hooks, inverse ("dark surface") theming. This is the heart of the repo. | [Component Library Architecture](architecture/component-library.md) |
| `packages/charts` (`@react-magma/charts`) | Wraps IBM Carbon Charts with Magma-themed toolbar chrome. | [Satellite Packages](architecture/satellite-packages.md) |
| `packages/dropzone` (`@react-magma/dropzone`) | Wraps `react-dropzone` with Magma-styled UI and a11y announcements. | [Satellite Packages](architecture/satellite-packages.md) |
| `website/react-magma-docs` | Public documentation site (Gatsby + MDX) — one API page per component. | [Documentation Site](architecture/documentation-site.md) |
| `website/react-magma-landing` | Small static marketing/version-index page (not Gatsby). | [Documentation Site](architecture/documentation-site.md#landing-site) |
| `tests/playwright` | Playwright specs run against Storybook via the Playwright `webServer`; only components with specs under `tests/playwright/tests/storybook/` are covered. | [Testing](workflows/testing.md) |
| `scripts/plopfile.ts`, `plop-templates/` | Component scaffolding generator (`npm run plop`). | [Contributing & Tooling](workflows/contributing-and-tooling.md) |
| `.storybook/` | Storybook config covering dom + charts + dropzone stories. | [Testing](workflows/testing.md), [Contributing & Tooling](workflows/contributing-and-tooling.md) |
| `.github/workflows/` | CI: PR preview (test/build/Playwright/Netlify), publish, legacy docs deploy, Snyk. | [Contributing & Tooling](workflows/contributing-and-tooling.md#ci-workflows) |
| `AGENTS.md` (root) | Authoritative, terse coding-agent guide: conventions, commands, PR/commit rules, definition of done. | Read alongside this wiki — see below. |
| `CONTRIBUTING.md` | Human-oriented contribution philosophy (review rigor, a11y priority, theme rules). | Referenced throughout this wiki. |

## How this wiki relates to `AGENTS.md`

The root [`AGENTS.md`](../AGENTS.md) is a dense reference for coding conventions, build/test/lint commands, commit/changeset rules, and the definition of done. **This wiki does not duplicate that content** — it explains *why* the repo is structured this way, how the major systems fit together, and where to start when making a change. Read `AGENTS.md` for the conventions checklist; read this wiki for the architecture and workflow narrative.

## Getting started locally

```sh
npm ci --legacy-peer-deps # install (postinstall runs npm run build:lite)
npm run storybook       # component playground at http://localhost:6006
npm run docs            # docs site at http://localhost:8000 (Gatsby)
npm test                # Jest across package projects
npm run build           # build all workspace packages through Lerna
```

Node `>=22.14.0` / npm `>=11.11.0` (pinned in `.nvmrc`). Full command list: [`AGENTS.md`](../AGENTS.md) and root [`package.json`](../package.json) scripts.

## Where to start for common changes

- **Fix or extend a component's behavior/props/a11y** → [Component Library Architecture](architecture/component-library.md), then [Testing](workflows/testing.md) for what to run.
- **Add a brand-new component** → `npm run plop`, then [Contributing & Tooling](workflows/contributing-and-tooling.md#scaffolding-new-components).
- **Change a chart type or the dropzone** → [Satellite Packages](architecture/satellite-packages.md).
- **Update or add documentation for a component** → [Documentation Site](architecture/documentation-site.md); component docs live under `website/react-magma-docs/src/pages/api/*.mdx`.
- **Change theme tokens, colors, or typography** → the theme system section of [Component Library Architecture](architecture/component-library.md#theme-system).
- **Release / versioning / changesets** → [Contributing & Tooling](workflows/contributing-and-tooling.md#changesets-and-release-flow).

## Things to watch out for

- **Do not hard-code colors or use the default `magma` object as a styling source for new component styling** — read from `ThemeContext` so consumer-provided custom themes work. Existing code has a few `magma` imports for type/key defaults and fallbacks; follow the surrounding pattern. See [Component Library Architecture](architecture/component-library.md#theme-system).
- **User-facing strings must come from `I18nContext`**, not literals — see [i18n](architecture/component-library.md#i18n-system).
- **A changeset file is required for every change, including docs, CI, dependency, and workflow-only changes** — `.changeset/<name>.md`, written by hand (see [Contributing & Tooling](workflows/contributing-and-tooling.md#changesets-and-release-flow)).
- **v4 PRs target `v4/dev`, not `v4/main` or the v5 branches.**

## Section index

- [Architecture](architecture/component-library.md) — component library internals, satellite packages, documentation site.
- [Workflows](workflows/contributing-and-tooling.md) — scaffolding, monorepo build orchestration, releases, CI, testing.
