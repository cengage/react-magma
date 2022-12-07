import { render, fireEvent } from '@testing-library/react';
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
    const defaultDate = new Date('January 17, 2019');
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
    const defaultDate = new Date('January 17, 2019');
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
              <CalendarDay day={new Date('January 18, 2019')} />
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

    expect(queryByTestId('todayIndicator')).not.toBeInTheDocument();
  });

  it('does not click on the day if it is disabled', () => {
    const defaultDate = new Date('January 17, 2019');
    const maxDate = new Date('January 16, 2019');
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
