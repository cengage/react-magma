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

const Template: Story<ButtonProps> = args => <Button {...args}>Button</Button>;

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

export const Everything = () => {
  return (
    <>
      <Card>
        <CardBody>
          <p>
            <Button color={ButtonColor.primary} variant={ButtonVariant.solid}>
              Solid (default)
            </Button>
            <Button color={ButtonColor.primary} variant={ButtonVariant.outline}>
              Outline
            </Button>
            <Button color={ButtonColor.primary} variant={ButtonVariant.link}>
              Link
            </Button>
          </p>
          <p>
            <Button color={ButtonColor.secondary} variant={ButtonVariant.solid}>
              Solid (default)
            </Button>
            <Button
              color={ButtonColor.secondary}
              variant={ButtonVariant.outline}
            >
              Outline
            </Button>
            <Button color={ButtonColor.secondary} variant={ButtonVariant.link}>
              Link
            </Button>
          </p>
          <p>
            <Button color={ButtonColor.success} variant={ButtonVariant.solid}>
              Solid (default)
            </Button>
            <Button color={ButtonColor.success} variant={ButtonVariant.outline}>
              Outline
            </Button>
            <Button color={ButtonColor.success} variant={ButtonVariant.link}>
              Link
            </Button>
          </p>
          <p>
            <Button color={ButtonColor.danger} variant={ButtonVariant.solid}>
              Solid (default)
            </Button>
            <Button color={ButtonColor.danger} variant={ButtonVariant.outline}>
              Outline
            </Button>
            <Button color={ButtonColor.danger} variant={ButtonVariant.link}>
              Link
            </Button>
          </p>
          <p>
            <Button color={ButtonColor.marketing} variant={ButtonVariant.solid}>
              Solid (default)
            </Button>
            <Button
              color={ButtonColor.marketing}
              variant={ButtonVariant.outline}
            >
              Outline
            </Button>
            <Button color={ButtonColor.marketing} variant={ButtonVariant.link}>
              Link
            </Button>
          </p>
        </CardBody>
      </Card>
      <br />
      <Card isInverse>
        <CardBody>
          <p>
            <Button
              isInverse
              color={ButtonColor.primary}
              variant={ButtonVariant.solid}
            >
              Solid (default)
            </Button>
            <Button
              isInverse
              color={ButtonColor.primary}
              variant={ButtonVariant.outline}
            >
              Outline
            </Button>
            <Button
              isInverse
              color={ButtonColor.primary}
              variant={ButtonVariant.link}
            >
              Link
            </Button>
          </p>
          <p>
            <Button
              isInverse
              color={ButtonColor.secondary}
              variant={ButtonVariant.solid}
            >
              Solid (default)
            </Button>
            <Button
              isInverse
              color={ButtonColor.secondary}
              variant={ButtonVariant.outline}
            >
              Outline
            </Button>
            <Button
              isInverse
              color={ButtonColor.secondary}
              variant={ButtonVariant.link}
            >
              Link
            </Button>
          </p>
          <p>
            <Button
              isInverse
              color={ButtonColor.success}
              variant={ButtonVariant.solid}
            >
              Solid (default)
            </Button>
            <Button
              isInverse
              color={ButtonColor.success}
              variant={ButtonVariant.outline}
            >
              Outline
            </Button>
            <Button
              isInverse
              color={ButtonColor.success}
              variant={ButtonVariant.link}
            >
              Link
            </Button>
          </p>
          <p>
            <Button
              isInverse
              color={ButtonColor.danger}
              variant={ButtonVariant.solid}
            >
              Solid (default)
            </Button>
            <Button
              isInverse
              color={ButtonColor.danger}
              variant={ButtonVariant.outline}
            >
              Outline
            </Button>
            <Button
              isInverse
              color={ButtonColor.danger}
              variant={ButtonVariant.link}
            >
              Link
            </Button>
          </p>
          <p>
            <Button
              isInverse
              color={ButtonColor.marketing}
              variant={ButtonVariant.solid}
            >
              Solid (default)
            </Button>
            <Button
              isInverse
              color={ButtonColor.marketing}
              variant={ButtonVariant.outline}
            >
              Outline
            </Button>
            <Button
              isInverse
              color={ButtonColor.marketing}
              variant={ButtonVariant.link}
            >
              Link
            </Button>
          </p>
        </CardBody>
      </Card>
    </>
  );
};
