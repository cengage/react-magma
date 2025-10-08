import React from 'react';

import { Meta } from '@storybook/react';

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

export const Default = {
  render: args => {
    return (
      <Card {...args}>
        <CardBody>
          <CardHeading>Card Heading</CardHeading>
          Some content
        </CardBody>
      </Card>
    );
  },

  args: {
    isInverse: false,
    align: '',
    background: '',
    calloutType: '',
    width: null,
  },
};
