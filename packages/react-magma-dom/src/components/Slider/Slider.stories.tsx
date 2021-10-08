import React from 'react';
import { ProgressBarMarker } from '../ProgressBar';
import { Slider, SliderProps, SliderType } from './Slider';

export default {
  component: Slider,
  title: 'Slider',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export const Default = (args: SliderProps) => {
  return (
    <div style={{margin:'20px'}}>
      <Slider
        {...args}
        count={1}
        defaultValue={0}
        max={500}
        min={-500}
        steps={250}
      />
    </div>
    );
};

export const Range = (args: SliderProps) => {
  return (
    <div style={{margin:'20px'}}>
      <Slider
        {...args}
        count={2}
        defaultValue={[-250, 250]}
        max={500}
        min={-500}
        steps={250}
      />
    </div>
    );
};

export const Multiple = (args: SliderProps) => {
  return (
    <div style={{margin:'20px'}}>
      <Slider
        {...args}
        count={5}
        defaultValue={[-500, -250, 0, 250, 500]}
        max={500}
        min={-500}
        steps={50}
      />
    </div>
    );
};

export const StepArray = (args: SliderProps) => {
  return (
    <div style={{margin:'20px'}}>
      <Slider
        {...args}
        count={1}
        defaultValue={0}
        max={500}
        min={-500}
        steps={[-500, -400, -300, 0, 100,200,300,500]}
      />
    </div>
    );
};

export const Two = (args: SliderProps) => {
  return (
    <div style={{margin:'50px'}}>
    <Slider
      hasTooltip
      type={SliderType.range}
      min={0}
      max={500}
      width={500}
      {...args}
    />
  </div>
  );
};

export const Three = (args: SliderProps) => {
  return (
    <div style={{margin:'20px'}}>
      <Slider hasTooltip min={-2} max={2} width={500} steps={1} {...args}>
        <ProgressBarMarker percentage={0}>-2</ProgressBarMarker>
        <ProgressBarMarker percentage={25}>-1</ProgressBarMarker>
        <ProgressBarMarker percentage={50}>0</ProgressBarMarker>
        <ProgressBarMarker percentage={75}>1</ProgressBarMarker>
        <ProgressBarMarker percentage={100}>2</ProgressBarMarker>
      </Slider>
    </div>
  );
};
