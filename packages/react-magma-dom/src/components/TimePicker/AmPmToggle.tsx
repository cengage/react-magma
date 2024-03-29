import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';

interface AmPmToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  isInverse?: boolean;
}

const StyledAmPmToggle = styled('button')<{ theme: ThemeInterface, isInverse?: boolean }>`
  background: none;
  border: 0;
  border-radius: ${props => props.theme.borderRadiusSmall};
  margin-left: 3px;
  padding: 0 3px;
  color: ${props => props.isInverse ? props.theme.colors.neutral100 : props.theme.colors.neutral700};

  &:focus {
    outline: 0;
    background: ${props => props.isInverse ? props.theme.colors.tertiary : props.theme.colors.primary};
    color: ${props => props.isInverse ? props.theme.colors.neutral900 : props.theme.colors.neutral100};
  }
`;

export const AmPmToggle = React.forwardRef<HTMLButtonElement, AmPmToggleProps>(
  (props, ref) => {
    const { children, ...other } = props;
    const theme = React.useContext(ThemeContext);

    return (
      <StyledAmPmToggle
        {...other}
        data-testid="amPmTimeButton"
        ref={ref}
        theme={theme}
        type="button"
      >
        {children}
      </StyledAmPmToggle>
    );
  }
);
