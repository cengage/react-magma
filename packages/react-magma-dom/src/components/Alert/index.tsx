import * as React from 'react';
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
  showIcon?: boolean;
  variant?: AlertVariant;
  style?: React.CSSProperties;
  onDismiss?: () => void;
}

const StyledAlert = styled.div<AlertProps>`
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
  position: relative;
  padding: 10px;
  margin: 10px;
  max-width: 100%;
  a {
    font-weight: bold;
    text-decoration: underline;
  }
`;

const DismissableIconWrapper = styled.span`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 3px;
  right: 10px;
  position: absolute;
  top: -5px;
`;

function renderIcon(variant = 'info') {
  const Icon = VARIANT_ICON[variant];

  return <Icon />;
}

export const Alert: React.FunctionComponent<AlertProps> = ({
  variant,
  dismissable,
  showIcon,
  style,
  children,
  onDismiss
}: AlertProps) => (
  <ThemeContext.Consumer>
    {theme =>
      theme && (
        <StyledAlert variant={variant} style={style} theme={theme}>
          {showIcon && renderIcon(variant)}
          {children}
          {dismissable && (
            <DismissableIconWrapper>
              <Button
                variant={ButtonVariant.link}
                ariaLabel="Dismiss icon"
                icon={<CrossIcon />}
                onClick={onDismiss}
              />
            </DismissableIconWrapper>
          )}
        </StyledAlert>
      )
    }
  </ThemeContext.Consumer>
);
