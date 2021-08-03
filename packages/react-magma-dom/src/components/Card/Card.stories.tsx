import React from 'react';
import { Card } from '.';
import { CardBody } from './CardBody';
import { CardHeading } from './CardHeading';

import { Story, Meta } from '@storybook/react';

const meta: Meta = {
  component: Card,
  title: 'Card',
};

export default meta;

export const Default = () => {
  return (
    <Card>
      <CardBody>
        <CardHeading>Card Heading</CardHeading>
        Some content
      </CardBody>
    </Card>
  );
};
