import * as React from 'react';
import { ButtonCore } from 'react-magma-core';
const styled = require('styled-components').default;
import { magma } from '../../theme/magma';

enum ButtonType {
  solid,
  outline,
  link
}

enum ButtonColor {
  primary,
  secondary,
  success,
  danger
}

enum ButtonShape {
  fill,
  leftCap,
  rightCap,
  round
}

enum ButtonSize {
  large,
  medium,
  small
}

export interface ButtonProps {
  allCaps?: boolean;
  autoFocus?: boolean;
  text: string;
  handleClick: () => void;
  color?: ButtonColor;
  disabled?: boolean;
  inverse?: boolean;
  shape?: ButtonShape;
  size?: ButtonSize;
  type?: ButtonType;
}

const StyledButton = styled.button`
  cursor: pointer;
  display: inline-block;
  font-family: ${magma.bodyFont};
  font-weight: 600;
  line-height: 1.46666667;
  margin: 5px;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  white-space: nowrap;

  background: ${props => {
    // Button color, type, inverse
    if (props.type === 'link' || props.type === 'outline') {
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

  border: ${props => {
    // Button color, type, inverse
    if (props.type === 'link') {
      return '0';
    }
    return '2px solid';
  }};

  border-color: ${props => {
    // Button color, type, inverse
    if (props.disabled && props.type === 'solid') {
      return magma.colors.neutral04;
    }
    if (props.inverse) {
      return magma.colors.neutral08;
    }
    if (props.type === 'solid') {
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
  }};

  color: ${props => {
    // Button color, type, inverse
    if (props.disabled) {
      return magma.colors.neutral04;
    }
    if (
      (!props.inverse && props.type === 'solid') ||
      (props.inverse && props.type !== 'solid')
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

  font-size: ${props => {
    // Button size
    switch (props.size) {
      case 'large':
        return '18px';
      case 'small':
        return '12px';
      default:
        return '14px';
    }
  }};

  padding: ${props => {
    // Button size
    switch (props.size) {
      case 'large':
        return '0.4em 20px';
      case 'small':
        return '0.4em 10px';
      default:
        return '0.4em 15px';
    }
  }};

  border-radius: ${props => {
    // Button shape
    switch (props.shape) {
      case 'leftCap':
        return '5px 0 0 5px';
      case 'rightCap':
        return '0 5px 5px 0';
      case 'round':
        return '100%';
      default:
        return '5px';
    }
  }};

  text-transform: uppercase;
`;

export const Button: React.FunctionComponent<ButtonProps> = (
  props: ButtonProps
): JSX.Element => (
  <ButtonCore handleClick={props.handleClick}>
    {({ handleClick }) => {
      const {
        autoFocus,
        text,
        disabled,
        inverse,
        allCaps,
        color,
        shape,
        size,
        type
      } = props;

      return (
        <StyledButton
          allCaps={allCaps}
          autoFocus={autoFocus}
          onClick={handleClick}
          color={color ? color : 'primary'}
          disabled={disabled}
          inverse={inverse}
          shape={shape ? shape : 'fill'}
          size={size ? size : 'medium'}
          type={type ? type : 'solid'}
        >
          {text}
        </StyledButton>
      );
    }}
  </ButtonCore>
);

export default Button;
