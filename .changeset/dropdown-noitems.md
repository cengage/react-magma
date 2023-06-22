---
'react-magma-dom': patch
---

fix(dropdown): Dropdowns without `DropdownMenuItem` will get focused on open.
Fixes issue where these dropdowns could not be closed on Escape in Safari, and should be readable by screenreaders.
