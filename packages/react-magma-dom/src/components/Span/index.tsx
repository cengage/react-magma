import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { TypographyColor, TypographyVariant } from '../Typography';
import { colorStyles, getBodyFontFamily } from '../Typography/styles';

export interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: any;
  color?: TypographyColor;
  isInverse?: boolean;
  ref?: any;
  testId?: string;
  theme?: any;
  variant?: TypographyVariant;
}

const StyledSpan = styled.span<SpanProps>`
  ${colorStyles};
  font-family: ${getBodyFontFamily};
`;

export const Span: React.FunctionComponent<SpanProps> = React.forwardRef(
  ({ color, testId, variant, children, ...other }: SpanProps, ref: any) => {
    const theme = React.useContext(ThemeContext);

    return (
      <StyledSpan
        {...other}
        data-testid={testId}
        color={color || TypographyColor.default}
        ref={ref}
        theme={theme}
        variant={variant || TypographyVariant.default}
      >
        {children}
      </StyledSpan>
    );
  }
);
