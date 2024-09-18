import React from 'react';
import { inputBaseStyles } from '../InputBase';
import { defaultComponents, SelectComponents } from '../Select/components';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  UseComboboxGetToggleButtonPropsOptions,
  UseComboboxGetComboboxPropsOptions,
  UseComboboxGetInputPropsOptions,
} from 'downshift';

import { SelectedItemsWrapper } from '../Select/shared';
import { transparentize } from 'polished';

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
  background-color: ${props =>
    props.isInverse
      ? transparentize(0.8, props.theme.colors.neutral900)
      : props.theme.colors.neutral100};
  border: 1px solid;
  border-color: ${props =>
    props.isInverse
      ? transparentize(0.5, props.theme.colors.neutral100)
      : props.theme.colors.neutral500};
  border-radius: ${props => props.theme.borderRadius};
  display: flex;
  min-height: ${props => props.theme.spaceScale.spacing09};
  min-width: ${props => props.theme.spaceScale.spacing13};
  padding: 0 ${props => props.theme.spaceScale.spacing03} 0 0;
  width: 100%;

  ${props =>
    props.isFocused &&
    css`
      outline: 2px solid
        ${props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
      outline-offset: 2px;
    `}

  ${props =>
    props.hasError &&
    css`
      border-color: ${props.isInverse
        ? props.theme.colors.danger200
        : props.theme.colors.danger};
    `}

    ${props =>
    props.disabled &&
    css`
      background: ${props.isInverse
        ? transparentize(0.9, props.theme.colors.neutral900)
        : props.theme.colors.neutral200};
      border-color: ${props.isInverse
        ? transparentize(0.85, props.theme.colors.neutral100)
        : props.theme.colors.neutral300};
      color: ${transparentize(0.4, props.theme.colors.neutral500)};
      cursor: not-allowed;
      outline: 0;

      &::placeholder {
        color: ${transparentize(0.4, props.theme.colors.neutral500)};
      }
    `}
`;

const StyledInput = styled.input`
  ${inputBaseStyles}
  border: 0;
  display: flex;
  flex-grow: 1;
  height: ${props => props.theme.spaceScale.spacing09};
  min-width: ${props => props.theme.spaceScale.spacing07};
  padding-left: ${props => props.theme.spaceScale.spacing02};
  width: 0;

  &:focus {
    outline: 0;
  }
`;

interface ComboboxInputProps<T> {
  ariaDescribedBy?: string;
  children?: React.ReactNode | React.ReactNode[];
  customComponents?: SelectComponents<T>;
  getComboboxProps: (options?: UseComboboxGetComboboxPropsOptions) => any;
  getInputProps: (options?: UseComboboxGetInputPropsOptions) => any;
  getToggleButtonProps: (
    options?: UseComboboxGetToggleButtonPropsOptions
  ) => any;
  hasError?: boolean;
  innerRef?: React.Ref<HTMLInputElement>;
  inputStyle?: React.CSSProperties;
  disabled?: boolean;
  isInverse?: boolean;
  isLoading?: boolean;
  isTypeahead?: boolean;
  onInputBlur?: (event: React.FocusEvent) => void;
  onInputFocus?: (event: React.FocusEvent) => void;
  onInputKeyDown?: (event: any) => void;
  onInputKeyPress?: (event: any) => void;
  onInputKeyUp?: (event: any) => void;
  placeholder?: string;
  selectedItems?: React.ReactNode;
  toggleButtonRef?: React.Ref<HTMLButtonElement>;
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
    innerRef,
    inputStyle,
    disabled,
    isInverse,
    isLoading,
    isTypeahead,
    onInputBlur,
    onInputFocus,
    onInputKeyDown,
    onInputKeyPress,
    onInputKeyUp,
    placeholder,
    selectedItems,
    toggleButtonRef,
  } = props;
  const theme = React.useContext(ThemeContext);

  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const { DropdownIndicator, LoadingIndicator } = defaultComponents<T>({
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
    ...(innerRef && { ref: innerRef }),
  });

  const dropdownIndicatorColor = () => {
    if (disabled) {
      if (isInverse) {
        return transparentize(0.6, theme.colors.neutral100);
      }
      return theme.colors.neutral500;
    }
    if (isInverse) {
      return theme.colors.neutral100;
    }
    return theme.colors.neutral;
  };

  return (
    <ComboBoxContainer
      {...getComboboxProps()}
      hasError={hasError}
      disabled={disabled}
      isInverse={isInverse}
      theme={theme}
    >
      <InputContainer
        {...getToggleButtonProps({
          disabled,
          ...(toggleButtonRef && { ref: toggleButtonRef }),
        })}
        hasError={hasError}
        disabled={disabled}
        isFocused={isFocused}
        isInverse={isInverse}
        style={inputStyle}
        theme={theme}
        ref={innerRef}
      >
        <SelectedItemsWrapper>
          {selectedItems}
          <StyledInput
            {...inputProps}
            aria-describedby={ariaDescribedBy}
            aria-invalid={hasError}
            disabled={disabled}
            isInverse={isInverse}
            placeholder={placeholder}
            theme={theme}
          />
        </SelectedItemsWrapper>
        {children}
        {isLoading && !isTypeahead && (
          <LoadingIndicator
            style={{ flexShrink: 0, marginRight: theme.spaceScale.spacing02 }}
          />
        )}
        <DropdownIndicator
          aria-label="toggle menu"
          color={dropdownIndicatorColor()}
        />
      </InputContainer>
    </ComboBoxContainer>
  );
}
