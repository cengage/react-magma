import React from 'react';
import { Modal } from '.';
import { render, fireEvent } from '@testing-library/react';

describe('Modal', () => {
  it('should render nothing if open is false', () => {
    const modalContent = 'Modal content';
    const { queryByText } = render(
      <Modal header="Hello" open={false}>
        {modalContent}
      </Modal>
    );

    expect(queryByText(modalContent)).not.toBeInTheDocument();
  });

  it('should render children when open is true', () => {
    const modalContent = 'Modal content';
    const { getByText, rerender } = render(
      <Modal header="Hello" open={false}>
        {modalContent}
      </Modal>
    );

    rerender(
      <Modal header="Hello" open={true}>
        {modalContent}
      </Modal>
    );

    expect(getByText(modalContent)).toBeInTheDocument();
  });

  it('should render the modal when open has always been true', () => {
    const modalContent = 'Modal content';
    const { getByText } = render(
      <Modal header="Hello" open>
        {modalContent}
      </Modal>
    );

    expect(getByText(modalContent)).toBeInTheDocument();
  });

  it('should render the modal with the default medium size', () => {
    const modalContent = 'Modal content';
    const { getByTestId, rerender } = render(
      <Modal header="Hello">{modalContent}</Modal>
    );

    rerender(
      <Modal header="Hello" open={true}>
        {modalContent}
      </Modal>
    );

    expect(getByTestId('modal-content')).toHaveStyleRule('max-width', '750px');
  });

  it('should render the modal with the small size', () => {
    const modalContent = 'Modal content';
    const { getByTestId, rerender } = render(
      <Modal header="Hello" size="small">
        {modalContent}
      </Modal>
    );

    rerender(
      <Modal header="Hello" open={true} size="small">
        {modalContent}
      </Modal>
    );

    expect(getByTestId('modal-content')).toHaveStyleRule('max-width', '300px');
  });

  it('should render the modal with the large size', () => {
    const modalContent = 'Modal content';
    const { getByTestId, rerender } = render(
      <Modal header="Hello" size="large">
        {modalContent}
      </Modal>
    );

    rerender(
      <Modal header="Hello" open={true} size="large">
        {modalContent}
      </Modal>
    );

    expect(getByTestId('modal-content')).toHaveStyleRule('max-width', '900px');
  });

  it('should render a header if one is passed in', () => {
    const headerText = 'Hello';
    const { getByText, rerender } = render(
      <Modal header={headerText}>Modal Content</Modal>
    );

    rerender(
      <Modal header={headerText} open={true}>
        Modal Content
      </Modal>
    );

    expect(getByText(headerText)).toBeInTheDocument();
  });

  it('should not render a header if one is not passed in', () => {
    const { container } = render(<Modal open={true}>Modal Content</Modal>);

    expect(container.querySelector('h1')).not.toBeInTheDocument();
  });

  it('should render a close button', () => {
    const { getByTestId, rerender } = render(
      <Modal header="Hello">Modal Content</Modal>
    );

    rerender(
      <Modal header="Hello" open={true}>
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
      <Modal header="Hello" closeLabel="Goodbye">
        Modal Content
      </Modal>
    );

    rerender(
      <Modal header="Hello" open={true} closeLabel="Goodbye">
        Modal Content
      </Modal>
    );

    expect(getByTestId('modal-closebtn')).toHaveAttribute(
      'aria-label',
      'Goodbye'
    );
  });

  it('should not render a close button if the hideEscButton prop is true', () => {
    const { queryByTestId, rerender } = render(
      <Modal header="Hello" hideEscButton>
        Modal Content
      </Modal>
    );

    rerender(
      <Modal header="Hello" open={true} hideEscButton>
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
    });

    it('should close when clicking the close button', () => {
      const onCloseSpy = jest.fn();
      const { rerender, getByText, getByTestId } = render(
        <>
          <button>Open</button>
          <Modal header="Hello" open={false} onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal header="Hello" open={true} onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      fireEvent.click(getByTestId('modal-closebtn'));

      jest.runAllTimers();

      expect(onCloseSpy).toHaveBeenCalled();
    });

    it('should close when pressing the escape button', () => {
      const onCloseSpy = jest.fn();
      const { rerender, getByText } = render(
        <>
          <button>Open</button>
          <Modal header="Hello" open={false} onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal header="Hello" open={true} onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      fireEvent.keyDown(getByText('Modal Content'), {
        key: 'Escape',
        keyCode: 27
      });

      jest.runAllTimers();

      expect(onCloseSpy).toHaveBeenCalled();
    });

    it('should call the passed in onEscKeyDown function', () => {
      const onEscKeyDown = jest.fn();
      const { rerender, getByText } = render(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            open={false}
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
            open={true}
            onEscKeyDown={onEscKeyDown}
            onClose={jest.fn()}
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.keyDown(getByText('Modal Content'), {
        key: 'Escape',
        keyCode: 27
      });

      jest.runAllTimers();

      expect(onEscKeyDown).toHaveBeenCalled();
    });

    it('should close when clicking on the backdrop', () => {
      const onCloseSpy = jest.fn();
      const { rerender, getByText, getByTestId } = render(
        <>
          <button>Open</button>
          <Modal header="Hello" open={false} onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal header="Hello" open={true} onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      fireEvent.click(getByTestId('modal-container'));

      jest.runAllTimers();

      expect(onCloseSpy).toHaveBeenCalled();
    });

    it('should not close when clicking in the modal', () => {
      const onCloseSpy = jest.fn();
      const { rerender, getByText, getByTestId } = render(
        <>
          <button>Open</button>
          <Modal header="Hello" open={false} onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal header="Hello" open={true} onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      fireEvent.click(getByTestId('modal-content'));

      jest.runAllTimers();

      expect(onCloseSpy).not.toHaveBeenCalled();
    });

    it('should fire the close event when the open prop changes from true to false', () => {
      const onCloseSpy = jest.fn();
      const { rerender } = render(
        <Modal header="Hello" open={false} onClose={onCloseSpy}>
          Modal Content
        </Modal>
      );

      rerender(
        <Modal header="Hello" open={true} onClose={onCloseSpy}>
          Modal Content
        </Modal>
      );

      rerender(
        <Modal header="Hello" open={false} onClose={onCloseSpy}>
          Modal Content
        </Modal>
      );

      jest.runAllTimers();
      expect(onCloseSpy).toHaveBeenCalled();
    });

    it('should not close when clicking the escape button if the disableEscKeyDown prop is true', () => {
      const onCloseSpy = jest.fn();
      const { rerender, getByText } = render(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            open={false}
            onClose={onCloseSpy}
            disableEscKeyDown
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
            open={true}
            onClose={onCloseSpy}
            disableEscKeyDown
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.keyDown(getByText('Modal Content'), {
        key: 'Escape',
        keyCode: 27
      });

      jest.runAllTimers();

      expect(onCloseSpy).not.toHaveBeenCalled();
    });

    it('should not close when clicking on the backdrop if the disableBackdropClick prop is true', () => {
      const onCloseSpy = jest.fn();
      const { rerender, getByText, getByTestId } = render(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            open={false}
            onClose={onCloseSpy}
            disableBackdropClick
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
            open={true}
            onClose={onCloseSpy}
            disableBackdropClick
          >
            Modal Content
          </Modal>
        </>
      );

      fireEvent.click(getByTestId('modal-backdrop'));

      jest.runAllTimers();

      expect(onCloseSpy).not.toHaveBeenCalled();
    });

    it('should prevent default on mouse down on the backdrop if the disableBackdropClick prop is true', () => {
      const onCloseSpy = jest.fn();
      const { rerender, getByText, getByTestId } = render(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            open={false}
            onClose={onCloseSpy}
            disableBackdropClick
          >
            Modal Content
          </Modal>
        </>,
        { container: document.body }
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal
            header="Hello"
            open={true}
            onClose={onCloseSpy}
            disableBackdropClick
          >
            Modal Content
          </Modal>
        </>,
        { container: document.body }
      );

      fireEvent.mouseDown(getByTestId('modal-backdrop'));

      jest.runAllTimers();

      expect(getByTestId('modal-content')).toBeInTheDocument();
    });
  });

  describe('focus trap', () => {
    it('should focus the header element upon opening the modal', () => {
      const { rerender, getByText } = render(
        <>
          <button>Open</button>
          <Modal header="Hello" open={false} onClose={jest.fn()}>
            Modal Content
          </Modal>
        </>,
        { container: document.body }
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal header="Hello" open={true} onClose={jest.fn()}>
            Modal Content
          </Modal>
        </>,
        { container: document.body }
      );

      expect(getByText('Hello')).toHaveFocus();
    });

    it('should focus the first actionable element element upon opening the modal if there is no header', () => {
      const { rerender, getByText, getByTestId } = render(
        <>
          <button>Open</button>
          <Modal open={false} onClose={jest.fn()}>
            <button data-testid="closeButton">Close</button>
          </Modal>
        </>,
        { container: document.body }
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal open={true} onClose={jest.fn()}>
            <button data-testid="closeButton">Close</button>
          </Modal>
        </>,
        { container: document.body }
      );

      expect(getByTestId('closeButton')).toHaveFocus();
    });

    it('should not focus the first element if there is no heading and nothing else to focus', () => {
      const { rerender, getByText } = render(
        <>
          <button>Open</button>
          <Modal open={false} onClose={jest.fn()} hideEscButton>
            <p>Modal Content</p>
          </Modal>
        </>,
        { container: document.body }
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal open={true} onClose={jest.fn()} hideEscButton>
            <p>Modal Content</p>
          </Modal>
        </>,
        { container: document.body }
      );

      expect(getByText('Modal Content')).toHaveFocus();
    });

    it('should handle tab and loop it through the modal', () => {
      const { getByTestId, getByText, rerender } = render(
        <>
          <button>Open</button>
          <Modal header="Hello" open={false} onClose={jest.fn()} hideEscButton>
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
          <Modal header="Hello" open={true} onClose={jest.fn()} hideEscButton>
            <>
              <button data-testid="closeButton">Close</button>
              <input data-testid="emailInput" type="text" name="email" />
              <input data-testid="passwordInput" type="text" name="password" />
            </>
          </Modal>
        </>
      );

      fireEvent.keyDown(getByTestId('closeButton'), {
        keyCode: 9
      });

      fireEvent.keyDown(getByTestId('emailInput'), {
        keyCode: 9
      });

      fireEvent.keyDown(getByTestId('passwordInput'), {
        keyCode: 9
      });

      expect(getByTestId('closeButton')).toHaveFocus();
    });

    it('should not attempt to loop through the modal if there are no tabbable elements', () => {
      const { getByText, rerender } = render(
        <>
          <button>Open</button>
          <Modal open={false} onClose={jest.fn()} hideEscButton>
            <p>Modal Content </p>
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal open={true} onClose={jest.fn()} hideEscButton>
            <p>Modal Content </p>
          </Modal>
        </>
      );

      fireEvent.keyDown(getByText('Modal Content'), {
        keyCode: 9
      });

      expect(getByText('Modal Content')).toHaveFocus();
    });

    it('should handle shift + tab and loop it through the modal', () => {
      const { getByTestId, getByText, rerender } = render(
        <>
          <button>Open</button>
          <Modal header="Hello" open={false} onClose={jest.fn()} hideEscButton>
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
          <Modal header="Hello" open={true} onClose={jest.fn()} hideEscButton>
            <>
              <button data-testid="closeButton">Close</button>
              <input data-testid="emailInput" type="text" name="email" />
              <input data-testid="passwordInput" type="text" name="password" />
            </>
          </Modal>
        </>
      );

      fireEvent.keyDown(getByTestId('emailInput'), {
        keyCode: 9,
        shiftKey: true
      });

      fireEvent.keyDown(getByTestId('closeButton'), {
        keyCode: 9,
        shiftKey: true
      });

      expect(getByTestId('passwordInput')).toHaveFocus();
    });

    it('should handle shift + tab and loop it through the modal if the first element is a set of radio buttons', () => {
      const { getByTestId, getByText, rerender } = render(
        <>
          <button>Open</button>
          <Modal header="Hello" open={false} onClose={jest.fn()} hideEscButton>
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
          <Modal header="Hello" open={true} onClose={jest.fn()} hideEscButton>
            <>
              <input data-testid="yesInput" type="radio" name="radios" />
              <input data-testid="noInput" type="radio" name="radios" />
              <button data-testid="closeButton">Close</button>
            </>
          </Modal>
        </>
      );

      fireEvent.keyDown(getByTestId('noInput'), {
        keyCode: 9,
        shiftKey: true
      });

      expect(getByTestId('closeButton')).toHaveFocus();
    });

    it('should focus the first focusable element when the active element is the body on rerender of modal', () => {
      const { getByTestId, rerender } = render(
        <>
          <button>Open</button>
          <Modal open={true} onClose={jest.fn()} hideEscButton>
            <>
              <button data-testid="closeButton">Close</button>
              <input data-testid="emailInput" type="text" name="email" />
              <input data-testid="passwordInput" type="text" name="password" />
            </>
          </Modal>
        </>
      );

      rerender(
        <>
          <button>Open</button>
          <Modal open={true} onClose={jest.fn()} hideEscButton>
            <>
              <input data-testid="addressInput" type="text" name="address" />
              <input data-testid="stateInput" type="text" name="state" />
            </>
          </Modal>
        </>
      );

      expect(getByTestId('addressInput')).toHaveFocus();
    });

    it('should update the focusable elements to tab through when the modal content is changed', () => {
      const { getByTestId, getByText, rerender } = render(
        <>
          <button>Open</button>
          <Modal open={true} onClose={jest.fn()} hideEscButton>
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
          <Modal open={true} onClose={jest.fn()} hideEscButton>
            <>
              <button data-testid="closeButton">Close</button>
              <input data-testid="addressInput" type="text" name="address" />
              <input data-testid="stateInput" type="text" name="state" />
            </>
          </Modal>
        </>
      );

      expect(getByTestId('closeButton')).toHaveFocus();

      fireEvent.keyDown(getByTestId('closeButton'), {
        keyCode: 9
      });

      fireEvent.keyDown(getByTestId('addressInput'), {
        keyCode: 9
      });

      fireEvent.keyDown(getByTestId('stateInput'), {
        keyCode: 9
      });

      expect(getByTestId('closeButton')).toHaveFocus();
    });

    it('should not break if a different key is pressed', () => {
      const { getByTestId, getByText, rerender } = render(
        <>
          <button>Open</button>
          <Modal header="Hello" open={false} onClose={jest.fn()} hideEscButton>
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
          <Modal header="Hello" open={true} onClose={jest.fn()} hideEscButton>
            <>
              <button data-testid="closeButton">Close</button>
              <input data-testid="emailInput" type="text" name="email" />
              <input data-testid="passwordInput" type="text" name="password" />
            </>
          </Modal>
        </>
      );

      fireEvent.keyDown(getByTestId('closeButton'), {
        keyCode: 10
      });

      expect(getByTestId('closeButton')).toBeInTheDocument();
    });
  });
});
