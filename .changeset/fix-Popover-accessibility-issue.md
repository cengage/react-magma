---
'react-magma-dom': patch
---

fix(Popover): Move `aria-haspopup`, `aria-expanded`, and `aria-controls` from the trigger wrapper onto the trigger child element, so custom trigger elements correctly expose popover state to screen readers.
