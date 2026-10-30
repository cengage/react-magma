---
'react-magma-dom': patch
---

fix(Tooltip): skip `aria-describedby` when the tooltip content matches the trigger's `aria-label` to prevent duplicate screen reader announcements
