---
'react-magma-dom': patch
---

fix(Table, Datagrid): Improve screen reader announcements for table navigation and pagination.

- Removed aria-live from Datagrid table to prevent automatic reading of entire table content when rows per page changes
- Added aria-live="polite" to TablePagination page count to announce pagination status updates
- Added proper ARIA attributes (role="region", aria-label/aria-labelledby) to scrollable table wrapper to prevent verbose screen reader announcements
