import * as React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/themeContext';
import { Info2Icon } from '../Icon/types/Info2Icon';
import { CheckIcon } from '../Icon/types/CheckIcon';
import { NotificationIcon } from '../Icon/types/NotificationIcon';
import { BlockedIcon } from '../Icon/types/BlockedIcon';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { Button } from '../Button';
import { ButtonVariant } from '../StyledButton';

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

export interface AlertProps {
  children: React.ReactNode;
  dismissable?: boolean;
  variant?: AlertVariant;
  style?: React.CSSProperties;
  onDismiss?: () => void;
}

const StyledAlert = styled.div<AlertProps>`
  align-items: center;
  background-color: ${props => {
    switch (props.variant) {
      case 'info':
        return props.theme.colors.neutral03;
      case 'success':
        return props.theme.colors.success01;
      case 'warning':
        return props.theme.colors.pop04;
      case 'danger':
        return props.theme.colors.danger;
      default:
        return props.theme.colors.neutral03;
    }
  }};
  border-radius: 3px;
  color: ${props =>
    props.variant === 'warning'
      ? props.theme.colors.neutral02
      : props.theme.colors.neutral08};
  display: flex;
  position: relative;
  padding: 10px;
  margin: 10px;
  max-width: 100%;

  a {
    color: inherit;
    font-weight: bold;
    text-decoration: underline;

    &:hover,
    &:focus {
      text-decoration: none;
    }
  }
`;

const AlertContents = styled.div`
  flex-grow: 1;
`;

const IconWrapperStyles = css`
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;

const IconWrapper = styled.span`
  ${IconWrapperStyles}
  padding-right: 10px;
`;

const DismissableIconWrapper = styled.span`
  ${IconWrapperStyles}
  padding-left: 10px;
`;

function renderIcon(variant = 'info') {
  const Icon = VARIANT_ICON[variant];

  return (
    <IconWrapper>
      <Icon size={20} />
    </IconWrapper>
  );
}

export const Alert: React.FunctionComponent<AlertProps> = ({
  variant,
  dismissable,
  style,
  children,
  onDismiss
}: AlertProps) => (
  <ThemeContext.Consumer>
    {theme =>
      theme && (
        <StyledAlert variant={variant} style={style} theme={theme}>
          {renderIcon(variant)}
          <AlertContents>{children}</AlertContents>
          {dismissable && (
            <DismissableIconWrapper>
              <Button
                ariaLabel="Close this message"
                icon={<CrossIcon size={15} />}
                onClick={onDismiss}
                style={{ color: 'inherit' }}
                variant={ButtonVariant.link}
              />
            </DismissableIconWrapper>
          )}
        </StyledAlert>
      )
    }
  </ThemeContext.Consumer>
);
