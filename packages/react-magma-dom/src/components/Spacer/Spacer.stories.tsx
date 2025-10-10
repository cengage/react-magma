import React from 'react';

import { Meta } from '@storybook/react';

import { magma } from '../../theme/magma';
import { Button } from '../Button';
import { Card, CardBody } from '../Card';

import { Spacer, SpacerProps, SpacerAxis } from './';

export default {
  title: 'Spacer',
  component: Spacer,
  argTypes: {
    axis: {
      control: {
        type: 'select',
        options: SpacerAxis,
      },
    },
  },
} as Meta;

export const Default = {
  args: {
    size: magma.spaceScale.spacing07,
  },
};

export const ExampleWithContent = {
  args: {
    ...Default.args,
  },

  decorators: [
    Story => (
      <Card>
        <CardBody>
          <Button>Button 1</Button>
          <Story />
          <Button>Button 2</Button>
        </CardBody>
      </Card>
    ),
  ],
};
