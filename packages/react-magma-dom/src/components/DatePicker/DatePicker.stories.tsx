import React from 'react';
import { DatePicker } from '.';
import { Card } from '../Card';

export default {
  component: DatePicker,
  title: 'DatePicker',
};

export const Default = () => {
  return <DatePicker labelText="Date" />;
};

export const Inverse = () => {
  return <Card isInverse><DatePicker labelText="Date" isInverse /></Card>;
};
