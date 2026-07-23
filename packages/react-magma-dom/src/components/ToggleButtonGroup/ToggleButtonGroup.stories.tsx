import React from 'react';

import { Meta, StoryFn } from '@storybook/react-webpack5';
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

import {
  ToggleButtonGroup,
  ToggleButtonGroupProps,
  ToggleButtonGroupRole,
} from '.';

const Template: StoryFn<ToggleButtonGroupProps> = args => (
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
      control: { type: 'select' },
      options: Object.values(ButtonSize),
    },
    role: {
      control: { type: 'select' },
      options: Object.values(ToggleButtonGroupRole),
    },
  },
} as Meta;

export const Default = {
  render: Template,

  args: {
    isInverse: false,
  },
};

export const AlignmentExample = {
  render: args => {
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
  },

  args: {
    noSpace: true,
    enforced: true,
    exclusive: true,
    ...Default.args,
  },
};

export const DifferentToggleButtons = {
  render: args => {
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
  },

  args: {
    noSpace: false,
    ...Default.args,
  },
};

export const TablistPattern = {
  render: args => {
    const [view, setView] = React.useState('teacher');

    return (
      <>
        <ToggleButtonGroup
          {...args}
          value={view}
          onChange={(_event, value) => value && setView(value)}
        >
          <ToggleButton value="teacher" aria-controls="view-panel">
            Teacher View
          </ToggleButton>
          <ToggleButton value="student" aria-controls="view-panel">
            Student View
          </ToggleButton>
        </ToggleButtonGroup>
        <div id="view-panel" role="tabpanel" style={{ padding: '16px 0' }}>
          {view === 'teacher'
            ? 'Showing the teacher view of the course.'
            : 'Showing the student view of the course.'}
        </div>
      </>
    );
  },

  args: {
    enforced: true,
    exclusive: true,
    role: 'tablist',
  },
};
