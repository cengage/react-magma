import React from 'react';

import { Meta, StoryFn } from '@storybook/react';
import { HelpIcon } from 'react-magma-icons';

import { ButtonSize, ButtonType, ButtonVariant } from '../Button';
import { Card } from '../Card';
import { CardBody } from '../Card/CardBody';
import { IconButton } from '../IconButton';
import { LabelPosition } from '../Label';
import { Tooltip } from '../Tooltip';

import { MultiSelectProps, Select, SelectOptions, SelectProps } from './';

export default {
  title: 'Select',
  component: Select,
  argTypes: {
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
    isLabelVisuallyHidden: {
      control: {
        type: 'boolean',
      },
    },
    isClearable: {
      control: {
        type: 'boolean',
      },
    },
    initialHighlightedIndex: {
      control: {
        type: 'number',
      },
    },
    defaultSelectedItem: {
      control: {
        type: 'object',
      },
    },
    initialSelectedItem: {
      control: {
        type: 'object',
      },
    },
    defaultSelectedItems: {
      control: {
        type: 'object',
      },
    },
    initialSelectedItems: {
      control: {
        type: 'object',
      },
    },
  },
} as Meta;

export const Default = {
  args: {
    labelText: 'Example',
    items: [
      { label: 'Red', value: 'red', disabled: false },
      { label: 'Blue', value: 'blue', disabled: true },
      { label: 'Green', value: 'green' },
      { label: 'Purple mountain majesty', value: 'purple' },
    ],
    errorMessage: '',
    helperMessage: '',
    isClearable: false,
    isLabelVisuallyHidden: false,
    isMulti: false,
    labelPosition: LabelPosition.top,
  },
};

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Multi = {
  render: (props: MultiSelectProps<SelectOptions>) => (
    <Select
      {...props}
      isMulti
      items={[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
      ]}
      initialSelectedItems={[{ label: 'Red', value: 'red' }]}
    />
  ),

  args: {
    ...Default.args,
    disabled: false,
  },
};

const helpLinkLabel = 'Learn more';
const onHelpLinkClick = () => {
  alert('Help link clicked!');
};

const WithContentTemplate: StoryFn<SelectOptions> = args => (
  <Select
    additionalContent={
      <Tooltip content={helpLinkLabel}>
        <IconButton
          aria-label={helpLinkLabel}
          icon={<HelpIcon />}
          onClick={onHelpLinkClick}
          type={ButtonType.button}
          size={ButtonSize.small}
          variant={ButtonVariant.link}
        />
      </Tooltip>
    }
    labelText="Helper icon"
    {...args}
    items={[
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
    ]}
  />
);

export const WithContent = {
  render: WithContentTemplate,

  args: {
    isMulti: false,
  },
};

export const ErrorMessage = {
  args: {
    ...Default.args,
    errorMessage: 'Please fix this error',
  },
};

export const HelperMessage = {
  args: {
    ...Default.args,
    helperMessage: 'This text is helpful',
  },
};

export const Inverse = {
  args: {
    ...Default.args,
    isMulti: false,
    isInverse: true,
    disabled: false,
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

export const LeftAlignedLabel = {
  args: {
    ...Default.args,
    labelPosition: LabelPosition.left,
  },
};

export const LeftAlignedLabelWithContainer = {
  args: {
    ...LeftAlignedLabel.args,
  },

  decorators: [
    Story => (
      <Card>
        <CardBody style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Story />
        </CardBody>
      </Card>
    ),
  ],
};

export const WithDisabledItems = {
  args: {
    ...Default.args,
    items: [
      {
        label: 'First-Item-Disabled',
        value: 'First-Item-Disabled',
        disabled: true,
      },
      { label: 'Red', value: 'red' },
      { label: 'Blue-Disabled', value: 'blue', disabled: true },
      { label: 'Green', value: 'green' },
      { label: 'Purple mountain majesty', value: 'purple' },
      { label: 'Orange-Disabled', value: 'Orange-Disabled', disabled: true },
      { label: 'Yellow-Disabled', value: 'Yellow-Disabled', disabled: true },
    ],
    isClearable: true,
    defaultSelectedItem: {
      label: 'Blue-Disabled',
      value: 'blue',
      disabled: true,
    },
    initialSelectedItem: {
      label: 'Orange-Disabled',
      value: 'disabled',
      disabled: true,
    },
  },
};

export const MultiWithDisabledItems = {
  args: {
    ...Default.args,
    isMulti: true,
    items: [
      { label: 'Red', value: 'red' },
      { label: 'Green', value: 'green' },
      { label: 'Blue-Disabled', value: 'blue', disabled: true },
      { label: 'Purple mountain majesty', value: 'purple' },
      { label: 'Orange', value: 'orange', disabled: false },
      { label: 'Yellow-Disabled', value: 'Yellow-Disabled', disabled: true },
    ],
    isClearable: true,
    initialHighlightedIndex: 2,
    defaultSelectedItems: [
      { label: 'Red', value: 'red' },
      { label: 'Orange', value: 'orange', disabled: false },
      { label: 'Yellow-Disabled', value: 'Yellow-Disabled', disabled: true },
    ],
    initialSelectedItems: [
      { label: 'Red', value: 'red' },
      { label: 'Orange', value: 'orange', disabled: false },
      { label: 'Yellow-Disabled', value: 'Yellow-Disabled', disabled: true },
    ],
  },
};
