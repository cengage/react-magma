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
  <ToggleButtonGroup {...args}>
    <ToggleButton aria-label="Check icon" icon={<CheckIcon />} />
    <ToggleButton aria-label="Check icon" icon={<CheckIcon />} />
    <ToggleButton aria-label="Check icon" defaultChecked icon={<CheckIcon />} />
    <ToggleButton aria-label="Check icon" icon={<CheckIcon />} />
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
  requiredSelect: true,
  singleSelect: true,
  ...Default.args,
};

export const ControlledExample = args => {
  const [alignment, setAlignment] = React.useState(() => ['center']);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string[]
  ) => {
    if (newAlignment.length) {
      setAlignment(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      enforcedSelect={2}
      onChange={handleChange}
      noSpace
      value={alignment}
      {...args}
    >
      <ToggleButton
        aria-label="Left align"
        icon={<FormatAlignLeftIcon />}
        value="left"
      />
      <ToggleButton
        aria-label="Center align"
        icon={<FormatAlignCenterIcon />}
        value="center"
      />
      <ToggleButton
        aria-label="Right align"
        icon={<FormatAlignRightIcon />}
        value="right"
      />
      <ToggleButton
        aria-label="Justify align"
        icon={<FormatAlignJustifyIcon />}
        value="justify"
      />
    </ToggleButtonGroup>
  );
};

ControlledExample.args = {
  noSpace: true,
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
