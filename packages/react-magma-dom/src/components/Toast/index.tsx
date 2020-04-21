import * as React from 'react';
import styled from '../../theme/styled';
import { Alert, AlertProps } from '../Alert';
import { useGenerateId } from '../../utils';
import { ToastsContext } from './ToastsContainer';

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
  right: 20px;
  z-index: 999;

  @media (max-width: 600px) {
    bottom: 10px;
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

  function dismissToast() {
    setIsDismissed(true);

    if (setToastCount) {
      setToastCount(toastCount - 1);
    }
  }

  function clearTimeoutAndDismiss() {
    clearTimeout(timerAutoHide.current);
    dismissToast();
  }

  function setAutoHideTimer(duration = DEFAULT_TOAST_DURATION) {
    clearTimeout(timerAutoHide.current);
    timerAutoHide.current = setTimeout(() => {
      dismissToast();
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

  const toastsContext = React.useContext(ToastsContext);

  const { toastCount, setToastCount } = toastsContext;
  const headerText = toastCount > 1 ? `1 of ${toastCount} messages` : null;

  React.useEffect(() => {
    if (setToastCount) {
      setToastCount(toastCount + 1);
    }
  }, []);

  return (
    <ToastWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={containerStyle}
    >
      <Alert
        {...other}
        forceDismiss={clearTimeoutAndDismiss}
        headerText={headerText}
        id={id}
        isDismissible={isDismissible}
        isDismissed={isDismissed}
        isToast
        onDismiss={props.onDismiss}
        style={{ ...alertStyle }}
        testId={testId}
        toastCount={toastCount}
        variant={variant}
      >
        {children}
      </Alert>
    </ToastWrapper>
  );
};
