import React from 'react';

import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CalendarContext } from './CalendarContext';
import { CalendarMonth } from './CalendarMonth';
import { getCalendarMonthWeeks } from './utils';

describe('Calendar Month', () => {
  describe('focus trap', () => {
    it('should handle tab and loop it through the calendar month', async () => {
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
          <CalendarMonth calendarOpened />
        </CalendarContext.Provider>
      );

      expect(getByText(/january 2019/i).parentElement).toHaveFocus();

      await userEvent.tab();

      expect(getByLabelText(/previous month/i)).toHaveFocus();

      await userEvent.tab();

      expect(getByLabelText(/next month/i)).toHaveFocus();

      await userEvent.tab();

      expect(getByText(/18/i)).toHaveFocus();

      await userEvent.tab();

      expect(getByLabelText(/help/i)).toHaveFocus();

      await userEvent.tab();

      expect(getByLabelText(/close calendar/i)).toHaveFocus();

      await userEvent.tab();

      expect(getByLabelText(/previous month/i)).toHaveFocus();
    });

    it('should not attempt to loop through the modal if there are no tabbable elements', async () => {
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

      await userEvent.tab();
      await userEvent.tab();

      expect(getByLabelText(/previous month/i)).not.toHaveFocus();
    });

    it('should handle shift + tab and loop it through the modal', async () => {
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
          <CalendarMonth calendarOpened />
        </CalendarContext.Provider>
      );

      expect(getByText(/january 2019/i).parentElement).toHaveFocus();

      await userEvent.tab({ shift: true });

      expect(getByLabelText(/close calendar/i)).toHaveFocus();

      await userEvent.tab({ shift: true });

      expect(getByLabelText(/help/i)).toHaveFocus();

      await userEvent.tab({ shift: true });

      expect(getByText(/18/i)).toHaveFocus();

      await userEvent.tab({ shift: true });

      expect(getByLabelText(/next month/i)).toHaveFocus();

      await userEvent.tab({ shift: true });

      expect(getByLabelText(/previous month/i)).toHaveFocus();

      await userEvent.tab({ shift: true });

      expect(getByLabelText(/close calendar/i)).toHaveFocus();
    });
  });

  it('should open helper information when clicking the helper information button', async () => {
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
        <CalendarMonth calendarOpened />
      </CalendarContext.Provider>
    );

    await userEvent.click(getByLabelText('Calendar Widget Help'));

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
        <CalendarMonth calendarOpened focusOnOpen />
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
        <CalendarMonth calendarOpened />
      </CalendarContext.Provider>
    );

    act(() => {
      getByLabelText('Calendar Widget Help').focus();
    });

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
        <CalendarMonth calendarOpened />
      </CalendarContext.Provider>
    );

    await userEvent.click(getByText(/Back to Calendar/i));

    expect(hideHelperInformation).toHaveBeenCalled();
  });

  it('should call to close the calendar when the close button is clicked', async () => {
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
          calendarOpened
        />
      </CalendarContext.Provider>
    );

    await userEvent.click(getByLabelText(/close calendar/i));

    expect(handleCloseButtonClick).toHaveBeenCalled();
  });
});
