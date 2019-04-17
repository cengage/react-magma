import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/themeContext';
import { ToastCore } from 'react-magma-core';
import { Alert, AlertProps } from '../Alert';

export interface ToastProps extends AlertProps {
  children: React.ReactNode;
  onDismiss: () => void;
  toastDuration?: number;
  onMouseEnter?: (event: React.SyntheticEvent) => void;
  onMouseLeave?: (event: React.SyntheticEvent) => void;
}

const ToastWrapper = styled.div`
  z-index: 1;
  position: fixed;
  display: flex;
  left: 25px;
  right: auto;
  bottom: 25px;
  justify-content: flex-start;
  align-items: center;
`;

export const Toast: React.FunctionComponent<ToastProps> = ({
  variant,
  dismissable,
  style,
  children,
  onDismiss,
  toastDuration,
  onMouseEnter,
  onMouseLeave
}: ToastProps) => (
  <ThemeContext.Consumer>
    {theme =>
      theme && (
        <ToastCore
          toastDuration={toastDuration}
          onDismiss={onDismiss}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {({ handleMouseEnter, handleMouseLeave }) => (
            <ToastWrapper
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Alert
                style={style}
                dismissable={dismissable}
                variant={variant}
                onDismiss={onDismiss}
              >
                {children}
              </Alert>
            </ToastWrapper>
          )}
        </ToastCore>
      )
    }
  </ThemeContext.Consumer>
);
