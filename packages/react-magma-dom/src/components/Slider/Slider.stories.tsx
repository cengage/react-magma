import React from 'react';
import { Slider } from '.';
import { ProgressBarDirection, ProgressBarMarker } from '../ProgressBar';
import { SliderType } from './Slider';

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

export const Default = args => {
  return (
    <>
      <br />
      <br />
      <Slider defaultValue={2} width={130} min={0} max={130} {...args} />
      <br />
      <br />
      <br />
      <Slider
        hasToolTip
        type={SliderType.range}
        min={0}
        max={500}
        width={500}
        {...args}
      />
      <br />
      <br />
      <br />
      <Slider hasToolTip min={-2} max={2} width={500} steps={1} {...args}>
        <ProgressBarMarker percentage={0}>-2</ProgressBarMarker>
        <ProgressBarMarker percentage={25}>-1</ProgressBarMarker>
        <ProgressBarMarker percentage={50}>0</ProgressBarMarker>
        <ProgressBarMarker percentage={75}>1</ProgressBarMarker>
        <ProgressBarMarker percentage={100}>2</ProgressBarMarker>
      </Slider>
    </>
  );
};
