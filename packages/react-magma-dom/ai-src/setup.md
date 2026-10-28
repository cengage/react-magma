# React Magma setup and theming

## App root

```tsx
import {
  GlobalStyles,
  I18nContext,
  ThemeContext,
  defaultI18n,
  magma,
} from 'react-magma-dom';

<ThemeContext.Provider value={magma}>
  <I18nContext.Provider value={defaultI18n}>
    <GlobalStyles />
    <App />
  </I18nContext.Provider>
</ThemeContext.Provider>;
```

`ThemeContext` defaults to `magma`; add the provider only for a custom theme. For a custom theme, spread `magma` and override keys: `{ ...magma, colors: { ...magma.colors, primary: '…' } }`.

## Required Magma styling

Use Magma components and the active Magma theme for UI styling. Follow [styling.md](styling.md) for typography, layout, token selection and examples. Existing custom CSS does not authorize a different design system; design-system overrides need an explicit user or project instruction naming their scope.

## Theme tokens and styling

React Magma exposes design tokens through `ThemeContext` and `magma`. Read the current theme from `ThemeContext`, rather than styling from the static default `magma` object, so custom themes are respected. Apply tokens through the consumer application's existing styling approach; React Magma does not require consumers to use Emotion or any other styling library.

Token groups include `spaceScale` (`spacing01`…`spacing14`), `typeScale` (`size01`…`size16`), `colors`, `borderRadius*`, `breakpoints` (`xs`, `small`, `medium`, `large`, `xl`), and `iconSizes`. Check exact token values before mapping a design value (for example, `spaceScale.spacing04` is `12px`, not 16px).

Use the token itself in styles or component props, rather than copying its current literal value. When creating CSS variables for tokens, place them where their consumers can inherit them, including content rendered through portals such as Modal.

Use component variants and supported props before adding CSS. Do not override Magma typography, colors, focus, hover or disabled states just to create a different visual style. Explicitly requested overrides must still preserve theming and accessibility.

## Inverse (dark surfaces)

Components accept `isInverse`. For a whole region use `<InverseContext.Provider value={{ isInverse: true }}>`; read it in your own components with `useIsInverse(props.isInverse)`.

## i18n

User-facing strings built into components come from `I18nContext`. Override by spreading `defaultI18n` and replacing keys; do not hard-code those labels in props when an i18n key exists.
