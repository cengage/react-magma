---
'react-magma-dom': patch
---

chore: Update UUID support to include v8.3.0 - v11.1.0

- For UUID v8.x users: continue using @types/uuid (now an optional peer dependency)
- For UUID v9+ users: no need for @types/uuid package
