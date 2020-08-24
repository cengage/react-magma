import * as React from 'react';
import {
  HeadingXLargeComponent,
  HeadingLargeComponent,
  HeadingMediumComponent,
  HeadingSmallComponent,
  HeadingXSmallComponent,
  HeadingXXSmallComponent,
  BodyLargeComponent,
  BodyMediumComponent,
  BodySmallComponent,
  BodyXSmallComponent,
  ExpressiveHeadingXLargeComponent,
  ExpressiveHeadingLargeComponent,
  ExpressiveHeadingMediumComponent,
  ExpressiveHeadingSmallComponent,
  ExpressiveHeadingXSmallComponent,
  ExpressiveHeadingXXSmallComponent,
  ExpressiveBodyLargeComponent
} from './styles';
import { ThemeContext } from '../../theme/ThemeContext';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  color?: TypographyColor;
  component?: string;
  isInverse?: boolean;
  hasMargins?: boolean;
  ref?: any;
  testId?: string;
  variant?: TypographyVariant;
}

export enum TypographyColor {
  danger = 'danger',
  default = 'default', // default
  success = 'success',
  subdued = 'subdued'
}

export enum TypographyVariant {
  headingXLarge = 'headingXLarge',
  headingLarge = 'headingLarge',
  headingMedium = 'headingMedium',
  headingSmall = 'headingSmall',
  headingXSmall = 'headingXSmall',
  bodyLarge = 'bodyLarge',
  bodyMedium = 'bodyMedium',
  bodySmall = 'bodySmall',
  bodyXSmall = 'bodyXSmall',
  expressiveHeadingXLarge = 'expressiveHeadingXLarge',
  expressiveHeadingLarge = 'expressiveHeadingLarge',
  expressiveHeadingMedium = 'expressiveHeadingMedium',
  expressiveHeadingSmall = 'expressiveHeadingSmall',
  expressiveHeadingXSmall = 'expressiveHeadingXSmall'
}

export const Typography: React.FunctionComponent<TypographyProps> = React.forwardRef(
  (
    {
      children,
      component,
      variant = TypographyVariant.bodyMedium,
      testId,
      ...other
    }: TypographyProps,
    ref: any
  ) => {
    const theme = React.useContext(ThemeContext);

    const variantComponents = {
      headingXLarge: HeadingXLargeComponent,
      headingLarge: HeadingLargeComponent,
      headingMedium: HeadingMediumComponent,
      headingSmall: HeadingSmallComponent,
      headingXSmall: HeadingXSmallComponent,
      headingXXSmall: HeadingXXSmallComponent,
      bodyLarge: BodyLargeComponent,
      bodyMedium: BodyMediumComponent,
      bodySmall: BodySmallComponent,
      bodyXSmall: BodyXSmallComponent,
      expressiveHeadingXLarge: ExpressiveHeadingXLargeComponent,
      expressiveHeadingLarge: ExpressiveHeadingLargeComponent,
      expressiveHeadingMedium: ExpressiveHeadingMediumComponent,
      expressiveHeadingSmall: ExpressiveHeadingSmallComponent,
      expressiveHeadingXSmall: ExpressiveHeadingXSmallComponent,
      expressiveHeadingXXSmall: ExpressiveHeadingXXSmallComponent,
      expressiveBodyLarge: ExpressiveBodyLargeComponent
    };

    const elementToRender = component ? component : null;
    const StyledComponent = variantComponents[variant];

    return (
      <StyledComponent
        {...other}
        as={elementToRender}
        data-testid={testId}
        ref={ref}
        theme={theme}
      >
        {children}
      </StyledComponent>
    );
  }
);
