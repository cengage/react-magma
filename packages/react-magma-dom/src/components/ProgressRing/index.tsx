import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '@emotion/styled';

export interface ProgressRingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  duration?: number;
  isActive?: boolean;
  percentage?: number;
  radius?: number;
  strokeWidth?: number;
  /**
   * @internal
   */
  testId?: string;
}

const Circle = styled.circle`
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`;

export const ProgressRing = React.forwardRef<HTMLDivElement, ProgressRingProps>(
  (props, ref) => {
    const {
      color,
      duration = 5000,
      isActive,
      radius = 21,
      strokeWidth = 3,
      testId,
      ...other
    } = props;

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

    const normalizedRadius = radius - strokeWidth * 2;
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
            stroke={color ? color : theme.colors.neutral}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
          />
        </svg>
      </div>
    );
  }
);
