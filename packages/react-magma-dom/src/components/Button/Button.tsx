import * as React from 'react';
import { ButtonCore } from 'react-magma-core';
const styled = require('styled-components').default;
import { magma } from '../../theme/magma';

enum ButtonVariant {
  solid = 'solid', //default
  outline = 'outline',
  link = 'link'
}

enum ButtonColor {
  primary = 'primary', //default
  secondary = 'secondary',
  success = 'success',
  danger = 'danger'
}

enum ButtonShape {
  fill = 'fill', //default
  leftCap = 'leftCap',
  rightCap = 'rightCap',
  round = 'round' // default for icon only buttons
}

export enum ButtonSize {
  large = 'large',
  medium = 'medium', //default
  small = 'small'
}

export enum ButtonTextTransform {
  uppercase = 'uppercase', //default
  none = 'none'
}

export interface ButtonProps {
  autoFocus?: boolean;
  block?: boolean;
  children?: React.ReactChild | React.ReactChild[];
  text?: string;
  handleClick: () => void;
  color?: ButtonColor;
  disabled?: boolean;
  inverse?: boolean;
  shape?: ButtonShape;
  size?: ButtonSize;
  textTransform?: ButtonTextTransform;
  variant?: ButtonVariant;
}

export const StyledButton = styled.button`
  align-items: center;
  border-radius: ${props => {
    switch (props.shape) {
      case 'leftCap':
        return '5px 0 0 5px';
      case 'rightCap':
        return '0 5px 5px 0';
      default:
        return '5px';
    }
  }};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: ${props => (props.block ? 'flex' : 'inline-flex')};
  font-family: ${magma.bodyFont};
  justify-content: center;
  line-height: 1;
  margin: ${props => (props.block ? '5px 0' : '5px')};
  min-width: 5.625em;
  overflow: hidden;
  position: relative;
  text-align: center;
  text-transform: ${props => props.textTransform};
  vertical-align: middle;
  touch-action: manipulation;
  width: ${props => (props.block ? '100%' : 'auto')};
  white-space: nowrap;

  &:not(:disabled) {
    &:after,
    &:before {
      background: ${props => {
        // Button color, variant, inverse
        if (
          (props.variant !== 'solid' && !props.inverse) ||
          (props.variant === 'solid' && props.inverse)
        ) {
          switch (props.color) {
            case 'secondary':
              return magma.colors.neutral02;
            case 'success':
              return magma.colors.success01;
            case 'danger':
              return magma.colors.danger;
            default:
              return magma.colors.primary;
          }
        }
        if (
          props.variant === 'solid' &&
          !props.inverse &&
          props.color === 'secondary'
        ) {
          return magma.colors.neutral02;
        }
        return magma.colors.neutral08;
      }};
      content: '';
      opacity: 0;
      position: absolute;
    }

    &:after {
      border-radius: 50%;
      height: 32px;
      left: 50%;
      padding: 50%;
      top: 18px;
      transform: translate(-50%, -50%) scale(1);
      transition: opacity 1s, transform 0.5s;
      width: 32px;
    }

    &:before {
      height: 200%;
      left: 0;
      top: -50%;
      transition: 0.2s;
      width: 200%;
    }

    &:active {
      &:after {
        opacity: 0.4;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0s;
      }
    }

    &:hover,
    &:focus {
      &:before {
        opacity: 0.1;
      }
    }
  }

  &:focus {
    outline: 2px dotted ${magma.colors.pop03};
    outline-offset: 3px;
  }

  font-size: ${props => {
    switch (props.size) {
      case 'large':
        return '1.125rem';
      case 'small':
        return '.750rem';
      default:
        return '.875rem';
    }
  }};
  font-weight: ${props => (props.size === 'large' ? 500 : 600)};
  height: ${props => {
    // Button size
    switch (props.size) {
      case 'large':
        return '45px';
      case 'small':
        return '29px';
      default:
        return '37px';
    }
  }};
  padding: ${props => {
    // Button size
    switch (props.size) {
      case 'large':
        return '0 20px';
      case 'small':
        return '0 10px';
      default:
        return '0 15px';
    }
  }};

  background: ${props => {
    // Button color, variant, inverse
    if (props.variant !== 'solid') {
      return 'none';
    }
    if (props.disabled) {
      return magma.colors.neutral06;
    }
    if (props.inverse) {
      return magma.colors.neutral08;
    }
    switch (props.color) {
      case 'secondary':
        return magma.colors.neutral08;
      case 'success':
        return magma.colors.success01;
      case 'danger':
        return magma.colors.danger;
      default:
        return magma.colors.primary;
    }
  }};
  border: ${props =>
    props.variant === 'outline' ||
    (props.variant === 'solid' && props.color === 'secondary' && !props.inverse)
      ? '2px solid'
      : '0'};
  border-color: ${props => {
    // Button color, variant, inverse
    if (props.disabled && props.inverse && props.variant === 'outline') {
      return magma.colors.disabledInverseText;
    }
    if (props.disabled) {
      return magma.colors.neutral06;
    }
    if (props.inverse) {
      return magma.colors.neutral08;
    }
    if (props.color === 'secondary') {
      return magma.colors.neutral05;
    }
    if (props.variant === 'solid') {
      switch (props.color) {
        case 'success':
          return magma.colors.success01;
        case 'danger':
          return magma.colors.danger;
        default:
          return magma.colors.primary;
      }
    }
  }};
  color: ${props => {
    // Button color, variant, inverse
    if (props.disabled && props.inverse && props.variant !== 'solid') {
      return magma.colors.disabledInverseText;
    }
    if (props.disabled) {
      return magma.colors.disabledText;
    }
    if (
      (!props.inverse && props.variant === 'solid') ||
      (props.inverse && props.variant !== 'solid')
    ) {
      if (props.color === 'secondary' && !props.inverse) {
        return magma.colors.neutral02;
      }
      return magma.colors.neutral08;
    }
    switch (props.color) {
      case 'secondary':
        return magma.colors.neutral02;
      case 'success':
        return magma.colors.success01;
      case 'danger':
        return magma.colors.danger;
      default:
        return magma.colors.primary;
    }
  }};
`;

export const Button: React.FunctionComponent<ButtonProps> = (
  props: ButtonProps
): JSX.Element => (
  <ButtonCore handleClick={props.handleClick}>
    {({ handleClick }) => {
      const {
        autoFocus,
        block,
        children,
        disabled,
        inverse,
        color,
        shape,
        size,
        textTransform,
        variant
      } = props;

      return (
        <StyledButton
          autoFocus={autoFocus}
          onClick={handleClick}
          block={block}
          color={color ? color : 'primary'}
          disabled={disabled}
          inverse={inverse}
          shape={shape ? shape : 'fill'}
          size={size ? size : 'medium'}
          textTransform={textTransform ? textTransform : 'uppercase'}
          variant={variant ? variant : 'solid'}
        >
          {children}
        </StyledButton>
      );
    }}
  </ButtonCore>
);

export default Button;
