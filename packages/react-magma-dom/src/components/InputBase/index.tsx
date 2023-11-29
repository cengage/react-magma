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
   * @internal
   */
  children?: any;
  /**
   * Style properties for the component container element
   */
  containerStyle?: React.CSSProperties;
  /** 
   * Enables Character Counter by default. 
   * When set to false, the default HTML attribute of 'maxlength' will work. 
   * Note: This is a temporary prop and will be removed in future releases.
    @default true 
  */
  hasCharacterCounter?: boolean;
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
   * Total number of characters in an input.
   */
  inputLength?: number;
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
   * A number value which gives Character Counter the maximum length of allowable characters in an Input.
   */
  maxCount?: number;
  /**
   * A number value which gives Character Counter the maximum length of allowable characters in an Input.
   * @deprecated = true
   */

  maxLength?: number;
  /**
   * Action that will fire when icon is clicked
   */
  onIconClick?: () => void;
  /**
   * Action that will fire when icon receives keypress
   */
  onIconKeyDown?: (event) => void;
  /**
   * @internal
   */
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
  /**
   * Boolean for whether this is a Password Input or not
   */
  isPasswordInput?: boolean;
  /**
   * String to determine width of input, must be suffixed with "px", "rem", or "%""
   * @default "auto"
   */
  width?: string;
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
  inputSize?: InputSize;
}

export const inputWrapperStyles = (props: InputWrapperStylesProps) => css`
  flex: 1 1 auto;
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
  height: ${props.theme.spaceScale.spacing09};

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

  ${props.inputSize === 'large' &&
  css`
    height: ${props.theme.spaceScale.spacing11};
  `}
`;

function getInputPadding(props: InputBaseStylesProps) {
  const { inputSize, isClearable, iconPosition } = props;
  let padding = {
    left: props.theme.spaceScale.spacing03,
    right: props.theme.spaceScale.spacing03,
  };
  if (inputSize === 'large') {
    if (isClearable) {
      if (iconPosition === 'right') {
        padding.right = '92px';
      } else if (iconPosition === 'left') {
        padding.left = props.theme.spaceScale.spacing11;
        padding.right = props.theme.spaceScale.spacing11;
      } else {
        // icon top, no icon
        padding.right = props.theme.spaceScale.spacing11;
      }
    } else {
      if (iconPosition === 'right') {
        padding.right = props.theme.spaceScale.spacing10;
      }
      if (iconPosition === 'left') {
        padding.left = props.theme.spaceScale.spacing10;
      }
    }
  } else if (inputSize === 'medium') {
    if (isClearable) {
      if (iconPosition === 'right') {
        padding.right = '68px';
      } else if (iconPosition === 'left') {
        padding.left = props.theme.spaceScale.spacing09;
        padding.right = props.theme.spaceScale.spacing09;
      } else {
        // icon top, no icon
        padding.right = props.theme.spaceScale.spacing09;
      }
    } else {
      if (iconPosition === 'right') {
        padding.right = props.theme.spaceScale.spacing09;
      }
      if (iconPosition === 'left') {
        padding.left = props.theme.spaceScale.spacing09;
      }
    }
  }
  return padding;
}

export interface InputBaseStylesProps {
  hasCharacterCounter?: boolean;
  isInverse?: boolean;
  iconPosition?: InputIconPosition;
  inputSize?: InputSize;
  isPredictive?: boolean;
  theme?: ThemeInterface;
  disabled?: boolean;
  hasError?: boolean;
  isClearable?: boolean;
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

  ${props.inputSize === 'large' &&
  css`
    font-size: ${props.theme.typeScale.size04.fontSize};
    line-height: ${props.theme.typeScale.size04.lineHeight};
    height: ${props.theme.spaceScale.spacing11};
    padding: ${props.theme.spaceScale.spacing04};
  `}

  padding-left: ${getInputPadding(props).left};
  padding-right: ${getInputPadding(props).right};

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
      : transparentize(0.4, props.theme.colors.neutral500)};
    cursor: not-allowed;

    &::placeholder {
      color: ${props.isInverse
        ? transparentize(0.8, props.theme.colors.neutral100)
        : props.theme.colors.neutral500};
      opacity: ${props.isInverse ? 0.4 : 0.6};
    }
  `}
`;

const InputContainer = styled.div<InputWrapperStylesProps>`
  display: flex;
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
      bottom: ${props.iconPosition === 'top' ? '62px' : 'inherit'};
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

function getIconButtonSVGSize(props) {
  const { isClickable, iconPosition, inputSize, theme } = props;

  if (isClickable && iconPosition === InputIconPosition.top) {
    if (inputSize === InputSize.large) {
      return `${theme.iconSizes.medium}px`;
    }
    return `${theme.iconSizes.small}px`;
  }
  if (inputSize === InputSize.large) {
    return `${theme.iconSizes.large}px`;
  }
  return `${theme.iconSizes.medium}px`;
}

function getIconButtonTransform(props) {
  const { isClickable, iconPosition, inputSize, hasChildren, theme } = props;
  let position = { x: '', y: '' };

  if (iconPosition === InputIconPosition.top) {
    if (inputSize === InputSize.large) {
      position.x = '-30px';
      position.y = '2px';
    } else if (inputSize === InputSize.medium) {
      position.x = '-28px';
      position.y = '5px';
    }
    return position;
  }

  if (isClickable) {
    if (inputSize === InputSize.large) {
      if (hasChildren) {
        position.x = '-43px';
        position.y = '14px';
      } else {
        position.x = '-49px';
        position.y = '8px';
      }
    } else if (inputSize === InputSize.medium) {
      position.x = '-35px';
      position.y = '6px';
    }
    return position;
  }

  if (inputSize === InputSize.large) {
    position.x = `-${theme.spaceScale.spacing10}`;
    position.y = theme.spaceScale.spacing03;
  } else if (inputSize === InputSize.medium) {
    position.x = '-24px';
    position.y = '7px';
  }
  return position;
}

export const IconButtonContainer = styled.span<{
  iconPosition?: InputIconPosition;
  inputSize?: InputSize;
  theme: ThemeInterface;
  isClickable?: boolean;
  hasChildren?: boolean;
}>`
  background-color: transparent;
  bottom: ${props => (props.iconPosition === 'top' ? '40px' : 'inherit')};
  height: auto;
  margin: 0;
  position: relative;
  width: 0;
  transform: translate(
    ${props => getIconButtonTransform(props).x},
    ${props => getIconButtonTransform(props).y}
  );
  svg {
    height: ${props => getIconButtonSVGSize(props)};
    width: ${props => getIconButtonSVGSize(props)};
  }
`;

const PasswordButtonContainer = styled.span<{
  size?: InputSize;
  theme: ThemeInterface;
  buttonWidth: number;
}>`
  background-color: transparent;
  width: 0;
  transform: translate(
    ${props =>
      props.size === InputSize.large
        ? `${-props.buttonWidth - 8}px`
        : `${-props.buttonWidth - 6}px`},
    ${props =>
      props.size === InputSize.large ? props.theme.spaceScale.spacing03 : '6px'}
  );
`;

function getClearablePosition(props) {
  if (props.hasChildren) {
    if (props.iconPosition === 'right') {
      if (props.inputSize === 'large') {
        return '92px';
      }
      return props.theme.spaceScale.spacing12;
    }
    if (props.iconPosition === 'left') {
      if (props.inputSize === 'large') {
        return '88px';
      }
      return props.theme.spaceScale.spacing12;
    }
    if (props.iconPosition === 'top') {
      if (props.inputSize === 'large') {
        return props.theme.spaceScale.spacing10;
      }
      return '34px';
    }
    return props.theme.spaceScale.spacing12;
  }
  if (props.iconPosition === 'right' && props.icon) {
    if (props.inputSize === 'large') {
      return '88px';
    }
    return props.theme.spaceScale.spacing12;
  }
  if (props.inputSize === 'large') {
    return props.theme.spaceScale.spacing10;
  }
  return '34px';
}

const IsClearableContainer = styled.span<{
  theme: ThemeInterface;
  icon?: React.ReactElement<IconProps>;
  iconPosition?: InputIconPosition;
  inputSize?: InputSize;
  onIconClick?: () => void;
  hasChildren?: boolean;
}>`
  background-color: transparent;
  margin: 0;
  position: relative;
  height: auto;
  width: 0;
  transform: translate(
    -${props => getClearablePosition(props)},
    ${props =>
      props.inputSize === InputSize.large
        ? props.theme.spaceScale.spacing03
        : '7px'}
  );
`;

function getIconSize(
  size: string,
  theme: ThemeInterface,
  iconPosition: InputIconPosition
) {
  switch (size) {
    case 'large':
      if (iconPosition === InputIconPosition.top) {
        return theme.iconSizes.medium;
      }
      return theme.iconSizes.large;
    default:
      if (iconPosition === InputIconPosition.top) {
        return theme.iconSizes.small;
      }
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
      hasCharacterCounter,
      hasError,
      icon,
      iconAriaLabel,
      iconRef,
      isClearable,
      isPasswordInput,
      isPredictive,
      maxCount,
      maxLength,
      onClear,
      onIconClick,
      onIconKeyDown,
      inputLength,
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
    >(
      props.defaultValue !== undefined && props.defaultValue !== null
        ? props.defaultValue
        : props.value || ''
    );

    const maxLengthNum =
      !hasCharacterCounter && maxLength ? maxLength : undefined;

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

    const passwordBtnWidth = () => {
      const btnWidth = children?.props?.children?.[0]?.ref?.current?.offsetWidth;
      if (typeof btnWidth === 'number') {
        return btnWidth;
      } else {
        // When PasswordButton is used inside SchemaRenderer, it doesn't have children.
        // We'll use the default button sizes.
        if (props.inputSize === InputSize.large) {
          return 64;
        }
        return 54;
      }
    };

    return (
      <InputContainer>
        <InputWrapper
          disabled={disabled}
          iconPosition={iconPosition}
          isInverse={props.isInverse}
          inputSize={inputSize ? inputSize : InputSize.medium}
          theme={theme}
          style={containerStyle}
          hasError={hasError}
          isClearable={isClearable}
          width={props.width}
        >
          <StyledInput
            {...other}
            aria-invalid={hasError}
            disabled={disabled}
            data-testid={testId}
            hasCharacterCounter={hasCharacterCounter}
            iconPosition={iconPosition}
            inputSize={inputSize ? inputSize : InputSize.medium}
            isClearable={isClearable && inputLength > 0}
            isInverse={useIsInverse(props.isInverse)}
            isPredictive={isPredictive}
            hasError={hasError}
            ref={ref}
            maxLength={maxLengthNum}
            onChange={handleChange}
            style={inputStyle}
            theme={theme}
            type={type ? type : InputType.text}
            value={value}
          />
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
                    theme,
                    iconPosition
                  ),
                })
              )}
            </IconWrapper>
          )}
        </InputWrapper>
        {isClearable && value !== '' && (
          <IsClearableContainer
            theme={theme}
            iconPosition={iconPosition}
            inputSize={inputSize}
            onIconClick={onIconClick}
            icon={icon}
            hasChildren={!!children && !isPasswordInput}
          >
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
        {onIconClick && (
          <IconButtonContainer
            iconPosition={iconPosition}
            inputSize={
              inputSize === InputSize.large ? InputSize.large : InputSize.medium
            }
            theme={theme}
            isClickable={true}
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
        {isPasswordInput ? (
          <PasswordButtonContainer
            size={
              inputSize === InputSize.large ? InputSize.large : InputSize.medium
            }
            theme={theme}
            buttonWidth={passwordBtnWidth()}
          >
            {children}
          </PasswordButtonContainer>
        ) : (
          <IconButtonContainer
            iconPosition={iconPosition}
            inputSize={inputSize ? inputSize : InputSize.medium}
            theme={theme}
            isClickable={true}
            hasChildren={true}
          >
            {children}
          </IconButtonContainer>
        )}
      </InputContainer>
    );
  }
);
