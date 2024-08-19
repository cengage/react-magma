import * as React from 'react';
import { Radio } from '.';
import { RadioContext } from '../RadioGroup';
import { render, fireEvent } from '@testing-library/react';
import { magma } from '../../theme/magma';
import { transparentize } from 'polished';

describe('Radio', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <RadioContext.Provider
        value={{
          name: 'colors',
          selectedValue: 'blue',
          onChange: jest.fn(),
        }}
      >
        <Radio labelText="blue" testId={testId} name="colors" value="blue" />
      </RadioContext.Provider>
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should auto assign an id if none is passed in', () => {
    const { getByLabelText } = render(
      <RadioContext.Provider
        value={{
          name: 'colors',
          selectedValue: 'blue',
          onChange: jest.fn(),
        }}
      >
        <Radio labelText="blue" name="colors" value="blue" />
      </RadioContext.Provider>
    );

    expect(getByLabelText('blue').id).not.toBeNull();
  });

  it('should persist id between renders', () => {
    const { rerender, getByLabelText } = render(
      <RadioContext.Provider
        value={{
          name: 'colors',
          selectedValue: 'blue',
          onChange: jest.fn(),
        }}
      >
        <Radio labelText="blue" name="colors" value="blue" />
      </RadioContext.Provider>
    );

    const radio = getByLabelText('blue');
    const initialId = radio.id;
    const initialValue = radio.value;

    rerender(
      <RadioContext.Provider
        value={{
          name: 'colors',
          selectedValue: 'blue',
          onChange: jest.fn(),
        }}
      >
        <Radio labelText="blue" name="colors" value="pink" />
      </RadioContext.Provider>
    );

    expect(radio.value).not.toEqual(initialValue);
    expect(radio.id).toEqual(initialId);
  });

  it('should update the id on rerender with change to prop id', () => {
    const { rerender, getByLabelText } = render(
      <RadioContext.Provider
        value={{
          name: 'colors',
          selectedValue: 'blue',
          onChange: jest.fn(),
        }}
      >
        <Radio labelText="blue" name="colors" value="blue" />
      </RadioContext.Provider>
    );

    const radio = getByLabelText('blue');
    const initialId = radio.id;

    rerender(
      <RadioContext.Provider
        value={{
          name: 'colors',
          selectedValue: 'blue',
          onChange: jest.fn(),
        }}
      >
        <Radio labelText="blue" name="colors" value="blue" id="differentId" />
      </RadioContext.Provider>
    );

    expect(radio.id).not.toEqual(initialId);
  });

  it('should render a label for the radio', () => {
    const { getByText } = render(
      <RadioContext.Provider
        value={{
          name: 'colors',
          selectedValue: 'blue',
          onChange: jest.fn(),
        }}
      >
        <Radio labelText="blue" name="colors" value="blue" />
      </RadioContext.Provider>
    );
    const label = getByText('blue');

    expect(label).toBeInTheDocument();
  });

  it('should render radio button', () => {
    const { getByLabelText } = render(
      <RadioContext.Provider
        value={{
          name: 'colors',
          selectedValue: 'blue',
          onChange: jest.fn(),
        }}
      >
        <Radio labelText="blue" name="colors" value="blue" />
      </RadioContext.Provider>
    );
    const radio = getByLabelText('blue');

    expect(radio).toBeInTheDocument();
    expect(radio).toHaveAttribute('name', 'colors');
  });

  it('should require the radio button', () => {
    const { getByLabelText } = render(
      <RadioContext.Provider
        value={{
          name: 'colors',
          selectedValue: 'blue',
          onChange: jest.fn(),
        }}
      >
        <Radio labelText="blue" name="colors" value="blue" required />
      </RadioContext.Provider>
    );
    const radio = getByLabelText('blue');

    expect(radio).toHaveAttribute('required');
  });

  it('should disable the radio button', () => {
    const { container, getByLabelText } = render(
      <RadioContext.Provider
        value={{
          name: 'colors',
          selectedValue: 'blue',
          onChange: jest.fn(),
        }}
      >
        <Radio labelText="blue" name="colors" value="blue" disabled />
      </RadioContext.Provider>
    );
    const radio = getByLabelText('blue');
    const span = container.querySelector('span');

    expect(radio).toBeDisabled();
    expect(span).toHaveStyleRule('color', magma.colors.neutral300);
  });

  it('should render a passed in color', () => {
    const color = '#FFFFFF';
    const { container } = render(
      <RadioContext.Provider
        value={{
          name: 'colors',
          selectedValue: 'blue',
          onChange: jest.fn(),
        }}
      >
        <Radio
          labelText="blue"
          name="colors"
          value="blue"
          color={color}
          checked
        />
      </RadioContext.Provider>
    );
    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('color', color);
  });

  it('should render an inverse radio with the correct styles', () => {
    const { container } = render(
      <RadioContext.Provider
        value={{
          name: 'colors',
          selectedValue: 'blue',
          onChange: jest.fn(),
        }}
      >
        <Radio labelText="blue" name="colors" value="blue" isInverse />
      </RadioContext.Provider>
    );
    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('color', magma.colors.neutral100);
  });

  it('should render an inverse, disabled radio with the correct styles', () => {
    const { container } = render(
      <RadioContext.Provider
        value={{
          name: 'colors',
          selectedValue: 'blue',
          onChange: jest.fn(),
        }}
      >
        <Radio labelText="blue" name="colors" value="blue" isInverse disabled />
      </RadioContext.Provider>
    );
    const span = container.querySelector('span');

    expect(span).toHaveStyleRule(
      'color',
      transparentize(0.6, magma.colors.neutral100)
    );
  });

  it('should render a radio with hidden label text with the correct styles', () => {
    const { getByLabelText } = render(
      <RadioContext.Provider
        value={{
          name: 'colors',
          selectedValue: 'blue',
          onChange: jest.fn(),
        }}
      >
        <Radio
          labelText="blue"
          name="colors"
          value="blue"
          isTextVisuallyHidden
        />
      </RadioContext.Provider>
    );
    const span = getByLabelText('blue');

    expect(span).toHaveStyleRule('clip', 'rect(1px,1px,1px,1px)');
  });

  it("should be checked if selected value equals it's value", () => {
    const { getByLabelText } = render(
      <RadioContext.Provider
        value={{
          name: 'colors',
          selectedValue: 'blue',
          onChange: jest.fn(),
        }}
      >
        <Radio labelText="blue" name="colors" value="blue" />
      </RadioContext.Provider>
    );
    const radio = getByLabelText('blue');

    expect(radio).toHaveAttribute('checked');
  });

  it('should render a radio button with error styles', () => {
    const { container } = render(
      <RadioContext.Provider
        value={{
          name: 'colors',
          hasError: true,
          onChange: jest.fn(),
        }}
      >
        <Radio labelText="blue" name="colors" value="blue" />
      </RadioContext.Provider>
    );

    const span = container.querySelector('span');

    expect(span).toHaveStyleRule(
      'box-shadow',
      `0 0 0 2px ${magma.colors.danger}`
    );
  });

  it('should render an inverse radio button with error styles', () => {
    const { container } = render(
      <RadioContext.Provider
        value={{
          name: 'colors',
          hasError: true,
          isInverse: true,
          onChange: jest.fn(),
        }}
      >
        <Radio labelText="blue" name="colors" value="blue" />
      </RadioContext.Provider>
    );

    const span = container.querySelector('span');

    expect(span).toHaveStyleRule(
      'box-shadow',
      `0 0 0 2px ${magma.colors.danger200}`
    );
  });

  it('blurring a radio button calls the passed in onBlur function', () => {
    const onBlur = jest.fn();
    const { getByLabelText } = render(
      <RadioContext.Provider
        value={{
          name: 'colors',
          selectedValue: 'blue',
          onChange: jest.fn(),
          onBlur,
        }}
      >
        <Radio labelText="blue" name="colors" value="blue" />
      </RadioContext.Provider>
    );

    fireEvent(
      getByLabelText('blue'),
      new MouseEvent('blur', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('focusing a radio button calls the passed in onFocus function', () => {
    const onFocus = jest.fn();
    const { getByLabelText } = render(
      <RadioContext.Provider
        value={{
          name: 'colors',
          selectedValue: 'blue',
          onChange: jest.fn(),
          onFocus,
        }}
      >
        <Radio labelText="blue" name="colors" value="blue" />
      </RadioContext.Provider>
    );

    fireEvent(
      getByLabelText('blue'),
      new MouseEvent('focus', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(onFocus).toHaveBeenCalledTimes(1);
  });
});
