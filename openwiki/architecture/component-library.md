# Component Library Architecture (`react-magma-dom`)

`packages/react-magma-dom` is the core package — roughly 70 components under `src/components/`, plus the shared theme, i18n, inverse-theming, and hooks systems every component depends on. This page explains the conventions so that changes stay consistent with the rest of the library (also see `AGENTS.md` for the terse rules version).

## Standard component layout

Each component lives in its own PascalCase folder, e.g. `src/components/Button/`, `src/components/Modal/`, `src/components/TreeView/`:

- `index.tsx` — implementation for many simple/older components, or `index.ts` re-exporting the implementation and sub-modules. The Plop scaffold currently generates `ComponentName.tsx` plus `index.ts`; complex components like `TreeView` and `Datagrid` split logic across files, custom hooks, reducers, and contexts.
- `ComponentName.test.js` — React Testing Library + `jest-axe` tests, colocated when the component has tests.
- `ComponentName.stories.tsx` — Storybook 6 stories (`@storybook/react`), also used as the Playwright surface when covered by those tests (see [Testing](../workflows/testing.md)).
- `__snapshots__/` — Jest snapshot output; review diffs intentionally when they change.
- Shared internal styled pieces get their own folder, e.g. `StyledButton/`.

### Code conventions (verified against `Button`, `Modal`, `TreeView`, `Combobox`, `Datagrid`)

- **`forwardRef`**: DOM-backed public components usually use `React.forwardRef<HTMLElement, Props>((props, ref) => { ... })`. Generic wrapper components such as `Select` and `Combobox` are plain functions that delegate refs through explicit props like `innerRef`.
- **Props split**: a "styles"/variant interface (e.g. `ButtonStyles`) is often combined with an HTML-attributes-extending base interface: `type ButtonProps = BaseProps & ButtonStyles`. Public props should have JSDoc comments, with `@default` on variant props — this feeds the generated `properties.json` used by the docs site prop tables (see [Documentation Site](documentation-site.md)).
- **Variant enums**: string `enum`s exported alongside the component (`ButtonVariant`, `ButtonColor`, `ButtonShape`, `ButtonSize`, `ModalSize`, etc.), re-exported from the package barrel (`src/index.ts`).
- **Group context merging**: components that live inside a group (e.g. `Button` inside `ButtonGroup`) merge ambient context props with local props via a `resolveProps(contextProps, props)` utility from `src/utils`.
- **IDs**: generated with `useGenerateId(props.id)` from `src/utils/index.ts` — never generate ids inline (needed for stable ARIA wiring).
- **Styled elements**: defined at module scope with `@emotion/styled` (`styled.div<Props>`), reading tokens off an explicit `theme` prop (e.g. `props.theme.spaceScale.spacing05`, `props.theme.colors.neutral700`).
- Components with complex internal state (TreeView, Datagrid, Combobox) push logic into custom hooks/reducers/contexts rather than one large component body — read those files' internal `use*` hooks and contexts before making behavioral changes.

## Theme system

Source: `src/theme/magma.ts`, `ThemeContext.ts`, `styled.ts`, `magmaColors.ts`, `theme/components/`, `theme/GlobalStyles/`.

- `magma.ts` declares the full `ThemeInterface` (colors, breakpoints, icon sizes, spacing scale, type scale/typography visual styles, and per-component theme slices like `Modal`, `Drawer`, `Combobox`, `Dropdown`, `Select`, `Tabs`, `Tooltip`) and exports the concrete default `magma` theme object with real values (fonts, breakpoints `{xs:0, small:600, medium:768, large:1024, xl:1200}`, spacing/type scales, brand color palette).
- `magmaColors.ts` is a small `MagmaColors` enum of **semantic palette group names** (primary/secondary/tertiary/neutral/info/danger/warning/success) — not hex values; actual hex values live in `magma.ts`.
- `ThemeContext.ts` is `React.createContext(magma)` — the Magma theme is the context's *default value*, so components render correctly even without an explicit `<ThemeContext.Provider>`.
- `styled.ts` augments Emotion's `Theme` type with `ThemeInterface` (a TypeScript module augmentation, imported once as a side effect at the top of `src/index.ts`), so `theme` props are typed everywhere without needing Emotion's own `ThemeProvider`.
- `theme/components/` holds cross-cutting themed helpers (`transition.ts`, `reducedMotionTransition.ts`, `drawerTransition.ts`) for animation tokens.

**Rule for changes**: component styling should read theming via `React.useContext(ThemeContext)` and pass `theme={theme}` down to styled sub-components. Do not hard-code colors or use the default `magma` object as a styling source for new component styling; this is how consumers plug in a custom theme via `<ThemeContext.Provider value={customTheme}>`, exported from the package barrel. Existing production code imports `magma` for type/key defaults and a few fallbacks, so treat those as local exceptions rather than the default pattern.

## i18n system

Source: `src/i18n/interface.ts`, `default.ts`, `index.ts`.

- `I18nInterface` (in `interface.ts`) is one large nested schema: global date/time formatting (`locale`, `dateFormat`, `timeFormat`, `months`, `days`) plus one sub-object per component that needs translatable text or ARIA labels (e.g. `alert.dismissAriaLabel`, `breadcrumb.navAriaLabel`, `characterCounter.*`, `charts.line.*`).
- `default.ts` provides `defaultI18n: I18nInterface`, the concrete English defaults.
- `index.ts` creates `I18nContext = React.createContext<I18nInterface>(defaultI18n)` — again defaulted, so no provider is required out of the box.
- Components read `React.useContext(I18nContext)` and pull nested strings, e.g. `i18n.alert.dismissAriaLabel`. There is no external i18n library and no automatic merge with defaults — consumers localize by wrapping their app in `<I18nContext.Provider value={customI18n}>` with a complete `I18nInterface`, usually built by spreading `defaultI18n` and overriding the needed nested keys.

**Rule for changes**: any new user-facing string or ARIA label must be added to `I18nInterface` + `default.ts` and read through `I18nContext`, not hard-coded.

## Inverse ("dark surface") theming

Source: `src/inverse/index.ts`.

- `InverseContext = React.createContext<InverseInterface>({ isInverse: false })`.
- `useIsInverse(inverseProp?)` — if the component received an explicit `isInverse` prop, that wins; otherwise it inherits from the ambient `InverseContext`.
- Container-like components (`Container`, `AppBar`, `Fieldset`, `Accordion`, `List`, `ListItem`, `DefinitionList`, `DefinitionListItem`, `Breadcrumb`, `Form`, `FormFieldContainer`, `EmptyState`, `BlockQuote`, `AlertBase`, `DatePicker`, `TreeView`) wrap their children in `<InverseContext.Provider value={{ isInverse }}>` so nested components automatically adopt dark-surface styling without prop drilling.
- Leaf components call `useIsInverse(resolvedProps.isInverse)` and use the result to pick inverse-specific theme tokens (e.g. `theme.colors.focusInverse` vs `focus`).

## Hooks (`src/hooks/`)

| Hook | Purpose |
|---|---|
| `useControlled.ts` | Generic controlled/uncontrolled value helper; ignores setter calls when a controlled value is supplied. |
| `useDataPagination.ts` | Slices an items array into pages (used by `Pagination`/paginated components). |
| `useDescendants.ts` | Maintains an ordered list of descendant DOM node refs (register/unregister) for roving-tabindex/list traversal. |
| `useDeviceDetect.ts` | Memoized `navigator.userAgent` parsing (browser/OS booleans). |
| `useFocusLock.ts` | Focus-trap implementation used by `Modal`/`Drawer`, including grouped tab-stop handling (e.g. radio groups). |
| `useForceUpdate.ts` | Trivial re-render trigger. |
| `useMagmaFloating.ts` | Wraps `@floating-ui/react-dom`'s `useFloating`, preconfigured with `flip()` + `autoUpdate`. |
| `useMediaQuery.ts` | SSR-safe `window.matchMedia` subscription. |

## Public API surface (`src/index.ts`)

- First line is `import './theme/styled'` — a side-effect import performing the Emotion theme type augmentation globally for consumers.
- v4 generally exports values and types together through `export { ... }` or `export *`. The barrel also contains selected nested exports, so check `src/index.ts` before assuming the export shape.
- Theme/i18n/inverse primitives (`ThemeContext`, `magma`, `I18nContext`, `InverseContext`, `useIsInverse`, the public hooks) are exported for advanced consumers building custom providers.
- This is the single entry point for the whole design system — adding a public component means adding the appropriate value/type exports here, or following the established `export *` pattern for that component family.

## Build process

- `npm run build` in the package runs `tsdx build`, then a `postbuild` step (`npm run generate-properties`) runs `scripts/generateJSON.js` to emit `dist/properties.json` — TypeDoc-derived component prop metadata consumed by the docs site to auto-render prop tables (see [Documentation Site](documentation-site.md)).
- `scripts/copy-changelog.js`, `scripts/getAlias.js`, `scripts/getVersion.js` are small release/tooling helpers.
- Package dependencies of note: `@emotion/react`/`styled` (styling), `@floating-ui/react[-dom]` (positioning for popovers/tooltips/dropdowns), `react-virtual` (virtualization, e.g. large tables/comboboxes), `date-fns` (date handling), `downshift` (combobox/select primitives), `framer-motion` (animation), `polished`, `uuid`.

## What to check when changing this package

- Match the file layout and conventions above; look at a sibling component before introducing a new pattern (per `CONTRIBUTING.md`).
- Run `npm run lint`, the package's Jest tests, and `npm run build`; update `__snapshots__` intentionally.
- Update or add the Storybook story and the docs `.mdx` page for any public API change (see [Documentation Site](documentation-site.md)).
- Add a changeset (see [Contributing & Tooling](../workflows/contributing-and-tooling.md#changesets-and-release-flow)).
- If the change could affect existing consumers (removed/renamed export, changed prop type/default, altered DOM structure or `data-*` hooks, a11y regression, theme-token removal), see the breaking-change review process in [Contributing & Tooling](../workflows/contributing-and-tooling.md#breaking-change-review).
