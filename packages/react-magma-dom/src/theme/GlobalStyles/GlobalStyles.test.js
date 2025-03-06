import React from 'react';

import { render } from '@testing-library/react';

import { GlobalStyles } from '.';

describe('GlobalStyles', () => {
  it('should render the global styles', () => {
    const { container } = render(<GlobalStyles />);

    expect(container).toBeInTheDocument();
  });
});
