import React from 'react';
import {
  Button,
  ButtonProps,
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonTextTransform,
  ButtonType,
  ButtonVariant,
} from '.';
import { Card, CardBody } from '../Card';
import { magma } from '../../theme/magma';
import { Story, Meta } from '@storybook/react/types-6-0';

const Template: Story<ButtonProps> = args => (
  <>
    <Button {...args}>Default</Button>
    <Button {...args} color={ButtonColor.secondary}>
      Secondary
    </Button>
    <Button {...args} color={ButtonColor.danger}>
      Danger
    </Button>
    <Button {...args} color={ButtonColor.marketing}>
      Marketing
    </Button>
    <p>
      <Button variant={ButtonVariant.link} {...args}>
        Default
      </Button>
      <Button
        variant={ButtonVariant.link}
        {...args}
        color={ButtonColor.secondary}
      >
        Secondary
      </Button>
      <Button variant={ButtonVariant.link} {...args} color={ButtonColor.danger}>
        Danger
      </Button>
      <Button
        variant={ButtonVariant.link}
        {...args}
        color={ButtonColor.marketing}
      >
        Marketing
      </Button>
    </p>
  </>
);

export default {
  title: 'Button',
  component: Button,
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
      },
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

export const Disabled = Template.bind({});
Disabled.args = {
  isInverse: false,
  isFullWidth: false,
  disabled: true,
  onClick: () => {},
};

export const Inverse = Template.bind({});
Inverse.args = {
  ...Default.args,
  isInverse: true,
};

export const InverseDisabled = Template.bind({});
InverseDisabled.args = {
  ...Default.args,
  disabled: true,
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

InverseDisabled.decorators = [
  Story => (
    <Card background={magma.colors.foundation} isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];
