import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { InverseContext, useIsInverse } from '@react-magma/themes';

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

export const VARIANT_ICON: {
  [name: string]: React.FunctionComponent<IconProps>;
} = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
  danger: ErrorIcon,
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
      return 'var(--colors-success)';
    case 'warning':
      return 'var(--colors-pop04)';
    case 'danger':
      return 'var(--colors-danger)';
    default:
      return 'var(--colors-neutral)';
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
  font-size: var(--typeScale-size03-fontSize);
  line-height: var(--typeScale-size03-lineHeight);
  margin-bottom: var(--spaceScale-spacing06);
  max-width: 100%;
  padding: 0;
  position: relative;

  @media (max-width: var(--breakpoints-small)) {
    font-size: var(--typeScale-size02-fontSize);
    line-height: var(--typeScale-size02-lineHeight);
  }

  &:focus {
    outline: 2px dotted ${props =>
      props.isInverse
        ? 'var(--colors-focusInverse)'
        : 'var(--colors-focus)'};
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

      @media (max-width: var(--breakpoints-small) {
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
          ? 'var(--colors-focus)'
          : 'var(--colors-focusInverse)'};
      }
    }
  }
`;

const StyledAlertInner = styled.div<AlertBaseProps>`
  background-color: ${props => buildAlertBackground(props)};
  border-radius: var(--borderRadius);
  color: ${props =>
    props.isInverse
      ? 'var(--colors-neutral08)'
      : 'var(--colors-neutral)'};
  display: flex;
  position: relative;

  ${props =>
    props.isToast &&
    css`
      border: 1px solid var(--colors-neutral08);
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.4);
      height: var(--spaceScale-spacing11);
    `}
`;

const AlertContents = styled.div`
  align-self: center;
  flex-grow: 1;
  padding: var(--spaceScale-spacing04) 0;

  @media (max-width: var(--breakpoints-small)) {
    padding-left: var(--spaceScale-spacing04);
  }
`;

const IconWrapperStyles = css`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  margin-right: 1px;
`;

const IconWrapper = styled.span<{ isToast?: boolean }>`
  ${IconWrapperStyles}
  padding: 0 var(--spaceScale-spacing03) 0 var(--spaceScale-spacing04);

  @media (max-width: var(--breakpoints-small)) {
    display: none;
  }
`;

const ProgressRingWrapper = styled.div`
  opacity: 0.7;
  margin-top: var(--spaceScale-spacing01);
  position: absolute;
  top: var(--spaceScale-spacing02);
  right: var(--spaceScale-spacing02);
`;

const DismissibleIconWrapper = styled.span<AlertBaseProps>`
  ${IconWrapperStyles}
`;

const whitelistProps = ['icon', 'isInverse', 'variant'];

const shouldForwardProp = prop => {
  return isPropValid(prop) || whitelistProps.includes(prop);
};

const DismissButton = styled(IconButton, { shouldForwardProp })<{
  alertVariant?: AlertVariant;
}>`
  align-self: stretch;
  border-radius: 0 var(--borderRadius)} var(--borderRadius) 0;
  color: inherit;
  height: auto;
  padding: 0 var(--spaceScale-spacing04);
  width: auto;

  &&:focus:not(:disabled) {
    outline: 2px dotted
      ${({ alertVariant }) =>
        alertVariant === 'warning'
          ? 'var(--colors-focus)'
          : 'var(--colors-focusInverse)'};
    outline-offset: 0 !important;
  }

  &:hover,
  &:focus {
    :not(:disabled):before {
      background: ${({ alertVariant }) =>
        alertVariant === 'warning'
          ? 'var(--colors-focus)'
          : 'var(--colors-focusInverse)'};
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
      <Icon size={24} />
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
      >
        <InverseContext.Provider
          value={{
            isInverse: variant !== AlertVariant.warning,
          }}
        >
          <StyledAlertInner
            isInverse={variant !== AlertVariant.warning}
            isToast={isToast}
            variant={variant}
          >
            {renderIcon(variant, isToast)}
            <AlertContents>{children}</AlertContents>
            {isDismissible && (
              <DismissibleIconWrapper variant={variant}>
                {hasTimerRing && isToast && (
                  <ProgressRingWrapper>
                    <ProgressRing
                      color={
                        variant === AlertVariant.warning
                          ? 'var(--colors-neutral)'
                          : 'var(--colors-neutral08)'
                      }
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
                          ? 16
                          : 20
                      }
                    />
                  }
                  isInverse
                  onClick={forceDismiss || handleDismiss}
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
