import React from 'react';
import { baseInputStyles } from '../BaseInput';
import { defaultComponents, DownshiftComponents } from './components';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '@emotion/styled';
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

const InputContainer = styled.div<{ hasError?: boolean; theme?: any }>`
  align-items: center;
  border-radius: 5px 0 0 5px;
  border: 1px solid
    ${props =>
      props.hasError
        ? props.theme.colors.danger
        : props.theme.colors.neutral03};
  display: flex;
  width: 100%;
`;

const StyledInput = styled.input`
  ${baseInputStyles}

  border: 0;
  height: 35px;
  margin-right: 8px;
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
  isLoading?: boolean;
  onInputBlur?: (event: React.SyntheticEvent) => void;
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
    isLoading,
    onInputBlur,
    selectedItems
  } = props;
  const theme = React.useContext(ThemeContext);

  const { DropdownIndicator, LoadingIndicator } = defaultComponents({
    ...customComponents
  });

  return (
    <ComboBoxContainer
      {...getComboboxProps()}
      hasError={hasError}
      theme={theme}
    >
      <InputContainer hasError={hasError} theme={theme}>
        {selectedItems}
        <StyledInput
          {...getInputProps({ disabled: isDisabled, onBlur: onInputBlur })}
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
        style={{ minHeight: '37px', height: 'auto' }}
        tabIndex={0}
        theme={theme}
        variant={ButtonVariant.link}
      />
    </ComboBoxContainer>
  );
}
