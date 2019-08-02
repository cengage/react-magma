import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { ModalCore } from './Modal';
import uuid from 'uuid/v4';

jest.mock('uuid/v4');

describe('ModalCore', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should auto assign an id if none is passed in', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { getByTestId } = render(
      <ModalCore>
        {({ id }) => <span data-testid="target">{id}</span>}
      </ModalCore>
    );
    expect(getByTestId(/target/i).innerHTML).toBe('auto-generated-id');
  });

  it('should persist id between renders', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { getByTestId, rerender } = render(
      <ModalCore>{({ id }) => <span id={id} data-testid="target" />}</ModalCore>
    );

    expect(getByTestId(/target/i).getAttribute('id')).toBe('auto-generated-id');

    rerender(
      <ModalCore>{({ id }) => <span id={id} data-testid="target" />}</ModalCore>
    );

    expect(getByTestId(/target/i).getAttribute('id')).toBe('auto-generated-id');
  });

  it('should update the id on rerender with a change in prop id', () => {
    const { getByTestId, rerender } = render(
      <ModalCore>{({ id }) => <span id={id} data-testid="target" />}</ModalCore>
    );

    rerender(
      <ModalCore id="differentId">
        {({ id }) => <span id={id} data-testid="target" />}
      </ModalCore>
    );

    const newId = getByTestId(/target/i).getAttribute('id');
    expect(newId).toEqual('differentId');
  });

  it('should handle close', () => {
    const onClose = jest.fn();
    const onCloseCallback = jest.fn();
    const { getByText, getByTestId, rerender } = render(
      <>
        <button>Open</button>
        <ModalCore>
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
              <button
                onClick={() => onClose(onCloseCallback)}
                data-testid="target"
              >
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
    expect(onCloseCallback).toHaveBeenCalled();
  });
});
