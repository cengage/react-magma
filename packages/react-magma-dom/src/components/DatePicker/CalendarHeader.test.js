import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CalendarContext } from './CalendarContext';
import { CalendarHeader } from './CalendarHeader';

describe('Calendar Header', () => {
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

  it('should select the new month of the calendar.', () => {
    const focusedDate = new Date(2019, 0, 17);
    const setMonthFocusedDate = jest.fn();

    const { getByTestId } = render(
      <CalendarContext.Provider
        value={{
          setMonthFocusedDate,
          focusedDate,
        }}
      >
        <CalendarHeader />
      </CalendarContext.Provider>
    );

    const month = getByTestId('month-picker');
    expect(month).toBeInTheDocument();

    fireEvent.change(month, { target: { value: 5 } });
    expect(setMonthFocusedDate).toHaveBeenCalledWith(5);
  });

  it('should select the new year of the calendar.', () => {
    const focusedDate = new Date(2019, 0, 17);
    const setYearFocusedDate = jest.fn();

    const { getByTestId } = render(
      <CalendarContext.Provider
        value={{
          setYearFocusedDate,
          focusedDate,
        }}
      >
        <CalendarHeader />
      </CalendarContext.Provider>
    );

    const year = getByTestId('year-picker');
    expect(year).toBeInTheDocument();

    fireEvent.change(year, { target: { value: 2030 } });
    expect(setYearFocusedDate).toHaveBeenCalledWith(2030);
  });
});
