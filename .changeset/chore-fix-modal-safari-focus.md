---
'react-magma-dom': patch
---

- fix(Modal): Fix focus escaping the modal in Safari by explicitly managing Tab navigation in `useFocusLock`.
- fix(CharacterCounter): Fix VoiceOver announcement duplication by separating the visible counter from the live region. Screen reader announcements now work cross-platform (previously macOS-only).
