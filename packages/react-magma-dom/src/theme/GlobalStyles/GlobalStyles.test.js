import React from 'react';
import { GlobalStyles } from '.';
import { render, cleanup } from 'react-testing-library';

describe('GlobalStyles', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the global styles', () => {
    const { container } = render(<GlobalStyles />);

    expect(container).toBeInTheDocument();
  });
});
