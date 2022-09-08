import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Combobox, ComboboxProps, MultiComboboxProps } from '.';
import { SelectOptions } from '../Select';
import { LabelPosition } from '../Label';
import { Card } from '../Card';
import { CardBody } from '../Card/CardBody';

const Template: Story<ComboboxProps<SelectOptions>> = args => (
  <Combobox {...args} />
);

export default {
  title: 'Combobox',
  component: Combobox,
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
  defaultItems: [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
  ],
  disableCreateItem: false,
  errorMessage: '',
  helperMessage: '',
  isClearable: false,
  isMulti: false,
  isLoading: false,
};

export const Multi = (props: MultiComboboxProps<SelectOptions>) => (
  <Combobox defaultItems={[
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
  ]} {...props} />
);
Multi.args = {
  labelText: "Multi Example",
  isMulti: true,
  isClearable: true,
  errorMessage: '',
}

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
  disabled: false,
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
  errorMessage: 'Please fix this error',
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
