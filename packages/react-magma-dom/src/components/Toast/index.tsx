import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/themeContext';
import { ToastCore } from 'react-magma-core';
import { Alert, AlertProps, AlertState, transitionDuration } from '../Alert';

export interface ToastProps extends AlertProps {
  children: React.ReactNode;
  onDismiss: () => void;
  toastDuration?: number;
  onMouseEnter?: (event: React.SyntheticEvent) => void;
  onMouseLeave?: (event: React.SyntheticEvent) => void;
}

const ToastWrapper = styled.div<AlertState>`
  z-index: 1;
  position: fixed;
  display: flex;
  left: 25px;
  right: auto;
  bottom: 25px;
  justify-content: flex-start;
  align-items: center;

  animation: ${props =>
    props.isExiting
      ? `fadeout ${transitionDuration}ms`
      : `fadein ${transitionDuration}ms`};

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

export class Toast extends React.Component<ToastProps, AlertState> {
  constructor(props) {
    super(props);

    this.state = {
      isExiting: false
    };

    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleDismiss() {
    this.setState({ isExiting: true });

    setTimeout(() => {
      this.setState({
        isExiting: false
      });
      this.props.onDismiss();
    }, transitionDuration - 50);
  }

  render() {
    const {
      variant,
      style,
      children,
      dismissable,
      toastDuration,
      onMouseEnter,
      onMouseLeave
    } = this.props;

    return (
      <ThemeContext.Consumer>
        {theme =>
          theme && (
            <ToastCore
              toastDuration={toastDuration}
              onDismiss={this.handleDismiss}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              {({ handleMouseEnter, handleMouseLeave }) => (
                <ToastWrapper
                  isExiting={this.state.isExiting}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Alert
                    style={style}
                    dismissable={dismissable}
                    variant={variant}
                    onDismiss={this.props.onDismiss}
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
  }
}
