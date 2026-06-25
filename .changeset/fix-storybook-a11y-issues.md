---
'react-magma-dom': patch
---

fix(Storybook): Fix accessibility issues in stories:

- Input: add labels to native inputs, hide decorative icons from screen readers
- Table: remove invalid `aria-sort` from checkbox header cell
- Tabs: fix `aria-controls` pointing to correct ScrollSpy panel id
- ProgressBar: add visually hidden label to custom color input
- ToggleButton: remove incorrect `id` assignment from button element
- TreeView: move `aria-live` region inside `treeitem` to fix `aria-required-children` violation
