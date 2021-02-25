import React from 'react';
import { Input, InputProps } from '.';
import { InputIconPosition, InputSize, InputType } from '../InputBase';
import { Story, Meta } from '@storybook/react/types-6-0';
import { NotificationsIcon } from 'react-magma-icons';

const Template: Story<InputProps> = args => (
  <Input {...args} labelText="Example" />
);

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    inputSize: {
      control: {
        type: 'select',
        options: InputSize,
      },
    },
  },
  errorMessage: '',
} as Meta;

export const Default = Template.bind({});
Default.args = {};

export const Error = Template.bind({});
Error.args = {
  errorMessage: 'Please correct this error',
};

export const File = Template.bind({});
File.args = {
  type: InputType.file,
};

export const Large = Template.bind({});
Large.args = {
  inputSize: InputSize.large,
};

export const IconLeft = Template.bind({});
IconLeft.args = {
  ...Default.args,
  icon: <NotificationsIcon />,
};

export const IconLeftLarge = Template.bind({});
IconLeftLarge.args = {
  ...IconLeft.args,
  inputSize: InputSize.large,
};

export const IconRight = Template.bind({});
IconRight.args = {
  ...Default.args,
  icon: <NotificationsIcon />,
  iconPosition: InputIconPosition.right,
};

export const IconRightLarge = Template.bind({});
IconRightLarge.args = {
  ...IconRight.args,
  inputSize: InputSize.large,
};

export const ClickableIcon = Template.bind({});
ClickableIcon.args = {
  ...Default.args,
  icon: <NotificationsIcon />,
  onIconClick: () => {},
};

export const ClickableIconLarge = Template.bind({});
ClickableIconLarge.args = {
  ...ClickableIcon.args,
  inputSize: InputSize.large,
};
