---
'react-magma-dom': major
'react-magma-docs': patch
---

fix(TreeView): correct screen reader announcements for tree items

Expansion, selection and `expandAll`/`collapseAll` are each announced once and
name the item they apply to, through a single live region owned by `TreeView`.
Keyboard selection is announced — it was previously silent — and a branch reports
the status it ends up in, saying its subitems followed only when they actually
did. `IndeterminateCheckbox` announces only a change the user made on it.

New i18n strings under `treeView` (additive): `itemExpandedAnnounce`,
`itemCollapsedAnnounce`, `allItemsExpandedAnnounce`, `allItemsCollapsedAnnounce`,
`itemSelectedAnnounce`, `itemDeselectedAnnounce`, `itemPartiallySelectedAnnounce`,
`branchSelectedAnnounce`, `branchDeselectedAnnounce`.

`i18n.expansionState` is deprecated in favour of `treeView.itemExpandedAnnounce`
/ `itemCollapsedAnnounce`, which also name the item acted on. A translation
supplied through it still takes effect, as long as its replacement is left at
its default.

**Breaking Changes**

`li[role="treeitem"]` is now the only element carrying selection state.

- The checkbox inside a tree item is `aria-hidden`, so `getByRole('checkbox')`
  no longer matches inside a tree. Query it with
  `getByLabelText(label, { selector: 'input' })` or the `<itemId>-checkbox` test
  id, and assert state on the item's `aria-checked`. Clicking it leaves focus on
  the tree item rather than the input.
- Tree markup changed: layout wrappers carry `role="none"`, siblings share one
  `ul[role="group"]` per branch, and the per-item and per-checkbox live regions
  are replaced by one region after the tree (`<testId>-announce`).
- Announcements are `assertive` and published on a short delay, so tests that
  assert announcement text synchronously now need `waitFor` or fake timers.
- Wording changed: `All subitems are selected` is now
  `<label>, selected, all subitems selected`.
- `I18nInterface` gains a required `treeView` section. Spreading `defaultI18n`
  is unaffected; hand-built interfaces must add it, as there is no deep merge.
- `IndeterminateCheckbox` standalone announces its status only when the `status`
  prop actually changes.
