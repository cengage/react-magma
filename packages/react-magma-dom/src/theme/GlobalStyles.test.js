import React from 'react';
import { GlobalStyles } from './GlobalStyles';
import { render } from 'react-testing-library';

describe('GlobalStyles', () => {
  it('should render the global styles', () => {
    const { container } = render(<GlobalStyles />);

    expect(container).toBeInTheDocument();
  });
});
