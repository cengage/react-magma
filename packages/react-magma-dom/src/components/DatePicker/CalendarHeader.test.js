import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { CalendarHeader } from './CalendarHeader';
import { CalendarContext } from './CalendarContext';
import { DatePickerCore } from 'react-magma-core';

describe('Calendar Header', () => {
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

    fireEvent.click(getByLabelText('Next Month'));

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

    fireEvent.click(getByLabelText('Previous Month'));

    expect(getByText('December 2018')).toBeInTheDocument();
  });
});
