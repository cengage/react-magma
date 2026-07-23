import React from 'react';

import { act, render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { axe } from '../../../axe-helper';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';
import { Button } from '../Button';

import { Modal } from '.';

describe('Modal', () => {
  let requestAnimationFrameSpy;

  beforeEach(() => {
    requestAnimationFrameSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(callback => {
        callback(0);
        return 0;
      });
  });

  afterEach(() => {
    requestAnimationFrameSpy.mockRestore();
  });

  describe('a11y', () => {
    it('With header, does not violate accessibility standards', async () => {
      const { baseElement } = render(
        <Modal testId={'test-id'} isOpen header={'Modal'}>
          Modal Text
        </Modal>
      );
      const results = await axe(baseElement);

      return expect(results).toHaveNoViolations();
    });
    it('Without header, does not violate accessibility standards', async () => {
      const { baseElement } = render(
        <Modal testId={'test-id'} isOpen ariaLabel="modal">
          Modal Text
        </Modal>
      );
      const results = await axe(baseElement);

      return expect(results).toHaveNoViolations();
    });
  });

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
      <Modal header="Hello" isOpen>
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
      <Modal header="Hello" isOpen>
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
      <Modal header="Hello" isOpen size="small">
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
      <Modal header="Hello" isOpen size="large">
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
      <Modal header={headerText} isOpen>
        Modal Content
      </Modal>
    );

    expect(getByText(headerText)).toBeInTheDocument();
  });

  it('should not render a header if one is not passed in', () => {
    const { container } = render(<Modal isOpen>Modal Content</Modal>);

    expect(container.querySelector('h1')).not.toBeInTheDocument();
  });

  it('should render a close button', () => {
    const { getByTestId, rerender } = render(
      <Modal header="Hello">Modal Content</Modal>
    );

    rerender(
      <Modal header="Hello" isOpen>
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
      <Modal header="Hello" isOpen closeAriaLabel="Goodbye">
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
      <Modal header="Hello" isOpen isCloseButtonHidden>
        Modal Content
      </Modal>
    );

    expect(queryByTestId('modal-closebtn')).not.toBeInTheDocument();
  });

  describe('portalContainer prop', () => {
    let host;

    afterEach(() => {
      if (host && host.parentNode) {
        host.parentNode.removeChild(host);
      }
      host = null;
    });

    it('portals into document.body by default', () => {
      const { getByTestId } = render(
        <Modal isOpen testId="default-portal" header="Hello">
          Modal Content
        </Modal>
      );

      const modal = getByTestId('default-portal');
      expect(modal.parentElement.parentElement).toBe(document.body);
    });

    it('portals into the provided container and not into document.body', () => {
      host = document.createElement('div');
      document.body.appendChild(host);

      const { getByTestId, getByText } = render(
        <Modal
          isOpen
          testId="custom-portal"
          header="Hello"
          portalContainer={host}
        >
          Modal Content
        </Modal>
      );

      const modal = getByTestId('custom-portal');
      expect(host.contains(modal)).toBe(true);
      expect(getByText('Modal Content')).toBeInTheDocument();
      // Sanity: the modal tree is inside host, not a direct child of body.
      expect(modal.parentElement.parentElement).not.toBe(document.body);
    });

    it('remains fully interactive when portaled into a custom container', async () => {
      jest.useFakeTimers();
      host = document.createElement('div');
      document.body.appendChild(host);

      const onClose = jest.fn();
      const { getByTestId } = render(
        <Modal
          isOpen
          testId="interactive-portal"
          header="Hello"
          onClose={onClose}
          portalContainer={host}
        >
          Modal Content
        </Modal>
      );

      // Close button lives inside the portaled tree and still fires onClose.
      const closeBtn = getByTestId('modal-closebtn');
      expect(host.contains(closeBtn)).toBe(true);

      fireEvent.click(closeBtn);
      await act(async () => {
        jest.runAllTimers();
      });

      expect(onClose).toHaveBeenCalledTimes(1);
      jest.useRealTimers();
    });

    it('falls back to document.body when portalContainer is null', () => {
      const { getByTestId } = render(
        <Modal
          isOpen
          testId="null-portal"
          header="Hello"
          portalContainer={null}
        >
          Modal Content
        </Modal>
      );

      const modal = getByTestId('null-portal');
      expect(modal.parentElement.parentElement).toBe(document.body);
    });
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
          <Modal header="Hello" isOpen onClose={onCloseSpy}>
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
            isOpen
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
            isOpen
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
          <Modal header="Hello" isOpen onClose={onCloseSpy}>
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

    it('should close on Escape when modal starts open and a foreign aria-modal exists in the DOM', async () => {
      const onCloseSpy = jest.fn();

      const foreignModal = document.createElement('div');
      foreignModal.setAttribute('aria-modal', 'true');
      foreignModal.setAttribute('role', 'dialog');
      foreignModal.style.display = 'none';
      document.body.appendChild(foreignModal);

      render(
        <Modal header="Hello" isOpen onClose={onCloseSpy}>
          Modal Content
        </Modal>
      );

      userEvent.keyboard('{Escape}');

      await waitFor(() => {
        expect(onCloseSpy).toHaveBeenCalled();
      });

      foreignModal.remove();
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
            isOpen
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
            isOpen
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
          <Modal header="Hello" isOpen onClose={onCloseSpy} testId={testId}>
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
            isOpen
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
          <Modal header="Hello" isOpen onClose={onCloseSpy} testId={testId}>
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
          <Modal header="Hello" isOpen onClose={onCloseSpy}>
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
        <Modal header="Hello" isOpen onClose={onCloseSpy}>
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
            isOpen
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
            isOpen
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
            isOpen
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
            isOpen
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
            isOpen
            onEscKeyDown={onEscKeyDown}
            onClose={jest.fn()}
          >
            Modal Content
          </Modal>

          <button>Open Modal Two</button>
          <Modal
            header="Hello again"
            isOpen
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
          <Modal header="Hello" isOpen onClose={jest.fn()}>
            Modal Content
          </Modal>
        </>
      );

      expect(getByText('Hello')).toHaveFocus();
    });

    it('should focus the close button upon opening the modal when the modal if there is no header', () => {
      const { rerender, getByTestId, getByText } = render(
        <>
          <button>Open</button>
          <Modal isOpen={false} onClose={jest.fn()}>
            Modal Content
          </Modal>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <Modal isOpen onClose={jest.fn()}>
            Modal Content
          </Modal>
        </>
      );

      expect(getByTestId('modal-closebtn')).toHaveFocus();
    });

    it('should focus the first actionable element element upon opening the modal if there is no header and close button', () => {
      const { rerender, getByText, getByTestId } = render(
        <>
          <button>Open</button>
          <Modal isOpen={false} onClose={jest.fn()} isCloseButtonHidden>
            <button data-testid="closeButton">Close</button>
          </Modal>
        </>
      );

      getByText('Open').focus();

      rerender(
        <>
          <button>Open</button>
          <Modal isOpen onClose={jest.fn()} isCloseButtonHidden>
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
          <Modal isOpen onClose={jest.fn()} isCloseButtonHidden>
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
          <Modal header="Hello" isOpen onClose={jest.fn()} isCloseButtonHidden>
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

    it('headerRef prop allows a custom header to be focused on load, then should lose focus after other Modal elements are looped through', async () => {
      const headerRef = React.createRef();

      const handleFocus = () => {
        headerRef?.current?.focus();
      };

      const { getByText } = render(
        <Modal headerRef={handleFocus} isOpen>
          <h3 ref={headerRef} tabIndex={-1}>
            Custom header using h3
          </h3>
          <Button>Focusable element</Button>
        </Modal>
      );

      expect(getByText('Custom header using h3')).toHaveFocus();

      userEvent.tab();

      userEvent.tab();

      expect(getByText('Custom header using h3')).not.toHaveFocus();
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
          <Modal isOpen onClose={jest.fn()} isCloseButtonHidden>
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
          <Modal header="Hello" isOpen onClose={jest.fn()} isCloseButtonHidden>
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
          <Modal header="Hello" isOpen onClose={jest.fn()} isCloseButtonHidden>
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
          <Modal isOpen onClose={jest.fn()} isCloseButtonHidden>
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
          <Modal isOpen onClose={jest.fn()} isCloseButtonHidden>
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
          <Modal header="Hello" isOpen onClose={jest.fn()} isCloseButtonHidden>
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

  describe('nested modals', () => {
    it('should keep focus trapped in the top-most modal and not get stuck', () => {
      const onCloseOuter = jest.fn();
      const onCloseInner = jest.fn();

      const { getAllByTestId, getByTestId, getByText } = render(
        <>
          <Modal header="Outer Modal" isOpen onClose={onCloseOuter}>
            <button data-testid="outerBtn">Outer Button</button>
          </Modal>
          <Modal header="Inner Modal" isOpen onClose={onCloseInner}>
            <button data-testid="innerBtn1">Yes</button>
            <button data-testid="innerBtn2">No</button>
          </Modal>
        </>
      );

      // Inner modal heading should have focus
      expect(getByText('Inner Modal')).toHaveFocus();

      // The inner modal's close button is the second one rendered
      const innerCloseBtn = getAllByTestId('modal-closebtn')[1];

      // Tab should cycle through inner modal items: Close → Yes → No → Close
      userEvent.tab();
      expect(innerCloseBtn).toHaveFocus();

      userEvent.tab();
      expect(getByTestId('innerBtn1')).toHaveFocus();

      userEvent.tab();
      expect(getByTestId('innerBtn2')).toHaveFocus();

      // Tab should wrap back to close button, not get stuck
      userEvent.tab();
      expect(innerCloseBtn).toHaveFocus();
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
