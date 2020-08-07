import React from 'react';
import { baseInputStyles } from '../BaseInput';
import {
  defaultComponents,
  DownshiftComponents
} from '../DownshiftSelect/components';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  UseComboboxGetToggleButtonPropsOptions,
  UseComboboxGetComboboxPropsOptions,
  UseComboboxGetInputPropsOptions
} from 'downshift';

const ComboBoxContainer = styled.div<{
  hasError?: boolean;
  isInverse?: boolean;
  theme?: any;
}>`
  display: flex;
`;

const InputContainer = styled.div<{
  hasError?: boolean;
  isDisabled?: boolean;
  isFocused?: boolean;
  isInverse?: boolean;
  theme?: any;
}>`
  align-items: center;
  background: ${props =>
    props.isDisabled
      ? props.theme.colors.neutral07
      : props.theme.colors.neutral08};
  border: 1px solid;
  border-color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral03};
  border-radius: 5px;
  display: flex;
  padding: 0 10px;
  width: 100%;

  ${props =>
    props.isFocused &&
    css`
      outline: 2px dotted
        ${props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
      outline-offset: 5px;
    `}

  ${props =>
    props.hasError &&
    css`
      border-color: ${props.theme.colors.danger};
      box-shadow: 0 0 0 1px
        ${props.isInverse
          ? props.theme.colors.neutral08
          : props.theme.colors.danger};
    `}
`;

const StyledInput = styled.input`
  ${baseInputStyles}
  border: 0;
  display: flex;
  flex-grow: 1;
  float: left;
  height: 100%;
  min-height: 35px;
  width: auto;

  &:focus {
    outline: 0;
  }
`;

interface ComboboxInputProps<T> {
  ariaDescribedBy?: string;
  children?: React.ReactNode | React.ReactNode[];
  customComponents?: DownshiftComponents;
  getComboboxProps: (options?: UseComboboxGetComboboxPropsOptions) => any;
  getInputProps: (options?: UseComboboxGetInputPropsOptions) => any;
  getToggleButtonProps: (
    options?: UseComboboxGetToggleButtonPropsOptions
  ) => any;
  hasError?: boolean;
  isDisabled?: boolean;
  isInverse?: boolean;
  isLoading?: boolean;
  onInputBlur?: (event: React.FocusEvent) => void;
  onInputFocus?: (event: React.FocusEvent) => void;
  onInputKeyDown?: (event: React.KeyboardEvent) => void;
  onInputKeyPress?: (event: React.KeyboardEvent) => void;
  onInputKeyUp?: (event: React.KeyboardEvent) => void;
  selectedItems?: React.ReactNode;
}

export function ComboboxInput<T>(props: ComboboxInputProps<T>) {
  const {
    ariaDescribedBy,
    children,
    customComponents,
    getComboboxProps,
    getInputProps,
    getToggleButtonProps,
    hasError,
    isDisabled,
    isInverse,
    isLoading,
    onInputBlur,
    onInputFocus,
    onInputKeyDown,
    onInputKeyPress,
    onInputKeyUp,
    selectedItems
  } = props;
  const theme = React.useContext(ThemeContext);

  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const { DropdownIndicator, LoadingIndicator } = defaultComponents({
    ...customComponents
  });

  function handleBlur(e) {
    setIsFocused(false);
    if (onInputBlur) {
      onInputBlur(e);
    }
  }

  function handleFocus(e) {
    setIsFocused(true);
    if (onInputFocus) {
      onInputFocus(e);
    }
  }

  return (
    <ComboBoxContainer
      {...getComboboxProps()}
      hasError={hasError}
      isInverse={isInverse}
      theme={theme}
    >
      <InputContainer
        {...getToggleButtonProps({ disabled: isDisabled })}
        hasError={hasError}
        isDisabled={isDisabled}
        isFocused={isFocused}
        isInverse={isInverse}
        theme={theme}
      >
        {selectedItems}
        <StyledInput
          {...getInputProps({
            disabled: isDisabled,
            onBlur: handleBlur,
            onFocus: handleFocus,
            onKeyDown: onInputKeyDown,
            onKeyPress: onInputKeyPress,
            onKeyUp: onInputKeyUp
          })}
          aria-describedby={ariaDescribedBy}
          aria-invalid={hasError}
          theme={theme}
        />
        {children}
        {isLoading && (
          <LoadingIndicator style={{ flexShrink: 0, marginRight: '10px' }} />
        )}
        <DropdownIndicator aria-label="toggle menu" />
      </InputContainer>
    </ComboBoxContainer>
  );
}
