---
'react-magma-dom': patch
---

fix(DatePicker): accessibility fixes for WCAG 2.2 AA compliance

- A11Y-5197: Fix ESC key behavior to prevent closing parent modal
  - Add native DOM event listener in capture phase to intercept ESC before Modal's listener
  - Use stopImmediatePropagation() to prevent event from reaching Modal
  - Implement ESC closes innermost element first (keyboard shortcuts → calendar → modal stays open)
- A11Y-5198: Improve screen reader tooltip announcement for keyboard shortcut button
  - Restructure tooltip to wrap button properly
  - Update aria-label to "Keyboard instructions for calendar widget"
- A11Y-5199: Complete ARIA grid pattern for calendar
  - Add role="grid" to calendar table element
  - Add role="gridcell" to all date cells and empty cells
  - Add scope="col" to tableDaysHeaders
- A11Y-5200: Implement focus trap in keyboard instructions modal
  - Auto-focus "Back to Calendar" button when keyboard shortcuts open
  - Tab key cycles within modal instead of escaping to parent
  - Uses useFocusLock hook for proper focus management
- A11Y-5201: Ensure focus returns to calendar after closing keyboard shortcuts
