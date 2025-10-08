import React from 'react';

import { StoryFn, Meta } from '@storybook/react';

import { Card, CardBody } from '../Card';
import { InputSize } from '../InputBase';
import { LabelPosition } from '../Label';

import { PasswordInput, PasswordInputProps } from '.';

const Template: StoryFn<PasswordInputProps> = args => (
  <PasswordInput {...args} labelText="Password" />
);

export default {
  component: PasswordInput,
  title: 'PasswordInput',
  argTypes: {
    isInverse: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      defaultValue: false,
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
    inputSize: {
      control: {
        type: 'select',
        options: InputSize,
      },
    },
    isPasswordMaskButtonHidden: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Default = {
  render: Template,
  args: {},
};

export const Error = {
  render: Template,

  args: {
    errorMessage: 'Please correct this error',
  },
};

export const Inverse = {
  render: Template,

  args: {
    isInverse: true,
  },

  decorators: [
    Story => (
      <Card isInverse>
        <CardBody>
          <Story />
        </CardBody>
      </Card>
    ),
  ],
};

export const CustomText = {
  render: Template,

  args: {
    showPasswordButtonText: 'Mostrar',
    hidePasswordButtonText: 'Esconder',
  },
};
