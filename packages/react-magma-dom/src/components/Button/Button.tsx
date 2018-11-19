import * as React from 'react';
import { ButtonCore } from 'react-magma-core';
const styled = require('styled-components').default;
import { magma } from '../../theme/magma';

enum ButtonType {
  solid, //default
  outline,
  link
}

enum ButtonColor {
  primary, //default
  secondary,
  success,
  danger
}

enum ButtonShape {
  fill, //default
  leftCap,
  rightCap,
  round
}

enum ButtonSize {
  large,
  medium, //default
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
  display: inline-block;
  font-family: ${magma.bodyFont};
  line-height: 1.46666667;
  margin: 5px;
  overflow: hidden;
  position: relative;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  white-space: nowrap;

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
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  text-transform: ${props => (props.allCaps === false ? 'none' : 'uppercase')};

  font-size: ${props => {
    // Button size
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
  border: ${props => (props.type === 'link' ? '0' : '2px solid')};
  border-color: ${props => {
    // Button color, type, inverse
    if (props.disabled) {
      return magma.colors.neutral06;
    }
    if (props.inverse) {
      return magma.colors.neutral08;
    }
    if (props.color === 'secondary') {
      return magma.colors.neutral05;
    }
    if (props.type === 'solid') {
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

  &:before {
    background: ${props =>
      props.color === 'secondary'
        ? 'rgba(63,63,63,1)'
        : 'rgba(255, 255, 255, 1)'};
    content: '';
    height: 200%;
    left: -50%;
    opacity: 0;
    position: absolute;
    top: -50%;
    transition: 0.2s;
    width: 200%;
  }

  &:hover {
    &:before {
      opacity: 0.1;
    }
  }
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
