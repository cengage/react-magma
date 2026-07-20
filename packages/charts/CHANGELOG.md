# @react-magma/charts

## 13.2.0

### Minor Changes

- 3f22c5b3e: Charts: add `chartToolbar.titleLevel` to set the `CarbonChart` title heading level from 1–6; it defaults to `2`.

### Patch Changes

- 3f22c5b3e: Charts: announce legend isolation changes to screen readers.
- 3f22c5b3e: Charts: prevent duplicate legend grouping and announce the active legend context in VoiceOver.
- 3f22c5b3e: Charts: expose legend controls as a labelled fieldset for assistive technologies.

## 13.1.1

### Patch Changes

- d368a9894: fix(charts): Show the tooltip on the focused data point when tabbing through chart dots.

## 13.1.1-next.0

### Patch Changes

- ff5c7c9c7: fix(charts): Show the tooltip on the focused data point when tabbing through chart dots.

## 13.1.0

### Minor Changes

- 3fa7c5753: feat: Add accessible chart toolbar with "Show as table", fullscreen, and "More options" buttons

  Adds a new `chartToolbar` prop to `CarbonChart` that renders a WCAG 2.2 compliant toolbar replacing Carbon's built-in navigation controls. When provided, Carbon's toolbar is automatically disabled and replaced with accessible Magma components featuring:

  - **Show as table** button with `aria-haspopup="dialog"` and `aria-expanded`, opening a focus-trapped Magma Modal with semantic headings and an accessible data table
  - **Fullscreen** button without `aria-haspopup` (fixing the previous WCAG violation)
  - **More options** dropdown using Magma's Dropdown component with proper menu semantics

  Also exports standalone composable components (`ChartTableButton`, `ChartFullscreenButton`, `ChartMoreOptionsButton`, `ChartTableModal`, `ChartDataTable`, `ChartToolbar`) for adopters who need granular control outside of `CarbonChart`.

### Patch Changes

- 1aef43f36: fix(charts): Show the tooltip on the focused data point when tabbing through chart dots.

## 13.0.4-next.0

### Patch Changes

- Updated dependencies [8e280adf5]
  - react-magma-dom@4.12.2-next.0

## 13.0.3

### Patch Changes

- Updated dependencies [2712b8907]
- Updated dependencies [2712b8907]
  - react-magma-dom@4.12.1-next.0

## 13.0.2

### Patch Changes

- e23b1a2f9: fix(Charts): Add optional `ariaLabel` property for SVG container. The default "Interactive chart" label is no longer applied when `ariaLabel` is not provided.
- e23b1a2f9: fix(Charts): Trap focus in "Show as table" modal

## 13.0.2-next.1

### Patch Changes

- Updated dependencies [aa87f4460]
  - react-magma-dom@4.11.1-next.0

## 13.0.2-next.0

### Patch Changes

- 2adadea18: chore: add optional `ariaLabel` property for SVG container

## 13.0.1

### Patch Changes

- 5810cc13d: fix(Charts): Fix magma styles not applied to carbon charts.

## 13.0.0-next.3

### Patch Changes

- 56f42285f: fix(Charts): Fix magma styles not applied to carbon charts.

## 13.0.0-next.2

### Patch Changes

- 7ef18e684: fix(Charts): Fix magma styles not applied to carbon charts.

## 13.0.0-next.1

### Patch Changes

- Updated dependencies [2e6c1e441]
  - react-magma-dom@4.11.0-next.3

## 12.0.2-next.0

### Patch Changes

- Updated dependencies [560f6cffe]
  - react-magma-dom@4.10.2-next.0

## 12.0.1

### Patch Changes

- 49d826503: fix(charts): migrate from microbundle to Rollup with automatic CSS injection

## 12.0.1-next.1

### Patch Changes

- f22efd08d: fix(charts): migrate from microbundle to Rollup with automatic CSS injection

## 12.0.1-next.0

### Patch Changes

- Updated dependencies [10d3a7285]
  - react-magma-dom@4.10.1-next.0

## 12.0.0

### Major Changes

- ef8a2740a: chore: fix @react-magma/charts package to include styles and correct exports

### Minor Changes

- ef8a2740a: fix(charts): fix build
- ef8a2740a: feat (CarbonCharts): Support custom colors.

### Patch Changes

- ef8a2740a: fix(charts): Add white outline to scatter points

## 12.0.0-next.5

### Major Changes

- 7e66c38ec: chore: fix @react-magma/charts package to include styles and correct exports

## 12.0.0-next.4

### Minor Changes

- f51613699: fix(charts): fix build

## 12.0.0-next.3

### Minor Changes

- 4d04e84e8: feat (CarbonCharts): Add supporting custom colors.

## 12.0.0-next.2

### Patch Changes

- Updated dependencies [22a0a5396]
  - react-magma-dom@4.10.0-next.3

## 12.0.0-next.1

### Patch Changes

- Updated dependencies [ed8a4eea7]
  - react-magma-dom@4.10.0-next.1

## 11.0.1-next.0

### Patch Changes

- Updated dependencies [31a4e0318]
- Updated dependencies [77a8687f4]
  - react-magma-dom@4.9.1-next.0

## 11.0.0

### Patch Changes

- Updated dependencies [edbc5c0a2]
  - react-magma-dom@4.9.0-next.3

## 10.0.1-next.1

### Patch Changes

- Updated dependencies [b65154ad5]
  - react-magma-dom@4.8.1-next.0

## 10.0.1-next.0

### Patch Changes

- 1f5f822d1: build(deps): bump dompurify from 3.1.6 to 3.2.4 in /packages/charts

## 11.0.0-next.0

### Patch Changes

- Updated dependencies [79435c964]
  - react-magma-dom@4.8.0-next.0

## 10.0.0

### Patch Changes

- 02db8e632: fix(Charts): Fix circle styles for `Charts`.

## 10.0.0-next.2

### Patch Changes

- 6869467ff: fix(Charts): Fix circle styles for `Charts`.

## 10.0.0-next.1

### Patch Changes

- Updated dependencies [c815b89ac]
  - react-magma-dom@4.7.0-next.1

## 9.0.1-next.0

### Patch Changes

- Updated dependencies [f45bdde78]
  - react-magma-dom@4.6.1-next.0

## 9.0.0-next.0

### Patch Changes

- Updated dependencies [fdf2dc929]
  - react-magma-dom@4.6.0-next.0

## 8.0.0-next.5

### Minor Changes

- ae668a3e5: Updating emotion to v11

## 8.0.0-next.4

### Patch Changes

- Updated dependencies [9e38e9e7f]
  - react-magma-dom@4.5.0-next.7

## 7.0.1-next.3

### Patch Changes

- 9f43ba1e6: fix(CarbonCharts): Minify styles

## 7.0.1-next.2

### Patch Changes

- f894d4a0d: chore: Deprecate LineChart

## 7.0.1-next.1

### Patch Changes

- 2f317e12d: fix(CarbonCharts): Remove exports & remove highlight import

## 7.0.1-next.0

### Patch Changes

- Updated dependencies [9f1e0956a]
  - react-magma-dom@4.4.1-next.0

## 7.0.0

### Minor Changes

- 308563ced: feat(CarbonCharts): Support Carbon Charts: AreaChart, StackedAreaChart, DonutChart, GroupedBarChart, LineChart, LollipopChart, PieChart, SimpleBarChart, StackedBarChart.

## 7.0.0-next.1

### Patch Changes

- Updated dependencies [ab6ffd4ed]
  - react-magma-dom@4.4.0-next.2

## 6.0.1-next.0

### Patch Changes

- Updated dependencies [3e14d4bd8]
  - react-magma-dom@4.3.1-next.0

## 6.0.0-next.1

### Patch Changes

- Updated dependencies [c47fc18b4]
  - react-magma-dom@4.3.0-next.2

## 5.0.1-next.0

### Patch Changes

- Updated dependencies [fc3098851]
  - react-magma-dom@4.2.1-next.0

## 5.0.0

### Patch Changes

- Updated dependencies [9a09b8b55]
  - react-magma-dom@4.2.0-next.0

## 4.0.2

### Patch Changes

- Updated dependencies [871820e8d]
  - react-magma-dom@4.1.1-next.0

## 4.0.1

### Patch Changes

- 1238e8d: Fix handleKeyboardInstructionsButtonKeydown type error

## 4.0.0

### Patch Changes

- Updated dependencies [3d00dcc7e]
  - react-magma-dom@4.1.0-next.2

## 3.0.1

### Patch Changes

- Updated dependencies [f487b936f]
  - react-magma-dom@4.0.1-next.0

## 3.0.0

### Major Changes

- c01c53838: chore: Update to React v17.0.2

## 2.0.1

### Patch Changes

- 7b4549726: Update react-magma-icons version to 2.3.6

## 2.0.0

### Patch Changes

- 95fc5ae7: chore(npm/node): Update versions

## 1.0.2

### Patch Changes

- 0de78513: build(deps): Bump react-magma-icons to 2.3.4

## 1.0.1

### Patch Changes

- Updated dependencies [fc8a20bf]
  - react-magma-dom@3.1.1-next.0

## 1.0.0

### Patch Changes

- Updated dependencies [366b25af]
  - react-magma-dom@3.0.0-next.0
