import * as React from 'react';
type Delay = number | null;
type TimerHandler = (...args: any[]) => void;

export const useInterval = (callback: TimerHandler, delay: Delay) => {
  const savedCallbackRef = React.useRef<TimerHandler>();

  React.useEffect(() => {
    savedCallbackRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const handler = (...args: any[]) => savedCallbackRef.current!(...args);

    if (delay !== null) {
      const intervalId = setInterval(handler, delay);
      return () => clearInterval(intervalId);
    }
    return;
  }, [delay]);
};
