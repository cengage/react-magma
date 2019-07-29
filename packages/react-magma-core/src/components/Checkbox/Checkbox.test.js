import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { CheckboxCore } from './Checkbox';
import uuid from 'uuid/v4';

jest.mock('uuid/v4');

describe('CheckboxCore', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should auto assign an id if none is passed in', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { getByTestId } = render(
      <CheckboxCore>
        {({ id }) => <span data-testid="target">{id}</span>}
      </CheckboxCore>
    );
    expect(getByTestId(/target/i).innerHTML).toBe('auto-generated-id');
  });

  it('should persist id between renders', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { getByTestId, rerender } = render(
      <CheckboxCore>
        {({ id }) => <span id={id} data-testid="target" />}
      </CheckboxCore>
    );

    expect(getByTestId(/target/i).getAttribute('id')).toBe('auto-generated-id');

    rerender(
      <CheckboxCore>
        {({ id }) => <span id={id} data-testid="target" />}
      </CheckboxCore>
    );

    expect(getByTestId(/target/i).getAttribute('id')).toBe('auto-generated-id');
  });

  it('should update the id on rerender with a change in prop id', () => {
    const { getByTestId, rerender } = render(
      <CheckboxCore>
        {({ id }) => <span id={id} data-testid="target" />}
      </CheckboxCore>
    );

    rerender(
      <CheckboxCore id="differentId">
        {({ id }) => <span id={id} data-testid="target" />}
      </CheckboxCore>
    );

    const newId = getByTestId(/target/i).getAttribute('id');
    expect(newId).toEqual('differentId');
  });

  it('should update the checked value on rerender with a change in prop checked', () => {
    const { getByTestId, rerender } = render(
      <CheckboxCore checked={false}>
        {({ checked }) => <span data-checked={checked} data-testid="target" />}
      </CheckboxCore>
    );

    rerender(
      <CheckboxCore checked={true}>
        {({ checked }) => <span data-checked={checked} data-testid="target" />}
      </CheckboxCore>
    );

    const checked = getByTestId(/target/i).getAttribute('data-checked');
    expect(checked).toEqual('true');
  });

  it('Should not throw if a non-function is passed as an onChange', () => {
    const handleChange = 'This is NOT a function';
    const { getByTestId } = render(
      <CheckboxCore onChange={handleChange}>
        {({ checked, onChange }) => (
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            data-testid="target"
          />
        )}
      </CheckboxCore>
    );

    const checkbox = getByTestId('target');

    expect(checkbox.checked).toBeFalsy();
    expect(() => fireEvent.click(checkbox)).not.toThrow();
    expect(checkbox.checked).toBeTruthy();
  });
});
