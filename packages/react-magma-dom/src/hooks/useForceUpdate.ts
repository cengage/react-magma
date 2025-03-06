import React from 'react';

export function useForceUpdate() {
  const [, setTick] = React.useState(0);
  const update = React.useCallback(() => {
    setTick(tick => tick + 1);
  }, []);
  return update;
}
