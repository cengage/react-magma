import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  TypographyColor,
  TypographyTypeStyle,
  TypographyVariant
} from '../Typography';
import { ParagraphComponent } from '../Paragraph';

import {
  HeadingXLargeComponent,
  HeadingLargeComponent,
  HeadingMediumComponent,
  HeadingSmallComponent,
  HeadingXSmallComponent,
  HeadingXXSmallComponent
} from './styles';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  color?: TypographyColor;
  isInverse?: boolean;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  ref?: any;
  testId?: string;
  tabIndex?: number;
  typeStyle?: TypographyTypeStyle;
  variant?: TypographyVariant;
}

export const Heading: React.FunctionComponent<HeadingProps> = React.forwardRef(
  ({ level, testId, variant, children, ...other }: HeadingProps, ref: any) => {
    const theme = React.useContext(ThemeContext);

    const variantComponents = {
      headingXLarge: HeadingXLargeComponent,
      headingLarge: HeadingLargeComponent,
      headingMedium: HeadingMediumComponent,
      headingSmall: HeadingSmallComponent,
      headingXSmall: HeadingXSmallComponent,
      headingXXSmall: HeadingXXSmallComponent,
      bodyLarge: ParagraphComponent,
      bodyMedium: ParagraphComponent,
      bodySmall: ParagraphComponent,
      bodyXSmall: ParagraphComponent
    };

    const headingLevels = {
      1: HeadingXLargeComponent,
      2: HeadingLargeComponent,
      3: HeadingMediumComponent,
      4: HeadingSmallComponent,
      5: HeadingXSmallComponent,
      6: HeadingXXSmallComponent
    };

    const HeadingComponent = variant
      ? variantComponents[variant]
      : headingLevels[level];

    const headingElement = `h${level}`;

    return (
      <HeadingComponent
        {...other}
        as={headingElement}
        data-testid={testId}
        ref={ref}
        variant={variant}
        theme={theme}
      >
        {children}
      </HeadingComponent>
    );
  }
);
