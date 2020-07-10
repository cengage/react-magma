import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export interface ProgressRingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  percentage?: number;
  size?: number;
  strokeWidth?: number;
  testId?: string;
}

const Circle = styled.circle`
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`;

export const ProgressRing: React.FunctionComponent<ProgressRingProps> = React.forwardRef(
  (
    {
      color,
      percentage,
      size,
      strokeWidth,
      testId,
      ...other
    }: ProgressRingProps,
    ref: any
  ) => {
    const radius = size ? size : 30;
    const strokeW = strokeWidth ? strokeWidth : 3;

    const normalizedRadius = radius - strokeW * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const theme = React.useContext(ThemeContext);

    return (
      <div {...other} ref={ref} data-testid={testId}>
        <svg height={radius * 2} width={radius * 2}>
          <Circle
            stroke={color ? color : theme.colors.neutral01}
            fill="transparent"
            strokeWidth={strokeW}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
      </div>
    );
  }
);
