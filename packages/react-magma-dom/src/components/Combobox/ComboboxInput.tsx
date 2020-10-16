import React from 'react';
import { inputBaseStyles } from '../InputBase';
import { defaultComponents, SelectComponents } from '../Select/components';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  UseComboboxGetToggleButtonPropsOptions,
  UseComboboxGetComboboxPropsOptions,
  UseComboboxGetInputPropsOptions,
} from 'downshift';

import { SelectedItemsWrapper } from '../Select/shared';

const ComboBoxContainer = styled.div<{
  hasError?: boolean;
  isInverse?: boolean;
  theme?: any;
}>`
  display: flex;
`;

const InputContainer = styled.div<{
  hasError?: boolean;
  disabled?: boolean;
  isFocused?: boolean;
  isInverse?: boolean;
  theme?: any;
}>`
  align-items: center;
  background: ${props => props.theme.colors.neutral08};
  border: 1px solid;
  border-color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral03};
  border-radius: 4px;
  display: flex;
  min-height: 40px;
  padding: 0 8px 0 0;
  width: 100%;

  ${props =>
    props.isFocused &&
    css`
      outline: 2px dotted
        ${props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
      outline-offset: 4px;
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

    ${props =>
    props.disabled &&
    css`
      background: ${props.theme.colors.neutral07};
      border-color: ${props.theme.colors.neutral05};
      color: ${props.theme.colors.disabledText};
      cursor: not-allowed;
      outline: 0;

      &::placeholder {
        color: ${props.theme.colors.disabledText};
      }
    `}
`;

const StyledInput = styled.input`
  ${inputBaseStyles}
  border: 0;
  display: flex;
  flex-grow: 1;
  height: 32px;
  min-width: 30px;
  padding-left: 4px;
  width: 0;

  &:focus {
    outline: 0;
  }
`;

interface ComboboxInputProps<T> {
  ariaDescribedBy?: string;
  children?: React.ReactNode | React.ReactNode[];
  customComponents?: SelectComponents;
  getComboboxProps: (options?: UseComboboxGetComboboxPropsOptions) => any;
  getInputProps: (options?: UseComboboxGetInputPropsOptions) => any;
  getToggleButtonProps: (
    options?: UseComboboxGetToggleButtonPropsOptions
  ) => any;
  hasError?: boolean;
  inputStyle?: React.CSSProperties;
  disabled?: boolean;
  isInverse?: boolean;
  isLoading?: boolean;
  onInputBlur?: (event: React.FocusEvent) => void;
  onInputFocus?: (event: React.FocusEvent) => void;
  onInputKeyDown?: (event: React.KeyboardEvent) => void;
  onInputKeyPress?: (event: React.KeyboardEvent) => void;
  onInputKeyUp?: (event: React.KeyboardEvent) => void;
  placeholder?: string;
  selectedItems?: React.ReactNode;
}

export const ComboboxInput = React.forwardRef(
  <T extends {}>(props: ComboboxInputProps<T>, ref: any) => {
    const {
      ariaDescribedBy,
      children,
      customComponents,
      getComboboxProps,
      getInputProps,
      getToggleButtonProps,
      hasError,
      inputStyle,
      disabled,
      isInverse,
      isLoading,
      onInputBlur,
      onInputFocus,
      onInputKeyDown,
      onInputKeyPress,
      onInputKeyUp,
      placeholder,
      selectedItems,
    } = props;
    const theme = React.useContext(ThemeContext);

    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    const { DropdownIndicator, LoadingIndicator } = defaultComponents({
      ...customComponents,
    });

    function handleBlur(e: React.FocusEvent) {
      setIsFocused(false);

      onInputBlur && typeof onInputBlur === 'function' && onInputBlur(e);
    }

    function handleFocus(e: React.FocusEvent) {
      setIsFocused(true);

      onInputFocus && typeof onInputFocus === 'function' && onInputFocus(e);
    }

    const inputProps = getInputProps({
      disabled: disabled,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onKeyDown: onInputKeyDown,
      onKeyPress: onInputKeyPress,
      onKeyUp: onInputKeyUp,
      ref,
    });

    return (
      <ComboBoxContainer
        {...getComboboxProps()}
        hasError={hasError}
        disabled={disabled}
        isInverse={isInverse}
        theme={theme}
      >
        <InputContainer
          {...getToggleButtonProps({ disabled: disabled })}
          hasError={hasError}
          disabled={disabled}
          isFocused={isFocused}
          isInverse={isInverse}
          style={inputStyle}
          theme={theme}
        >
          <SelectedItemsWrapper>
            {selectedItems}
            <StyledInput
              {...inputProps}
              aria-describedby={ariaDescribedBy}
              aria-invalid={hasError}
              disabled={disabled}
              placeholder={placeholder}
              theme={theme}
            />
          </SelectedItemsWrapper>
          {children}
          {isLoading && (
            <LoadingIndicator style={{ flexShrink: 0, marginRight: '4px' }} />
          )}
          <DropdownIndicator aria-label="toggle menu" />
        </InputContainer>
      </ComboBoxContainer>
    );
  }
);
