import React from 'react';
import { Toast } from '.';
import { Button, ButtonSize } from '../Button';
import { Meta } from '@storybook/react';

const meta: Meta = {
  component: Toast,
  title: 'Toast',
};

export default meta;

export const Default = () => {
  const [showToast, setShowToast] = React.useState(false);

  function handleClick() {
    setShowToast(true);
  }

  function handleDismiss() {
    setShowToast(false);
  }

  return (
    <>
      <Button size={ButtonSize.small} onClick={handleClick}>
        Show Default Toast
      </Button>
      {showToast ? (
        <Toast onDismiss={handleDismiss}>Default Toast</Toast>
      ) : null}
    </>
  );
};
