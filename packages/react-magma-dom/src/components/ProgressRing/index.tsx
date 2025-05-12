import * as React from 'react';

import styled from '@emotion/styled';

import { ThemeContext } from '../../theme/ThemeContext';

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
`;

const Svg = styled.svg`
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
    const mountedRef = React.useRef<boolean>(true);

    React.useEffect(() => {
      mountedRef.current = true;
      const intervalDuration = duration / 50;

      let interval: NodeJS.Timeout | null = null;

      if (isActive) {
        interval = setInterval(() => {
          setPercentage(prevPercentage => {
            if (!mountedRef.current) {
              clearInterval(interval!);
              return prevPercentage;
            }
            if (prevPercentage <= 2) {
              clearInterval(interval!);
              return 0;
            }
            return prevPercentage - 2;
          });
        }, intervalDuration);
      }

      return () => {
        mountedRef.current = false;
        if (interval) {
          clearInterval(interval);
        }
      };
    }, [isActive, duration]);

    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const theme = React.useContext(ThemeContext);

    return (
      <div {...other} ref={ref} data-testid={testId}>
        <Svg height={radius * 2} width={radius * 2}>
          <Circle
            cx={radius}
            cy={radius}
            fill="transparent"
            r={normalizedRadius}
            stroke={color ?? theme.colors.neutral}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
          />
        </Svg>
      </div>
    );
  }
);
