import React from 'react';
import { baseInputStyles } from '../BaseInput';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '../../theme/styled';

const StyledButton = styled.div<{ hasError?: boolean }>`
  ${baseInputStyles}

  align-items: center;
  display: flex;
  text-align: left;
`;

const ChildrenContainer = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
`;

interface SelectTriggerButtonInterface<T> {
  children: React.ReactNode[];
  hasError?: boolean;
  toggleButtonProps: any;
}

export function SelectTriggerButton<T>(props: SelectTriggerButtonInterface<T>) {
  const { children, hasError, toggleButtonProps } = props;
  const theme = React.useContext(ThemeContext);

  return (
    <StyledButton
      hasError={hasError}
      role="button"
      {...toggleButtonProps}
      theme={theme}
      tabIndex={0}
    >
      <ChildrenContainer>{children}</ChildrenContainer>
      <CaretDownIcon size={10} testId="caretDown" />
    </StyledButton>
  );
}
