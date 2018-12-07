import React from 'react';
import { axe } from 'jest-axe';
import { Select } from './Select';
import { render, fireEvent, cleanup } from 'react-testing-library';

const options = [
  {
    label: 'Red',
    value: 'red'
  },
  {
    label: 'Blue',
    value: 'blue'
  },
  {
    label: 'Yellow',
    value: 'yellow'
  }
];

const SELECT_PROPS = {
  id: 'abc123',
  name: 'testLabel',
  labelText: 'test label',
  options
};

const renderSelect = (myProps = {}) => {
  const props = {
    ...SELECT_PROPS,
    ...myProps
  };

  return render(<Select {...props} />);
};

describe('Select', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render a label for the select', () => {
    const { getByText } = renderSelect();
    const label = getByText(SELECT_PROPS.labelText);

    expect(label).toBeInTheDocument();
  });

  it('should render a select with desired attributes', () => {
    const { getByLabelText } = renderSelect();
    const select = getByLabelText(SELECT_PROPS.labelText);

    expect(select).toHaveAttribute('aria-label', SELECT_PROPS.labelText);
  });

  it('should render a select with a value passed through', () => {
    const defaultValue = options[0];
    const { container } = renderSelect({ defaultValue });
    const input = container.querySelector(`input[name="${SELECT_PROPS.name}"]`);

    expect(input).toHaveAttribute('value', defaultValue.value);
  });

  it('should render a multi-select with a multiple values passed through', () => {
    const defaultValue = [options[0], options[1]];
    const { container, debug } = renderSelect({ defaultValue, multi: true });
    const input = container.querySelectorAll(
      `input[name="${SELECT_PROPS.name}"]`
    );

    expect(input[0]).toHaveAttribute('value', defaultValue[0].value);
    expect(input[1]).toHaveAttribute('value', defaultValue[1].value);
  });

  it('should disable the select', () => {
    const { container } = renderSelect({ disabled: true });
    const input = container.querySelector('input');

    expect(input).toBeDisabled();
  });

  describe('events', () => {
    it('should trigger the passed in handleBlur when focus is removed', () => {
      const handleBlurSpy = jest.fn();
      const { container } = renderSelect({
        handleBlur: handleBlurSpy
      });

      fireEvent(
        container.querySelector('input'),
        new MouseEvent('blur', {
          bubbles: true,
          cancelable: true
        })
      );

      expect(handleBlurSpy).toHaveBeenCalledTimes(1);
    });

    it('should trigger the passed in handleFocus when focused', () => {
      const handleFocusSpy = jest.fn();
      const { container } = renderSelect({
        handleFocus: handleFocusSpy
      });

      fireEvent(
        container.querySelector('input'),
        new MouseEvent('focus', {
          bubbles: true,
          cancelable: true
        })
      );

      expect(handleFocusSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('Does not violate accessibility standards', () => {
    const { container } = renderSelect();
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
