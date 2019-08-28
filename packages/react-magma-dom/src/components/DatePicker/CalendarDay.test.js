import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { CalendarDay } from './CalendarDay';
import { CalendarContext } from './CalendarContext';
import { DatePickerCore } from 'react-magma-core';
import { format } from 'date-fns';

describe('Calendar Day', () => {
  it('renders a day', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByText } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({
          dateFocused,
          focusedDate,
          toggleDateFocus,
          onDateChange,
          chosenDate
        }) => (
          <CalendarContext.Provider
            value={{
              dateFocused,
              focusedDate,
              toggleDateFocus,
              onDateChange,
              chosenDate
            }}
          >
            <CalendarDay day={defaultDate} />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    expect(getByText(format(defaultDate, 'D'))).toBeInTheDocument();
  });

  it('focuses if current day', () => {
    const defaultDate = new Date('January 17, 2019');
    const { container, getByText } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({
          dateFocused,
          focusedDate,
          toggleDateFocus,
          onDateChange,
          chosenDate
        }) => (
          <CalendarContext.Provider
            value={{
              dateFocused,
              focusedDate,
              toggleDateFocus,
              onDateChange,
              chosenDate
            }}
          >
            <button onClick={() => toggleDateFocus(true)}>Focus</button>
            <CalendarDay day={defaultDate} />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByText('Focus'));
    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(defaultDate, 'MMMM Do YYYY')
    );
  });

  it('does not focus if not current day', () => {
    const defaultDate = new Date('January 17, 2019');
    const { container, getByText } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({
          dateFocused,
          focusedDate,
          toggleDateFocus,
          onDateChange,
          chosenDate
        }) => (
          <CalendarContext.Provider
            value={{
              dateFocused,
              focusedDate,
              toggleDateFocus,
              onDateChange,
              chosenDate
            }}
          >
            <button onClick={() => toggleDateFocus(true)}>Focus</button>
            <CalendarDay day={new Date('January 18, 2019')} />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByText('Focus'));
    expect(container.querySelector(':focus')).not.toBeInTheDocument();
  });

  it("shows an indicator if it is today's date", () => {
    const defaultDate = new Date();
    const { getByTestId, getByText } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({
          dateFocused,
          focusedDate,
          toggleDateFocus,
          onDateChange,
          chosenDate
        }) => (
          <CalendarContext.Provider
            value={{
              dateFocused,
              focusedDate,
              toggleDateFocus,
              onDateChange,
              chosenDate
            }}
          >
            <button onClick={() => toggleDateFocus(true)}>Focus</button>
            <CalendarDay day={defaultDate} />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByText('Focus'));
    expect(getByTestId('todayIndicator')).toBeInTheDocument();
  });

  it("does not show an indicator if it is not today's date", () => {
    const defaultDate = new Date('January 17, 2019');
    const { queryByTestId, getByText } = render(
      <DatePickerCore defaultDate={defaultDate}>
        {({
          dateFocused,
          focusedDate,
          toggleDateFocus,
          onDateChange,
          chosenDate
        }) => (
          <CalendarContext.Provider
            value={{
              dateFocused,
              focusedDate,
              toggleDateFocus,
              onDateChange,
              chosenDate
            }}
          >
            <button onClick={() => toggleDateFocus(true)}>Focus</button>
            <CalendarDay day={defaultDate} />
          </CalendarContext.Provider>
        )}
      </DatePickerCore>
    );

    fireEvent.click(getByText('Focus'));
    expect(queryByTestId('todayIndicator')).not.toBeInTheDocument();
  });
});
