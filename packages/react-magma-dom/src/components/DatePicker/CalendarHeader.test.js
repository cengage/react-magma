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
    const onDateChange = jest.fn();

    const { getByRole, getAllByTestId } = render(
      <CalendarContext.Provider
        value={{
          onDateChange,
          focusedDate,
        }}
      >
        <CalendarHeader />
      </CalendarContext.Provider>
    );

    const monthElement = getAllByTestId('selectedItemText')[0];
    expect(monthElement).toBeInTheDocument();

    userEvent.click(monthElement);
    expect(getByRole('option', { name: 'February' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'March' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'April' })).toBeInTheDocument();

    userEvent.click(getByRole('option', { name: 'April' }));
    expect(onDateChange).toHaveBeenCalled();
    expect(monthElement).toBeInTheDocument();
  });

  it('should select the new year of the calendar.', () => {
    const focusedDate = new Date(2019, 0, 17);
    const onDateChange = jest.fn();

    const { getByRole, getAllByTestId } = render(
      <CalendarContext.Provider
        value={{
          onDateChange,
          focusedDate,
        }}
      >
        <CalendarHeader />
      </CalendarContext.Provider>
    );

    const yearElement = getAllByTestId('selectedItemText')[1];
    expect(yearElement).toBeInTheDocument();

    userEvent.click(yearElement);
    expect(getByRole('option', { name: '2019' })).toBeInTheDocument();
    expect(getByRole('option', { name: '2020' })).toBeInTheDocument();
    expect(getByRole('option', { name: '2021' })).toBeInTheDocument();

    userEvent.click(getByRole('option', { name: '2021' }));
    expect(onDateChange).toHaveBeenCalled();
    expect(yearElement).toBeInTheDocument();
  });
});
