import React from 'react';
import { TimePicker } from '.';
import { render } from 'react-testing-library';

describe('GlobalStyles', () => {
  it('should render the global styles', () => {
    const { container } = render(<TimePicker />);

    expect(container).toBeInTheDocument();
  });
});
