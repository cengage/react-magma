# Documentation Site & Landing Page

## `website/react-magma-docs` — the public docs site

A **Gatsby 5 + MDX** static site that is the canonical reference for every component's API, usage examples, and design guidance. This is the site linked from the root `README.md` (`https://react-magma.cengage.com`).

- **Config**: `gatsby-config.js` registers separate `gatsby-source-filesystem` instances for content collections — `pages`, `api`, `api-intro`, `design`, `design-intro`, `data-visualization` — plus `gatsby-plugin-mdx` and image plugins.
- **Build-time integration with `react-magma-dom`**: `gatsby-node.js` aliases the `react-magma-dom` import to its built dev bundle (`dist/react-magma-dom.cjs.development.js`) and loads `react-magma-dom/dist/properties.json` — the prop metadata generated during the dom package's build (see [Component Library Architecture](component-library.md#build-process)) — to auto-render prop tables on API pages. `onCreateNode` also parses each MDX file's AST to build in-page navigation TOCs.
- **Content structure** under `src/pages/`:
  - `api/*.mdx` — one file per component (e.g. `button.mdx`, `combobox.mdx`, `datagrid.mdx`, `tree-view.mdx`), the convention described in `AGENTS.md`/`CONTRIBUTING.md`: **any public API change to a component must be reflected here.**
  - `design/*.mdx` — parallel UX/design guidance per component (not every component has one).
  - `api-intro/`, `design-intro/` — section landing/overview pages.
  - `data-visualization/*.mdx` — docs for the `@react-magma/charts` package; the current pages are `introduction.mdx`, `chart-types.mdx`, and `chart-demos.mdx`.
  - Root-level pages: `index.js` (homepage), `404.js`, `contribution-guidelines.mdx`, `select-migration.mdx`, `theme-settings.mdx`.
  - `src/components/`, `src/utils/` — shared layout/nav/code-renderer components for the site itself (e.g. `ScopeableLayout`, referenced from every API page per `README.md`).
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

...then import `ScopeableLayout` from `../../components/layout` and any `react-magma-dom` components needed for live examples. Keep wording/structure consistent with existing pages (`CONTRIBUTING.md`).

**Run locally**: `npm run docs` (alias for `lerna run --scope react-magma-docs develop`) serves at `http://localhost:8000`. Note it does not hot-reload CodeSandbox embeds.

## Landing site — `website/react-magma-landing`

A small, **non-Gatsby** static site (plain EJS templates + a Node build script) that serves as a marketing/version-index page rather than component documentation.

- `package.json` scripts run `scripts/build.js`, which uses `axios` to query package metadata, `semver` to sort/filter available `react-magma-dom` versions (keeping major versions 4/5 plus two hardcoded legacy versions), and groups them by their required peer `react` version to produce a "latest version per supported React version" index.
- `templates/index.html` (EJS) renders the resulting static landing page, later deployed alongside the docs site (see CI in [Contributing & Tooling](../workflows/contributing-and-tooling.md#ci-workflows)).
- Build with `npm run build:landing` from the repo root.

This site rarely needs changes unless the supported-version matrix or overall marketing copy changes.
