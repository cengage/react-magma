import * as React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { FocusStyles } from '../UtilityStyles';
import { magma } from '../../theme/magma';

export enum ButtonVariant {
  solid = 'solid', //default
  outline = 'outline',
  link = 'link'
}

export enum ButtonColor {
  primary = 'primary', //default
  secondary = 'secondary',
  success = 'success',
  danger = 'danger'
}

export enum ButtonShape {
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

export enum ButtonIconPostition {
  left = 'left',
  right = 'right'
}

export interface ButtonProps {
  as?: any;
  autoFocus?: boolean;
  block?: boolean;
  className?: string;
  children: React.ReactChild | React.ReactChild[];
  onClick?: (event: React.SyntheticEvent) => void;
  color?: ButtonColor;
  disabled?: boolean;
  inverse?: boolean;
  shape?: ButtonShape;
  size?: ButtonSize;
  style?: React.CSSProperties;
  textTransform?: ButtonTextTransform;
  to?: string;
  variant?: ButtonVariant;
}

interface StyledButtonProps extends ButtonProps {
  iconOnly?: boolean;
  ariaLabel?: string;
}

const StyledButtonComponent = styled.button<StyledButtonProps>`
  align-items: center;
  border-radius: ${props => {
    switch (props.shape) {
      case 'round':
        return '100%';
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
  text-decoration: none;
  text-transform: ${props => props.textTransform};
  vertical-align: middle;
  touch-action: manipulation;
  white-space: nowrap;

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
    if (props.iconOnly) {
      switch (props.size) {
        case 'large':
          return '44px';
        case 'small':
          return '28px';
        default:
          return '37px';
      }
    }
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
  width: ${props => {
    if (props.iconOnly) {
      switch (props.size) {
        case 'large':
          return '44px';
        case 'small':
          return '28px';
        default:
          return '37px';
      }
    }
    if (props.block) {
      return '100%';
    }
    return 'auto';
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
    ${FocusStyles};
    outline-offset: 3px;
  }

  &,
  &:hover,
  &:focus {
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
  }

  ${props =>
    props.iconOnly &&
    css`
      display: inline-flex;
      justify-content: center;
      line-height: 1;
      min-width: 0;
      padding: 0;
    `}
`;

export const StyledButton: React.FunctionComponent<StyledButtonProps> = ({
  ariaLabel,
  as,
  autoFocus,
  block,
  className,
  children,
  disabled,
  onClick,
  iconOnly,
  inverse,
  color,
  shape,
  size,
  style,
  textTransform,
  to,
  variant
}: StyledButtonProps) => (
  <StyledButtonComponent
    as={as}
    aria-label={ariaLabel}
    className={className}
    autoFocus={autoFocus}
    onClick={onClick}
    block={block}
    color={color}
    disabled={disabled}
    iconOnly={iconOnly}
    inverse={inverse}
    shape={shape}
    size={size}
    style={style}
    textTransform={textTransform}
    to={to}
    variant={variant}
  >
    {children}
  </StyledButtonComponent>
);
