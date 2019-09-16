import React from 'react';
import { DatePickerCore } from 'react-magma-core';
import { CalendarContext } from './CalendarContext';
import { CalendarMonth } from './CalendarMonth';
import { render, fireEvent } from 'react-testing-library';

describe('Calendar Month', () => {
  describe('focus trap', () => {
    it('should handle tab and loop it through the calendar month', () => {
      const { getByLabelText, getByText, rerender } = render(
        <DatePickerCore>
          {({
            onPrevMonthClick,
            onNextMonthClick,
            focusedDate,
            buildCalendarMonth
          }) => (
            <CalendarContext.Provider
              value={{
                onPrevMonthClick,
                onNextMonthClick,
                focusedDate,
                buildCalendarMonth
              }}
            >
              <button>Open</button>
              <CalendarMonth calendarOpened={false} />
            </CalendarContext.Provider>
          )}
        </DatePickerCore>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <DatePickerCore>
          {({
            onPrevMonthClick,
            onNextMonthClick,
            focusedDate,
            buildCalendarMonth
          }) => (
            <CalendarContext.Provider
              value={{
                onPrevMonthClick,
                onNextMonthClick,
                focusedDate,
                buildCalendarMonth
              }}
            >
              <button>Open</button>
              <CalendarMonth calendarOpened={true} />
            </CalendarContext.Provider>
          )}
        </DatePickerCore>
      );

      fireEvent.keyDown(getByLabelText(/previous month/i), {
        keyCode: 9
      });

      fireEvent.keyDown(getByLabelText(/next month/i), {
        keyCode: 9
      });

      fireEvent.keyDown(getByText(new Date().getDate().toString()), {
        keyCode: 9
      });

      fireEvent.keyDown(getByLabelText(/help/i), {
        keyCode: 9
      });

      fireEvent.keyDown(getByLabelText(/close calendar/i), {
        keyCode: 9
      });

      expect(getByLabelText(/previous month/i)).toHaveFocus();
    });

    it('should not attempt to loop through the modal if there are no tabbable elements', () => {
      const { getByLabelText, getByText } = render(
        <DatePickerCore>
          {({
            onPrevMonthClick,
            onNextMonthClick,
            focusedDate,
            buildCalendarMonth
          }) => (
            <CalendarContext.Provider
              value={{
                onPrevMonthClick,
                onNextMonthClick,
                focusedDate,
                buildCalendarMonth
              }}
            >
              <button>Open</button>
              <CalendarMonth calendarOpened={false} />
            </CalendarContext.Provider>
          )}
        </DatePickerCore>
      );

      fireEvent.focus(getByText('Open'));

      fireEvent.keyDown(getByLabelText(/previous month/i), {
        keyCode: 9
      });

      expect(getByLabelText(/previous month/i)).not.toHaveFocus();
    });

    it('should handle shift + tab and loop it through the modal', () => {
      const { getByLabelText, getByText, rerender } = render(
        <DatePickerCore>
          {({
            onPrevMonthClick,
            onNextMonthClick,
            focusedDate,
            buildCalendarMonth
          }) => (
            <CalendarContext.Provider
              value={{
                onPrevMonthClick,
                onNextMonthClick,
                focusedDate,
                buildCalendarMonth
              }}
            >
              <button>Open</button>
              <CalendarMonth calendarOpened={false} />
            </CalendarContext.Provider>
          )}
        </DatePickerCore>
      );

      fireEvent.focus(getByText('Open'));

      rerender(
        <DatePickerCore>
          {({
            onPrevMonthClick,
            onNextMonthClick,
            focusedDate,
            buildCalendarMonth
          }) => (
            <CalendarContext.Provider
              value={{
                onPrevMonthClick,
                onNextMonthClick,
                focusedDate,
                buildCalendarMonth
              }}
            >
              <button>Open</button>
              <CalendarMonth calendarOpened={true} />
            </CalendarContext.Provider>
          )}
        </DatePickerCore>
      );

      fireEvent.keyDown(getByLabelText(/previous month/i), {
        keyCode: 9
      });

      fireEvent.keyDown(getByLabelText(/next month/i), {
        keyCode: 9,
        shiftKey: true
      });

      fireEvent.keyDown(getByLabelText(/previous month/i), {
        keyCode: 9,
        shiftKey: true
      });

      expect(getByLabelText(/close calendar/i)).toHaveFocus();
    });
  });
});
