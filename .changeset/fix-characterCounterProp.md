---
'react-magma-dom': patch
---

fix(Character Counter): Added two new props 'maxCount' and 'hasCharacterCounter'. The prop of 'maxCount' replaces 'maxLength'. Now 'maxLength' works as the native HTML attribute.

Note: This update is a breaking change and all uses of the Character Counter need to update to the 'maxCount' prop name.
