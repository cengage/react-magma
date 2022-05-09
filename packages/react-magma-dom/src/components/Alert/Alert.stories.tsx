import React from 'react';
import { Alert, AlertProps } from './index';
import { AlertVariant } from '../AlertBase';
import { Card, CardBody } from '../Card';
import { Story, Meta } from '@storybook/react/types-6-0';

const Template: Story<AlertProps> = args => (
  <>
    <Alert {...args}>Default</Alert>
    <Alert {...args} variant={AlertVariant.success}>
      Success
    </Alert>
    <Alert {...args} variant={AlertVariant.warning}>
      Warning
    </Alert>
    <Alert {...args} variant={AlertVariant.danger}>
      Danger
    </Alert>
    <Alert {...args} isDismissible>
      Default dismissible
    </Alert>
    <Alert {...args} isDismissible variant={AlertVariant.success}>
      Success dismissible
    </Alert>
    <Alert {...args} isDismissible variant={AlertVariant.warning}>
      Warning dismissible
    </Alert>
    <Alert {...args} isDismissible variant={AlertVariant.danger}>
      Danger dismissible
    </Alert>
  </>
);

export default {
  title: 'Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: AlertVariant,
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {};

export const Inverse = Template.bind({});
Inverse.args = {
  isInverse: true,
};
Inverse.decorators = [
  Story => (
    <Card isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];
