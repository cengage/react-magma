---
'react-magma-dom': patch
---

fix(IndeterminateCheckbox): Remove redundant `aria-checked` attribute, as the native `checked` property and `indeterminate` state already convey the checkbox status.
