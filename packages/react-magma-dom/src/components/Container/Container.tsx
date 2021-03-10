import * as React from 'react';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { InverseContext } from '../../inverse';
import styled from '@emotion/styled';

/**
 * @children required
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  isInverse?: boolean;
  testId?: string;
}

const StyledContainer = styled.div<{
  isInverse?: boolean;
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
  padding: ${props =>
    `${props.theme.spaceScale.spacing02} ${props.theme.spaceScale.spacing06}`};
`;

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const { children, isInverse, testId, ...other } = props;

    const theme = React.useContext(ThemeContext);

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
          theme={theme}
          {...other}
        >
          {children}
        </StyledContainer>
      </InverseContext.Provider>
    );
  }
);
