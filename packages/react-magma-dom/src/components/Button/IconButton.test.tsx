import * as React from 'react';
import 'jest-dom/extend-expect';
import 'jest-styled-components';
import { IconButton, IconButtonProps } from './IconButton';
import { render, fireEvent, cleanup } from 'react-testing-library';
// import { magma } from '../../theme/magma';

const TEXT = 'Text';

const BASE_ICON_BUTTON_PROPS: IconButtonProps = {
  handleClick: jest.fn(),
  icon: 'bell'
};

const renderButton = (myProps = {}) => {
  const props = {
    ...BASE_ICON_BUTTON_PROPS,
    ...myProps
  };

  return render(<IconButton {...props}>{TEXT}</IconButton>);
};

describe('Icon Button', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render icon button with default properties', () => {
    const { container } = renderButton();
    const button = container.querySelector('button');

    expect(button).not.toBeNull();
    expect(button).toHaveAttribute('color', 'primary');
    expect(button).toHaveAttribute('shape', 'round');
    expect(button).toHaveAttribute('type', 'solid');
  });

  it('should render icon button with passed in properties', () => {
    const color = 'secondary';
    const shape = 'fill';
    const type = 'outline';
    const size = 'small';
    const { container } = renderButton({
      color,
      shape,
      type,
      size
    });
    const button = container.querySelector('button');

    expect(button).toHaveAttribute('color', color);
    expect(button).toHaveAttribute('shape', shape);
    expect(button).toHaveAttribute('type', type);
    expect(button).toHaveStyleRule('height', '28px');
  });

  it('should render icon button with text', () => {
    const label = 'Test Label';
    const { getByText } = renderButton({
      textPosition: 'right',
      label
    });

    expect(getByText(label)).not.toBeNull();
  });

  it('should render icon button with text with passed in properties', () => {
    const label = 'Test Label';
    const color = 'secondary';
    const shape = 'fill';
    const type = 'outline';
    const size = 'small';
    const textTransform = 'none';
    const { container } = renderButton({
      label,
      textPosition: 'left',
      color,
      shape,
      type,
      size,
      textTransform
    });
    const button = container.querySelector('button');

    expect(button).toHaveAttribute('color', color);
    expect(button).toHaveAttribute('shape', shape);
    expect(button).toHaveAttribute('type', type);
    expect(button).toHaveStyleRule('height', '29px');
    expect(button).toHaveStyleRule('text-transform', textTransform);
  });

  it('should disable a button when the passed disabled', () => {
    const { container } = renderButton({ disabled: true });

    expect(container.querySelector('button')).toBeDisabled();
  });

  it('should trigger the passed in function when icon button is clicked', () => {
    const handleClickSpy = jest.fn();
    const { container } = renderButton({
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
    const { container } = renderButton({
      label: 'Test Label',
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
        const { container } = renderButton();

        expect(container.querySelector('button')).toHaveStyleRule(
          'border-radius',
          '100%'
        );
      });

      it('fill icon button', () => {
        const { container } = renderButton({ shape: 'fill' });

        expect(container.querySelector('button')).toHaveStyleRule(
          'border-radius',
          '5px'
        );
      });

      it('left cap icon button', () => {
        const { container } = renderButton({ shape: 'leftCap' });

        expect(container.querySelector('button')).toHaveStyleRule(
          'border-radius',
          '5px 0 0 5px'
        );
      });

      it('right cap icon button', () => {
        const { container } = renderButton({ shape: 'rightCap' });

        expect(container.querySelector('button')).toHaveStyleRule(
          'border-radius',
          '0 5px 5px 0'
        );
      });
    });

    describe('Sizes', () => {
      it('default icon button', () => {
        const { container } = renderButton();
        const button = container.querySelector('button');

        expect(button).toHaveStyleRule('height', '37px');
        expect(button).toHaveStyleRule('width', '37px');
        expect(container.querySelector('svg')).toHaveAttribute('height', '18');
      });

      it('large icon button', () => {
        const { container } = renderButton({ size: 'large' });
        const button = container.querySelector('button');

        expect(button).toHaveStyleRule('height', '44px');
        expect(button).toHaveStyleRule('width', '44px');
        expect(container.querySelector('svg')).toHaveAttribute('height', '24');
      });

      it('small icon button', () => {
        const { container } = renderButton({ size: 'small' });
        const button = container.querySelector('button');

        expect(button).toHaveStyleRule('height', '28px');
        expect(button).toHaveStyleRule('width', '28px');
        expect(container.querySelector('svg')).toHaveAttribute('height', '14');
      });
    });
  });
});
