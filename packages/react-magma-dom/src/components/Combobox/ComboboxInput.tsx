import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReferenceType } from '@floating-ui/react-dom';
import {
  UseComboboxGetComboboxPropsOptions,
  UseComboboxGetInputPropsOptions,
  UseComboboxGetToggleButtonPropsOptions,
} from 'downshift';
import { transparentize } from 'polished';

import useDeviceDetect from '../../hooks/useDeviceDetect';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { inputBaseStyles } from '../InputBase';
import { instanceOfDefaultItemObject } from '../Select';
import { defaultComponents, SelectComponents } from '../Select/components';
import { SelectedItemsWrapper } from '../Select/shared';

const ComboBoxContainer = styled.div<{
  hasError?: boolean;
  isInverse?: boolean;
  theme?: ThemeInterface;
}>`
  display: flex;
`;

const InputContainer = styled.div<{
  hasError?: boolean;
  disabled?: boolean;
  isFocused?: boolean;
  isInverse?: boolean;
  theme?: ThemeInterface;
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
      outline-offset: -1px;
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

const StyledInput = styled.input<{ hideText?: boolean }>`
  ${inputBaseStyles}
  display: flex;
  flex-grow: 1;
  min-width: ${props => props.theme.spaceScale.spacing07};
  padding-left: ${props => props.theme.spaceScale.spacing02};
  width: 0;
  height: 38px;

  &:focus {
    outline: 0;
  }

  ${props =>
    props.hideText &&
    css`
      color: transparent;
      caret-color: transparent;
    `}
`;

const SelectedItemContent = styled.div<{
  theme?: ThemeInterface;
}>`
  align-items: center;
  bottom: 0;
  display: flex;
  gap: ${props => props.theme.spaceScale.spacing03};
  left: 0;
  overflow: hidden;
  padding-left: ${props => props.theme.spaceScale.spacing03};
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
`;

const SelectedItemIcon = styled.span<{
  disabled?: boolean;
  isInverse?: boolean;
  theme?: ThemeInterface;
}>`
  align-items: center;
  color: ${props => {
    if (props.disabled) {
      return props.isInverse
        ? transparentize(0.6, props.theme.colors.neutral100)
        : transparentize(0.4, props.theme.colors.neutral500);
    }

    return props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral500;
  }};
  display: flex;
  flex-shrink: 0;
`;

const SelectedItemText = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
`;

const SelectedItemPrimaryText = styled.span<{
  disabled?: boolean;
  isInverse?: boolean;
  theme?: ThemeInterface;
}>`
  color: ${props => {
    if (props.disabled) {
      return props.isInverse
        ? transparentize(0.6, props.theme.colors.neutral100)
        : transparentize(0.4, props.theme.colors.neutral500);
    }

    return props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700;
  }};
  font-family: ${props => props.theme.bodyFont};
  font-size: ${props => props.theme.typeScale.size03.fontSize};
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SelectedItemSecondaryText = styled.span<{
  disabled?: boolean;
  isInverse?: boolean;
  theme?: ThemeInterface;
}>`
  color: ${props => {
    if (props.disabled) {
      return props.isInverse
        ? transparentize(0.7, props.theme.colors.neutral100)
        : transparentize(0.4, props.theme.colors.neutral500);
    }

    return props.isInverse
      ? transparentize(0.3, props.theme.colors.neutral100)
      : props.theme.colors.neutral500;
  }};
  font-family: ${props => props.theme.bodyFont};
  font-size: ${props => props.theme.typeScale.size01.fontSize};
  line-height: ${props => props.theme.typeScale.size01.lineHeight};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  hasSelectedItemContent?: boolean;
  innerRef?: React.Ref<HTMLInputElement>;
  inputStyle?: React.CSSProperties;
  disabled?: boolean;
  isInverse?: boolean;
  isLoading?: boolean;
  isOpen?: boolean;
  isTypeahead?: boolean;
  itemToString?: (item: T) => string;
  onInputBlur?: (event: React.FocusEvent) => void;
  onInputFocus?: (event: React.FocusEvent) => void;
  onInputKeyDown?: (event: any) => void;
  onInputKeyPress?: (event: any) => void;
  onInputKeyUp?: (event: any) => void;
  placeholder?: string;
  selectedItems?: React.ReactNode;
  selectedItem?: T;
  setReference?: (node: ReferenceType) => void;
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
    hasSelectedItemContent,
    innerRef,
    inputStyle,
    disabled,
    isInverse,
    isLoading,
    isOpen,
    isTypeahead,
    itemToString,
    onInputBlur,
    onInputFocus,
    onInputKeyDown,
    onInputKeyPress,
    onInputKeyUp,
    placeholder,
    selectedItems,
    selectedItem,
    setReference,
    toggleButtonRef,
  } = props;
  const theme = React.useContext(ThemeContext);

  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const { isWindows } = useDeviceDetect();

  const { DropdownIndicator, LoadingIndicator } = defaultComponents<T>({
    ...customComponents,
  });

  function handleBlur(e: React.FocusEvent) {
    setIsFocused(false);
    onInputBlur?.(e);
  }

  function handleFocus(e: React.FocusEvent) {
    setIsFocused(true);
    onInputFocus?.(e);
  }

  const inputProps = getInputProps({
    ...getComboboxProps(),
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

  const selectedItemAriaLabel =
    isWindows && !selectedItem ? placeholder : undefined;

  const selectedItemObject =
    selectedItem &&
    typeof selectedItem !== 'string' &&
    instanceOfDefaultItemObject(selectedItem)
      ? selectedItem
      : undefined;
  const selectedItemLeadingIcon = selectedItemObject?.leadingIcon;
  const selectedItemSecondaryText = selectedItemObject?.secondaryText;

  const showSelectedItemContent = Boolean(
    hasSelectedItemContent &&
      !isOpen &&
      !isFocused &&
      selectedItemObject &&
      (selectedItemLeadingIcon || selectedItemSecondaryText)
  );

  const selectedItemPrimaryText =
    selectedItemObject && itemToString ? itemToString(selectedItem) : '';

  return (
    <div ref={setReference}>
      <ComboBoxContainer
        {...(getComboboxProps && getComboboxProps().ref
          ? { ref: getComboboxProps().ref }
          : {})}
        hasError={hasError}
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
          <SelectedItemsWrapper
            aria-label={selectedItemAriaLabel}
            isRelative={showSelectedItemContent}
          >
            {selectedItems}
            <StyledInput
              {...inputProps}
              aria-describedby={ariaDescribedBy}
              aria-invalid={hasError}
              disabled={disabled}
              hideText={showSelectedItemContent}
              isInverse={isInverse}
              placeholder={placeholder}
              theme={theme}
            />
            {showSelectedItemContent && (
              <SelectedItemContent aria-hidden="true" theme={theme}>
                {selectedItemLeadingIcon && (
                  <SelectedItemIcon
                    disabled={disabled}
                    isInverse={isInverse}
                    theme={theme}
                  >
                    {selectedItemLeadingIcon}
                  </SelectedItemIcon>
                )}
                <SelectedItemText>
                  <SelectedItemPrimaryText
                    disabled={disabled}
                    isInverse={isInverse}
                    theme={theme}
                  >
                    {selectedItemPrimaryText}
                  </SelectedItemPrimaryText>
                  {selectedItemSecondaryText && (
                    <SelectedItemSecondaryText
                      disabled={disabled}
                      isInverse={isInverse}
                      theme={theme}
                    >
                      {selectedItemSecondaryText}
                    </SelectedItemSecondaryText>
                  )}
                </SelectedItemText>
              </SelectedItemContent>
            )}
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
    </div>
  );
}
