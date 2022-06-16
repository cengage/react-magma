import React from 'react';
import { Alert, AlertProps } from './index';
import { AlertVariant } from '../AlertBase';
import { Card, CardBody } from '../Card';
import { magma } from '../../theme/magma';
import { Story, Meta } from '@storybook/react/types-6-0';

const Template: Story<AlertProps> = args => (
  <Alert {...args}>I am an Alert</Alert>
);

const LongTextTemplate: Story<AlertProps> = args => (
  <Alert {...args}>
    Alert Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat.
  </Alert>
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

export const Dismissible = Template.bind({});
Dismissible.args = {
  isDismissible: true,
};

export const LongText = LongTextTemplate.bind({});
Default.args = {};

export const Danger = Template.bind({});
Danger.args = {
  variant: AlertVariant.danger,
};

export const Success = Template.bind({});
Success.args = {
  variant: AlertVariant.success,
};

export const Warning = Template.bind({});
Warning.args = {
  variant: AlertVariant.warning,
  isDismissible: true,
};

export const Inverse = Template.bind({});
Inverse.args = {
  isDismissible: true,
  isInverse: true,
};
Inverse.decorators = [
  Story => (
    <Card background={magma.colors.foundation} isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];
