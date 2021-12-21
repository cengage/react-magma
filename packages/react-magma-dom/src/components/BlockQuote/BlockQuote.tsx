import * as React from 'react';
import styled from '../../theme/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { InverseContext, useIsInverse } from '../../inverse';

/**
 * @children required
 */
export interface BlockQuoteProps extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
  isInverse?: boolean;
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

const StyledBlockQuote = styled.div<BlockQuoteProps>`
  border-left: 4px solid
    ${props =>
      props.isInverse
        ? props.theme.colors.neutral08
        : props.theme.colors.neutral06};
  padding: 10px 0 4px 20px;
`;

export const BlockQuote = React.forwardRef<HTMLDivElement, BlockQuoteProps>(
  (props, ref) => {
    const { children, testId, isInverse: isInverseProp, ...rest } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    return (
      <InverseContext.Provider value={{ isInverse }}>
        <StyledBlockQuote
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
