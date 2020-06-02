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

const ToastWrapper = styled.div<{
  bottomOffset?: number;
}>`
  bottom: ${props => props.bottomOffset + 20}px;
  display: flex;
  left: 20px;
  justify-content: flex-start;
  max-width: 600px;
  min-width: 320px;
  position: fixed;
  transition: bottom 0.3s;
  z-index: 999;

  @media (max-width: 600px) {
    bottom: ${props => props.bottomOffset + 10}px;
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

    if (setToastsArray) {
      const newToastsArray = toastsArray.filter(toastId => toastId !== id);
      setToastsArray(newToastsArray);
    }
  }

  function clearTimeoutAndDismiss() {
    clearTimeout(timerAutoHide.current);
    dismissToast();

    if (lastFocus.current) {
      lastFocus.current.focus();
    }
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

  const lastFocus = React.useRef<any>();

  const toastsContext = React.useContext(ToastsContext);

  const { toastsArray, setToastsArray } = toastsContext;

  React.useEffect(() => {
    lastFocus.current = document.activeElement;

    if (setToastsArray) {
      setToastsArray(toastsArray.concat([id]));
    }
  }, []);

  const bottomOffset =
    typeof toastsArray[0] === 'undefined' ? 0 : toastsArray.indexOf(id) * 70;

  return (
    <ToastWrapper
      bottomOffset={bottomOffset}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={containerStyle}
      data-testid={testId}
    >
      <Alert
        {...other}
        forceDismiss={clearTimeoutAndDismiss}
        id={id}
        isDismissible={isDismissible}
        isDismissed={isDismissed}
        isToast
        onDismiss={props.onDismiss}
        style={{ ...alertStyle }}
        toastCount={toastsArray.length}
        variant={variant}
      >
        {children}
      </Alert>
    </ToastWrapper>
  );
};
