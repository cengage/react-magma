import * as React from 'react';

export interface ProgressRingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  progress?: number;
  radius?: number;
  stroke?: number;
  testId?: string;
}

export const ProgressRing: React.FunctionComponent<ProgressRingProps> = React.forwardRef(
  (
    { progress, radius, stroke, testId, ...other }: ProgressRingProps,
    ref: any
  ) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div {...other} ref={ref} data-testid={testId}>
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="#3f3f3f"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            stroke-width={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
      </div>
    );
  }
);
