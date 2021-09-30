import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ThemeContext } from '../../theme/ThemeContext';
import { ButtonVariant, ButtonType, ButtonSize, ButtonShape } from '../Button';
import { IconButton } from '../IconButton';
import { ClearIcon, IconProps } from 'react-magma-icons';
import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { I18nContext } from '../../i18n';
import { useForkedRef } from '../../utils';

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
  left = 'left',
  right = 'right',
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
  isInverse?: boolean;
  isClearable?: boolean;
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
  background-color: 'var(--colors-neutral08)';
  border-radius: 'var(--borderRadius)';
  border: 1px solid
    ${props.isInverse ? 'var(--colors-neutral08)' : 'var(--colors-neutral03)'};

  &:focus-within {
    outline: 2px dotted
      ${props.isInverse ? 'var(--colors-focusInverse)' : 'var(--colors-focus)'};
    outline-offset: 4px;
  }

  ${props.hasError &&
  css`
    border-color: var(--colors-danger);
    box-shadow: 0 0 0 1px
      ${props.isInverse ? 'var(--colors-neutral08)' : 'var(--colors-danger)'};
  `}

  ${props.disabled &&
  css`
    border-color: var(--colors-neutral05);
    background-color: ${props.disabled
      ? 'var(--colors-neutral07)'
      : 'var(--colors-neutral08)'};
  `}
`;

export interface InputBaseStylesProps {
  isInverse?: boolean;
  iconPosition?: InputIconPosition;
  inputSize?: InputSize;
  theme?: ThemeInterface;
  disabled?: boolean;
}

export const inputBaseStyles = (props: InputBaseStylesProps) => css`
  border: 0;
  border-radius: var(--borderRadius);
  background: var(--colors-neutral08);
  color: var(--colors-neutral);
  display: block;
  font-size: var(--typeScale-size03-fontSize);
  line-height: var(--typeScale-size03-lineHeight);
  font-family: var(--bodyFont);
  height: var(--spaceScale-spacing09);
  padding: var(--spaceScale-spacing03);
  -webkit-appearance: none;
  width: 100%;

  ${props.iconPosition === 'left' &&
  css`
    padding-left: var(--spaceScale-spacing09);
  `}

  ${props.iconPosition === 'right' &&
  css`
    padding-right: var(--spaceScale-spacing09);
  `}

  ${props.inputSize === 'large' &&
  css`
    font-size: var(--typeScale-size04-fontSize);
    line-height: var(--typeScale-size04-lineHeight);
    height: var(--spaceScale-spacing11);
    padding: 0 var(--spaceScale-spacing04);
  `}

    ${props.iconPosition === 'left' &&
  props.inputSize === 'large' &&
  css`
    padding-left: var(--spaceScale-spacing10);
  `}

      ${props.iconPosition === 'right' &&
  props.inputSize === 'large' &&
  css`
    padding-right: var(--spaceScale-spacing10);
  `}

  &::placeholder {
    color: var(--colors-neutral03);
    opacity: 1;
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
    background: var(--colors-neutral07);
    color: var(--colors-disabledText);
    cursor: not-allowed;

    &::placeholder {
      color: var(--colors-disabledText);
    }
  `}
`;

const InputWrapper = styled.div<InputWrapperStylesProps>`
  ${inputWrapperStyles}
`;

const StyledInput = styled.input<InputBaseStylesProps>`
  ${inputBaseStyles}
`;

const IconWrapper = styled.span<{
  iconPosition?: InputIconPosition;
  inputSize?: InputSize;
  isClearable?: boolean;
  disabled?: boolean;
}>`
  color: var(--colors-neutral);
  left: ${props =>
    props.iconPosition === 'left' ? 'var(--spaceScale-spacing03)' : 'auto'};
  right: ${props =>
    props.iconPosition === 'right' ? 'var(--spaceScale-spacing03)' : 'auto'};
  position: absolute;
  top: var(--spaceScale-spacing03);

  ${props =>
    props.inputSize === 'large' &&
    css`
      left: ${props.iconPosition === 'left'
        ? 'var(--spaceScale-spacing04)'
        : 'auto'};
      right: ${props.iconPosition === 'right'
        ? 'var(--spaceScale-spacing04)'
        : 'auto'};
      top: var(--spaceScale-spacing04);
    `}
`;

const IconButtonContainer = styled.span<{
  size?: InputSize;
  isClearable?: boolean;
  disabled?: boolean;
}>`
  background-color: ${({ disabled }) =>
    disabled ? 'var(--colors-neutral07)' : 'var(--colors-neutral08)'};
  height: auto;
  margin: 0;
  position: relative;
  right: ${props =>
    props.size === InputSize.large
      ? 'var(--spaceScale-spacing02)'
      : 'var(--spaceScale-spacing01)'};

  svg {
    height: ${props =>
      props.size === InputSize.large
        ? 'var(--iconSizes-large)px'
        : 'var(--iconSizes-medium)px'};
    width: ${props =>
      props.size === InputSize.large
        ? 'var(--iconSizes-large)px'
        : 'var(--iconSizes-medium)px'};
  }
`;

const IsClearableContainer = styled.span<{
  size?: InputSize;
  isClearable?: boolean;
  disabled?: boolean;
}>`
  background-color: ${({ disabled }) =>
    disabled ? 'var(--colors-neutral07)' : 'var(--colors-neutral08)'};
  position: relative;
  right: ${props =>
    props.size === InputSize.large
      ? 'var(--spaceScale-spacing02)'
      : 'var(--spaceScale-spacing01)'};
`;

function getIconSize(size: string) {
  switch (size) {
    case 'large':
      return 'var(--iconSizes-large)';
    default:
      return 'var(--iconSizes-medium)';
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
              isInverse={false}
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
            size={
              inputSize === InputSize.large ? InputSize.large : InputSize.medium
            }
            theme={theme}
            disabled={disabled}
          >
            <IconButton
              aria-label={iconAriaLabel}
              icon={icon}
              isInverse={false}
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
