---
'react-magma-dom': minor
'react-magma-docs': patch
---

chore(downshift): upgrade to 9.5.0 with legacy API compatibility, nullable controlled selections, and modern selection callbacks and reducers

feat(Select,Combobox): expose native Downshift v9 hook option groups with per-callback migration, native reducer semantics and event constants, while preserving legacy consumer contracts and Magma selection behavior.

fix(Select,Combobox): resolve native created-item selections before notification, keep internal policies on native Downshift contracts, and share validated environments across menu/chip hooks and iframe focus handling. Keep the Create action keyboard-accessible beside disabled items without exposing it as a data item.

fix(Select,Combobox): preserve typed Create navigation, support falsy multi-selection items, and coordinate dual-native status messages so silent menu cleanup cannot discard chip announcements.
