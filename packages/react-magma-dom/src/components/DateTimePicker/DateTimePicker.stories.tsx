import React from 'react';

import { Meta } from '@storybook/react';

import { DateTimePicker } from '.';

export default {
  component: DateTimePicker,
  title: 'DateTimePicker',
  argTypes: {},
} as Meta;

export const Default = args => {
  return <DateTimePicker {...args} />;
};
