import React from 'react';
import { DatePicker } from '.';
import { magma } from '../../theme/magma';

const today: Date = new Date();

export default {
  component: DatePicker,
  title: 'DatePicker',
  argTypes: {
    minDate: {
      control: {
        type: 'date',
      },
    },
    isClearable: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export const Default = args => {
  return <DatePicker {...args} />;
};

Default.args = {
  labelText: 'Date',
  minDate: today,
  errorMessage: '',
  helperMessage: '',
};

export const Inverse = args => {
  return (
    <div style={{ background: magma.colors.primary600, padding: '0 12px' }}>
      <br />
      <DatePicker {...args} />
      <br />
    </div>
  );
};

Inverse.args = {
  ...Default.args,
  isInverse: true,
};
