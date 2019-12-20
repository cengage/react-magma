import React from 'react';
import { axe } from 'jest-axe';
import { Spinner } from '.';
import { render } from '@testing-library/react';

describe('Spinner', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Spinner testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render the spinner component', () => {
    const { container } = render(<Spinner />);

    expect(container).toBeInTheDocument();
  });

  it('should render the spinner component with a custom aria-label', () => {
    const { container } = render(<Spinner aria-label="Hello" />);

    expect(container.querySelector('span')).toHaveAttribute(
      'aria-label',
      'Hello'
    );
  });

  it('should render the spinner component with a custom size', () => {
    const { container } = render(<Spinner size="99" />);

    expect(container.querySelector('span')).toHaveStyleRule('width', '99px');
  });

  it('should render the spinner component with a custom color', () => {
    const { container } = render(<Spinner color="#bada55" />);

    expect(container.querySelector('span')).toHaveStyleRule(
      'border',
      '2px solid #bada55'
    );
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Spinner />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
