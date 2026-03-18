---
'react-magma-dom': patch
---

fix(Table & Datagrid): Fix screen reader announcements for sortable and selectable tables (A11Y-529, A11Y-530, A11Y-531, A11Y-532).

- Restore descriptive `aria-label` on sort buttons ("Sort rows by {column}") without direction suffix, as `aria-sort` on the `<th>` already conveys direction (A11Y-532)
- Add `aria-sort` to the selectable column header cell in `TableRow` when `isSortableBySelected` is enabled (A11Y-532)
- Row checkboxes now use unique accessible names via `rowName` prop (e.g. "Select row Cheese") (A11Y-531)
- Checkbox labels are now static ("Select all rows" / "Select row") and no longer toggle to "Deselect" to prevent redundant screen reader announcements (A11Y-529)
- Suppress `IndeterminateCheckbox` live region on initial render to prevent JAWS from reading all checkboxes on page load (A11Y-530)
- Simplify `IndeterminateCheckbox` announce text to remove repeated label text (A11Y-530)
