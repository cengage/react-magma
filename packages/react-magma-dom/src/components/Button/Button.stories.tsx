import React from 'react';

import { StoryFn, Meta } from '@storybook/react/types-6-0';

import { magma } from '../../theme/magma';
import { ButtonGroup } from '../ButtonGroup';
import { Card, CardBody } from '../Card';
import { VisuallyHidden } from '../VisuallyHidden';

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

const Template: StoryFn<ButtonProps> = args => (
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
    <Button {...args} color={ButtonColor.success}>
      Success
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
        color={ButtonColor.success}
      >
        Success
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

export const Default = {
  render: Template,

  args: {
    isInverse: false,
    isFullWidth: false,
    disabled: false,
  },
};

export const Disabled = {
  render: Template,

  args: {
    isInverse: false,
    isFullWidth: false,
    disabled: true,
  },
};

export const Inverse = {
  render: Template,

  args: {
    ...Default.args,
    isInverse: true,
  },

  decorators: [
    Story => (
      <Card background={magma.colors.primary600} isInverse>
        <CardBody>
          <Story />
        </CardBody>
      </Card>
    ),
  ],
};

export const InverseDisabled = {
  render: Template,

  args: {
    ...Default.args,
    disabled: true,
    isInverse: true,
  },

  decorators: [
    Story => (
      <Card background={magma.colors.primary600} isInverse>
        <CardBody>
          <Story />
        </CardBody>
      </Card>
    ),
  ],
};

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
            <Button color={ButtonColor.success}>Success Solid</Button>
            <Button color={ButtonColor.success} variant={ButtonVariant.link}>
              Success Link
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
            <Button color={ButtonColor.success} isInverse>
              Success Solid
            </Button>
            <Button
              color={ButtonColor.success}
              variant={ButtonVariant.link}
              isInverse
            >
              Success Link
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

export const LoadingButton = {
  render: args => {
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
  },
};
