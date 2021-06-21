import React from 'react';
import { ProgressBar, ProgressBarProps, ProgressBarColor } from '.';
import { Story, Meta } from '@storybook/react/types-6-0';

const Template: Story<ProgressBarProps> = args => <ProgressBar {...args} />;

export default {
  title: 'ProgressBar',
  component: ProgressBar,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ProgressBarColor,
      },
    },
    height: {
      control: {
        type: 'text',
      },
    },
    isAnimated: {
      control: {
        type: 'boolean',
      },
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    isLabelVisible: {
      control: {
        type: 'boolean',
      },
    },
    percentage: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  percentage: 25,
};
