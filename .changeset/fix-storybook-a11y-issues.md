---
'react-magma-dom': patch
---

fix(a11y): Fix accessibility violations:

- Input: hide decorative icons from screen readers
- Table: remove invalid `aria-sort` from checkbox header cell
- Tabs: fix `aria-controls` pointing to correct ScrollSpy panel id
- ToggleButton: remove incorrect `id` assignment from button element
- TreeView: Fix `aria-required-children` and `color-contrast` accessibility violations
