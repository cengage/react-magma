---
"react-magma-dom": major
---

Major version release v5.0.0 — React 18 support.

This is the first stable v5 release. It is feature-equivalent to the latest v4 (4.14.0); the headline change is the move to React 18.

**Breaking Changes**

- **React 18 required.** The `react` and `react-dom` peer dependencies are now `^18.3.1`. React 17 is no longer supported.
- **ButtonGroup HTML structure changed.** `ButtonGroup` now renders as a list (`role="list"` with `li` children) instead of a plain `div`, for accessibility. If you have custom styles targeting the previous `ButtonGroup` DOM structure, update them accordingly.
