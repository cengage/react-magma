---
'react-magma-dom': minor
'react-magma-docs': patch
---

fix(TreeView): correct screen reader announcements for tree items

Expansion, selection and `expandAll`/`collapseAll` are each announced once and
name the item they apply to, through a single live region owned by `TreeView`.
Keyboard selection is announced — it was previously silent — and a branch reports
the status it ends up in, saying its subitems followed only when they actually
did. `IndeterminateCheckbox` announces only a change the user made on it.

New optional i18n strings under `treeView`: `itemExpandedAnnounce`,
`itemCollapsedAnnounce`, `allItemsExpandedAnnounce`, `allItemsCollapsedAnnounce`,
`itemSelectedAnnounce`, `itemDeselectedAnnounce`, `itemPartiallySelectedAnnounce`,
`branchSelectedAnnounce`, `branchDeselectedAnnounce`. Each falls back to English
on its own, so a partially translated section is safe.

`i18n.expansionState` is deprecated in favour of `treeView.itemExpandedAnnounce`
/ `itemCollapsedAnnounce`, which also name the item acted on. A translation
supplied through it still takes effect, as long as its replacement is left at
its default.

Notes for tests asserting on the accessibility tree:

- `li[role="treeitem"]` is now the only element carrying selection state. The
  checkbox inside a tree item is `aria-hidden`, so `getByRole('checkbox')` no
  longer matches inside a tree — query it with
  `getByLabelText(label, { selector: 'input' })` or the `<itemId>-checkbox` test
  id, and assert state on the item's `aria-checked`.
- Layout wrappers carry `role="none"`, siblings share one `ul[role="group"]` per
  branch, and the per-item live regions are replaced by one region after the
  tree (`<testId>-announce`).
- Announcements are published on a short delay, so assertions on announcement
  text need `waitFor` or fake timers.
- Wording changed: `All subitems are selected` is now
  `<label>, selected, all subitems selected`.
