import * as React from 'react';
import { css } from '@emotion/core';
import styled from '../../theme/styled';
import isPropValid from '@emotion/is-prop-valid';
import { ThemeContext } from '../../theme/ThemeContext';
import { Info2Icon } from '../Icon/types/Info2Icon';
import { CheckIcon } from '../Icon/types/CheckIcon';
import { NotificationIcon } from '../Icon/types/NotificationIcon';
import { BlockedIcon } from '../Icon/types/BlockedIcon';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { useGenerateId } from '../../utils';
import { I18nContext } from '../../i18n';

export const VARIANT_ICON = {
  info: Info2Icon,
  success: CheckIcon,
  warning: NotificationIcon,
  danger: BlockedIcon
};

export enum AlertVariant {
  info = 'info', //default
  success = 'success',
  warning = 'warning',
  danger = 'danger',
  silly = 'silly'
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  closeAriaLabel?: string;
  forceDismiss?: () => void;
  isExiting?: boolean;
  isDismissed?: boolean;
  isDismissible?: boolean;
  isInverse?: boolean;
  isToast?: boolean;
  onDismiss?: () => void;
  ref?: any;
  testId?: string;
  variant?: AlertVariant;
}

export const transitionDuration = 500;

export function buildAlertBackground(props) {
  switch (props.variant) {
    case 'success':
      return props.theme.colors.success01;
    case 'warning':
      return props.theme.colors.pop04;
    case 'danger':
      return props.theme.colors.danger;
    default:
      return props.theme.colors.neutral01;
  }
}

const StyledAlert = styled.div<AlertProps>`
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

      @media (max-width: 600px) {
        font-size: 13px;
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

const StyledAlertInner = styled.div<AlertProps>`
  background-color: ${props => buildAlertBackground(props)};
  border-radius: 3px;
  border: 1px solid ${props => props.theme.colors.neutral08};
  border-radius: 5px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.4);
  color: ${props =>
    props.variant === 'warning'
      ? props.theme.colors.neutral01
      : props.theme.colors.neutral08};
  display: flex;
  height: ${props => (props.isToast ? '56px' : 'auto')};
  position: relative;
  z-index: 2;
`;

const AlertContents = styled.div`
  align-self: center;
  flex-grow: 1;
  padding: 13px 15px 13px 0;

  @media (max-width: 600px) {
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

const DismissibleIconWrapper = styled.span<AlertProps>`
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
    <IconWrapper>
      <Icon size={20} />
    </IconWrapper>
  );
}

export const Alert: React.FunctionComponent<AlertProps> = React.forwardRef(
  (
    {
      children,
      closeAriaLabel,
      forceDismiss,
      id: defaultId,
      isDismissed,
      isDismissible,
      isExiting: externalIsExiting,
      isInverse,
      isToast,
      onDismiss,
      testId,
      variant,
      ...other
    }: AlertProps,
    ref: any
  ) => {
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
          <AlertContents>{children}</AlertContents>
          {isDismissible && (
            <DismissibleIconWrapper variant={variant} theme={theme}>
              <DismissButton
                alertVariant={variant}
                aria-label={
                  closeAriaLabel ? closeAriaLabel : i18n.alert.dismissAriaLabel
                }
                icon={<CrossIcon size={13} />}
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
