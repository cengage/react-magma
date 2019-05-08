import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { InputCore } from './Input';
import uuid from 'uuid/v4';
import 'jest-dom/extend-expect';

jest.mock('uuid/v4');

describe('InputCore', () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it('should auto assign an id if none is passed in', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { getByTestId } = render(
      <InputCore>
        {({ id }) => <span data-testid="target">{id}</span>}
      </InputCore>
    );
    expect(getByTestId(/target/i).innerHTML).toBe('auto-generated-id');
  });

  it('should persist id between renders', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { getByTestId, rerender } = render(
      <InputCore>{({ id }) => <span id={id} data-testid="target" />}</InputCore>
    );

    expect(getByTestId(/target/i).getAttribute('id')).toBe('auto-generated-id');

    rerender(
      <InputCore>{({ id }) => <span id={id} data-testid="target" />}</InputCore>
    );

    expect(getByTestId(/target/i).getAttribute('id')).toBe('auto-generated-id');
  });

  it('should update the id on rerender with a change in prop id', () => {
    const { getByTestId, rerender } = render(
      <InputCore>{({ id }) => <span id={id} data-testid="target" />}</InputCore>
    );

    rerender(
      <InputCore id="differentId">
        {({ id }) => <span id={id} data-testid="target" />}
      </InputCore>
    );

    const newId = getByTestId('target').getAttribute('id');
    expect(newId).toEqual('differentId');
  });

  describe('state management', () => {
    it('should update passwordShown when togglePasswordShown is called', () => {
      const { getByTestId, getByText, queryByText } = render(
        <InputCore type="password">
          {({ togglePasswordShown, passwordShown }) => (
            <button data-testid="target" onClick={togglePasswordShown}>
              {passwordShown ? 'Shown' : 'Hidden'}
            </button>
          )}
        </InputCore>
      );

      expect(getByText('Hidden')).toBeInTheDocument();

      fireEvent.click(getByTestId('target'));

      expect(queryByText('Hidden')).not.toBeInTheDocument();
      expect(getByText('Shown')).toBeInTheDocument();
    });

    it('should call the supplied onChange and update the value when onChange is called', () => {
      const handleChange = jest.fn();
      const { getByTestId, getByDisplayValue } = render(
        <InputCore onChange={handleChange} value="">
          {({ onChange, value }) => (
            <input value={value} onChange={onChange} data-testid="target" />
          )}
        </InputCore>
      );

      fireEvent.change(getByTestId('target'), {
        target: { value: 'whatever' }
      });

      expect(getByDisplayValue('whatever')).toBeInTheDocument();
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('Should not throw if a non-function is passed as an onChange', () => {
      const handleChange = 'This is NOT a function';
      const { getByTestId } = render(
        <InputCore onChange={handleChange} value="">
          {({ onChange, value }) => (
            <input value={value} onChange={onChange} data-testid="target" />
          )}
        </InputCore>
      );

      expect(() =>
        fireEvent.change(getByTestId('target'), {
          target: { value: 'whatever' }
        })
      ).not.toThrow();
    });

    it('should call the onBlur from props during the internal onBlur', () => {
      const handleBlur = jest.fn();
      const handleFocus = jest.fn();
      const { getByTestId } = render(
        <InputCore onBlur={handleBlur} onFocus={handleFocus}>
          {({ onBlur, onFocus }) => (
            <input data-testid="target" onFocus={onFocus} onBlur={onBlur} />
          )}
        </InputCore>
      );
      const theInput = getByTestId('target');
      fireEvent.focus(theInput);
      expect(handleFocus).toHaveBeenCalledTimes(1);

      fireEvent.blur(theInput);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });
});
