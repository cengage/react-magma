import React from 'react';
import { axe } from '../../../axe-helper';
import { Input } from '.';
import { render, fireEvent } from '@testing-library/react';
import { transparentize } from 'polished';
import { magma } from '../../theme/magma';
import { CheckIcon } from 'react-magma-icons';
import { defaultI18n } from '../../i18n/default';

const label = 'test label';

describe('Input', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Input testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a label for the input', () => {
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

    expect(input).toHaveStyleRule('background', 'transparent');
    expect(getByTestId(testId).parentElement).toHaveStyleRule(
      'border',
      '1px solid #707070'
    );
  });

  it('should render custom styles', () => {
    const labelText = 'test label';
    const divColor = '#000000';
    const inputColor = '#cccccc';
    const labelColor = '#ffffff';
    const wrapperWidth = '60px';

    const { container, getByText, getByLabelText, getByTestId } = render(
      <Input
        labelText={labelText}
        inputStyle={{ color: inputColor }}
        labelStyle={{ color: labelColor }}
        containerStyle={{ color: divColor }}
        inputWrapperStyle={{ width: wrapperWidth }}
        testId="input"
      />
    );

    const div = container.querySelector('div');
    const label = getByText(labelText);
    const input = getByLabelText(labelText);
    const wrapper = getByTestId('input-wrapper');

    expect(div).toHaveStyle(`color: ${divColor}`);
    expect(input).toHaveStyle(`color: ${inputColor}`);
    expect(label).toHaveStyle(`color: ${labelColor}`);
    expect(wrapper).toHaveStyle(`width: ${wrapperWidth}`);
  });

  it('should render an inverse input with the correct styles', () => {
    const labelText = 'test label';
    const { getByText } = render(<Input labelText={labelText} isInverse />);

    expect(getByText(labelText)).toHaveStyleRule(
      'color',
      magma.colors.neutral100
    );
  });

  it('should render an input with a correctly styled helper message', () => {
    const testMessage = 'Test message';
    const { getByTestId } = render(<Input helperMessage={testMessage} />);

    const helperMessage = getByTestId('inputMessage');

    expect(helperMessage).toHaveStyleRule('color', magma.colors.neutral);
  });

  it('should render an inverse input with a correctly styled helper message', () => {
    const testMessage = 'Test message';
    const { getByTestId } = render(
      <Input helperMessage={testMessage} isInverse />
    );

    const helperMessage = getByTestId('inputMessage');

    expect(helperMessage).toHaveStyleRule(
      'color',
      transparentize(0.3, magma.colors.neutral100)
    );
  });

  it('should render an input with a correctly styled error message', () => {
    const labelText = 'test label';
    const testMessage = 'Test error message';
    const { getByTestId, getByLabelText } = render(
      <Input errorMessage={testMessage} labelText={labelText} />
    );

    const errorMessage = getByTestId('inputMessage');

    expect(getByLabelText(labelText).parentElement).toHaveStyleRule(
      'border-color',
      magma.colors.danger
    );

    expect(errorMessage).toHaveStyleRule('color', magma.colors.danger);
  });

  it('should render an inverse input with a correctly styled error message', () => {
    const labelText = 'test label';
    const testMessage = 'Test error message';
    const { getByTestId, getByLabelText, getByRole } = render(
      <Input errorMessage={testMessage} isInverse labelText={labelText} />
    );

    const input = getByLabelText(labelText).parentElement;
    const errorMessage = getByTestId('inputMessage');
    const errorIcon = getByRole('img').firstChild;

    expect(input).toHaveStyleRule('border-color', magma.colors.danger300);
    expect(errorMessage).toHaveStyleRule('color', magma.colors.danger200);
    expect(errorIcon).toHaveAttribute('fill', magma.colors.danger300);
  });

  it('should render an input with a right-aligned icon by default', () => {
    const icon = <CheckIcon />;
    const { container } = render(<Input icon={icon} />);

    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('left', magma.spaceScale.spacing03);
    expect(span).toHaveStyleRule('right', 'auto');
  });

  it('should render an input with a right-aligned icon in the correct position', () => {
    const icon = <CheckIcon />;
    const { container } = render(<Input icon={icon} iconPosition="right" />);

    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('left', 'auto');
    expect(span).toHaveStyleRule('right', magma.spaceScale.spacing03);
  });

  it('should render a large input with a right-aligned icon in the correct position', () => {
    const icon = <CheckIcon />;
    const { container } = render(
      <Input icon={icon} iconPosition="right" inputSize="large" />
    );

    const span = container.querySelector('span');
    const input = container.querySelector('input');

    expect(span).toHaveStyleRule('left', 'auto');
    expect(span).toHaveStyleRule('right', magma.spaceScale.spacing04);

    expect(input).toHaveStyleRule('padding-right', magma.spaceScale.spacing10);
  });

  it('should render an input with a left-aligned icon in the correct position', () => {
    const icon = <CheckIcon />;
    const { container } = render(<Input icon={icon} iconPosition="left" />);

    const span = container.querySelector('span');

    expect(span).toHaveStyleRule('left', magma.spaceScale.spacing03);
    expect(span).toHaveStyleRule('right', 'auto');
  });

  it('should render an input with a left-aligned label in the correct position', () => {
    const { getByText } = render(
      <Input labelText={label} labelPosition="left" />
    );

    expect(getByText(label)).toBeInTheDocument();
    expect(getByText(label)).toHaveStyleRule(
      'margin',
      `${magma.spaceScale.spacing04} ${magma.spaceScale.spacing03} 0 0`
    );
  });

  it('should render a large input with a left-aligned icon in the correct position', () => {
    const icon = <CheckIcon />;
    const { container } = render(
      <Input icon={icon} iconPosition="left" inputSize="large" />
    );

    const span = container.querySelector('span');
    const input = container.querySelector('input');

    expect(span).toHaveStyleRule('left', magma.spaceScale.spacing04);
    expect(span).toHaveStyleRule('right', 'auto');

    expect(input).toHaveStyleRule('padding-left', magma.spaceScale.spacing10);
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

  it('should disable the clickable icon when the input is disabled', () => {
    const icon = <CheckIcon />;
    const iconAriaLabel = 'clickable icon label';
    const { getByLabelText } = render(
      <Input
        icon={icon}
        onIconClick={jest.fn()}
        inputSize="large"
        iconAriaLabel={iconAriaLabel}
        disabled
      />
    );

    expect(getByLabelText(iconAriaLabel)).toBeDisabled();
  });

  it('should initially render with value of `defaultValue` if no `value` provided', () => {
    const labelText = 'test label';
    const defaultValue = 'defaultValue';
    const { getByLabelText } = render(
      <Input labelText={labelText} defaultValue={defaultValue} />
    );

    expect(getByLabelText(labelText)).toHaveAttribute('value', defaultValue);
  });

  it('should render with value "0" when `defaultValue` is 0', () => {
    const labelText = 'test label';
    const defaultValue = 0;
    const { getByLabelText } = render(
      <Input labelText={labelText} defaultValue={defaultValue} />
    );

    expect(getByLabelText(labelText)).toHaveAttribute('value', '0');
  });

  it('should render an input with a value passed through', () => {
    const labelText = 'test label';
    const value = 'Test Value';
    const { getByLabelText } = render(
      <Input labelText={labelText} value={value} />
    );

    expect(getByLabelText(labelText)).toHaveAttribute('value', value);
  });

  it('should watch for input change and add the clear input button', () => {
    const onChange = jest.fn();
    const labelText = 'Input Label';
    const { getByLabelText, getByTestId } = render(
      <Input labelText={labelText} onChange={onChange} isClearable />
    );

    fireEvent.change(getByLabelText(labelText), {
      target: { value: 'new value' },
    });

    expect(onChange).toHaveBeenCalled();
    expect(getByTestId('clear-button')).toHaveStyleRule('position', 'relative');
  });

  it('should clear the input when the clear input button is clicked', () => {
    const onClear = jest.fn();
    const labelText = 'Input Label';
    const value = 'Test Value';
    const { getByTestId, getByLabelText } = render(
      <Input
        labelText={labelText}
        value={value}
        onClear={onClear}
        isClearable
      />
    );

    fireEvent.click(getByTestId('clear-button'));

    expect(onClear).toBeCalled();
    expect(getByLabelText(labelText)).toHaveAttribute('value', '');
  });

  it('should disable the clear button when the input is disabled', () => {
    const labelText = 'Input Label';
    const value = 'Test Value';
    const { getByTestId, getByLabelText } = render(
      <Input labelText={labelText} value={value} isClearable disabled />
    );

    expect(getByTestId('clear-button')).toBeDisabled();
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
    const { getByText } = render(
      <Input labelText={labelText} isLabelVisuallyHidden />
    );

    expect(getByText(labelText)).toHaveStyleRule('height', '1px');
  });

  it('should allow reset to empty string when being controlled', () => {
    const initialValue = 'sample';
    const handleChange = jest.fn();
    const { getByLabelText, rerender } = render(
      <Input labelText="demo" value={initialValue} onChange={handleChange} />
    );
    expect(getByLabelText('demo')).toHaveAttribute('value', initialValue);
    rerender(<Input labelText="demo" value="" onChange={handleChange} />);
    expect(getByLabelText('demo')).toHaveAttribute('value', '');
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

      expect(label).toHaveStyleRule(
        'font-size',
        magma.typeScale.size02.fontSize
      );

      expect(label).toHaveStyleRule(
        'letter-spacing',
        magma.typeScale.size02.letterSpacing
      );

      expect(input).toHaveStyleRule(
        'font-size',
        magma.typeScale.size03.fontSize
      );
      expect(input).toHaveStyleRule('height', magma.spaceScale.spacing09);
      expect(input).toHaveStyleRule('padding-left', magma.spaceScale.spacing09);

      expect(iconWrapper).toHaveStyleRule('left', magma.spaceScale.spacing03);
      expect(iconWrapper).toHaveStyleRule('right', 'auto');

      expect(svg).toHaveAttribute('height', magma.iconSizes.medium.toString());
    });

    it('should render a large input with correct styles', () => {
      const labelText = 'test label';
      const { container, getByLabelText } = render(
        <Input labelText={labelText} inputSize="large" />
      );

      const label = container.querySelector('label');
      const input = getByLabelText(labelText);

      expect(label).toHaveStyleRule(
        'font-size',
        magma.typeScale.size03.fontSize
      );

      expect(input).toHaveStyleRule(
        'font-size',
        magma.typeScale.size04.fontSize
      );
      expect(input).toHaveStyleRule('height', magma.spaceScale.spacing11);
      expect(input).toHaveStyleRule('padding', `${magma.spaceScale.spacing04}`);
    });

    describe('events', () => {
      it('should trigger the passed in onBlur when focus is removed', () => {
        const onBlurSpy = jest.fn();
        const labelText = 'test label';
        const { getByLabelText } = render(
          <Input labelText={labelText} onBlur={onBlurSpy} />
        );

        const input = getByLabelText(labelText);
        input.focus();
        input.blur();

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
          target: { value: targetValue },
        });

        expect(onChangeSpy).toHaveBeenCalledTimes(1);
      });

      it('should trigger the passed in onFocus when focused', () => {
        const onFocusSpy = jest.fn();
        const labelText = 'test label';
        const { getByLabelText } = render(
          <Input labelText={labelText} onFocus={onFocusSpy} />
        );

        const input = getByLabelText(labelText);
        input.focus();

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

  describe('Character Counter', () => {
    const charactersAllowed = defaultI18n.characterCounter.charactersAllowed;
    const charactersLeft = defaultI18n.characterCounter.charactersLeft;
    const labelText = 'Character Counter';
    const initialValue = 'dddd';

    it('should render an input with a correctly styled error message', () => {
      const { getByTestId, getByLabelText } = render(
        <Input labelText={labelText} maxCount={2} />
      );

      fireEvent.change(getByLabelText(labelText), {
        target: { value: initialValue },
      });

      const errorMessage = getByTestId('inputMessage');

      expect(getByLabelText(labelText).parentElement).toHaveStyleRule(
        'border-color',
        magma.colors.danger
      );
      expect(errorMessage).toHaveStyleRule('color', magma.colors.danger);
    });

    it('should disable the Character Counter and allow for the native HTML attribute `maxlength` when `hasCharacterCounter` is set to false', () => {
      const testId = 'test-id';

      const { getByTestId } = render(
        <Input testId={testId} hasCharacterCounter={false} maxLength={2} />
      );
      expect(getByTestId(testId)).toHaveAttribute('maxlength', '2');
    });

    it('should show the Character Counter with the deprecated prop of `maxLength`', () => {
      const testId = 'test-id';

      const { getByText } = render(
        <Input testId={testId} hasCharacterCounter={true} maxLength={2} />
      );
      expect(getByText('2 ' + charactersAllowed)).toBeInTheDocument();
    });

    it('should show the Character Counter with the deprecated prop of `maxLength` but give the priority to `maxCount` if both used simultaneously', () => {
      const testId = 'test-id';

      const { getByText } = render(
        <Input
          testId={testId}
          hasCharacterCounter={true}
          maxLength={2}
          maxCount={4}
        />
      );
      expect(getByText('4 ' + charactersAllowed)).toBeInTheDocument();
    });

    it('should render an input with an initial value set by the user', () => {
      const { getByText } = render(<Input maxCount={2} value="hi" />);
      expect(getByText('0 ' + charactersLeft)).toBeInTheDocument();
    });

    it('should update the character length on rerender', () => {
      const { getByText, rerender } = render(<Input maxCount={5} value="hi" />);
      expect(getByText('3 ' + charactersLeft)).toBeInTheDocument();
      rerender(<Input maxCount={5} value="hello" />);
      expect(getByText('0 ' + charactersLeft)).toBeInTheDocument();
    });

    it('Shows the label "characters allowed" equal to the maxCount if the user clears the input by backspacing', () => {
      const onChange = jest.fn();
      const { getByText, getByLabelText } = render(
        <Input labelText={labelText} maxCount={4} onChange={onChange} />
      );

      fireEvent.change(getByLabelText(labelText), {
        target: { value: initialValue },
      });

      expect(getByLabelText(labelText)).toHaveAttribute('value', initialValue);
      expect(getByText('0 ' + charactersLeft)).toBeInTheDocument();

      fireEvent.change(getByLabelText(labelText), {
        target: { value: '' },
      });

      expect(getByLabelText(labelText)).toHaveAttribute('value', '');
      expect(getByText('4 ' + charactersAllowed)).toBeInTheDocument();
    });

    it('Shows the label "characters allowed" equal to the maxCount if the user clears the input by clicking the onClear button', () => {
      const onClear = jest.fn();
      const { getByText, getByLabelText, getByTestId } = render(
        <Input
          labelText={labelText}
          onClear={onClear}
          isClearable
          maxCount={4}
        />
      );

      fireEvent.change(getByLabelText(labelText), {
        target: { value: initialValue },
      });

      expect(getByLabelText(labelText)).toHaveAttribute('value', initialValue);
      expect(getByText('0 ' + charactersLeft)).toBeInTheDocument();

      fireEvent.click(getByTestId('clear-button'));

      expect(getByText('4 ' + charactersAllowed)).toBeInTheDocument();
      expect(onClear).toBeCalled();
    });
  });
});
