import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { useIsInverse } from '../../inverse';
import styled from '@emotion/styled';
import { Handle } from './Handle';
import { Track } from './Track';
import { MotionValue } from 'framer-motion';
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
  position: relative;
  height: 14px;
  padding: 5px 0;
  width: 100%;
  border-radius: @border-radius-base;
  touch-action: none;
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

const roundValueToStep = (value: number, step: number, min: number) => {
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


interface GetChangeValue {
  value: number;
  containerWidth: number;
  min: number;
  max: number;
  steps: number;
}

export function getChangeValue({ value, containerWidth, min, max, steps }: GetChangeValue) {
  const left = Math.min(Math.max(value, 0), containerWidth);
  const dx = (left / containerWidth) * (max - min);
  return (dx !== 0 ? Math.round(dx / steps) * steps : 0) + min;
}

export const Slider = (props: SliderProps) => {
  const {
    children,
    direction,
    // disabled,
    hasTooltip,
    height,
    max: rangeMax = 100,
    min: rangeMin = 0,
    steps = 1,
    // tabIndex = 0,
    // type = SliderType.slider,
    // width,
  } = props;

  const [ratio, setRatio] = React.useState<number>(1);
  const [trackRef, trackDimensions] = useDimensions<HTMLDivElement>();

  React.useEffect(() => {
    console.log(min, max, max - min, trackDimensions.width)
    setRatio(trackDimensions.width/(max-min))
  }, [trackDimensions])
  
  const [min, setMin] = React.useState(rangeMin);
  const [max, setMax] = React.useState(rangeMax);

  // React.useEffect(() => {
  //   console.log(max)
  // }, [max])

  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(props.isInverse);

  // const maxDragControls = useDragControls();

  // const startDrag = event => {
  //   maxDragControls.start(event, { snapToCursor: true });
  // };

  const minPercent = valueToPercent(min, rangeMin, rangeMax );
  const maxPercent = valueToPercent(max, rangeMin, rangeMax );

  // const constraintsMin =
  //   props.direction === ProgressBarDirection.vertical
  //     ? { top: max, bottom: rangeMin }
  //     : { left: rangeMin, right: max };

  // const constraintsMax =
  //   props.direction === ProgressBarDirection.vertical
  //     ? { top: rangeMax, bottom: min }
  //     : { left: min, right: rangeMax };

  return ( 
    <Container data-testid={props.testId}>
      <Track
        direction={direction}
        height={height}
        isInverse={isInverse}
        offset={minPercent}
        // onPointerDown={startDrag}
        percentage={maxPercent - minPercent}
        ref={trackRef}
        theme={theme}
        transitionDuration={0}
      />
      
      {children}

      <Handle
        // direction={direction}
        // dragConstraints={{left: trackDimensions.x, right: trackDimensions.width + trackDimensions.x}}
        // dragControls={maxDragControls}
        // hasTooltip={hasTooltip}
        // isInverse={isInverse}
        onChange={(point: number) => {
          console.log(point)
          // setMax(
          //   getChangeValue({value: point - trackDimensions.x, containerWidth: trackDimensions.width, min: rangeMin, max:rangeMax, steps})
          // )
        }}
        min={rangeMin}
        max={rangeMax}
        ratio={ratio}
        steps={steps}
        theme={theme}
        // value={max}
      />
    </Container>
  );
};
