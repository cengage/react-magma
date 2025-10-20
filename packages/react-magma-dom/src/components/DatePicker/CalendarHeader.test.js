import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { CalendarContext } from './CalendarContext';
import { CalendarHeader } from './CalendarHeader';

describe('Calendar Header', () => {
  describe('next month button', () => {
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

    it('should not call to move forward a month when the next month button is disabled', () => {
      const focusedDate = new Date(2019, 0, 17);
      const maxDate = new Date(2019, 0, 22);
      const onNextMonthClick = jest.fn();
      const { getByLabelText } = render(
        <CalendarContext.Provider
          value={{
            onPrevMonthClick: jest.fn(),
            onNextMonthClick,
            focusedDate,
            maxDate,
          }}
        >
          <CalendarHeader focusHeader />
        </CalendarContext.Provider>
      );

      const nextBtn = getByLabelText(label =>
        label.toLowerCase().includes('navigate forward one month')
      );
      expect(nextBtn).toBeDisabled();
    });
  });

  describe('previous month button', () => {
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

    it('should not call to backward a month when the previous month button is disabled', () => {
      const focusedDate = new Date(2019, 0, 17);
      const minDate = new Date(2019, 0, 10);
      const { getByLabelText } = render(
        <CalendarContext.Provider
          value={{
            onPrevMonthClick: jest.fn(),
            focusedDate,
            minDate,
          }}
        >
          <CalendarHeader focusHeader />
        </CalendarContext.Provider>
      );

      const prevBtn = getByLabelText(label =>
        label.toLowerCase().includes('navigate back one month')
      );
      expect(prevBtn).toBeDisabled();
    });
  });

  describe('month picker', () => {
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

    it('should show current month but be disabled if the minDate is later than focused date', () => {
      const focusedDate = new Date(2019, 0, 17);
      const minDate = new Date(2019, 3, 17);
      const setMonthFocusedDate = jest.fn();

      const { getByTestId } = render(
        <CalendarContext.Provider
          value={{
            setMonthFocusedDate,
            focusedDate,
            minDate,
          }}
        >
          <CalendarHeader />
        </CalendarContext.Provider>
      );

      const month = getByTestId('month-picker');
      expect(month).toBeInTheDocument();

      const january = month.querySelectorAll('option')[0];
      const february = month.querySelectorAll('option')[1];
      const march = month.querySelectorAll('option')[2];
      const april = month.querySelectorAll('option')[3];
      const december = month.querySelectorAll('option')[11];

      expect(january).toBeDisabled();
      expect(february).toBeDisabled();
      expect(march).toBeDisabled();
      expect(april).not.toBeDisabled();
      expect(december).not.toBeDisabled();

      fireEvent.change(month, { target: { value: 4 } });
      expect(setMonthFocusedDate).toHaveBeenCalledWith(4);
    });

    it('should disable all months after maxDate', () => {
      const focusedDate = new Date(2019, 0, 17);
      const maxDate = new Date(2019, 2, 17);
      const setMonthFocusedDate = jest.fn();

      const { getByTestId } = render(
        <CalendarContext.Provider
          value={{
            setMonthFocusedDate,
            focusedDate,
            maxDate,
          }}
        >
          <CalendarHeader />
        </CalendarContext.Provider>
      );

      const month = getByTestId('month-picker');
      expect(month).toBeInTheDocument();

      const january = month.querySelectorAll('option')[0];
      const february = month.querySelectorAll('option')[1];
      const march = month.querySelectorAll('option')[2];
      const april = month.querySelectorAll('option')[3];
      const december = month.querySelectorAll('option')[11];

      expect(january).not.toBeDisabled();
      expect(february).not.toBeDisabled();
      expect(march).not.toBeDisabled();
      expect(april).toBeDisabled();
      expect(december).toBeDisabled();

      fireEvent.change(month, { target: { value: 2 } });
      expect(setMonthFocusedDate).toHaveBeenCalledWith(2);
    });
  });

  describe('year picker', () => {
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

    it('should show current year but be disabled if the minDate is later than focused date', () => {
      const focusedDate = new Date(2019, 0, 17);
      const minDate = new Date(2020, 0, 10);
      const setYearFocusedDate = jest.fn();

      const { getByTestId } = render(
        <CalendarContext.Provider
          value={{
            setYearFocusedDate,
            focusedDate,
            minDate,
          }}
        >
          <CalendarHeader />
        </CalendarContext.Provider>
      );

      const year = getByTestId('year-picker');
      expect(year).toBeInTheDocument();

      const focusedYear = year.querySelectorAll('option')[0];
      expect(focusedYear).toBeDisabled();

      fireEvent.change(year, { target: { value: 2030 } });
      expect(setYearFocusedDate).toHaveBeenCalledWith(2030);
    });

    it('should show current year but be disabled if the maxDate is earlier than focused date', () => {
      const focusedDate = new Date(2019, 0, 17);
      const minDate = new Date(2017, 0, 10);
      const maxDate = new Date(2018, 0, 10);
      const setYearFocusedDate = jest.fn();

      const { getByTestId } = render(
        <CalendarContext.Provider
          value={{
            setYearFocusedDate,
            focusedDate,
            minDate,
            maxDate,
          }}
        >
          <CalendarHeader />
        </CalendarContext.Provider>
      );

      const year = getByTestId('year-picker');
      expect(year).toBeInTheDocument();

      const focusedYear = year.querySelectorAll('option')[2];
      expect(focusedYear).toBeDisabled();

      fireEvent.change(year, { target: { value: 2017 } });
      expect(setYearFocusedDate).toHaveBeenCalledWith(2017);
    });
  });
});
