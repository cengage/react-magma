import React from 'react';

import { magma, useIsInverse } from 'react-magma-dom';

export const Logo = () => {
  const isInverse = useIsInverse();
  const primaryColor = isInverse
    ? magma.colors.neutral0
    : magma.colors.brand.navy;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="24"
      viewBox="0 0 64 64"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 21.8 30.5 11.4Q32 10.6 33.5 11.4l19 10.4q2 1.2 0 2.4L33.5 34.6Q32 35.4 30.5 34.6L11.5 24.2q-2-1.2 0-2.4Z"
        fill={primaryColor}
      />
      <path
        d="m10 31.5 20.5 11.2q1.5.8 3 0L54 31.5V40q0 1.5-1.5 2.3L33.5 52.7q-1.5.8-3 0L11.5 42.3Q10 41.5 10 40Z"
        fill={magma.colors.brand.cyan}
      />
      <path
        d="m26 23 5.2-2.6q.8-.4 1.6 0L38 23l-5.2 3.5q-.8.5-1.6 0Z"
        fill={magma.colors.brand.amber}
      />
    </svg>
  );
};
