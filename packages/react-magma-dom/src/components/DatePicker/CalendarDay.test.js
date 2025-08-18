import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { format } from 'date-fns';

import { CalendarContext } from './CalendarContext';
import { CalendarDay } from './CalendarDay';
import { magma } from '../../theme/magma';

describe('Calendar Day', () => {
  it('renders a day', () => {
    const defaultDate = new Date(2019, 0, 17);
    const { getByText } = render(
      <CalendarContext.Provider
        value={{
          dateFocused: false,
          focusedDate: defaultDate,
          setDateFocused: jest.fn(),
          onDateChange: jest.fn(),
          chosenDate: defaultDate,
        }}
      >
        <table>
          <tbody>
            <tr>
              <CalendarDay day={defaultDate} />
            </tr>
          </tbody>
        </table>
      </CalendarContext.Provider>
    );

    expect(getByText(format(defaultDate, 'd'))).toBeInTheDocument();
  });

  it('focuses if current day', () => {
    const defaultDate = new Date(2019, 0, 17);
    const { container } = render(
      <CalendarContext.Provider
        value={{
          dateFocused: true,
          focusedDate: defaultDate,
          setDateFocused: jest.fn(),
          onDateChange: jest.fn(),
          chosenDate: defaultDate,
        }}
      >
        <table>
          <tbody>
            <tr>
              <CalendarDay day={defaultDate} />
            </tr>
          </tbody>
        </table>
      </CalendarContext.Provider>
    );

    expect(container.querySelector(':focus')).toHaveAttribute(
      'aria-label',
      ` ${format(defaultDate, 'EEEE, MMMM do yyyy')}  (Selected)`
    );
  });

  it('does not focus if not current day', () => {
    const defaultDate = new Date(2019, 0, 17);
    const { container } = render(
      <CalendarContext.Provider
        value={{
          dateFocused: true,
          focusedDate: defaultDate,
          setDateFocused: jest.fn(),
          onDateChange: jest.fn(),
          chosenDate: defaultDate,
        }}
      >
        <table>
          <tbody>
            <tr>
              <CalendarDay day={new Date(2019, 0, 18)} />
            </tr>
          </tbody>
        </table>
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
          chosenDate: defaultDate,
        }}
      >
        <table>
          <tbody>
            <tr>
              <CalendarDay day={defaultDate} />
            </tr>
          </tbody>
        </table>
      </CalendarContext.Provider>
    );

    const calendarDay = getByTestId('calendar-day');
    const todayIndicator = getByTestId('todayIndicator');

    expect(todayIndicator).toBeInTheDocument();
    expect(todayIndicator).toHaveStyleRule(
      'background',
      magma.colors.neutral100
    );
    expect(calendarDay).toBeInTheDocument();
    expect(calendarDay).toHaveStyleRule('color', magma.colors.neutral100);
    expect(calendarDay).toHaveStyleRule('font-weight', '700');
    expect(calendarDay).toHaveAttribute('aria-current', 'date');
    expect(calendarDay).toHaveAttribute('aria-selected', 'true');
  });

  it("shows an indicator if it is today's date and isInverse", () => {
    const defaultDate = new Date();
    const { getByTestId } = render(
      <CalendarContext.Provider
        value={{
          dateFocused: true,
          focusedDate: defaultDate,
          setDateFocused: jest.fn(),
          onDateChange: jest.fn(),
          chosenDate: defaultDate,
          isInverse: true,
        }}
      >
        <table>
          <tbody>
            <tr>
              <CalendarDay day={defaultDate} />
            </tr>
          </tbody>
        </table>
      </CalendarContext.Provider>
    );

    const calendarDay = getByTestId('calendar-day');
    const todayIndicator = getByTestId('todayIndicator');

    expect(todayIndicator).toBeInTheDocument();
    expect(todayIndicator).toHaveStyleRule(
      'background',
      magma.colors.primary600
    );
    expect(calendarDay).toBeInTheDocument();
    expect(calendarDay).toHaveStyleRule('color', magma.colors.primary600);
  });

  it("does not show an indicator if it is not today's date", () => {
    const defaultDate = new Date(2019, 0, 17);
    const { queryByTestId } = render(
      <CalendarContext.Provider
        value={{
          dateFocused: true,
          focusedDate: defaultDate,
          setDateFocused: jest.fn(),
          onDateChange: jest.fn(),
          chosenDate: defaultDate,
        }}
      >
        <table>
          <tbody>
            <tr>
              <CalendarDay day={defaultDate} />
            </tr>
          </tbody>
        </table>
      </CalendarContext.Provider>
    );

    const calendarDay = queryByTestId('calendar-day');
    const todayIndicator = queryByTestId('todayIndicator');

    expect(todayIndicator).not.toBeInTheDocument();
    expect(calendarDay).toBeInTheDocument();
    expect(calendarDay).toHaveStyleRule('color', magma.colors.neutral100);
    expect(calendarDay).toHaveStyleRule('font-weight', '500');
    expect(calendarDay).not.toHaveAttribute('aria-current', 'date');
    expect(calendarDay).toHaveAttribute('aria-selected', 'true');
  });

  it("does not show an indicator if it is not today's date and isInverse", () => {
    const defaultDate = new Date(2019, 0, 17);
    const { queryByTestId } = render(
      <CalendarContext.Provider
        value={{
          dateFocused: true,
          focusedDate: defaultDate,
          setDateFocused: jest.fn(),
          onDateChange: jest.fn(),
          chosenDate: defaultDate,
          isInverse: true,
        }}
      >
        <table>
          <tbody>
            <tr>
              <CalendarDay day={defaultDate} />
            </tr>
          </tbody>
        </table>
      </CalendarContext.Provider>
    );

    const calendarDay = queryByTestId('calendar-day');
    expect(calendarDay).toBeInTheDocument();
    expect(calendarDay).toHaveStyleRule('color', magma.colors.primary600);
  });

  it('does not click on the day if it is disabled', () => {
    const defaultDate = new Date(2019, 0, 17);
    const maxDate = new Date(2019, 0, 16);
    const onDateChange = jest.fn();

    const { getByText } = render(
      <CalendarContext.Provider
        value={{
          dateFocused: true,
          focusedDate: defaultDate,
          maxDate,
          setDateFocused: jest.fn(),
          onDateChange,
          chosenDate: defaultDate,
        }}
      >
        <table>
          <tbody>
            <tr>
              <CalendarDay day={defaultDate} />
            </tr>
          </tbody>
        </table>
      </CalendarContext.Provider>
    );

    fireEvent.click(getByText('17'));

    expect(onDateChange).not.toHaveBeenCalled();
  });
});
