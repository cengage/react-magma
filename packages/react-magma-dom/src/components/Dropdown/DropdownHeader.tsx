import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

const StyledDiv = styled.div`
  color: ${props => props.theme.colors.neutral03};
  font-size: ${props => props.theme.typeScale.size01.fontSize};
  line-height: ${props => props.theme.typeScale.size01.lineHeight};
  font-weight: bold;
  line-height: 20px;
  margin: 0;
  padding: 10px 20px 5px;
  text-transform: uppercase;
`;

export const DropdownHeader: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children, ...other }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <StyledDiv {...other} theme={theme}>
      {children}
    </StyledDiv>
  );
};
