import * as React from 'react';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { InverseContext, getIsInverse } from '../../inverse';
import { convertStyleValueToString } from '../../utils';
import styled from '@emotion/styled';

/**
 * @children required
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  isInverse?: boolean;
  /**
   * Max-width of the component, set by CSS.  If a number is provided, value will be in pixels
   */
  maxWidth?: number | string;
  testId?: string;
}

const StyledContainer = styled.div<{
  isInverse?: boolean;
  maxWidth: string;
  theme: ThemeInterface;
}>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.foundation02
      : props.theme.colors.neutral08};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral};
  display: flow-root;
  margin: 0 auto;
  max-width: ${props => props.maxWidth};
  padding: ${props => `0 ${props.theme.spaceScale.spacing06}`};
`;

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const { children, maxWidth, testId, ...other } = props;

    const theme = React.useContext(ThemeContext);

    const maxWidthString = convertStyleValueToString(maxWidth, 'none');

    const inverseContext = React.useContext(InverseContext);
    const isInverse = getIsInverse(inverseContext, props.isInverse);

    return (
      <InverseContext.Provider
        value={{
          isInverse,
        }}
      >
        <StyledContainer
          ref={ref}
          data-testid={testId}
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
