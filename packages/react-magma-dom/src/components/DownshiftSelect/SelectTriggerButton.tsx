import React from 'react';
import { baseInputStyles } from '../BaseInput';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '../../theme/styled';

const StyledButton = styled.div<{ hasError?: boolean }>`
  ${baseInputStyles}

  align-items: center;
  display: flex;
  height: auto;
  min-height: 37px;
  text-align: left;
`;

const ChildrenContainer = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
`;

interface SelectTriggerButtonInterface<T> {
  ariaDescribedBy?: string;
  children: React.ReactNode[];
  hasError?: boolean;
  isDisabled?: boolean;
  isInverse?: boolean;
  toggleButtonProps: any;
  tabindex?: number;
}

export function SelectTriggerButton<T>(props: SelectTriggerButtonInterface<T>) {
  const {
    ariaDescribedBy,
    children,
    hasError,
    isDisabled,
    isInverse,
    toggleButtonProps
  } = props;
  const theme = React.useContext(ThemeContext);

  return (
    <StyledButton
      aria-describedby={ariaDescribedBy}
      aria-invalid={hasError}
      hasError={hasError}
      isInverse={isInverse}
      role="button"
      {...toggleButtonProps}
      theme={theme}
      tabIndex={isDisabled ? undefined : 0}
    >
      <ChildrenContainer>{children}</ChildrenContainer>
      <CaretDownIcon size={10} testId="caretDown" />
    </StyledButton>
  );
}
