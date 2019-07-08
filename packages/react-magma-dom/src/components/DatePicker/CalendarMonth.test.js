import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import {
  format,
  getDate,
  addDays,
  subDays,
  subWeeks,
  addWeeks,
  startOfWeek,
  endOfWeek,
  subMonths,
  addMonths
} from 'date-fns';
import { CalendarMonth } from './CalendarMonth';
import { CalendarContext } from './CalendarContext';
import { DatePickerCore } from 'react-magma-core';

describe('Calendar Month', () => {
  it('should focus the next day when hitting the arrow right key', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByText, container } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({
          buildCalendarMonth,
          calendarOpened,
          chosenDate,
          focusedDate,
          dateFocused,
          onKeyDown,
          onDateFocus
        }) => (
          <CalendarContext.Provider
            value={{
              buildCalendarMonth,
              calendarOpened,
              chosenDate,
              focusedDate,
              dateFocused,
              onKeyDown
            }}
          >
            <button onClick={onDateFocus}>Focus</button>
            <CalendarMonth />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByText('Focus'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'ArrowRight',
      code: 39
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(addDays(defaultDate, 1), 'MMMM Do YYYY')
    );
  });

  it('should focus the previous day when hitting the arrow left key', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByText, container } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({
          buildCalendarMonth,
          calendarOpened,
          chosenDate,
          focusedDate,
          dateFocused,
          onKeyDown,
          onDateFocus
        }) => (
          <CalendarContext.Provider
            value={{
              buildCalendarMonth,
              calendarOpened,
              chosenDate,
              focusedDate,
              dateFocused,
              onKeyDown
            }}
          >
            <button onClick={onDateFocus}>Focus</button>
            <CalendarMonth />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByText('Focus'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'ArrowLeft',
      code: 37
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(subDays(defaultDate, 1), 'MMMM Do YYYY')
    );
  });

  it('should focus the previous week when hitting the arrow up key', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByText, container } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({
          buildCalendarMonth,
          calendarOpened,
          chosenDate,
          focusedDate,
          dateFocused,
          onKeyDown,
          onDateFocus
        }) => (
          <CalendarContext.Provider
            value={{
              buildCalendarMonth,
              calendarOpened,
              chosenDate,
              focusedDate,
              dateFocused,
              onKeyDown
            }}
          >
            <button onClick={onDateFocus}>Focus</button>
            <CalendarMonth />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByText('Focus'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'ArrowUp',
      code: 38
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(subWeeks(defaultDate, 1), 'MMMM Do YYYY')
    );
  });

  it('should focus the next week when hitting the arrow down key', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByText, container } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({
          buildCalendarMonth,
          calendarOpened,
          chosenDate,
          focusedDate,
          dateFocused,
          onKeyDown,
          onDateFocus
        }) => (
          <CalendarContext.Provider
            value={{
              buildCalendarMonth,
              calendarOpened,
              chosenDate,
              focusedDate,
              dateFocused,
              onKeyDown
            }}
          >
            <button onClick={onDateFocus}>Focus</button>
            <CalendarMonth />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByText('Focus'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'ArrowDown',
      code: 40
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(addWeeks(defaultDate, 1), 'MMMM Do YYYY')
    );
  });

  it('should focus the beginning of the week when hitting the home key', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByText, container } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({
          buildCalendarMonth,
          calendarOpened,
          chosenDate,
          focusedDate,
          dateFocused,
          onKeyDown,
          onDateFocus
        }) => (
          <CalendarContext.Provider
            value={{
              buildCalendarMonth,
              calendarOpened,
              chosenDate,
              focusedDate,
              dateFocused,
              onKeyDown
            }}
          >
            <button onClick={onDateFocus}>Focus</button>
            <CalendarMonth />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByText('Focus'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'Home',
      code: 36
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(startOfWeek(defaultDate), 'MMMM Do YYYY')
    );
  });

  it('should focus the end of the week when hitting the end key', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByText, container } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({
          buildCalendarMonth,
          calendarOpened,
          chosenDate,
          focusedDate,
          dateFocused,
          onKeyDown,
          onDateFocus
        }) => (
          <CalendarContext.Provider
            value={{
              buildCalendarMonth,
              calendarOpened,
              chosenDate,
              focusedDate,
              dateFocused,
              onKeyDown
            }}
          >
            <button onClick={onDateFocus}>Focus</button>
            <CalendarMonth />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByText('Focus'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'End',
      code: 35
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(endOfWeek(defaultDate), 'MMMM Do YYYY')
    );
  });

  it('should focus the previous month when hitting the page up key', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByText, container } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({
          buildCalendarMonth,
          calendarOpened,
          chosenDate,
          focusedDate,
          dateFocused,
          onKeyDown,
          onDateFocus
        }) => (
          <CalendarContext.Provider
            value={{
              buildCalendarMonth,
              calendarOpened,
              chosenDate,
              focusedDate,
              dateFocused,
              onKeyDown
            }}
          >
            <button onClick={onDateFocus}>Focus</button>
            <CalendarMonth />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByText('Focus'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'PageUp',
      code: 33
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(subMonths(defaultDate, 1), 'MMMM Do YYYY')
    );
  });

  it('should focus the next month when hitting the page down key', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByText, container } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({
          buildCalendarMonth,
          calendarOpened,
          chosenDate,
          focusedDate,
          dateFocused,
          onKeyDown,
          onDateFocus
        }) => (
          <CalendarContext.Provider
            value={{
              buildCalendarMonth,
              calendarOpened,
              chosenDate,
              focusedDate,
              dateFocused,
              onKeyDown
            }}
          >
            <button onClick={onDateFocus}>Focus</button>
            <CalendarMonth />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByText('Focus'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'PageDown',
      code: 34
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(addMonths(defaultDate, 1), 'MMMM Do YYYY')
    );
  });

  it('should call onDayClick when hitting enter', () => {
    const onDayClickSpy = jest.fn();
    const defaultDate = new Date('January 17, 2019');
    const { getByText } = render(
      <DatePickerCore defaultDate={defaultDate} onDayClick={onDayClickSpy}>
        {({
          buildCalendarMonth,
          calendarOpened,
          chosenDate,
          focusedDate,
          dateFocused,
          onKeyDown,
          onDateFocus
        }) => (
          <CalendarContext.Provider
            value={{
              buildCalendarMonth,
              calendarOpened,
              chosenDate,
              focusedDate,
              dateFocused,
              onKeyDown
            }}
          >
            <button onClick={onDateFocus}>Focus</button>
            <CalendarMonth />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByText('Focus'));
    const calendarDay = getByText(getDate(defaultDate).toString());

    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(calendarDay, {
      key: 'ArrowRight',
      code: 39
    });
    fireEvent.keyDown(calendarDay, { key: 'Enter', code: 13 });

    expect(onDayClickSpy).toHaveBeenCalled();
  });

  it('should call onDayClick when hitting spacebar', () => {
    const onDayClickSpy = jest.fn();
    const defaultDate = new Date('January 17, 2019');
    const { getByText } = render(
      <DatePickerCore defaultDate={defaultDate} onDayClick={onDayClickSpy}>
        {({
          buildCalendarMonth,
          calendarOpened,
          chosenDate,
          focusedDate,
          dateFocused,
          onKeyDown,
          onDateFocus
        }) => (
          <CalendarContext.Provider
            value={{
              buildCalendarMonth,
              calendarOpened,
              chosenDate,
              focusedDate,
              dateFocused,
              onKeyDown
            }}
          >
            <button onClick={onDateFocus}>Focus</button>
            <CalendarMonth />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByText('Focus'));
    const calendarDay = getByText(getDate(defaultDate).toString());

    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(calendarDay, {
      key: 'ArrowRight',
      code: 39
    });
    fireEvent.keyDown(calendarDay, { key: ' ', code: 32 });

    expect(onDayClickSpy).toHaveBeenCalled();
  });

  it('should call onDayClick when calendar is clicked', () => {
    const onDayClickSpy = jest.fn();
    const defaultDate = new Date('January 17, 2019');
    const { getByText } = render(
      <DatePickerCore defaultDate={defaultDate} onDayClick={onDayClickSpy}>
        {({
          buildCalendarMonth,
          calendarOpened,
          chosenDate,
          focusedDate,
          dateFocused,
          onKeyDown,
          onDateFocus,
          onDayClick
        }) => (
          <CalendarContext.Provider
            value={{
              buildCalendarMonth,
              calendarOpened,
              chosenDate,
              focusedDate,
              dateFocused,
              onKeyDown,
              onDayClick
            }}
          >
            <button onClick={onDateFocus}>Focus</button>
            <CalendarMonth />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByText('Focus'));
    fireEvent.click(getByText((getDate(defaultDate) + 1).toString()));

    expect(onDayClickSpy).toHaveBeenCalled();
  });

  it('should ignore additional keys', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByText, container } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({
          buildCalendarMonth,
          calendarOpened,
          chosenDate,
          focusedDate,
          dateFocused,
          onKeyDown,
          onDateFocus
        }) => (
          <CalendarContext.Provider
            value={{
              buildCalendarMonth,
              calendarOpened,
              chosenDate,
              focusedDate,
              dateFocused,
              onKeyDown
            }}
          >
            <button onClick={onDateFocus}>Focus</button>
            <CalendarMonth />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByText('Focus'));
    fireEvent.focus(getByText(getDate(defaultDate).toString()));
    fireEvent.keyDown(getByText(getDate(defaultDate).toString()), {
      key: 'a',
      code: 65
    });

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(defaultDate, 'MMMM Do YYYY')
    );
  });

  it('should show helper information', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByText } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({
          buildCalendarMonth,
          calendarOpened,
          chosenDate,
          focusedDate,
          dateFocused,
          openHelperInformation,
          closeHelperInformation,
          onKeyDown,
          onDateFocus
        }) => (
          <CalendarContext.Provider
            value={{
              buildCalendarMonth,
              calendarOpened,
              chosenDate,
              focusedDate,
              dateFocused,
              showHelperInformation: true,
              openHelperInformation,
              closeHelperInformation,
              onKeyDown
            }}
          >
            <button onClick={onDateFocus}>Focus</button>
            <CalendarMonth />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    expect(getByText(/keyboard shortcuts/i)).toBeInTheDocument();
  });

  it('should open the helper information', async () => {
    const onHelperInformationOpenSpy = jest.fn();

    const defaultDate = new Date('January 17, 2019');
    const { getByLabelText } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({
          buildCalendarMonth,
          calendarOpened,
          chosenDate,
          focusedDate,
          dateFocused,
          onKeyDown,
          onDateFocus
        }) => (
          <CalendarContext.Provider
            value={{
              buildCalendarMonth,
              calendarOpened,
              chosenDate,
              focusedDate,
              dateFocused,
              onKeyDown
            }}
          >
            <button onClick={onDateFocus}>Focus</button>
            <CalendarMonth
              onHelperInformationOpen={onHelperInformationOpenSpy}
            />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByLabelText(/calendar help/i));

    setTimeout(() => {
      expect(onHelperInformationOpenSpy).toHaveBeenCalled();
    }, 500);
  });

  it('should close the helper information', async () => {
    const onHelperInformationCloseSpy = jest.fn();

    const defaultDate = new Date('January 17, 2019');
    const { container } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({
          buildCalendarMonth,
          calendarOpened,
          chosenDate,
          focusedDate,
          dateFocused,
          onKeyDown,
          onDateFocus
        }) => (
          <CalendarContext.Provider
            value={{
              buildCalendarMonth,
              calendarOpened,
              chosenDate,
              focusedDate,
              dateFocused,
              onKeyDown
            }}
          >
            <button onClick={onDateFocus}>Focus</button>
            <CalendarMonth
              onHelperInformationClose={onHelperInformationCloseSpy}
            />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.keyDown(container, {
      key: 'Escape',
      code: 27
    });

    setTimeout(() => {
      expect(onHelperInformationCloseSpy).toHaveBeenCalled();
    }, 500);
  });
});
