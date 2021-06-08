import React from 'react';
import { Spinner, SpinnerProps } from '.';
import { Story, Meta } from '@storybook/react/types-6-0';

const Template: Story<SpinnerProps> = args => <Spinner {...args} />;

export default {
  title: 'Spinner',
  component: Spinner,
  argTypes: {
    color: {
      control: {
        type: 'text',
      },
    },
    size: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {};
