import React from 'react';
import { IconButton } from '.';
import { SettingsIcon, NotificationsIcon } from 'react-magma-icons';
import {
  ButtonProps,
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonTextTransform,
  ButtonType,
  ButtonVariant,
} from '../Button';

import { Card } from '../Card';
import { CardBody } from '../Card/CardBody';
import { magma } from '../../theme/magma';
import { Story, Meta } from '@storybook/react/types-6-0';

const Template: Story<ButtonProps> = args => (
  <IconButton icon={<SettingsIcon />} {...args}>
    Button
  </IconButton>
);

export default {
  title: 'IconButton',
  component: IconButton,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ButtonColor,
      },
    },
    size: {
      control: {
        type: 'select',
        options: ButtonSize,
      },
    },
    variant: {
      control: {
        type: 'select',
        options: ButtonVariant,
      },
    },
    shape: {
      control: {
        type: 'select',
        options: ButtonShape,
      },
    },
    textTransform: {
      control: {
        type: 'select',
        options: ButtonTextTransform,
      },
    },
    type: {
      control: {
        type: 'select',
        options: ButtonType,
      },
    },
    isLoading: {
      control: {
        type: 'boolean',
      }
    },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  isInverse: false,
  isFullWidth: false,
  disabled: false,
  onClick: () => {},
};

export const Inverse = Template.bind({});
Inverse.args = {
  ...Default.args,
  isInverse: true,
};
Inverse.decorators = [
  Story => (
    <Card background={magma.colors.foundation} isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];

const IconOnlyTemplate: Story<ButtonProps> = args => (
  <IconButton icon={<NotificationsIcon />} aria-label="Button" {...args} />
);

export const IconOnly = IconOnlyTemplate.bind({});
IconOnly.args = {
  isInverse: false,
  isFullWidth: false,
  disabled: false,
  onClick: () => {},
};
