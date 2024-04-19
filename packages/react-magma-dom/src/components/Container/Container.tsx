import * as React from 'react';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { InverseContext, useIsInverse } from '../../inverse';
import { convertStyleValueToString } from '../../utils';
import styled from '../../theme/styled';

/**
 * @children required
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  isInverse?: boolean;
  /**
   * Left/right padding, set by CSS.  If a number is provided, value will be in pixels
   * @default theme.spaceScale.spacing06
   */
  gutterWidth?: number | string;
  /**
   * Max-width of the component, set by CSS.  If a number is provided, value will be in pixels
   * @default none
   */
  maxWidth?: number | string;
  /**
   * @internal
   */
  testId?: string;
}

const StyledContainer = styled.div<{
  gutterWidth: string;
  isInverse?: boolean;
  maxWidth: string;
  theme: ThemeInterface;
}>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.primary600
      : props.theme.colors.neutral100};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  display: flow-root;
  margin: 0 auto;
  max-width: ${props => props.maxWidth};
  padding: ${props => `0 ${props.gutterWidth}`};
`;

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const theme = React.useContext(ThemeContext);
    const {
      children,
      gutterWidth = theme.spaceScale.spacing06,
      maxWidth,
      testId,
      ...other
    } = props;

    const gutterWidthString = convertStyleValueToString(gutterWidth);
    const maxWidthString = convertStyleValueToString(maxWidth, 'none');

    const isInverse = useIsInverse(props.isInverse);

    return (
      <InverseContext.Provider
        value={{
          isInverse,
        }}
      >
        <StyledContainer
          ref={ref}
          data-testid={testId}
          gutterWidth={gutterWidthString}
          isInverse={isInverse}
          maxWidth={maxWidthString}
          theme={theme}
          {...other}
        >
          {children}
        </StyledContainer>
      </InverseContext.Provider>
    );
  }
);
