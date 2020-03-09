import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

const StyledItem = styled.li`
  line-height: 20px;
  list-style: none;
  margin: 0;
  padding: 5px 0;
`;

const StyledHr = styled.hr`
  background: ${props => props.theme.colors.neutral06};
  height: 1px;
`;

export const DropdownMenuDivider: React.FunctionComponent = () => {
  const theme = React.useContext(ThemeContext);

  return (
    <StyledItem>
      <StyledHr theme={theme} />
    </StyledItem>
  );
};
