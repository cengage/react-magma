import * as React from 'react';
import { InputCore } from 'react-magma-core';
import styled from '@emotion/styled';
import { IconProps } from '../Icon/utils';
import { AlertIcon } from '../Icon/types/AlertIcon';
import { Label } from '../Label';
import { ThemeContext } from '../../theme/themeContext';
import { Button } from '../Button';
import { ButtonVariant } from '../StyledButton';

export enum IconPosition {
  left = 'left',
  right = 'right'
}

export enum InputSize {
  large = 'large',
  medium = 'medium', //default
  small = 'small'
}

export enum InputType {
  text = 'text',
  password = 'password',
  number = 'number'
}

export interface InputProps {
  as?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  helperMessage?: string;
  hidePasswordMaskButton?: boolean;
  icon?: React.ReactElement<IconProps>;
  iconPosition?: IconPosition;
  id: string;
  inputSize?: InputSize;
  inputStyle?: React.CSSProperties;
  inverse?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: string;
  labelVisuallyHidden?: boolean;
  multiline?: boolean;
  onBlur?: () => void;
  onChange?: (event: React.SyntheticEvent) => void;
  onFocus?: () => void;
  placeholder?: string;
  required?: boolean;
  style?: React.CSSProperties;
  type?: InputType;
  value?: string | number;
}

interface IconWrapperProps {
  iconPosition?: IconPosition;
}

interface ErrorIconWrapperProps {
  inputSize?: InputSize;
}

interface TextProps {
  inverse?: boolean;
}

const Container = styled.div`
  margin-bottom: 10px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input<InputProps>`
  background: ${props => props.theme.colors.neutral08};
  border: 1px solid;
  border-color: ${props =>
    props.errorMessage
      ? props.theme.colors.danger
      : props.theme.colors.neutral05};
  border-radius: 5px;
  box-shadow: ${props =>
    props.errorMessage ? `0 0 0 1px ${props.theme.colors.danger}` : '0 0 0'};
  color: ${props => props.theme.colors.neutral02};
  display: block;
  font-size: ${props => {
    switch (props.inputSize) {
      case 'large':
        return '1.125rem';
      case 'small':
        return '.875rem';
      default:
        return '1rem';
    }
  }};
  height: ${props => {
    if (props.multiline) {
      return '4.5em';
    }
    switch (props.inputSize) {
      case 'large':
        return '45px';
      case 'small':
        return '29px';
      default:
        return '37px';
    }
  }};
  line-height: 1.25rem;
  padding: 0;
  padding-left: ${props => (props.iconPosition === 'left' ? '35px' : '8px')};
  padding-right: ${props =>
    props.iconPosition === 'right' || props.errorMessage ? '35px' : '8px'};
  padding-top: ${props => (props.multiline ? '5px' : '0')};
  width: 100%;

  &::placeholder {
    color: ${props => props.theme.colors.neutral04};
    opacity: 1;
  }

  &:focus {
    border-color: ${props => props.theme.colors.pop03};
    box-shadow: 0 0 0 1px ${props => props.theme.colors.pop03};
    outline: 0;
  }

  &[disabled] {
    background: ${props => props.theme.colors.neutral07};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div<TextProps>`
  background: ${props => (props.inverse ? props.theme.colors.danger : 'none')};
  border-radius: 5px;
  color: ${props =>
    props.inverse ? props.theme.colors.neutral08 : props.theme.colors.danger};
  font-size: 13px;
  margin-top: 5px;
  padding: ${props => (props.inverse ? '5px 10px' : '0')};
`;

const HelperMessage = styled.div<TextProps>`
  color: ${props =>
    props.inverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral04};
  font-size: 13px;
  margin-top: 5px;
`;

const IconWrapper = styled.span<IconWrapperProps>`
  left: ${props => (props.iconPosition === 'left' ? '10px' : 'auto')};
  right: ${props => (props.iconPosition === 'right' ? '10px' : 'auto')};
  color: ${props => props.theme.colors.neutral02};
  position: absolute;
  margin-top: -9px;
  top: 50%;
`;

const PasswordMaskWrapper = styled.span`
  left: auto;
  right: 10px;
  position: absolute;
  margin-top: -23px;
  top: 50%;
`;

const ErrorIconWrapper = styled.span<ErrorIconWrapperProps>`
  align-items: center;
  background: ${props => props.theme.colors.danger};
  border-radius: 100%;
  color: ${props => props.theme.colors.neutral08};
  display: flex;
  height: ${props => {
    switch (props.inputSize) {
      case 'large':
        return '20px';
      case 'small':
        return '16px';
      default:
        return '18px';
    }
  }};
  justify-content: center;
  padding: 3px;
  right: 10px;
  position: absolute;
  top: ${props => {
    switch (props.inputSize) {
      case 'large':
        return '13px';
      case 'small':
        return '7px';
      default:
        return '10px';
    }
  }};
  width: ${props => {
    switch (props.inputSize) {
      case 'large':
        return '20px';
      case 'small':
        return '16px';
      default:
        return '18px';
    }
  }};
`;

function getIconSize(size) {
  switch (size) {
    case 'large':
      return 19;
    case 'small':
      return 15;
    default:
      return 17;
  }
}

function getErrorIconSize(size) {
  switch (size) {
    case 'large':
      return 12;
    case 'small':
      return 8;
    default:
      return 10;
  }
}

export const Input: React.FunctionComponent<InputProps> = React.forwardRef(
  (props: InputProps, ref: any) => (
    <InputCore
      value={props.value}
      onBlur={props.onBlur}
      onChange={props.onChange}
      onFocus={props.onFocus}
    >
      {({
        onBlur,
        onChange,
        onFocus,
        value,
        togglePasswordShown,
        passwordShown
      }) => {
        const {
          autoFocus,
          disabled,
          errorMessage,
          helperMessage,
          icon,
          iconPosition,
          id,
          inputSize,
          inputStyle,
          inverse,
          labelStyle,
          labelText,
          labelVisuallyHidden,
          multiline,
          placeholder,
          style,
          type,
          required,
          hidePasswordMaskButton
        } = props;

        return (
          <ThemeContext.Consumer>
            {theme =>
              theme && (
                <Container style={style}>
                  {!labelVisuallyHidden && (
                    <Label inverse={inverse} htmlFor={id} style={labelStyle}>
                      {labelText}
                    </Label>
                  )}
                  <InputWrapper>
                    <StyledInput
                      ref={ref}
                      aria-label={labelVisuallyHidden ? labelText : null}
                      as={multiline ? 'textarea' : null}
                      autoFocus={autoFocus}
                      id={id}
                      disabled={disabled}
                      errorMessage={errorMessage}
                      iconPosition={iconPosition}
                      inputSize={inputSize ? inputSize : InputSize.medium}
                      labelText={labelText}
                      multiline={multiline}
                      placeholder={placeholder}
                      required={required}
                      style={inputStyle}
                      theme={theme}
                      type={
                        type
                          ? type === InputType.password && passwordShown
                            ? InputType.text
                            : type
                          : InputType.text
                      }
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      onFocus={onFocus}
                    />
                    {errorMessage && (
                      <ErrorIconWrapper inputSize={inputSize} theme={theme}>
                        <AlertIcon size={getErrorIconSize(inputSize)} />
                      </ErrorIconWrapper>
                    )}
                    {icon && (
                      <IconWrapper iconPosition={iconPosition} theme={theme}>
                        {React.Children.only(
                          React.cloneElement(icon, {
                            size: getIconSize(inputSize)
                          })
                        )}
                      </IconWrapper>
                    )}
                    {type === InputType.password && !hidePasswordMaskButton && (
                      <PasswordMaskWrapper>
                        <Button
                          variant={ButtonVariant.link}
                          onClick={togglePasswordShown}
                          style={{
                            height: '30px',
                            marginTop: '8px',
                            marginRight: '0',
                            left: '7px',
                            borderRadius: '3px'
                          }}
                        >
                          {passwordShown ? 'Hide' : 'Show'}
                        </Button>
                      </PasswordMaskWrapper>
                    )}
                  </InputWrapper>
                  {errorMessage && (
                    <ErrorMessage inverse={inverse} theme={theme}>
                      {errorMessage}
                    </ErrorMessage>
                  )}
                  {helperMessage && !errorMessage && (
                    <HelperMessage inverse={inverse} theme={theme}>
                      {helperMessage}
                    </HelperMessage>
                  )}
                </Container>
              )
            }
          </ThemeContext.Consumer>
        );
      }}
    </InputCore>
  )
);
