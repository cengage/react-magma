import React from 'react';
import { Toast } from '.';
import { magma } from '../../theme/magma';
import { AlertVariant } from '../AlertBase';
import { Button, ButtonSize } from '../Button';
import { Hyperlink } from '../Hyperlink';
import { Meta } from '@storybook/react/types-6-0';

export default {
  component: Toast,
  title: 'Toast',
  argTypes: {
    isInverse: {
      control: {
        type: 'boolean',
      },
    },
    disableAutoDismiss: {
      control: {
        type: 'boolean',
      },
    },
    toastDuration: {
      control: {
        type: 'number',
      },
    },
    variant: {
      control: {
        type: 'select',
        options: AlertVariant,
      },
    },
  },
} as Meta;

export const Default = args => {
  const [showToast, setShowToast] = React.useState(false);

  function handleClick() {
    setShowToast(true);
  }

  function handleDismiss() {
    setShowToast(false);
  }

  return (
    <div
      style={{ background: args.isInverse ? magma.colors.primary600 : 'none' }}
    >
      <Button
        size={ButtonSize.small}
        onClick={handleClick}
        isInverse={args.isInverse}
      >
        Show Default Toast
      </Button>
      {showToast ? (
        <Toast onDismiss={handleDismiss} {...args}>
          Default Toast
        </Toast>
      ) : null}
    </div>
  );
};
Default.args = {
  variant: AlertVariant.info,
  toastDuration: 5000,
  disableAutoDismiss: false,
  isInverse: false,
};

export const TwoLine = args => {
  const [showToast, setShowToast] = React.useState(false);

  function handleClick() {
    setShowToast(true);
  }

  function handleDismiss() {
    setShowToast(false);
  }

  return (
    <div
      style={{ background: args.isInverse ? magma.colors.primary600 : 'none' }}
    >
      <Button
        size={ButtonSize.small}
        onClick={handleClick}
        isInverse={args.isInverse}
      >
        Show two line Toast
      </Button>
      {showToast ? (
        <Toast onDismiss={handleDismiss} {...args}>
          Toast with a breaking line of content which will appear exactly right
          now! Oh, and here is a <Hyperlink to="#">hyperlink</Hyperlink> for fun.
        </Toast>
      ) : null}
    </div>
  );
};
TwoLine.args = {
  ...Default.args,
};
