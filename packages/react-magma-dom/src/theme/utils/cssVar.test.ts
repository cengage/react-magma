import { magma } from '../magma';
import { pathToCssVarName, tk } from './cssVar';

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

describe('tk', () => {
  it('emits var() with primitive fallback', () => {
    expect(tk(magma, 'colors.primary500')).toBe(
      `var(--magma-color-primary-500, ${magma.colors.primary500})`
    );
  });

  it('emits var() with no fallback when value is missing', () => {
    expect(tk(magma, 'colors.doesNotExist')).toBe(
      'var(--magma-color-does-not-exist)'
    );
  });

  it('emits var() with no fallback when value is a non-primitive object', () => {
    expect(tk(magma, 'colors')).toBe('var(--magma-color)');
  });

  it('resolves nested string leaves', () => {
    expect(tk(magma, 'typeScale.size03.fontSize')).toBe(
      `var(--magma-type-scale-size-03-font-size, ${magma.typeScale.size03.fontSize})`
    );
  });

  it('resolves top-level string leaves', () => {
    expect(tk(magma, 'bodyFont')).toBe(
      `var(--magma-body-font, ${magma.bodyFont})`
    );
    expect(tk(magma, 'borderRadius')).toBe(
      `var(--magma-border-radius, ${magma.borderRadius})`
    );
  });

  it('resolves numeric leaves', () => {
    expect(tk(magma, 'iconSizes.medium')).toBe(
      `var(--magma-icon-sizes-medium, ${magma.iconSizes.medium})`
    );
  });
});
