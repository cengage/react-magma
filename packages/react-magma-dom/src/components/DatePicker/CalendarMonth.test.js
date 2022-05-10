import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalendarContext } from './CalendarContext';
import { CalendarMonth } from './CalendarMonth';
import { getCalendarMonthWeeks } from './utils';

describe('Calendar Month', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  describe('focus trap', () => {
    it('should handle tab and loop it through the calendar month', () => {
      const focusedDate = new Date('January 18, 2019');
      const { getByLabelText, getByText, rerender } = render(
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
          }}
        >
          <CalendarMonth calendarOpened={true} />
        </CalendarContext.Provider>
      );

      expect(getByText(/january 2019/i).parentElement).toHaveFocus();
      userEvent.tab();
      expect(getByLabelText(/previous month/i)).toHaveFocus();
      userEvent.tab();
      expect(getByLabelText(/next month/i)).toHaveFocus();
      userEvent.tab();
      expect(getByText(/18/i)).toHaveFocus();
      userEvent.tab();
      expect(getByLabelText(/help/i)).toHaveFocus();
      userEvent.tab();
      expect(getByLabelText(/close calendar/i)).toHaveFocus();
      userEvent.tab();
      expect(getByLabelText(/previous month/i)).toHaveFocus();
    });

    it('should not attempt to loop through the modal if there are no tabbable elements', () => {
      const focusedDate = new Date('January 18, 2019');
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
          <CalendarMonth calendarOpened={false} />
        </CalendarContext.Provider>
      );

      fireEvent.keyDown(getByLabelText(/previous month/i), {
        keyCode: 9,
      });

      expect(getByLabelText(/previous month/i)).not.toHaveFocus();
    });

    it('should handle shift + tab and loop it through the modal', () => {
      const focusedDate = new Date('January 18, 2019');
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
          }}
        >
          <CalendarMonth calendarOpened={true} />
        </CalendarContext.Provider>
      );

      expect(getByText(/january 2019/i).parentElement).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(getByLabelText(/close calendar/i)).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(getByLabelText(/help/i)).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(getByText(/18/i)).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(getByLabelText(/next month/i)).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(getByLabelText(/previous month/i)).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(getByLabelText(/close calendar/i)).toHaveFocus();
    });
  });

  it('should open helper information when clicking the helper information button', () => {
    const showHelperInformation = jest.fn();
    const focusedDate = new Date('January 18, 2019');
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
        <CalendarMonth calendarOpened={true} />
      </CalendarContext.Provider>
    );

    fireEvent.click(getByLabelText('Calendar Widget Help'));

    expect(showHelperInformation).toHaveBeenCalled();
  });

  it('should focus a date on open', () => {
    const setDateFocused = jest.fn();
    const focusedDate = new Date('January 18, 2019');
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
        <CalendarMonth calendarOpened={true} focusOnOpen={true} />
      </CalendarContext.Provider>
    );

    expect(setDateFocused).toHaveBeenCalledWith(true);
  });

  it('should close helper information when clicking the helper information button', () => {
    const setDateFocused = jest.fn();
    const focusedDate = new Date('January 18, 2019');
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
        <CalendarMonth calendarOpened={true} />
      </CalendarContext.Provider>
    );

    getByLabelText('Calendar Widget Help').focus();

    expect(setDateFocused).toHaveBeenCalledWith(false);
  });

  it('should call the close helper information', async () => {
    const hideHelperInformation = jest.fn();
    const focusedDate = new Date('January 18, 2019');
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
        <CalendarMonth calendarOpened={true} />
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
    const focusedDate = new Date('January 18, 2019');
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
          calendarOpened={true}
        />
      </CalendarContext.Provider>
    );

    fireEvent.click(getByLabelText(/close calendar/i));

    expect(handleCloseButtonClick).toHaveBeenCalled();
  });
});
