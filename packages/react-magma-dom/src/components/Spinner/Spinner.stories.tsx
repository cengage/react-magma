import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import { magma } from '../../theme/magma';

import { Spinner, SpinnerProps } from '.';

const Template: Story<SpinnerProps> = args => (
  <div
    style={{
      background: args.isInverse ? magma.colors.primary600 : 'transparent',
    }}
  >
    <Spinner {...args} />
  </div>
);

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
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {};
