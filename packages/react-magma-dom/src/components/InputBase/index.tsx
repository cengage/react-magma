import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { ThemeContext } from '../../theme/ThemeContext';
import { ButtonVariant, ButtonType, ButtonSize, ButtonShape } from '../Button';
import { IconButton } from '../IconButton';
import { ClearIcon, IconProps } from 'react-magma-icons';
import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { I18nContext } from '../../i18n';
import { useForkedRef } from '../../utils';
import { transparentize } from 'polished';

export enum InputSize {
  large = 'large',
  medium = 'medium', //default
}

export enum InputType {
  email = 'email',
  file = 'file',
  number = 'number',
  password = 'password',
  search = 'search',
  text = 'text', // default
}

export enum InputIconPosition {
  top = 'top',
  left = 'left',
  right = 'right', // default
}

export interface InputBaseProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Style properties for the component container element
   */
  containerStyle?: React.CSSProperties;
  /**
   * @internal
   */
  hasError?: boolean;
  /**
   * Icon to display within the component
   */
  icon?: React.ReactElement<IconProps>;
  /**
   * Text for the aria-label attribute for an icon, if provided
   */
  iconAriaLabel?: string;
  /**
   * Position within the component for the icon to appear
   * @default InputIconPosition.right
   */
  iconPosition?: InputIconPosition;
  /**
   * Reference to the icon element
   */
  iconRef?: React.Ref<HTMLButtonElement>;
  /**
   * Relative size of the component
   * @default InputSize.medium
   */
  inputSize?: InputSize;
  /**
   * Style properties for the input element
   */
  inputStyle?: React.CSSProperties;
  /**
   * Clear contents of input by clicking a clear button
   * @default false
   */
  isClearable?: boolean;
  /**
   * Function to be called when the contents of input are cleared by clicking a clear button
   */
  onClear?: () => void;
  isInverse?: boolean;
  /**
   * For use in predictive search which moves the icon to the left
   */
  isPredictive?: boolean;
  /**
   * Action that will fire when icon is clicked
   */
  onIconClick?: () => void;
  /**
   * Action that will fire when icon receives keypress
   */
  onIconKeyDown?: (event) => void;
  testId?: string;
  /**
   * @internal
   */
  theme?: any;
  /**
   * The type attribute of the form field
   * @default InputType.text
   */
  type?: InputType;
}

export interface InputWrapperStylesProps {
  width?: string;
  iconPosition?: InputIconPosition;
  isInverse?: boolean;
  isClearable?: boolean;
  isPredictive?: boolean;
  theme?: ThemeInterface;
  hasError?: boolean;
  disabled?: boolean;
}

export const inputWrapperStyles = (props: InputWrapperStylesProps) => css`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  position: relative;
  width: ${props.width || 'auto'};
  background-color: ${props.isInverse
    ? transparentize(0.8, props.theme.colors.neutral900)
    : props.theme.colors.neutral100};
  border-radius: ${props.theme.borderRadius};
  border: 1px solid
    ${props.isInverse
      ? transparentize(0.5, props.theme.colors.neutral100)
      : props.theme.colors.neutral500};

  &:focus-within {
    outline: 2px solid
      ${props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
    outline-offset: 2px;
  }

  ${props.hasError &&
  css`
    border-color: ${props.isInverse
      ? props.theme.colors.danger200
      : props.theme.colors.danger};
  `}

  ${props.disabled &&
  css`
    border-color: ${props.isInverse
      ? transparentize(0.85, props.theme.colors.neutral100)
      : props.theme.colors.neutral300};
    background-color: ${props.isInverse
      ? transparentize(0.9, props.theme.colors.neutral900)
      : props.theme.colors.neutral200};
  `}
  button {
    bottom: ${props.iconPosition === InputIconPosition.top
      ? '40px'
      : 'inherit'};
    right: ${props.iconPosition === InputIconPosition.top ? '-4px' : 'inherit'};
  }
`;

export interface InputBaseStylesProps {
  isInverse?: boolean;
  iconPosition?: InputIconPosition;
  inputSize?: InputSize;
  isPredictive?: boolean;
  theme?: ThemeInterface;
  disabled?: boolean;
  hasError?: boolean;
}

export const inputBaseStyles = (props: InputBaseStylesProps) => css`
  border: 0;
  border-radius: ${props.theme.borderRadius};
  background: transparent;
  color: ${props.isInverse
    ? props.theme.colors.neutral100
    : props.theme.colors.neutral700};
  display: block;
  font-size: ${props.theme.typeScale.size03.fontSize};
  line-height: ${props.theme.typeScale.size03.lineHeight};
  font-family: ${props.theme.bodyFont};
  height: ${props.theme.spaceScale.spacing09};
  padding: ${props.theme.spaceScale.spacing03};
  -webkit-appearance: none;
  width: 100%;

  ${props.iconPosition === 'left' &&
  css`
    padding-left: ${props.theme.spaceScale.spacing09};
  `}

  ${props.iconPosition === 'right' &&
  css`
    padding-right: ${props.theme.spaceScale.spacing09};
  `}

  ${props.inputSize === 'large' &&
  css`
    font-size: ${props.theme.typeScale.size04.fontSize};
    line-height: ${props.theme.typeScale.size04.lineHeight};
    height: ${props.theme.spaceScale.spacing11};
    padding: ${props.theme.spaceScale.spacing04};
  `}

    ${props.iconPosition === 'left' &&
  props.inputSize === 'large' &&
  css`
    padding-left: ${props.theme.spaceScale.spacing10};
  `}

      ${props.iconPosition === 'right' &&
  props.inputSize === 'large' &&
  css`
    padding-right: ${props.theme.spaceScale.spacing10};
  `}

  &::placeholder {
    color: ${props.isInverse
      ? transparentize(0.3, props.theme.colors.neutral100)
      : props.theme.colors.neutral500};
  }

  &:focus {
    outline: 0;
  }

  &[type='search'] {
    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      display: none;
    }
  }

  ${props.disabled &&
  css`
    color: ${props.isInverse
      ? transparentize(0.6, props.theme.colors.neutral100)
      : props.theme.colors.neutral500};
    cursor: not-allowed;

    &::placeholder {
      color: ${props.isInverse
        ? transparentize(0.8, props.theme.colors.neutral100)
        : props.theme.colors.neutral500};
      opacity: ${props.isInverse ? 0.4 : 0.6};
    }
  `}
`;

export const InputWrapper = styled.div<InputWrapperStylesProps>`
  ${inputWrapperStyles}
`;

const StyledInput = styled.input<InputBaseStylesProps>`
  ${inputBaseStyles}
`;

const IconWrapper = styled.span<{
  iconPosition?: InputIconPosition;
  inputSize?: InputSize;
  isClearable?: boolean;
  isPredictive?: boolean;
  disabled?: boolean;
  isInverse?: boolean;
}>`
  bottom: ${props => (props.iconPosition === 'top' ? '45px' : 'inherit')};
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  left: ${props =>
    props.iconPosition === 'left' ? props.theme.spaceScale.spacing03 : 'auto'};
  right: ${props =>
    props.iconPosition === 'right'
      ? props.theme.spaceScale.spacing03
      : props.iconPosition === 'top'
      ? '3px'
      : 'auto'};
  position: absolute;
  top: ${props =>
    props.iconPosition === 'top'
      ? 'inherit'
      : props => props.theme.spaceScale.spacing03};

  ${props =>
    props.inputSize === 'large' &&
    css`
      bottom: ${props.iconPosition === 'top' ? '56px' : 'inherit'};
      left: ${props.iconPosition === 'left'
        ? props.theme.spaceScale.spacing04
        : 'auto'};
      right: ${props.iconPosition === 'right'
        ? props.theme.spaceScale.spacing04
        : props.iconPosition === 'top'
        ? '3px'
        : 'auto'};
      top: ${props.iconPosition === 'top'
        ? 'inherit'
        : props.theme.spaceScale.spacing04};
    `}
`;

const IconButtonContainer = styled.span<{
  iconPosition?: InputIconPosition;
  size?: InputSize;
  theme: ThemeInterface;
  isClearable?: boolean;
  disabled?: boolean;
}>`
  background-color: transparent;
  bottom: ${props => (props.iconPosition === 'top' ? '40px' : 'inherit')};
  height: auto;
  margin: 0;
  position: relative;
  right: ${props =>
    props.size === InputSize.large
      ? props.theme.spaceScale.spacing02
      : props.theme.spaceScale.spacing01};

  svg {
    height: ${props =>
      props.size === InputSize.large
        ? `${props.theme.iconSizes.large}px`
        : `${props.theme.iconSizes.medium}px`};
    width: ${props =>
      props.size === InputSize.large
        ? `${props.theme.iconSizes.large}px`
        : `${props.theme.iconSizes.medium}px`};
  }
`;

const IsClearableContainer = styled.span<{
  size?: InputSize;
  theme: ThemeInterface;
  isClearable?: boolean;
  disabled?: boolean;
}>`
  background-color: transparent;
  position: relative;
  right: ${props =>
    props.size === InputSize.large
      ? props.theme.spaceScale.spacing02
      : props.theme.spaceScale.spacing01};
`;

function getIconSize(size: string, theme: ThemeInterface) {
  switch (size) {
    case 'large':
      return theme.iconSizes.large;
    default:
      return theme.iconSizes.medium;
  }
}

export const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
  (props, forwardedRef) => {
    const {
      children,
      containerStyle,
      defaultValue,
      disabled,
      hasError,
      icon,
      iconAriaLabel,
      iconRef,
      isClearable,
      isPredictive,
      onClear,
      onIconClick,
      onIconKeyDown,
      inputSize,
      inputStyle,
      testId,
      type,
      ...other
    } = props;

    const i18n = React.useContext(I18nContext);

    const theme = React.useContext(ThemeContext);
    const iconPosition =
      icon && onIconClick
        ? InputIconPosition.right
        : icon && !props.iconPosition
        ? InputIconPosition.left
        : props.iconPosition;

    const [value, setValue] = React.useState<
      string | ReadonlyArray<string> | number
    >(props.defaultValue || props.value || '');

    React.useEffect(() => {
      if (props.value !== undefined && props.value !== null) {
        setValue(props.value);
      }
    }, [props.value]);

    const inputRef = React.useRef<HTMLInputElement>();
    const ref = useForkedRef(forwardedRef, inputRef);

    function handleClearInput() {
      onClear && typeof onClear === 'function' && onClear();
      setValue('');
      inputRef.current.focus();
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      props.onChange &&
        typeof props.onChange === 'function' &&
        props.onChange(event);

      setValue(event.target.value);
    }

    return (
      <InputWrapper
        disabled={disabled}
        iconPosition={iconPosition}
        isInverse={props.isInverse}
        theme={theme}
        style={containerStyle}
        hasError={hasError}
        isClearable={isClearable}
      >
        <StyledInput
          {...other}
          aria-invalid={hasError}
          disabled={disabled}
          data-testid={testId}
          iconPosition={iconPosition}
          inputSize={inputSize ? inputSize : InputSize.medium}
          isInverse={useIsInverse(props.isInverse)}
          isPredictive={isPredictive}
          hasError={hasError}
          ref={ref}
          onChange={handleChange}
          style={inputStyle}
          theme={theme}
          type={type ? type : InputType.text}
          value={value}
        />
        {isClearable && value && (
          <IsClearableContainer theme={theme} disabled={disabled}>
            <IconButton
              aria-label={i18n.input.isClearableAriaLabel}
              disabled={disabled}
              icon={<ClearIcon />}
              isInverse={props.isInverse}
              onClick={handleClearInput}
              onKeyDown={onIconKeyDown}
              ref={iconRef}
              shape={ButtonShape.fill}
              size={
                inputSize === InputSize.large
                  ? ButtonSize.medium
                  : ButtonSize.small
              }
              testId="clear-button"
              type={ButtonType.button}
              variant={ButtonVariant.link}
            />
          </IsClearableContainer>
        )}

        {icon && !onIconClick && (
          <IconWrapper
            aria-label={iconAriaLabel}
            iconPosition={iconPosition}
            inputSize={inputSize ? inputSize : InputSize.medium}
            isInverse={props.isInverse}
            isPredictive={isPredictive}
            theme={theme}
            disabled={disabled}
          >
            {React.Children.only(
              React.cloneElement(icon, {
                size: getIconSize(
                  inputSize ? inputSize : InputSize.medium,
                  theme
                ),
              })
            )}
          </IconWrapper>
        )}

        {onIconClick && (
          <IconButtonContainer
            iconPosition={iconPosition}
            size={
              inputSize === InputSize.large ? InputSize.large : InputSize.medium
            }
            theme={theme}
            disabled={disabled}
          >
            <IconButton
              aria-label={iconAriaLabel}
              icon={icon}
              isInverse={props.isInverse}
              onClick={onIconClick}
              onKeyDown={onIconKeyDown}
              ref={iconRef}
              disabled={disabled}
              shape={ButtonShape.fill}
              size={
                inputSize === InputSize.large
                  ? ButtonSize.medium
                  : ButtonSize.small
              }
              type={ButtonType.button}
              variant={ButtonVariant.link}
            />
          </IconButtonContainer>
        )}

        {children}
      </InputWrapper>
    );
  }
);
