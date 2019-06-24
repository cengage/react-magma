import React from 'react';
import { axe } from 'jest-axe';
import { Input, InputType } from '.';
import { render, fireEvent } from 'react-testing-library';
import { magma } from '../../theme/magma';
import { CheckIcon } from '../Icon/types/CheckIcon';

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
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = renderInput({ testId });

    expect(getByTestId(testId)).toBeInTheDocument();
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

  it('should render the defailt input styles input', () => {
    const { getByLabelText } = renderInput();
    const input = getByLabelText(INPUT_PROPS.labelText);

    expect(input).toHaveStyleRule('background', magma.colors.neutral08);
    expect(input).toHaveStyleRule('border-color', magma.colors.neutral05);
    expect(input).toHaveStyleRule('box-shadow', '0 0 0');
  });

  it('should render custom styles', () => {
    const divColor = '#000000';
    const inputColor = '#cccccc';
    const labelColor = '#ffffff';

    const { container, getByLabelText, getByText } = renderInput({
      inputStyle: { color: inputColor },
      labelStyle: { color: labelColor },
      containerStyle: { color: divColor }
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
    const { container } = renderInput({
      icon: <CheckIcon />,
      iconPosition: 'right'
    });

    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('left', 'auto');
    expect(span).toHaveStyleRule('right', '10px');
  });

  it('should render an input with a right-aligned icon in the correct position', () => {
    const { container } = renderInput({
      icon: <CheckIcon />,
      iconPosition: 'right'
    });

    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('left', 'auto');
    expect(span).toHaveStyleRule('right', '10px');
  });

  it('should render an input with a left-aligned icon in the correct position', () => {
    const { container } = renderInput({
      icon: <CheckIcon />,
      iconPosition: 'left'
    });

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

  it('should render a textarea for multiline prop', () => {
    const { container } = renderInput({ multiline: true });
    const textarea = container.querySelector('textarea');

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveStyleRule('height', '4.5em');
  });

  it('should render the input with visually hidden label text', () => {
    const { getByLabelText } = renderInput({ labelVisuallyHidden: true });
    const input = getByLabelText(INPUT_PROPS.labelText);

    expect(input).toHaveAttribute('aria-label', INPUT_PROPS.labelText);
  });

  describe('password input', () => {
    it('renders a show/hide button on password inputs', () => {
      const { getByText } = renderInput({ type: InputType.password });

      expect(getByText('Show')).toBeInTheDocument();
      expect(getByText('Show')).toHaveAttribute(
        'aria-label',
        'Show password. Note: this will visually expose your password on the screen'
      );
      expect(getByText('Password is now hidden')).toBeInTheDocument();
    });

    it('renders a show/hide button on password inputs with custom text', () => {
      const { getByText } = renderInput({
        showPasswordButtonAriaLabel: 'Test button aria label',
        showPasswordButtonText: 'Test button text',
        hiddenPasswordAnnounceText: 'Test announce text',
        type: InputType.password
      });

      expect(getByText('Test button text')).toBeInTheDocument();
      expect(getByText('Test button text')).toHaveAttribute(
        'aria-label',
        'Test button aria label'
      );
      expect(getByText('Test announce text')).toBeInTheDocument();
    });

    it('does not render a show/hide button when hidePasswordMaskButton is set to true', () => {
      const { queryByText } = renderInput({
        type: InputType.password,
        hidePasswordMaskButton: true
      });

      expect(queryByText('Show')).not.toBeInTheDocument();
    });

    it('unmasks password when show button is clicked', () => {
      const { getByText, getByLabelText } = renderInput({
        type: InputType.password
      });
      const button = getByText('Show');
      const input = getByLabelText(INPUT_PROPS.labelText);

      fireEvent.click(button);

      expect(input).toHaveProperty('type', 'text');
      expect(button).toHaveTextContent('Hide');
      expect(button).toHaveAttribute('aria-label', 'Hide password');
      expect(getByText('Password is now visible')).toBeInTheDocument();
    });

    it('unmasks password when show button is clicked with custom text', () => {
      const { getByText, getByLabelText } = renderInput({
        type: InputType.password,
        hidePasswordButtonAriaLabel: 'Test button aria label',
        hidePasswordButtonText: 'Test button text',
        shownPasswordAnnounceText: 'Test announce text'
      });
      const button = getByText('Show');
      const input = getByLabelText(INPUT_PROPS.labelText);

      fireEvent.click(button);

      expect(input).toHaveProperty('type', 'text');
      expect(button).toHaveTextContent('Test button text');
      expect(button).toHaveAttribute('aria-label', 'Test button aria label');
      expect(getByText('Test announce text')).toBeInTheDocument();
    });

    it('masks password when the hide button is clicked', () => {
      const { getByText, getByLabelText } = renderInput({
        type: InputType.password
      });
      const button = getByText('Show');
      const input = getByLabelText(INPUT_PROPS.labelText);

      fireEvent.click(button);

      expect(button).toHaveTextContent('Hide');

      fireEvent.click(button);

      expect(button).toHaveTextContent('Show');
      expect(input).toHaveProperty('type', 'password');
    });
  });

  describe('sizes', () => {
    it('default input', () => {
      const { container, getByLabelText } = renderInput({
        icon: <CheckIcon />,
        iconPosition: 'left'
      });
      const input = getByLabelText(INPUT_PROPS.labelText);
      const svg = container.querySelector('svg');

      expect(input).toHaveStyleRule('font-size', '1rem');
      expect(input).toHaveStyleRule('height', '37px');

      expect(svg).toHaveAttribute('height', '17');
    });

    it('small input', () => {
      const { container, getByLabelText } = renderInput({
        inputSize: 'small',
        icon: <CheckIcon />,
        iconPosition: 'left'
      });
      const input = getByLabelText(INPUT_PROPS.labelText);
      const svg = container.querySelector('svg');

      expect(input).toHaveStyleRule('font-size', '.875rem');
      expect(input).toHaveStyleRule('height', '29px');

      expect(svg).toHaveAttribute('height', '15');
    });

    it('large input', () => {
      const { container, getByLabelText } = renderInput({
        inputSize: 'large',
        icon: <CheckIcon />,
        iconPosition: 'left'
      });
      const input = getByLabelText(INPUT_PROPS.labelText);
      const svg = container.querySelector('svg');

      expect(input).toHaveStyleRule('font-size', '1.125rem');
      expect(input).toHaveStyleRule('height', '45px');

      expect(svg).toHaveAttribute('height', '19');
    });
  });

  describe('events', () => {
    it('should trigger the passed in onBlur when focus is removed', () => {
      const onBlurSpy = jest.fn();
      const { getByLabelText } = renderInput({
        onBlur: onBlurSpy
      });

      fireEvent(
        getByLabelText(INPUT_PROPS.labelText),
        new MouseEvent('blur', {
          bubbles: true,
          cancelable: true
        })
      );

      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });

    it('should trigger the passed in onChange when value of the input is changed', () => {
      const value = 'Change';
      const onChangeSpy = jest.fn();
      const { getByLabelText } = renderInput({
        onChange: onChangeSpy,
        value: ''
      });

      fireEvent.change(getByLabelText(INPUT_PROPS.labelText), {
        target: { value }
      });

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should trigger the passed in onFocus when focused', () => {
      const onFocusSpy = jest.fn();
      const { getByLabelText } = renderInput({
        onFocus: onFocusSpy
      });

      fireEvent(
        getByLabelText(INPUT_PROPS.labelText),
        new MouseEvent('focus', {
          bubbles: true,
          cancelable: true
        })
      );

      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('Does not violate accessibility standards', () => {
    const { container } = renderInput();
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
