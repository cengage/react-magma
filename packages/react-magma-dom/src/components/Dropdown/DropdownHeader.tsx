import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';

/**
 * @children required
 */
export interface DropdownHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
}

const StyledDiv = styled.div`
  color: ${props => props.theme.colors.neutral03};
  font-size: ${props => props.theme.typeScale.size01.fontSize};
  line-height: ${props => props.theme.typeScale.size01.lineHeight};
  font-weight: bold;
  margin: 0;
  padding: ${props =>
    `${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing05} ${props.theme.spaceScale.spacing02}`};
  text-transform: uppercase;
`;

export const DropdownHeader = React.forwardRef<
  HTMLDivElement,
  DropdownHeaderProps
>((props, ref) => {
  const { children, testId, ...other } = props;

  const theme = React.useContext(ThemeContext);

  return (
    <StyledDiv {...other} data-testid={testId} theme={theme}>
      {children}
    </StyledDiv>
  );
});
