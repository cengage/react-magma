import React from 'react';
import { axe } from 'jest-axe';
import { LoadingIndicator } from '.';
import { render } from '@testing-library/react';

describe('Loading Indicator', () => {
  it('should render the element', () => {
    const { container } = render(<LoadingIndicator />);

    expect(container).toBeInTheDocument();
  });

  it('Does not violate accessibility standards', () => {
    const { container } = render(<LoadingIndicator />);

    return axe(container.innerHTML).then(result => {
      return expect(result).toHaveNoViolations();
    });
  });
});
