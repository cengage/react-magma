import * as React from 'react';
import 'jest-dom/extend-expect';
import { Checkbox, CheckboxProps } from './Checkbox';
import { render, fireEvent, cleanup } from 'react-testing-library';

const CHECKBOX_PROPS: CheckboxProps = {
  autoFocus: false,
  id: 'abc123',
  labelText: 'test label',
  required: false
};

const renderCheckbox = (myProps = {}) => {
  const props = {
    ...CHECKBOX_PROPS,
    ...myProps
  };

  return render(<Checkbox {...props} />);
};

describe('Checkbox', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render a label for the checkbox', () => {
    const { getByText } = renderCheckbox();
    const label = getByText(CHECKBOX_PROPS.labelText);

    expect(label).toBeInTheDocument();
  });

  it('should render a checkbox text with desired attributes', () => {
    const { getByLabelText } = renderCheckbox();
    const checkbox = getByLabelText(CHECKBOX_PROPS.labelText);

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('id', CHECKBOX_PROPS.id);
    expect(checkbox).toHaveAttribute('value', CHECKBOX_PROPS.value);
    expect(checkbox).not.toHaveAttribute('required');
    expect(checkbox).not.toHaveAttribute('autoFocus');
  });

  it('should render an checkbox with a value passed through', () => {
    const value = 'Test Value';
    const { getByLabelText } = renderCheckbox({ value });
    const checkbox = getByLabelText(CHECKBOX_PROPS.labelText);

    expect(checkbox).toHaveAttribute('value', value);
  });

  it('should auto focus your checkbox', () => {
    const { getByLabelText } = renderCheckbox({ autoFocus: true });
    const checkbox = getByLabelText(CHECKBOX_PROPS.labelText);

    expect(checkbox).toHaveFocus();
  });

  it('should require the checkbox', () => {
    const { getByLabelText } = renderCheckbox({ required: true });
    const checkbox = getByLabelText(CHECKBOX_PROPS.labelText);

    expect(checkbox).toHaveAttribute('required');
  });

  it('should disable the checkbox', () => {
    const { getByLabelText } = renderCheckbox({ disabled: true });
    const checkbox = getByLabelText(CHECKBOX_PROPS.labelText);

    expect(checkbox).toBeDisabled();
  });

  describe('events', () => {
    it('should trigger the passed in handleBlur when focus is removed', () => {
      const handleBlurSpy = jest.fn();
      const { getByLabelText } = renderCheckbox({
        handleBlur: handleBlurSpy
      });

      fireEvent(
        getByLabelText(CHECKBOX_PROPS.labelText),
        new MouseEvent('blur', {
          bubbles: true,
          cancelable: true
        })
      );

      expect(handleBlurSpy).toHaveBeenCalledTimes(1);
    });

    it('should trigger the passed in handleChange when value of the checkbox is changed', () => {
      const checked = true;
      const handleChangeSpy = jest.fn();
      const { getByLabelText } = renderCheckbox({
        handleChange: handleChangeSpy
      });

      fireEvent.click(getByLabelText(CHECKBOX_PROPS.labelText));

      expect(handleChangeSpy).toHaveBeenCalledTimes(1);
      expect(handleChangeSpy).toHaveBeenCalledWith(checked);
    });

    it('should trigger the passed in handleFocus when focused', () => {
      const handleFocusSpy = jest.fn();
      const { getByLabelText } = renderCheckbox({
        handleFocus: handleFocusSpy
      });

      fireEvent(
        getByLabelText(CHECKBOX_PROPS.labelText),
        new MouseEvent('focus', {
          bubbles: true,
          cancelable: true
        })
      );

      expect(handleFocusSpy).toHaveBeenCalledTimes(1);
    });
  });
});
