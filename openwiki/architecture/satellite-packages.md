# Satellite Packages: Charts, Dropzone

Two packages extend `react-magma-dom` by wrapping a third-party library with Magma theming/i18n/a11y conventions.

## `@react-magma/charts` (`packages/charts`)

Wraps **IBM Carbon Charts** (`@carbon/charts-react`) and adds Magma-themed chrome around it.

- `src/index.ts` re-exports two component groups: `./components/CarbonChart` and `./components/ChartTable`.
- `src/components/CarbonChart/CarbonChart.tsx` is the main entry point. It imports chart implementations directly from `@carbon/charts-react` (Area, Donut, Line, Radar, Scatter, Combo, etc.) and defines a single `CarbonChartType` enum (`area`, `bar`, `barGrouped`, `boxplot`, `bubble`, `bullet`, `donut`, `gauge`, `histogram`, `line`, `lollipop`, `meter`, `pie`, `radar`, `scatter`, `combo`, ...) so consumers pick a chart by `type` prop instead of importing many components.
- A `ChartToolbarConfig` prop controls Magma-added chrome: `showAsTable` (opens a Magma `Modal` with the chart's tabular data via `ChartTableModal`), a fullscreen toggle, a `moreOptions` dropdown, and CSV/PNG/JPG export.
- Uses Magma's `ThemeContext`/`useIsInverse` for theming and `react-magma-icons` for toolbar icons; `useCarbonModalFocusManagement` (`src/hooks/`) manages focus accessibility in the table modal.
- Ships Carbon's own stylesheet (`carbon-charts.css`) as source.
- **Build**: uses **Rollup** (`rollup.config.js`), unlike the microbundle-based `react-magma-dom`/`dropzone` — likely to handle CSS extraction and `d3` externalization required by Carbon Charts.
- The current `CarbonChart` implementation includes accessibility handling for chart regions, legend semantics, focus outlines, and toolbar/table-modal focus management — accessibility of chart toolbars is an ongoing area of care.
- Storybook: one story file per chart type under `src/components/CarbonChart/*.stories.tsx`.

**Change checklist**: keep new chart types behind `CarbonChartType`; route new user-facing strings through `chartToolbarI18n`/`I18nContext`; add a changeset scoped to `@react-magma/charts`; verify a11y with `jest-axe` and Storybook a11y addon.

## `@react-magma/dropzone` (`packages/dropzone`)

Wraps **`react-dropzone`** with Magma styling, previews, and accessible status announcements.

- `src/index.ts` re-exports `./components/dropzone`.
- `src/components/dropzone/Dropzone.tsx` composes Magma primitives (`Button`, `Flex`, `FormFieldContainer`, `Announce` for a11y live-region announcements, `VisuallyHidden`) plus `useGenerateId`, `useIsInverse`, `I18nContext`, on top of `react-dropzone`'s `useDropzone`/`DropzoneOptions`/`FileRejection`.
- `DropzoneProps` extends `FormFieldContainerBaseProps` and exposes `accept`, `disabled`, `dropzoneOptions` (raw pass-through to `react-dropzone`, minus `onDrop`), `helperMessage`, `maxFiles`/`minFiles`, `maxSize`/`minSize`, `multiple`. **Note**: a code comment states these props are manually copied into `dropzone.mdx` — the docs page for this component is hand-maintained, not derived from `properties.json` the way `react-magma-dom` components are.
- `DragState` (`error | dragAccept | dragReject | dragActive | default`) drives styled visual states; `OnSendFileProps` (`onError`/`onFinish`/`onProgress`) is the integration point for consumers wiring up real uploads.
- Sibling files: `FileIcon.tsx`, `FilePreview.ts`, `Preview.tsx`, `utils.ts`.
- **Build**: `microbundle`, same as `react-magma-dom`.

**Change checklist**: keep new props documented by hand in the docs `.mdx` (not auto-generated); preserve `Announce`-based status messaging for a11y; add a changeset scoped to `@react-magma/dropzone`.
