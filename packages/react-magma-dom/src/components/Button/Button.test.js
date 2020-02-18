/// <reference types="jest-dom/extend-expect"/>
import React from 'react';
import { axe } from 'jest-axe';
import {
  Button,
  ButtonColor,
  ButtonShape,
  ButtonSize,
  ButtonTextTransform,
  ButtonVariant
} from '.';
import { render } from '@testing-library/react';

describe('Button', () => {
  it('should correctly apply the testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Button testId="test-id">click</Button>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a button with the passed in text', () => {
    const buttonText = 'Click me';
    const { getByText } = render(
      <Button testId="test-id">{buttonText}</Button>
    );

    expect(getByText(buttonText)).toBeInTheDocument();
  });

  it('A text-only button does not violate detectible accessibility standards', () => {
    const { container } = render(<Button>click</Button>);
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  describe('Base Button', () => {
    describe('Snapshot', () => {
      it('should render with updated color', () => {
        const { container } = render(
          <Button id="testId" onClick={jest.fn()} color={ButtonColor.secondary}>
            Test Text
          </Button>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with updated shape', () => {
        const { container } = render(
          <Button id="testId" onClick={jest.fn()} shape={ButtonShape.round}>
            Test Text
          </Button>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with small size', () => {
        const { container } = render(
          <Button id="testId" onClick={jest.fn()} size={ButtonSize.small}>
            Test Text
          </Button>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with large size', () => {
        const { container } = render(
          <Button id="testId" onClick={jest.fn()} size={ButtonSize.large}>
            Test Text
          </Button>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with updated textTransform', () => {
        const { container } = render(
          <Button
            id="testId"
            onClick={jest.fn()}
            textTransform={ButtonTextTransform.none}
          >
            Test Text
          </Button>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with updated variant', () => {
        const { container } = render(
          <Button
            id="testId"
            onClick={jest.fn()}
            variant={ButtonVariant.outline}
          >
            Test Text
          </Button>
        );

        expect(container).toMatchSnapshot();
      });
    });
  });
});
