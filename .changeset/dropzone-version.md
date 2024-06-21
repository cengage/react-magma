---
"@react-magma/dropzone": major
---

fix(Dropzone): Update `react-dropzone` version from `11.3.2` to `14.2.3`.

**Breaking Change:** The `accept` prop will now require an object instead of a string or array of strings.
Before: `accept: [".jpeg", ".png"]`. After: `accept: {"image/*": [".jpeg", ".png"]}`.
