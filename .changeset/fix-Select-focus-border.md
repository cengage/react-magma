---
'react-magma-dom': patch
---

fix(Select, Multiselect): Separate focus and hover states and auto-focus first item for NVDA support.

**Note**: The Select and MultiSelect trigger element's ARIA role has changed from `role="button"` to `role="combobox"` to align with the WAI-ARIA combobox pattern. If your tests query the Select trigger by `role("button")`, update them to use `role("combobox")`.
