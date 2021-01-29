import React from 'react';
import { Toast } from '.';
import { Button, ButtonSize } from '../Button';

export default {
  component: Toast,
  title: 'Toast',
};

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
