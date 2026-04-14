---
'@react-magma/charts': minor
'react-magma-dom': minor
---

feat: Add accessible chart toolbar with "Show as table", fullscreen, and "More options" buttons

Adds a new `chartToolbar` prop to `CarbonChart` that renders a WCAG 2.2 compliant toolbar replacing Carbon's built-in navigation controls. When provided, Carbon's toolbar is automatically disabled and replaced with accessible Magma components featuring:

- **Show as table** button with `aria-haspopup="dialog"` and `aria-expanded`, opening a focus-trapped Magma Modal with semantic headings and an accessible data table
- **Fullscreen** button without `aria-haspopup` (fixing the previous WCAG violation)
- **More options** dropdown using Magma's Dropdown component with proper menu semantics

Also exports standalone composable components (`ChartTableButton`, `ChartFullscreenButton`, `ChartMoreOptionsButton`, `ChartTableModal`, `ChartDataTable`, `ChartToolbar`) for adopters who need granular control outside of `CarbonChart`.
