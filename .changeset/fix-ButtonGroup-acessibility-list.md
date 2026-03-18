---
'react-magma-dom': patch
---

fix(ButtonGroup): Update markup to use list structure for accessibility.

**Important**: We have modified the HTML structure of `ButtonGroup` component to meet accessibility requirements by changing it from a `div` to `div` with `"role=ul"` and `li` structure. If you have custom styles targeting the `ButtonGroup` component, please update them accordingly to ensure compatibility with our new accessibility improvements.
