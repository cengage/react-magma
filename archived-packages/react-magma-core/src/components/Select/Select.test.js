import React from 'react';
import { SelectCore } from './Select';
import { render, fireEvent } from '@testing-library/react';

describe('SelectCore', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should update the value on rerender to be different than the default value', () => {
    const { getByTestId, rerender } = render(
      <SelectCore defaultValue="defaultValue">
        {({ value }) => (
          <span data-selectedValue={value} data-testid="sample" />
        )}
      </SelectCore>
    );

    rerender(
      <SelectCore value="newValue">
        {({ value }) => (
          <span data-selectedValue={value} data-testid="sample" />
        )}
      </SelectCore>
    );

    const newSelectedValue = getByTestId(/sample/i).getAttribute(
      'data-selectedValue'
    );
    expect(newSelectedValue).toEqual('newValue');
  });

  it('should update the value on rerender with a change in prop value', () => {
    const { getByTestId, rerender } = render(
      <SelectCore value="firstValue">
        {({ value }) => (
          <span data-selectedValue={value} data-testid="sample" />
        )}
      </SelectCore>
    );

    rerender(
      <SelectCore value="newValue">
        {({ value }) => (
          <span data-selectedValue={value} data-testid="sample" />
        )}
      </SelectCore>
    );

    const newSelectedValue = getByTestId(/sample/i).getAttribute(
      'data-selectedValue'
    );
    expect(newSelectedValue).toEqual('newValue');
  });

  it('should call the supplied onChange and update the value when onChange is called', () => {
    const handleChange = jest.fn();
    const newValue = 'Test';
    const { getByText, queryByText, getByTestId } = render(
      <SelectCore onChange={handleChange} defaultValue="Start here">
        {({ value, onChange }) => (
          <button data-testid="target" onClick={() => onChange(newValue)}>
            {value}
          </button>
        )}
      </SelectCore>
    );

    expect(getByText(/start here/i)).toBeInTheDocument();

    fireEvent.click(getByTestId('target'));

    expect(getByText(newValue)).toBeInTheDocument();
    expect(queryByText(/start here/i)).not.toBeInTheDocument();

    expect(handleChange).toHaveBeenCalledWith(newValue);
  });

  it('Should not throw if a non-function is passed as an onChange', () => {
    const handleChange = 'This is NOT a function';
    const { getByTestId } = render(
      <SelectCore onChange={handleChange} value="Start here">
        {({ value, onChange }) => (
          <button data-testid="target" onClick={() => onChange('test')}>
            {value}
          </button>
        )}
      </SelectCore>
    );

    expect(() => fireEvent.click(getByTestId('target'))).not.toThrow();
  });
});
