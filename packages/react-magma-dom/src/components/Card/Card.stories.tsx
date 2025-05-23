import React from 'react';

import { Meta } from '@storybook/react/types-6-0';

import { CardBody } from './CardBody';
import { CardHeading } from './CardHeading';

import { Card } from '.';

export default {
  component: Card,
  title: 'Card',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    hasDropShadow: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Default = args => {
  return (
    <Card {...args}>
      <CardBody>
        <CardHeading>Card Heading</CardHeading>
        Some content
      </CardBody>
    </Card>
  );
};

Default.args = {
  isInverse: false,
  align: '',
  background: '',
  calloutType: '',
  width: null,
};
