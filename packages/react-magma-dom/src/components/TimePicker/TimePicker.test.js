import React from 'react';
import { TimePicker } from '.';
import { render } from '@testing-library/react';

describe('TimePicker', () => {
  it('should render the timepicker', () => {
    const { container } = render(<TimePicker />);

    expect(container).toBeInTheDocument();
  });
});
