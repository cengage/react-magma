import React from 'react';
import { TimePicker } from '.';
import { render } from '@testing-library/react';

describe('TimePicker', () => {
  it('should render the timepicker', () => {
    const label = 'test label';
    const { container, getByLabelText } = render(
      <TimePicker labelText={label} />
    );

    expect(getByLabelText(label)).toHaveStyleRule('border-color', '#727272');

    expect(container).toBeInTheDocument();
  });

  it('should render the timepicker with a error message', () => {
    const message = 'test error';
    const label = 'test label';
    const { getByLabelText, getByText } = render(
      <TimePicker errorMessage={message} labelText={label} />
    );

    expect(getByText(message)).toBeInTheDocument();
    expect(getByLabelText(label)).toHaveStyleRule('border-color', '#E70000');
  });

  it('should render the timepicker with inverse styles', () => {
    const label = 'test label';
    const { getByLabelText } = render(<TimePicker inverse labelText={label} />);

    expect(getByLabelText(label)).toHaveStyleRule('border-color', '#FFFFFF');
  });
});
