import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Select, SelectOptions, SelectProps, MultiSelectProps } from './';
import { LabelPosition } from '../Label';
import { Card } from '../Card';
import { CardBody } from '../Card/CardBody';
import { Tooltip } from '../Tooltip';
import { IconButton } from '../IconButton';
import { HelpIcon } from 'react-magma-icons';
import { ButtonSize, ButtonType, ButtonVariant } from '../Button';

const Template: Story<SelectProps<SelectOptions>> = args => (
  <Select {...args} />
);

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
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  labelText: 'Example',
  items: [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
  ],
  errorMessage: '',
  helperMessage: '',
  isClearable: false,
  isLabelVisuallyHidden: false,
  isMulti: false,
  labelPosition: LabelPosition.top,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const Multi = (props: MultiSelectProps<SelectOptions>) => (
  <Select
    isMulti
    {...props}
    items={[
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
    ]}
  />
);

const helpLinkLabel = 'Learn more';
const onHelpLinkClick = () => {
  alert('Help link clicked!');
};

const WithContentTemplate: Story<SelectOptions> = args => (
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

export const WithContent = WithContentTemplate.bind({});
WithContent.args = {
  isMulti: false,
};

export const ErrorMessage = Template.bind({});
ErrorMessage.args = {
  ...Default.args,
  errorMessage: 'Please fix this error',
};

export const HelperMessage = Template.bind({});
HelperMessage.args = {
  ...Default.args,
  helperMessage: 'This text is helpful',
};

export const Inverse = Template.bind({});
Inverse.args = {
  ...Default.args,
  isMulti: false,
  isInverse: true,
};
Inverse.decorators = [
  Story => (
    <Card isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];

export const LeftAlignedLabel = Template.bind({});
LeftAlignedLabel.args = {
  ...Default.args,
  labelPosition: LabelPosition.left,
};

export const LeftAlignedLabelWithContainer = Template.bind({});
LeftAlignedLabelWithContainer.args = {
  ...LeftAlignedLabel.args,
};
LeftAlignedLabelWithContainer.decorators = [
  Story => (
    <Card>
      <CardBody style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </CardBody>
    </Card>
  ),
];
