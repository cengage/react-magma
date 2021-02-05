import React from 'react';
import { Card } from '.';
import { CardBody } from './CardBody';
import { CardHeading } from './CardHeading';

export default {
  component: Card,
  title: 'Card',
};

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
