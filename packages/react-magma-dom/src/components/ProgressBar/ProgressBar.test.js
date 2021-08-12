import React from 'react';
import { axe } from 'jest-axe';
import { magma } from '../../theme/magma';
import { ProgressBar } from '.';
import { render } from '@testing-library/react';

describe('ProgressBar', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<ProgressBar testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render the progress bar component', () => {
    const { container } = render(<ProgressBar />);

    expect(container).toBeInTheDocument();
  });

  it('should render the progress bar component with inverse styles', () => {
    const { container } = render(<ProgressBar isInverse />);

    expect(container.firstChild.firstChild).toHaveStyleRule(
      'background',
      'rgba(0,0,0,0.25)'
    );
  });

  it('should render the progress bar component with custom height', () => {
    const { container } = render(<ProgressBar height="10" />);

    expect(container.firstChild.firstChild).toHaveStyleRule('height', '10px');
  });

  it('should render the progress bar component with correct percentage value', () => {
    const { container } = render(<ProgressBar percentage={50} />);

    expect(container.querySelector('[role="progressbar"]')).toHaveStyleRule(
      'width',
      '50%'
    );
  });

  it('should render the progress bar component with danger color', () => {
    const { container } = render(
      <ProgressBar percentage={50} color="danger" />
    );

    expect(container.querySelector('[role="progressbar"]')).toHaveStyleRule(
      'background',
      magma.colors.danger
    );
  });

  it('should render the progress bar component with pop color', () => {
    const { container } = render(<ProgressBar percentage={50} color="pop" />);

    expect(container.querySelector('[role="progressbar"]')).toHaveStyleRule(
      'background',
      magma.colors.pop
    );
  });

  it('should render the progress bar component with pop02 color', () => {
    const { container } = render(<ProgressBar percentage={50} color="pop02" />);

    expect(container.querySelector('[role="progressbar"]')).toHaveStyleRule(
      'background',
      magma.colors.pop02
    );
  });

  it('should render the progress bar component with success color', () => {
    const { container } = render(
      <ProgressBar percentage={50} color="success" />
    );

    expect(container.querySelector('[role="progressbar"]')).toHaveStyleRule(
      'background',
      magma.colors.success
    );
  });

  it('should render the progress bar component with an inverse danger color', () => {
    const { container } = render(
      <ProgressBar isInverse percentage={50} color="danger" />
    );

    expect(container.querySelector('[role="progressbar"]')).toHaveStyleRule(
      'background',
      magma.colors.dangerInverse
    );
  });

  it('should render the progress bar component with an inverse success color', () => {
    const { container } = render(
      <ProgressBar isInverse percentage={50} color="success" />
    );

    expect(container.querySelector('[role="progressbar"]')).toHaveStyleRule(
      'background',
      magma.colors.successInverse
    );
  });

  it('should render the progress bar component shimmer animation', () => {
    const { container } = render(<ProgressBar percentage={50} isAnimated />);

    expect(container.querySelector('[role="progressbar"]')).toHaveStyleRule(
      'animation-name',
      'placeholderShimmer'
    );
  });

  it('should render the progress bar with the percentage label displayed', () => {
    const { getByText } = render(
      <ProgressBar percentage={50} isLabelVisible />
    );

    expect(getByText('50%')).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<ProgressBar />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
