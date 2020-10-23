import * as React from 'react';
import { css } from '@emotion/core';
import styled from '../../theme/styled';
import isPropValid from '@emotion/is-prop-valid';
import { ThemeContext } from '../../theme/ThemeContext';
import {
  Info2Icon,
  CheckIcon,
  NotificationIcon,
  BlockedIcon,
  CrossIcon,
  IconProps,
} from 'react-magma-icons';
import { ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { ProgressRing } from '../ProgressRing';
import { useGenerateId } from '../../utils';
import { I18nContext } from '../../i18n';

export const VARIANT_ICON: {
  [name: string]: React.FunctionComponent<IconProps>;
} = {
  info: Info2Icon,
  success: CheckIcon,
  warning: NotificationIcon,
  danger: BlockedIcon,
};

export enum AlertVariant {
  info = 'info', //default
  success = 'success',
  warning = 'warning',
  danger = 'danger',
}

export interface AlertBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  closeAriaLabel?: string;
  forceDismiss?: () => void;
  hasTimerRing?: boolean;
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
  switch (props.variant) {
    case 'success':
      return props.theme.colors.success;
    case 'warning':
      return props.theme.colors.pop04;
    case 'danger':
      return props.theme.colors.danger;
    default:
      return props.theme.colors.neutral;
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
  line-height: 20px;
  margin-bottom: 20px;
  max-width: 100%;
  padding: 0;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.small}px) {
    font-size: 14px;
  }

  &:focus {
    outline: 2px dotted ${props =>
      props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
    }
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
      outline: 2px dotted ${props =>
        props.variant === 'warning'
          ? props.theme.colors.focus
          : props.theme.colors.focusInverse};
      }
    }
  }
`;

const StyledAlertInner = styled.div<AlertBaseProps>`
  background-color: ${props => buildAlertBackground(props)};
  border-radius: 3px;
  border-radius: 5px;
  color: ${props =>
    props.variant === 'warning'
      ? props.theme.colors.neutral
      : props.theme.colors.neutral08};
  display: flex;
  position: relative;
  z-index: 2;

  ${props =>
    props.isToast &&
    css`
      border: 1px solid ${props.theme.colors.neutral08};
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.4);
      height: 56px;
    `}
`;

const AlertContents = styled.div`
  align-self: center;
  flex-grow: 1;
  padding: 13px 15px 13px 0;

  @media (max-width: ${props => props.theme.breakpoints.small}px) {
    padding-left: 15px;
  }
`;

const IconWrapperStyles = css`
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;

const IconWrapper = styled.span<{ isToast?: boolean }>`
  ${IconWrapperStyles}
  padding: 0 10px 0 15px;

  @media (max-width: 600px) {
    display: none;
  }
`;

const ProgressRingWrapper = styled.div`
  opacity: 0.7;
  position: absolute;
  top: 6px;
  right: 2px;
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
}>`
  border-radius: 0 3px 3px 0;
  color: inherit;
  height: calc(100% - 6px);
  margin: 3px;
  padding: 0 15px;
  width: auto;

  &&:focus:not(:disabled) {
    outline: 2px dotted
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

function renderIcon(variant = 'info', isToast?: boolean) {
  const Icon = VARIANT_ICON[variant];

  return (
    <IconWrapper isToast={isToast}>
      <Icon size={20} />
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
      isInverse,
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
        <StyledAlertInner isToast={isToast} theme={theme} variant={variant}>
          {renderIcon(variant, isToast)}
          <AlertContents theme={theme}>{children}</AlertContents>
          {isDismissible && (
            <DismissibleIconWrapper variant={variant} theme={theme}>
              {hasTimerRing && isToast && (
                <ProgressRingWrapper>
                  <ProgressRing
                    color={
                      variant === AlertVariant.warning
                        ? theme.colors.neutral
                        : theme.colors.neutral08
                    }
                    isActive={!isPaused}
                  />
                </ProgressRingWrapper>
              )}
              <DismissButton
                alertVariant={variant}
                aria-label={
                  closeAriaLabel ? closeAriaLabel : i18n.alert.dismissAriaLabel
                }
                icon={<CrossIcon size={hasTimerRing ? 10 : 13} />}
                isInverse
                onClick={forceDismiss || handleDismiss}
                theme={theme}
                variant={ButtonVariant.link}
              />
            </DismissibleIconWrapper>
          )}
        </StyledAlertInner>
      </StyledAlert>
    );
  }
);
