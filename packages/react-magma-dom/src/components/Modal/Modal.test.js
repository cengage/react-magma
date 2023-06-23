import React from 'react';
import { Modal } from '.';
import { act, render, fireEvent, queryByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';

describe('Modal', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <Modal testId={testId} isOpen>
        Modal Text
      </Modal>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render nothing if open is false', () => {
    const modalContent = 'Modal content';
    const { queryByText } = render(
      <Modal header="Hello" isOpen={false}>
        {modalContent}
      </Modal>
    );

    expect(queryByText(modalContent)).not.toBeInTheDocument();
  });

  it('should render children when open is true', () => {
    const modalContent = 'Modal content';
    const { getByText, rerender } = render(
      <Modal header="Hello" isOpen={false}>
        {modalContent}
      </Modal>
    );

    rerender(
      <Modal header="Hello" isOpen={true}>
        {modalContent}
      </Modal>
    );

    expect(getByText(modalContent)).toBeInTheDocument();
  });

  it('should render the modal when open has always been true', () => {
    const modalContent = 'Modal content';
    const { getByText } = render(
      <Modal header="Hello" isOpen>
        {modalContent}
      </Modal>
    );

    expect(getByText(modalContent)).toBeInTheDocument();
  });

  it('should render the modal with the default medium size', () => {
    const modalContent = 'Modal content';
    const { getByTestId, rerender } = render(
      <Modal header="Hello" isOpen={false}>
        {modalContent}
      </Modal>
    );

    rerender(
      <Modal header="Hello" isOpen={true}>
        {modalContent}
      </Modal>
    );

    expect(getByTestId('modal-content')).toHaveStyleRule(
      'max-width',
      magma.modal.width.medium
    );
  });

  it('should render the modal with the small size', () => {
    const modalContent = 'Modal content';
    const { getByTestId, rerender } = render(
      <Modal header="Hello" isOpen={false} size="small">
        {modalContent}
      </Modal>
    );

    rerender(
      <Modal header="Hello" isOpen={true} size="small">
        {modalContent}
      </Modal>
    );

    expect(getByTestId('modal-content')).toHaveStyleRule(
      'max-width',
      magma.modal.width.small
    );
  });

  it('should render the modal with the large size', () => {
    const modalContent = 'Modal content';
    const { getByTestId, rerender } = render(
      <Modal header="Hello" isOpen={false} size="large">
        {modalContent}
      </Modal>
    );

    rerender(
      <Modal header="Hello" isOpen={true} size="large">
        {modalContent}
      </Modal>
    );

    expect(getByTestId('modal-content')).toHaveStyleRule(
      'max-width',
      magma.modal.width.large
    );
  });

  it('should render a header if one is passed in', () => {
    const headerText = 'Hello';
    const { getByText, rerender } = render(
      <Modal header={headerText} isOpen={false}>
        Modal Content
      </Modal>
    );

    rerender(
      <Modal header={headerText} isOpen={true}>
        Modal Content
      </Modal>
    );

    expect(getByText(headerText)).toBeInTheDocument();
  });

  it('should not render a header if one is not passed in', () => {
    const { container } = render(<Modal isOpen={true}>Modal Content</Modal>);

    expect(container.querySelector('h1')).not.toBeInTheDocument();
  });

  it('should render a close button', () => {
    const { getByTestId, rerender } = render(
      <Modal header="Hello">Modal Content</Modal>
    );

    rerender(
      <Modal header="Hello" isOpen={true}>
        Modal Content
      </Modal>
    );

    expect(getByTestId('modal-closebtn')).toBeInTheDocument();
    expect(getByTestId('modal-closebtn')).toHaveAttribute(
      'aria-label',
      'Close dialog'
    );
  });

  it('should render a close button with custom label', () => {
    const { getByTestId, rerender } = render(
      <Modal header="Hello" closeAriaLabel="Goodbye">
        Modal Content
      </Modal>
    );

    rerender(
      <Modal header="Hello" isOpen={true} closeAriaLabel="Goodbye">
        Modal Content
      </Modal>
    );

    expect(getByTestId('modal-closebtn')).toHaveAttribute(
      'aria-label',
      'Goodbye'
    );
  });

  it('should not render a close button if the isCloseButtonHidden prop is true', () => {
    const { queryByTestId, rerender } = render(
      <Modal header="Hello" isCloseButtonHidden>
        Modal Content
      </Modal>
    );

    rerender(
      <Modal header="Hello" isOpen={true} isCloseButtonHidden>
        Modal Content
      </Modal>
    );

    expect(queryByTestId('modal-closebtn')).not.toBeInTheDocument();
  });

  describe('Closing', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
      jest.resetAllMocks();
    });

    it('should close when clicking the close button', async () => {
      const onCloseSpy = jest.fn();
      const { rerender, getByText, getByTestId } = render(
        <>
          <button>Open</button>
          <Modal header="Hello" isOpen={false} onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal header="Hello" isOpen={true} onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      fireEvent.click(getByTestId('modal-closebtn'));

      await act(async () => {
        jest.runAllTimers();
      });

      expect(onCloseSpy).toHaveBeenCalled();
    });

    it('should close when isModalClosingControlledManually is true and isOpen prop changed to false', async () => {
      const onCloseSpy = jest.fn();
      const { rerender, queryByText } = render(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={true}
            onClose={onCloseSpy}
            isModalClosingControlledManually
          >
            Modal Content
          </Modal>
        </>
      );

      rerender(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={false}
            onClose={onCloseSpy}
            isModalClosingControlledManually
          >
            Modal Content
          </Modal>
        </>
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(onCloseSpy).not.toHaveBeenCalled();
      expect(queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('should not force close when clicking the close button if isModalClosingControlledManually is true', async () => {
      const onCloseSpy = jest.fn();
      const { rerender, getByText, getByTestId } = render(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={false}
            onClose={onCloseSpy}
            isModalClosingControlledManually
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={true}
            onClose={onCloseSpy}
            isModalClosingControlledManually
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.click(getByTestId('modal-closebtn'));

      await act(async () => {
        jest.runAllTimers();
      });

      expect(onCloseSpy).toHaveBeenCalled();
      expect(getByText('Modal Content')).toBeInTheDocument();
    });

    it('should close when pressing the escape button', async () => {
      const onCloseSpy = jest.fn();
      const { rerender, getByText } = render(
        <>
          <button>Open</button>
          <Modal header="Hello" isOpen={false} onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal header="Hello" isOpen={true} onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      fireEvent.keyDown(getByText('Modal Content'), {
        key: 'Escape',
        keyCode: 27,
      });

      await act(async () => {
        jest.runAllTimers();
      });

      expect(onCloseSpy).toHaveBeenCalled();
    });

    it('should not force close when pressing the escape button if isModalClosingControlledManually is true', async () => {
      const onCloseSpy = jest.fn();
      const { rerender, getByText } = render(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={false}
            onClose={onCloseSpy}
            isModalClosingControlledManually
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={true}
            onClose={onCloseSpy}
            isModalClosingControlledManually
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.keyDown(getByText('Modal Content'), {
        key: 'Escape',
        keyCode: 27,
      });

      await act(async () => {
        jest.runAllTimers();
      });

      expect(onCloseSpy).toHaveBeenCalled();
      expect(getByText('Modal Content')).toBeInTheDocument();
    });

    it('should call the passed in onEscKeyDown function', async () => {
      const onEscKeyDown = jest.fn();
      const { rerender, getByText } = render(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={false}
            onEscKeyDown={onEscKeyDown}
            onClose={jest.fn()}
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={true}
            onEscKeyDown={onEscKeyDown}
            onClose={jest.fn()}
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.keyDown(getByText('Modal Content'), {
        key: 'Escape',
        keyCode: 27,
      });

      await act(async () => {
        jest.runAllTimers();
      });

      expect(onEscKeyDown).toHaveBeenCalled();
    });

    it('should close when clicking on the backdrop', async () => {
      const testId = 'modal-container';
      const onCloseSpy = jest.fn();
      const { rerender, getByText, getByTestId } = render(
        <>
          <button>Open</button>
          <Modal header="Hello" isOpen={false} onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={true}
            onClose={onCloseSpy}
            testId={testId}
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.mouseDown(getByTestId(testId));
      fireEvent.click(getByTestId(testId));

      await act(async () => {
        jest.runAllTimers();
      });

      expect(onCloseSpy).toHaveBeenCalled();
    });

    it('should not force close when clicking on the backdrop if isModalClosingControlledManually is true', async () => {
      const testId = 'modal-container';
      const onCloseSpy = jest.fn();
      const { rerender, getByText, getByTestId } = render(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={false}
            onClose={onCloseSpy}
            isModalClosingControlledManually
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={true}
            onClose={onCloseSpy}
            testId={testId}
            isModalClosingControlledManually
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.mouseDown(getByTestId(testId));
      fireEvent.click(getByTestId(testId));

      await act(async () => {
        jest.runAllTimers();
      });

      expect(onCloseSpy).toHaveBeenCalled();
      expect(getByText('Modal Content')).toBeInTheDocument();
    });

    it('should not close when mouse in happened inside the modal but mouse up happened on the backdrop', async () => {
      const testId = 'modal-container';
      const modalContent = 'Modal Content';
      const onCloseSpy = jest.fn();
      const { rerender, getByText, getByTestId } = render(
        <>
          <button>Open</button>
          <Modal header="Hello" isOpen={false} onClose={onCloseSpy}>
            {modalContent}
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={true}
            onClose={onCloseSpy}
            testId={testId}
          >
            {modalContent}
          </Modal>
        </>
      );

      fireEvent.mouseDown(getByText(modalContent));
      fireEvent.click(getByTestId(testId));

      await act(async () => {
        jest.runAllTimers();
      });

      expect(onCloseSpy).not.toHaveBeenCalled();
    });

    it('should not close when clicking in the modal', async () => {
      const onCloseSpy = jest.fn();
      const { rerender, getByText, getByTestId } = render(
        <>
          <button>Open</button>
          <Modal header="Hello" isOpen={false} onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal header="Hello" isOpen={true} onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      fireEvent.click(getByTestId('modal-content'));

      await act(async () => {
        jest.runAllTimers();
      });

      expect(onCloseSpy).not.toHaveBeenCalled();
    });

    it('should fire the close event when the open prop changes from true to false', async () => {
      const onCloseSpy = jest.fn();
      const { rerender } = render(
        <Modal header="Hello" isOpen={false} onClose={onCloseSpy}>
          Modal Content
        </Modal>
      );

      rerender(
        <Modal header="Hello" isOpen={true} onClose={onCloseSpy}>
          Modal Content
        </Modal>
      );

      rerender(
        <Modal header="Hello" isOpen={false} onClose={onCloseSpy}>
          Modal Content
        </Modal>
      );

      await act(async () => {
        jest.runAllTimers();
      });

      expect(onCloseSpy).toHaveBeenCalled();
    });

    it('should not close when clicking the escape button if the isEscKeyDownDisabled prop is true', async () => {
      const onCloseSpy = jest.fn();
      const { rerender, getByText } = render(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={false}
            onClose={onCloseSpy}
            isEscKeyDownDisabled
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={true}
            onClose={onCloseSpy}
            isEscKeyDownDisabled
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.keyDown(getByText('Modal Content'), {
        key: 'Escape',
        keyCode: 27,
      });

      await act(async () => {
        jest.runAllTimers();
      });

      expect(onCloseSpy).not.toHaveBeenCalled();
    });

    it('should not close when clicking on the backdrop if the isBackgroundClickDisabled prop is true', async () => {
      const onCloseSpy = jest.fn();
      const { rerender, getByText, getByTestId } = render(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={false}
            onClose={onCloseSpy}
            isBackgroundClickDisabled
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={true}
            onClose={onCloseSpy}
            isBackgroundClickDisabled
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.click(getByTestId('modal-backdrop'));

      await act(async () => {
        jest.runAllTimers();
      });

      expect(onCloseSpy).not.toHaveBeenCalled();
    });

    it('should prevent default on mouse down on the backdrop if the isBackgroundClickDisabled prop is true', async () => {
      const onCloseSpy = jest.fn();
      const { rerender, getByText, getByTestId } = render(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={false}
            onClose={onCloseSpy}
            isBackgroundClickDisabled
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={true}
            onClose={onCloseSpy}
            isBackgroundClickDisabled
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.mouseDown(getByTestId('modal-backdrop'));

      await act(async () => {
        jest.runAllTimers();
      });

      expect(getByTestId('modal-content')).toBeInTheDocument();
    });

    it('should permit a nested modal to only close one at a time when escape is pressed', async () => {
      const onEscKeyDown = jest.fn();
      const { rerender, getByText, queryByText } = render(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={false}
            onEscKeyDown={onEscKeyDown}
            onClose={jest.fn()}
          >
            Modal Content
          </Modal>

          <button>Open Modal Two</button>
          <Modal
            header="Hello again"
            isOpen={false}
            onEscKeyDown={onEscKeyDown}
            onClose={jest.fn()}
          >
            Modal Two Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={true}
            onEscKeyDown={onEscKeyDown}
            onClose={jest.fn()}
          >
            Modal Content
          </Modal>

          <button>Open Modal Two</button>
          <Modal
            header="Hello again"
            isOpen={false}
            onEscKeyDown={onEscKeyDown}
            onClose={jest.fn()}
          >
            Modal Two Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open Modal Two'));

      rerender(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={true}
            onEscKeyDown={onEscKeyDown}
            onClose={jest.fn()}
          >
            Modal Content
          </Modal>

          <button>Open Modal Two</button>
          <Modal
            header="Hello again"
            isOpen={true}
            onEscKeyDown={onEscKeyDown}
            onClose={jest.fn()}
          >
            Modal Two Content
          </Modal>
        </>
      );

      fireEvent.keyDown(getByText('Modal Two Content'), {
        key: 'Escape',
        keyCode: 27,
      });

      await act(async () => {
        jest.runAllTimers();
      });

      expect(onEscKeyDown).toHaveBeenCalled();
      expect(queryByText('Modal Two Content')).not.toBeInTheDocument();
      expect(getByText('Modal Content')).toBeInTheDocument();

      fireEvent.keyDown(getByText('Modal Content'), {
        key: 'Escape',
        keyCode: 27,
      });

      await act(async () => {
        jest.runAllTimers();
      });

      expect(onEscKeyDown).toHaveBeenCalled();
      expect(queryByText('Modal Content')).not.toBeInTheDocument();
    });
  });

  describe('focus trap', () => {
    it('should focus the header element upon opening the modal', () => {
      const { rerender, getByText } = render(
        <>
          <button>Open</button>
          <Modal header="Hello" isOpen={false} onClose={jest.fn()}>
            Modal Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal header="Hello" isOpen={true} onClose={jest.fn()}>
            Modal Content
          </Modal>
        </>
      );

      expect(getByText('Hello')).toHaveFocus();
    });

    it('should focus the first actionable element element upon opening the modal if there is no header', () => {
      const { rerender, getByText, getByTestId } = render(
        <>
          <button>Open</button>
          <Modal isOpen={false} onClose={jest.fn()}>
            <button data-testid="closeButton">Close</button>
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal isOpen={true} onClose={jest.fn()}>
            <button data-testid="closeButton">Close</button>
          </Modal>
        </>
      );

      expect(getByTestId('closeButton')).toHaveFocus();
    });

    it('should not focus the first element if there is no heading and nothing else to focus', () => {
      const { rerender, getByText } = render(
        <>
          <button>Open</button>
          <Modal isOpen={false} onClose={jest.fn()} isCloseButtonHidden>
            <p>Modal Content</p>
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal isOpen={true} onClose={jest.fn()} isCloseButtonHidden>
            <p>Modal Content</p>
          </Modal>
        </>
      );

      expect(getByText('Modal Content')).toHaveFocus();
    });

    it('should handle tab and loop it through the modal', async () => {
      const { getByTestId, getByText, rerender, debug } = render(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={false}
            onClose={jest.fn()}
            isCloseButtonHidden
          >
            <>
              <button data-testid="closeButton">Close</button>
              <input data-testid="emailInput" type="text" name="email" />
              <input data-testid="passwordInput" type="text" name="password" />
            </>
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={true}
            onClose={jest.fn()}
            isCloseButtonHidden
          >
            <>
              <button data-testid="closeButton">Close</button>
              <input data-testid="emailInput" type="text" name="email" />
              <input data-testid="passwordInput" type="text" name="password" />
            </>
          </Modal>
        </>
      );

      userEvent.tab();
      expect(getByTestId('closeButton')).toHaveFocus();

      userEvent.tab();

      userEvent.tab();

      userEvent.tab();

      expect(getByTestId('closeButton')).toHaveFocus();
    });

    it('should not attempt to loop through the modal if there are no tabbable elements', () => {
      const { getByText, rerender } = render(
        <>
          <button>Open</button>
          <Modal isOpen={false} onClose={jest.fn()} isCloseButtonHidden>
            <p>Modal Content </p>
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal isOpen={true} onClose={jest.fn()} isCloseButtonHidden>
            <p>Modal Content </p>
          </Modal>
        </>
      );

      userEvent.tab();

      expect(getByText('Modal Content')).toHaveFocus();
    });

    it('should handle shift + tab and loop it through the modal', () => {
      const { getByTestId, getByText, rerender } = render(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={false}
            onClose={jest.fn()}
            isCloseButtonHidden
          >
            <>
              <button data-testid="closeButton">Close</button>
              <input data-testid="emailInput" type="text" name="email" />
              <input data-testid="passwordInput" type="text" name="password" />
            </>
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={true}
            onClose={jest.fn()}
            isCloseButtonHidden
          >
            <>
              <button data-testid="closeButton">Close</button>
              <input data-testid="emailInput" type="text" name="email" />
              <input data-testid="passwordInput" type="text" name="password" />
            </>
          </Modal>
        </>
      );

      userEvent.tab({ shift: true });

      expect(getByTestId('passwordInput')).toHaveFocus();

      userEvent.tab({ shift: true });

      expect(getByTestId('emailInput')).toHaveFocus();

      userEvent.tab({ shift: true });

      expect(getByTestId('closeButton')).toHaveFocus();

      userEvent.tab({ shift: true });

      expect(getByTestId('passwordInput')).toHaveFocus();
    });

    it('should handle shift + tab and loop it through the modal if the first element is a set of radio buttons', () => {
      const { getByTestId, getByText, rerender } = render(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={false}
            onClose={jest.fn()}
            isCloseButtonHidden
          >
            <>
              <input data-testid="yesInput" type="radio" name="radios" />
              <input data-testid="noInput" type="radio" name="radios" />
              <button data-testid="closeButton">Close</button>
            </>
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={true}
            onClose={jest.fn()}
            isCloseButtonHidden
          >
            <>
              <input data-testid="yesInput" type="radio" name="radios" />
              <input data-testid="noInput" type="radio" name="radios" />
              <button data-testid="closeButton">Close</button>
            </>
          </Modal>
        </>
      );

      userEvent.tab({ shift: true });

      expect(getByTestId('closeButton')).toHaveFocus();
    });

    it('should update the focusable elements to tab through when the modal content is changed', () => {
      const { getByTestId, getByText, rerender } = render(
        <>
          <button>Open</button>
          <Modal isOpen={true} onClose={jest.fn()} isCloseButtonHidden>
            <>
              <button data-testid="closeButton">Close</button>
              <input data-testid="emailInput" type="text" name="email" />
              <input data-testid="passwordInput" type="text" name="password" />
            </>
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal isOpen={true} onClose={jest.fn()} isCloseButtonHidden>
            <>
              <button data-testid="closeButton">Close</button>
              <input data-testid="addressInput" type="text" name="address" />
              <input data-testid="stateInput" type="text" name="state" />
            </>
          </Modal>
        </>
      );

      expect(getByTestId('closeButton')).toHaveFocus();

      userEvent.tab();

      userEvent.tab();

      userEvent.tab();

      expect(getByTestId('closeButton')).toHaveFocus();
    });

    it('should not break if a different key is pressed', () => {
      const { getByTestId, getByText, rerender } = render(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={false}
            onClose={jest.fn()}
            isCloseButtonHidden
          >
            <>
              <button data-testid="closeButton">Close</button>
              <input data-testid="emailInput" type="text" name="email" />
              <input data-testid="passwordInput" type="text" name="password" />
            </>
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            isOpen={true}
            onClose={jest.fn()}
            isCloseButtonHidden
          >
            <>
              <button data-testid="closeButton">Close</button>
              <input data-testid="emailInput" type="text" name="email" />
              <input data-testid="passwordInput" type="text" name="password" />
            </>
          </Modal>
        </>
      );

      fireEvent.keyDown(getByTestId('closeButton'), {
        keyCode: 10,
      });

      expect(getByTestId('closeButton')).toBeInTheDocument();
    });
  });

  describe('i18n', () => {
    it('should use the close aria-label', () => {
      const closeAriaLabel = 'test aria label';
      const { getByLabelText } = render(
        <I18nContext.Provider
          value={{
            ...defaultI18n,
            modal: {
              closeAriaLabel,
            },
          }}
        >
          <Modal isOpen>Modal Text</Modal>
        </I18nContext.Provider>
      );

      expect(getByLabelText(closeAriaLabel)).toBeInTheDocument();
    });
  });
});
