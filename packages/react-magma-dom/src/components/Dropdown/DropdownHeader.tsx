import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

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

export const DropdownHeader: React.FunctionComponent<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children, ...other }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <StyledDiv {...other} theme={theme}>
      {children}
    </StyledDiv>
  );
};
