---
'react-magma-dom': patch
---

fix(Modal & CharacterCounter): Fix Safari-specific issues.

- Modal: Fix focus escaping the modal in Safari by handling forward Tab from the header in `useFocusLock`. Safari does not respect `aria-modal` for focus containment, and the DOM reorder from #2183 exposed a gap in the focus trap.
- CharacterCounter: Fix visual duplication when `maxCount` is applied in Safari by removing `aria-live` from the visible element and using a single hidden live region for screen reader announcements.
