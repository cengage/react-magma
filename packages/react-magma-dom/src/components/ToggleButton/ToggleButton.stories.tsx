import React from 'react';
import {
  CheckIcon,
  FormatAlignCenterIcon,
  FormatAlignJustifyIcon,
  FormatAlignLeftIcon,
  FormatAlignRightIcon,
  SettingsIcon,
} from 'react-magma-icons';
import { Story } from '@storybook/react/types-6-0';
import { ToggleButtonGroup, ToggleButton, ToggleButtonGroupProps } from '.';
import { Container } from '../Container';
import { ButtonSize } from '../Button';

const Template: Story<ToggleButtonGroupProps> = args => (
  <ToggleButtonGroup {...args}>
    <ToggleButton disabled aria-label="Check icon" icon={<CheckIcon />} />
    <ToggleButton disabled aria-label="Check icon" icon={<CheckIcon />} />
    <ToggleButton aria-label="Check icon" defaultChecked icon={<CheckIcon />} />
    <ToggleButton aria-label="Check icon" icon={<CheckIcon />} />
  </ToggleButtonGroup>
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
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    noSpace: {
      control: {
        type: 'boolean',
      },
    },
    requiredSelect: {
      control: {
        type: 'boolean',
      },
    },
    singleSelect: {
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
};

export const Default = Template.bind({});
Default.args = {
  isInverse: false,
};

export const SingleButton = args => {
  return (
    <ToggleButton
      {...args}
      aria-label="Settings icon"
      icon={<SettingsIcon />}
      size={ButtonSize.large}
    />
  );
};
SingleButton.args = {
  ...Default.args,
};

export const SingleTextButton = args => {
  return (
    <ToggleButton {...args} aria-label="Settings icon" size={ButtonSize.small}>
      Hello
    </ToggleButton>
  );
};
SingleTextButton.args = {
  ...Default.args,
};

export const AlignmentExample = args => {
  return (
    <ToggleButtonGroup noSpace requiredSelect {...args}>
      <ToggleButton aria-label="Left align" icon={<FormatAlignLeftIcon />} />
      <ToggleButton
        aria-label="Center align"
        icon={<FormatAlignCenterIcon />}
      />
      <ToggleButton aria-label="Right align" icon={<FormatAlignRightIcon />} />
      <ToggleButton
        aria-label="Justify align"
        icon={<FormatAlignJustifyIcon />}
      />
    </ToggleButtonGroup>
  );
};
AlignmentExample.args = {
  ...Default.args,
  singleSelect: true,
};

export const DifferentToggleButtons = args => {
  return (
    <ToggleButtonGroup noSpace {...args}>
      <ToggleButton aria-label="Settings icon" icon={<SettingsIcon />} />
      <ToggleButton>Text</ToggleButton>
      <ToggleButton aria-label="Settings icon" icon={<SettingsIcon />}>
        Icon and Text
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
DifferentToggleButtons.args = {
  ...Default.args,
};
