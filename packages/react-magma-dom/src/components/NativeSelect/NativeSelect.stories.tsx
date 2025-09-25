import React from 'react';

import { StoryFn, Meta } from '@storybook/react/types-6-0';
import { HelpIcon } from 'react-magma-icons';

import { ButtonSize, ButtonType, ButtonVariant } from '../Button';
import { Card } from '../Card';
import { CardBody } from '../Card/CardBody';
import { IconButton } from '../IconButton';
import { LabelPosition } from '../Label';
import { Tooltip } from '../Tooltip';

import { NativeSelect, NativeSelectProps } from '.';

const Template: StoryFn<NativeSelectProps> = args => (
  <NativeSelect {...args}>
    <option>Red</option>
    <option>Green</option>
    <option>Blue</option>
    <option>Purple mountain majesty</option>
  </NativeSelect>
);

export default {
  component: NativeSelect,
  title: 'NativeSelect',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
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
    errorMessage: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Default = {
  render: Template,

  args: {
    isInverse: false,
    labelText: 'Select',
    testId: 'native-select-example',
  },
};

export const Disabled = {
  render: Template,

  args: {
    ...Default.args,
    disabled: true,
  },
};

const WithContentTemplate: StoryFn<NativeSelectProps> = args => {
  const helpLinkLabel = 'Learn more';
  const onHelpLinkClick = () => {
    alert('Help link clicked!');
  };
  return (
    <NativeSelect
      {...args}
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
    >
      <option>Red</option>
      <option>Green</option>
      <option>Blue</option>
    </NativeSelect>
  );
};

export const WithContent = {
  render: WithContentTemplate,

  args: {
    ...Default.args,
  },
};

export const HasError = {
  render: Template,

  args: {
    ...Default.args,
    errorMessage: 'This is an error.',
  },
};

export const HelperMessage = {
  render: Template,

  args: {
    ...Default.args,
    helperMessage: 'Helper message appears here',
  },
};

export const Inverse = {
  render: Template,

  args: {
    ...Default.args,
    isInverse: true,
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

export const InverseDisabled = {
  render: Template,

  args: {
    ...Default.args,
    isInverse: true,
    disabled: true,
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

export const HasErrorInverse = {
  render: Template,

  args: {
    ...Default.args,
    isInverse: true,
    errorMessage: 'This is an error.',
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

export const HelperMessageInverse = {
  render: Template,

  args: {
    ...Default.args,
    isInverse: true,
    helperMessage: 'Helper message appears here',
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
