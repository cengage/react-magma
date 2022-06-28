import React from 'react';
import { Input, InputProps } from '.';
import { InputIconPosition, InputSize, InputType } from '../InputBase';
import { Story, Meta } from '@storybook/react/types-6-0';
import { HelpIcon, NotificationsIcon } from 'react-magma-icons';
import { Card, CardBody } from '../Card';

const Template: Story<InputProps> = args => (
  <Input {...args} labelText="Example" />
);

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    iconPosition: {
      control: {
        type: 'select',
        options: InputIconPosition,
      },
    },
    inputSize: {
      control: {
        type: 'select',
        options: InputSize,
      },
    },
    isClearable: {
      control: {
        type: 'boolean',
      },
    },
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
  },
  errorMessage: '',
} as Meta;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  helperMessage: 'Helper message',
  placeholder: 'Placeholder text...',
};
Default.parameters = { controls: { exclude: ['iconPosition'] } };

export const Error = Template.bind({});
Error.args = {
  errorMessage: 'Please correct this error',
};

export const Large = Template.bind({});
Large.args = {
  inputSize: InputSize.large,
};

export const File = Template.bind({});
File.args = {
  type: InputType.file,
};

export const IconTop = Template.bind({});
IconTop.args = {
  ...Default.args,
  icon: <HelpIcon />,
  iconPosition: InputIconPosition.top,
};

export const IconTopLarge = Template.bind({});
IconTopLarge.args = {
  ...Default.args,
  icon: <HelpIcon />,
  inputSize: InputSize.large,
  iconPosition: InputIconPosition.top,
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

export const Inverse = Template.bind({});
Inverse.args = {
  ...Default.args,
  isInverse: true,
  errorMessage: '',
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
