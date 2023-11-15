import React from 'react';
import { Card } from '../Card';
import { CardBody } from '../Card/CardBody';
import { NativeSelect, NativeSelectProps } from '.';
import { Story, Meta } from '@storybook/react/types-6-0';
import { LabelPosition } from '../Label';
import { Tooltip } from '../Tooltip';
import { IconButton } from '../IconButton';
import { HelpIcon } from 'react-magma-icons';
import { ButtonSize, ButtonType, ButtonVariant } from '../Button';

const Template: Story<NativeSelectProps> = args => (
  <NativeSelect {...args}>
    <option>Red</option>
    <option>Green</option>
    <option>Blue</option>
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
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  isInverse: false,
  labelText: 'Select',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

const helpLinkLabel = 'Learn more';
const onHelpLinkClick = () => {
  alert('Help link clicked!');
};

const WithChildrenTemplate: Story<NativeSelectProps> = args => (
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

export const WithChildren = WithChildrenTemplate.bind({});
WithChildren.args = {
  ...Default.args,
};

export const HasError = Template.bind({});
HasError.args = {
  ...Default.args,
  errorMessage: 'This is an error.',
};

export const HelperMessage = Template.bind({});
HelperMessage.args = {
  ...Default.args,
  helperMessage: 'Helper message appears here',
};

export const Inverse = Template.bind({});
Inverse.args = {
  ...Default.args,
  isInverse: true,
};

export const InverseDisabled = Template.bind({});
InverseDisabled.args = {
  ...Default.args,
  isInverse: true,
  disabled: true,
};

export const HasErrorInverse = Template.bind({});
HasErrorInverse.args = {
  ...Default.args,
  isInverse: true,
  errorMessage: 'This is an error.',
};

export const HelperMessageInverse = Template.bind({});
HelperMessageInverse.args = {
  ...Default.args,
  isInverse: true,
  helperMessage: 'Helper message appears here',
};

InverseDisabled.decorators = [
  Story => (
    <Card isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];
HelperMessageInverse.decorators = [
  Story => (
    <Card isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];
HasErrorInverse.decorators = [
  Story => (
    <Card isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];
Inverse.decorators = [
  Story => (
    <Card isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];
