import React from 'react';
import { axe } from 'jest-axe';
import { Input } from './Input';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { magma } from '../../theme/magma';

const INPUT_PROPS = {
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

  it('should render custom styles', () => {
    const divColor = '#000000';
    const inputColor = '#cccccc';
    const labelColor = '#ffffff';

    const { container, getByLabelText, getByText } = renderInput({
      inputStyle: { color: inputColor },
      labelStyle: { color: labelColor },
      style: { color: divColor }
    });

    const div = container.querySelector('div');
    const label = getByText(INPUT_PROPS.labelText);
    const input = getByLabelText(INPUT_PROPS.labelText);

    expect(div).toHaveStyle(`color: ${divColor}`);
    expect(input).toHaveStyle(`color: ${inputColor}`);
    expect(label).toHaveStyle(`color: ${labelColor}`);
  });

  it('should render an inverse input with the correct styles', () => {
    const { getByText } = renderInput({ inverse: true });

    const label = getByText(INPUT_PROPS.labelText);

    expect(label).toHaveStyleRule('color', magma.colors.neutral08);
  });

  it('should render an input with a correctly styled helper message', () => {
    const testMessage = 'Test message';
    const { getByText } = renderInput({ helperMessage: testMessage });

    const helperMessage = getByText(testMessage);

    expect(helperMessage).toHaveStyleRule('color', magma.colors.neutral04);
  });

  it('should render an inverse input with a correctly styled helper message', () => {
    const testMessage = 'Test message';
    const { getByText } = renderInput({
      helperMessage: testMessage,
      inverse: true
    });

    const helperMessage = getByText(testMessage);

    expect(helperMessage).toHaveStyleRule('color', magma.colors.neutral08);
  });

  it('should render an input with a correctly styled error message', () => {
    const testMessage = 'Test error message';
    const { getByText, getByLabelText } = renderInput({
      errorMessage: testMessage
    });

    const input = getByLabelText(INPUT_PROPS.labelText);
    const errorMessage = getByText(testMessage);

    expect(input).toHaveStyleRule('border-color', magma.colors.danger);

    expect(errorMessage).toHaveStyleRule('background', 'none');
    expect(errorMessage).toHaveStyleRule('color', magma.colors.danger);
  });

  it('should render an inverse input with a correctly styled error message', () => {
    const testMessage = 'Test error message';
    const { getByText, getByLabelText } = renderInput({
      errorMessage: testMessage,
      inverse: true
    });

    const input = getByLabelText(INPUT_PROPS.labelText);
    const errorMessage = getByText(testMessage);

    expect(input).toHaveStyleRule('border-color', magma.colors.danger);

    expect(errorMessage).toHaveStyleRule('background', magma.colors.danger);
    expect(errorMessage).toHaveStyleRule('color', magma.colors.neutral08);
  });

  it('should render an input with a right-aligned icon in the correct position', () => {
    const { container } = renderInput({ icon: 'check', iconPosition: 'right' });

    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('left', 'auto');
    expect(span).toHaveStyleRule('right', '10px');
  });

  it('should render an input with a left-aligned icon in the correct position', () => {
    const { container } = renderInput({ icon: 'check', iconPosition: 'left' });

    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('left', '10px');
    expect(span).toHaveStyleRule('right', 'auto');
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
    it('should trigger the passed in handleBlur when focus is removed', () => {
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

    it('should trigger the passed in handleChange when value of the input is changed', () => {
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

    it('should trigger the passed in handleFocus when focused', () => {
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

  it('Does not violate accessibility standards', () => {
    const { container } = renderInput();
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
