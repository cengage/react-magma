import * as React from 'react';
import { ButtonCore } from 'react-magma-core';
const styled = require('styled-components').default;
import { magma } from '../../theme/magma';

enum ButtonType {
  default,
  primary,
  success,
  warning,
  danger,
  link
}

enum ButtonSize {
  large,
  small
}

export interface ButtonProps {
  autoFocus?: boolean;
  text: string;
  handleClick: () => void;
  disabled?: boolean;
  ghost?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
}

const StyledButton = styled.button`
  background: ${props => {
    if (props.ghost) {
      return 'none';
    }

    switch (props.type) {
      case 'link':
        return 'none';
      case 'primary':
        return magma.primary02;
      case 'success':
        return magma.accent02;
      case 'warning':
        return magma.accent05;
      case 'danger':
        return magma.limited01;
      default:
        return magma.primary04;
    }
  }};
  border: 1px solid transparent;
  border-color: ${props => {
    switch (props.type) {
      case 'link':
        return 'transparent';
      case 'primary':
        return magma.primary02;
      case 'success':
        return magma.accent02;
      case 'warning':
        return magma.accent05;
      case 'danger':
        return magma.limited01;
      default:
        return magma.secondary05;
    }
  }};
  color: ${props => {
    if (props.type === 'link') {
      return magma.primary02;
    }
    if (props.ghost) {
      switch (props.type) {
        case 'primary':
          return magma.primary02;
        case 'success':
          return magma.accent02;
        case 'warning':
          return magma.accent05;
        case 'danger':
          return magma.limited01;
        default:
          return magma.secondary04;
      }
    }
    if (
      props.type === 'primary' ||
      props.type === 'success' ||
      props.type === 'warning' ||
      props.type === 'danger'
    ) {
      return magma.primary04;
    }
    return magma.accent02;
  }};
  border-radius: 3px;
  cursor: pointer;
  display: inline-block;
  font-family: ${magma.bodyFont};
  font-size: ${props => {
    switch (props.size) {
      case 'large':
        return '20px';
      case 'small':
        return '14px';
      default:
        return '16px';
    }
  }};
  line-height: 1.46666667;
  margin: 5px;
  padding: ${props => {
    switch (props.size) {
      case 'large':
        return '0.4em 20px';
      case 'small':
        return '0.4em 10px';
      default:
        return '0.4em 15px';
    }
  }};
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  white-space: nowrap;

  &:hover:not([disabled]),
  &:focus:not([disabled]) {
    background-color: ${props => {
      switch (props.type) {
        case 'primary':
          return magma.secondary02;
        case 'success':
          return magma.accent03;
        case 'warning':
          return magma.accent06;
        case 'danger':
          return magma.limited02;
        default:
          return magma.primary04;
      }
    }};
    border-color: ${props => {
      switch (props.type) {
        case 'link':
          return 'transparent';
        case 'primary':
          return magma.secondary02;
        case 'success':
          return magma.accent03;
        case 'warning':
          return magma.accent06;
        case 'danger':
          return magma.limited02;
        default:
          return magma.secondary05;
      }
    }};
    color: ${props => {
      switch (props.type) {
        case 'link':
          return magma.secondary01;
        case 'primary':
        case 'success':
        case 'warning':
        case 'danger':
          return magma.primary04;
        default:
          return magma.accent01;
      }
    }};
    text-decoration: ${props => (props.type === 'link' ? 'underline' : 'none')};
  }

  &:active:not([disabled]),
  &.active:not([disabled]) {
    background-color: ${props => {
      switch (props.type) {
        case 'link':
          return 'transparent';
        case 'primary':
          return magma.secondary01;
        case 'success':
          return magma.accent01;
        case 'warning':
          return magma.accent04;
        case 'danger':
          return magma.limited04;
        default:
          return magma.secondary06;
      }
    }};
    border-color: ${props => {
      switch (props.type) {
        case 'link':
          return 'transparent';
        case 'primary':
          return magma.secondary01;
        case 'success':
          return magma.accent01;
        case 'warning':
          return magma.accent04;
        case 'danger':
          return magma.limited04;
        default:
          return magma.secondary05;
      }
    }};
    box-shadow: ${props =>
      props.type === 'link' ? '0 0 0' : 'inset 0 3px 5px rgba(0, 0, 0, 0.125)'};
  }

  &[disabled] {
    background: ${magma.limited03};
    border-color: ${magma.limited03};
    box-shadow: 0 0 0;
    color: rgba(122, 122, 122, 0.6);
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

export const Button: React.SFC<ButtonProps> = (
  props: ButtonProps
): JSX.Element => (
  <ButtonCore handleClick={props.handleClick}>
    {({ handleClick }) => {
      const { autoFocus, text, ghost, disabled, size, type } = props;

      return (
        <StyledButton
          autoFocus={autoFocus}
          onClick={handleClick}
          disabled={disabled}
          ghost={ghost}
          size={size}
          type={type}
        >
          {text}
        </StyledButton>
      );
    }}
  </ButtonCore>
);

export default Button;
