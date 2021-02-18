import React from 'react';
import { TimePicker } from '.';

export default {
  component: TimePicker,
  title: 'TimePicker',
};

export const Default = () => {
  return <TimePicker labelText="Time Due" />;
};
