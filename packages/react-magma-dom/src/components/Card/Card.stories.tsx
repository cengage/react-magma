import React from 'react';
import { Card } from '.';
import { CardBody } from './CardBody';
import { CardHeading } from './CardHeading';

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
};

export const Default = (args) => {
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
