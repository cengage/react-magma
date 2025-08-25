import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { format } from 'date-fns';

import { CalendarContext } from './CalendarContext';
import { CalendarHeader } from './CalendarHeader';

describe('Calendar Header', () => {
  it('should focus the calendar header text', () => {
    const now = new Date();
    const month = format(now, 'MMMM');
    const year = format(now, 'yyyy');

    const { getByText, getByTestId, rerender } = render(
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

    const monthElement = getByText(month);
    const yearElement = getByText(year);
    expect(monthElement).toBeInTheDocument();
    expect(yearElement).toBeInTheDocument();
    expect(getByTestId('calendar-header')).toBe(document.activeElement);
  });

  it('should call to move forward a month when clicking the next month button', () => {
    const focusedDate = new Date(2019, 0, 17);
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

    const nextBtn = getByLabelText(label =>
      label.toLowerCase().includes('navigate forward one month')
    );
    fireEvent.click(nextBtn);
    expect(onNextMonthClick).toHaveBeenCalled();
  });

  it('should call to move backward a month when clicking the previous month button', () => {
    const focusedDate = new Date(2019, 0, 17);
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
    const prevBtn = getByLabelText(label =>
      label.toLowerCase().includes('navigate back one month')
    );
    fireEvent.click(prevBtn);
    expect(onPrevMonthClick).toHaveBeenCalled();
  });
});
