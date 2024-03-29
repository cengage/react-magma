import * as React from 'react';
import styled from '../../theme/styled';
import { AlertBase, AlertBaseProps, AlertVariant, transitionDuration } from '../AlertBase';
import { getTrapElements } from '../../utils';
import { useGenerateId } from '../../utils';
import { ToastsContext } from './ToastsContainer';

/**
 * @children required
 */
export interface ToastProps extends AlertBaseProps {
  /**
   * CSS properties for the alert component within the toast container
   */
  alertStyle?: React.CSSProperties;
  /**
   * CSS properties for the component container
   */
  containerStyle?: React.CSSProperties;
  /**
   * If true, the component will persist until dismissed by the user
   * @default false
   */
  disableAutoDismiss?: boolean;
  /**
   * The variant of the toast, indicating its function in the UI
   * @default AlertVariant.info
   */
  variant?: AlertVariant;
  /**
   * Number of milliseconds the toast displays before it closes
   * @default 5000
   */
  toastDuration?: number;
  /**
   * Action that fires when the close button is clicked (required when dismissible is true)
   */
  onDismiss: () => void;
  /**
   * Action that fires when the mouse enters the component
   */
  onMouseEnter?: (event: React.SyntheticEvent) => void;
  /**
   * Action that fires when the mouse leaves the component
   */
  onMouseLeave?: (event: React.SyntheticEvent) => void;
}

const ToastWrapper = styled('div')<{
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

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (props, ref) => {
    const timerAutoHide = React.useRef<any>();
    const [isDismissed, setIsDismissed] = React.useState<boolean>(false);
    const [isPaused, setIsPaused] = React.useState<boolean>(false);
    const [timerTimeRemaining, setTimerTimeRemaining] =
      React.useState<number>();

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

    const containerElement = React.useRef<any>();

    function dismissToast() {
      setIsDismissed(true);

      setTimeout(() => {
        if (toastsArray.current) {
          toastsArray.current = toastsArray.current.filter(
            toastId => toastId !== containerElement.current
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

    function calculateAndSetBottomOffsetForToast() {
      updateBottomOffsetForToast(
        typeof toastsArray.current[0] === 'undefined'
          ? 0
          : toastsArray.current.indexOf(containerElement.current) * TOAST_HEIGHT
      );
    }

    const [bottomOffsetForToast, updateBottomOffsetForToast] =
      React.useState(0);

    React.useEffect(() => {
      lastFocus.current = document.activeElement;

      if (!props.disableAutoDismiss) {
        setAutoHideTimer(props.toastDuration);
      }

      return () => {
        clearTimeout(timerAutoHide.current);
      };
    }, []);

    React.useEffect(() => {
      if (!disableAutoDismiss) {
        const focusableElements = getTrapElements(containerElement);
        focusableElements.forEach(element => {
          element.addEventListener('focus', handlePause);
          element.addEventListener('blur', handleResume);
        });
      }
    }, []);

    React.useEffect(() => {
      if (toastsArray) {
        toastsArray.current = toastsArray.current.includes(
          containerElement.current
        )
          ? toastsArray.current
          : toastsArray.current.concat([containerElement.current]);

        calculateAndSetBottomOffsetForToast();
      }
    }, []);

    React.useEffect(() => {
      calculateAndSetBottomOffsetForToast();
    }, [toastsArray.current]);

    return (
      <ToastWrapper
        bottomOffsetForToast={bottomOffsetForToast}
        bottomOffsetForContainer={bottomOffset}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={containerElement}
        style={containerStyle}
        data-testid={testId}
      >
        <AlertBase
          {...other}
          forceDismiss={clearTimeoutAndDismiss}
          hasTimerRing={!disableAutoDismiss}
          id={id}
          isDismissible
          isDismissed={isDismissed}
          isPaused={isPaused}
          isToast
          onDismiss={props.onDismiss}
          ref={ref}
          style={{ ...alertStyle }}
          toastDuration={toastDuration ? toastDuration : DEFAULT_TOAST_DURATION}
          variant={variant}
        >
          {children}
        </AlertBase>
      </ToastWrapper>
    );
  }
);
