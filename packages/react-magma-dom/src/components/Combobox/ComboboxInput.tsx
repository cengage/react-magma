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

import { SelectedItemsWrapper } from '../DownshiftSelect/shared';

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
  background: ${props => props.theme.colors.neutral08};
  border: 1px solid;
  border-color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral03};
  border-radius: 4px;
  display: flex;
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
      props.isDisabled &&
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
  ${baseInputStyles}
  border: 0;
  display: flex;
  flex-grow: 1;
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

    const inputProps = getInputProps({
      disabled: isDisabled,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onKeyDown: onInputKeyDown,
      onKeyPress: onInputKeyPress,
      onKeyUp: onInputKeyUp,
      ref
    });

    return (
      <ComboBoxContainer
        {...getComboboxProps()}
        hasError={hasError}
        isDisabled={isDisabled}
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
          <SelectedItemsWrapper>
            {selectedItems}
            <StyledInput
              {...inputProps}
              aria-describedby={ariaDescribedBy}
              aria-invalid={hasError}
              disabled={isDisabled}
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
// export function ComboboxInput<T>(props: ComboboxInputProps<T>) {
// }
