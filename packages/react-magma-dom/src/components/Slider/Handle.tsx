import styled from '@emotion/styled';
import { ProgressBarProps, ProgressBarDirection } from '../ProgressBar';
import { motion } from 'framer-motion';
import { Tooltip } from './Tooltip';
import * as React from 'react';

const StyledHandle = styled.div<ProgressBarProps>`
  // border-radius: 50%;
  // border: none;
  width: 16px;
  height: 16px;
  box-shadow: inset 0 0 0 1px ${props => props.theme.colors.neutral04},
    0 0 4px ${props => props.theme.colors.shade02};
  background: ${props => props.theme.colors.neutral08};
  // cursor: pointer;
  position: absolute;
  // bottom: ${props => props.direction === ProgressBarDirection.vertical ? 'inherit' : '4px'};
  // left: ${props => props.direction === ProgressBarDirection.vertical ? '-4px' : '-8px'};
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // z-index: 9999;
`;

const AnimatedHandle = StyledHandle.withComponent(motion.div);

export const Handle = (props: any) => {
  const {
    disabled,
    tabIndex=0,
  } = props;

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

  // const position = useMotionValue(props.value);

  // React.useEffect(() => {
  //   position.set(props.value);
  // }, [props.value]);

  return (
    <AnimatedHandle
      // style={
      //   props.direction === ProgressBarDirection.vertical
      //     ? { y: position }
      //     : { x: position }
      // }
      drag={props.direction === ProgressBarDirection.vertical ? 'y' : 'x'}
      dragElastic={0}
      dragConstraints={props.dragConstraints}
      dragMomentum={false}
      onDragEnd={() => {}}
      onKeyDown={handleKeyDown}
      // dragControls={minDragControls}
      onDrag={(event, info) => {
        console.log(info.point)
        const point =
          props.direction === ProgressBarDirection.vertical
            ? info.point.y
            : info.point.x;

          props.onChange(point);
      }}
      tabIndex={disabled ? -1 : tabIndex}
      theme={props.theme}
      whileDrag={{ scale: 1 }}
    >
      {props.hasToolTip && (
        <Tooltip theme={props.theme}>{props.value}</Tooltip>
      )}
    </AnimatedHandle>
  );
};