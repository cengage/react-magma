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

export const TwoLine = () => {
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
        Show two line Toast
      </Button>
      {showToast ? (
        <Toast onDismiss={handleDismiss}>
          Toast with a breaking line of content which will appear exactly right
          now!
        </Toast>
      ) : null}
    </>
  );
};

export const MultiLine = () => {
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
        Show multiple line Toast
      </Button>
      {showToast ? (
        <Toast onDismiss={handleDismiss}>
          Toast with breaking lines of content which will appear right now! Also
          it's going to go all the way down here! I mean it! I really do!
        </Toast>
      ) : null}
    </>
  );
};
