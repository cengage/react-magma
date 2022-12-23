import React from 'react';
import { CheckIcon } from 'react-magma-icons';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ToggleButton, ToggleButtonProps } from '.';
import { Container } from '../Container';
import { ButtonSize } from '../Button';

const Template: Story<ToggleButtonProps> = args => (
  <ToggleButton {...args} aria-label="Check icon" icon={<CheckIcon />} />
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

export const Default = Template.bind({});
Default.args = {
  isInverse: false,
};
