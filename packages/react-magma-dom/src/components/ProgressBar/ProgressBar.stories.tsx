import React from 'react';
import { Card, CardBody } from '../Card';
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
        type: 'number',
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  percentage: 25,
  isInverse: false,
};

export const Inverse = Template.bind({});
Inverse.args = {
  ...Default.args,
  isInverse: true,
};

Inverse.decorators = [
  Story => (
    <Card isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];
