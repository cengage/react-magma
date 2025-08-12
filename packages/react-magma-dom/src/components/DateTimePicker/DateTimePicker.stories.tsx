import React from 'react';

import { Meta } from '@storybook/react';

import { LabelPosition } from '../Label';

import { DateTimePicker } from '.';

const today: Date = new Date();

export default {
  component: DateTimePicker,
  title: 'DateTimePicker',
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
    labelPosition: {
      control: {
        type: 'select',
        options: LabelPosition,
      },
    },
    labelWidth: {
      control: {
        type: 'number',
      },
    },
    defaultDate: {
      control: {
        type: 'date',
      },
    },
  },
} as Meta;

export const Default = args => {
  return <DateTimePicker {...args} />;
};

Default.args = {
  labelText: 'Date',
  minDate: today,
  errorMessage: '',
  helperMessage: '',
};
