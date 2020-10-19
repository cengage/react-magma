import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  TypographyColor,
  TypographyContextVariant,
  TypographyVisualStyle,
} from '../Typography';
import { ParagraphComponent } from '../Paragraph';

import {
  HeadingXLargeComponent,
  HeadingLargeComponent,
  HeadingMediumComponent,
  HeadingSmallComponent,
  HeadingXSmallComponent,
  Heading2XSmallComponent,
} from './styles';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  color?: TypographyColor;
  contextVariant?: TypographyContextVariant;
  isInverse?: boolean;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  ref?: any;
  testId?: string;
  tabIndex?: number;
  visualStyle?: TypographyVisualStyle;
}

export const Heading: React.FunctionComponent<HeadingProps> = React.forwardRef(
  (
    { level, testId, visualStyle, children, ...other }: HeadingProps,
    ref: any
  ) => {
    const theme = React.useContext(ThemeContext);

    const visualStyleComponents = {
      headingXLarge: HeadingXLargeComponent,
      headingLarge: HeadingLargeComponent,
      headingMedium: HeadingMediumComponent,
      headingSmall: HeadingSmallComponent,
      headingXSmall: HeadingXSmallComponent,
      heading2XSmall: Heading2XSmallComponent,
      bodyLarge: ParagraphComponent,
      bodyMedium: ParagraphComponent,
      bodySmall: ParagraphComponent,
      bodyXSmall: ParagraphComponent,
    };

    const headingLevels = {
      1: HeadingXLargeComponent,
      2: HeadingLargeComponent,
      3: HeadingMediumComponent,
      4: HeadingSmallComponent,
      5: HeadingXSmallComponent,
      6: Heading2XSmallComponent,
    };

    const HeadingComponent = visualStyle
      ? visualStyleComponents[visualStyle]
      : headingLevels[level];

    const headingElement = `h${level}`;

    return (
      <HeadingComponent
        {...other}
        as={headingElement}
        data-testid={testId}
        ref={ref}
        visualStyle={visualStyle}
        theme={theme}
      >
        {children}
      </HeadingComponent>
    );
  }
);
