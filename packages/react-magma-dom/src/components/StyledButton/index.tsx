/** @jsx jsx */
import * as React from 'react';
import { jsx, css } from '@emotion/core';
import {
  buildActiveBackground,
  buildActiveColor,
  buildAfterBackground,
  buildAfterTopPosition,
  buildBorderColor,
  buildButtonBackground,
  buildColor,
  buildFocusBackground,
  buildFocusColor,
  buttonBaseHeight,
  buttonBorderRadius,
  buttonFontSize,
  buttonIconOnlyHeight,
  buttonIconOnlyWidth,
  buttonPadding
} from './styles';
import { ThemeContext } from '../../theme/ThemeContext';
import { ButtonProps } from '../Button';

interface StyledButtonProps extends ButtonProps {
  as?: any;
  href?: string;
  iconOnly?: boolean;
  ref?: any;
  to?: string;
}

export const buttonStyles = props => css`
  align-items: center;
  border-radius: ${buttonBorderRadius[props.shape]};
  cursor: ${props.disabled ? 'not-allowed' : 'pointer'};
  display: ${props.fullWidth ? 'flex' : 'inline-flex'};
  flex-shrink: 0;
  font-family: ${props.theme.bodyFont};
  justify-content: center;
  line-height: 1;
  margin: ${props.fullWidth ? '5px 0' : '5px'};
  min-width: 5.625em;
  overflow: hidden;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: ${props.textTransform};
  transition: background 0.35s, color 0.35s;
  vertical-align: middle;
  touch-action: manipulation;
  white-space: nowrap;
  font-size: ${buttonFontSize[props.size]};
  font-weight: 600;
  height: ${props.iconOnly
    ? buttonIconOnlyHeight[props.size]
    : buttonBaseHeight[props.size]};
  padding: ${buttonPadding[props.size]};
  width: ${props.iconOnly
    ? buttonIconOnlyWidth[props.size]
    : props.fullWidth
    ? '100%'
    : 'auto'};
  background: ${buildButtonBackground(props)};
  border: ${props.variant === 'outline' ||
  (props.variant === 'solid' && props.color === 'secondary' && !props.inverse)
    ? '2px solid'
    : '0'};
  border-color: ${buildBorderColor(props)};
  color: ${buildColor(props)};

  &:not(:disabled) {
    &:focus {
      outline: 2px dotted
        ${props.inverse
          ? props.theme.colors.neutral08
          : props.theme.colors.focus};
      outline-offset: 3px;
    }

    &:hover,
    &:focus {
      background: ${buildFocusBackground(props)};
      color: ${buildFocusColor(props)};
    }

    &:after {
      border-radius: 50%;
      content: '';
      height: 32px;
      left: 50%;
      opacity: 0;
      position: absolute;
      padding: 50%;
      top: ${buildAfterTopPosition(props)};
      transform: translate(-50%, -50%) scale(1);
      transition: opacity 1s, transform 0.5s;
      width: 32px;
      background: ${buildAfterBackground(props)};
    }

    &:active {
      background: ${buildActiveBackground(props)};
      color: ${buildActiveColor(props)};
      &:after {
        opacity: 0.4;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0s;
      }
    }
  }

  ${props.iconOnly &&
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
> = React.forwardRef((props, ref: any) => {
  const {
    fullWidth,
    children,
    iconOnly,
    testId,
    inverse,
    color,
    shape,
    size,
    textTransform,
    variant,
    ...other
  } = props;

  const theme = React.useContext(ThemeContext);

  return (
    <button
      css={buttonStyles({ ...props, theme })}
      {...other}
      data-testid={testId}
      ref={ref}
    >
      {children}
    </button>
  );
});
