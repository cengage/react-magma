import React from 'react';
import { axe } from 'jest-axe';
import { Input } from '.';
import { render, fireEvent } from '@testing-library/react';
import { magma } from '../../theme/magma';
import { CheckIcon } from '../Icon/types/CheckIcon';

describe('Input', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Input testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a label for the input', () => {
    const label = 'test label';
    const { getByLabelText } = render(<Input labelText={label} />);
    expect(getByLabelText(label)).toBeInTheDocument();
  });

  it('should render a input text with desired attributes', () => {
    const testId = 'test-id';
    const id = 'abc123';
    const placeholder = 'holding a place';
    const value = 'abcdefg';
    const { getByTestId } = render(
      <Input testId={testId} id={id} placeholder={placeholder} value={value} />
    );
    const input = getByTestId(testId);

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', id);
    expect(input).toHaveAttribute('placeholder', placeholder);
    expect(input).toHaveAttribute('value', value);
    expect(input).not.toHaveAttribute('required');
    expect(input).not.toHaveAttribute('autoFocus');
  });

  it('should render the default input styles input', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Input testId={testId} />);
    const input = getByTestId(testId);

    expect(input).toHaveStyleRule('background', magma.colors.neutral08);
    expect(input).toHaveStyleRule('border-color', magma.colors.neutral03);
  });

  it('should render custom styles', () => {
    const labelText = 'test label';
    const divColor = '#000000';
    const inputColor = '#cccccc';
    const labelColor = '#ffffff';

    const { container, getByText, getByLabelText } = render(
      <Input
        labelText={labelText}
        inputStyle={{ color: inputColor }}
        labelStyle={{ color: labelColor }}
        containerStyle={{ color: divColor }}
      />
    );

    const div = container.querySelector('div');
    const label = getByText(labelText);
    const input = getByLabelText(labelText);

    expect(div).toHaveStyle(`color: ${divColor}`);
    expect(input).toHaveStyle(`color: ${inputColor}`);
    expect(label).toHaveStyle(`color: ${labelColor}`);
  });

  it('should render an inverse input with the correct styles', () => {
    const labelText = 'test label';
    const { getByText } = render(<Input labelText={labelText} isInverse />);

    expect(getByText(labelText)).toHaveStyleRule(
      'color',
      magma.colors.neutral08
    );
  });

  it('should render an input with a correctly styled helper message', () => {
    const testMessage = 'Test message';
    const { getByText } = render(<Input helperMessage={testMessage} />);

    const helperMessage = getByText(testMessage);

    expect(helperMessage).toHaveStyleRule('color', magma.colors.neutral03);
  });

  it('should render an inverse input with a correctly styled helper message', () => {
    const testMessage = 'Test message';
    const { getByText } = render(
      <Input helperMessage={testMessage} isInverse />
    );

    const helperMessage = getByText(testMessage);

    expect(helperMessage).toHaveStyleRule('color', magma.colors.neutral08);
  });

  it('should render an input with a correctly styled error message', () => {
    const labelText = 'test label';
    const testMessage = 'Test error message';
    const { getByText, getByLabelText } = render(
      <Input errorMessage={testMessage} labelText={labelText} />
    );

    const errorMessage = getByText(testMessage);

    expect(getByLabelText(labelText)).toHaveStyleRule(
      'border-color',
      magma.colors.danger
    );

    expect(errorMessage).toHaveStyleRule('background', 'none');
    expect(errorMessage).toHaveStyleRule('color', magma.colors.danger);
  });

  it('should render an inverse input with a correctly styled error message', () => {
    const labelText = 'test label';
    const testMessage = 'Test error message';
    const { getByText, getByLabelText } = render(
      <Input errorMessage={testMessage} isInverse labelText={labelText} />
    );

    const input = getByLabelText(labelText);
    const errorMessage = getByText(testMessage);

    expect(input).toHaveStyleRule('border-color', magma.colors.danger);

    expect(errorMessage).toHaveStyleRule('background', magma.colors.danger);
    expect(errorMessage).toHaveStyleRule('color', magma.colors.neutral08);
  });

  it('should render an input with a right-aligned icon by default', () => {
    const icon = <CheckIcon />;
    const { container } = render(<Input icon={icon} />);

    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('left', '10px');
    expect(span).toHaveStyleRule('right', 'auto');
  });

  it('should render an input with a right-aligned icon in the correct position', () => {
    const icon = <CheckIcon />;
    const { container } = render(<Input icon={icon} iconPosition="right" />);

    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('left', 'auto');
    expect(span).toHaveStyleRule('right', '10px');
  });

  it('should render a large input with a right-aligned icon in the correct position', () => {
    const icon = <CheckIcon />;
    const { container } = render(
      <Input icon={icon} iconPosition="right" inputSize="large" />
    );

    const span = container.querySelector('span');
    const input = container.querySelector('input');

    expect(span).toHaveStyleRule('left', 'auto');
    expect(span).toHaveStyleRule('right', '15px');

    expect(input).toHaveStyleRule('padding-right', '50px');
  });

  it('should render an input with a left-aligned icon in the correct position', () => {
    const icon = <CheckIcon />;
    const { container } = render(<Input icon={icon} iconPosition="left" />);

    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('left', '10px');
    expect(span).toHaveStyleRule('right', 'auto');
  });

  it('should render a large input with a left-aligned icon in the correct position', () => {
    const icon = <CheckIcon />;
    const { container } = render(
      <Input icon={icon} iconPosition="left" inputSize="large" />
    );

    const span = container.querySelector('span');
    const input = container.querySelector('input');

    expect(span).toHaveStyleRule('left', '15px');
    expect(span).toHaveStyleRule('right', 'auto');

    expect(input).toHaveStyleRule('padding-left', '50px');
  });

  it('should render a clickable icon', () => {
    const icon = <CheckIcon />;
    const iconAriaLabel = 'clickable icon label';
    const { getByLabelText } = render(
      <Input
        icon={icon}
        onIconClick={jest.fn()}
        inputSize="large"
        iconAriaLabel={iconAriaLabel}
      />
    );

    expect(getByLabelText(iconAriaLabel)).toBeInTheDocument();
  });

  it('should render an input with a value passed through', () => {
    const labelText = 'test label';
    const value = 'Test Value';
    const { getByLabelText } = render(
      <Input labelText={labelText} value={value} />
    );

    expect(getByLabelText(labelText)).toHaveAttribute('value', value);
  });

  it('should default to type of text for the input', () => {
    const labelText = 'test label';
    const { getByLabelText } = render(<Input labelText={labelText} />);

    expect(getByLabelText(labelText)).toHaveAttribute('type', 'text');
  });

  it('should use the type passed in to the input', () => {
    const type = 'password';
    const labelText = 'test label';
    const { getByLabelText } = render(
      <Input labelText={labelText} type={type} />
    );

    expect(getByLabelText(labelText)).toHaveAttribute('type', type);
  });

  it('should auto focus your input', () => {
    const labelText = 'test label';
    const { getByLabelText } = render(
      // eslint-disable-next-line jsx-a11y/no-autofocus
      <Input labelText={labelText} autoFocus />
    );

    expect(getByLabelText(labelText)).toHaveFocus();
  });

  it('should require the input', () => {
    const labelText = 'test label';
    const { getByLabelText } = render(<Input labelText={labelText} required />);

    expect(getByLabelText(labelText)).toHaveAttribute('required');
  });

  it('should disable the input', () => {
    const labelText = 'test label';
    const { getByLabelText } = render(<Input labelText={labelText} disabled />);

    expect(getByLabelText(labelText)).toBeDisabled();
  });

  it('should render the input with visually hidden label text', () => {
    const labelText = 'test label';
    const { getByLabelText } = render(
      <Input labelText={labelText} isLabelVisuallyHidden />
    );
    const input = getByLabelText(labelText);

    expect(input).toHaveAttribute('aria-label', labelText);
  });

  describe('sizes', () => {
    it('should render a default input with correct styles', () => {
      const labelText = 'test label';
      const icon = <CheckIcon />;
      const { container, getByLabelText } = render(
        <Input labelText={labelText} icon={icon} iconPosition="left" />
      );

      const label = container.querySelector('label');
      const input = getByLabelText(labelText);
      const iconWrapper = container.querySelector('span');
      const svg = container.querySelector('svg');

      expect(label).toHaveStyleRule('font-size', '13px');

      expect(input).toHaveStyleRule('font-size', '1rem');
      expect(input).toHaveStyleRule('height', '37px');
      expect(input).toHaveStyleRule('padding-left', '35px');

      expect(iconWrapper).toHaveStyleRule('margin-top', '-9px');
      expect(iconWrapper).toHaveStyleRule('left', '10px');
      expect(iconWrapper).toHaveStyleRule('right', 'auto');

      expect(svg).toHaveAttribute('height', '17');
    });

    it('should render a large input with correct styles', () => {
      const labelText = 'test label';
      const { container, getByLabelText } = render(
        <Input labelText={labelText} inputSize="large" />
      );

      const label = container.querySelector('label');
      const input = getByLabelText(labelText);

      expect(label).toHaveStyleRule('font-size', '16px');

      expect(input).toHaveStyleRule('font-size', '22px');
      expect(input).toHaveStyleRule('height', '58px');
      expect(input).toHaveStyleRule('padding', '0 15px');
    });

    describe('events', () => {
      it('should trigger the passed in onBlur when focus is removed', () => {
        const onBlurSpy = jest.fn();
        const labelText = 'test label';
        const { getByLabelText } = render(
          <Input labelText={labelText} onBlur={onBlurSpy} />
        );

        fireEvent(
          getByLabelText(labelText),
          new MouseEvent('blur', {
            bubbles: true,
            cancelable: true
          })
        );

        expect(onBlurSpy).toHaveBeenCalledTimes(1);
      });

      it('should trigger the passed in onChange when value of the input is changed', () => {
        const targetValue = 'Change';
        const onChangeSpy = jest.fn();
        const labelText = 'test label';
        const { getByLabelText } = render(
          <Input labelText={labelText} onChange={onChangeSpy} value="" />
        );

        fireEvent.change(getByLabelText(labelText), {
          target: { value: targetValue }
        });

        expect(onChangeSpy).toHaveBeenCalledTimes(1);
      });

      it('should trigger the passed in onFocus when focused', () => {
        const onFocusSpy = jest.fn();
        const labelText = 'test label';
        const { getByLabelText } = render(
          <Input labelText={labelText} onFocus={onFocusSpy} />
        );

        fireEvent(
          getByLabelText(labelText),
          new MouseEvent('focus', {
            bubbles: true,
            cancelable: true
          })
        );

        expect(onFocusSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('Does not violate accessibility standards', () => {
      const { container } = render(<Input labelText="test label" />);
      return axe(container.innerHTML).then(result => {
        return expect(result).toHaveNoViolations();
      });
    });
  });
});
