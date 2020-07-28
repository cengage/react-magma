import React from 'react';
import { baseInputStyles } from '../BaseInput';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '../../theme/styled';

const StyledButton = styled.div`
  ${baseInputStyles}

  align-items: center;
  display: flex;
  text-align: left;
`;

interface SelectTriggerButtonInterface<T> {
  children: React.ReactNode[];
  toggleButtonProps: any;
}

export function SelectTriggerButton<T>(props: SelectTriggerButtonInterface<T>) {
  const { children, toggleButtonProps } = props;
  const theme = React.useContext(ThemeContext);

  return (
    <StyledButton
      role="button"
      {...toggleButtonProps}
      theme={theme}
      tabIndex={0}
    >
      {children}
      <CaretDownIcon size={10} testId="caretDown" />
    </StyledButton>
  );
}
