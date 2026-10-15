import React from 'react';

import { fireEvent, render, waitFor } from '@testing-library/react';
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
const TEST_ID_HIDDEN_BUTTON_INSIDE_MODAL = 'test-id-hidden-button-inside';

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

const LastElementsAreHiddenByAncestor = () => {
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
            This is a last visible button
          </Button>
          <div style={{ display: 'none' }}>
            <Button testId={TEST_ID_HIDDEN_BUTTON_INSIDE_MODAL}>
              This is a button hidden by an ancestor
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

const NestedFocusLocks = () => {
  const [showInner, setShowInner] = React.useState(false);
  const outerFocus = useFocusLock(true);
  const innerFocus = useFocusLock(showInner);

  return (
    <div ref={outerFocus}>
      <Button
        onClick={() => setShowInner(true)}
        testId={TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL}
      >
        Open inner lock
      </Button>
      {showInner && (
        <div ref={innerFocus}>
          <Button testId="test-id-inner-first">Inner first</Button>
          <Button testId="test-id-inner-last">Inner last</Button>
        </div>
      )}
    </div>
  );
};

const TEST_ID_INPUT_INSIDE_MODAL = 'test-id-input-inside';
const TEST_ID_SUBMIT_BUTTON_INSIDE_MODAL = 'test-id-submit-button-inside';

/**
 * Emulates the browser moving focus to `<body>`, which jsdom does not do for disabled elements.
 */
const dropFocusToBody = element => {
  if (document.activeElement !== element) {
    return;
  }

  const temp = document.createElement('button');

  document.body.appendChild(temp);
  temp.focus();
  temp.remove();
};

const SubmitButtonBecomesDisabled = ({ withHeader = false }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const headerRef = React.useRef();
  const focus = useFocusLock(true, withHeader ? headerRef : undefined);

  return (
    <>
      <Button testId={TEST_ID_BUTTON_OUTSIDE_MODAL}>Outside the lock</Button>
      <div ref={focus}>
        {withHeader && (
          <h2 ref={headerRef} tabIndex={-1}>
            Lock heading
          </h2>
        )}
        <input data-testid={TEST_ID_INPUT_INSIDE_MODAL} aria-label="Name" />
        <Button
          testId={TEST_ID_SUBMIT_BUTTON_INSIDE_MODAL}
          disabled={isSubmitting}
          onClick={() => setIsSubmitting(true)}
        >
          Submit
        </Button>
        <Button>Cancel</Button>
      </div>
    </>
  );
};

const NestedLockWithDisablingButton = () => {
  const [isDisabled, setIsDisabled] = React.useState(false);
  const outerFocus = useFocusLock(true);
  const innerFocus = useFocusLock(true);

  return (
    <div ref={outerFocus}>
      <Button testId="test-id-outer-button">Outer button</Button>
      <div ref={innerFocus}>
        <Button testId="test-id-inner-first">Inner first</Button>
        <Button
          testId="test-id-inner-disabling"
          disabled={isDisabled}
          onClick={() => setIsDisabled(true)}
        >
          Inner disabling
        </Button>
      </div>
    </div>
  );
};

describe('useFocusLock', () => {
  it('should focus on active element', async () => {
    const { getByTestId } = render(<OneActiveElemet />);

    const buttonOutsideModal = getByTestId(TEST_ID_BUTTON_OUTSIDE_MODAL);

    expect(buttonOutsideModal).toBeInTheDocument();
    expect(() =>
      getByTestId(TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL)
    ).toThrow();

    await userEvent.click(buttonOutsideModal);

    const activeButtonInsideModal = getByTestId(
      TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL
    );

    expect(activeButtonInsideModal).toBeInTheDocument();
    expect(activeButtonInsideModal).not.toBeDisabled();
    await waitFor(() => expect(activeButtonInsideModal).toHaveFocus());
  });

  it('should stay inside the modal after pressing tab if there is one active element', async () => {
    const { getByTestId } = render(<OneActiveElemet />);

    const buttonOutsideModal = getByTestId(TEST_ID_BUTTON_OUTSIDE_MODAL);

    expect(buttonOutsideModal).toBeInTheDocument();
    expect(() =>
      getByTestId(TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL)
    ).toThrow();

    await userEvent.click(buttonOutsideModal);

    const activeButtonInsideModal = getByTestId(
      TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL
    );

    expect(activeButtonInsideModal).toBeInTheDocument();
    expect(activeButtonInsideModal).not.toBeDisabled();
    await waitFor(() => expect(activeButtonInsideModal).toHaveFocus());

    await userEvent.tab();

    expect(activeButtonInsideModal).toHaveFocus();
  });

  it('should focus on first active element if first element in the modal is disabled', async () => {
    const { getByTestId } = render(<FirstElementIsDisabled />);

    const buttonOutsideModal = getByTestId(TEST_ID_BUTTON_OUTSIDE_MODAL);

    await userEvent.click(buttonOutsideModal);

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
    await waitFor(() => expect(activeButtonInsideModal).toHaveFocus());
  });

  it('should focus on last active element after shift + tab', async () => {
    const { getByTestId } = render(<TwoActiveElemets />);

    const buttonOutsideModal = getByTestId(TEST_ID_BUTTON_OUTSIDE_MODAL);

    await userEvent.click(buttonOutsideModal);

    const firstActiveButtonInsideModal = getByTestId(
      TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL
    );
    const secondActiveButtonInsideModal = getByTestId(
      TEST_ID_SECOND_ACTIVE_BUTTON_INSIDE_MODAL
    );

    expect(firstActiveButtonInsideModal).toBeInTheDocument();
    expect(firstActiveButtonInsideModal).not.toBeDisabled();
    await waitFor(() => expect(firstActiveButtonInsideModal).toHaveFocus());

    await userEvent.tab({ shift: true });

    expect(firstActiveButtonInsideModal).not.toHaveFocus();
    expect(secondActiveButtonInsideModal).toBeInTheDocument();
    expect(secondActiveButtonInsideModal).not.toBeDisabled();
    expect(secondActiveButtonInsideModal).toHaveFocus();

    await userEvent.tab({ shift: true });

    expect(secondActiveButtonInsideModal).not.toHaveFocus();
    expect(firstActiveButtonInsideModal).toHaveFocus();
  });

  it('should focus on first active element after last tab', async () => {
    const { getByTestId } = render(<TwoActiveElemets />);

    const buttonOutsideModal = getByTestId(TEST_ID_BUTTON_OUTSIDE_MODAL);

    await userEvent.click(buttonOutsideModal);

    const firstActiveButtonInsideModal = getByTestId(
      TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL
    );
    const secondActiveButtonInsideModal = getByTestId(
      TEST_ID_SECOND_ACTIVE_BUTTON_INSIDE_MODAL
    );

    expect(firstActiveButtonInsideModal).toBeInTheDocument();
    expect(firstActiveButtonInsideModal).not.toBeDisabled();
    await waitFor(() => expect(firstActiveButtonInsideModal).toHaveFocus());

    await userEvent.tab();

    expect(firstActiveButtonInsideModal).not.toHaveFocus();
    expect(secondActiveButtonInsideModal).toBeInTheDocument();
    expect(secondActiveButtonInsideModal).not.toBeDisabled();
    expect(secondActiveButtonInsideModal).toHaveFocus();

    await userEvent.tab();

    expect(secondActiveButtonInsideModal).not.toHaveFocus();
    expect(firstActiveButtonInsideModal).toHaveFocus();
  });

  it('should focus correctly if first and last elements are disabled', async () => {
    const { getByTestId } = render(<FirstAndLastElementsAreDisabled />);

    const buttonOutsideModal = getByTestId(TEST_ID_BUTTON_OUTSIDE_MODAL);

    await userEvent.click(buttonOutsideModal);

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
    await waitFor(() => expect(firstActiveButtonInsideModal).toHaveFocus());

    await userEvent.tab();

    expect(firstActiveButtonInsideModal).not.toHaveFocus();

    expect(secondActiveButtonInsideModal).toBeInTheDocument();
    expect(secondActiveButtonInsideModal).not.toBeDisabled();
    expect(secondActiveButtonInsideModal).toHaveFocus();

    expect(secondDisabledButtonInsideModal).toBeInTheDocument();
    expect(secondDisabledButtonInsideModal).toBeDisabled();
    expect(secondDisabledButtonInsideModal).not.toHaveFocus();

    await userEvent.tab();

    expect(secondActiveButtonInsideModal).not.toHaveFocus();
    expect(secondDisabledButtonInsideModal).not.toHaveFocus();
    expect(firstDisabledButtonInsideModal).not.toHaveFocus();
    expect(firstActiveButtonInsideModal).toHaveFocus();

    await userEvent.tab({ shift: true });

    expect(firstActiveButtonInsideModal).not.toHaveFocus();
    expect(firstDisabledButtonInsideModal).not.toHaveFocus();
    expect(secondDisabledButtonInsideModal).not.toHaveFocus();
    expect(secondActiveButtonInsideModal).toHaveFocus();
  });

  it('should skip elements hidden by an ancestor and loop tab from the last visible element', async () => {
    const { getByTestId } = render(<LastElementsAreHiddenByAncestor />);

    await userEvent.click(getByTestId(TEST_ID_BUTTON_OUTSIDE_MODAL));

    const firstButton = getByTestId(TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL);
    const lastVisibleButton = getByTestId(
      TEST_ID_SECOND_ACTIVE_BUTTON_INSIDE_MODAL
    );
    const hiddenButton = getByTestId(TEST_ID_HIDDEN_BUTTON_INSIDE_MODAL);

    await waitFor(() => expect(firstButton).toHaveFocus());

    await userEvent.tab();

    expect(lastVisibleButton).toHaveFocus();

    await userEvent.tab();

    expect(hiddenButton).not.toHaveFocus();
    expect(firstButton).toHaveFocus();

    await userEvent.tab({ shift: true });

    expect(hiddenButton).not.toHaveFocus();
    expect(lastVisibleButton).toHaveFocus();
  });

  it('should keep tab inside a nested lock instead of looping the outer one', async () => {
    const { getByTestId } = render(<NestedFocusLocks />);

    await userEvent.click(
      getByTestId(TEST_ID_FIRST_ACTIVE_BUTTON_INSIDE_MODAL)
    );

    const innerFirstButton = getByTestId('test-id-inner-first');
    const innerLastButton = getByTestId('test-id-inner-last');

    await waitFor(() => expect(innerFirstButton).toHaveFocus());

    await userEvent.tab();

    expect(innerLastButton).toHaveFocus();

    await userEvent.tab();

    expect(innerFirstButton).toHaveFocus();

    await userEvent.tab({ shift: true });

    expect(innerLastButton).toHaveFocus();
  });

  it('should focus on last active element if there is no tabbable elements', async () => {
    const { getByTestId, getByText } = render(<OneDisabledElemet />);

    const buttonOutsideModal = getByTestId(TEST_ID_BUTTON_OUTSIDE_MODAL);

    await userEvent.click(buttonOutsideModal);

    const disabledButtonInsideModal = getByTestId(
      TEST_ID_FIRST_DISABLED_BUTTON_INSIDE_MODAL
    );

    expect(disabledButtonInsideModal).toBeInTheDocument();
    expect(disabledButtonInsideModal).toBeDisabled();
    expect(disabledButtonInsideModal).not.toHaveFocus();

    await waitFor(() => expect(getByText('Test text')).toHaveFocus());

    await userEvent.tab();

    expect(getByText('Test text')).toHaveFocus();
  });

  describe('when focus is lost', () => {
    // jsdom returns false when `<body>` is focused, unlike browsers
    beforeEach(() => {
      jest.spyOn(document, 'hasFocus').mockReturnValue(true);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should move focus back inside the lock when the focused button becomes disabled', async () => {
      const { getByTestId } = render(<SubmitButtonBecomesDisabled />);

      const input = getByTestId(TEST_ID_INPUT_INSIDE_MODAL);
      const submitButton = getByTestId(TEST_ID_SUBMIT_BUTTON_INSIDE_MODAL);

      await waitFor(() => expect(input).toHaveFocus());

      await userEvent.click(submitButton);

      expect(submitButton).toBeDisabled();
      dropFocusToBody(submitButton);

      expect(document.body).toHaveFocus();
      await waitFor(() => expect(input).toHaveFocus());
    });

    it('should move focus to the header when one is provided', async () => {
      const { getByTestId, getByText } = render(
        <SubmitButtonBecomesDisabled withHeader />
      );

      const header = getByText('Lock heading');
      const submitButton = getByTestId(TEST_ID_SUBMIT_BUTTON_INSIDE_MODAL);

      await waitFor(() => expect(header).toHaveFocus());

      await userEvent.click(submitButton);
      dropFocusToBody(submitButton);

      expect(document.body).toHaveFocus();
      await waitFor(() => expect(header).toHaveFocus());
    });

    it('should keep Tab inside the lock after the focused button becomes disabled', async () => {
      const { getByTestId } = render(<SubmitButtonBecomesDisabled />);

      const input = getByTestId(TEST_ID_INPUT_INSIDE_MODAL);
      const submitButton = getByTestId(TEST_ID_SUBMIT_BUTTON_INSIDE_MODAL);
      const buttonOutside = getByTestId(TEST_ID_BUTTON_OUTSIDE_MODAL);

      await waitFor(() => expect(input).toHaveFocus());

      await userEvent.click(submitButton);
      dropFocusToBody(submitButton);

      expect(document.body).toHaveFocus();

      // Tab before the delayed check runs
      fireEvent.keyDown(document.body, { key: 'Tab' });

      expect(buttonOutside).not.toHaveFocus();
      expect(input).toHaveFocus();
    });

    it('should not pull focus back when the last focused element can still hold focus', async () => {
      const { getByTestId } = render(<SubmitButtonBecomesDisabled />);

      const input = getByTestId(TEST_ID_INPUT_INSIDE_MODAL);

      await waitFor(() => expect(input).toHaveFocus());

      // e.g. a click on a non-focusable area
      input.blur();

      await new Promise(resolve => setTimeout(resolve, 150));

      expect(document.body).toHaveFocus();
    });

    it('should not move focus while the document does not have focus', async () => {
      const { getByTestId } = render(<SubmitButtonBecomesDisabled />);

      const input = getByTestId(TEST_ID_INPUT_INSIDE_MODAL);
      const submitButton = getByTestId(TEST_ID_SUBMIT_BUTTON_INSIDE_MODAL);

      await waitFor(() => expect(input).toHaveFocus());

      await userEvent.click(submitButton);

      // e.g. switching to another window
      document.hasFocus.mockReturnValue(false);
      dropFocusToBody(submitButton);

      await new Promise(resolve => setTimeout(resolve, 150));

      expect(document.body).toHaveFocus();
    });

    it('should restore focus inside the nested lock, not the outer one', async () => {
      const { getByTestId } = render(<NestedLockWithDisablingButton />);

      const disablingButton = getByTestId('test-id-inner-disabling');

      await waitFor(() =>
        expect(getByTestId('test-id-outer-button')).toHaveFocus()
      );

      await userEvent.click(disablingButton);

      expect(disablingButton).toBeDisabled();
      dropFocusToBody(disablingButton);

      expect(document.body).toHaveFocus();
      await waitFor(() =>
        expect(getByTestId('test-id-inner-first')).toHaveFocus()
      );
      expect(getByTestId('test-id-outer-button')).not.toHaveFocus();
    });
  });
});
