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
import { Button, ButtonVariant } from '../Button';

const VARIANT_ICON = {
  info: Info2Icon,
  success: CheckIcon,
  warning: NotificationIcon,
  danger: BlockedIcon
};

export enum AlertVariant {
  info = 'info', //default
  success = 'success',
  warning = 'warning',
  danger = 'danger'
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  closeLabel?: string;
  dismissible?: boolean;
  forceDismiss?: () => void;
  isExiting?: boolean;
  isDismissed?: boolean;
  inverse?: boolean;
  onDismiss?: () => void;
  ref?: any;
  testId?: string;
  variant?: AlertVariant;
}

export const transitionDuration = 500;

function buildAlertBackground(props) {
  switch (props.variant) {
    case 'info':
      return props.theme.colors.neutral02;
    case 'success':
      return props.theme.colors.success01;
    case 'warning':
      return props.theme.colors.pop04;
    case 'danger':
      return props.theme.colors.danger;
    default:
      return props.theme.colors.neutral02;
  }
}

const StyledAlert = styled.div<AlertProps>`
  align-items: stretch;
  background-color: ${props => buildAlertBackground(props)};
  border-radius: 3px;
  color: ${props =>
    props.variant === 'warning'
      ? props.theme.colors.neutral01
      : props.theme.colors.neutral08};
  display: flex;
  position: relative;
  padding: 0;
  margin-bottom: 20px;
  max-width: 100%;
  animation: ${props =>
    props.isExiting
      ? `fadeout ${transitionDuration}ms`
      : `fadein ${transitionDuration}ms`};

  &:focus {
    outline: 2px dotted ${props =>
      props.inverse ? props.theme.colors.neutral08 : props.theme.colors.pop02};
    }
  }

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

  a {
    color: inherit;
    font-weight: 600;
    text-decoration: underline;

    &:focus {
      outline: 2px dotted ${props =>
        props.variant === 'warning'
          ? props.theme.colors.neutral01
          : props.theme.colors.neutral08};
      }
    }
  }
`;

const AlertContents = styled.div`
  flex-grow: 1;
  padding: 10px 15px 10px 0;
`;

const IconWrapperStyles = css`
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;

const IconWrapper = styled.span`
  ${IconWrapperStyles}
  padding: 0 10px 0 15px;
`;

const DismissableIconWrapper = styled.span<AlertProps>`
  ${IconWrapperStyles}

  svg {
    height: 13px;
    width: 13px;
  }
`;

const whitelistProps = ['icon', 'inverse', 'theme', 'variant'];

const shouldForwardProp = prop => {
  return isPropValid(prop) || whitelistProps.includes(prop);
};

const DismissButton = styled(Button, { shouldForwardProp })<{
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
          ? theme.colors.neutral01
          : theme.colors.neutral08};
    outline-offset: 0 !important;
  }

  &:hover,
  &:focus {
    :not(:disabled):before {
      background: ${({ alertVariant, theme }) =>
        alertVariant === 'warning'
          ? theme.colors.neutral01
          : theme.colors.neutral08};
      opacity: 0.15;
    }

    &:after {
      display: none;
    }
  }
`;

function renderIcon(variant = 'info') {
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
      closeLabel,
      testId,
      variant,
      children,
      dismissible,
      forceDismiss,
      isDismissed,
      isExiting: externalIsExiting,
      inverse,
      onDismiss,
      ...other
    }: AlertProps,
    ref: any
  ) => {
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

    return (
      <StyledAlert
        {...other}
        data-testid={testId}
        ref={ref}
        tabIndex={-1}
        inverse={inverse}
        isExiting={isExiting}
        variant={variant}
        theme={theme}
      >
        {renderIcon(variant)}
        <AlertContents>{children}</AlertContents>
        {dismissible && (
          <DismissableIconWrapper variant={variant} theme={theme}>
            <DismissButton
              alertVariant={variant}
              aria-label={closeLabel ? closeLabel : 'Close this message'}
              icon={<CrossIcon />}
              inverse
              onClick={forceDismiss || handleDismiss}
              theme={theme}
              variant={ButtonVariant.link}
            />
          </DismissableIconWrapper>
        )}
      </StyledAlert>
    );
  }
);
