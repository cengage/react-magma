import { axe } from '../../../axe-helper';
import { magma } from '../../theme/magma';
import { ProgressRing } from '.';
import { render } from '@testing-library/react';

describe('ProgressRing', () => {
  it('should render the progress ring component', () => {
    const { container } = render(<ProgressRing percentage={50} />);

    expect(container).toBeInTheDocument();
  });

  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(
      <ProgressRing percentage={50} testId={testId} />
    );

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render the progress ring component with a custom color', () => {
    const { container } = render(
      <ProgressRing percentage={50} color={magma.colors.success} />
    );

    expect(container.querySelector('circle')).toHaveAttribute(
      'stroke',
      magma.colors.success
    );
  });

  it('should render the progress ring component with a custom radius', () => {
    const { container } = render(<ProgressRing percentage={50} radius={80} />);

    expect(container.querySelector('circle')).toHaveAttribute('cx', '80');
  });

  it('should render the progress ring component with a custom stroke width', () => {
    const { container } = render(
      <ProgressRing percentage={50} strokeWidth={2} />
    );

    expect(container.querySelector('circle')).toHaveAttribute(
      'stroke-width',
      '2'
    );
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<ProgressRing percentage={50} />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
