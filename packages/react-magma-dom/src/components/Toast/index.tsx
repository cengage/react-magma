import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { AlertCore, ToastCore } from 'react-magma-core';
import { Alert, AlertProps, transitionDuration } from '../Alert';

export interface ToastProps extends AlertProps {
  alertStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  toastDuration?: number;
  disableAutoDismiss?: boolean;
  onDismiss: () => void;
  onMouseEnter?: (event: React.SyntheticEvent) => void;
  onMouseLeave?: (event: React.SyntheticEvent) => void;
}

const ToastWrapper = styled.div`
  z-index: 999;
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

export class Toast extends React.Component<ToastProps> {
  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(handlePause: () => void) {
    return (event: React.SyntheticEvent) => {
      this.props.onMouseEnter &&
        typeof this.props.onMouseEnter === 'function' &&
        this.props.onMouseEnter(event);

      handlePause();
    };
  }

  handleMouseLeave(handleResume: () => void) {
    return (event: React.SyntheticEvent) => {
      this.props.onMouseLeave &&
        typeof this.props.onMouseLeave === 'function' &&
        this.props.onMouseLeave(event);

      handleResume();
    };
  }

  render() {
    const {
      alertStyle,
      id,
      testId,
      variant,
      dismissable,
      children,
      containerStyle,
      onDismiss,
      toastDuration,
      disableAutoDismiss
    } = this.props;

    return (
      <ThemeContext.Consumer>
        {theme => (
          <AlertCore
            transitionDuration={transitionDuration}
            onDismiss={onDismiss}
          >
            {({ handleDismiss, isExiting }) => (
              <ToastCore
                toastDuration={toastDuration}
                disableAutoDismiss={disableAutoDismiss}
                onDismiss={handleDismiss}
              >
                {({ handlePause, handleResume, clearTimeoutAndDismiss }) => (
                  <ToastWrapper
                    onMouseEnter={this.handleMouseEnter(handlePause)}
                    onMouseLeave={this.handleMouseLeave(handleResume)}
                    style={containerStyle}
                  >
                    <Alert
                      id={id}
                      testId={testId}
                      style={alertStyle}
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
        )}
      </ThemeContext.Consumer>
    );
  }
}
