import * as React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { ThemeContext } from '../../theme/themeContext';
import { darken, tint } from 'polished';

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

export enum ButtonIconPosition {
  left = 'left',
  right = 'right'
}

export enum ButtonType {
  button = 'button',
  submit = 'submit',
  reset = 'reset'
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ariaExpanded?: boolean;
  ariaLabel?: string;
  as?: any;
  autoFocus?: boolean;
  block?: boolean;
  color?: ButtonColor;
  href?: string;
  testId?: string;
  inverse?: boolean;
  shape?: ButtonShape;
  size?: ButtonSize;
  textTransform?: ButtonTextTransform;
  theme?: any;
  to?: string;
  type?: ButtonType;
  variant?: ButtonVariant;
}

interface StyledButtonProps extends ButtonProps {
  iconOnly?: boolean;
  ref?: any;
}

const StyledButtonComponent = styled('button', {
  shouldForwardProp: prop => isPropValid(prop)
})<StyledButtonProps>`
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
  font-family: ${props => props.theme.bodyFont};
  justify-content: center;
  line-height: 1;
  margin: ${props => (props.block ? '5px 0' : '5px')};
  min-width: 5.625em;
  overflow: hidden;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: ${props => props.textTransform};
  transition: background 0.35s, color 0.35s;
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
    if (props.variant !== 'solid') {
      return 'rgba(0,0,0,0)';
    }
    if (props.disabled) {
      return props.theme.colors.neutral06;
    }
    if (props.inverse) {
      return props.theme.colors.neutral08;
    }
    switch (props.color) {
      case 'secondary':
        return props.theme.colors.neutral08;
      case 'success':
        return props.theme.colors.success01;
      case 'danger':
        return props.theme.colors.danger;
      default:
        return props.theme.colors.primary;
    }
  }};

  border: ${props =>
    props.variant === 'outline' ||
    (props.variant === 'solid' && props.color === 'secondary' && !props.inverse)
      ? '2px solid'
      : '0'};

  border-color: ${props => {
    if (props.disabled && props.inverse && props.variant === 'outline') {
      return props.theme.colors.disabledInverseText;
    }
    if (props.disabled) {
      return props.theme.colors.neutral06;
    }
    if (props.inverse) {
      return props.theme.colors.neutral08;
    }
    if (props.color === 'secondary') {
      return props.theme.colors.neutral05;
    }
    if (props.variant === 'solid') {
      switch (props.color) {
        case 'success':
          return props.theme.colors.success01;
        case 'danger':
          return props.theme.colors.danger;
        default:
          return props.theme.colors.primary;
      }
    }
  }};

  color: ${props => {
    if (props.disabled && props.inverse && props.variant !== 'solid') {
      return props.theme.colors.disabledInverseText;
    }
    if (props.disabled) {
      return props.theme.colors.disabledText;
    }
    if (
      (!props.inverse && props.variant === 'solid') ||
      (props.inverse && props.variant !== 'solid')
    ) {
      if (props.color === 'secondary' && !props.inverse) {
        return props.theme.colors.neutral02;
      }
      return props.theme.colors.neutral08;
    }
    switch (props.color) {
      case 'secondary':
        return props.theme.colors.neutral02;
      case 'success':
        return props.theme.colors.success01;
      case 'danger':
        return props.theme.colors.danger;
      default:
        return props.theme.colors.primary;
    }
  }};

  &:not(:disabled) {
    &:focus {
      outline: 2px dotted ${props => props.theme.colors.pop03};
      outline-offset: 3px;
    }

    &:hover,
    &:focus {
      background: ${props => {
        if (
          (props.variant !== 'solid' && !props.inverse) ||
          (props.variant === 'solid' && props.inverse)
        ) {
          switch (props.color) {
            case 'secondary':
              return tint(0.9, props.theme.colors.neutral02);
            case 'success':
              return tint(0.9, props.theme.colors.success01);
            case 'danger':
              return tint(0.9, props.theme.colors.danger);
            default:
              return tint(0.9, props.theme.colors.primary);
          }
        }
        if (props.variant !== 'solid' && props.inverse) {
          return 'rgba(0, 0, 0, 0.3)';
        }
        switch (props.color) {
          case 'secondary':
            return darken(0.1, props.theme.colors.neutral08);
          case 'success':
            return darken(0.1, props.theme.colors.success01);
          case 'danger':
            return darken(0.1, props.theme.colors.danger);
          default:
            return darken(0.1, props.theme.colors.primary);
        }
      }};
      color: ${props => {
        if (
          (props.variant !== 'solid' && !props.inverse) ||
          (props.variant === 'solid' && props.inverse)
        ) {
          switch (props.color) {
            case 'secondary':
              return props.theme.colors.neutral02;
            case 'success':
              return darken(0.1, props.theme.colors.success01);
            case 'danger':
              return darken(0.1, props.theme.colors.danger);
            default:
              return darken(0.1, props.theme.colors.primary);
          }
        }
        if (props.variant !== 'solid' && props.inverse) {
          return props.theme.colors.neutral08;
        }
        if (props.color === 'secondary' && !props.inverse) {
          return props.theme.colors.neutral02;
        }
        return props.theme.colors.neutral08;
      }};
    }

    &:after {
      border-radius: 50%;
      content: '';
      height: 32px;
      left: 50%;
      opacity: 0;
      position: absolute;
      padding: 50%;
      top: 18px;
      transform: translate(-50%, -50%) scale(1);
      transition: opacity 1s, transform 0.5s;
      width: 32px;
      background: ${props => {
        if (
          (props.variant !== 'solid' && !props.inverse) ||
          (props.variant === 'solid' && props.inverse)
        ) {
          switch (props.color) {
            case 'secondary':
              return props.theme.colors.neutral02;
            case 'success':
              return props.theme.colors.success01;
            case 'danger':
              return props.theme.colors.danger;
            default:
              return props.theme.colors.primary;
          }
        }
        if (
          props.variant === 'solid' &&
          !props.inverse &&
          props.color === 'secondary'
        ) {
          return props.theme.colors.neutral02;
        }
        return props.theme.colors.neutral08;
      }};
    }

    &:active {
      background: ${props => {
        if (
          (props.variant !== 'solid' && !props.inverse) ||
          (props.variant === 'solid' && props.inverse)
        ) {
          switch (props.color) {
            case 'secondary':
              return tint(0.7, props.theme.colors.neutral02);
            case 'success':
              return tint(0.7, props.theme.colors.success01);
            case 'danger':
              return tint(0.7, props.theme.colors.danger);
            default:
              return tint(0.7, props.theme.colors.primary);
          }
        }
        if (props.variant !== 'solid' && props.inverse) {
          return 'rgba(0, 0, 0, 0.5);';
        }
        switch (props.color) {
          case 'secondary':
            return darken(0.2, props.theme.colors.neutral08);
          case 'success':
            return darken(0.2, props.theme.colors.success01);
          case 'danger':
            return darken(0.2, props.theme.colors.danger);
          default:
            return darken(0.2, props.theme.colors.primary);
        }
      }};
      color: ${props => {
        if (
          (props.variant !== 'solid' && !props.inverse) ||
          (props.variant === 'solid' && props.inverse)
        ) {
          switch (props.color) {
            case 'secondary':
              return props.theme.colors.neutral02;
            case 'success':
              return darken(0.2, props.theme.colors.success01);
            case 'danger':
              return darken(0.2, props.theme.colors.danger);
            default:
              return darken(0.2, props.theme.colors.primary);
          }
        }
        if (props.variant !== 'solid' && props.inverse) {
          return props.theme.colors.neutral08;
        }
        if (props.color === 'secondary' && !props.inverse) {
          return props.theme.colors.neutral02;
        }
        return props.theme.colors.neutral08;
      }};
      &:after {
        opacity: 0.4;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0s;
      }
    }
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

export const StyledButton: React.FunctionComponent<
  StyledButtonProps
> = React.forwardRef(
  (
    {
      ariaExpanded,
      ariaLabel,
      as,
      block,
      children,
      iconOnly,
      testId,
      inverse,
      color,
      shape,
      size,
      textTransform,
      to,
      variant,
      ...other
    }: StyledButtonProps,
    ref: any
  ) => (
    <ThemeContext.Consumer>
      {theme => (
        <StyledButtonComponent
          data-testid={testId}
          ref={ref}
          as={as}
          aria-expanded={ariaExpanded}
          aria-label={ariaLabel}
          block={block}
          color={color}
          iconOnly={iconOnly}
          inverse={inverse}
          shape={shape}
          size={size}
          textTransform={textTransform}
          theme={theme}
          to={to}
          variant={variant}
          {...other}
        >
          {children}
        </StyledButtonComponent>
      )}
    </ThemeContext.Consumer>
  )
);
