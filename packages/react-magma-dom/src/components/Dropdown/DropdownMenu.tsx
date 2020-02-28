import * as React from 'react';
import styled from '../../theme/styled';

const StyledMenu = styled.ul`
  margin: 0;
  padding: 0;
`;

export const DropdownMenu: React.FunctionComponent = ({
  children,
  ...other
}) => {
  return (
    <StyledMenu {...other} role="menu">
      {children}
    </StyledMenu>
  );
};
