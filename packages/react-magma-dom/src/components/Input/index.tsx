import * as React from 'react';
import { InputCore } from 'react-magma-core';
import { styled } from '../../theme/styled-components';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { magma } from '../../theme/magma';

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
  autoFocus?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  handleBlur?: () => void;
  handleChange?: (value: string) => void;
  handleFocus?: () => void;
  helperMessage?: string;
  icon?: string;
  iconPosition?: IconPosition;
  id: string;
  inputSize?: InputSize;
  inputStyle?: React.CSSProperties;
  inverse?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: string;
  labelVisuallyHidden?: boolean;
  multiline?: boolean;
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

const StyledInput = styled<InputProps, 'input'>('input')`
  background: ${magma.colors.neutral08};
  border: 1px solid;
  border-color: ${props =>
    props.errorMessage ? magma.colors.danger : magma.colors.neutral05};
  border-radius: 5px;
  box-shadow: ${props => (props.errorMessage ? '0 0 0 1px #E70000' : '0 0 0')};
  color: ${magma.colors.neutral02};
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
    color: ${magma.colors.neutral04};
    opacity: 1;
  }

  &:focus {
    border-color: ${magma.colors.pop03};
    box-shadow: 0 0 0 1px ${magma.colors.pop03};
    outline: 0;
  }

  &[disabled] {
    background: ${magma.colors.neutral07};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled<TextProps, 'div'>('div')`
  background: ${props => (props.inverse ? magma.colors.danger : 'none')};
  border-radius: 5px;
  color: ${props =>
    props.inverse ? magma.colors.neutral08 : magma.colors.danger};
  font-size: 13px;
  margin-top: 5px;
  padding: ${props => (props.inverse ? '5px 10px' : '0')};
`;

const HelperMessage = styled<TextProps, 'div'>('div')`
  color: ${props =>
    props.inverse ? magma.colors.neutral08 : magma.colors.neutral04};
  font-size: 13px;
  margin-top: 5px;
`;

const IconWrapper = styled<IconWrapperProps, 'span'>('span')`
  left: ${props => (props.iconPosition === 'left' ? '10px' : 'auto')};
  right: ${props => (props.iconPosition === 'right' ? '10px' : 'auto')};
  color: ${magma.colors.neutral02};
  position: absolute;
  margin-top: -9px;
  top: 50%;
`;

const ErrorIconWrapper = styled<ErrorIconWrapperProps, 'span'>('span')`
  align-items: center;
  background: ${magma.colors.danger};
  border-radius: 100%;
  color: ${magma.colors.neutral08};
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

export const Input: React.FunctionComponent<InputProps> = (
  props: InputProps
) => (
  <InputCore
    value={props.value}
    handleBlur={props.handleBlur}
    handleChange={props.handleChange}
    handleFocus={props.handleFocus}
  >
    {({ handleBlur, handleChange, handleFocus, value }) => {
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
        required
      } = props;

      return (
        <Container style={style}>
          {!labelVisuallyHidden && (
            <Label inverse={inverse} htmlFor={id} style={labelStyle}>
              {labelText}
            </Label>
          )}
          <InputWrapper>
            <StyledInput
              aria-label={labelVisuallyHidden ? labelText : null}
              as={multiline ? 'textarea' : 'input'}
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
              type={type ? type : InputType.text}
              value={value}
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
            />
            {errorMessage && (
              <ErrorIconWrapper inputSize={inputSize}>
                <Icon size={getErrorIconSize(inputSize)} type="alert" />
              </ErrorIconWrapper>
            )}
            {icon && (
              <IconWrapper iconPosition={iconPosition}>
                <Icon size={getIconSize(inputSize)} type={icon} />
              </IconWrapper>
            )}
          </InputWrapper>
          {errorMessage && (
            <ErrorMessage inverse={inverse}>{errorMessage}</ErrorMessage>
          )}
          {helperMessage && !errorMessage && (
            <HelperMessage inverse={inverse}>{helperMessage}</HelperMessage>
          )}
        </Container>
      );
    }}
  </InputCore>
);
