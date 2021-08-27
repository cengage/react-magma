import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { useIsInverse } from '../../inverse';
import styled from '@emotion/styled';
import { ProgressBar } from '../ProgressBar';
import { motion } from 'framer-motion';

export enum SliderType {
  range = 'range',
  slider = 'slider',
}

export interface SliderProps {
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

export const Slider = (props: SliderProps) => {
  const {
    min: rangeMin = 0,
    max: rangeMax = 100,
    width = 500,
    type = SliderType.slider,
    steps = 1,
  } = props;

  const trackRef = React.useRef<any>();
  const [min, setMin] = React.useState(rangeMin);
  const [max, setMax] = React.useState(rangeMax);

  const numbers = rangeMax - rangeMin;

  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(props.isInverse);

  const handleMouseDown = event => {
    // Get the target
    const { target } = event;

    // Get the bounding rectangle of target
    const { left } = target.getBoundingClientRect();

    // Mouse position
    const x = event.clientX - left;
    console.log(Math.ceil((x / width) * 100));
    setMax(Math.ceil((x / width) * 100));
  };

  return (
    <Container
      data-testid={props.testId}
      theme={theme}
      onMouseDown={handleMouseDown}
    >
      <Track theme={theme} ref={trackRef} percentage={max} />
      {type === SliderType.range && (
        <AnimatedKnob
          drag="x"
          dragConstraints={{
            left: 0,
            right: width - 16,
          }}
          dragMomentum={false}
          onDragEnd={() => {}}
          onDrag={(event, info) => {
            setMin(Math.ceil((info.point.x / width) * 100));
          }}
          theme={theme}
        >
          <SliderToolTip theme={theme}>{}</SliderToolTip>
        </AnimatedKnob>
      )}
      <AnimatedKnob
        drag="x"
        dragConstraints={{
          left: 0,
          right: width - 16,
        }}
        dragMomentum={false}
        onDragEnd={() => {
          if (max > rangeMax) {
            setMax(rangeMax);
          } else if (min < rangeMin) {
            setMin(rangeMin);
          }
          props.onChange([rangeMin, max]);
        }}
        onDrag={(event, info) => {
          setMax(Math.ceil((info.point.x / width) * 100));
        }}
        theme={theme}
      >
        <SliderToolTip theme={theme}>{}</SliderToolTip>
      </AnimatedKnob>
    </Container>
  );
};
