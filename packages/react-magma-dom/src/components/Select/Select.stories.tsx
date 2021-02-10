import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Select, SelectProps } from './';
import { LabelPosition } from '../Label';
import { Card } from '../Card';
import { CardBody } from '../Card/CardBody';
import { magma } from '../../theme/magma';

const Template: Story<SelectProps> = args => <Select {...args} />;

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
  disableCreateItem: false,
  errorMessage: '',
  helperMessage: '',
  isClearable: false,
  isLabelVisuallyHidden: false,
  isMulti: false,
  labelPosition: LabelPosition.top,
};

export const Multi = Template.bind({});
Multi.args = {
  ...Default.args,
  isMulti: true,
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
  isInverse: true,
};
Inverse.decorators = [
  Story => (
    <Card background={magma.colors.neutral} isInverse>
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
    <Card background={magma.colors.neutral07}>
      <CardBody style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </CardBody>
    </Card>
  ),
];
