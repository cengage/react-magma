import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { DatePicker } from '.';

it('closes the open calendar when disabled', () => {
  const onChange = jest.fn();
  const props = {
    defaultDate: new Date(2026, 10, 12),
    labelText: 'Date',
    onChange,
  };

  const { rerender } = render(<DatePicker {...props} />);
  const toggle = () =>
    screen.getByRole('button', { name: 'Toggle Calendar Widget' });
  const day = { name: 'Monday, November 16th 2026' };

  fireEvent.click(toggle());
  expect(screen.getByRole('button', day)).toBeTruthy();

  rerender(<DatePicker {...props} disabled />);
  expect(screen.queryByRole('button', day)).toBeNull();
  expect(onChange).not.toHaveBeenCalled();

  rerender(<DatePicker {...props} />);
  expect(screen.queryByRole('button', day)).toBeNull();
  fireEvent.click(toggle());
  fireEvent.click(screen.getByRole('button', day));
  expect(onChange).toHaveBeenCalledTimes(1);
});
