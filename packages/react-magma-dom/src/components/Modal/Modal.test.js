/// <reference types="jest-dom/extend-expect"/>
import React from 'react';
import { axe } from 'jest-axe';
import { Modal } from '.';
import { render, fireEvent } from 'react-testing-library';

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
    const { getByText } = render(
      <Modal header="Hello" open={true}>
        {modalContent}
      </Modal>
    );

    expect(getByText(modalContent)).toBeInTheDocument();
  });

  it('should render a header', () => {
    const headerText = 'Hello';
    const { getByText } = render(
      <Modal header={headerText} open={true}>
        Modal Content
      </Modal>
    );

    expect(getByText(headerText)).toBeInTheDocument();
  });

  it('should render a close button', () => {
    const { getByText } = render(
      <Modal header="Hello" open={true}>
        Modal Content
      </Modal>
    );

    expect(getByText(/close/i)).toBeInTheDocument();
  });

  it('should not render a close button if the hideEscButton prop is true', () => {
    const { queryByText } = render(
      <Modal header="Hello" open={true} hideEscButton>
        Modal Content
      </Modal>
    );

    expect(queryByText(/close/i)).not.toBeInTheDocument();
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

      fireEvent.click(getByText(/close/i));

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

      fireEvent.click(getByTestId('modal-backdrop'));

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
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(
      <Modal header="Hello" open={true}>
        Modal Content
      </Modal>
    );
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
