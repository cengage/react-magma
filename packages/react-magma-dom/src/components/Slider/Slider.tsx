import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { useIsInverse } from '../../inverse';
import styled from '@emotion/styled';
import { ProgressBar } from '../ProgressBar';
import { motion, useDragControls, useMotionValue } from 'framer-motion';

export enum SliderType {
  range = 'range',
  slider = 'slider',
}

export interface SliderProps {
  disabled?: boolean;

  isInverse?: boolean;

  width?: number;

  min?: number;

  max: number;

  onChange: (values: number | number[]) => {};

  steps?: number;

  testId?: string;

  type?: SliderType;
}

const Knob = styled.div`
  border-radius: 50%;
  border: none;
  width: 16px;
  height: 16px;
  box-shadow: inset 0 0 0 1px ${props => props.theme.colors.neutral04},
    0 0 4px ${props => props.theme.colors.shade02};
  background: ${props => props.theme.colors.neutral08};
  cursor: pointer;
  position: absolute;
  bottom: -4px;
`;

const AnimatedKnob = Knob.withComponent(motion.div);

const Track = styled(ProgressBar)`
  position: relative;
  width: 500px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  position: relative;
`;

const SliderToolTip = styled.div`
  background: ${props =>
    props.isInverse
      ? props.theme.tooltip.inverse.backgroundColor
      : props.theme.tooltip.backgroundColor};
  border-radius: ${props => props.theme.borderRadius};
  bottom: 30px;
  color: ${props =>
    props.isInverse
      ? props.theme.tooltip.inverse.textColor
      : props.theme.tooltip.textColor};
  font-size: ${props => props.theme.tooltip.typeScale.fontSize};
  font-weight: ${props => props.theme.tooltip.fontWeight};
  left: calc(-50% / 2);
  line-height: ${props => props.theme.tooltip.typeScale.lineHeight};
  max-width: ${props => props.theme.tooltip.maxWidth};
  min-height: 2.5em;
  padding: ${props => props.theme.spaceScale.spacing03}
    ${props => props.theme.spaceScale.spacing04};
  z-index: ${props => props.theme.tooltip.zIndex};
  &&,
  &&:before {
    display: block;
    height: ${props => props.theme.tooltip.arrowSizeDoubled};
    position: absolute;
    width: auto;
    /* z-index: -1; */
  }
  &&::before {
    content: '';
    transform: rotate(45deg);
    bottom: -4px;
    left: calc(50% - 4px);
    width: 8px;
    background: ${props =>
      props.isInverse
        ? props.theme.tooltip.inverse.backgroundColor
        : props.theme.tooltip.backgroundColor};
  }
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
    const parts = num.toExponential().split("e-");
    const matissaDecimalPart = parts[0].split(".")[1];
    return (
      (matissaDecimalPart ? matissaDecimalPart.length : 0) +
      parseInt(parts[1], 10)
    );
  }

  const decimalPart = num.toString().split(".")[1];
  return decimalPart ? decimalPart.length : 0;
}

const roundValueToStep = (value: number, step: number, min: number) => {
  let nearest = Math.round((value - min) / step) * step + min;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}

const valueToPercent = (value: number, min: number, max: number) => {
  return ((value - min) * 100) / (max - min);
}

const clamp = (val: number, min: number, max: number) => {
  return val > max ? max : val < min ? min : val;
}

const Handle = (props: any) => {
  let handleKeyDown = (event: React.KeyboardEvent) => {
    if (props.disabled) {
      return;
    }

    let newValue: number;
    let tenSteps = (props.max - props.min) / 10;
    let keyStep = props.step || (props.max - props.min) / 100;

    switch (event.key) {
      // Decrease the value of the slider by one step.
      case "ArrowLeft":
      case "ArrowDown":
        newValue = props.value - keyStep;
        break;
      // Increase the value of the slider by one step
      case "ArrowRight":
      case "ArrowUp":
        newValue = props.value + keyStep;
        break;
      // Decrement the slider by an amount larger than the step change made by
      // `ArrowDown`.
      case "PageDown":
        newValue = props.value - tenSteps;
        break;
      // Increment the slider by an amount larger than the step change made by
      // `ArrowUp`.
      case "PageUp":
        newValue = props.value + tenSteps;
        break;
      // Set the slider to the first allowed value in its range.
      case "Home":
        newValue = props.min;
        break;
      // Set the slider to the last allowed value in its range.
      case "End":
        newValue = props.max;
        break;
      default:
        return;
    }

    event.preventDefault();
    newValue = clamp(
      props.step ? roundValueToStep(newValue, props.step, props.min) : newValue,
      props.min,
      props.max
    );
    props.onChange(newValue);
  };

  const position = useMotionValue(props.value);

  React.useEffect(() => {
    position.set(props.value)
  }, [props.value])

  return (<AnimatedKnob
    style={{x: position}}
    drag="x"
    dragElastic={0}
    dragControls={props.dragControls}
    dragConstraints={props.dragConstraints}
    dragMomentum={false}
    onDragEnd={() => {}}
    onKeyDown={handleKeyDown}
    // dragControls={minDragControls}
    onDrag={(event, info) => {
      props.onChange(clamp(
        props.step ? roundValueToStep(info.point.x, props.step, props.min) : info.point.x,
        props.min,
        props.max
      ));
    }}
    tabIndex={props.disabled ? -1 : 0}
    theme={props.theme}
    whileDrag={{ scale: 1.2 }}
  >
    <SliderToolTip theme={props.theme}>{props.value}</SliderToolTip>
  </AnimatedKnob>)
}

export const Slider = (props: SliderProps) => {
  const {
    disabled,
    min: rangeMin = 0,
    max: rangeMax = 100,
    width = 500,
    steps = 1,
    type = SliderType.slider,
  } = props;

  const trackRef = React.useRef<any>();
  const [min, setMin] = React.useState(rangeMin);
  const [max, setMax] = React.useState(rangeMax);

  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(props.isInverse);

  const maxDragControls = useDragControls()

  const valueToPercent = (value: number, min: number, max: number) => {
    return ((value - min) * 100) / (max - min);
  }

  const startDrag = (event) => {
    maxDragControls.start(event, { snapToCursor: true })
  }

  return (
    <Container
      data-testid={props.testId}
      theme={theme}
      onPointerDown={startDrag}
    >
      <Track
        theme={theme}
        ref={trackRef}
        percentage={valueToPercent(max, rangeMin, rangeMax)}
      />
      {type === SliderType.range && <Handle
        dragConstraints={trackRef}
        onChange={setMin}
        step={10}
        theme={theme}
        value={min}
        {...props}
        />}
      <Handle
        dragConstraints={trackRef}
        dragControls={maxDragControls}
        onChange={setMax}
        step={10}
        theme={theme}
        value={max}
        {...props}
      />
    </Container>
  );
};
