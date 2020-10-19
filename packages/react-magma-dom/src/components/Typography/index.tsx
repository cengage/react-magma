import * as React from 'react';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  color?: TypographyColor;
  element?: string;
  isInverse?: boolean;
  noMargins?: boolean;
  ref?: any;
  size?: TypographyVisualStyle;
  testId?: string;
}

export enum TypographyColor {
  danger = 'danger',
  default = 'default', // default
  success = 'success',
  subdued = 'subdued',
}

export enum TypographyContextVariant {
  default = 'default', // default
  expressive = 'expressive',
  narrative = 'narrative',
}

export enum TypographyVisualStyle {
  headingXLarge = 'headingXLarge',
  headingLarge = 'headingLarge',
  headingMedium = 'headingMedium',
  headingSmall = 'headingSmall',
  headingXSmall = 'headingXSmall',
  heading2XSmall = 'heading2XSmall',
  bodyLarge = 'bodyLarge',
  bodyMedium = 'bodyMedium',
  bodySmall = 'bodySmall',
  bodyXSmall = 'bodyXSmall',
}
