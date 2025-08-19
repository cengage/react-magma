import React from 'react';

import { render, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CalendarContext } from './CalendarContext';
import { CalendarMonth } from './CalendarMonth';
import { getCalendarMonthWeeks } from './utils';

const originalResizeObserver = global.ResizeObserver;

describe('Calendar Month', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
    global.ResizeObserver = originalResizeObserver;
  });

  describe('focus trap', () => {
    it('should handle tab and loop it through the calendar month', () => {
      const focusedDate = new Date(2019, 0, 18);
      const { getByLabelText, getByText, rerender } = render(
        <CalendarContext.Provider
          value={{
            buildCalendarMonth: getCalendarMonthWeeks,
            focusedDate,
            helperInformationShown: false,
            setDateFocused: jest.fn(),
            onPrevMonthClick: jest.fn(),
            onNextMonthClick: jest.fn(),
            setFocusedTodayDate: jest.fn(),
          }}
        >
          <CalendarMonth calendarOpened={false} />
        </CalendarContext.Provider>
      );

      rerender(
        <CalendarContext.Provider
          value={{
            buildCalendarMonth: getCalendarMonthWeeks,
            focusedDate,
            helperInformationShown: false,
            setDateFocused: jest.fn(),
            onPrevMonthClick: jest.fn(),
            onNextMonthClick: jest.fn(),
            setFocusedTodayDate: jest.fn(),
          }}
        >
          <CalendarMonth calendarOpened />
        </CalendarContext.Provider>
      );

      expect(getByLabelText('January')).toHaveFocus();
      userEvent.tab();
      expect(getByLabelText('2019')).toHaveFocus();
      userEvent.tab();
      expect(getByLabelText(/Navigate back/i)).toHaveFocus();
      userEvent.tab();
      expect(getByLabelText(/Navigate forward/i)).toHaveFocus();
      userEvent.tab();
      expect(getByText(/18/i)).toHaveFocus();
      userEvent.tab();
      expect(getByLabelText(/help/i)).toHaveFocus();
      userEvent.tab();
      expect(getByLabelText(/Navigate to current/i)).toHaveFocus();
      userEvent.tab();
      expect(getByLabelText(/close calendar/i)).toHaveFocus();
      userEvent.tab();
      expect(getByLabelText('January')).toHaveFocus();
    });

    it('should not attempt to loop through the modal if there are no tabbable elements', () => {
      const focusedDate = new Date(2019, 0, 18);
      const { getByLabelText } = render(
        <CalendarContext.Provider
          value={{
            buildCalendarMonth: getCalendarMonthWeeks,
            focusedDate,
            helperInformationShown: false,
            setDateFocused: jest.fn(),
            onPrevMonthClick: jest.fn(),
            onNextMonthClick: jest.fn(),
            setFocusedTodayDate: jest.fn(),
          }}
        >
          <CalendarMonth calendarOpened={false} />
        </CalendarContext.Provider>
      );

      fireEvent.keyDown(getByLabelText(/Navigate back/i), {
        keyCode: 9,
      });

      expect(getByLabelText(/Navigate back/i)).not.toHaveFocus();
    });

    it('should handle shift + tab and loop it through the modal', () => {
      const focusedDate = new Date(2019, 0, 18);
      const { getByLabelText, getByText, rerender } = render(
        <CalendarContext.Provider
          value={{
            buildCalendarMonth: getCalendarMonthWeeks,
            focusedDate,
            helperInformationShown: false,
            setDateFocused: jest.fn(),
            onPrevMonthClick: jest.fn(),
            onNextMonthClick: jest.fn(),
            showHelperInformation: jest.fn(),
            hideHelperInformation: jest.fn(),
            setFocusedTodayDate: jest.fn(),
          }}
        >
          <CalendarMonth calendarOpened={false} />
        </CalendarContext.Provider>
      );

      rerender(
        <CalendarContext.Provider
          value={{
            buildCalendarMonth: getCalendarMonthWeeks,
            focusedDate,
            helperInformationShown: false,
            setDateFocused: jest.fn(),
            onPrevMonthClick: jest.fn(),
            onNextMonthClick: jest.fn(),
            showHelperInformation: jest.fn(),
            hideHelperInformation: jest.fn(),
            setFocusedTodayDate: jest.fn(),
          }}
        >
          <CalendarMonth calendarOpened />
        </CalendarContext.Provider>
      );

      expect(getByLabelText('January')).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(getByLabelText(/close calendar/i)).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(getByLabelText(/Navigate to current/i)).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(getByLabelText(/help/i)).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(getByText(/18/i)).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(getByLabelText(/Navigate forward/i)).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(getByLabelText(/Navigate back/i)).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(getByLabelText('2019')).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(getByLabelText('January')).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(getByLabelText(/close calendar/i)).toHaveFocus();
    });
  });

  it('should open helper information when clicking the helper information button', () => {
    const showHelperInformation = jest.fn();
    const focusedDate = new Date(2019, 0, 18);
    const { getByLabelText } = render(
      <CalendarContext.Provider
        value={{
          buildCalendarMonth: getCalendarMonthWeeks,
          focusedDate,
          helperInformationShown: false,
          setDateFocused: jest.fn(),
          onPrevMonthClick: jest.fn(),
          onNextMonthClick: jest.fn(),
          hideHelperInformation: jest.fn(),
          showHelperInformation,
        }}
      >
        <CalendarMonth calendarOpened />
      </CalendarContext.Provider>
    );

    fireEvent.click(getByLabelText('Calendar Widget Help'));

    expect(showHelperInformation).toHaveBeenCalled();
  });

  it('should focus a date on open', () => {
    const setDateFocused = jest.fn();
    const focusedDate = new Date(2019, 0, 18);
    render(
      <CalendarContext.Provider
        value={{
          buildCalendarMonth: getCalendarMonthWeeks,
          focusedDate,
          helperInformationShown: false,
          setDateFocused,
          onPrevMonthClick: jest.fn(),
          onNextMonthClick: jest.fn(),
          hideHelperInformation: jest.fn(),
          showHelperInformation: jest.fn(),
        }}
      >
        <CalendarMonth calendarOpened focusOnOpen />
      </CalendarContext.Provider>
    );

    expect(setDateFocused).toHaveBeenCalledWith(true);
  });

  it('should close helper information when clicking the helper information button', () => {
    const setDateFocused = jest.fn();
    const focusedDate = new Date(2019, 0, 18);
    const { getByLabelText } = render(
      <CalendarContext.Provider
        value={{
          buildCalendarMonth: getCalendarMonthWeeks,
          focusedDate,
          helperInformationShown: false,
          setDateFocused,
          onPrevMonthClick: jest.fn(),
          onNextMonthClick: jest.fn(),
          hideHelperInformation: jest.fn(),
          showHelperInformation: jest.fn(),
        }}
      >
        <CalendarMonth calendarOpened />
      </CalendarContext.Provider>
    );

    getByLabelText('Calendar Widget Help').focus();

    expect(setDateFocused).toHaveBeenCalledWith(false);
  });

  it('should call the close helper information', async () => {
    const hideHelperInformation = jest.fn();
    const focusedDate = new Date(2019, 0, 18);
    const { getByText } = render(
      <CalendarContext.Provider
        value={{
          buildCalendarMonth: getCalendarMonthWeeks,
          focusedDate,
          setDateFocused: jest.fn(),
          onPrevMonthClick: jest.fn(),
          onNextMonthClick: jest.fn(),
          showHelperInformation: jest.fn(),
          hideHelperInformation,
          helperInformationShown: true,
        }}
      >
        <CalendarMonth calendarOpened />
      </CalendarContext.Provider>
    );

    fireEvent.click(getByText(/Back to Calendar/i));

    await act(async () => {
      jest.runAllTimers();
    });

    expect(hideHelperInformation).toHaveBeenCalled();
  });

  it('should call to close the calendar when the close button is clicked', () => {
    const handleCloseButtonClick = jest.fn();
    const focusedDate = new Date(2019, 0, 18);
    const { getByLabelText } = render(
      <CalendarContext.Provider
        value={{
          buildCalendarMonth: getCalendarMonthWeeks,
          focusedDate,
          helperInformationShown: false,
          setDateFocused: jest.fn(),
          onPrevMonthClick: jest.fn(),
          onNextMonthClick: jest.fn(),
        }}
      >
        <CalendarMonth
          handleCloseButtonClick={handleCloseButtonClick}
          calendarOpened
        />
      </CalendarContext.Provider>
    );

    fireEvent.click(getByLabelText(/close calendar/i));

    expect(handleCloseButtonClick).toHaveBeenCalled();
  });
});
