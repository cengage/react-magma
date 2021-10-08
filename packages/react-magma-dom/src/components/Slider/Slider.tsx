import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { useIsInverse } from '../../inverse';
import styled from '@emotion/styled';
import { Handle } from './Handle';
import { Track } from './Track';
import { useDimensions } from '../../hooks/useDimensions';

import {
  ProgressBarProps,
} from '../ProgressBar';

export enum SliderType {
  range = 'range',
  slider = 'slider',
}

export interface SliderProps extends Omit<ProgressBarProps, 'onChange'> {
  count ?: number;

  defaultValue?: number[];

  disabled?: boolean;

  hasTooltip?: boolean;

  min?: number;

  max: number;

  onChange: (values: number | number[]) => {};

  steps?: number;

  tabIndex?: number;

  type?: SliderType;

  value?: number[];
}

const Container = styled.div<ProgressBarProps>`
  position: relative;
  height: 14px;
  padding: 5px 0;
  width: 100%;
  border-radius: @border-radius-base;
  touch-action: none;
`;

const valueToPercent = (value: number, min: number, max: number) => {
  // const ratio = Math.abs(Math.max(value) / trackDimensions.width);
  return ((value - min) * 100) / (max - min);
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
    count=1,
    direction,
    disabled,
    // hasTooltip,
    height,
    max: rangeMax = 100,
    min: rangeMin = 0,
    steps = 1,
    tabIndex = 0,
    // type = SliderType.slider,
    // width,
  } = props;

  const [ratio, setRatio] = React.useState<number>(1);
  const [trackRef, trackDimensions] = useDimensions<HTMLDivElement>();

  React.useEffect(() => {
    // console.log(min, max, max - min, trackDimensions.width)
    setRatio(trackDimensions.width/(max-min))
  }, [trackDimensions])
  const initialValue: number[] = Array(...Array(count + 1)).map(() => rangeMin);
  const defaultValue: number[] = 'defaultValue' in props ? props.defaultValue : initialValue;
  
  const [min, setMin] = React.useState<number>(rangeMin);
  const [max, setMax] = React.useState<number>(rangeMax);
  const [values, setValues] = React.useState<number[]>(defaultValue)

  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(props.isInverse);

  // React.useEffect(() => {
  //   console.log(values)
  // }, [values])


  // const maxDragControls = useDragControls();

  // const startDrag = event => {
  //   maxDragControls.start(event, { snapToCursor: true });
  // };

  const minPercent = valueToPercent(min, rangeMin, rangeMax );
  const maxPercent = valueToPercent(max, rangeMin, rangeMax );

  return ( 
    <Container data-testid={props.testId}>
      <Track
        direction={direction}
        // disabled={disabled}
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

      { 
        [0,0,0,0].map((_, index) => {
          return <Handle
            disabled={disabled}
            // direction={direction}
            // dragControls={maxDragControls}
            // hasTooltip={hasTooltip}
            // isInverse={isInverse}
            key={index}
            min={rangeMin}
            max={rangeMax}
            onChange={(point: number) => {
              console.log(point)
              // setValues(values => [...values.slice(0,index),value,...values.slice(index)])
            }}
            ratio={ratio}
            steps={steps}
            tabIndex={tabIndex}
            theme={theme}
            defaultValue={defaultValue[index]}
          />
        })
      }
    </Container>
  );
};
