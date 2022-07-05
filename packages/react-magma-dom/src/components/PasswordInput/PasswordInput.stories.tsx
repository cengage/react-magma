import React from 'react';
import { PasswordInput, PasswordInputProps } from '.';
import { Card, CardBody } from '../Card';
import { Story, Meta } from '@storybook/react/types-6-0';

const Template: Story<PasswordInputProps> = args => (
  <PasswordInput {...args} labelText="Password" />
);

export default {
  component: PasswordInput,
  title: 'PasswordInput',
  isInverse: false,
  disabled: false,
  isError: false,
} as Meta;

export const Default = Template.bind({});
Default.args = {};

export const Error = Template.bind({});
Error.args = {
  errorMessage: 'Please correct this error',
};

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
