import React from 'react';
import { FormFieldContainer } from '.';
import { InputBase } from '../InputBase';
import { Meta } from '@storybook/react';

const meta: Meta = {
  component: FormFieldContainer,
  title: 'FormFieldContainer',
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

export default meta;

export const Default = args => {
  return (
    <FormFieldContainer {...args}>
      <InputBase />
    </FormFieldContainer>
  );
};

Default.args = {
  labelText: 'Hello',
};
