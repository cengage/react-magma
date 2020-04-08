import React from 'react';
import { axe } from 'jest-axe';
import { Banner } from '.';
import { render } from '@testing-library/react';
import { magma } from '../../theme/magma';

describe('Banner', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<Banner testId={testId}>Test</Banner>);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render with correct warning variant styles', () => {
    const text = 'test';
    const { getByText } = render(<Banner variant="warning">{text}</Banner>);

    expect(getByText(text)).toHaveStyleRule('background', magma.colors.pop04);
  });

  it('should render a close button when isDismissible is true', () => {
    const text = 'test';
    const { container } = render(<Banner isDismissible>{text}</Banner>);

    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<Banner>Test</Banner>);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
