import * as React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { InverseContext, useIsInverse } from '../../inverse';
import { Colors, ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';

/**
 * @children required
 */
export interface BlockQuoteProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Style properties for the left border color which accept custom CSS hex values.
   */
  borderStyle?: keyof Colors | string;
  isInverse?: boolean;
  /**
   * @internal
   */
  testId?: string;
  theme?: ThemeInterface;
}

const BlockQuoteStyles = props => css`
  border-left: 4px solid
    ${props.isInverse
      ? props.borderStyle || props.theme.colors.neutral100
      : props.borderStyle || props.theme.colors.neutral300};
  padding: 10px 0 4px 20px;
  margin: 0;
  font-family: ${props.theme.bodyFont};
`;

const StyledBlockQuote = styled.figure<BlockQuoteProps>`
  ${BlockQuoteStyles};
`;

export const BlockQuote = React.forwardRef<HTMLDivElement, BlockQuoteProps>(
  (props, ref) => {
    const {
      borderStyle,
      children,
      testId,
      isInverse: isInverseProp,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    return (
      <InverseContext.Provider value={{ isInverse }}>
        <StyledBlockQuote
          borderStyle={theme.colors[borderStyle] || borderStyle}
          theme={theme}
          isInverse={isInverse}
          ref={ref}
          data-testid={props.testId}
          {...rest}
        >
          {children}
        </StyledBlockQuote>
      </InverseContext.Provider>
    );
  }
);
