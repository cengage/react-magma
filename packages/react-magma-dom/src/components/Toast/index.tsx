import * as React from 'react';
import styled from '../../theme/styled';
import { Alert, AlertProps } from '../Alert';
import { useGenerateId } from '../../utils';

export interface ToastProps extends AlertProps {
  alertStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  disableAutoDismiss?: boolean;
  toastDuration?: number;
  onDismiss: () => void;
  onMouseEnter?: (event: React.SyntheticEvent) => void;
  onMouseLeave?: (event: React.SyntheticEvent) => void;
}

const ToastWrapper = styled.div`
  align-items: center;
  bottom: 20px;
  display: flex;
  left: 20px;
  justify-content: flex-start;
  position: fixed;
  right: auto;
  z-index: 999;

  @media (max-width: 600px) {
    left: 10px;
    right: 10px;
  }
`;

const DEFAULT_TOAST_DURATION = 5000;

export const Toast: React.FunctionComponent<ToastProps> = (
  props: ToastProps
) => {
  const timerAutoHide = React.useRef<any>();
  const [isDismissed, setIsDismissed] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!props.disableAutoDismiss) {
      setAutoHideTimer(props.toastDuration);
    }

    return () => {
      clearTimeout(timerAutoHide.current);
    };
  }, []);

  function clearTimeoutAndDismiss() {
    clearTimeout(timerAutoHide.current);
    setIsDismissed(true);
  }

  function setAutoHideTimer(duration = DEFAULT_TOAST_DURATION) {
    clearTimeout(timerAutoHide.current);
    timerAutoHide.current = setTimeout(() => {
      setIsDismissed(true);
    }, duration);
  }

  function handlePause() {
    clearTimeout(timerAutoHide.current);
  }

  function handleResume() {
    setAutoHideTimer((props.toastDuration || DEFAULT_TOAST_DURATION) * 0.5);
  }

  function handleMouseEnter(event: React.SyntheticEvent) {
    props.onMouseEnter &&
      typeof props.onMouseEnter === 'function' &&
      props.onMouseEnter(event);

    if (!props.disableAutoDismiss) {
      handlePause();
    }
  }

  function handleMouseLeave(event: React.SyntheticEvent) {
    props.onMouseLeave &&
      typeof props.onMouseLeave === 'function' &&
      props.onMouseLeave(event);

    if (!props.disableAutoDismiss) {
      handleResume();
    }
  }

  const {
    alertStyle,
    id: defaultId,
    testId,
    variant,
    isDismissible,
    children,
    containerStyle,
    ...other
  } = props;

  const id = useGenerateId(defaultId);

  return (
    <ToastWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={containerStyle}
    >
      <Alert
        {...other}
        id={id}
        isToast
        testId={testId}
        style={{ margin: 0, ...alertStyle }}
        isDismissible={isDismissible}
        isDismissed={isDismissed}
        variant={variant}
        forceDismiss={clearTimeoutAndDismiss}
        onDismiss={props.onDismiss}
      >
        {children}
      </Alert>
    </ToastWrapper>
  );
};
