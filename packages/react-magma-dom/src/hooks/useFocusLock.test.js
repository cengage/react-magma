import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useFocusLock } from './useFocusLock';
import { Button } from '../components/Button';

const TEST_ID_BUTTON_OUTSIDE_MODAL = 'test-id-button-outside';
const TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL =
  'test-id-first-active-button-inside';
const TEST_ID_SECOND_ACTIVE_BUTTON_INSIDE_MODAL =
  'test-id-second-active-button-inside';
const TEST_ID_FIRST_DISABLED_BUTTON_INSIDE_MODAL =
  'test-id-first-disabled-button-inside';
const TEST_ID_SECOND_DISABLED_BUTTON_INSIDE_MODAL =
  'test-id-second-disabled-button-inside';

const OneActiveElemet = () => {
  const [showModal, setShowModal] = React.useState(false);
  const focus = useFocusLock(showModal);

  return (
    <>
      {showModal && (
        <div ref={focus}>
          <Button testId={TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL}>
            This is an active button
          </Button>
        </div>
      )}

      <Button
        onClick={() => setShowModal(!showModal)}
        testId={TEST_ID_BUTTON_OUTSIDE_MODAL}
      >
        Show Working Focus Lock Area
      </Button>
    </>
  );
};

const FirstElementIsDisabled = () => {
  const [showModal, setShowModal] = React.useState(false);
  const focus = useFocusLock(showModal);

  return (
    <>
      {showModal && (
        <div ref={focus}>
          <Button testId={TEST_ID_FIRST_DISABLED_BUTTON_INSIDE_MODAL} disabled>
            This is a disabled button
          </Button>
          <Button testId={TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL}>
            This is an active button
          </Button>
        </div>
      )}

      <Button
        onClick={() => setShowModal(!showModal)}
        testId={TEST_ID_BUTTON_OUTSIDE_MODAL}
      >
        Show Working Focus Lock Area
      </Button>
    </>
  );
};

const TwoActiveElemets = () => {
  const [showModal, setShowModal] = React.useState(false);
  const focus = useFocusLock(showModal);

  return (
    <>
      {showModal && (
        <div ref={focus}>
          <Button testId={TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL}>
            This is a first active button
          </Button>
          <Button testId={TEST_ID_SECOND_ACTIVE_BUTTON_INSIDE_MODAL}>
            This is a second active button
          </Button>
        </div>
      )}

      <Button
        onClick={() => setShowModal(!showModal)}
        testId={TEST_ID_BUTTON_OUTSIDE_MODAL}
      >
        Show Working Focus Lock Area
      </Button>
    </>
  );
};

const FirstAndLastElementsAreDisabled = () => {
  const [showModal, setShowModal] = React.useState(false);
  const focus = useFocusLock(showModal);

  return (
    <>
      {showModal && (
        <div ref={focus}>
          <Button testId={TEST_ID_FIRST_DISABLED_BUTTON_INSIDE_MODAL} disabled>
            This is a first disabled button
          </Button>
          <Button testId={TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL}>
            This is a first active button
          </Button>
          <Button testId={TEST_ID_SECOND_ACTIVE_BUTTON_INSIDE_MODAL}>
            This is a second active button
          </Button>
          <Button testId={TEST_ID_SECOND_DISABLED_BUTTON_INSIDE_MODAL} disabled>
            This is a second disabled button
          </Button>
        </div>
      )}

      <Button
        onClick={() => setShowModal(!showModal)}
        testId={TEST_ID_BUTTON_OUTSIDE_MODAL}
      >
        Show Working Focus Lock Area
      </Button>
    </>
  );
};

const OneDisabledElemet = () => {
  const [showModal, setShowModal] = React.useState(false);
  const bodyRef = React.useRef();
  const focus = useFocusLock(showModal, null, bodyRef);

  return (
    <>
      {showModal && (
        <div ref={focus}>
          <div ref={bodyRef}>
            <span>Test text</span>
            <Button
              testId={TEST_ID_FIRST_DISABLED_BUTTON_INSIDE_MODAL}
              disabled
            >
              This is a disabled button
            </Button>
          </div>
        </div>
      )}

      <Button
        onClick={() => setShowModal(!showModal)}
        testId={TEST_ID_BUTTON_OUTSIDE_MODAL}
      >
        Show Working Focus Lock Area
      </Button>
    </>
  );
};

describe('useFocusLock', () => {
  it('should focus on active element', () => {
    const { getByTestId } = render(<OneActiveElemet />);

    const buttonOutsideModal = getByTestId(TEST_ID_BUTTON_OUTSIDE_MODAL);

    expect(buttonOutsideModal).toBeInTheDocument();
    expect(() =>
      getByTestId(TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL)
    ).toThrow();

    userEvent.click(buttonOutsideModal);

    const activeButtonInsideModal = getByTestId(
      TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL
    );

    expect(activeButtonInsideModal).toBeInTheDocument();
    expect(activeButtonInsideModal).not.toBeDisabled();
    expect(activeButtonInsideModal).toHaveFocus();
  });

  it('should stay inside the modal after pressing tab if there is one active element', () => {
    const { getByTestId } = render(<OneActiveElemet />);

    const buttonOutsideModal = getByTestId(TEST_ID_BUTTON_OUTSIDE_MODAL);

    expect(buttonOutsideModal).toBeInTheDocument();
    expect(() =>
      getByTestId(TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL)
    ).toThrow();

    userEvent.click(buttonOutsideModal);

    const activeButtonInsideModal = getByTestId(
      TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL
    );

    expect(activeButtonInsideModal).toBeInTheDocument();
    expect(activeButtonInsideModal).not.toBeDisabled();
    expect(activeButtonInsideModal).toHaveFocus();

    userEvent.tab();

    expect(activeButtonInsideModal).toHaveFocus();
  });

  it('should focus on first active element if first element in the modal is disabled', () => {
    const { getByTestId } = render(<FirstElementIsDisabled />);

    const buttonOutsideModal = getByTestId(TEST_ID_BUTTON_OUTSIDE_MODAL);

    userEvent.click(buttonOutsideModal);

    const activeButtonInsideModal = getByTestId(
      TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL
    );
    const disabledButtonInsideModal = getByTestId(
      TEST_ID_FIRST_DISABLED_BUTTON_INSIDE_MODAL
    );

    expect(disabledButtonInsideModal).toBeInTheDocument();
    expect(disabledButtonInsideModal).toBeDisabled();
    expect(disabledButtonInsideModal).not.toHaveFocus();

    expect(activeButtonInsideModal).toBeInTheDocument();
    expect(activeButtonInsideModal).not.toBeDisabled();
    expect(activeButtonInsideModal).toHaveFocus();
  });

  it('should focus on last active element after shift + tab', () => {
    const { getByTestId } = render(<TwoActiveElemets />);

    const buttonOutsideModal = getByTestId(TEST_ID_BUTTON_OUTSIDE_MODAL);

    userEvent.click(buttonOutsideModal);

    const firstActiveButtonInsideModal = getByTestId(
      TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL
    );
    const secondActiveButtonInsideModal = getByTestId(
      TEST_ID_SECOND_ACTIVE_BUTTON_INSIDE_MODAL
    );

    expect(firstActiveButtonInsideModal).toBeInTheDocument();
    expect(firstActiveButtonInsideModal).not.toBeDisabled();
    expect(firstActiveButtonInsideModal).toHaveFocus();

    userEvent.tab({ shift: true });

    expect(firstActiveButtonInsideModal).not.toHaveFocus();
    expect(secondActiveButtonInsideModal).toBeInTheDocument();
    expect(secondActiveButtonInsideModal).not.toBeDisabled();
    expect(secondActiveButtonInsideModal).toHaveFocus();

    userEvent.tab({ shift: true });

    expect(secondActiveButtonInsideModal).not.toHaveFocus();
    expect(firstActiveButtonInsideModal).toHaveFocus();
  });
  it('should focus on first active element after last tab', () => {
    const { getByTestId } = render(<TwoActiveElemets />);

    const buttonOutsideModal = getByTestId(TEST_ID_BUTTON_OUTSIDE_MODAL);

    userEvent.click(buttonOutsideModal);

    const firstActiveButtonInsideModal = getByTestId(
      TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL
    );
    const secondActiveButtonInsideModal = getByTestId(
      TEST_ID_SECOND_ACTIVE_BUTTON_INSIDE_MODAL
    );

    expect(firstActiveButtonInsideModal).toBeInTheDocument();
    expect(firstActiveButtonInsideModal).not.toBeDisabled();
    expect(firstActiveButtonInsideModal).toHaveFocus();

    userEvent.tab();

    expect(firstActiveButtonInsideModal).not.toHaveFocus();
    expect(secondActiveButtonInsideModal).toBeInTheDocument();
    expect(secondActiveButtonInsideModal).not.toBeDisabled();
    expect(secondActiveButtonInsideModal).toHaveFocus();

    userEvent.tab();

    expect(secondActiveButtonInsideModal).not.toHaveFocus();
    expect(firstActiveButtonInsideModal).toHaveFocus();
  });

  it('should focus correctly if first and last elements are disabled', () => {
    const { getByTestId } = render(<FirstAndLastElementsAreDisabled />);

    const buttonOutsideModal = getByTestId(TEST_ID_BUTTON_OUTSIDE_MODAL);

    userEvent.click(buttonOutsideModal);

    const firstActiveButtonInsideModal = getByTestId(
      TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL
    );
    const secondActiveButtonInsideModal = getByTestId(
      TEST_ID_SECOND_ACTIVE_BUTTON_INSIDE_MODAL
    );
    const firstDisabledButtonInsideModal = getByTestId(
      TEST_ID_FIRST_DISABLED_BUTTON_INSIDE_MODAL
    );
    const secondDisabledButtonInsideModal = getByTestId(
      TEST_ID_SECOND_DISABLED_BUTTON_INSIDE_MODAL
    );

    expect(firstDisabledButtonInsideModal).toBeInTheDocument();
    expect(firstDisabledButtonInsideModal).toBeDisabled();
    expect(firstDisabledButtonInsideModal).not.toHaveFocus();

    expect(firstActiveButtonInsideModal).toBeInTheDocument();
    expect(firstActiveButtonInsideModal).not.toBeDisabled();
    expect(firstActiveButtonInsideModal).toHaveFocus();

    userEvent.tab();

    expect(firstActiveButtonInsideModal).not.toHaveFocus();

    expect(secondActiveButtonInsideModal).toBeInTheDocument();
    expect(secondActiveButtonInsideModal).not.toBeDisabled();
    expect(secondActiveButtonInsideModal).toHaveFocus();

    expect(secondDisabledButtonInsideModal).toBeInTheDocument();
    expect(secondDisabledButtonInsideModal).toBeDisabled();
    expect(secondDisabledButtonInsideModal).not.toHaveFocus();

    userEvent.tab();

    expect(secondActiveButtonInsideModal).not.toHaveFocus();
    expect(secondDisabledButtonInsideModal).not.toHaveFocus();
    expect(firstDisabledButtonInsideModal).not.toHaveFocus();
    expect(firstActiveButtonInsideModal).toHaveFocus();

    userEvent.tab({ shift: true });

    expect(firstActiveButtonInsideModal).not.toHaveFocus();
    expect(firstDisabledButtonInsideModal).not.toHaveFocus();
    expect(secondDisabledButtonInsideModal).not.toHaveFocus();
    expect(secondActiveButtonInsideModal).toHaveFocus();
  });

  it('should focus on last active element if there is no tabbable elements', () => {
    const { getByTestId, getByText } = render(<OneDisabledElemet />);

    const buttonOutsideModal = getByTestId(TEST_ID_BUTTON_OUTSIDE_MODAL);

    userEvent.click(buttonOutsideModal);

    const disabledButtonInsideModal = getByTestId(
      TEST_ID_FIRST_DISABLED_BUTTON_INSIDE_MODAL
    );

    expect(disabledButtonInsideModal).toBeInTheDocument();
    expect(disabledButtonInsideModal).toBeDisabled();
    expect(disabledButtonInsideModal).not.toHaveFocus();

    expect(getByText('Test text')).toHaveFocus();

    userEvent.tab();

    expect(getByText('Test text')).toHaveFocus();
  });
});
