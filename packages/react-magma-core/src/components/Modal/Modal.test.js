import React from 'react';
import { render } from '@testing-library/react';
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
});
