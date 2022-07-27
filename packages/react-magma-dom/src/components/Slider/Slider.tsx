import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { useIsInverse } from '../../inverse';
import styled from '@emotion/styled';
import { Handle } from './Handle';
import { Track } from './Track';
import { useDimensions } from '../../hooks/useDimensions';

import { ProgressBarDirection, ProgressBarProps } from '../ProgressBar';

export enum SliderType {
  range = 'range',
  slider = 'slider',
}

export interface SliderProps
  extends Omit<ProgressBarProps, 'defaultValue'> {
  allowCross?: boolean;

  count?: number;

  defaultValue?: number | number[];

  disabled?: boolean;

  hasTooltip?: boolean;

  isInverse?: boolean;

  min?: number;

  max: number;

  onValueChange: (values: number[]) => {};

  steps?: number | number[];

  tabIndex?: number;

  type?: SliderType;

  width?: number;

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

export const Slider = (props: SliderProps) => {
  const {
    allowCross = true,
    children,
    count = 1,
    direction = ProgressBarDirection.horizontal,
    disabled,
    // hasTooltip,
    height,
    isInverse: isInverseProp,
    max: rangeMax = 100,
    min: rangeMin = 0,
    marks,
    onValueChange,
    steps = 1,
    tabIndex = 0,
    testId,
    // type = SliderType.slider,
    width,
  } = props;

  const [ratio, setRatio] = React.useState<number>(1);
  const [offset, setOffset] = React.useState<number>(0);
  const [trackRef, trackDimensions] = useDimensions<HTMLDivElement>();

  const valueToPercent = (value: number) => {
    return ((value - rangeMin) * 100) / (rangeMax - rangeMin);
  };

  console.log('trackDimensions', trackDimensions);
  

  React.useEffect(() => {
    if (direction === ProgressBarDirection.horizontal) {
      setRatio(trackDimensions.width / (rangeMax - rangeMin));
      setOffset(trackDimensions.left);
    } else {
      setRatio(trackDimensions.height / (rangeMax - rangeMin));
      setOffset(trackDimensions.top);
    }
  }, [trackDimensions]);

  const initialValue: number[] = Array(...Array(count)).map(() => rangeMin);
  const defaultValue: number[] =
    'defaultValue' in props
      ? Array.isArray(props.defaultValue)
        ? props.defaultValue
        : Array(...Array(count)).map(() => props.defaultValue as number)
      : initialValue;

  const [values, setValues] = React.useState<number[]>(defaultValue);

  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(isInverseProp);

  React.useEffect(() => {
    onValueChange && typeof onValueChange === 'function' && onValueChange(values);
  }, [values]);

  // const maxDragControls = useDragControls();

  // const startDrag = event => {
  //   maxDragControls.start(event, { snapToCursor: true });
  // };

  const minPercent = count > 1 ? valueToPercent(Math.min(...values)) : 0;
  const maxPercent = valueToPercent(Math.max(...values));

  return (
    <Container>
      <Track
        data-testid={testId}
        direction={direction}
        disabled={disabled}
        height={height}
        isInverse={isInverse}
        marks={marks}
        offset={minPercent}
        // onPointerDown={startDrag}
        percentage={maxPercent - minPercent}
        ref={trackRef}
        theme={theme}
        transitionDuration={0}
        width={width}
      />

      {children}

      {defaultValue.map((value, index) => {
        return (
          <Handle
            testId={testId && `${testId}-handle${index}`}
            defaultValue={value}
            disabled={disabled}
            direction={direction}
            // dragControls={maxDragControls}
            // hasTooltip={hasTooltip}
            isInverse={isInverse}
            key={index}
            min={allowCross || index === 0 ? rangeMin : values[index - 1]}
            max={
              allowCross || index + 1 === defaultValue.length
                ? rangeMax
                : values[index + 1]
            }
            offset={offset}
            onValueChange={(point: number) => {
              setValues(currentValues =>
                currentValues.map((v, i) => (i === index ? point : v))
              );
            }}
            ratio={ratio}
            steps={steps}
            tabIndex={tabIndex}
            theme={theme}
          />
        );
      })}
    </Container>
  );
};
