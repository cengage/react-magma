import React from 'react';
import { Alert, AlertProps } from '../index';
import { Story, Meta } from '@storybook/react/types-6-0';
import { AlertVariant } from '../../AlertBase';

const Template: Story<AlertProps> = args => (
  <Alert {...args}>I am an Alert</Alert>
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
};
