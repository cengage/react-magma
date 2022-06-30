import React from 'react';
import { Toast } from '.';
import { magma } from '../../theme/magma';
import { AlertVariant } from '../AlertBase';
import { Button, ButtonSize } from '../Button';
import { Hyperlink } from '../Hyperlink';

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
};

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
          now! Oh, and here's a <Hyperlink to="#">hyperlink</Hyperlink> for fun.
        </Toast>
      ) : null}
    </div>
  );
};
TwoLine.args = {
  ...Default.args,
};

export const MultiLine = args => {
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
        Show multiple line Toast
      </Button>
      {showToast ? (
        <Toast onDismiss={handleDismiss} {...args}>
          Toast with breaking lines of content which will appear right now! Also
          it's going to go all the way down here! I mean it! I really do!
        </Toast>
      ) : null}
    </div>
  );
};
MultiLine.args = {
  ...Default.args,
};
