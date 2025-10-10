import React from 'react';

import { Meta, StoryFn } from '@storybook/react';
import { CheckIcon } from 'react-magma-icons';

import { ButtonSize } from '../Button';
import { Container } from '../Container';

import { ToggleButton, ToggleButtonProps } from '.';

const Template: StoryFn<ToggleButtonProps> = args => (
  <ToggleButton {...args} isChecked={args.isChecked} icon={<CheckIcon />} />
);

export default {
  component: ToggleButton,
  title: 'ToggleButton',
  decorators: [
    (Story, context) => (
      <Container isInverse={context.args.isInverse} style={{ padding: '20px' }}>
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    size: {
      control: {
        type: 'select',
        options: ButtonSize,
      },
    },
  },
} as Meta;

export const Icon = {
  render: Template,

  args: {
    isInverse: false,
    'aria-label': 'Check',
  },
};

export const Text = {
  render: args => {
    return (
      <ToggleButton value="1" isChecked={args.isChecked} {...args}>
        Toggle
      </ToggleButton>
    );
  },

  args: {
    ...Icon.args,
  },
};

export const TextAndIcon = {
  render: args => {
    return (
      <ToggleButton
        value="1"
        isChecked={args.isChecked}
        aria-label="Check icon"
        icon={<CheckIcon />}
        {...args}
      >
        Toggle
      </ToggleButton>
    );
  },

  args: {
    ...Icon.args,
  },
};
