import * as React from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';
import { transparentize } from 'polished';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  InfoIcon,
  CheckCircleIcon,
  WarningIcon,
  ErrorIcon,
  IconProps,
  CloseIcon,
} from 'react-magma-icons';
import { ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { ProgressRing } from '../ProgressRing';
import { useGenerateId } from '../../utils';
import { I18nContext } from '../../i18n';
import { InverseContext, useIsInverse } from '../../inverse';
import styled, { CreateStyled } from '@emotion/styled';
import { ThemeInterface } from '../../theme/magma';

const typedStyled = styled as CreateStyled<ThemeInterface>;

export const VARIANT_ICON: {
  [name: string]: React.FunctionComponent<IconProps>;
} = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
  danger: ErrorIcon,
};

export enum AlertVariant {
  info = 'info', //default,
  success = 'success',
  warning = 'warning',
  danger = 'danger',
}

export interface AlertBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  additionalContent?: React.ReactNode;
  closeAriaLabel?: string;
  forceDismiss?: () => void;
  hasTimerRing?: boolean;
  id?: string;
  isExiting?: boolean;
  isDismissed?: boolean;
  isDismissible?: boolean;
  isInverse?: boolean;
  isPaused?: boolean;
  isToast?: boolean;
  onDismiss?: () => void;
  /**
   * @internal
   */
  testId?: string;
  toastDuration?: number;
  variant?: AlertVariant;
}

export const transitionDuration = 500;

export function buildAlertBackground(props) {
  if (props.isInverse) {
    switch (props.variant) {
      case 'success':
        return props.theme.colors.success700;
      case 'warning':
        return props.theme.colors.warning700;
      case 'danger':
        return props.theme.colors.danger700;
      default:
        return props.theme.colors.info700;
    }
  }
  switch (props.variant) {
    case 'success':
      return props.theme.colors.success100;
    case 'warning':
      return props.theme.colors.warning100;
    case 'danger':
      return props.theme.colors.danger100;
    default:
      return props.theme.colors.info100;
  }
}

export function buildAlertBorder(props) {
  if (props.isInverse) {
    switch (props.variant) {
      case 'success':
        return props.theme.colors.success300;
      case 'warning':
        return props.theme.colors.warning300;
      case 'danger':
        return props.theme.colors.danger200;
      default:
        return props.theme.colors.info300;
    }
  }
  switch (props.variant) {
    case 'success':
      return props.theme.colors.success500;
    case 'warning':
      return props.theme.colors.warning500;
    case 'danger':
      return props.theme.colors.danger500;
    default:
      return props.theme.colors.info500;
  }
}

export function buildAlertColor(props) {
  if (props.isInverse) {
    return props.theme.colors.neutral100;
  }
  switch (props.variant) {
    case 'success':
      return props.theme.colors.success500;
    case 'warning':
      return props.theme.colors.warning500;
    case 'danger':
      return props.theme.colors.danger500;
    default:
      return props.theme.colors.info500;
  }
}

export function buildLinkColor(props) {
  if (props.isInverse) {
    switch (props.variant) {
      case 'success':
        return props.theme.colors.success200;
      case 'warning':
        return props.theme.colors.warning200;
      case 'danger':
        return props.theme.colors.danger200;
      default:
        return props.theme.colors.info200;
    }
  }
  switch (props.variant) {
    case 'success':
      return props.theme.colors.success700;
    case 'warning':
      return props.theme.colors.warning700;
    case 'danger':
      return props.theme.colors.danger700;
    default:
      return props.theme.colors.info700;
  }
}

export function buildLinkHoverColor(props) {
  if (props.isInverse) {
    return props.theme.colors.neutral100;
  }
  switch (props.variant) {
    case 'success':
      return props.theme.colors.success;
    case 'warning':
      return props.theme.colors.warning;
    case 'danger':
      return props.theme.colors.danger;
    default:
      return props.theme.colors.info;
  }
}

const StyledAlert = typedStyled.div<AlertBaseProps>`
  align-items: stretch;
  animation: ${props =>
    props.isExiting
      ? `fadeout ${transitionDuration}ms`
      : `fadein ${transitionDuration}ms`};
  display: flex;
  flex-direction: column;
  font-size: ${props => props.theme.typeScale.size03.fontSize};
  font-family: ${props => props.theme.bodyFont};
  line-height: ${props => props.theme.typeScale.size03.lineHeight};
  margin-bottom: ${props => props.theme.spaceScale.spacing06};
  max-width: 100%;
  padding: 0;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.small}px) {
    font-size: ${props => props.theme.typeScale.size02.fontSize};
    letter-spacing: ${props => props.theme.typeScale.size02.letterSpacing};
    line-height: ${props => props.theme.typeScale.size02.lineHeight};
  }

  &:focus {
    outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
  }

  ${props =>
    props.isToast &&
    css`
      animation: ${props.isExiting
        ? `slideout ${transitionDuration}ms`
        : `slidein ${transitionDuration}ms`};
      min-width: 375px;
      margin: 0 auto;

      @media (max-width: ${props.theme.breakpoints.small}px) {
        min-width: 0;
        width: 100%;
      }
    `}

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slidein {
    from {
      left: -500px;
    }
    to {
      left: 0;
    }
  }

  @keyframes slideout {
    from {
      left: 0;
    }
    to {
      left: -500px;
    }
  }

  a {
    color: ${props => buildLinkColor(props)};
    font-weight: 400;
    text-decoration: underline;
    &:not([disabled]) {
      &:focus,
      &:hover {
        color: ${props => buildLinkHoverColor(props)};
      }
    }
  }
`;

const StyledAlertInner = typedStyled.div<AlertBaseProps>`
  background: ${buildAlertBackground};
  border: 1px solid ${buildAlertBorder};
  border-radius: ${props => props.theme.borderRadius};
  color: ${buildAlertColor};
  display: flex;
  position: relative;

  ${props =>
    props.isToast &&
    css`
      box-shadow: ${props.isInverse
        ? `0 2px 8px 0 ${transparentize(0.3, props.theme.colors.neutral900)}`
        : `0 2px 8px 0 ${transparentize(0.6, props.theme.colors.neutral900)}`};
      padding-right: 0;
      height: ${props.theme.spaceScale.spacing11};
    `}
`;

const AlertContents = typedStyled.div<{
  additionalContent?: React.ReactNode;
  isDismissible?: boolean;
}>`
  align-items: ${props => (props.additionalContent ? 'center' : '')};
  align-self: center;
  flex-grow: 1;
  font-family: ${props => props.theme.bodyFont};
  padding: ${props => props.theme.spaceScale.spacing04} 0;
  display: ${props => (props.additionalContent ? 'flex' : '')};
  margin-right: ${props =>
    props.additionalContent && !props.isDismissible
      ? props.theme.spaceScale.spacing03
      : ''};
  @media (max-width: ${props => props.theme.breakpoints.small}px) {
    padding-left: 0;
  }
`;

export const AdditionalContentWrapper = typedStyled.div`
  flex: 1 0 auto;
  justify-content: flex-end;
  display: flex;
  margin-left: ${props => props.theme.spaceScale.spacing05};
`;

const IconWrapperStyles = css`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  margin-right: 1px;
`;

const IconWrapper = typedStyled.span<{ isToast?: boolean; theme: any }>`
  ${IconWrapperStyles}
  padding: 0 ${props => props.theme.spaceScale.spacing03} 0 ${props =>
  props.theme.spaceScale.spacing04};

  @media (max-width: ${props => props.theme.breakpoints.small}px) {
    padding: 0 ${props => props.theme.spaceScale.spacing03};
    svg {
      width: 20px;
    }
  }
`;

const ProgressRingWrapper = typedStyled.div`
  margin-top: 6px;
  position: absolute;
  top: auto;
  right: ${props => props.theme.spaceScale.spacing02};
`;

const DismissibleIconWrapper = typedStyled.span<AlertBaseProps>`
  ${IconWrapperStyles}
  margin-left: ${props =>
    props.additionalContent ? props.theme.spaceScale.spacing03 : ''};
`;

const whitelistProps = ['icon', 'isInverse', 'theme', 'variant'];

const shouldForwardProp = prop => {
  return isPropValid(prop) || whitelistProps.includes(prop);
};

const DismissButton = typedStyled(IconButton, { shouldForwardProp })<{
  alertVariant?: AlertVariant;
  isInverse?: boolean;
  isToast?: boolean;
}>`
  align-self: stretch;
  border-radius: 0 ${props => props.theme.borderRadius}
    ${props => props.theme.borderRadius} 0;
  color: inherit;
  height: auto;
  margin: ${props => (props.isToast ? '4px' : '0 -1px 0 0')};
  padding: ${props =>
    props.isToast
      ? `0 ${props.theme.spaceScale.spacing04}`
      : `0 ${props.theme.spaceScale.spacing03}`};
  width: auto;
  &:not(:disabled):hover {
    background: none;
    color: inherit;
  }
  &:focus:not(:disabled) {
    background: none;
    color: inherit;
    outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
    outline-offset: 0 !important;
  }
  &:not(:disabled):active {
    background: none;
    color: inherit;
  }
`;

function renderIcon(variant = 'info', isToast?: boolean, theme?: any) {
  const Icon = VARIANT_ICON[variant];

  return (
    <IconWrapper isToast={isToast} theme={theme}>
      <Icon size={theme.iconSizes.medium} />
    </IconWrapper>
  );
}

export const AlertBase = React.forwardRef<HTMLDivElement, AlertBaseProps>(
  (props, ref) => {
    const {
      additionalContent,
      children,
      closeAriaLabel,
      forceDismiss,
      hasTimerRing,
      id: defaultId,
      isDismissed,
      isDismissible,
      isExiting: externalIsExiting,
      isPaused,
      isToast,
      onDismiss,
      testId,
      toastDuration,
      variant,
      ...other
    } = props;

    const id = useGenerateId(defaultId);
    const [isExiting, setIsExiting] = React.useState(false);

    const isInverse = useIsInverse(props.isInverse);

    React.useEffect(() => {
      if (isExiting) {
        setTimeout(() => {
          setIsExiting(false);
          onDismiss && typeof onDismiss === 'function' && onDismiss();
        }, transitionDuration - 300);
      }
    }, [isExiting]);

    React.useEffect(() => {
      if (isDismissed) {
        handleDismiss();
      }
    }, [isDismissed]);

    function handleDismiss() {
      setIsExiting(true);
    }

    const theme = React.useContext(ThemeContext);
    const i18n = React.useContext(I18nContext);

    function progressRingColor() {
      if (isInverse) {
        return theme.colors.neutral100;
      }
      switch (props.variant) {
        case 'success':
          return theme.colors.success500;
        case 'warning':
          return theme.colors.warning500;
        case 'danger':
          return theme.colors.danger500;
        default:
          return theme.colors.info500;
      }
    }

    return (
      <StyledAlert
        {...other}
        data-testid={testId}
        id={id}
        tabIndex={-1}
        isInverse={isInverse}
        isExiting={isExiting}
        isToast={isToast}
        ref={ref}
        theme={theme}
        variant={variant}
      >
        <InverseContext.Provider value={{ isInverse }}>
          <StyledAlertInner
            isInverse={isInverse}
            isToast={isToast}
            theme={theme}
            variant={variant}
          >
            {renderIcon(variant, isToast, theme)}
            <AlertContents
              additionalContent={additionalContent}
              isDismissible={isDismissible}
              theme={theme}
            >
              <span>{children}</span>
              {additionalContent && (
                <AdditionalContentWrapper theme={theme}>
                  {additionalContent}
                </AdditionalContentWrapper>
              )}
            </AlertContents>
            {isDismissible && (
              <DismissibleIconWrapper
                isInverse={isInverse}
                variant={variant}
                theme={theme}
              >
                {hasTimerRing && isToast && (
                  <ProgressRingWrapper theme={theme}>
                    <ProgressRing
                      color={progressRingColor()}
                      isActive={!isPaused}
                    />
                  </ProgressRingWrapper>
                )}
                <DismissButton
                  alertVariant={variant}
                  aria-label={
                    closeAriaLabel
                      ? closeAriaLabel
                      : i18n.alert.dismissAriaLabel
                  }
                  icon={
                    <CloseIcon
                      size={
                        hasTimerRing
                          ? theme.iconSizes.xSmall
                          : theme.iconSizes.small
                      }
                    />
                  }
                  isInverse={isInverse}
                  isToast={isToast}
                  onClick={forceDismiss || handleDismiss}
                  theme={theme}
                  variant={ButtonVariant.link}
                />
              </DismissibleIconWrapper>
            )}
          </StyledAlertInner>
        </InverseContext.Provider>
      </StyledAlert>
    );
  }
);
