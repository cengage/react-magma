# Documentation Site & Landing Page

## `website/react-magma-docs` — the public docs site

A **Gatsby 3 + MDX** static site that is the canonical reference for every component's API, usage examples, and design guidance. The root `README.md` links to the latest versioned site at `https://react-magma.cengage.com/version/latest/`.

- **Config**: `gatsby-config.js` registers separate `gatsby-source-filesystem` instances for `images`, `api`, `api-intro`, `design`, `design-intro`, and `data-visualization`, plus `gatsby-plugin-mdx` and image plugins.
- **Build-time integration with `react-magma-dom`**: `gatsby-node.js` loads `react-magma-dom/dist/properties.json` — the prop metadata generated during the DOM package's build (see [Component Library Architecture](component-library.md#build-process)) — and injects matching prop records into page context. Its `onCreateNode` hook creates lowercase slugs for the API, design, and data-visualization sections.
- **Content structure** under `src/pages/`:
  - `api/*.mdx` — one file per component (e.g. `button.mdx`, `combobox.mdx`, `datagrid.mdx`, `tree-view.mdx`), the convention described in `AGENTS.md`/`CONTRIBUTING.md`: **any public API change to a component must be reflected here.**
  - `design/*.mdx` — parallel UX/design guidance per component (not every component has one).
  - `api-intro/`, `design-intro/` — section landing/overview pages.
  - `data-visualization/*.mdx` — docs for the `@react-magma/charts` package; the current pages are `introduction.mdx`, `chart-types.mdx`, and `chart-demos.mdx`.
  - Root-level pages: `index.js` (homepage), `404.js`, `contribution-guidelines.mdx`, `select-migration.mdx`, `theme-settings.mdx`.
  - `src/components/`, `src/utils/` — shared layout, navigation, and code-renderer components for the site. Current API and design pages are wrapped with `PageContent`.
- Depends on `@react-magma/charts` and `@react-magma/dropzone` directly so it can demo those packages too; uses `prism-react-renderer` for code blocks and `downshift`/`@data-driven-forms/react-form-renderer` for interactive demo widgets.

### Creating or updating a component doc page

Per `README.md` and the Plop template (`plop-templates/website/component.mdx.hbs`, wired in `scripts/plopfile.ts`), a new component's docs page is scaffolded automatically by `npm run plop`. Manual updates follow this shape:

```yaml
---
pageTitle: '{ComponentName} API'
title: '{ComponentName}'
props:
  - {ComponentName}Props
---
```

...then wrap the page in `<PageContent componentName="..." type="api">` and import any `react-magma-dom` components needed for live examples. Keep wording and structure consistent with existing pages (`CONTRIBUTING.md`).

**Run locally**: `npm run docs` (alias for `lerna run --scope react-magma-docs develop`) serves at `http://localhost:8000`. Note it does not hot-reload CodeSandbox embeds.

## Landing site — `website/react-magma-landing`

A small, **non-Gatsby** static site (plain EJS templates + a Node build script) that serves as a marketing/version-index page rather than component documentation.

- `package.json` scripts run `scripts/build.js`, which uses `axios` to query package metadata, `semver` to sort/filter stable `react-magma-dom` v4 releases plus the hardcoded legacy versions 2.6.1 and 3.11.0, and groups them by their required peer `react` version to produce a "latest version per supported React version" index.
- `templates/index.html` (EJS) renders the resulting static landing page, later deployed alongside the docs site (see CI in [Contributing & Tooling](../workflows/contributing-and-tooling.md#ci-workflows)).
- Build with `npm run build:landing` from the repo root.

This site rarely needs changes unless the supported-version matrix or overall marketing copy changes.
