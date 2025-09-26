import React from 'react';

import { css, Global } from '@emotion/react';
import { Meta, StoryFn } from '@storybook/react/types-6-0';
import {
  ExpandMoreIcon,
  NotificationsIcon,
  SettingsIcon,
} from 'react-magma-icons';

import {
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonTextTransform,
  ButtonType,
  ButtonVariant,
} from '../Button';
import { Card, CardBody } from '../Card';

import { ButtonIconPosition, IconButton, IconButtonProps } from '.';

const Template: StoryFn<IconButtonProps> = args => (
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

  argTypes: {
    textTransform: {
      control: {
        type: 'select',
        options: ButtonTextTransform,
      },
    },
  },

  args: {
    isInverse: false,
    isFullWidth: false,
    disabled: false,
  },
};

export const Inverse = {
  render: Template,

  argTypes: {
    textTransform: {
      control: {
        type: 'select',
        options: ButtonTextTransform,
      },
    },
  },

  args: {
    ...Default.args,
    isInverse: true,
  },

  decorators: [
    Story => (
      <Card isInverse>
        <CardBody>
          <Story />
        </CardBody>
      </Card>
    ),
  ],
};

const IconOnlyTemplate: StoryFn<IconButtonProps> = args => (
  <IconButton icon={<NotificationsIcon />} aria-label="Button" {...args} />
);

export const IconOnly = {
  render: IconOnlyTemplate,

  args: {
    isInverse: false,
    disabled: false,
    onClick: () => {},
  },
};

const AnimatedIconTemplate: StoryFn<IconButtonProps> = props => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <>
      <Global
        styles={css`
          .animated-icon-button svg {
            transition: transform 200ms;
          }

          .animated-icon-button.expanded svg {
            transform: rotate(180deg);
          }
        `}
      />
      <IconButton
        icon={<ExpandMoreIcon />}
        aria-label="Button"
        className={
          expanded ? 'animated-icon-button expanded' : 'animated-icon-button'
        }
        onClick={() => setExpanded(state => !state)}
        {...props}
      />
    </>
  );
};

export const AnimatedIcon = {
  render: AnimatedIconTemplate,

  args: {
    isInverse: false,
    disabled: false,
  },
};

const LeadingIconTemplate: StoryFn<IconButtonProps> = args => (
  <IconButton
    iconPosition={ButtonIconPosition.right}
    icon={<SettingsIcon />}
    leadingIcon={<NotificationsIcon />}
    aria-label="Button"
    {...args}
  >
    Leading Icon
  </IconButton>
);

export const LeadingIcon = {
  render: LeadingIconTemplate,
};
