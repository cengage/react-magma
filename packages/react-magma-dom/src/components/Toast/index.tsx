import * as React from 'react';
import styled from '../../theme/styled';
import { Alert, AlertProps, transitionDuration } from '../Alert';
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
  bottomOffsetForContainer?: number;
  bottomOffsetForToast?: number;
}>`
  bottom: ${props => props.bottomOffsetForToast + 20}px;
  display: flex;
  left: 20px;
  justify-content: flex-start;
  max-width: 600px;
  min-width: 320px;
  position: fixed;
  transform: translateY(${props => 0 - props.bottomOffsetForContainer}px);
  transition: bottom 0.3s;
  z-index: 999;

  @media (max-width: 600px) {
    bottom: ${props => props.bottomOffsetForToast + 10}px;
    left: 10px;
    right: 10px;
  }
`;

const DEFAULT_TOAST_DURATION = 5000;
const TOAST_HEIGHT = 65;

export const Toast: React.FunctionComponent<ToastProps> = (
  props: ToastProps
) => {
  const timerAutoHide = React.useRef<any>();
  const [isDismissed, setIsDismissed] = React.useState<boolean>(false);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const [timerTimeRemaining, setTimerTimeRemaining] = React.useState<number>();

  const {
    alertStyle,
    id: defaultId,
    testId,
    variant,
    disableAutoDismiss,
    children,
    containerStyle,
    toastDuration,
    ...other
  } = props;

  const id = useGenerateId(defaultId);

  const lastFocus = React.useRef<any>();

  const { bottomOffset, toastsArray } = React.useContext(ToastsContext);

  const timerStartTime = Date.now();

  function dismissToast() {
    setIsDismissed(true);

    setTimeout(() => {
      if (toastsArray.current) {
        toastsArray.current = toastsArray.current.filter(
          toastId => toastId !== id
        );
      }
    }, 0);
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
    const totalDuration = duration + transitionDuration;

    timerAutoHide.current = setTimeout(() => {
      dismissToast();
    }, totalDuration);
  }

  function handlePause() {
    console.log('handle Pause timerTimeRemaining', timerTimeRemaining);
    const duration = timerTimeRemaining
      ? timerTimeRemaining
      : toastDuration
      ? toastDuration
      : DEFAULT_TOAST_DURATION;
    const timeRemaining = duration - (Date.now() - timerStartTime);

    clearTimeout(timerAutoHide.current);
    setTimerTimeRemaining(timeRemaining);

    setIsPaused(true);
  }

  function handleResume() {
    setAutoHideTimer(timerTimeRemaining);
    setIsPaused(false);
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

  React.useEffect(() => {
    lastFocus.current = document.activeElement;

    if (!props.disableAutoDismiss) {
      setAutoHideTimer(props.toastDuration);
    }

    return () => {
      clearTimeout(timerAutoHide.current);
    };
  }, []);

  let bottomOffsetForToast = 0;

  if (toastsArray) {
    toastsArray.current = toastsArray.current.includes(id)
      ? toastsArray.current
      : toastsArray.current.concat([id]);

    bottomOffsetForToast =
      typeof toastsArray.current[0] === 'undefined'
        ? 0
        : toastsArray.current.indexOf(id) * TOAST_HEIGHT;
  }

  return (
    <ToastWrapper
      bottomOffsetForToast={bottomOffsetForToast}
      bottomOffsetForContainer={bottomOffset}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={containerStyle}
      data-testid={testId}
    >
      <Alert
        {...other}
        forceDismiss={clearTimeoutAndDismiss}
        hasTimerRing={!disableAutoDismiss}
        id={id}
        isDismissible
        isDismissed={isDismissed}
        isPaused={isPaused}
        isToast
        onDismiss={props.onDismiss}
        style={{ ...alertStyle }}
        toastDuration={toastDuration ? toastDuration : DEFAULT_TOAST_DURATION}
        variant={variant}
      >
        {children}
      </Alert>
    </ToastWrapper>
  );
};
