import React from 'react';
import { IconButton, IconButtonProps } from '.';
import { Global, css } from '@emotion/react';
import { SettingsIcon, NotificationsIcon, ExpandMoreIcon } from 'react-magma-icons';
import {
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonTextTransform,
  ButtonType,
  ButtonVariant,
} from '../Button';

import { Card } from '../Card';
import { CardBody } from '../Card/CardBody';
import { Story, Meta } from '@storybook/react/types-6-0';

const Template: Story<IconButtonProps> = args => (
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

export const Default = Template.bind({});
Default.argTypes = {
  textTransform: {
    control: {
      type: 'select',
      options: ButtonTextTransform,
    },
  },
};

Default.args = {
  isInverse: false,
  isFullWidth: false,
  disabled: false,
};

export const Inverse = Template.bind({});
Inverse.argTypes = {
  textTransform: {
    control: {
      type: 'select',
      options: ButtonTextTransform,
    },
  },
};

Inverse.args = {
  ...Default.args,
  isInverse: true,
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

const IconOnlyTemplate: Story<IconButtonProps> = args => (
  <IconButton icon={<NotificationsIcon />} aria-label="Button" {...args} />
);

export const IconOnly = IconOnlyTemplate.bind({});

IconOnly.args = {
  isInverse: false,
  disabled: false,
  onClick: () => {},
};

const AnimatedIconTemplate: Story<IconButtonProps> = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <>
      <Global styles={css`
        .animated-icon-button svg {
          transition: transform 200ms;
        }
        
        .animated-icon-button.expanded svg {
          transform: rotate(180deg);
        }
      `} />
      <IconButton
        icon={<ExpandMoreIcon />}
        aria-label="Button"
        className={expanded ? 'animated-icon-button expanded' : 'animated-icon-button'}
        onClick={() => setExpanded(state => !state)}
        {...props}
      />
    </>
  );
};

export const AnimatedIcon = AnimatedIconTemplate.bind({});
AnimatedIcon.args = {
  isInverse: false,
  disabled: false,
};
