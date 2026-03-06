---
'react-magma-dom': patch
---

fix(ButtonGroup): Accessibility issue: now `ButtonGroup` is list in the HTML with role="list".

**Important**: We have modified the HTML structure of `ButtonGroup` component to meet accessibility requirements by changing it from a `div` to `ul>li` structure. If you have custom styles targeting the `ButtonGroup` component, please update them accordingly to ensure compatibility with our new accessibility improvements.
