import styled from '@emotion/styled';
import { ProgressBarDirection } from '../ProgressBar';
import { useDimensions } from '../../hooks/useDimensions';
import { ThemeInterface } from '../../theme/magma';
import { useDebounce } from '../../hooks/useDebounce';

import { motion, useMotionValue } from 'framer-motion';
import { Tooltip } from '../Tooltip';
import * as React from 'react';
export interface HandleProps {
  defaultValue: number;
  direction?: ProgressBarDirection;
  disabled?: boolean;
  max: number;
  min: number;
  offset: number;
  onChange: (value: number) => void;
  ratio: number;
  steps: number | number[];
  tabIndex?: number;
  theme?: ThemeInterface;
}

const StyledHandle = styled.div<Omit<HandleProps, 'onChange'>>`
  box-shadow: ${props =>
    props.disabled
      ? 'none'
      : `inset 0 0 0 1px ${props.theme.colors.neutral04},
    0 0 4px ${props.theme.colors.shade02}`};
  background: ${props =>
    props.disabled
      ? props.theme.colors.neutral05
      : props.theme.colors.neutral08};
  position: absolute;
  left: ${props =>
    props.direction === ProgressBarDirection.vertical ? '-4px' : 'inherit'};
  width: 16px;
  height: 16px;
  margin-top: -4px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'grab')};
  border-radius: 50%;
  touch-action: pan-x;
  &:focus {
    outline: none;
  }
`;

const StyledValueLabel = styled.div`
  text-indent: -9999px;
`;

const AnimatedHandle = StyledHandle.withComponent(motion.div);

export const Handle = (props: any) => {
  const {
    defaultValue,
    direction,
    disabled,
    max,
    min,
    offset,
    onChange,
    ratio,
    steps = 1,
    tabIndex = 0,
    theme,
  } = props;

  const clamp = (val: number) => {
    return val > max ? max : val < min ? min : val;
  };

  const toPixels = (value: number) => {
    return (value - min) * ratio;
  };

  const toValue = (pixels: number) => {
    return clamp(pixels / ratio + min);
  };

  const round = (value: number) => {
    if (Array.isArray(steps)) {
      return steps.reduce((prev, curr) =>
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
      );
    }
    return Math.round(value / steps) * steps;
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [value, setValue] = React.useState(defaultValue);
  const debouncedValue = useDebounce<number>(value, 0);
  const [handleRef, handleDimensions] = useDimensions<HTMLDivElement>();

  React.useEffect(() => {
    console.log('render', ratio, value, toPixels(value));
    x.set(toPixels(value));
  }, [ratio]);

  React.useEffect(() => {
    x.set(toPixels(value));
  }, [value]);

  React.useEffect(() => {
    y.set(toPixels(value));
  }, [value]);

  React.useEffect(() => {
    console.log('debounce', debouncedValue, toPixels(debouncedValue));
    onChange(debouncedValue);
  }, [debouncedValue]);

  let handleKeyDown = (event: React.KeyboardEvent) => {
    if (props.disabled) {
      return;
    }

    let newValue: number;
    let tenSteps = (max - min) / 10;
    let keyStep = steps || (max - min) / 100;

    switch (event.key) {
      // Decrease the value of the slider by one step.
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Array.isArray(keyStep)
          ? keyStep[keyStep.indexOf(value) - 1] || min
          : value - keyStep;
        break;
      // Increase the value of the slider by one step
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Array.isArray(keyStep)
          ? keyStep[keyStep.indexOf(value) + 1] || max
          : value + keyStep;
        break;
      // Decrement the slider by an amount larger than the step change made by
      // `ArrowDown`.
      case 'PageDown':
        newValue = Array.isArray(keyStep)
          ? keyStep[keyStep.indexOf(value) - 1] || min
          : value - tenSteps;
        break;
      // Increment the slider by an amount larger than the step change made by
      // `ArrowUp`.
      case 'PageUp':
        newValue = Array.isArray(keyStep)
          ? keyStep[keyStep.indexOf(value) + 1] || max
          : value + tenSteps;
        break;
      // Set the slider to the first allowed value in its range.
      case 'Home':
        newValue = min;
        break;
      // Set the slider to the last allowed value in its range.
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    event.preventDefault();
    setValue(newValue);
  };

  return (
    <AnimatedHandle
      direction={direction}
      disabled={disabled}
      drag={
        disabled
          ? false
          : direction === ProgressBarDirection.vertical
          ? 'y'
          : 'x'
      }
      dragConstraints={
        direction === ProgressBarDirection.vertical
          ? {
              top: y.get(),
              bottom: y.get(),
            }
          : {
              left: x.get(),
              right: x.get(),
            }
      }
      dragElastic={0}
      dragMomentum={false}
      onDrag={(event, info) => {
        setValue(
          round(
            toValue(
              direction === ProgressBarDirection.vertical
                ? info.point.y - offset
                : info.point.x - offset
            )
          )
        );
      }}
      onKeyDown={handleKeyDown}
      onDragStart={() => {
        console.log(min, max);
      }}
      ref={handleRef}
      style={
        direction === ProgressBarDirection.vertical
          ? { marginTop: -handleDimensions.width / 2, y }
          : { marginLeft: -handleDimensions.width / 2, x }
      }
      tabIndex={disabled ? -1 : tabIndex}
      theme={theme}
      whileDrag={{ cursor: 'grabbing' }}
    >
      {!disabled && (
        <Tooltip content={value}>
          <StyledValueLabel aria-label={value}>{value}</StyledValueLabel>
        </Tooltip>
      )}
    </AnimatedHandle>
  );
};
