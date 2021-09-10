import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { useIsInverse } from '../../inverse';
import styled from '@emotion/styled';
import { Handle } from './Handle';
import { Track } from './Track';
import { useDragControls } from 'framer-motion';
import { useDimensions } from '../../hooks/useDimensions';

import {
  ProgressBarDirection,
  ProgressBarProps,
} from '../ProgressBar';

export enum SliderType {
  range = 'range',
  slider = 'slider',
}

export interface SliderProps extends Omit<ProgressBarProps, 'onChange'> {

  disabled?: boolean;

  hasTooltip?: boolean;

  min?: number;

  max: number;

  onChange: (values: number | number[]) => {};

  steps?: number;

  tabIndex?: number;

  type?: SliderType;
}

const Container = styled.div<ProgressBarProps>`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  width: 500px;
`;

/**
 * This handles the case when num is very small (0.00000001), js will turn
 * this into 1e-8. When num is bigger than 1 or less than -1 it won't get
 * converted to this notation so it's fine.
 *
 * @param num
 * @see https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Slider/Slider.js#L69
 */
const getDecimalPrecision = (num: number) => {
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split('e-');
    const matissaDecimalPart = parts[0].split('.')[1];
    return (
      (matissaDecimalPart ? matissaDecimalPart.length : 0) +
      parseInt(parts[1], 10)
    );
  }

  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
};

const roundValueToStep = (value: number, step: number, min: number, ratio: number = 1.836) => {
  let nearest = Math.round((value - min) / step) * step + min;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
};

const valueToPercent = (value: number, min: number, max: number) => {
  // const ratio = Math.abs(Math.max(value) / trackDimensions.width);
  return ((value - min) * 100) / (max - min);
};

const clamp = (val: number, min: number, max: number) => {
  return val > max ? max : val < min ? min : val;
};


export const Slider = (props: SliderProps) => {
  const {
    children,
    direction,
    disabled,
    hasToolTip,
    height,
    max: rangeMax = 100,
    min: rangeMin = 0,
    steps = 1,
    tabIndex = 0,
    type = SliderType.slider,
    width,
  } = props;

  const [trackRef, trackDimensions] = useDimensions();

  React.useEffect(() => {
    console.log(trackDimensions)
  }, [trackDimensions])
  
  // const [min, setMin] = React.useState(rangeMin );
  const [max, setMax] = React.useState(rangeMax );

  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(props.isInverse);

  const maxDragControls = useDragControls();

  const startDrag = event => {
    maxDragControls.start(event, { snapToCursor: true });
  };

  const minPercent = valueToPercent(0, rangeMin, rangeMax );
  const maxPercent = valueToPercent(max, rangeMin, rangeMax );

  // const constraintsMin =
  //   props.direction === ProgressBarDirection.vertical
  //     ? { top: max, bottom: rangeMin }
  //     : { left: rangeMin, right: max };

  // const constraintsMax =
  //   props.direction === ProgressBarDirection.vertical
  //     ? { top: rangeMax , bottom: min }
  //     : {   };

  return ( 
    <Container data-testid={props.testId}>
      <Track
        direction={direction}
        height={height}
        isInverse={isInverse}
        offset={minPercent}
        onPointerDown={startDrag}
        percentage={maxPercent - minPercent}
        // ref={trackRef}
        theme={theme}
        transitionDuration={0}
      />
      
      <Handle
        direction={direction}
        dragConstraints={{left: min, right: rangeMax}}
        // dragControls={maxDragControls}
        hasToolTip={hasToolTip}
        isInverse={isInverse}
        onChange={point => setMax(
          // clamp(
            // false ? roundValueToStep(point, props.steps, props.min) : point  ,
            // props.min,
            // props.max
          // ) 
          point
        )}
        // min={min}
        // max={rangeMax}
        // steps={steps}
        theme={theme}
        initial={{x: `${max}px`}}
      />
      {children}
    </Container>
  );
};
