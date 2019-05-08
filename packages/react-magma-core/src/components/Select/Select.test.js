import React from 'react';
import { SelectCore } from './Select';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

describe('SelectCore', () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
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
      <SelectCore onChange={handleChange} defaultValue="Start here">
        {({ value, onChange }) => (
          <button data-testid="target" onClick={() => onChange('test')}>
            {value}
          </button>
        )}
      </SelectCore>
    );

    expect(() => fireEvent.click(getByTestId('target'))).not.toThrow();
  });

  it('should call the onBlur from props during the internal onBlur', () => {
    const handleBlur = jest.fn();
    const { getByTestId } = render(
      <SelectCore onBlur={handleBlur}>
        {({ onBlur }) => <input data-testid="target" onBlur={onBlur} />}
      </SelectCore>
    );

    fireEvent.blur(getByTestId('target'));
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should not throw if a non-function is passed as an onBlur', () => {
    const handleBlur = 'This is NOT a function';
    const { getByTestId } = render(
      <SelectCore onBlur={handleBlur}>
        {({ onBlur }) => <input data-testid="target" onBlur={onBlur} />}
      </SelectCore>
    );

    expect(() => fireEvent.blur(getByTestId('target'))).not.toThrow();
  });

  it('should call the onFocus from props during the internal onFocus', () => {
    const handleFocus = jest.fn();
    const { getByTestId } = render(
      <SelectCore onFocus={handleFocus}>
        {({ onFocus }) => <input data-testid="target" onFocus={onFocus} />}
      </SelectCore>
    );

    fireEvent.focus(getByTestId('target'));
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('should not throw if a non-function is passed as an onFocus', () => {
    const handleFocus = 'This is NOT a function';
    const { getByTestId } = render(
      <SelectCore onFocus={handleFocus}>
        {({ onFocus }) => <input data-testid="target" onFocus={onFocus} />}
      </SelectCore>
    );

    expect(() => fireEvent.focus(getByTestId('target'))).not.toThrow();
  });

  it('should call the onOpen from props during the internal onOpen', () => {
    const handleOpen = jest.fn();
    const { getByTestId } = render(
      <SelectCore onOpen={handleOpen}>
        {({ onOpen }) => <button data-testid="target" onClick={onOpen} />}
      </SelectCore>
    );

    fireEvent.click(getByTestId('target'));
    expect(handleOpen).toHaveBeenCalledTimes(1);
  });

  it('should not throw if a non-function is passed as an onOpen', () => {
    const handleOpen = 'This is NOT a function';
    const { getByTestId } = render(
      <SelectCore onOpen={handleOpen}>
        {({ onOpen }) => <button data-testid="target" onClick={onOpen} />}
      </SelectCore>
    );

    expect(() => fireEvent.click(getByTestId('target'))).not.toThrow();
  });

  it('should call the onClose from props during the internal onClose', () => {
    const handleClose = jest.fn();
    const { getByTestId } = render(
      <SelectCore onClose={handleClose}>
        {({ onClose }) => <button data-testid="target" onClick={onClose} />}
      </SelectCore>
    );

    fireEvent.click(getByTestId('target'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should not throw if a non-function is passed as an onClose', () => {
    const handleClose = 'This is NOT a function';
    const { getByTestId } = render(
      <SelectCore onClose={handleClose}>
        {({ onClose }) => <button data-testid="target" onClick={onClose} />}
      </SelectCore>
    );

    expect(() => fireEvent.click(getByTestId('target'))).not.toThrow();
  });
});
