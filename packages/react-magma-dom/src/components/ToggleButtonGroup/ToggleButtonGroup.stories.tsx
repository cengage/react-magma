import React from 'react';
import {
  CheckIcon,
  FormatAlignCenterIcon,
  FormatAlignJustifyIcon,
  FormatAlignLeftIcon,
  FormatAlignRightIcon,
  SettingsIcon,
} from 'react-magma-icons';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ToggleButtonGroup, ToggleButtonGroupProps } from '.';
import { ToggleButton } from '../ToggleButton';
import { Container } from '../Container';
import { ButtonSize } from '../Button';

const Template: Story<ToggleButtonGroupProps> = args => (
  <ToggleButtonGroup value="two" {...args}>
    <ToggleButton aria-label="Check icon" value="one" icon={<CheckIcon />} />
    <ToggleButton aria-label="Check icon" value="two" icon={<CheckIcon />} />
    <ToggleButton aria-label="Check icon" value="three" icon={<CheckIcon />} />
    <ToggleButton aria-label="Check icon" value="four" icon={<CheckIcon />} />
  </ToggleButtonGroup>
);

export default {
  component: ToggleButtonGroup,
  title: 'ToggleButtonGroup',
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
    enforced: {
      control: {
        type: 'boolean',
      },
    },
    exclusive: {
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

export const AlignmentExample = args => {
  return (
    <ToggleButtonGroup {...args}>
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
  noSpace: true,
  enforced: true,
  exclusive: true,
  ...Default.args,
};

export const DifferentToggleButtons = args => {
  return (
    <ToggleButtonGroup {...args}>
      <ToggleButton aria-label="Settings icon" icon={<SettingsIcon />} />
      <ToggleButton>Text</ToggleButton>
      <ToggleButton icon={<SettingsIcon />}>Icon and Text</ToggleButton>
    </ToggleButtonGroup>
  );
};
DifferentToggleButtons.args = {
  noSpace: true,
  ...Default.args,
};
