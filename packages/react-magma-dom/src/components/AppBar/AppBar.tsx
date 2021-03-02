import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';

/**
 * @children required
 */
export interface AppBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, the component will render at a shorter height with less padding
   * @default false
   **/
  isCompact?: boolean;
  isInverse?: boolean;
  testId?: string;
  /*
   * @internal
   */
  theme?: ThemeInterface;
}

const StyledHeader = styled.header<{
  isCompact?: boolean;
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  align-items: center;
  background: ${props =>
    props.isInverse
      ? props.theme.colors.foundation02
      : props.theme.colors.neutral08};
  border-bottom: 1px solid ${props => props.theme.colors.neutral06};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral};
  display: flex;
  height: ${props =>
    props.isCompact ? '56px' : '88px'}; // TODO: Remove hardcoded values
  padding: ${props =>
    props.isCompact
      ? props.theme.spaceScale.spacing05
      : props.theme.spaceScale.spacing06};
`;

export const AppBar = React.forwardRef<HTMLDivElement, AppBarProps>(
  (props, ref) => {
    const { children, testId, ...other } = props;
    const theme = React.useContext(ThemeContext);

    return (
      <StyledHeader {...other} ref={ref} data-testid={testId} theme={theme}>
        {children}
      </StyledHeader>
    );
  }
);
