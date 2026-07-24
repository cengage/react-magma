---
'react-magma-dom': patch
'react-magma-docs': patch
---

fix(Checkbox): significantly improve render performance for large lists

`Checkbox` and `IndeterminateCheckbox` now reuse cached, pre-serialized Emotion styles across instances and render their internal elements directly instead of through per-instance styled components. Rendering ~2000 checkboxes is roughly 2x faster, with identical styling, behavior, accessibility, and SSR output.

The visually hidden native input now also carries a stable `magma-checkbox-input` class (used internally for the focus/checked sibling selector); this is additive and does not change existing behavior.
