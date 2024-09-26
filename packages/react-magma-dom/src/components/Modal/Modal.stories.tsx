import React from 'react';
import { Modal, ModalSize, NativeSelect, Toggle, VisuallyHidden } from '../..';
import { Button, ButtonColor } from '../Button';
import { ButtonGroup, ButtonGroupAlignment } from '../ButtonGroup';
import { Combobox } from '../Combobox';
import { Container } from '../Container';
import { DatePicker } from '../DatePicker';
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownMenuItem,
} from '../Dropdown';
import { Paragraph } from '../Paragraph';
import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';
import { Select } from '../Select';
import { Spacer } from '../Spacer';

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
        <Paragraph noTopMargin>This is a modal, doing modal things.</Paragraph>
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

export const BackgroundCickDisabled = () => {
  const [showModal, setShowModal] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>();

  return (
    <>
      <Modal
        header="Modal Title"
        isBackgroundClickDisabled
        onClose={() => {
          setShowModal(false);
          buttonRef.current.focus();
        }}
        isOpen={showModal}
      >
        <Paragraph noTopMargin>This is a modal, doing modal things.</Paragraph>
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
        <Paragraph noTopMargin>This is a modal, doing modal things.</Paragraph>
        <Paragraph>
          This is <a href="/">linked text</a> in the modal
        </Paragraph>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Paragraph>
        <Paragraph>This is a modal, doing modal things.</Paragraph>
        <Paragraph>
          This is <a href="/"> some more linked text</a> in the modal
        </Paragraph>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Paragraph>
        <Paragraph>This is a modal, doing modal things.</Paragraph>
        <Paragraph>
          <Button>This is a button</Button>
        </Paragraph>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Paragraph>
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
              <Paragraph noTopMargin>Page one</Paragraph>
              <Paragraph>
                This is <a href="/">linked text</a> in the modal
              </Paragraph>
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
              <Spacer size={10} />
              <Button disabled={!goToNextPageEnabled} onClick={goToPage2}>
                Go to Page 2
              </Button>
            </>
          )}

          {page === 2 && (
            <>
              <Paragraph noTopMargin>Page two</Paragraph>
              <Paragraph>
                <Button color={ButtonColor.secondary}>Random button 1</Button>{' '}
                <Button color={ButtonColor.secondary}>Random button 2</Button>
              </Paragraph>
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
        ariaLabel="modalNoHeader"
        size={ModalSize.small}
        isCloseButtonHidden
        onClose={onModalNoFocusClose}
        isOpen={showModalNoFocus}
      >
        <Paragraph noTopMargin>
          This modal has no header and nothing focusable.
        </Paragraph>
        <Paragraph>
          Consider the usability implications before implementing a modal like
          this. A modal should have something actionable inside it.
        </Paragraph>
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
        isOpen={showModal}
      >
        <Paragraph noTopMargin>This is a modal, doing modal things.</Paragraph>
        <Paragraph>
          This is <a href="/">linked text</a> in the modal
        </Paragraph>
        <Paragraph>
          <Button>This is a button</Button>
        </Paragraph>
        <Paragraph>
          This is <a href="/"> some more linked text</a> in the modal
        </Paragraph>
        <Combobox
          id="comboboxId3"
          isMulti
          labelText="Multi Combobox"
          defaultItems={[
            { label: 'Red', value: 'red' },
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
          ]}
          placeholder="Hello"
        />
        <div>
          <DatePicker labelText="Pick a date" />
        </div>
        <Combobox
          id="comboboxId"
          isMulti
          labelText="Multi Combobox"
          defaultItems={[
            { label: 'Red', value: 'red' },
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
          ]}
          isClearable
        />
        <Paragraph>
          <Button onClick={() => setShowModal2(true)}>Show Modal 2</Button>
        </Paragraph>
      </Modal>
      <Button onClick={() => setShowModal(true)} ref={buttonRef}>
        Show Modal
      </Button>
      <Modal
        size={ModalSize.small}
        header="Modal 2 Title"
        onClose={() => setShowModal2(false)}
        isOpen={showModal2}
      >
        <Paragraph noTopMargin>This is modal 2</Paragraph>
        <NativeSelect fieldId="">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </NativeSelect>
        <Spacer size={10} />
        <Dropdown>
          <DropdownButton>Basic Dropdown</DropdownButton>
          <DropdownContent>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item number two</DropdownMenuItem>
            <DropdownMenuItem disabled>Disabled item</DropdownMenuItem>
          </DropdownContent>
        </Dropdown>
        <Spacer size={10} />
        <Combobox
          id="comboboxId2"
          labelText="Combobox"
          defaultItems={[
            { label: 'Red', value: 'red' },
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
          ]}
        />
        <Spacer size={10} />
        <Combobox
          id="comboboxId3"
          isMulti
          labelText="Multi Combobox"
          defaultItems={[
            { label: 'Red', value: 'red' },
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
          ]}
          placeholder="Hello"
        />
        <Spacer size={10} />
        <Select
          id="basicSelectId"
          labelText="Basic"
          items={[
            { label: 'Red', value: 'red' },
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
          ]}
        />
        <Spacer size={10} />
        <Select
          id="multiSelectId"
          isMulti
          labelText="Multi select"
          items={[
            { label: 'Red', value: 'red' },
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
            { label: 'Orange', value: 'orange' },
            { label: 'Aqua', value: 'aqua' },
            { label: 'Gold', value: 'gold' },
            { label: 'Periwinkle', value: 'periwinkle' },
            { label: 'Lavender', value: 'lavender' },
            { label: 'Marigold', value: 'marigold' },
            { label: 'Yellow', value: 'yellow' },
            { label: 'Purple', value: 'purple' },
            { label: 'Dusty Rose', value: 'dusty_rose' },
            { label: 'Burnt Sienna', value: 'burnt_sienna' },
          ]}
          initialSelectedItems={[
            { label: 'Red', value: 'red' },
            { label: 'Blue', value: 'blue' },
            { label: 'Blah', value: 'blah' },
          ]}
        />
        <Spacer size={10} />
      </Modal>
    </>
  );
};

export const CloseModalWithConfirmation = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const mainModalRef = React.useRef<HTMLDivElement>(null);
  const confirmationModalRef = React.useRef<HTMLDivElement>(null);
  const [mainHeaderRef, setmainHeaderRef] = React.useState(React.useRef<any>());

  const handleGetHeaderRef = ref => {
    setmainHeaderRef(ref);
  };

  const closeTheModal = () => {
    setShowConfirmationModal(true);
    confirmationModalRef.current?.focus();
  };

  const closeTheConfirmationModal = () => {
    mainHeaderRef?.current?.focus();
    setShowConfirmationModal(false);
  };

  const closeBothModals = () => {
    buttonRef.current?.focus();
    setShowConfirmationModal(false);
    setShowModal(false);
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)} ref={buttonRef}>
        Show Modal
      </Button>
      <Modal
        header="Modal Title"
        isModalClosingControlledManually
        onClose={closeTheModal}
        isOpen={showModal}
        ref={mainModalRef}
        headerRef={handleGetHeaderRef}
      >
        <Paragraph noTopMargin>This is a modal, doing modal things.</Paragraph>
        <Paragraph>
          This is <a href="/">linked text</a> in the modal
        </Paragraph>
        <Combobox
          id="comboboxId3"
          isMulti
          labelText="Multi Combobox"
          defaultItems={[
            { label: 'Red', value: 'red' },
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
          ]}
          placeholder="Hello"
        />
      </Modal>
      <Modal
        size={ModalSize.small}
        header="Confirmation Modal"
        isModalClosingControlledManually
        onClose={closeTheConfirmationModal}
        isOpen={showConfirmationModal}
        ref={confirmationModalRef}
      >
        <Paragraph noTopMargin>Close the modal?</Paragraph>
        <ButtonGroup>
          <Button onClick={closeBothModals}>Yes</Button>
          <Button onClick={closeTheConfirmationModal}>No, go back</Button>
        </ButtonGroup>
      </Modal>
    </>
  );
};

export const HeaderReference = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showDefaultModal, setShowDefaultModal] = React.useState(false);
  const [customHeadingRef, setCustomHeadingRef] = React.useState(
    React.useRef<any>()
  );

  const handleGetHeaderRef = ref => {
    setCustomHeadingRef(ref);
  };

  const onModalShow = () => {
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
  };

  const onModalShowDefault = () => {
    setShowDefaultModal(true);
  };

  const onModalCloseDefault = () => {
    setShowDefaultModal(false);
  };

  const onHeadingFocus = () => {
    customHeadingRef?.current?.focus();
  };

  return (
    <>
      {/* Custom Heading */}
      <Modal
        onClose={onModalClose}
        isOpen={showModal}
        headerRef={handleGetHeaderRef}
      >
        <h3 ref={customHeadingRef} tabIndex={-1}>
          Custom header using h3
        </h3>
        <Paragraph>
          Wicked pissah dolor sit amet, consectetur adipisicing elit. Blandit
          sagittae Suspendisse mus fah daze, candle pin Market Basket P-town. Id
          labore, TD Gahden consectetur morbi consectetur sketchy ad. Adipiscing
          postea kid kid. Dis dolor scriptorem frickin auctor eros Bunker Hill
          parturient. Suspendisse penatibus roast beef Bunker Hill. Orange Line,
          blandit consectetur nam cu no eget ne, clicker. Mauris vestibulum,
          augue Downtown Crossing, lectus half moon lorem. Scelerisque sketchy
          wicked smaht carriage down Cape no.
        </Paragraph>
        <ButtonGroup>
          <Button onClick={onHeadingFocus} color={ButtonColor.subtle}>
            Focus Heading
          </Button>
          <Button onClick={onModalClose}>Close</Button>
        </ButtonGroup>
      </Modal>

      {/* Default Heading */}
      <Modal
        onClose={onModalCloseDefault}
        isOpen={showDefaultModal}
        headerRef={handleGetHeaderRef}
        header="I am a default magma header"
      >
        <Paragraph>
          Wicked pissah dolor sit amet, consectetur adipisicing elit. Pike,
          sketchy sagittae, parturient est Fenway Park venenatis quo graeci
          stet. Habeo vehicula vis cum sed lectus pretium. Packie, Freedom
          Trail, Vivamus phaedrum pahk cah Green Monstah Southie Newbury Street.
          Gravida dis placerat sketchy carriage. Eum splendide Big Dig, Boston
          Tea Party Charles sagittae wicked pissah packie. Ipsum id scrod,
          sagittae I-90 chowdah frickin. Est ipsum rutrum, vis erat, ridens.
        </Paragraph>
        <ButtonGroup>
          <Button onClick={onHeadingFocus} color={ButtonColor.subtle}>
            Focus Heading
          </Button>
          <Button onClick={onModalCloseDefault}>Close</Button>
        </ButtonGroup>
      </Modal>

      <ButtonGroup>
        <Button onClick={onModalShow}>Show Custom Heading Modal</Button>
        <Button onClick={onModalShowDefault}>
          Show Modal with Default Heading
        </Button>
      </ButtonGroup>
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
        <Paragraph noTopMargin isInverse>
          This is an inverse modal, doing modal things.
        </Paragraph>
        <Paragraph>
          <Button isInverse>This is a button</Button>
        </Paragraph>
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
