# Required React Magma components and tokens

Use this page before writing layout, typography or custom styles. React Magma is the required default design system for agent-created UI. A different design system requires an explicit user request or project instruction naming its scope; existing custom styles alone do not authorize it. Follow the allowances below for unsupported APIs, structural CSS and accessibility, and report any exception and its reason.

## Choose components first

- Render standalone headings through `Heading` and paragraphs through `Paragraph`. Choose semantic heading levels independently of `TypographyVisualStyle`. If a component already supplies typography through a title, header, description or label prop, use that API without nesting another heading or paragraph inside it. For example, `Modal.header` already renders a `Heading`.
- Use `Typography` or supported typography variants for other styled text. Do not replace fonts or recreate typography with raw headings, paragraphs, CSS font rules or remote font imports.
- Use `Container`, `Flex`, `Grid`, `Spacer` and `Card` for the layout and surfaces they support. `Flex` requires `behavior`; direction, alignment and other variants use exported enums. Check each component's actual props before use.
- Use available widgets such as `Table`, `Tabs`, `Pagination`, `Accordion`, `Tooltip` and `EmptyState` instead of styling and maintaining custom equivalents. Use Magma controls, feedback and icons where supported.
- Keep native semantic elements such as `main`, `nav`, `section` and `form` where needed. Do not use paragraph typography for control labels; use the control's label API. Avoid wrappers that break valid table/list markup or semantics.
- If an API cannot support the requested behavior, select another suitable Magma component first. If none fits, use accessible native markup or a small custom implementation, style it with theme tokens, and explain the gap. Never invent props or bypass types.

## Select tokens, not arbitrary design values

Read the active theme with `useContext(ThemeContext)`. Use that theme's `spaceScale`, `colors`, typography, `borderRadius*`, `iconSizes` and `breakpoints`. Inspect their installed definitions; token names are not pixel values. Use appropriate semantic colors and typography variants, rather than numerically matching colors or guessing font sizes.

For agent-chosen padding, margin and gaps:

1. Inspect the active `spaceScale` values.
2. Select the closest token to the intended spacing; when equally close, select the smaller value. Compare actual lengths in consistent units.
3. Reference the token in the implementation. Do not copy a literal or add/subtract a constant to manufacture an off-scale value.

Default-theme examples (custom themes can change these values):

| Intended spacing | Use | Default value |
|---|---|---|
| 5px | `theme.spaceScale.spacing02` | 4px |
| 6px (tie) | `theme.spaceScale.spacing02` | 4px |
| 7px | `theme.spaceScale.spacing03` | 8px |
| 18px | `theme.spaceScale.spacing05` | 16px |

Some component props are numeric multipliers or enum keys, not CSS lengths. For example, `Flex.spacing` is a number with component-defined spacing behavior, not a `spaceScale` string. Inspect that API; use its supported spacing semantics or a token-based style such as `gap` rather than passing a token to an incompatible prop.

Keep Magma component defaults and supported variants. Never use CSS or `!important` to replace their typography, colors or interactive states with a different design. Custom styling uses the application's existing styling tools, with values from the active Magma theme; do not install another styling library.

## Necessary structural values and exceptions

Tokens govern visual design choices, not every CSS number. Values such as `0`, `auto`, percentages, `1fr`, flex ratios, content-dependent dimensions and positioning needed for behavior are valid structural CSS. Keywords such as `inherit`, `currentColor` and `transparent` are valid when preserving token-derived styling or behavior. Use the library's dimensions or component props where available. Do not invent token names when no corresponding token exists.

Do not round an explicit user requirement, an accessibility minimum or a behavior-critical size to an unsuitable smaller token. Use a suitable supported value and explain the exception. Do not round or rewrite the library's internal styles. Choose colors by their intended role and accessible contrast, not by numeric proximity.

## Example: theme-aware layout and typography

```tsx
import { useContext } from 'react';
import {
  Button,
  ButtonColor,
  Container,
  Flex,
  FlexBehavior,
  FlexDirection,
  Heading,
  Paragraph,
  ThemeContext,
} from 'react-magma-dom';

export function CoursesIntro() {
  const theme = useContext(ThemeContext);

  return (
    <main
      style={{
        backgroundColor: theme.colors.neutral100,
        paddingBlock: theme.spaceScale.spacing06,
      }}
    >
      <Container gutterWidth={theme.spaceScale.spacing05}>
        <Flex
          behavior={FlexBehavior.container}
          direction={FlexDirection.column}
          style={{ gap: theme.spaceScale.spacing03 }}
        >
          <Heading level={1}>Courses</Heading>
          <Paragraph noMargins>Manage your learning catalog.</Paragraph>
          <Button color={ButtonColor.primary}>Create course</Button>
        </Flex>
      </Container>
    </main>
  );
}
```

The inline style demonstrates reading tokens without requiring a styling library; use the consumer project's styling tools in real code. If using CSS variables, make sure portal content can also inherit them.

## Review before finishing

Inspect changed JSX and styles for raw headings/paragraphs, custom Magma widget replacements, literal spacing/colors/fonts, remote fonts and cosmetic component overrides. Replace them with components, supported variants and tokens, or report the specific justified exception. Run the project's available type-check and relevant checks; do not equate a bundler build with TypeScript validation.
