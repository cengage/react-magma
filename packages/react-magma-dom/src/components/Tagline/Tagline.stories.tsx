import React from 'react';

import { Meta } from '@storybook/react-webpack5';

import { Card } from '../Card';

import { Tagline } from '.';

export default {
  component: Tagline,
  title: 'Tagline',
  argTypes: {
    isInverse: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
} as Meta;

export const Default = {
  render: args => (
    <Card isInverse={args.isInverse} style={{ padding: '24px' }}>
      <Tagline {...args}>A short line of supporting text</Tagline>
    </Card>
  ),
};

export const Inverse = {
  render: args => (
    <Card isInverse style={{ padding: '24px' }}>
      <Tagline {...args} isInverse>
        A short line of supporting text
      </Tagline>
    </Card>
  ),
};
