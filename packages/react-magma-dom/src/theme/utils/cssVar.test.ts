import { magma } from '../magma';
import { pathToCssVarName } from './cssVar';
import { createCssVarDeclarations, token } from '../tokens';

describe('pathToCssVarName', () => {
  it('aliases "colors" to "color"', () => {
    expect(pathToCssVarName('colors.primary500')).toBe(
      '--magma-color-primary-500'
    );
  });

  it('splits letter-digit boundaries', () => {
    expect(pathToCssVarName('colors.primary')).toBe('--magma-color-primary');
    expect(pathToCssVarName('colors.neutral100')).toBe(
      '--magma-color-neutral-100'
    );
  });

  it('kebab-cases camelCase segments', () => {
    expect(pathToCssVarName('bodyFont')).toBe('--magma-body-font');
    expect(pathToCssVarName('borderRadius')).toBe('--magma-border-radius');
  });

  it('handles deeply nested paths', () => {
    expect(pathToCssVarName('typeScale.size03.fontSize')).toBe(
      '--magma-type-scale-size-03-font-size'
    );
    expect(pathToCssVarName('spaceScale.spacing04')).toBe(
      '--magma-space-scale-spacing-04'
    );
  });

  it('handles digit-uppercase boundaries', () => {
    expect(
      pathToCssVarName('typographyExpressiveVisualStyles.heading2XLarge')
    ).toBe('--magma-typography-expressive-visual-styles-heading-2-x-large');
  });
});

describe('token', () => {
  it('emits a typed var() reference with fallback', () => {
    expect(token.var('colors.primary500')).toBe(
      `var(--magma-color-primary-500, ${magma.colors.primary500})`
    );
  });

  it('emits a typed var() reference without a fallback when requested', () => {
    expect(token.var('colors.primary500', { fallback: false })).toBe(
      'var(--magma-color-primary-500)'
    );
  });

  it('supports direct function usage as a var() shorthand', () => {
    expect(token('spaceScale.spacing04')).toBe(
      `var(--magma-space-scale-spacing-04, ${magma.spaceScale.spacing04})`
    );
  });

  it('can return raw token values', () => {
    expect(token.raw('colors.info500')).toBe(magma.colors.info500);
  });

  it('resolves raw aliases through an overridden primitive', () => {
    const customTheme = {
      ...magma,
      colors: {
        ...magma.colors,
        primary500: '#6543ff',
      },
    };

    expect(token.raw('colors.primary', customTheme)).toBe('#6543ff');
  });

  it('derives semantic and component tokens from the active theme', () => {
    const customTheme = {
      ...magma,
      colors: {
        ...magma.colors,
        info100: '#eefaff',
      },
    };

    expect(token.raw('semanticColors.status.info.surface', customTheme)).toBe(
      '#eefaff'
    );
    expect(token.raw('components.alert.info.background', customTheme)).toBe(
      '#eefaff'
    );
    expect(
      token.var('components.alert.info.background', { theme: customTheme })
    ).toBe(
      'var(--magma-components-alert-info-background, var(--magma-semantic-colors-status-info-surface, var(--magma-color-info-100, #eefaff)))'
    );
  });

  it('preserves aliases in generated component and semantic declarations', () => {
    const declarations = createCssVarDeclarations(magma);

    expect(declarations).toContain(
      `--magma-semantic-colors-status-info-surface: var(--magma-color-info-100, ${magma.colors.info100});`
    );
    expect(declarations).toContain(
      `--magma-components-alert-info-background: var(--magma-semantic-colors-status-info-surface, ${magma.colors.info100});`
    );
  });
});
