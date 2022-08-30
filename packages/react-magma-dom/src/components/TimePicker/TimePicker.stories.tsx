import React from 'react';
import { TimePicker, TimePickerProps } from '.';
import { Card, CardBody } from '../Card';
import { Story, Meta } from '@storybook/react/types-6-0';

const Template: Story<TimePickerProps> = args => (
  <TimePicker {...args} labelText="Time Due" />
);

export default {
  component: TimePicker,
  title: 'TimePicker',
  argTypes: {
    errorMessage: {
      control: {
        type: 'text',
      },
    },
    helperMessage: {
      control: {
        type: 'text',
      },
    },
  },
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
