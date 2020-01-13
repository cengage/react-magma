import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';

const StyledAmPmToggle = styled.button`
  background: none;
  border: 0;
  border-radius: 3px;
  margin-left: 3px;
  padding: 0 3px;

  &:focus {
    outline: 0;
    background: ${props => props.theme.colors.foundation01};
    color: ${props => props.theme.colors.neutral08};
  }
`;

export const AmPmToggle: React.FunctionComponent = props => {
  const { children } = props;
  const theme = React.useContext(ThemeContext);

  return <StyledAmPmToggle theme={theme}>{children}</StyledAmPmToggle>;
};
