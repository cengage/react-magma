---
'react-magma-docs': patch
---

Fix the "Edit in CodeSandbox" button on older documentation version sites. A single deploy workflow now rebuilds and redeploys the docs for old releases (v2/v3 latest and all v4 except the latest) with the durable client-side CodeSandbox fix applied, replacing the previous per-version deploy workflows.
