import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';
import { SettingsIcon } from 'react-magma-icons';

import { magma } from '../../theme/magma';
import { ButtonGroup } from '../ButtonGroup';
import { Card, CardBody } from '../Card';
import { VisuallyHidden } from '../VisuallyHidden';

import {
  AIButtonProps,
  AIButton,
  AIButtonVariant,
  AIButtonSize,
  AIButtonShape,
  AIButtonTextTransform,
  AIButtonType,
} from '.';

const Template: Story<AIButtonProps> = args => (
  <>
    <AIButton {...args}>Variant A</AIButton>
    <AIButton {...args} variant={AIButtonVariant.variantB}>
      Variant B
    </AIButton>
    <p>
      <AIButton {...args} />
      <AIButton {...args} variant={AIButtonVariant.variantB} />
    </p>
  </>
);

export default {
  title: 'AIButton',
  component: AIButton,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: AIButtonSize,
      },
    },
    variant: {
      control: {
        type: 'select',
        options: AIButtonVariant,
      },
    },
    shape: {
      control: {
        type: 'select',
        options: AIButtonShape,
      },
    },
    textTransform: {
      control: {
        type: 'select',
        options: AIButtonTextTransform,
      },
    },
    type: {
      control: {
        type: 'select',
        options: AIButtonType,
      },
    },
    isLoading: {
      control: {
        type: 'boolean',
      },
    },
    isAnimated: {
      control: {
        type: 'boolean',
      },
    },
    leftColor: {
      control: {
        type: 'color',
      },
    },
    rightColor: {
      control: {
        type: 'color',
      },
    },
    hoverColor: {
      control: {
        type: 'color',
      },
    },
    pressedColor: {
      control: {
        type: 'color',
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
            <AIButton variant={AIButtonVariant.variantA}>Variant A</AIButton>
            <AIButton variant={AIButtonVariant.variantB}>Variant B</AIButton>
          </ButtonGroup>
        </CardBody>
      </Card>
      <Card isInverse>
        <CardBody>
          <ButtonGroup>
            <AIButton
              aria-label="Variant A"
              variant={AIButtonVariant.variantA}
              isInverse
            />
            <AIButton
              aria-label="Variant B"
              variant={AIButtonVariant.variantB}
              isInverse
            />
          </ButtonGroup>
        </CardBody>
      </Card>
    </>
  );
};

export const LoadingButton = args => {
  const [isLoading, setIsLoading] = React.useState(args.isLoading);
  const [isLoadingIcon, setIsLoadingIcon] = React.useState(args.isLoading);

  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    }
    if (isLoadingIcon) {
      setTimeout(() => {
        setIsLoadingIcon(false);
      }, 4000);
    }
  }, [isLoading, isLoadingIcon]);

  return (
    <>
      <p>Click the AIButton below to show the loading state</p>
      <VisuallyHidden>
        <span role="status">{isLoading ? 'Loading...' : 'Ready'}</span>
      </VisuallyHidden>
      <ButtonGroup>
        <AIButton
          {...args}
          isLoading={isLoading}
          onClick={() => setIsLoading(true)}
        >
          Save
        </AIButton>
        <AIButton
          {...args}
          isLoading={isLoadingIcon}
          onClick={() => setIsLoadingIcon(true)}
        />
      </ButtonGroup>
    </>
  );
};

export const AnimatedButtons = args => {
  return (
    <>
      <Card>
        <CardBody>
          <ButtonGroup>
            <AIButton isAnimated variant={AIButtonVariant.variantA}>
              Animated Variant A
            </AIButton>
            <AIButton isAnimated variant={AIButtonVariant.variantB}>
              Animated Variant B
            </AIButton>
          </ButtonGroup>
        </CardBody>
      </Card>
      <Card isInverse>
        <CardBody>
          <ButtonGroup>
            <AIButton
              isAnimated
              aria-label="Animated Variant A"
              variant={AIButtonVariant.variantA}
              isInverse
            />
            <AIButton
              isAnimated
              aria-label="Animated Variant B"
              variant={AIButtonVariant.variantB}
              isInverse
            />
          </ButtonGroup>
        </CardBody>
      </Card>
    </>
  );
};

export const AllCases = args => {
  return (
    <ButtonGroup>
      {/* Icon only*/}
      <AIButton leadingIcon aria-label="AI Button Icon Only" />

      {/* Custom Leading Icon */}
      <AIButton
        leadingIcon={<SettingsIcon />}
        aria-label="AI Button Custom Icon Only"
      />

      {/* Leading Icon + children */}
      <AIButton leadingIcon>Text with icon</AIButton>

      {/* Leading Icon = false */}
      <AIButton leadingIcon={false}>Text without icon</AIButton>

      {/* Leading Icon + Trailing Icon + children */}
      <AIButton leadingIcon trailingIcon={<SettingsIcon />}>
        Text with both icons
      </AIButton>

      {/* Leading Icon = false + Trailing Icon + children */}
      <AIButton leadingIcon={false} trailingIcon={<SettingsIcon />}>
        Text with trailing icon
      </AIButton>
    </ButtonGroup>
  );
};
