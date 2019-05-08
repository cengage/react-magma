import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { CheckboxCore } from './Checkbox';
import uuid from 'uuid/v4';
import 'jest-dom/extend-expect';

jest.mock('uuid/v4');

describe('CheckboxCore', () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
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

  it('should call the supplied onChange and update the value when onChange is called', () => {
    const handleChange = jest.fn();
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
    fireEvent.click(checkbox);

    expect(checkbox.checked).toBeTruthy();
    expect(handleChange).toHaveBeenCalledTimes(1);
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

  it('should call the onBlur from props during the internal onBlur', () => {
    const handleBlur = jest.fn();
    const { getByTestId } = render(
      <CheckboxCore onBlur={handleBlur}>
        {({ checked, onBlur }) => (
          <input
            type="checkbox"
            checked={checked}
            onBlur={onBlur}
            data-testid="target"
          />
        )}
      </CheckboxCore>
    );
    const checkbox = getByTestId('target');
    fireEvent.blur(checkbox);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('Should not throw if a non-function is passed as an onBlur', () => {
    const handleBlur = 'This is NOT a function';
    const { getByTestId } = render(
      <CheckboxCore onBlur={handleBlur}>
        {({ checked, onBlur }) => (
          <input
            type="checkbox"
            checked={checked}
            onBlur={onBlur}
            data-testid="target"
          />
        )}
      </CheckboxCore>
    );
    const checkbox = getByTestId('target');
    expect(() => fireEvent.blur(checkbox)).not.toThrow();
  });

  it('should call the onFocus from props during the internal onFocus', () => {
    const handleFocus = jest.fn();
    const { getByTestId } = render(
      <CheckboxCore onFocus={handleFocus}>
        {({ checked, onFocus }) => (
          <input
            type="checkbox"
            checked={checked}
            onFocus={onFocus}
            data-testid="target"
          />
        )}
      </CheckboxCore>
    );
    const checkbox = getByTestId('target');
    fireEvent.focus(checkbox);
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('Should not throw if a non-function is passed as an onFocus', () => {
    const handleFocus = 'This is NOT a function';
    const { getByTestId } = render(
      <CheckboxCore onFocus={handleFocus}>
        {({ checked, onFocus }) => (
          <input
            type="checkbox"
            checked={checked}
            onFocus={onFocus}
            data-testid="target"
          />
        )}
      </CheckboxCore>
    );
    const checkbox = getByTestId('target');
    expect(() => fireEvent.focus(checkbox)).not.toThrow();
  });
});
