import React from 'react';

import { render } from '@testing-library/react';

import { axe } from '../../../axe-helper';

import { SkipLinkContent } from '.';

describe('Skip Link Content', () => {
  it('should find element by testId', () => {
    const testId = 'test-id';
    const { getByTestId } = render(<SkipLinkContent testId={testId} />);

    expect(getByTestId(testId)).toBeInTheDocument();
  });

  it('should render the visually hidden component', () => {
    const { container } = render(<SkipLinkContent />);

    expect(container).toBeInTheDocument();
    expect(container.querySelector('div')).toHaveAttribute(
      'id',
      'reactMagmaMainContent'
    );
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<SkipLinkContent />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
