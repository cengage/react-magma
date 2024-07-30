import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  buildActiveBackground,
  buildActiveColor,
  buildAfterBackground,
  buildButtonBorderRadius,
  buildButtonFontSize,
  buildButtonLineHeight,
  buildButtonSize,
  buildButtonPadding,
  buildBorderColor,
  buildBorderWidth,
  buildButtonBackground,
  buildColor,
  buildFocusBackground,
  buildFocusColor,
} from './styles';
import { ThemeContext } from '../../theme/ThemeContext';
import { ButtonType, ButtonProps, ButtonSize, ButtonVariant } from '../Button';
import { Spinner } from '../Spinner';

export interface StyledButtonProps extends ButtonProps {
  href?: string;
  iconOnly?: boolean;
}

export const buttonStyles = props => css`
  align-items: center;
  background: ${buildButtonBackground(props)};
  border: ${buildBorderWidth(props)};
  border-color: ${buildBorderColor(props)};
  border-radius: ${buildButtonBorderRadius(props)};
  color: ${buildColor(props)};
  cursor: ${props.disabled ? 'not-allowed' : 'pointer'};
  display: ${props.isFullWidth ? 'flex' : 'inline-flex'};
  flex-shrink: 0;
  font-family: ${props.theme.bodyFont};
  font-size: ${buildButtonFontSize(props)};
  font-weight: 500;
  height: ${buildButtonSize(props)};
  justify-content: center;
  letter-spacing: ${props.size === 'small'
    ? props.theme.typeScale.size01.letterSpacing
    : 'inherit'};
  line-height: ${buildButtonLineHeight(props)};
  margin: 0;
  min-width: ${props.size === 'small' ? '0' : props.theme.spaceScale.spacing13};
  overflow: hidden;
  padding: ${buildButtonPadding(props)};
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: ${props.textTransform || 'uppercase'};
  touch-action: manipulation;
  transition: background 0.35s, border-color 0.35s, box-shadow 0.35s,
    color 0.35s;
  vertical-align: middle;
  white-space: nowrap;
  width: ${props.iconOnly
    ? buildButtonSize(props)
    : props.isFullWidth
    ? '100%'
    : 'auto'};

  &:not(:disabled) {
    &:focus {
      outline: 2px solid
        ${props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
      outline-offset: 2px;
      z-index: 1;
    }

    &:hover,
    &:focus {
      background: ${buildFocusBackground(props)};
      color: ${buildFocusColor(props)};
    }

    &:after {
      background: ${buildAfterBackground(props)};
      border-radius: 50%;
      content: '';
      height: ${props.theme.spaceScale.spacing07};
      left: 50%;
      opacity: 0;
      padding: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%) scale(1);
      transition: opacity 1s, transform 0.5s;
      width: ${props.theme.spaceScale.spacing07};
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

  svg {
    flex-shrink: 0;
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

export const BaseStyledButton = styled.button`
  ${buttonStyles}
`;

const SpinnerWrapper = styled.span`
  position: absolute;
  display: flex;
`;

const ChildrenWrapper = styled.span<{ isLoading: boolean; testId?: string }>`
  visibility: ${props => (props.isLoading ? 'hidden' : 'visible')};
  display: inline-flex;
  align-items: center;
`;

export const StyledButton = React.forwardRef<
  HTMLButtonElement,
  StyledButtonProps
>((props, ref) => {
  const {
    size,
    variant,
    isInverse,
    children,
    type = ButtonType.button,
    testId,
    isLoading,
  } = props;
  const theme = React.useContext(ThemeContext);

  const spinnerColor =
    isInverse && variant === ButtonVariant.link
      ? theme.colors.neutral100
      : theme.colors.neutral500;

  const spinnerSize =
    size === ButtonSize.small
      ? theme.iconSizes.xSmall
      : size === ButtonSize.large
      ? theme.iconSizes.large
      : theme.iconSizes.medium;

  return (
    <BaseStyledButton
      {...props}
      data-testid={testId}
      ref={ref}
      type={type}
      theme={theme}
      disabled={isLoading || props.disabled}
    >
      {isLoading && (
        <SpinnerWrapper>
          <Spinner
            testId={`${testId}-spinner`}
            color={spinnerColor}
            size={spinnerSize}
          />
        </SpinnerWrapper>
      )}
      <ChildrenWrapper isLoading={isLoading} testId={`${testId}-children`}>
        {children}
      </ChildrenWrapper>
    </BaseStyledButton>
  );
});
