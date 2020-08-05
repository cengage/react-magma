import React from 'react';
import { baseInputStyles } from '../BaseInput';
import { defaultComponents, DownshiftComponents } from './components';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  UseComboboxGetToggleButtonPropsOptions,
  UseComboboxGetComboboxPropsOptions,
  UseComboboxGetInputPropsOptions
} from 'downshift';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { ButtonShape, ButtonVariant } from '../Button';

const ComboBoxContainer = styled.div<{ hasError?: boolean; theme?: any }>`
  border-radius: 5px;
  box-shadow: ${props =>
    props.hasError ? `0 0 0 1px ${props.theme.colors.danger}` : '0 0 0'};
  display: flex;

  > button {
    border-color: ${props =>
      props.hasError
        ? props.theme.colors.danger
        : props.theme.colors.neutral03};
  }
`;

const InputContainer = styled.div<{
  hasError?: boolean;
  isInverse?: boolean;
  theme?: any;
}>`
  align-items: center;
  background: #fff;
  border-radius: 5px 0 0 5px;
  border: 1px solid;
  border-color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral03};
  display: flex;
  width: 100%;

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
  margin-right: 8px;
  width: auto;

  &:focus {
    outline-offset: -5px;
  }
`;

interface ComboboxInputProps<T> {
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

  const { DropdownIndicator, LoadingIndicator } = defaultComponents({
    ...customComponents
  });

  const dropdownIndicatorStyles = {
    background: theme.colors.neutral08,
    borderColor: isInverse ? theme.colors.neutral08 : theme.colors.neutral01,
    height: 'auto',
    minHeight: '37px',
    outlineOffset: '-5px'
  };

  return (
    <ComboBoxContainer
      {...getComboboxProps()}
      hasError={hasError}
      isInverse={isInverse}
      theme={theme}
    >
      <InputContainer hasError={hasError} isInverse={isInverse} theme={theme}>
        {selectedItems}
        <StyledInput
          {...getInputProps({
            disabled: isDisabled,
            onBlur: onInputBlur,
            onFocus: onInputFocus,
            onKeyDown: onInputKeyDown,
            onKeyPress: onInputKeyPress,
            onKeyUp: onInputKeyUp
          })}
          theme={theme}
        />
        {children}
        {isLoading && (
          <LoadingIndicator style={{ flexShrink: 0, marginRight: '10px' }} />
        )}
      </InputContainer>
      <DropdownIndicator
        {...getToggleButtonProps({ disabled: isDisabled })}
        aria-label="toggle menu"
        icon={<CaretDownIcon size={10} />}
        shape={ButtonShape.rightCap}
        style={dropdownIndicatorStyles}
        tabIndex={0}
        theme={theme}
        variant={ButtonVariant.link}
      />
    </ComboBoxContainer>
  );
}
