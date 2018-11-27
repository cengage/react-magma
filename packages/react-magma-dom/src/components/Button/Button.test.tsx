import * as React from 'react';
import 'jest-dom/extend-expect';
import 'jest-styled-components';
import { Button, ButtonProps } from './Button';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { magma } from '../../theme/magma';

const TEXT = 'Text';

const BASE_BUTTON_PROPS: ButtonProps = {
  handleClick: jest.fn()
};

const renderButton = (myProps = {}) => {
  const props = {
    ...BASE_BUTTON_PROPS,
    ...myProps
  };

  return render(<Button {...props}>{TEXT}</Button>);
};

describe('Button', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render a button with the passed in text', () => {
    const { getByText } = renderButton();

    expect(getByText(TEXT)).not.toBeNull();
  });

  it('should autofocus a button when the passed autoFocus', () => {
    const { getByText } = renderButton({ autoFocus: true });

    expect(getByText(TEXT)).toHaveFocus();
  });

  it('should disable a button when the passed disabled', () => {
    const { getByText } = renderButton({ disabled: true });

    expect(getByText(TEXT)).toBeDisabled();
  });

  describe('Button classes', () => {
    // describe('Ghost', () => {
    //   it('default ghost button', () => {
    //     const { getByText } = renderButton({ ghost: true });
    //     const button = getByText(TEXT);

    //     expect(button).toHaveStyleRule('background', 'none');
    //     expect(button).toHaveStyleRule('color', magma.secondary04);
    //   });

    //   it('primary ghost button', () => {
    //     const { getByText } = renderButton({ ghost: true, type: 'primary' });
    //     const button = getByText(TEXT);

    //     expect(button).toHaveStyleRule('color', magma.primary02);
    //   });

    //   it('success ghost button', () => {
    //     const { getByText } = renderButton({ ghost: true, type: 'success' });
    //     const button = getByText(TEXT);

    //     expect(button).toHaveStyleRule('color', magma.accent02);
    //   });

    //   it('warning ghost button', () => {
    //     const { getByText } = renderButton({ ghost: true, type: 'warning' });
    //     const button = getByText(TEXT);

    //     expect(button).toHaveStyleRule('color', magma.accent05);
    //   });

    //   it('danger ghost button', () => {
    //     const { getByText } = renderButton({ ghost: true, type: 'danger' });
    //     const button = getByText(TEXT);

    //     expect(button).toHaveStyleRule('color', magma.limited01);
    //   });
    // });

    describe('Types', () => {
      it('solid button', () => {
        const { getByText } = renderButton({ type: 'solid' });
        const button = getByText(TEXT);

        expect(button).toHaveStyleRule('background', magma.colors.primary);
        expect(button).toHaveStyleRule('border-color', magma.colors.primary);
        expect(button).toHaveStyleRule('color', magma.colors.neutral08);
      });

      it('outline button', () => {
        const { getByText } = renderButton({ type: 'outline' });
        const button = getByText(TEXT);

        expect(button).toHaveStyleRule('background', 'none');
        expect(button).toHaveStyleRule('color', magma.colors.primary);
      });

      it('link button', () => {
        const { getByText } = renderButton({ type: 'link' });
        const button = getByText(TEXT);

        expect(button).toHaveStyleRule('background', 'none');
        expect(button).toHaveStyleRule('color', magma.colors.primary);
      });
    });

    describe('Colors', () => {
      it('primary button', () => {
        const { getByText } = renderButton({ color: 'primary' });
        const button = getByText(TEXT);

        expect(button).toHaveStyleRule('background', magma.colors.primary);
        expect(button).toHaveStyleRule('border-color', magma.colors.primary);
        expect(button).toHaveStyleRule('color', magma.colors.neutral08);
      });

      it('secondary button', () => {
        const { getByText } = renderButton({ color: 'secondary' });
        const button = getByText(TEXT);

        expect(button).toHaveStyleRule('background', magma.colors.neutral08);
        expect(button).toHaveStyleRule('border-color', magma.colors.neutral05);
        expect(button).toHaveStyleRule('color', magma.colors.neutral02);
      });

      it('success button', () => {
        const { getByText } = renderButton({ color: 'success' });
        const button = getByText(TEXT);

        expect(button).toHaveStyleRule('background', magma.colors.success01);
        expect(button).toHaveStyleRule('border-color', magma.colors.success01);
        expect(button).toHaveStyleRule('color', magma.colors.neutral08);
      });

      it('danger button', () => {
        const { getByText } = renderButton({ color: 'danger' });
        const button = getByText(TEXT);

        expect(button).toHaveStyleRule('background', magma.colors.danger);
        expect(button).toHaveStyleRule('border-color', magma.colors.danger);
        expect(button).toHaveStyleRule('color', magma.colors.neutral08);
      });
    });

    describe('Inverse', () => {
      it('primary button', () => {
        const { getByText } = renderButton({ inverse: true, color: 'primary' });
        const button = getByText(TEXT);

        expect(button).toHaveStyleRule('background', magma.colors.neutral08);
        expect(button).toHaveStyleRule('border-color', magma.colors.neutral08);
        expect(button).toHaveStyleRule('color', magma.colors.primary);
      });

      it('secondary button', () => {
        const { getByText } = renderButton({
          inverse: true,
          color: 'secondary'
        });
        const button = getByText(TEXT);

        expect(button).toHaveStyleRule('background', magma.colors.neutral08);
        expect(button).toHaveStyleRule('border-color', magma.colors.neutral08);
        expect(button).toHaveStyleRule('color', magma.colors.neutral02);
      });

      it('success button', () => {
        const { getByText } = renderButton({ inverse: true, color: 'success' });
        const button = getByText(TEXT);

        expect(button).toHaveStyleRule('background', magma.colors.neutral08);
        expect(button).toHaveStyleRule('border-color', magma.colors.neutral08);
        expect(button).toHaveStyleRule('color', magma.colors.success01);
      });

      it('danger button', () => {
        const { getByText } = renderButton({ inverse: true, color: 'danger' });
        const button = getByText(TEXT);

        expect(button).toHaveStyleRule('background', magma.colors.neutral08);
        expect(button).toHaveStyleRule('border-color', magma.colors.neutral08);
        expect(button).toHaveStyleRule('color', magma.colors.danger);
      });
    });

    describe('Sizes', () => {
      it('default button', () => {
        const { getByText } = renderButton();
        const button = getByText(TEXT);

        expect(button).toHaveStyleRule('font-size', '.875rem');
        expect(button).toHaveStyleRule('padding', '0 15px');
      });

      it('small button', () => {
        const { getByText } = renderButton({ size: 'small' });
        const button = getByText(TEXT);

        expect(button).toHaveStyleRule('font-size', '.750rem');
        expect(button).toHaveStyleRule('padding', '0 10px');
      });

      it('large button', () => {
        const { getByText } = renderButton({ size: 'large' });
        const button = getByText(TEXT);

        expect(button).toHaveStyleRule('font-size', '1.125rem');
        expect(button).toHaveStyleRule('padding', '0 20px');
      });
    });

    describe('Shapes', () => {
      it('default button', () => {
        const { getByText } = renderButton();
        const button = getByText(TEXT);

        expect(button).toHaveStyleRule('border-radius', '5px');
      });

      it('leftCap button', () => {
        const { getByText } = renderButton({ shape: 'leftCap' });
        const button = getByText(TEXT);

        expect(button).toHaveStyleRule('border-radius', '5px 0 0 5px');
      });

      it('rightCap button', () => {
        const { getByText } = renderButton({ shape: 'rightCap' });
        const button = getByText(TEXT);

        expect(button).toHaveStyleRule('border-radius', '0 5px 5px 0');
      });
    });

    it('allCaps button', () => {
      const { getByText } = renderButton({ allCaps: true });
      const button = getByText(TEXT);

      expect(button).toHaveStyleRule('text-transform', 'uppercase');
    });
  });

  it('should trigger the passed in function when clicked', () => {
    const handleClickSpy = jest.fn();
    const { getByText } = renderButton({
      handleClick: handleClickSpy
    });

    fireEvent(
      getByText(TEXT),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(handleClickSpy).toHaveBeenCalledTimes(1);
  });
});
