import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { ThemeContext } from '../../theme/ThemeContext';
import { ButtonVariant, ButtonType, ButtonSize, ButtonShape } from '../Button';
import { IconButton } from '../IconButton';
import { IconProps } from 'react-magma-icons';
import { ThemeInterface } from '../../theme/magma';

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

const InputWrapper = styled.div`
  align-items: center;
  display: flex;
  position: relative;
`;

export const inputBaseStyles = props => css`
  background: ${props.theme.colors.neutral08};
  border: 1px solid;
  border-color: ${
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral03
  };
  border-radius: ${props.theme.borderRadius};
  color: ${props.theme.colors.neutral};
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
  
  ${props.hasError &&
    css`
      border-color: ${props.theme.colors.danger};
      box-shadow: 0 0 0 1px
        ${props.isInverse
          ? props.theme.colors.neutral08
          : props.theme.colors.danger};
    `}

  ${props.inputSize === 'large' &&
    css`
      font-size: ${props.theme.typeScale.size04.fontSize};
      line-height: ${props.theme.typeScale.size04.lineHeight};
      height: ${props.theme.spaceScale.spacing11};
      padding: 0 ${props.theme.spaceScale.spacing04};
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
    color: ${props.theme.colors.neutral03};
    opacity: 1;
  }

  &:focus {
    outline: 2px dotted
      ${
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus
      };
    outline-offset: 4px;
  }

  ${props.disabled &&
    css`
      background: ${props.theme.colors.neutral07};
      border-color: ${props.theme.colors.neutral05};
      color: ${props.theme.colors.disabledText};
      cursor: not-allowed;

      &::placeholder {
        color: ${props.theme.colors.disabledText};
      }
    `}
`;

const StyledInput = styled.input<InputBaseProps>`
  ${inputBaseStyles}
`;

const IconWrapper = styled.span<{
  iconPosition?: InputIconPosition;
  inputSize?: InputSize;
}>`
  color: ${props => props.theme.colors.neutral};
  left: ${props =>
    props.iconPosition === 'left' ? props.theme.spaceScale.spacing03 : 'auto'};
  right: ${props =>
    props.iconPosition === 'right' ? props.theme.spaceScale.spacing03 : 'auto'};
  position: absolute;
  top: ${props => props.theme.spaceScale.spacing03};

  ${props =>
    props.inputSize === 'large' &&
    css`
      left: ${props.iconPosition === 'left'
        ? props.theme.spaceScale.spacing04
        : 'auto'};
      right: ${props.iconPosition === 'right'
        ? props.theme.spaceScale.spacing04
        : 'auto'};
      top: ${props.theme.spaceScale.spacing04};
    `}
`;

const IconButtonContainer = styled.span<{
  size?: InputSize;
  theme: ThemeInterface;
}>`
  height: auto;
  margin: 0;
  position: absolute;
  top: ${props =>
    props.size === InputSize.large
      ? props.theme.spaceScale.spacing02
      : props.theme.spaceScale.spacing01};
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

function getIconSize(size, theme) {
  switch (size) {
    case 'large':
      return theme.iconSizes.large;
    default:
      return theme.iconSizes.medium;
  }
}

export const InputBase = React.forwardRef<HTMLInputElement, InputBaseProps>(
  (props, ref) => {
    const {
      children,
      containerStyle,
      defaultValue,
      hasError,
      icon,
      iconAriaLabel,
      iconRef,
      onIconClick,
      onIconKeyDown,
      inputSize,
      inputStyle,
      testId,
      type,
      ...other
    } = props;

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

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      props.onChange &&
        typeof props.onChange === 'function' &&
        props.onChange(event);

      setValue(event.target.value);
    }

    return (
      <InputWrapper style={containerStyle}>
        <StyledInput
          {...other}
          aria-invalid={hasError}
          data-testid={testId}
          hasError={hasError}
          iconPosition={iconPosition}
          inputSize={inputSize ? inputSize : InputSize.medium}
          ref={ref}
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
            theme={theme}
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
          >
            <IconButton
              aria-label={iconAriaLabel}
              icon={icon}
              onClick={onIconClick}
              onKeyDown={onIconKeyDown}
              ref={iconRef}
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
