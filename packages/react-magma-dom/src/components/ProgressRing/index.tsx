import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

export interface ProgressRingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  duration?: number;
  isActive?: boolean;
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
      duration = 5000,
      isActive,
      size,
      strokeWidth,
      testId,
      ...other
    }: ProgressRingProps,
    ref: any
  ) => {
    const radius = size ? size : 30;
    const strokeW = strokeWidth ? strokeWidth : 3;
    const [percentage, setPercentage] = React.useState(100);

    React.useEffect(() => {
      const intervalDuration = duration / 50;

      let interval = null;

      if (isActive) {
        interval = setInterval(() => {
          setPercentage(percentage - 2);
        }, intervalDuration);

        if (percentage <= 0) {
          clearInterval(interval);
        }
      } else {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }, [percentage, isActive]);

    const normalizedRadius = radius - strokeW * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const theme = React.useContext(ThemeContext);

    return (
      <div {...other} ref={ref} data-testid={testId}>
        <svg height={radius * 2} width={radius * 2}>
          <Circle
            cx={radius}
            cy={radius}
            fill="transparent"
            r={normalizedRadius}
            stroke={color ? color : theme.colors.neutral01}
            strokeWidth={strokeW}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
          />
        </svg>
      </div>
    );
  }
);
