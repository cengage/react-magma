import React from 'react';
import { Badge } from '.';

import { Story, Meta } from '@storybook/react';

const meta: Meta = {
  component: Badge,
  title: 'Badge',
};

export default meta;

export const Default = () => {
  return <Badge>Badge</Badge>;
};
