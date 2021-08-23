import * as React from 'react';
import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  TypographyColor,
  TypographyContextVariant,
  TypographyVisualStyle,
  TypographyComponent,
  TypographyProps,
} from '../Typography';

/**
 * @children required
 */
export interface HeadingProps extends TypographyProps<HTMLHeadingElement> {
  /**
   * The color of the component, that helps to convey meaning or relative emphasis
   * @default TypographyColor.default
   */
  color?: TypographyColor;
  /**
   * Additional styles for typography based on the context of the content
   * @default TypographyColor.default
   */
  contextVariant?: TypographyContextVariant;
  isInverse?: boolean;
  /**
   * Number to indicate which level heading will render (e.g. h1, h2 etc.)
   */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  testId?: string;
  /**
   * Applies visual styles including font-size, font-weight, line-height and margins
   */
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
        isInverse={useIsInverse(props.isInverse)}
        ref={ref}
        visualStyle={visualStyle ? visualStyle : stylesFromLevel[level]}
        theme={theme}
      >
        {children}
      </TypographyComponent>
    );
  }
);
