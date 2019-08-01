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
          <span data-selectedvalue={selectedValue} data-testid="sample" />
        )}
      </RadioCore>
    );

    rerender(
      <RadioCore value="newValue">
        {({ selectedValue }) => (
          <span data-selectedvalue={selectedValue} data-testid="sample" />
        )}
      </RadioCore>
    );

    const newSelectedValue = getByTestId(/sample/i).getAttribute(
      'data-selectedvalue'
    );
    expect(newSelectedValue).toEqual('newValue');
  });

  it('should update the value when onChange is called', () => {
    const { getByTestId } = render(
      <RadioCore value="blue">
        {({ selectedValue, onChange }) => (
          <>
            <input
              type="radio"
              value="red"
              checked={selectedValue === 'red'}
              onChange={event => onChange(event.target.value)}
              data-testid="redRadio"
            />
            <input
              type="radio"
              value="blue"
              checked={selectedValue === 'blue'}
              onChange={event => onChange(event.target.value)}
              data-testid="blueRadio"
            />
          </>
        )}
      </RadioCore>
    );

    const redRadio = getByTestId('redRadio');
    const blueRadio = getByTestId('blueRadio');

    expect(blueRadio.checked).toBeTruthy();
    fireEvent.click(redRadio);
    expect(redRadio.checked).toBeTruthy();
  });
});
