import React from 'react';
import { CheckIcon } from 'react-magma-icons';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ToggleButton, ToggleButtonProps } from '.';
import { Container } from '../Container';
import { ButtonSize } from '../Button';

const Template: Story<ToggleButtonProps> = args => (
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

export const Icon = Template.bind({});
Icon.args = {
  isInverse: false,
  'aria-label': 'Check',
};

export const Text = args => {
  return (
    <ToggleButton value="1" isChecked={args.isChecked} {...args}>
      Toggle
    </ToggleButton>
  );
};
Text.args = {
  ...Icon.args,
};

export const TextAndIcon = args => {
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
};
TextAndIcon.args = {
  ...Icon.args,
};
