---
'react-magma-dom': minor
'react-magma-docs': patch
---

fix(Select,Combobox): migrate to Downshift 9.5.0 with legacy API compatibility and nullable controlled selection

Preserve Alt+ArrowUp navigation without committing selection, retain typed multi-selection reducer props, and make strict consumer fixtures reproducible.

Preserve MultiCombobox Backspace removal from an empty input while its menu is open, without removing selected items when editing a query.

Preserve legacy Select opening highlights and custom-renderer selection attributes, Combobox Escape clearing and unmatched Enter form submission, default and custom announcement output, and string action types in production.

Tighten migrated getter, input-event and emitted item-renderer types, retaining legacy extension/ref contracts, and expand strict consumer checks for generic actions, callbacks, getters and refs.
