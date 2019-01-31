import React from 'react';
import { axe } from 'jest-axe';
import { Button } from '.';
import { render, cleanup } from 'react-testing-library';
import {
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonTextTransform,
  ButtonVariant
} from '../StyledButton';

const TEXT = 'Test Text';

const BASE_BUTTON_PROPS = {
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

  describe('Snapshot', () => {
    it('should render with updated color', () => {
      const { container } = render(
        <Button {...BASE_BUTTON_PROPS} color={ButtonColor.secondary}>
          {TEXT}
        </Button>
      );
    });

    it('should render with updated shape', () => {
      const { container } = render(
        <Button {...BASE_BUTTON_PROPS} shape={ButtonShape.round}>
          {TEXT}
        </Button>
      );

      expect(container).toMatchSnapshot();
    });

    it('should render with updated size', () => {
      const { container } = render(
        <Button {...BASE_BUTTON_PROPS} size={ButtonSize.small}>
          {TEXT}
        </Button>
      );

      expect(container).toMatchSnapshot();
    });

    it('should render with updated size', () => {
      const { container } = render(
        <Button {...BASE_BUTTON_PROPS} size={ButtonSize.small}>
          {TEXT}
        </Button>
      );

      expect(container).toMatchSnapshot();
    });

    it('should render with updated textTransform', () => {
      const { container } = render(
        <Button {...BASE_BUTTON_PROPS} textTransform={ButtonTextTransform.none}>
          {TEXT}
        </Button>
      );

      expect(container).toMatchSnapshot();
    });

    it('should render with updated variant', () => {
      const { container } = render(
        <Button {...BASE_BUTTON_PROPS} variant={ButtonVariant.outline}>
          {TEXT}
        </Button>
      );

      expect(container).toMatchSnapshot();
    });
  });

  it('Does not violate accessibility standards', () => {
    const { container } = renderButton();
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
