import React from 'react';
import { PasswordInput, PasswordInputProps } from '.';
import { Card, CardBody } from '../Card';
import { Story, Meta } from '@storybook/react/types-6-0';
import { LabelPosition } from '../Label';
import { InputSize } from '../InputBase';

const Template: Story<PasswordInputProps> = args => (
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
      }
    },
    isPasswordMaskButtonHidden: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {};

export const Error = Template.bind({});
Error.args = {
  errorMessage: 'Please correct this error',
};

export const Inverse = Template.bind({});
Inverse.args = {
  isInverse: true,
};
Inverse.decorators = [
  Story => (
    <Card isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];

export const CustomText = Template.bind({});
CustomText.args = {
  showPasswordButtonText: 'Mostrar',
  hidePasswordButtonText: 'Esconder'
};