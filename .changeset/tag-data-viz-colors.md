---
'react-magma-dom': minor
'react-magma-docs': patch
---

feat(Tag): Add data visualization color tokens and new color options.

- Adds `dataViz*` color tokens to the theme and reuses them for `chartColors` and `chartColorsInverse`.
- Adds `blue`, `teal`, `pink` and `purple` options to `TagColor`.
- Updates existing Tag styling: `TagColor.primary` and `TagColor.default` backgrounds and text colors, inverse colors, the outline (now a `border` instead of a `box-shadow`), fixed heights, text weight, and the dismiss icon (`CancelIcon` is now `CloseIcon`).
