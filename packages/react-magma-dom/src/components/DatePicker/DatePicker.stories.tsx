import React from 'react';
import { DatePicker } from '.';
import { magma } from '../../theme/magma';
import { Card } from '../Card';

export default {
  component: DatePicker,
  title: 'DatePicker',
};

const today: Date = new Date();

export const Default = () => {
  return <DatePicker labelText="Date" minDate={today} />;
};

export const Inverse = () => {
  return (
    <div style={{ background: magma.colors.primary600, padding: '0 12px' }}>
      <br />
      <DatePicker labelText="Date" isInverse minDate={today} />
      <br />
    </div>
  );
};
