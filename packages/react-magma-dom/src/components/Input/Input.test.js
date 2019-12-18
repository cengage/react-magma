import React from 'react';
import { axe } from 'jest-axe';
import { Input, InputType } from '.';
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
    expect(input).toHaveStyleRule('box-shadow', '0 0 0');
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
    const { getByText } = render(<Input labelText={labelText} inverse />);

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
    const { getByText } = render(<Input helperMessage={testMessage} inverse />);

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
      <Input errorMessage={testMessage} inverse labelText={labelText} />
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
    expect(input).toHaveStyleRule('padding-left', '15px');
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
    expect(input).toHaveStyleRule('padding-right', '15px');
  });

  it('should show a spinner when loading', () => {
    const icon = <CheckIcon />;
    const { getByTestId } = render(<Input icon={icon} isLoading />);

    expect(getByTestId('spinnerWrapper')).toBeInTheDocument();
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

  it('should render a textarea for multiline prop', () => {
    const labelText = 'test label';
    const { container } = render(<Input labelText={labelText} multiline />);
    const textarea = container.querySelector('textarea');

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveStyleRule('height', '4.5em');
  });

  it('should render the input with visually hidden label text', () => {
    const labelText = 'test label';
    const { getByLabelText } = render(
      <Input labelText={labelText} labelVisuallyHidden />
    );
    const input = getByLabelText(labelText);

    expect(input).toHaveAttribute('aria-label', labelText);
  });

  it('should render the a help link button', () => {
    const { container } = render(<Input onHelpLinkClick={() => {}} />);
    expect(container.querySelector('div[role="tooltip"]')).toHaveTextContent(
      "What's this?"
    );
  });

  it('should render the a help link button with custom text', () => {
    const helpText = 'Custom text';
    const { container } = render(
      <Input onHelpLinkClick={() => {}} helpLinkAriaLabel={helpText} />
    );
    expect(container.querySelector('div[role="tooltip"]')).toHaveTextContent(
      helpText
    );
  });

  describe('password input', () => {
    it('renders a show/hide button on password inputs', () => {
      const { getByText } = render(<Input type={InputType.password} />);
      const showText = getByText('Show');
      expect(showText).toBeInTheDocument();
      expect(showText).toHaveAttribute(
        'aria-label',
        'Show password. Note: this will visually expose your password on the screen'
      );
      expect(getByText('Password is now hidden')).toBeInTheDocument();
    });

    it('renders a show/hide button on password inputs with custom text', () => {
      const { getByText } = render(
        <Input
          showPasswordButtonAriaLabel="Test button aria label"
          showPasswordButtonText="Test button text"
          hiddenPasswordAnnounceText="Test announce text"
          type={InputType.password}
        />
      );

      expect(getByText('Test button text')).toBeInTheDocument();
      expect(getByText('Test button text')).toHaveAttribute(
        'aria-label',
        'Test button aria label'
      );
      expect(getByText('Test announce text')).toBeInTheDocument();
    });

    it('does not render a show/hide button when hidePasswordMaskButton is set to true', () => {
      const { queryByText } = render(
        <Input type={InputType.password} hidePasswordMaskButton />
      );

      expect(queryByText('Show')).not.toBeInTheDocument();
    });

    it('unmasks password when show button is clicked', () => {
      const labelText = 'test label';
      const { getByText, getByLabelText } = render(
        <Input labelText={labelText} type={InputType.password} />
      );
      const button = getByText('Show');
      const input = getByLabelText(labelText);

      fireEvent.click(button);

      expect(input).toHaveProperty('type', 'text');
      expect(button).toHaveTextContent('Hide');
      expect(button).toHaveAttribute('aria-label', 'Hide password');
      expect(getByText('Password is now visible')).toBeInTheDocument();
    });

    it('unmasks password when show button is clicked with custom text', () => {
      const labelText = 'test label';
      const { getByText, getByLabelText } = render(
        <Input
          labelText={labelText}
          type={InputType.password}
          hidePasswordButtonAriaLabel="Test button aria label"
          hidePasswordButtonText="Test button text"
          shownPasswordAnnounceText="Test announce text"
        />
      );
      const button = getByText('Show');
      const input = getByLabelText(labelText);

      fireEvent.click(button);

      expect(input).toHaveProperty('type', 'text');
      expect(button).toHaveTextContent('Test button text');
      expect(button).toHaveAttribute('aria-label', 'Test button aria label');
      expect(getByText('Test announce text')).toBeInTheDocument();
    });

    it('masks password when the hide button is clicked', () => {
      const labelText = 'test label';
      const { getByText, getByLabelText } = render(
        <Input labelText={labelText} type={InputType.password} />
      );
      const button = getByText('Show');
      const input = getByLabelText(labelText);

      fireEvent.click(button);

      expect(button).toHaveTextContent('Hide');

      fireEvent.click(button);

      expect(button).toHaveTextContent('Show');
      expect(input).toHaveProperty('type', 'password');
    });
  });

  describe('sizes', () => {
    it('should render a default input with correct styles', () => {
      const labelText = 'test label';
      const icon = <CheckIcon />;
      const { container, getByLabelText } = render(
        <Input
          labelText={labelText}
          icon={icon}
          iconPosition="left"
          onHelpLinkClick={() => {}}
        />
      );

      const label = container.querySelector('label');
      const input = getByLabelText(labelText);
      const iconWrapper = container.querySelector('span');
      const svg = container.querySelector('svg');
      const helpButton = container.querySelector('button');

      expect(label).toHaveStyleRule('font-size', '13px');

      expect(input).toHaveStyleRule('font-size', '1rem');
      expect(input).toHaveStyleRule('height', '37px');
      expect(input).toHaveStyleRule('padding-left', '35px');
      expect(input).toHaveStyleRule('padding-right', '8px');

      expect(iconWrapper).toHaveStyleRule('margin-top', '-9px');
      expect(iconWrapper).toHaveStyleRule('left', '10px');
      expect(iconWrapper).toHaveStyleRule('right', 'auto');

      expect(svg).toHaveAttribute('height', '17');

      expect(helpButton).toHaveStyleRule('height', '37px');
    });

    it('should render a large input with correct styles', () => {
      const labelText = 'test label';
      const icon = <CheckIcon />;
      const { container, getByLabelText } = render(
        <Input
          labelText={labelText}
          inputSize="large"
          icon={icon}
          iconPosition="left"
          onHelpLinkClick={() => {}}
        />
      );

      const label = container.querySelector('label');
      const input = getByLabelText(labelText);
      const iconWrapper = container.querySelector('span');
      const svg = container.querySelector('svg');
      const helpButton = container.querySelector('button');

      expect(label).toHaveStyleRule('font-size', '16px');

      expect(input).toHaveStyleRule('font-size', '22px');
      expect(input).toHaveStyleRule('height', '58px');
      expect(input).toHaveStyleRule('padding-left', '50px');
      expect(input).toHaveStyleRule('padding-right', '15px');

      expect(iconWrapper).toHaveStyleRule('margin-top', '-10px');
      expect(iconWrapper).toHaveStyleRule('left', '15px');
      expect(iconWrapper).toHaveStyleRule('right', 'auto');

      expect(svg).toHaveAttribute('height', '21');

      expect(helpButton).toHaveStyleRule('height', '44px');
    });

    it('should render a large input with multline attribue as a medium textarea', () => {
      const labelText = 'test label';
      const icon = <CheckIcon />;
      const { container, getByLabelText } = render(
        <Input
          labelText={labelText}
          inputSize="large"
          icon={icon}
          iconPosition="left"
          multiline
        />
      );

      const label = container.querySelector('label');
      const input = getByLabelText(labelText);
      const iconWrapper = container.querySelector('span');
      const svg = container.querySelector('svg');

      expect(label).toHaveStyleRule('font-size', '13px');

      expect(input).toHaveStyleRule('font-size', '1rem');
      expect(input).toHaveStyleRule('height', '4.5em');
      expect(input).toHaveStyleRule('padding-left', '35px');
      expect(input).toHaveStyleRule('padding-right', '8px');

      expect(iconWrapper).toHaveStyleRule('margin-top', '-9px');
      expect(iconWrapper).toHaveStyleRule('left', '10px');
      expect(iconWrapper).toHaveStyleRule('right', 'auto');

      expect(svg).toHaveAttribute('height', '17');
    });
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
