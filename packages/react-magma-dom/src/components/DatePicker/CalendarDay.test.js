import React from 'react';
import { render } from '@testing-library/react';
import { CalendarDay } from './CalendarDay';
import { CalendarContext } from './CalendarContext';
import { format } from 'date-fns';

describe('Calendar Day', () => {
  it('renders a day', () => {
    const defaultDate = new Date('January 17, 2019');
    const { getByText } = render(
      <CalendarContext.Provider
        value={{
          dateFocused: false,
          focusedDate: defaultDate,
          setDateFocused: jest.fn(),
          onDateChange: jest.fn(),
          chosenDate: defaultDate
        }}
      >
        <CalendarDay day={defaultDate} />
      </CalendarContext.Provider>
    );

    expect(getByText(format(defaultDate, 'D'))).toBeInTheDocument();
  });

  it('focuses if current day', () => {
    const defaultDate = new Date('January 17, 2019');
    const { container } = render(
      <CalendarContext.Provider
        value={{
          dateFocused: true,
          focusedDate: defaultDate,
          setDateFocused: jest.fn(),
          onDateChange: jest.fn(),
          chosenDate: defaultDate
        }}
      >
        <CalendarDay day={defaultDate} />
      </CalendarContext.Provider>
    );

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      format(defaultDate, 'MMMM Do YYYY')
    );
  });

  it('does not focus if not current day', () => {
    const defaultDate = new Date('January 17, 2019');
    const { container } = render(
      <CalendarContext.Provider
        value={{
          dateFocused: true,
          focusedDate: defaultDate,
          setDateFocused: jest.fn(),
          onDateChange: jest.fn(),
          chosenDate: defaultDate
        }}
      >
        <CalendarDay day={new Date('January 18, 2019')} />
      </CalendarContext.Provider>
    );

    expect(container.querySelector(':focus')).not.toBeInTheDocument();
  });

  it("shows an indicator if it is today's date", () => {
    const defaultDate = new Date();
    const { getByTestId } = render(
      <CalendarContext.Provider
        value={{
          dateFocused: true,
          focusedDate: defaultDate,
          setDateFocused: jest.fn(),
          onDateChange: jest.fn(),
          chosenDate: defaultDate
        }}
      >
        <CalendarDay day={defaultDate} />
      </CalendarContext.Provider>
    );

    expect(getByTestId('todayIndicator')).toBeInTheDocument();
  });

  it("does not show an indicator if it is not today's date", () => {
    const defaultDate = new Date('January 17, 2019');
    const { queryByTestId } = render(
      <CalendarContext.Provider
        value={{
          dateFocused: true,
          focusedDate: defaultDate,
          setDateFocused: jest.fn(),
          onDateChange: jest.fn(),
          chosenDate: defaultDate
        }}
      >
        <CalendarDay day={defaultDate} />
      </CalendarContext.Provider>
    );

    expect(queryByTestId('todayIndicator')).not.toBeInTheDocument();
  });
});
