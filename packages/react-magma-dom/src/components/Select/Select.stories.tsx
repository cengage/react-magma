import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Select, SelectOptions, SelectProps, MultiSelectProps } from './';
import { LabelPosition } from '../Label';
import { Card } from '../Card';
import { CardBody } from '../Card/CardBody';
import { magma } from '../../theme/magma';

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
//

export const Multi = (props: MultiSelectProps<SelectOptions>) => (
  <Select isMulti {...props} />
);

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
