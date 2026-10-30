---
name: react-magma
description: Use when writing or editing React UI in a project that depends on react-magma-dom (Cengage's accessible component library) — finding the right component, its props, theming, inverse surfaces, icons and accessibility.
---

# React Magma (react-magma-dom {{version}})

Accessible React component library. This guide is generated for react-magma-dom {{version}}, which requires React {{reactVersion}}.

## How to use this guide

1. Find the matching component in the Catalog before creating UI. Use it whenever its API supports the requested behavior.
2. Read the installed declarations and JSDoc: required/optional props, defaults, accepted values and enums. Inspect implementation when unclear; never guess or force unsupported props with casts or `any`.
3. Before layout or styling work, read [styling.md](styling.md). Read [setup.md](setup.md) for app setup and theme APIs.
4. Preserve requested behavior; do not invent required fields, validation or defaults.
5. Review your diff against the rules below, then run the project's configured type-check. A bundler build may not check TypeScript; report when no type-check is available.

## Required design-system rules

- Use `Heading` with a semantic `level` instead of raw `h1`–`h6`, and `Paragraph` instead of raw `p` for standalone content; preserve built-in component typography. Use Magma typography variants for other styled text.
- Use Magma layout and widgets: `Container`, `Flex`, `Grid`, `Spacer`, `Card`, `Table`, `Tabs`, `Pagination`, `EmptyState`, etc. Keep native semantic landmarks; custom replacements require an API gap or an explicit user/project exception. Explain any exception.
- Read the active `ThemeContext` for spacing, colors, fonts, text sizes, radii, icons and breakpoints. Do not introduce literal design values, external fonts or cosmetic overrides of Magma states.
- Map intended spacing to the nearest active `spaceScale` value; ties use the smaller value. With default tokens, 5px becomes `spacing02` (4px), not a new 5px rule. Do not bypass tokens with arithmetic. Preserve explicit requirements and accessibility constraints; see [styling.md](styling.md) for structural CSS exceptions.

## Library conventions

- Import from the package root: `import { Button, ButtonColor } from 'react-magma-dom'`.
- Variants are exported enums (`ButtonColor.secondary`, `ModalSize.large`).
- Dark backgrounds: `isInverse` prop, or `<InverseContext.Provider value={{ isInverse: true }}>` for a region.
- Accessibility is built in: form fields take `labelText`, icon-only buttons require `aria-label`, `Heading` takes a semantic `level`.
- `Hyperlink` takes `to`, not `href`.
- When an icon is needed, look for it in `react-magma-icons` first and verify its exported name and props in the installed package. Import from `react-magma-icons`; don't draw a replacement or use another icon library unless the project specifically requires it.

Theme, i18n, and other package-level APIs: [setup.md](setup.md).

## Catalog

Format: **Folder** — purpose (search words). Not for: need → better component. Also: related exports. Exports not listed are internal helpers.

{{catalog}}

### Public hooks

Public hooks available for consumer use: `useDeviceDetect`, `useFocusLock`, `useMediaQuery`.

### Other public exports

{{core}}
