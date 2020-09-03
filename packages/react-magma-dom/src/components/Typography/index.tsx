import * as React from 'react';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  color?: TypographyColor;
  element?: string;
  isInverse?: boolean;
  noMargins?: boolean;
  ref?: any;
  variant?: TypographyVariant;
  testId?: string;
}

export enum TypographyColor {
  danger = 'danger',
  default = 'default', // default
  success = 'success',
  subdued = 'subdued'
}

export enum TypographyTypeStyle {
  default = 'default', // default
  expressive = 'expressive',
  narrative = 'narrative'
}

export enum TypographyVariant {
  headingXLarge = 'headingXLarge',
  headingLarge = 'headingLarge',
  headingMedium = 'headingMedium',
  headingSmall = 'headingSmall',
  headingXSmall = 'headingXSmall',
  headingXXSmall = 'headingXSmall',
  bodyLarge = 'bodyLarge',
  bodyMedium = 'bodyMedium',
  bodySmall = 'bodySmall',
  bodyXSmall = 'bodyXSmall'
}
