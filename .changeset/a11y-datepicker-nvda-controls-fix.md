---
'react-magma-dom': patch
---

fix(DatePicker): accessibility fixes for WCAG 2.2 AA compliance

- WAPLAT-45616: Fix Date and Time Picker (NVDA screen reader blocks the focus for keyboard navigation for the dates in the calendar table)
  - Adjusted ARIA roles in the calendar day cell to improve compatibility with NVDA screen reader.
  - Changed the td role to presentation and moved the gridcell role to the interactive element (button).
  - This prevents NVDA from switching to browse mode when navigating dates with arrow keys and allows keyboard navigation to work correctly with the screen reader.


