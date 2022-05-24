import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import {
  ButtonGroup,
  ButtonGroupOrientation,
  ButtonGroupAlignment,
  ButtonGroupProps,
} from '.';
import { Button, ButtonColor } from '../Button';

const Template: Story<ButtonGroupProps> = args => (
  <ButtonGroup {...args}>
    <Button>Rate Now</Button>
    <Button>No, Thanks</Button>
    <Button color={ButtonColor.secondary}>Remind Me Later</Button>
  </ButtonGroup>
);

export default {
  component: ButtonGroup,
  title: 'ButtonGroup',
  argTypes: {
    noSpace: {
      control: {
        type: 'boolean',
      },
    },
    alignment: {
      control: {
        type: 'select',
        options: ButtonGroupAlignment,
      },
    },
    orientation: {
      control: {
        type: 'select',
        options: ButtonGroupOrientation,
      },
    },
  },
};

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  orientation: ButtonGroupOrientation.horizontal,
  noSpace: false,
};
