import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { RadioCore } from './Radio';
import uuid from 'uuid/v4';

jest.mock('uuid/v4');

describe('RadioCore', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should auto assign an id if none is passed in', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { getByTestId } = render(
      <RadioCore>
        {({ id }) => <span data-testid="sample">{id}</span>}
      </RadioCore>
    );
    expect(getByTestId(/sample/i).innerHTML).toBe('auto-generated-id');
  });

  it('should persist id between renders', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { getByTestId, rerender } = render(
      <RadioCore>{({ id }) => <span id={id} data-testid="sample" />}</RadioCore>
    );

    expect(getByTestId(/sample/i).getAttribute('id')).toBe('auto-generated-id');

    rerender(
      <RadioCore>{({ id }) => <span id={id} data-testid="sample" />}</RadioCore>
    );

    expect(getByTestId(/sample/i).getAttribute('id')).toBe('auto-generated-id');
  });

  it('should update the id on rerender with a change in prop id', () => {
    const { getByTestId, rerender } = render(
      <RadioCore>{({ id }) => <span id={id} data-testid="sample" />}</RadioCore>
    );

    rerender(
      <RadioCore id="differentId">
        {({ id }) => <span id={id} data-testid="sample" />}
      </RadioCore>
    );

    const newId = getByTestId(/sample/i).getAttribute('id');
    expect(newId).toEqual('differentId');
  });

  it('should update the selected value on rerender with a change in prop value', () => {
    const { getByTestId, rerender } = render(
      <RadioCore>
        {({ selectedValue }) => (
          <span data-selectedValue={selectedValue} data-testid="sample" />
        )}
      </RadioCore>
    );

    rerender(
      <RadioCore value="newValue">
        {({ selectedValue }) => (
          <span data-selectedValue={selectedValue} data-testid="sample" />
        )}
      </RadioCore>
    );

    const newSelectedValue = getByTestId(/sample/i).getAttribute(
      'data-selectedValue'
    );
    expect(newSelectedValue).toEqual('newValue');
  });

  it('should call the supplied onChange and update the value when onChange is called', () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <RadioCore onChange={handleChange} value="blue">
        {({ value, onChange }) => (
          <input
            type="radio"
            value={value}
            onChange={onChange}
            data-testid="target"
          />
        )}
      </RadioCore>
    );

    const radio = getByTestId('target');

    expect(radio.value).toBe('blue');
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('Should not throw if a non-function is passed as an onChange', () => {
    const handleChange = 'This is NOT a function';
    const { getByTestId } = render(
      <RadioCore onChange={handleChange}>
        {({ checked, onChange }) => (
          <input
            type="radio"
            checked={checked}
            onChange={onChange}
            data-testid="target"
          />
        )}
      </RadioCore>
    );

    const radio = getByTestId('target');

    expect(radio.checked).toBeFalsy();
    expect(() => fireEvent.click(radio)).not.toThrow();
    expect(radio.checked).toBeTruthy();
  });

  it('should call the onBlur from props during the internal onBlur', () => {
    const handleBlur = jest.fn();
    const { getByTestId } = render(
      <RadioCore onBlur={handleBlur}>
        {({ checked, onBlur }) => (
          <input
            type="radio"
            checked={checked}
            onBlur={onBlur}
            data-testid="target"
          />
        )}
      </RadioCore>
    );
    const radio = getByTestId('target');
    fireEvent.blur(radio);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('Should not throw if a non-function is passed as an onBlur', () => {
    const handleBlur = 'This is NOT a function';
    const { getByTestId } = render(
      <RadioCore onBlur={handleBlur}>
        {({ checked, onBlur }) => (
          <input
            type="radio"
            checked={checked}
            onBlur={onBlur}
            data-testid="target"
          />
        )}
      </RadioCore>
    );
    const radio = getByTestId('target');
    expect(() => fireEvent.blur(radio)).not.toThrow();
  });

  it('should call the onFocus from props during the internal onFocus', () => {
    const handleFocus = jest.fn();
    const { getByTestId } = render(
      <RadioCore onFocus={handleFocus}>
        {({ checked, onFocus }) => (
          <input
            type="radio"
            checked={checked}
            onFocus={onFocus}
            data-testid="target"
          />
        )}
      </RadioCore>
    );
    const radio = getByTestId('target');
    fireEvent.focus(radio);
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('Should not throw if a non-function is passed as an onFocus', () => {
    const handleFocus = 'This is NOT a function';
    const { getByTestId } = render(
      <RadioCore onFocus={handleFocus}>
        {({ checked, onFocus }) => (
          <input
            type="radio"
            checked={checked}
            onFocus={onFocus}
            data-testid="target"
          />
        )}
      </RadioCore>
    );
    const radio = getByTestId('target');
    expect(() => fireEvent.focus(radio)).not.toThrow();
  });
});
