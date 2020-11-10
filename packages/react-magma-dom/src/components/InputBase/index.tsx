import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { ThemeContext } from '../../theme/ThemeContext';
import { ButtonVariant, ButtonType, ButtonSize, ButtonShape } from '../Button';
import { IconButton } from '../IconButton';
import { IconProps } from 'react-magma-icons';

export enum InputSize {
  large = 'large',
  medium = 'medium', //default
}

export enum InputType {
  email = 'email',
  number = 'number',
  password = 'password',
  search = 'search',
  text = 'text', // default
}

export interface InputBaseProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: React.CSSProperties;
  hasError?: boolean;
  icon?: React.ReactElement<IconProps>;
  iconAriaLabel?: string;
  iconPosition?: InputIconPosition;
  iconRef?: React.Ref<HTMLButtonElement>;
  inputSize?: InputSize;
  inputStyle?: React.CSSProperties;
  isInverse?: boolean;
  onIconClick?: () => void;
  onIconKeyDown?: (event) => void;
  testId?: string;
  theme?: any;
  type?: InputType;
}

export enum InputIconPosition {
  left = 'left',
  right = 'right',
}

const InputWrapper = styled.div`
  align-items: center;
  display: flex;
  position: relative;
`;

export const inputBaseStyles = props => css`
  background: ${props.theme.colors.neutral08};
  border: 1px solid;
  border-color: ${props.isInverse
    ? props.theme.colors.neutral08
    : props.theme.colors.neutral03};
  border-radius: ${props.theme.borderRadius};
  color: ${props.theme.colors.neutral};
  display: block;
  font-size: ${props.theme.typeScale.size03.fontSize};
  line-height: ${props.theme.typeScale.size03.lineHeight};
  font-family: ${props.theme.bodyFont};
  height: ${props.theme.spaceScale.spacing08};
  padding: ${props.theme.spaceScale.spacing03};
  -webkit-appearance: none;
  width: 100%;

  ${props.iconPosition === 'left' &&
  css`
    padding-left: ${props.theme.spaceScale.spacing08};
  `}

  ${props.iconPosition === 'right' &&
  css`
    padding-right: ${props.theme.spaceScale.spacing08};
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
    height: ${props.theme.spaceScale.spacing10};
    padding: 0 ${props.theme.spaceScale.spacing04};
  `}

    ${props.iconPosition === 'left' &&
  props.inputSize === 'large' &&
  css`
    padding-left: ${props.theme.spaceScale.spacing09};
  `}
  
      ${props.iconPosition === 'right' &&
  props.inputSize === 'large' &&
  css`
    padding-right: ${props.theme.spaceScale.spacing09};
  `}

  &::placeholder {
    color: ${props.theme.colors.neutral03};
    opacity: 1;
  }

  &:focus {
    outline: 2px dotted
      ${props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
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
    props.iconPosition === 'left' ? props.theme.spaceScale.spacing04 : 'auto'};
  margin-top: ${props => props.theme.spaceScale.spacing01};
  right: ${props =>
    props.iconPosition === 'right' ? props.theme.spaceScale.spacing04 : 'auto'};
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

const StyledIconButton = styled(IconButton)`
  bottom: 1px;
  height: auto;
  margin: 0;
  position: absolute;
  top: 1px;
  right: 1px;
`;

function getIconSize(size) {
  switch (size) {
    case 'large':
      return 30;
    default:
      return 20;
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
                size: getIconSize(inputSize ? inputSize : InputSize.medium),
              })
            )}
          </IconWrapper>
        )}

        {onIconClick && (
          <StyledIconButton
            aria-label={iconAriaLabel}
            icon={icon}
            onClick={onIconClick}
            onKeyDown={onIconKeyDown}
            ref={iconRef}
            shape={ButtonShape.fill}
            size={
              inputSize === InputSize.large
                ? ButtonSize.large
                : ButtonSize.medium
            }
            type={ButtonType.button}
            variant={ButtonVariant.link}
          />
        )}
        {children}
      </InputWrapper>
    );
  }
);
