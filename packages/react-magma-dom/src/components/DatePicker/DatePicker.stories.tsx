import React from 'react';
import { DatePicker } from '.';
import { Card } from '../Card';

export default {
  component: DatePicker,
  title: 'DatePicker',
};

export const Default = () => {
  return <DatePicker labelText="Date" minDate={Date.now()} />;
};

export const Inverse = () => {
  return (
    <Card isInverse>
      <br />
      <DatePicker labelText="Date" isInverse minDate={Date.now()} />
      <br />
    </Card>
  );
};
