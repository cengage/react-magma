import * as React from 'react';
import 'jest-dom/extend-expect';
import 'jest-styled-components';
import { Button, ButtonProps } from './Button';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { magma } from '../../theme/magma';

const BASE_BUTTON_PROPS: ButtonProps = {
  handleClick: jest.fn(),
  text: 'Test Text'
};

const renderButton = (myProps = {}) => {
  const props = {
    ...BASE_BUTTON_PROPS,
    ...myProps
  };

  return render(<Button {...props} />);
};

describe('Button', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render a button with the passed in text', () => {
    const { getByText } = renderButton();

    expect(getByText(BASE_BUTTON_PROPS.text)).not.toBeNull();
  });

  it('should autofocus a button when the passed autoFocus', () => {
    const { getByText } = renderButton({ autoFocus: true });

    expect(getByText(BASE_BUTTON_PROPS.text)).toHaveFocus();
  });

  it('should disable a button when the passed disabled', () => {
    const { getByText } = renderButton({ disabled: true });

    expect(getByText(BASE_BUTTON_PROPS.text)).toBeDisabled();
  });

  describe('Button classes', () => {
    describe('Ghost', () => {
      it('default ghost button', () => {
        const { getByText } = renderButton({ ghost: true });
        const button = getByText(BASE_BUTTON_PROPS.text);

        expect(button).toHaveStyleRule('background-color', 'none');
        expect(button).toHaveStyleRule('color', magma.secondary04);
      });

      it('primary ghost button', () => {
        const { getByText } = renderButton({ ghost: true, type: 'primary' });
        const button = getByText(BASE_BUTTON_PROPS.text);

        expect(button).toHaveStyleRule('color', magma.primary02);
      });

      it('success ghost button', () => {
        const { getByText } = renderButton({ ghost: true, type: 'success' });
        const button = getByText(BASE_BUTTON_PROPS.text);

        expect(button).toHaveStyleRule('color', magma.accent02);
      });

      it('warning ghost button', () => {
        const { getByText } = renderButton({ ghost: true, type: 'warning' });
        const button = getByText(BASE_BUTTON_PROPS.text);

        expect(button).toHaveStyleRule('color', magma.accent05);
      });

      it('danger ghost button', () => {
        const { getByText } = renderButton({ ghost: true, type: 'danger' });
        const button = getByText(BASE_BUTTON_PROPS.text);

        expect(button).toHaveStyleRule('color', magma.limited01);
      });
    });

    describe('Types', () => {
      it('primary button', () => {
        const { getByText } = renderButton({ type: 'primary' });
        const button = getByText(BASE_BUTTON_PROPS.text);

        expect(button).toHaveStyleRule('background-color', magma.primary02);
        expect(button).toHaveStyleRule('border-color', magma.primary02);
        expect(button).toHaveStyleRule('color', magma.primary04);
      });

      it('success button', () => {
        const { getByText } = renderButton({ type: 'success' });
        const button = getByText(BASE_BUTTON_PROPS.text);

        expect(button).toHaveStyleRule('background-color', magma.accent02);
        expect(button).toHaveStyleRule('border-color', magma.accent02);
        expect(button).toHaveStyleRule('color', magma.primary04);
      });

      it('warning button', () => {
        const { getByText } = renderButton({ type: 'warning' });
        const button = getByText(BASE_BUTTON_PROPS.text);

        expect(button).toHaveStyleRule('background-color', magma.accent05);
        expect(button).toHaveStyleRule('border-color', magma.accent05);
        expect(button).toHaveStyleRule('color', magma.primary04);
      });

      it('danger button', () => {
        const { getByText } = renderButton({ type: 'danger' });
        const button = getByText(BASE_BUTTON_PROPS.text);

        expect(button).toHaveStyleRule('background-color', magma.limited01);
        expect(button).toHaveStyleRule('border-color', magma.limited01);
        expect(button).toHaveStyleRule('color', magma.primary04);
      });

      it('link button', () => {
        const { getByText } = renderButton({ type: 'link' });
        const button = getByText(BASE_BUTTON_PROPS.text);

        expect(button).toHaveStyleRule('background-color', 'none');
        expect(button).toHaveStyleRule('border-color', 'transparent');
        expect(button).toHaveStyleRule('color', magma.primary02);
      });
    });

    describe('Sizes', () => {
      it('default button', () => {
        const { getByText } = renderButton();
        const button = getByText(BASE_BUTTON_PROPS.text);

        expect(button).toHaveStyleRule('font-size', '16px');
        expect(button).toHaveStyleRule('padding', '0.4em 15px');
      });

      it('small button', () => {
        const { getByText } = renderButton({ size: 'small' });
        const button = getByText(BASE_BUTTON_PROPS.text);

        expect(button).toHaveStyleRule('font-size', '14px');
        expect(button).toHaveStyleRule('padding', '0.4em 10px');
      });

      it('large button', () => {
        const { getByText } = renderButton({ size: 'large' });
        const button = getByText(BASE_BUTTON_PROPS.text);

        expect(button).toHaveStyleRule('font-size', '20px');
        expect(button).toHaveStyleRule('padding', '0.4em 20px');
      });
    });
  });

  it('should trigger the passed in function when clicked', () => {
    const handleClickSpy = jest.fn();
    const { getByText } = renderButton({
      handleClick: handleClickSpy
    });

    fireEvent(
      getByText(BASE_BUTTON_PROPS.text),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(handleClickSpy).toHaveBeenCalledTimes(1);
  });
});
