import React from 'react';
import { FormField } from '.';
import { InputBase } from '../InputBase';

export default {
  component: FormField,
  title: 'FormField',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
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
    labelText: {
      control: {
        type: 'text',
      },
    },
  },
};

export const Default = args => {
  return (
    <FormField {...args}>
      <InputBase />
    </FormField>
  );
};

Default.args = {
  labelText: 'Hello',
};
