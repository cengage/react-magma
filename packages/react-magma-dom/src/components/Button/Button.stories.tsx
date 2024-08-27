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
import { ButtonGroup } from '../ButtonGroup';
import { VisuallyHidden } from '../VisuallyHidden';

const Template: Story<ButtonProps> = args => (
  <>
    <Button {...args}>Default</Button>
    <Button {...args} color={ButtonColor.secondary}>
      Secondary
    </Button>
    <Button {...args} color={ButtonColor.subtle}>
      Subtle
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
      <Button variant={ButtonVariant.link} {...args} color={ButtonColor.subtle}>
        Subtle
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
    onClick: { action: 'clicked' },
  },
} as Meta;

export const Default = Template.bind({});
Default.args = {
  isInverse: false,
  isFullWidth: false,
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  isInverse: false,
  isFullWidth: false,
  disabled: true,
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
    <Card background={magma.colors.primary600} isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];

InverseDisabled.decorators = [
  Story => (
    <Card background={magma.colors.primary600} isInverse>
      <CardBody>
        <Story />
      </CardBody>
    </Card>
  ),
];

export const All = () => {
  return (
    <>
      <Card>
        <CardBody>
          <ButtonGroup>
            <Button color={ButtonColor.primary}>Primary Solid</Button>
            <Button color={ButtonColor.primary} variant={ButtonVariant.link}>
              Primary Link
            </Button>
            <Button color={ButtonColor.secondary}>Secondary Solid</Button>
            <Button color={ButtonColor.secondary} variant={ButtonVariant.link}>
              Secondary Link
            </Button>
          </ButtonGroup>
        </CardBody>
      </Card>
      <Card isInverse>
        <CardBody>
          <ButtonGroup>
            <Button color={ButtonColor.primary} isInverse>
              Primary Solid
            </Button>
            <Button
              color={ButtonColor.primary}
              variant={ButtonVariant.link}
              isInverse
            >
              Primary Link
            </Button>
            <Button color={ButtonColor.secondary} isInverse>
              Secondary Solid
            </Button>
            <Button
              color={ButtonColor.secondary}
              variant={ButtonVariant.link}
              isInverse
            >
              Secondary Link
            </Button>
          </ButtonGroup>
        </CardBody>
      </Card>
      <br />
      <Card>
        <CardBody>
          <ButtonGroup>
            <Button color={ButtonColor.subtle}>Subtle Solid</Button>
            <Button color={ButtonColor.subtle} variant={ButtonVariant.link}>
              Subtle Link
            </Button>
          </ButtonGroup>
        </CardBody>
      </Card>
      <Card isInverse>
        <CardBody>
          <ButtonGroup>
            <Button color={ButtonColor.subtle} isInverse>
              Subtle Solid
            </Button>
            <Button
              color={ButtonColor.subtle}
              variant={ButtonVariant.link}
              isInverse
            >
              Subtle Link
            </Button>
          </ButtonGroup>
        </CardBody>
      </Card>
      <br />
      <Card>
        <CardBody>
          <ButtonGroup>
            <Button color={ButtonColor.danger}>Danger Solid</Button>
            <Button color={ButtonColor.danger} variant={ButtonVariant.link}>
              Danger Link
            </Button>
            <Button color={ButtonColor.marketing}>Marketing Solid</Button>
            <Button color={ButtonColor.marketing} variant={ButtonVariant.link}>
              Marketing Link
            </Button>
          </ButtonGroup>
        </CardBody>
      </Card>
      <Card isInverse>
        <CardBody>
          <ButtonGroup>
            <Button color={ButtonColor.danger} isInverse>
              Danger Solid
            </Button>
            <Button
              color={ButtonColor.danger}
              variant={ButtonVariant.link}
              isInverse
            >
              Danger Link
            </Button>
            <Button color={ButtonColor.marketing} isInverse>
              Marketing Solid
            </Button>
            <Button
              color={ButtonColor.marketing}
              variant={ButtonVariant.link}
              isInverse
            >
              Marketing Link
            </Button>
          </ButtonGroup>
        </CardBody>
      </Card>
    </>
  );
};

export const LoadingButton = args => {
  const [isLoading, setIsLoading] = React.useState(args.isLoading);
  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    }
  }, [isLoading]);

  return (
    <>
      <p>Click the button below to show the loading state</p>
      <VisuallyHidden>
        <span role="status">{isLoading ? 'Loading...' : 'Ready'}</span>
      </VisuallyHidden>
      <ButtonGroup>
        <Button
          {...args}
          isLoading={isLoading}
          onClick={() => setIsLoading(true)}
        >
          Save
        </Button>
      </ButtonGroup>
    </>
  );
};
