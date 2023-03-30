import React from 'react';
import { Modal, ModalSize } from '.';
import { Button, ButtonColor } from '../Button';
import { VisuallyHidden } from '../VisuallyHidden';
import { Toggle } from '../Toggle';
import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';
import { DatePicker } from '../DatePicker';
import { ButtonGroup, ButtonGroupAlignment } from '../ButtonGroup';
import { Container } from '../Container';

const info = {
  component: Modal,
  title: 'Modal',
};

export default info;

export const Default = () => {
  const [showModal, setShowModal] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>();

  return (
    <>
      <Modal
        header="Modal Title"
        onClose={() => {
          setShowModal(false);
          buttonRef.current.focus();
        }}
        isOpen={showModal}
      >
        <p>This is a modal, doing modal things.</p>
        <ButtonGroup alignment={ButtonGroupAlignment.right}>
          <Button color={ButtonColor.secondary}>Cancel</Button>
          <Button>Save</Button>
        </ButtonGroup>
      </Modal>
      <Button onClick={() => setShowModal(true)} ref={buttonRef}>
        Show Modal
        <VisuallyHidden>(opens modal dialog)</VisuallyHidden>
      </Button>
    </>
  );
};

export const LongContentWithScrolling = () => {
  const [showModal, setShowModal] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>();

  const onModalShow = () => {
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
    buttonRef.current.focus();
  };

  return (
    <>
      <Modal header="Modal Title" onClose={onModalClose} isOpen={showModal}>
        <p>This is a modal, doing modal things.</p>
        <p>
          This is <a href="/">linked text</a> in the modal
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>This is a modal, doing modal things.</p>
        <p>
          This is <a href="/"> some more linked text</a> in the modal
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>This is a modal, doing modal things.</p>
        <p>
          <Button>This is a button</Button>
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Modal>
      <Button onClick={onModalShow} ref={buttonRef}>
        Show Modal
      </Button>
    </>
  );
};

export const RadioInModal = () => {
  const [showModal, setShowModal] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>();

  const onModalShow = () => {
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
    buttonRef.current.focus();
  };

  return (
    <>
      <Modal header="Modal Title" onClose={onModalClose} isOpen={showModal}>
        <RadioGroup labelText="Radio Buttons in Modal" name="modalExample">
          <Radio labelText="Option one label" value="1" />

          <Radio labelText="Option two label" value="2" />
        </RadioGroup>
      </Modal>
      <Button onClick={onModalShow} ref={buttonRef}>
        Show Modal
      </Button>
    </>
  );
};

export const ModalContentUpdate = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [showHidden, setShowHidden] = React.useState(false);
  const [goToNextPageEnabled, setGoToNextPageEnabled] = React.useState(true);
  const buttonRef = React.useRef<HTMLButtonElement>();

  const onModalShow = () => {
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
    buttonRef.current.focus();
  };

  const goToPage1 = () => {
    setPage(1);
  };

  const goToPage2 = () => {
    setPage(2);
  };

  const toggleHiddenStuff = () => {
    setShowHidden(!showHidden);
  };

  const toggleGoToNextPageEnabled = () => {
    setGoToNextPageEnabled(!goToNextPageEnabled);
  };

  return (
    <>
      <Modal header="Modal Title" onClose={onModalClose} isOpen={showModal}>
        <div id="attachToMe">
          {page === 1 && (
            <>
              <p>Page one</p>
              <p>
                This is <a href="/">linked text</a> in the modal
              </p>
              <Toggle
                checked={!goToNextPageEnabled}
                id="goToNextPageEnabled"
                labelText="Disable Go To Next Page"
                onClick={toggleGoToNextPageEnabled}
              />
              <Toggle
                checked={showHidden}
                id="showHiddenToggle"
                labelText="Show Hidden Stuff"
                onClick={toggleHiddenStuff}
              />

              {showHidden && <Button>Hidden Button</Button>}
              <Button disabled={!goToNextPageEnabled} onClick={goToPage2}>
                Go to Page 2
              </Button>
            </>
          )}

          {page === 2 && (
            <>
              <p>Page two</p>
              <p>
                <Button color={ButtonColor.secondary}>Random button 1</Button>{' '}
                <Button color={ButtonColor.secondary}>Random button 2</Button>
              </p>
              <Button onClick={goToPage1}>Go to Page 1</Button>
            </>
          )}
        </div>
      </Modal>
      <Button onClick={onModalShow} ref={buttonRef}>
        Show Modal
      </Button>
    </>
  );
};

export const NoHeaderOrFocusableContent = () => {
  const [showModalNoFocus, setShowModalNoFocus] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>();

  const onModalNoFocusShow = () => {
    setShowModalNoFocus(true);
  };

  const onModalNoFocusClose = () => {
    setShowModalNoFocus(false);
    buttonRef.current.focus();
  };

  return (
    <>
      <Modal
        size={ModalSize.small}
        isCloseButtonHidden
        onClose={onModalNoFocusClose}
        isOpen={showModalNoFocus}
      >
        <p>This modal has no header and nothing focusable.</p>
        <p>
          Consider the usability implications before implementing a modal like
          this this. A modal should have something actionable inside it.
        </p>
      </Modal>
      <Button onClick={onModalNoFocusShow} ref={buttonRef}>
        Show Modal with nothing focusable
      </Button>
    </>
  );
};

export const ModalInAModal = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>();

  return (
    <>
      <Modal
        header="Modal Title"
        onClose={() => {
          setShowModal(false);
          buttonRef.current.focus();
        }}
        id="First Modal"
        isOpen={showModal}
      >
        <p>This is a modal, doing modal things.</p>
        <p>
          This is <a href="/">linked text</a> in the modal
        </p>
        <p>
          <Button>This is a button</Button>
        </p>
        <p>
          This is <a href="/"> some more linked text</a> in the modal
        </p>
        <div>
          <DatePicker labelText="Pick a date" />
        </div>
        <p>
          <Button onClick={() => setShowModal2(true)}>Show Modal 2</Button>
        </p>

        <Modal
          size={ModalSize.small}
          header="Modal 2 Title"
          onClose={() => setShowModal2(false)}
          id="Second Modal"
          isOpen={showModal2}
        >
          <p>This is modal 2</p>
        </Modal>
      </Modal>
      <Button onClick={() => setShowModal(true)} ref={buttonRef}>
        Show Modal
      </Button>
    </>
  );
};

export const Inverse = () => {
  const [showModal, setShowModal] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>();

  return (
    <>
      <Modal
        header="Modal Title"
        onClose={() => {
          setShowModal(false);
          buttonRef.current.focus();
        }}
        isOpen={showModal}
        isInverse
      >
        <p>This is an inverse modal, doing modal things.</p>
        <p>
          <Button isInverse>This is a button</Button>
        </p>
      </Modal>
      <Container isInverse style={{ padding: '12px' }}>
        <Button onClick={() => setShowModal(true)} ref={buttonRef} isInverse>
          Show Modal
          <VisuallyHidden>(opens modal dialog)</VisuallyHidden>
        </Button>
      </Container>
    </>
  );
};
