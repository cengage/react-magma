import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';

interface AmPmToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  ref: any;
}

const StyledAmPmToggle = styled.button<{ theme: ThemeInterface }>`
  background: none;
  border: 0;
  border-radius: 3px;
  margin-left: 3px;
  padding: 0 3px;

  &:focus {
    outline: 0;
    background: ${props => props.theme.colors.foundation};
    color: ${props => props.theme.colors.neutral08};
  }
`;

export const AmPmToggle: React.FunctionComponent<AmPmToggleProps> = React.forwardRef(
  (props: AmPmToggleProps, ref: any) => {
    const { children, ...other } = props;
    const theme = React.useContext(ThemeContext);

    return (
      <StyledAmPmToggle
        {...other}
        data-testid="amPmTimeButton"
        ref={ref}
        theme={theme}
      >
        {children}
      </StyledAmPmToggle>
    );
  }
);
