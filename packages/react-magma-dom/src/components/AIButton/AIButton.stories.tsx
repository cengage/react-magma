import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';
import { SettingsIcon } from 'react-magma-icons';

import { ButtonGroup } from '../ButtonGroup';
import { Card, CardBody } from '../Card';
import { Spacer } from '../Spacer';
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
  <Card isInverse={args.isInverse}>
    <CardBody>
      <ButtonGroup>
        <AIButton {...args}>Variant A</AIButton>
        <AIButton variant={AIButtonVariant.variantB} {...args}>
          Variant B
        </AIButton>
      </ButtonGroup>
      <Spacer size={16} />
      <ButtonGroup>
        <AIButton {...args} />
        <AIButton variant={AIButtonVariant.variantB} {...args} />
      </ButtonGroup>
    </CardBody>
  </Card>
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
          isLoading={isLoading}
          onClick={() => setIsLoading(true)}
          {...args}
        >
          Save
        </AIButton>
        <AIButton
          isLoading={isLoadingIcon}
          onClick={() => setIsLoadingIcon(true)}
          {...args}
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
            <AIButton isAnimated variant={AIButtonVariant.variantA} {...args}>
              Animated Variant A
            </AIButton>
            <AIButton isAnimated variant={AIButtonVariant.variantB} {...args}>
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
              {...args}
            />
            <AIButton
              isAnimated
              aria-label="Animated Variant B"
              variant={AIButtonVariant.variantB}
              isInverse
              {...args}
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
      <AIButton leadingIcon aria-label="AI Button Icon Only" {...args} />

      {/* Custom Leading Icon */}
      <AIButton
        leadingIcon={<SettingsIcon />}
        aria-label="AI Button Custom Icon Only"
        {...args}
      />

      {/* Leading Icon + children */}
      <AIButton leadingIcon {...args}>
        Text with icon
      </AIButton>

      {/* Leading Icon = false */}
      <AIButton leadingIcon={false} {...args}>
        Text without icon
      </AIButton>

      {/* Leading Icon + Trailing Icon + children */}
      <AIButton leadingIcon trailingIcon={<SettingsIcon />} {...args}>
        Text with both icons
      </AIButton>

      {/* Leading Icon = false + Trailing Icon + children */}
      <AIButton leadingIcon={false} trailingIcon={<SettingsIcon />} {...args}>
        Text with trailing icon
      </AIButton>
    </ButtonGroup>
  );
};
