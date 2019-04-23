import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/themeContext';
import { AlertCore, ToastCore } from 'react-magma-core';
import { Alert, AlertProps, transitionDuration } from '../Alert';

export interface ToastProps extends AlertProps {
  children: React.ReactNode;
  onDismiss: () => void;
  toastDuration?: number;
  disableAutoDismiss?: boolean;
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
`;

export const Toast: React.FunctionComponent<ToastProps> = ({
  variant,
  dismissable,
  style,
  children,
  onDismiss,
  toastDuration,
  disableAutoDismiss,
  onMouseEnter,
  onMouseLeave
}: ToastProps) => (
  <ThemeContext.Consumer>
    {theme =>
      theme && (
        <AlertCore
          transitionDuration={transitionDuration}
          onDismiss={onDismiss}
        >
          {({ handleDismiss, isExiting }) => (
            <ToastCore
              toastDuration={toastDuration}
              disableAutoDismiss={disableAutoDismiss}
              onDismiss={handleDismiss}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              {({
                handleMouseEnter,
                handleMouseLeave,
                clearTimeoutAndDismiss
              }) => (
                <ToastWrapper
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Alert
                    style={style}
                    isExiting={isExiting}
                    dismissable={dismissable}
                    variant={variant}
                    onDismiss={clearTimeoutAndDismiss}
                  >
                    {children}
                  </Alert>
                </ToastWrapper>
              )}
            </ToastCore>
          )}
        </AlertCore>
      )
    }
  </ThemeContext.Consumer>
);
