import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

const StyledItem = styled.li`
  color: ${props => props.theme.colors.neutral03};
  font-size: 13px;
  font-weight: bold;
  line-height: 20px;
  list-style: none;
  margin: 0;
  padding: 10px 20px 5px;
  text-transform: uppercase;
`;

export const DropdownMenuHeader: React.FunctionComponent = () => {
  const theme = React.useContext(ThemeContext);

  return <StyledItem theme={theme}>Section Title</StyledItem>;
};
