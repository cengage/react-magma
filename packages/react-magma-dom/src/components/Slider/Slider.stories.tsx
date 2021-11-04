import React from 'react';
import { ProgressBarDirection } from '../ProgressBar';
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
    <div style={{ margin: '20px' }}>
      <Slider
        {...args}
        count={1}
        defaultValue={0}
        max={500}
        min={-500}
        width={150}
        // steps={250}
      />
    </div>
  );
};

export const Marks = (args: SliderProps) => {
  return (
    <div style={{ margin: '20px' }}>
      <Slider
        {...args}
        count={1}
        defaultValue={0}
        max={4}
        min={0}
        marks={[
          { percentage: 0, label: '0' },
          { percentage: 25, label: '25%' },
          { percentage: 50, label: '50%' },
          { percentage: 75, label: '75%' },
          { percentage: 100, label: '100%' },
        ]}
      />
    </div>
  );
};

export const MarksVertical = (args: SliderProps) => {
  return (
    <div style={{ margin: '20px' }}>
      <Slider
        {...args}
        count={1}
        defaultValue={0}
        direction={ProgressBarDirection.vertical}
        height={400}
        max={4}
        min={0}
        marks={[
          { percentage: 0, label: '0' },
          { percentage: 25, label: '25%' },
          { percentage: 50, label: '50%' },
          { percentage: 75, label: '75%' },
          { percentage: 100, label: '100%' },
        ]}
      />
    </div>
  );
};

export const Disabled = (args: SliderProps) => {
  return (
    <div style={{ margin: '20px' }}>
      <Slider
        {...args}
        count={1}
        defaultValue={0}
        disabled
        max={500}
        min={-500}
        // steps={250}
      />
    </div>
  );
};

export const Range = (args: SliderProps) => {
  return (
    <div style={{ margin: '20px' }}>
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
    <div style={{ margin: '20px' }}>
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
    <div style={{ margin: '20px' }}>
      <Slider
        {...args}
        count={1}
        defaultValue={0}
        max={500}
        min={-500}
        steps={[-500, -400, -300, 0, 100, 200, 300, 500]}
      />
    </div>
  );
};

export const Two = (args: SliderProps) => {
  return (
    <div style={{ margin: '20px' }}>
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
    <div style={{ margin: '20px' }}>
      <Slider hasTooltip min={-2} max={2} width={500} steps={1} {...args}>
        {/* <Marker percentage={0}>-2</Marker>
        <Marker percentage={25}>-1</Marker>
        <Marker percentage={50}>0</Marker>
        <Marker percentage={75}>1</Marker>
        <Marker percentage={100}>2</Marker> */}
      </Slider>
    </div>
  );
};

export const Vertical = (args: SliderProps) => {
  return (
    <div style={{ margin: '20px' }}>
      <Slider
        {...args}
        height={200}
        max={10}
        min={0}
        direction={ProgressBarDirection.vertical}
      />
    </div>
  );
};
