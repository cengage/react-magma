import React from 'react';
import { Modal } from '.';
import { Button } from '../Button';
import { VisuallyHidden } from '../VisuallyHidden';

export default {
  component: Modal,
  title: 'Modal',
};

export const Default = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <Modal
        header="Modal Title"
        onClose={() => setShowModal(false)}
        isOpen={showModal}
      >
        <p>This is a modal, doing modal things.</p>
        <p>
          <Button>This is a button</Button>
        </p>
      </Modal>
      <Button onClick={() => setShowModal(true)}>
        Show Modal
        <VisuallyHidden>(opens modal dialog)</VisuallyHidden>
      </Button>
    </>
  );
};
