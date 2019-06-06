import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { ModalCore } from './Modal';

describe('ModalCore', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should handle close', () => {
    const onClose = jest.fn();
    const { getByText, getByTestId, rerender } = render(
      <>
        <button>Open</button>
        <ModalCore onClose={onClose}>
          {({ isExiting, onClose }) => (
            <button onClick={onClose} data-testid="target">
              {isExiting ? 'Exiting' : 'Not Exiting'}
            </button>
          )}
        </ModalCore>
      </>
    );

    fireEvent.focus(getByText('Open'));

    rerender(
      <>
        <button>Open</button>
        <ModalCore onClose={onClose} open={true}>
          {({ isExiting, onClose, focusTrapElement }) => (
            <div ref={focusTrapElement}>
              <button onClick={onClose} data-testid="target">
                {isExiting ? 'Exiting' : 'Not Exiting'}
              </button>
            </div>
          )}
        </ModalCore>
      </>
    );

    expect(getByText(/not/i)).toBeInTheDocument();

    fireEvent.click(getByTestId('target'));
    jest.runAllTimers();

    expect(getByText(/exiting/i)).toBeInTheDocument();
    expect(onClose).toHaveBeenCalled();
  });

  describe('Key down', () => {
    it('should handle escape key', () => {
      const onEscKeyDown = jest.fn();
      const onClose = jest.fn();
      const { getByText, getByTestId, rerender } = render(
        <>
          <button>Open</button>
          <ModalCore onEscKeyDown={onEscKeyDown} onClose={onClose}>
            {({ isExiting, onKeyDown }) => (
              <div
                role="presentation"
                onKeyDown={onKeyDown}
                data-testid="target"
              >
                <button>{isExiting ? 'Exiting' : 'Not Exiting'}</button>
              </div>
            )}
          </ModalCore>
        </>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <>
          <button>Open</button>
          <ModalCore onEscKeyDown={onEscKeyDown} onClose={onClose} open={true}>
            {({ isExiting, onKeyDown, focusTrapElement }) => (
              <div
                role="presentation"
                onKeyDown={onKeyDown}
                ref={focusTrapElement}
                data-testid="target"
              >
                <button>{isExiting ? 'Exiting' : 'Not Exiting'}</button>
              </div>
            )}
          </ModalCore>
        </>
      );

      expect(getByText(/not/i)).toBeInTheDocument();

      fireEvent.keyDown(getByTestId('target'), {
        keyCode: 27
      });
      jest.runAllTimers();

      expect(getByText(/exiting/i)).toBeInTheDocument();
      expect(onEscKeyDown).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });

    it('should handle tab and loop it through the modal', () => {
      const { getByTestId, rerender } = render(
        <>
          <ModalCore>
            {({ onKeyDown }) => (
              <div
                role="presentation"
                onKeyDown={onKeyDown}
                data-testid="target"
              >
                <button data-testid="closeButton">Close</button>
                <input type="text" name="email" />
                <input type="text" name="password" />
              </div>
            )}
          </ModalCore>
          <button>Outside of the modal</button>
        </>
      );

      rerender(
        <>
          <ModalCore open={true}>
            {({ onKeyDown, focusTrapElement }) => (
              <div
                role="presentation"
                onKeyDown={onKeyDown}
                data-testid="target"
                ref={focusTrapElement}
              >
                <button data-testid="closeButton">Close</button>
                <input data-testid="emailInput" type="text" name="email" />
                <input
                  data-testid="passwordInput"
                  type="text"
                  name="password"
                />
              </div>
            )}
          </ModalCore>
          <button>Outside of the modal</button>
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

    it('should handle shift + tab and loop it through the modal', () => {
      const { getByTestId, rerender } = render(
        <>
          <ModalCore>
            {({ onKeyDown }) => (
              <div
                role="presentation"
                onKeyDown={onKeyDown}
                data-testid="target"
              >
                <button data-testid="closeButton">Close</button>
                <input type="text" name="email" />
                <input type="text" name="password" />
              </div>
            )}
          </ModalCore>
          <button>Outside of the modal</button>
        </>
      );

      rerender(
        <>
          <ModalCore open={true}>
            {({ onKeyDown, focusTrapElement }) => (
              <div
                role="presentation"
                onKeyDown={onKeyDown}
                data-testid="target"
                ref={focusTrapElement}
              >
                <button data-testid="closeButton">Close</button>
                <input data-testid="emailInput" type="text" name="email" />
                <input
                  data-testid="passwordInput"
                  type="text"
                  name="password"
                />
              </div>
            )}
          </ModalCore>
          <button>Outside of the modal</button>
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

    it('should not break if a different key is pressed', () => {
      const { getByTestId, rerender } = render(
        <>
          <button>Open</button>
          <ModalCore>
            {({ onKeyDown }) => (
              <div
                role="presentation"
                onKeyDown={onKeyDown}
                data-testid="target"
              >
                <button data-testid="closeButton">Close</button>
                <input type="text" name="email" />
                <input type="text" name="password" />
              </div>
            )}
          </ModalCore>
        </>
      );

      rerender(
        <>
          <button>Open</button>
          <ModalCore open={true}>
            {({ onKeyDown, focusTrapElement }) => (
              <div
                role="presentation"
                onKeyDown={onKeyDown}
                ref={focusTrapElement}
                data-testid="target"
              >
                <button data-testid="closeButton">Close</button>
                <input type="text" name="email" />
                <input type="text" name="password" />
              </div>
            )}
          </ModalCore>
        </>
      );

      fireEvent.keyDown(getByTestId('target'), {
        keyCode: 10
      });

      expect(getByTestId('closeButton')).toBeInTheDocument();
    });
  });
});
