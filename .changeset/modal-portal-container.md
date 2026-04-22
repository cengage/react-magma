---
'react-magma-dom': minor
---

feat(Modal): add `portalContainer` prop to control portal target

Adds an optional `portalContainer` prop to `Modal` that lets consumers specify the DOM element the modal should be portaled into. Defaults to `document.body` (unchanged behavior).
