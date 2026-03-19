---
'react-magma-dom': patch
---

fix(Table, Datagrid): Fix screen reader announcements for sortable and selectable tables.

- Restore descriptive `aria-label` on sort buttons ("Sort rows by {column}") without direction suffix, as `aria-sort` on the `<th>` already conveys direction.
- Add `aria-sort` to the selectable column header cell in `TableRow` when `isSortableBySelected` is enabled.
- Row checkboxes now use unique accessible names via `rowName` prop (e.g. "Select row Cheese").
- Checkbox labels are now static ("Select all rows" / "Select row") and no longer toggle to "Deselect" to prevent redundant screen reader announcements.
- Suppress `IndeterminateCheckbox` live region on initial render to prevent JAWS from reading all checkboxes on page load.
- Simplify `IndeterminateCheckbox` announce text to remove repeated label text.
