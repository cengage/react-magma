import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { format } from 'date-fns';

import { CalendarContext } from './CalendarContext';
import { CalendarHeader } from './CalendarHeader';

describe('Calendar Header', () => {
  it('should focus the calendar header text', () => {
    const now = new Date();
    const monthYear = format(now, 'MMMM yyyy');

    const { getByText, rerender } = render(
      <CalendarContext.Provider
        value={{
          onPrevMonthClick: jest.fn(),
          onNextMonthClick: jest.fn(),
          focusedDate: now,
        }}
      >
        <CalendarHeader focusHeader={false} />
      </CalendarContext.Provider>
    );

    rerender(
      <CalendarContext.Provider
        value={{
          onPrevMonthClick: jest.fn(),
          onNextMonthClick: jest.fn(),
          focusedDate: now,
        }}
      >
        <CalendarHeader focusHeader />
      </CalendarContext.Provider>
    );

    expect(getByText(monthYear)).toBe(document.activeElement.firstChild);
  });

  it('should call to move forward a month when clicking the next month button', () => {
    const focusedDate = new Date('January 17, 2019');
    const onNextMonthClick = jest.fn();
    const { getByLabelText } = render(
      <CalendarContext.Provider
        value={{
          onPrevMonthClick: jest.fn(),
          onNextMonthClick,
          focusedDate,
        }}
      >
        <CalendarHeader focusHeader />
      </CalendarContext.Provider>
    );

    fireEvent.click(getByLabelText(/Next Month/i));

    expect(onNextMonthClick).toHaveBeenCalled();
  });

  it('should call to move backward a month when clicking the previous month button', () => {
    const focusedDate = new Date('January 17, 2019');
    const onPrevMonthClick = jest.fn();
    const { getByLabelText } = render(
      <CalendarContext.Provider
        value={{
          onPrevMonthClick,
          onNextMonthClick: jest.fn(),
          focusedDate,
        }}
      >
        <CalendarHeader focusHeader />
      </CalendarContext.Provider>
    );

    fireEvent.click(getByLabelText(/Previous Month/i));

    expect(onPrevMonthClick).toHaveBeenCalled();
  });
});
