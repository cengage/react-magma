import React from 'react';

import { render, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { axe } from '../../../axe-helper';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';
import { magma } from '../../theme/magma';
import { Button } from '../Button';

import { Modal } from '.';

describe('Modal', () => {
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

  describe('Closing', () => {
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

      getByText('Open').focus();

      rerender(
        <>
          <button>Open</button>
          <Modal header="Hello" isOpen onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      await userEvent.click(getByTestId('modal-closebtn'));

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

      expect(onCloseSpy).not.toHaveBeenCalled();
      await waitForElementToBeRemoved(() => queryByText('Modal Content'));
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

      getByText('Open').focus();

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

      await userEvent.click(getByTestId('modal-closebtn'));

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

      getByText('Open').focus();

      rerender(
        <>
          <button>Open</button>
          <Modal header="Hello" isOpen onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      await userEvent.keyboard('{Escape}');

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

      getByText('Open').focus();

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

      await userEvent.keyboard('{Escape}');

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

      getByText('Open').focus();

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

      await userEvent.keyboard('{Escape}');

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

      getByText('Open').focus();

      rerender(
        <>
          <button>Open</button>
          <Modal header="Hello" isOpen onClose={onCloseSpy} testId={testId}>
            Modal Content
          </Modal>
        </>
      );

      await userEvent.click(getByTestId(testId));

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

      getByText('Open').focus();

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

      await userEvent.click(getByTestId(testId));

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

      getByText('Open').focus();

      rerender(
        <>
          <button>Open</button>
          <Modal header="Hello" isOpen onClose={onCloseSpy} testId={testId}>
            {modalContent}
          </Modal>
        </>
      );

      const modal = getByTestId(testId);
      const backdrop = modal.parentElement;

      await userEvent.pointer({
        target: modal,
        keys: '[MouseLeft>]',
      });

      await userEvent.pointer({
        target: backdrop,
        keys: '[/MouseLeft]',
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

      getByText('Open').focus();

      rerender(
        <>
          <button>Open</button>
          <Modal header="Hello" isOpen onClose={onCloseSpy}>
            Modal Content
          </Modal>
        </>
      );

      await userEvent.click(getByTestId('modal-content'));

      expect(onCloseSpy).not.toHaveBeenCalled();
    });

    // TODO: Fix test (Rerender doesn't call onClose function)
    xit('should fire the close event when the open prop changes from true to false', async () => {
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

      getByText('Open').focus();

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

      await userEvent.keyboard('{Escape}');

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

      getByText('Open').focus();

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

      await userEvent.click(getByTestId('modal-backdrop'));

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

      getByText('Open').focus();

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

      await userEvent.click(getByTestId('modal-backdrop'));

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

      getByText('Open').focus();

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

      getByText('Open Modal Two').focus();

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

      await userEvent.keyboard('{Escape}');

      expect(onEscKeyDown).toHaveBeenCalled();
      await waitForElementToBeRemoved(() => queryByText('Modal Two Content'));
      expect(getByText('Modal Content')).toBeInTheDocument();

      await userEvent.keyboard('{Escape}');

      expect(onEscKeyDown).toHaveBeenCalled();
      await waitForElementToBeRemoved(() => queryByText('Modal Content'));
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

      getByText('Open').focus();

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

    it('should focus the first actionable element element upon opening the modal if there is no header', () => {
      const { rerender, getByText, getByTestId } = render(
        <>
          <button>Open</button>
          <Modal isOpen={false} onClose={jest.fn()}>
            <button data-testid="closeButton">Close</button>
          </Modal>
        </>
      );

      getByText('Open').focus();

      rerender(
        <>
          <button>Open</button>
          <Modal isOpen onClose={jest.fn()}>
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

      getByText('Open').focus();

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

      getByText('Open').focus();

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

      await userEvent.tab();

      expect(getByTestId('closeButton')).toHaveFocus();

      await userEvent.tab();
      await userEvent.tab();
      await userEvent.tab();

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

      await userEvent.tab();
      await userEvent.tab();

      expect(getByText('Custom header using h3')).not.toHaveFocus();
    });

    it('should not attempt to loop through the modal if there are no tabbable elements', async () => {
      const { getByText, rerender } = render(
        <>
          <button>Open</button>
          <Modal isOpen={false} onClose={jest.fn()} isCloseButtonHidden>
            <p>Modal Content </p>
          </Modal>
        </>
      );

      getByText('Open').focus();

      rerender(
        <>
          <button>Open</button>
          <Modal isOpen onClose={jest.fn()} isCloseButtonHidden>
            <p>Modal Content </p>
          </Modal>
        </>
      );

      await userEvent.tab();

      expect(getByText('Modal Content')).toHaveFocus();
    });

    it('should handle shift + tab and loop it through the modal', async () => {
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

      getByText('Open').focus();

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

      await userEvent.tab({ shift: true });

      expect(getByTestId('passwordInput')).toHaveFocus();

      await userEvent.tab({ shift: true });

      expect(getByTestId('emailInput')).toHaveFocus();

      await userEvent.tab({ shift: true });

      expect(getByTestId('closeButton')).toHaveFocus();

      await userEvent.tab({ shift: true });

      expect(getByTestId('passwordInput')).toHaveFocus();
    });

    it('should handle shift + tab and loop it through the modal if the first element is a set of radio buttons', async () => {
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

      getByText('Open').focus();

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

      await userEvent.tab({ shift: true });

      expect(getByTestId('closeButton')).toHaveFocus();
    });

    // TODO: Fix test (Focus should be on first element, not close button)
    xit('should update the focusable elements to tab through when the modal content is changed', async () => {
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

      getByText('Open').focus();

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

      await userEvent.tab();
      await userEvent.tab();
      await userEvent.tab();

      expect(getByTestId('closeButton')).toHaveFocus();
    });

    it('should not break if a different key is pressed', async () => {
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

      getByText('Open').focus();

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

      await userEvent.keyboard('{Enter}');

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
