---
"@react-magma/dropzone": patch
---

fix(Dropzone): Improve accessibility for file management.

- Wrap file previews in semantic `<ul>`/`<li>` list structure.
- Add live screen reader announcements for file add, remove, delete, and upload progress.
- Return focus to the "Browse files" button after file actions.
- Delete and remove button labels now include the file name.
- Add `aria-describedby` linking the browse button to the helper message.
