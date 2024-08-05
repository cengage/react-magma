---
"react-magma-dom": patch
---

fix(Modal): Remove unnecessary `aria-describedBy=“modal”`. Add `ariaLabel` prop so that Modals without headers can customize the `aria-label` instead of defaulting to `aria-label="modal"` which is not correct for a11y standards.