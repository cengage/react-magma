import * as React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import {
  buildActiveBackground,
  buildActiveColor,
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
import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { token, TokenPath } from '../../theme/tokens';
import { ButtonType, ButtonProps, ButtonSize, ButtonVariant } from '../Button';
import { Spinner } from '../Spinner';
import { VisuallyHidden } from '../VisuallyHidden';

export interface StyledButtonProps extends ButtonProps {
  href?: string;
  iconOnly?: boolean;
}

function cssToken(props, path: TokenPath): string {
  return token.var(path, { theme: props.theme });
}

function buildButtonMinWidth(props) {
  if (props.size === 'small') {
    return cssToken(props, 'components.button.size.small.minWidth');
  }

  if (props.size === 'large') {
    return cssToken(props, 'components.button.size.large.minWidth');
  }

  return cssToken(props, 'components.button.size.medium.minWidth');
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
  font-family: ${cssToken(props, 'components.button.fontFamily')};
  font-size: ${buildButtonFontSize(props)};
  font-weight: 500;
  height: ${buildButtonSize(props)};
  justify-content: center;
  letter-spacing: ${props.size === 'small'
    ? cssToken(props, 'components.button.size.small.letterSpacing')
    : 'inherit'};
  line-height: ${buildButtonLineHeight(props)};
  margin: 0;
  min-width: ${buildButtonMinWidth(props)};
  overflow: hidden;
  padding: ${buildButtonPadding(props)};
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: ${props.textTransform || 'uppercase'};
  touch-action: manipulation;
  transition:
    background 0.35s,
    border-color 0.35s,
    box-shadow 0.35s,
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
          ? cssToken(props, 'components.button.focus.inverseOutlineColor')
          : cssToken(props, 'components.button.focus.outlineColor')};
      outline-offset: 2px;
      z-index: 1;
    }

    &:hover,
    &:focus {
      background: ${buildFocusBackground(props)};
      color: ${buildFocusColor(props)};
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

export const ChildrenWrapper = styled.span<{
  isLoading: boolean;
  testId?: string;
}>`
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
  const i18n = React.useContext(I18nContext);

  const spinnerColor =
    isInverse && variant === ButtonVariant.link
      ? token.var('colors.neutral100', { theme })
      : token.var('colors.neutral500', { theme });

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
            noRole
          />
          <VisuallyHidden>{i18n.spinner.ariaLabel}</VisuallyHidden>
        </SpinnerWrapper>
      )}
      <ChildrenWrapper isLoading={isLoading} testId={`${testId}-children`}>
        {children}
      </ChildrenWrapper>
    </BaseStyledButton>
  );
});
