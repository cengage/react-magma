import * as React from 'react';
type Delay = number | null;
type TimerHandler = (...args: any[]) => void;

export const useTimeout = (callback: TimerHandler, delay: Delay) => {
  const savedCallbackRef = React.useRef<TimerHandler>();

  React.useEffect(() => {
    savedCallbackRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const handler = (...args: any[]) => savedCallbackRef.current!(...args);

    if (delay !== null) {
      const timeoutId = setTimeout(handler, delay);
      return () => clearTimeout(timeoutId);
    }
    return;
  }, [delay]);
};
