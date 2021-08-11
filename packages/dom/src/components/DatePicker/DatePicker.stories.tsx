import React from 'react';
import { DatePicker } from '.';

import { Story, Meta } from '@storybook/react';

const meta: Meta = {
  component: DatePicker,
  title: 'DatePicker',
};

export default meta;

export const Default = () => {
  return <DatePicker labelText="Date" />;
};
