import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

const StyledItem = styled.li`
  cursor: pointer;
  list-style: none;
  margin: 0;
  padding: 10px 20px;

  &:hover,
  &:focus {
    background: ${props => props.theme.colors.neutral07};
  }
`;

export const DropdownMenuItem: React.FunctionComponent = ({
  children,
  ...other
}) => {
  const theme = React.useContext(ThemeContext);

  return (
    <StyledItem {...other} role="menuitem" theme={theme}>
      {children}
    </StyledItem>
  );
};
