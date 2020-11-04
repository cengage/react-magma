import React from 'react';
import { inputBaseStyles } from '../InputBase';
import { defaultComponents, SelectComponents } from '../Select/components';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '../../theme/styled';

const StyledButton = styled.div<{ disabled?: boolean; hasError?: boolean }>`
  ${inputBaseStyles}

  align-items: center;
  display: flex;
  height: auto;
  min-height: 40px;
  padding-left: 4px;
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
  customComponents?: SelectComponents;
  hasError?: boolean;
  disabled?: boolean;
  isInverse?: boolean;
  style?: React.CSSProperties;
  toggleButtonProps: any;
  tabindex?: number;
}

export function SelectTriggerButton<T>(props: SelectTriggerButtonInterface<T>) {
  const {
    ariaDescribedBy,
    children,
    customComponents,
    hasError,
    disabled,
    isInverse,
    style,
    toggleButtonProps,
  } = props;
  const theme = React.useContext(ThemeContext);

  const { DropdownIndicator } = defaultComponents({
    ...customComponents,
  });

  return (
    <StyledButton
      {...toggleButtonProps}
      aria-describedby={ariaDescribedBy}
      data-testid="selectTriggerButton"
      hasError={hasError}
      disabled={disabled}
      isInverse={isInverse}
      role="button"
      style={style}
      theme={theme}
      tabIndex={disabled ? undefined : 0}
    >
      <ChildrenContainer>{children}</ChildrenContainer>
      <DropdownIndicator />
    </StyledButton>
  );
}
