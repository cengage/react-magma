import * as React from 'react';
import styled from '../../theme/styled';
import { Alert, AlertProps, AlertHandles } from '../Alert';

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

const DEFAULT_TOAST_DURATION = 5000;

export const Toast: React.FunctionComponent<ToastProps> = (
  props: ToastProps
) => {
  let timerAutoHide;
  const alertRef = React.useRef<AlertHandles>();

  React.useEffect(() => {
    if (!props.disableAutoDismiss) {
      setAutoHideTimer(props.toastDuration);
    }

    return () => {
      clearTimeout(timerAutoHide);
    };
  }, []);

  function clearTimeoutAndDismiss() {
    clearTimeout(timerAutoHide);
    if (alertRef.current) {
      alertRef.current.callDismiss();
    }
  }

  function setAutoHideTimer(duration = DEFAULT_TOAST_DURATION) {
    clearTimeout(timerAutoHide);
    timerAutoHide = setTimeout(() => {
      if (alertRef.current) {
        alertRef.current.callDismiss();
      }
    }, duration);
  }

  function handlePause() {
    clearTimeout(timerAutoHide);
  }

  function handleResume() {
    setAutoHideTimer((props.toastDuration || DEFAULT_TOAST_DURATION) * 0.5);
  }

  function handleMouseEnter(event: React.SyntheticEvent) {
    props.onMouseEnter &&
      typeof props.onMouseEnter === 'function' &&
      props.onMouseEnter(event);

    handlePause();
  }

  function handleMouseLeave(event: React.SyntheticEvent) {
    props.onMouseLeave &&
      typeof props.onMouseLeave === 'function' &&
      props.onMouseLeave(event);

    handleResume();
  }

  const {
    alertStyle,
    id,
    testId,
    variant,
    dismissable,
    children,
    containerStyle
  } = props;

  return (
    <ToastWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={containerStyle}
    >
      <Alert
        id={id}
        testId={testId}
        style={alertStyle}
        dismissable={dismissable}
        imperativeRef={alertRef}
        variant={variant}
        forceDismiss={clearTimeoutAndDismiss}
        onDismiss={props.onDismiss}
      >
        {children}
      </Alert>
    </ToastWrapper>
  );
};
