import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarContext } from './CalendarContext';
import { DatePickerCore } from 'react-magma-core';
import { format } from 'date-fns';

describe('Calendar Header', () => {
  it('should focus the calendar header text', () => {
    const now = new Date();
    const monthYear = format(now, 'MMMM YYYY');

    const { getByText, rerender } = render(
      <DatePickerCore>
        {({ onPrevMonthClick, onNextMonthClick, focusedDate }) => (
          <CalendarContext.Provider
            value={{
              onPrevMonthClick,
              onNextMonthClick,
              focusedDate
            }}
          >
            <CalendarHeader focusHeader={false} />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    rerender(
      <DatePickerCore>
        {({ onPrevMonthClick, onNextMonthClick, focusedDate }) => (
          <CalendarContext.Provider
            value={{
              onPrevMonthClick,
              onNextMonthClick,
              focusedDate
            }}
          >
            <CalendarHeader focusHeader={true} />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    expect(getByText(monthYear)).toBe(document.activeElement);
  });

  it('should move forward a month when clicking the next month button', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({ onPrevMonthClick, onNextMonthClick, focusedDate }) => (
          <CalendarContext.Provider
            value={{
              onPrevMonthClick,
              onNextMonthClick,
              focusedDate
            }}
          >
            <CalendarHeader />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByLabelText(/Next Month/i));

    expect(getByText('February 2019')).toBeInTheDocument();
  });

  it('should move backward a month when clicking the previous month button', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText, getByText } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({ onPrevMonthClick, onNextMonthClick, focusedDate }) => (
          <CalendarContext.Provider
            value={{
              onPrevMonthClick,
              onNextMonthClick,
              focusedDate
            }}
          >
            <CalendarHeader />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByLabelText(/Previous Month/i));

    expect(getByText('December 2018')).toBeInTheDocument();
  });
});
