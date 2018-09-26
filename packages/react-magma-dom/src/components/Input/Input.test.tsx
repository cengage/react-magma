import * as React from 'react';
import 'jest-dom/extend-expect';
import { Input, InputProps } from './Input';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from 'react-testing-library';

const INPUT_PROPS: InputProps = {
  autoFocus: false,
  id: 'abc123',
  labelText: 'test label',
  placeholder: 'test placeholder',
  required: false
};

const renderInput = (myProps = {}) => {
  const props = {
    ...INPUT_PROPS,
    ...myProps
  };

  return render(<Input {...props} />);
};

describe('Input', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render a label for the input', () => {
    const { getByText } = renderInput();
    const label = getByText(INPUT_PROPS.labelText);

    expect(label).toBeInTheDocument();
  });

  it('should render a input text with desired attributes', () => {
    const { getByLabelText } = renderInput();
    const input = getByLabelText(INPUT_PROPS.labelText);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', INPUT_PROPS.id);
    expect(input).toHaveAttribute('placeholder', INPUT_PROPS.placeholder);
    expect(input).toHaveAttribute('value', INPUT_PROPS.value);
    expect(input).not.toHaveAttribute('required');
    expect(input).not.toHaveAttribute('autoFocus');
  });

  it('should render an input with a value passed through', () => {
    const value = 'Test Value';
    const { getByLabelText } = renderInput({ value });
    const input = getByLabelText(INPUT_PROPS.labelText);

    expect(input).toHaveAttribute('value', value);
  });

  it('should default to type of text for the input', () => {
    const { getByLabelText } = renderInput();
    const input = getByLabelText(INPUT_PROPS.labelText);

    expect(input).toHaveAttribute('type', 'text');
  });

  it('should use the type passed in to the input', () => {
    const type = 'password';
    const { getByLabelText } = renderInput({ type });
    const input = getByLabelText(INPUT_PROPS.labelText);

    expect(input).toHaveAttribute('type', type);
  });

  it('should auto focus your input', () => {
    const { getByLabelText } = renderInput({ autoFocus: true });
    const input = getByLabelText(INPUT_PROPS.labelText);

    expect(input).toHaveFocus();
  });

  it('should require the input', () => {
    const { getByLabelText } = renderInput({ required: true });
    const input = getByLabelText(INPUT_PROPS.labelText);

    expect(input).toHaveAttribute('required');
  });

  it('should disable the input', () => {
    const { getByLabelText } = renderInput({ disabled: true });
    const input = getByLabelText(INPUT_PROPS.labelText);

    expect(input).toBeDisabled();
  });

  describe('events', () => {
    it('should trigger the passed in handleBlur when clicked', () => {
      const handleBlurSpy = jest.fn();
      const { getByLabelText } = renderInput({
        handleBlur: handleBlurSpy
      });

      fireEvent(
        getByLabelText(INPUT_PROPS.labelText),
        new MouseEvent('blur', {
          bubbles: true,
          cancelable: true
        })
      );

      expect(handleBlurSpy).toHaveBeenCalledTimes(1);
    });

    it('should trigger the passed in handleChange when clicked', () => {
      const value = 'Change';
      const handleChangeSpy = jest.fn();
      const { getByLabelText } = renderInput({
        handleChange: handleChangeSpy
      });

      fireEvent.change(getByLabelText(INPUT_PROPS.labelText), {
        target: { value }
      });

      expect(handleChangeSpy).toHaveBeenCalledTimes(1);
      expect(handleChangeSpy).toHaveBeenCalledWith(value);
    });

    it('should trigger the passed in handleFocus when clicked', () => {
      const handleFocusSpy = jest.fn();
      const { getByLabelText } = renderInput({
        handleFocus: handleFocusSpy
      });

      fireEvent(
        getByLabelText(INPUT_PROPS.labelText),
        new MouseEvent('focus', {
          bubbles: true,
          cancelable: true
        })
      );

      expect(handleFocusSpy).toHaveBeenCalledTimes(1);
    });
  });
});
