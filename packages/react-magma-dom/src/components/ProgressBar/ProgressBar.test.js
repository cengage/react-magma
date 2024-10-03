import React from 'react';
import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { ProgressBar } from '.';
import { render } from '@testing-library/react';
import { transparentize } from 'polished';

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
      transparentize(0.75, magma.colors.neutral900)
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

  it('should render the progress bar component with primary as the default color', () => {
    const { container } = render(<ProgressBar percentage={50} />);

    expect(container.querySelector('[role="progressbar"]')).toHaveStyleRule(
      'background',
      magma.colors.primary
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

  it('should render the progress bar component with success color', () => {
    const { container } = render(
      <ProgressBar percentage={50} color="success" />
    );

    expect(container.querySelector('[role="progressbar"]')).toHaveStyleRule(
      'background',
      magma.colors.success
    );
  });

  it('should render the progress bar component with custom color', () => {
    const { container } = render(
      <ProgressBar percentage={50} color="purple" />
    );

    expect(container.querySelector('[role="progressbar"]')).toHaveStyleRule(
      'background',
      'purple'
    );
  });

  it('should render the inverse progress bar component with primary as the default color', () => {
    const { container } = render(
      <ProgressBar percentage={50} isInverse={true} />
    );

    expect(container.querySelector('[role="progressbar"]')).toHaveStyleRule(
      'background',
      magma.colors.tertiary
    );
  });

  it('should render the progress bar component with an inverse danger color', () => {
    const { container } = render(
      <ProgressBar isInverse percentage={50} color="danger" />
    );

    expect(container.querySelector('[role="progressbar"]')).toHaveStyleRule(
      'background',
      magma.colors.danger200
    );
  });

  it('should render the progress bar component with an inverse success color', () => {
    const { container } = render(
      <ProgressBar isInverse percentage={50} color="success" />
    );

    expect(container.querySelector('[role="progressbar"]')).toHaveStyleRule(
      'background',
      magma.colors.success200
    );
  });

  it('should render the progress bar component shimmer animation', async () => {
    const { container } = render(<ProgressBar percentage={50} isAnimated />);

    expect(container.querySelector('[role="progressbar"]')).toHaveStyleRule(
      'animation-name',
      'placeholderShimmer',
      {
        media: 'prefers-reduced-motion: no-preference',
      }
    );

    expect(container.querySelector('[role="progressbar"]')).not.toHaveStyleRule(
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
