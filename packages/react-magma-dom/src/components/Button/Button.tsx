import * as React from 'react';
const styled = require('styled-components').default;
import { magma } from '../../theme/magma';

export interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    ghost?: boolean;
    link?: boolean;

    // button sizes
    large?: boolean;
    small?: boolean;

    // button styles
    default?: boolean;
    primary?: boolean;
    success?: boolean;
    warning?: boolean;
    danger?: boolean;
}

const StyledButton = styled.button`
    background-color: ${props => {
        if (props.ghost || props.link) {
            return 'none';
        }
        if (props.primary) {
            return magma.primary02;
        }
        if (props.success) {
            return magma.accent02;
        }
        if (props.warning) {
            return magma.accent05;
        }
        if (props.danger) {
            return magma.limited01;
        }
        return magma.primary04;
        }};
        border: 1px solid transparent;
        border-color: ${props => {
        if (props.link) {
            return 'transparent';
        }
        if (props.primary) {
            return magma.primary02;
        }
        if (props.success) {
            return magma.accent02;
        }
        if (props.warning) {
            return magma.accent05;
        }
        if (props.danger) {
            return magma.limited01;
        }
        return magma.secondary05;
    }};
    color: ${props => {
        if (props.link) {
            return magma.primary02;
        }
        if (props.ghost) {
            if (props.primary) {
              return magma.primary02;
            }
            if (props.success) {
              return magma.accent02;
            }
            if (props.warning) {
              return magma.accent05;
            }
            if (props.danger) {
              return magma.limited01;
            }
            return magma.secondary04;
        }
        if (props.primary || props.success || props.warning || props.danger) {
            return magma.primary04;
        }
        return magma.accent02;
    }};
    border-radius: 3px;
    cursor: pointer;
    display: inline-block;
    font-family: ${magma.headingFont};
    font-size: ${props => {
        if (props.large) {
            return '20px';
        }
        if (props.small) {
            return '14px';
        }
        return '16px';
    }};
    line-height: 1.46666667;
    margin: 5px;
    padding: ${props => {
        if (props.large) {
            return '0.4em 20px';
        }
        if (props.small) {
            return '0.4em 10px';
        }
        return '0.4em 15px';
    }};
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    white-space: nowrap;

    &:hover:not([disabled]),
    &:focus:not([disabled]) {
    background-color: ${props => {
        if (props.primary) {
            return magma.secondary02;
        }
        if (props.success) {
            return magma.accent03;
        }
        if (props.warning) {
            return magma.accent06;
        }
        if (props.danger) {
            return magma.limited02;
        }
        return magma.primary04;
    }};
    border-color: ${props => {
        if (props.link) {
            return 'transparent';
        }
        if (props.primary) {
            return magma.secondary02;
        }
        if (props.success) {
            return magma.accent03;
        }
        if (props.warning) {
            return magma.accent06;
        }
        if (props.danger) {
            return magma.limited02;
        }
        return magma.secondary05;
    }};
    color: ${props => {
        if (props.link) {
          return magma.secondary01;
        }
        if (props.primary || props.success || props.warning || props.danger) {
          return magma.primary04;
        }
        return magma.accent01;
    }};
    text-decoration: ${props => (props.link ? 'underline' : 'none')};}

    &:active:not([disabled]),
    &.active:not([disabled]) {
    background-color: ${props => {
        if (props.link) {
            return 'transparent';
        }
        if (props.primary) {
            return magma.secondary01;
        }
        if (props.success) {
            return magma.accent01;
        }
        if (props.warning) {
            return magma.accent04;
        }
        if (props.danger) {
            return magma.limited04;
        }
        return magma.secondary06;
    }};
    border-color: ${props => {
        if (props.link) {
            return 'transparent';
        }
        if (props.primary) {
            return magma.secondary01;
        }
        if (props.success) {
            return magma.accent01;
        }
        if (props.warning) {
            return magma.accent04;
        }
        if (props.danger) {
            return magma.limited04;
        }
        return magma.secondary05;
    }};
    box-shadow: ${props => (props.link ? '0 0 0' : 'inset 0 3px 5px rgba(0, 0, 0, 0.125)')};}

    &[disabled] {
        background: ${magma.limited03};
        border-color: ${magma.limited03};
        box-shadow: 0 0 0;
        color: rgba(122, 122, 122, 0.6);
        cursor: not-allowed;
        opacity: .65;
    }
`

export const Button: React.SFC<ButtonProps> = ({text, onClick, ghost, link, disabled, large, small, primary, success, warning, danger }: ButtonProps): JSX.Element => (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      large={large}
      small={small}
      ghost={ghost}
      link={link}
      primary={primary}
      success={success}
      warning={warning}
      danger={danger}>
        {text}
      </StyledButton>
)

export default Button;
