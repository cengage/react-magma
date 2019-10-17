import React from 'react';
import { render } from '@testing-library/react';
import { FormGroupCore } from './FormGroup';
import uuid from 'uuid/v4';

jest.mock('uuid/v4');

describe('FormGroupCore', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should auto assign an id if none is passed in', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { getByTestId } = render(
      <FormGroupCore>
        {({ id }) => <span data-testid="target">{id}</span>}
      </FormGroupCore>
    );
    expect(getByTestId(/target/i).innerHTML).toBe('auto-generated-id');
  });

  it('should persist id between renders', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { getByTestId, rerender } = render(
      <FormGroupCore>
        {({ id }) => <span id={id} data-testid="target" />}
      </FormGroupCore>
    );

    expect(getByTestId(/target/i).getAttribute('id')).toBe('auto-generated-id');

    rerender(
      <FormGroupCore>
        {({ id }) => <span id={id} data-testid="target" />}
      </FormGroupCore>
    );

    expect(getByTestId(/target/i).getAttribute('id')).toBe('auto-generated-id');
  });

  it('should update the id on rerender with a change in prop id', () => {
    const { getByTestId, rerender } = render(
      <FormGroupCore>
        {({ id }) => <span id={id} data-testid="target" />}
      </FormGroupCore>
    );

    rerender(
      <FormGroupCore id="differentId">
        {({ id }) => <span id={id} data-testid="target" />}
      </FormGroupCore>
    );

    const newId = getByTestId(/target/i).getAttribute('id');
    expect(newId).toEqual('differentId');
  });
});
