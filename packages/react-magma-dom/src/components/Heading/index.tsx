import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  TypographyColor,
  TypographyContextVariant,
  TypographyVisualStyle,
  TypographyComponent,
} from '../Typography';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  color?: TypographyColor;
  contextVariant?: TypographyContextVariant;
  isInverse?: boolean;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  testId?: string;
  visualStyle?: TypographyVisualStyle;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const { level, testId, visualStyle, children, ...other } = props;
    const theme = React.useContext(ThemeContext);

    const stylesFromLevel = {
      1: TypographyVisualStyle.headingXLarge,
      2: TypographyVisualStyle.headingLarge,
      3: TypographyVisualStyle.headingMedium,
      4: TypographyVisualStyle.headingSmall,
      5: TypographyVisualStyle.headingXSmall,
      6: TypographyVisualStyle.heading2XSmall,
    };

    const headingElement = `h${level}`;

    return (
      <TypographyComponent
        {...other}
        as={headingElement}
        data-testid={testId}
        ref={ref}
        visualStyle={visualStyle ? visualStyle : stylesFromLevel[level]}
        theme={theme}
      >
        {children}
      </TypographyComponent>
    );
  }
);
