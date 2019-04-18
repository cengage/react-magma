import React from 'react';
import { GlobalStyles } from './GlobalStyles';
import { render, cleanup } from 'react-testing-library';

const renderGlobalStyles = () => {
  return render(<GlobalStyles />);
};

describe('GlobalStyles', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the global styles', () => {
    const { container } = renderGlobalStyles();

    expect(container).toBeInTheDocument();
  });
});
