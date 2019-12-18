import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export interface SpinnerProps {
  ariaLabel?: string;
  color?: string;
  size?: number;
  testId?: string;
}

const StyledSpinner = styled.span<SpinnerProps>`
  animation: spinner-border 0.75s linear infinite;
  border: 2px solid ${props => props.color};
  border-right-color: transparent;
  border-radius: 50%;
  display: inline-block;
  height: ${props => props.size}px;
  width: ${props => props.size}px;

  @keyframes spinner-border {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner: React.FunctionComponent<SpinnerProps> = ({
  ariaLabel,
  color,
  size,
  testId
}: SpinnerProps) => (
  <ThemeContext.Consumer>
    {theme => (
      <StyledSpinner
        aria-label={ariaLabel ? ariaLabel : 'Loading...'}
        color={color ? color : theme.colors.primary}
        data-testid={testId}
        size={size ? size : 15}
      />
    )}
  </ThemeContext.Consumer>
);
