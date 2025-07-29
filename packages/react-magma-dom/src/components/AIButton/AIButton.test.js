import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { axe } from '../../../axe-helper';

import {
  AIButton,
  AIButtonShape,
  AIButtonSize,
  AIButtonTextTransform,
  AIButtonVariant,
} from '.';

describe('AIButton', () => {
  it('should correctly apply the testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<AIButton testId="test-id">click</AIButton>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render a button with the passed in text', () => {
    const buttonText = 'Click me';

    const { getByText } = render(
      <AIButton testId="test-id">{buttonText}</AIButton>
    );

    expect(getByText(buttonText)).toBeInTheDocument();
  });

  it('should run the clickHandler on click', () => {
    const buttonText = 'Test';
    const clickHandler = jest.fn();

    const { getByText } = render(
      <AIButton onClick={clickHandler}>{buttonText}</AIButton>
    );
    const button = getByText(buttonText);

    fireEvent.click(button);
    expect(clickHandler).toHaveBeenCalled();
  });

  it('shows a spinner icon when isLoading is true', () => {
    const buttonText = 'Test';
    const testId = 'test-id';
    const spinnerTestId = `${testId}-spinner`;

    const { getByTestId, getByText, queryByText, rerender, queryByTestId } =
      render(
        <AIButton testId={testId} isLoading>
          {buttonText}
        </AIButton>
      );

    expect(getByTestId(testId)).toBeInTheDocument();
    expect(getByTestId(spinnerTestId)).toBeInTheDocument();
    expect(queryByText(buttonText)).not.toBeVisible();
    rerender(
      <AIButton testId={testId} isLoading={false}>
        {buttonText}
      </AIButton>
    );
    expect(queryByTestId(spinnerTestId)).not.toBeInTheDocument();
    expect(getByText(buttonText)).toBeInTheDocument();
  });

  it('variantA text-only button does not violate detectable accessibility standards', () => {
    const { container } = render(<AIButton>click</AIButton>);
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  it('variantA button in the loading state does not violate detectable accessibility standards', () => {
    const { container } = render(<AIButton isLoading>click</AIButton>);
    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });

  describe('Base AIButton', () => {
    describe('Snapshot', () => {
      it('should render with updated variant', () => {
        const { container } = render(
          <AIButton
            id="testId"
            onClick={jest.fn()}
            variant={AIButtonVariant.variantB}
          >
            Test Text
          </AIButton>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with updated shape', () => {
        const { container } = render(
          <AIButton id="testId" onClick={jest.fn()} shape={AIButtonShape.round}>
            Test Text
          </AIButton>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with small size', () => {
        const { container } = render(
          <AIButton id="testId" onClick={jest.fn()} size={AIButtonSize.small}>
            Test Text
          </AIButton>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with large size', () => {
        const { container } = render(
          <AIButton id="testId" onClick={jest.fn()} size={AIButtonSize.large}>
            Test Text
          </AIButton>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render with updated textTransform', () => {
        const { container } = render(
          <AIButton
            id="testId"
            onClick={jest.fn()}
            textTransform={AIButtonTextTransform.none}
          >
            Test Text
          </AIButton>
        );

        expect(container).toMatchSnapshot();
      });
    });
  });
});
