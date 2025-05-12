import React from 'react';

import { Meta, Story } from '@storybook/react/types-6-0';
import {
  CheckIcon,
  FormatAlignCenterIcon,
  FormatAlignJustifyIcon,
  FormatAlignLeftIcon,
  FormatAlignRightIcon,
  SettingsIcon,
} from 'react-magma-icons';

import { ButtonSize } from '../Button';
import { Container } from '../Container';
import { ToggleButton } from '../ToggleButton';

import { ToggleButtonGroup, ToggleButtonGroupProps } from '.';

const Template: Story<ToggleButtonGroupProps> = args => (
  <ToggleButtonGroup
    onChange={(event, value) => console.log('on change is called', value)}
    value="two"
    {...args}
  >
    <ToggleButton
      aria-label="Check icon"
      value="one"
      icon={<CheckIcon />}
      onClick={e => console.log('onclick: button 1')}
    />
    <ToggleButton
      aria-label="Check icon"
      value="two"
      icon={<CheckIcon />}
      onClick={e => console.log('onclick: button 2')}
    />
    <ToggleButton
      aria-label="Check icon"
      value="three"
      icon={<CheckIcon />}
      onClick={e => console.log('onclick: button 3')}
      disabled
    />
    <ToggleButton
      aria-label="Check icon"
      value="four"
      icon={<CheckIcon />}
      onClick={e => console.log('onclick: button 4')}
    />
    <ToggleButton
      aria-label="Check icon"
      value="five"
      icon={<CheckIcon />}
      onClick={e => console.log('onclick: button 5')}
    />
    <ToggleButton
      aria-label="Check icon"
      value="six"
      icon={<CheckIcon />}
      onClick={e => console.log('onclick: button 6')}
    />
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
      <ToggleButton
        aria-label="Left align"
        icon={<FormatAlignLeftIcon />}
        value="left"
        testId="left"
      />
      <ToggleButton
        aria-label="Center align"
        icon={<FormatAlignCenterIcon />}
        value="center"
        testId="center"
      />
      <ToggleButton
        aria-label="Right align"
        icon={<FormatAlignRightIcon />}
        value="right"
        testId="right"
      />
      <ToggleButton
        aria-label="Justify align"
        icon={<FormatAlignJustifyIcon />}
        value="justify"
        testId="justify"
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
    <ToggleButtonGroup size={ButtonSize.medium} {...args}>
      <ToggleButton
        aria-label="Settings icon"
        icon={<SettingsIcon />}
        value="settings"
      />
      <ToggleButton value="text">Text</ToggleButton>
      <ToggleButton
        icon={<SettingsIcon />}
        value="iconAndText"
        size={ButtonSize.small}
      >
        Icon and Text
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
DifferentToggleButtons.args = {
  noSpace: false,
  ...Default.args,
};
