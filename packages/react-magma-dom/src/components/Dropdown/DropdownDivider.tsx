import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

const StyledHr = styled.hr`
  background: ${props => props.theme.colors.neutral06};
  height: 1px;
  margin: ${props => props.theme.spaceScale.spacing02} 0;
`;

export const DropdownDivider: React.FunctionComponent = () => {
  const theme = React.useContext(ThemeContext);

  return <StyledHr theme={theme} />;
};
