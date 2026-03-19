---
'react-magma-dom': patch
---

fix(ButtonGroup): Update markup to use list structure for accessibility.

**Important**: We have modified the HTML structure of `ButtonGroup` component to meet accessibility requirements by wrapping children in `<li>` elements. If you have custom styles targeting the `ButtonGroup` component's direct children, please update them accordingly.
