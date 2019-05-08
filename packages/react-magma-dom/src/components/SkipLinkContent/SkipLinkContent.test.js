import React from 'react';
import { axe } from 'jest-axe';
import { SkipLinkContent } from '.';
import { render } from 'react-testing-library';

describe('Skip Link Content', () => {
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
