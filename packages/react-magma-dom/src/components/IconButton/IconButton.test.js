import React from 'react';
import { axe } from 'jest-axe';
import { IconButton } from '.';
import { render, fireEvent, cleanup } from 'react-testing-library';

const TEXT = 'Text';

const BASE_ICON_BUTTON_PROPS = {
  handleClick: jest.fn(),
  icon: 'bell'
};

const renderIconTextButton = (myProps = {}) => {
  const props = {
    ...BASE_ICON_BUTTON_PROPS,
    ...myProps
  };

  return render(<IconButton {...props}>{TEXT}</IconButton>);
};

const renderIconNoTextButton = (myProps = {}) => {
  const props = {
    ...BASE_ICON_BUTTON_PROPS,
    ...myProps,
    ariaLabel: TEXT,
    iconOnly: true
  };

  return render(<IconButton {...props} />);
};

describe('Icon Button', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render icon button with default properties', () => {
    const { container } = renderIconNoTextButton();
    const button = container.querySelector('button');

    expect(button).not.toBeNull();
    expect(button).toHaveAttribute('color', 'primary');
    expect(button).toHaveAttribute('shape', 'round');
    expect(button).toHaveStyleRule('border', '0');
  });

  it('should render icon button with passed in properties', () => {
    const color = 'secondary';
    const shape = 'fill';
    const variant = 'outline';
    const size = 'small';
    const { container, debug } = renderIconNoTextButton({
      color,
      shape,
      variant,
      size
    });
    const button = container.querySelector('button');

    expect(button).toHaveAttribute('color', color);
    expect(button).toHaveAttribute('shape', shape);
    expect(button).toHaveStyleRule('border', '2px solid');
    expect(button).toHaveStyleRule('height', '28px');
  });

  it('should render icon button with text', () => {
    const { getByText } = renderIconTextButton({
      textPosition: 'right'
    });

    expect(getByText(TEXT)).not.toBeNull();
  });

  it('should render icon button with text with passed in properties', () => {
    const color = 'secondary';
    const shape = 'fill';
    const variant = 'outline';
    const size = 'small';
    const textTransform = 'none';
    const { container } = renderIconTextButton({
      textPosition: 'left',
      color,
      shape,
      variant,
      size,
      textTransform
    });
    const button = container.querySelector('button');

    expect(button).toHaveAttribute('color', color);
    expect(button).toHaveAttribute('shape', shape);
    expect(button).toHaveStyleRule('border', '2px solid');
    expect(button).toHaveStyleRule('height', '29px');
    expect(button).toHaveStyleRule('text-transform', textTransform);
  });

  it('should disable a button when the passed disabled', () => {
    const { container } = renderIconNoTextButton({ disabled: true });

    expect(container.querySelector('button')).toBeDisabled();
  });

  it('should trigger the passed in function when icon button is clicked', () => {
    const handleClickSpy = jest.fn();
    const { container } = renderIconNoTextButton({
      handleClick: handleClickSpy
    });

    fireEvent(
      container.querySelector('button'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(handleClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should trigger the passed in function when icon button with text is clicked', () => {
    const handleClickSpy = jest.fn();
    const { container } = renderIconTextButton({
      textPosition: 'left',
      handleClick: handleClickSpy
    });

    fireEvent(
      container.querySelector('button'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(handleClickSpy).toHaveBeenCalledTimes(1);
  });

  describe('Icon Button classes', () => {
    describe('Shapes', () => {
      it('default icon button', () => {
        const { container } = renderIconNoTextButton();

        expect(container.querySelector('button')).toHaveStyleRule(
          'border-radius',
          '100%'
        );
      });

      it('fill icon button', () => {
        const { container } = renderIconNoTextButton({ shape: 'fill' });

        expect(container.querySelector('button')).toHaveStyleRule(
          'border-radius',
          '5px'
        );
      });

      it('left cap icon button', () => {
        const { container } = renderIconNoTextButton({ shape: 'leftCap' });

        expect(container.querySelector('button')).toHaveStyleRule(
          'border-radius',
          '5px 0 0 5px'
        );
      });

      it('right cap icon button', () => {
        const { container } = renderIconNoTextButton({ shape: 'rightCap' });

        expect(container.querySelector('button')).toHaveStyleRule(
          'border-radius',
          '0 5px 5px 0'
        );
      });
    });

    describe('Sizes', () => {
      it('default icon button', () => {
        const { container } = renderIconNoTextButton();
        const button = container.querySelector('button');

        expect(button).toHaveStyleRule('height', '37px');
        expect(button).toHaveStyleRule('width', '37px');
        expect(container.querySelector('svg')).toHaveAttribute('height', '18');
      });

      it('large icon button', () => {
        const { container } = renderIconNoTextButton({ size: 'large' });
        const button = container.querySelector('button');

        expect(button).toHaveStyleRule('height', '44px');
        expect(button).toHaveStyleRule('width', '44px');
        expect(container.querySelector('svg')).toHaveAttribute('height', '24');
      });

      it('small icon button', () => {
        const { container } = renderIconNoTextButton({ size: 'small' });
        const button = container.querySelector('button');

        expect(button).toHaveStyleRule('height', '28px');
        expect(button).toHaveStyleRule('width', '28px');
        expect(container.querySelector('svg')).toHaveAttribute('height', '14');
      });

      it('default icon button with text left', () => {
        const { container } = renderIconTextButton({
          textPosition: 'left'
        });
        const span = container.querySelector('span');

        expect(span).toHaveStyleRule('padding-right', '10px');
      });

      it('large icon button with text left', () => {
        const { container } = renderIconTextButton({
          size: 'large',
          textPosition: 'left'
        });
        const span = container.querySelector('span');

        expect(span).toHaveStyleRule('padding-right', '15px');
      });

      it('default icon button with text right', () => {
        const { container } = renderIconTextButton({
          textPosition: 'right'
        });
        const span = container.querySelector('span');

        expect(span).toHaveStyleRule('padding-left', '10px');
      });

      it('large icon button with text right', () => {
        const { container } = renderIconTextButton({
          size: 'large',
          textPosition: 'right'
        });
        const span = container.querySelector('span');

        expect(span).toHaveStyleRule('padding-left', '15px');
      });
    });

    it('custom', () => {
      const color = '#cccccc';
      const { container } = renderIconNoTextButton({ style: { color } });
      const button = container.querySelector('button');

      expect(button).toHaveStyle(`color: ${color}`);
    });
  });

  it('Does not violate accessibility standards for icon button', () => {
    const { container, debug } = renderIconNoTextButton();
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('Does not violate accessibility standards for icon button with text', () => {
    const { container } = renderIconTextButton();
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
