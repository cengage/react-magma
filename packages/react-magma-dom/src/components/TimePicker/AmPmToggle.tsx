import * as React from 'react';

import styled from '@emotion/styled';
import { transparentize } from 'polished';

import { getInputColor } from './TimePicker';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';

interface AmPmToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  isInverse?: boolean;
  isFocused?: boolean;
}

const StyledAmPmToggle = styled.button<{
  theme: ThemeInterface;
  isInverse?: boolean;
  isFocused?: boolean;
}>`
  background: none;
  border: 0;
  border-bottom: 2px solid transparent; // Reserve space for border when focused
  margin-left: 3px;
  padding: 0;
  color: ${props =>
    getInputColor(props.isInverse, props.isFocused, props.theme)};

  &:focus {
    outline: 0;
    border-bottom: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.info200
          : props.theme.colors.info500};
    background: ${props =>
      props.isInverse
        ? props.theme.colors.info700
        : transparentize(0.2, props.theme.colors.info200)};
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral100
        : props.theme.colors.neutral700};

    &::placeholder {
      color: ${props =>
        props.isInverse
          ? props.theme.colors.neutral100
          : props.theme.colors.neutral700};
    }

    &::selection {
      background: ${props =>
        props.isInverse
          ? props.theme.colors.info700
          : transparentize(1, props.theme.colors.info200)};
    }
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
