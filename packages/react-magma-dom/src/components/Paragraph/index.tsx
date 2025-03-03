import * as React from 'react';

import { useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  TypographyVisualStyle,
  TypographyColor,
  TypographyContextVariant,
  TypographyComponent,
} from '../Typography';

/**
 * @children required
 */
export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * The color of the component, helping to convey meaning or relative emphasis
   * @default TypographyColor.default
   */
  color?: TypographyColor;
  /**
   * Additional styles for typography based on the context of the content
   * @default TypographyContextVariant.default
   */
  contextVariant?: TypographyContextVariant;
  isInverse?: boolean;
  /**
   * If true, the component will not have the default top and bottom margin and instead will a margin value of 0
   * @default false
   */
  noMargins?: boolean;
  /**
   * If true, the component will not have the default bottom margin and instead will have a value of 0
   * @default false
   */
  noBottomMargin?: boolean;
  /**
   * If true, the component will not have the default top margin and instead will have a value of 0
   * @default false
   */
  noTopMargin?: boolean;
  /**
   * @internal
   */
  testId?: string;
  /**
   * @internal
   */
  theme?: any;
  /**
   * Applies visual styles including font-size, font-weight, line-height and margins
   * @default TypographyVisualStyle.bodyMedium
   */
  visualStyle?: TypographyVisualStyle;
}

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  (props, ref) => {
    const { color, testId, visualStyle, children, ...other } = props;
    const theme = React.useContext(ThemeContext);

    return (
      <TypographyComponent
        {...other}
        color={color || TypographyColor.default}
        data-testid={testId}
        isInverse={useIsInverse(props.isInverse)}
        ref={ref}
        theme={theme}
        visualStyle={visualStyle || TypographyVisualStyle.bodyMedium}
      >
        {children}
      </TypographyComponent>
    );
  }
);
