import React from 'react';

import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { Spinner } from '../Spinner';
import { VisuallyHidden } from '../VisuallyHidden';
import { StyledAIButtonProps } from './StyledAIButton';
import {
  buildAIActiveBackground,
  buildAIActiveColor,
  buildAIBorderColor,
  buildAIButtonBackground,
  buildAIButtonBorderRadius,
  buildAIButtonFontSize,
  buildAIButtonLineHeight,
  buildAIButtonPadding,
  buildAIButtonSize,
  buildAIColor,
  buildAIFocusBackground,
  buildAIFocusColor,
  buildBoxShadow,
} from './styles';

import { AIButtonSize, AIButtonType } from '.';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;
export const buttonStyles = props => css`
  align-items: center;
  background: ${buildAIButtonBackground(props)};
  border: 0;
  border-color: ${buildAIBorderColor(props)};
  border-radius: ${buildAIButtonBorderRadius(props)};
  box-shadow: ${buildBoxShadow(props)};
  color: ${buildAIColor(props)};
  cursor: ${props.disabled ? 'not-allowed' : 'pointer'};
  display: ${props.isFullWidth ? 'flex' : 'inline-flex'};
  flex-shrink: 0;
  font-family: ${props.theme.bodyFont};
  font-size: ${buildAIButtonFontSize(props)};
  font-weight: 500;
  height: ${buildAIButtonSize(props)};
  justify-content: center;
  letter-spacing: ${props.size === AIButtonSize.small
    ? props.theme.typeScale.size01.letterSpacing
    : 'inherit'};
  line-height: ${buildAIButtonLineHeight(props)};
  margin: 0;
  min-width: ${props.size === AIButtonSize.small
    ? '0'
    : props.theme.spaceScale.spacing13};
  overflow: hidden;
  padding: ${buildAIButtonPadding(props)};
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: ${props.textTransform || 'uppercase'};
  touch-action: manipulation;
  transition:
    color 0.35s,
    border-color 0.35s,
    box-shadow 0.35s;
  vertical-align: middle;
  white-space: nowrap;
  width: ${props.iconOnly
    ? buildAIButtonSize(props)
    : props.isFullWidth
      ? '100%'
      : 'auto'};

  ${props.isAnimated &&
  css`
    @media (prefers-reduced-motion: no-preference) {
      background-size: 200% 100%;
      background-position: 0% 50%;

      animation: ${gradientAnimation} 4s ease-in-out infinite alternate;
    }
  `}

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.35s;
    background: ${buildAIFocusBackground(props)};
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.35s;
    background: ${buildAIActiveBackground(props)};
  }

  &:not(:disabled) {
    &:focus {
      outline: 2px solid
        ${props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
      outline-offset: 2px;
      z-index: 1;
    }

    &:hover::before,
    &:focus::before {
      opacity: 1;
    }
    &:hover::after,
    &:focus::after {
      opacity: 0;
    }

    &:active::before {
      opacity: 0;
    }
    &:active::after {
      opacity: 1;
    }

    &:hover,
    &:focus {
      color: ${buildAIFocusColor(props)};
    }
    &:active {
      color: ${buildAIActiveColor(props)};
    }
  }

  > * {
    position: 'relative';
    z-index: 2;
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

export const BaseStyledAIButton = styled.button`
  ${buttonStyles}
`;

const SpinnerWrapper = styled.span`
  position: absolute;
  display: flex;
`;

export const ChildrenWrapper = styled.span<{
  isLoading: boolean;
  testId?: string;
}>`
  visibility: ${props => (props.isLoading ? 'hidden' : 'visible')};
  display: inline-flex;
  align-items: center;
`;

export const StyledAIButtonTemplate = React.forwardRef<
  HTMLButtonElement,
  StyledAIButtonProps
>((props, ref) => {
  const {
    size,
    isInverse,
    children,
    type = AIButtonType.button,
    testId,
    isLoading,
  } = props;
  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const spinnerColor = isInverse
    ? theme.colors.neutral100
    : theme.colors.neutral500;

  const spinnerSize =
    size === AIButtonSize.small
      ? theme.iconSizes.xSmall
      : size === AIButtonSize.large
        ? theme.iconSizes.large
        : theme.iconSizes.medium;

  return (
    <BaseStyledAIButton
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
            noRole
          />
          <VisuallyHidden>{i18n.spinner.ariaLabel}</VisuallyHidden>
        </SpinnerWrapper>
      )}
      <ChildrenWrapper isLoading={isLoading} testId={`${testId}-children`}>
        {children}
      </ChildrenWrapper>
    </BaseStyledAIButton>
  );
});
