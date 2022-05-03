import * as React from 'react';
import { css } from '@emotion/core';
import styled from '../../theme/styled';
import isPropValid from '@emotion/is-prop-valid';
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

const StyledAlert = styled.div<AlertBaseProps>`
  align-items: stretch;
  animation: ${props =>
    props.isExiting
      ? `fadeout ${transitionDuration}ms`
      : `fadein ${transitionDuration}ms`};
  display: flex;
  flex-direction: column;
  font-size: ${props => props.theme.typeScale.size03.fontSize};
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
    color: inherit;
    font-weight: 600;
    text-decoration: underline;

    &:focus {
      outline: 2px solid
        ${props =>
          props.variant === 'warning'
            ? props.theme.colors.focus
            : props.theme.colors.focusInverse};
    }
  }
`;

const StyledAlertInner = styled.div<AlertBaseProps>`
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
        ? `0 2px 8px 0 rgba(0, 0, 0, 0.7)`
        : `0 2px 8px 0 rgba(0, 0, 0, 0.4)`};
      height: ${props.theme.spaceScale.spacing11};
    `}
`;

const AlertContents = styled.div`
  align-self: center;
  flex-grow: 1;
  padding: ${props => props.theme.spaceScale.spacing04} 0;

  @media (max-width: ${props => props.theme.breakpoints.small}px) {
    padding-left: 0;
  }
`;

const IconWrapperStyles = css`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  margin-right: 1px;
`;

const IconWrapper = styled.span<{ isToast?: boolean; theme: any }>`
  ${IconWrapperStyles}
  padding: 0 ${props => props.theme.spaceScale.spacing03} 0 ${props =>
    props.theme.spaceScale.spacing04};

  @media (max-width: ${props => props.theme.breakpoints.small}px) {
    padding: 0 8px;
    svg {
      width: 20px;
    }
  }
`;

const ProgressRingWrapper = styled.div`
  margin-top: ${props => props.theme.spaceScale.spacing01};
  position: absolute;
  top: ${props => props.theme.spaceScale.spacing02};
  right: ${props => props.theme.spaceScale.spacing02};
`;

const DismissibleIconWrapper = styled.span<AlertBaseProps>`
  ${IconWrapperStyles}
`;

const whitelistProps = ['icon', 'isInverse', 'theme', 'variant'];

const shouldForwardProp = prop => {
  return isPropValid(prop) || whitelistProps.includes(prop);
};

const DismissButton = styled(IconButton, { shouldForwardProp })<{
  alertVariant?: AlertVariant;
  isToast?: boolean;
}>`
  align-self: stretch;
  border-radius: 0 ${props => props.theme.borderRadius}
    ${props => props.theme.borderRadius} 0;
  color: inherit;
  height: auto;
  padding: ${props =>
    props.isToast
      ? `0 ${props.theme.spaceScale.spacing04}`
      : `0 ${props.theme.spaceScale.spacing03}`};
  width: auto;

  &&:focus:not(:disabled) {
    outline: 2px solid
      ${({ alertVariant, theme }) =>
        alertVariant === 'warning'
          ? theme.colors.focus
          : theme.colors.focusInverse};
    outline-offset: 0 !important;
  }

  &:hover,
  &:focus {
    :not(:disabled):before {
      background: ${({ alertVariant, theme }) =>
        alertVariant === 'warning'
          ? theme.colors.focus
          : theme.colors.focusInverse};
      opacity: 0.15;
    }

    &:after {
      display: none;
    }
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

    const ProgressRingColor =
      variant === AlertVariant.success
        ? theme.colors.success500
        : variant === AlertVariant.warning
        ? theme.colors.warning500
        : variant === AlertVariant.danger
        ? theme.colors.danger500
        : isInverse
        ? theme.colors.neutral100
        : theme.colors.info500;

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
      >
        <InverseContext.Provider
          value={{
            isInverse: variant !== AlertVariant.warning,
          }}
        >
          <StyledAlertInner
            isInverse={isInverse}
            isToast={isToast}
            theme={theme}
            variant={variant}
          >
            {renderIcon(variant, isToast, theme)}
            <AlertContents theme={theme}>{children}</AlertContents>
            {isDismissible && (
              <DismissibleIconWrapper variant={variant} theme={theme}>
                {hasTimerRing && isToast && (
                  <ProgressRingWrapper theme={theme}>
                    <ProgressRing
                      color={ProgressRingColor}
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
                  isInverse
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
