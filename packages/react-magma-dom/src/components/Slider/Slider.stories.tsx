import React from 'react';
import { Slider } from '.';
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
      <Slider min={0} max={500} {...args} />
      <br />
      <br />
      <br />
      <Slider type={SliderType.range} min={0} max={500} {...args} />
    </>
  );
};
