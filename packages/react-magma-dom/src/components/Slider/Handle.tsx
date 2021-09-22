import styled from '@emotion/styled';
import { ProgressBarDirection } from '../ProgressBar';
import { useDimensions } from '../../hooks/useDimensions';

import { motion, useMotionValue,  MotionValue } from 'framer-motion';
// import { Tooltip } from './Tooltip';
import * as React from 'react';

const clamp = (val: number, min: number, max: number) => {
  return val > max ? max : val < min ? min : val;
};

const StyledHandle = styled.div<ProgressBarProps>`
  box-shadow: inset 0 0 0 1px ${props => props.theme.colors.neutral04},
    0 0 4px ${props => props.theme.colors.shade02};
  background: ${props => props.theme.colors.neutral08};
  position: absolute;
  width: 16px;
  height: 16px;
  cursor: pointer;
  cursor: -webkit-grab;
  margin-top: -5px;
  cursor: grab;
  border-radius: 50%;
  touch-action: pan-x;
`;

export interface HandleProps {
  direction?: ProgressBarDirection;
  disabled?: boolean;
  max: number;
  min: number;
  onChange: (value: MotionValue<number>) => void;
  steps: number;
  tabIndex?: number;
  value: number;
}

const AnimatedHandle = StyledHandle.withComponent(motion.div);

export const Handle = (props: any) => {
  const {
    direction,
    disabled,
    max,
    min,
    onChange,
    steps=1,
    tabIndex=1,
    value,
  } = props;

  const [handleRef, handleDimensions] = useDimensions<HTMLDivElement>();
  const x = useMotionValue(value);
  
  let handleKeyDown = (event: React.KeyboardEvent) => {
    if (props.disabled) {
      return;
    }

    let newValue: number;
    let tenSteps = (props.max - props.min) / 10;
    let keyStep = props.steps || (props.max - props.min) / 100;

    switch (event.key) {
      // Decrease the value of the slider by one step.
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = props.value - keyStep;
        break;
      // Increase the value of the slider by one step
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = props.value + keyStep;
        break;
      // Decrement the slider by an amount larger than the step change made by
      // `ArrowDown`.
      case 'PageDown':
        newValue = props.value - tenSteps;
        break;
      // Increment the slider by an amount larger than the step change made by
      // `ArrowUp`.
      case 'PageUp':
        newValue = props.value + tenSteps;
        break;
      // Set the slider to the first allowed value in its range.
      case 'Home':
        newValue = props.min;
        break;
      // Set the slider to the last allowed value in its range.
      case 'End':
        newValue = props.max;
        break;
      default:
        return;
    }

    event.preventDefault();
    props.onChange(newValue);
  };

  return (
    <AnimatedHandle
      drag={direction === ProgressBarDirection.vertical ? 'y' : 'x'}
      dragConstraints={{ left: x.get() - handleDimensions.width/2, right: x.get() - handleDimensions.width/2 }}
      dragElastic={0}
      dragMomentum={false}
      onDrag={(event, info) => {
        const newPoint = clamp(Math.round(info.point.x / steps) * steps, min, max);
        x.set(newPoint);
        onChange(newPoint);
      }}
      // onKeyDown={handleKeyDown}
      ref={handleRef}
      style={{x}}
      tabIndex={disabled ? -1 : tabIndex}
      theme={props.theme}
      whileTap={{ cursor: "grabbing" }}
    />
    // <AnimatedHandle
    //   // onDrag={(event, info) => {
    //     // console.log(info.point.x)
    //     // const point =
    //     //   props.direction === ProgressBarDirection.vertical
    //     //     ? info.point.y - handleDimensions.height / 2
    //     //     : info.point.x - handleDimensions.width / 2;

    //     //   props.value.set(point);
    //   // }}
    //   
    //   style={{x}}
    //   theme={props.theme}
    //   onDrag={(event, info) => {
    //     console.log(info.point)
    //   }}
    //   whileTap={{ cursor: "grabbing" }}
    //   // whileDrag={{ opacity: 1 }}
    //   // transition={{ duration: 0 }}
    // >
    //   {props.hasToolTip && (
    //     <Tooltip theme={props.theme}>{props.value}</Tooltip>
    //   )}
    // </AnimatedHandle>
  );
};