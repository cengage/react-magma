import React from 'react';
import { ProgressBarDirection, ProgressBarMarker } from '../ProgressBar';
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
      <Slider defaultValue={2} width={130} min={0} max={130} {...args} />
    </div>
    );
};
    
export const Two = (args: SliderProps) => {
  return (
    <div style={{margin:'50px'}}>
    <Slider
      hasToolTip
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
      <Slider hasToolTip min={-2} max={2} width={500} steps={1} {...args}>
        <ProgressBarMarker percentage={0}>-2</ProgressBarMarker>
        <ProgressBarMarker percentage={25}>-1</ProgressBarMarker>
        <ProgressBarMarker percentage={50}>0</ProgressBarMarker>
        <ProgressBarMarker percentage={75}>1</ProgressBarMarker>
        <ProgressBarMarker percentage={100}>2</ProgressBarMarker>
      </Slider>
    </div>
  );
};
