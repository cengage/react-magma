import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  TypographyVisualStyle,
  TypographyColor,
  TypographyContextVariant,
  TypographyComponent,
} from '../Typography';

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: any;
  color?: TypographyColor;
  contextVariant?: TypographyContextVariant;
  isInverse?: boolean;
  noMargins?: boolean;
  ref?: any;
  testId?: string;
  theme?: any;
  visualStyle?: TypographyVisualStyle;
}

export const Paragraph: React.FunctionComponent<ParagraphProps> = React.forwardRef(
  (
    { color, testId, visualStyle, children, ...other }: ParagraphProps,
    ref: any
  ) => {
    const theme = React.useContext(ThemeContext);

    return (
      <TypographyComponent
        {...other}
        color={color || TypographyColor.default}
        data-testid={testId}
        ref={ref}
        theme={theme}
        visualStyle={visualStyle || TypographyVisualStyle.bodyMedium}
      >
        {children}
      </TypographyComponent>
    );
  }
);
