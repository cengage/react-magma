/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { DatePickerCore } from './DatePicker';
import {
  isSameDay,
  subMonths,
  addMonths,
  startOfMonth,
  addDays,
  format
} from 'date-fns';
import uuid from 'uuid/v4';

jest.mock('uuid/v4');

const DATE_PICKER_CORE_PROPS = {
  children: () => React.createElement('div'),
  calendarOpened: false,
  defaultDate: new Date('January 17, 2019')
};

describe('DatePickerCore', () => {
  it('should auto assign an id if none is passed in', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { getByTestId } = render(
      <DatePickerCore>
        {({ id }) => <span data-testid="target">{id}</span>}
      </DatePickerCore>
    );
    expect(getByTestId(/target/i).innerHTML).toBe('auto-generated-id');
  });

  it('should persist id between renders', () => {
    uuid.mockReturnValue('auto-generated-id');
    const { getByTestId, rerender } = render(
      <DatePickerCore>
        {({ id }) => <span id={id} data-testid="target" />}
      </DatePickerCore>
    );

    expect(getByTestId(/target/i).getAttribute('id')).toBe('auto-generated-id');

    rerender(
      <DatePickerCore>
        {({ id }) => <span id={id} data-testid="target" />}
      </DatePickerCore>
    );

    expect(getByTestId(/target/i).getAttribute('id')).toBe('auto-generated-id');
  });

  it('should update the id on rerender with a change in prop id', () => {
    const { getByTestId, rerender } = render(
      <DatePickerCore>
        {({ id }) => <span id={id} data-testid="target" />}
      </DatePickerCore>
    );

    rerender(
      <DatePickerCore id="differentId">
        {({ id }) => <span id={id} data-testid="target" />}
      </DatePickerCore>
    );

    const newId = getByTestId(/target/i).getAttribute('id');
    expect(newId).toEqual('differentId');
  });

  describe('state management', () => {
    it('should create the initial state of the input', () => {
      const defaultDate = new Date();
      const formattedDate = format(defaultDate, 'MMMM Do YYYY');
      const { getByTestId } = render(
        <DatePickerCore calendarOpened={true} defaultDate={defaultDate}>
          {({ calendarOpened, focusedDate, chosenDate }) => {
            return (
              <>
                <input
                  data-testid="calendarOpened"
                  type="checkbox"
                  checked={calendarOpened}
                  onChange={() => {}}
                />
                <span data-testid="focusedDate">
                  {format(focusedDate, 'MMMM Do YYYY')}
                </span>
                <span data-testid="chosenDate">
                  {format(chosenDate, 'MMMM Do YYYY')}
                </span>
              </>
            );
          }}
        </DatePickerCore>
      );

      expect(getByTestId('calendarOpened').checked).toEqual(true);
      expect(getByTestId('focusedDate')).toHaveTextContent(formattedDate);
      expect(getByTestId('chosenDate')).toHaveTextContent(formattedDate);
    });

    it('should default focused date to todays date if no default day is sent in', () => {
      const { getByTestId } = render(
        <DatePickerCore>
          {({ focusedDate }) => {
            return (
              <>
                <span data-testid="focusedDate" data-date={focusedDate} />
              </>
            );
          }}
        </DatePickerCore>
      );

      expect(
        isSameDay(
          getByTestId('focusedDate').getAttribute('data-date'),
          new Date()
        )
      ).toBeTruthy();
    });

    it('should open and close helper information', () => {
      const { getByTestId } = render(
        <DatePickerCore>
          {({
            showHelperInformation,
            openHelperInformation,
            closeHelperInformation
          }) => {
            return (
              <>
                <button data-testid="open" onClick={openHelperInformation}>
                  Open Helper Information
                </button>
                <button data-testid="close" onClick={closeHelperInformation}>
                  Close Helper Information
                </button>
                <input
                  type="checkbox"
                  data-testid="helperInformation"
                  checked={showHelperInformation || false}
                  onChange={() => {}}
                />
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.click(getByTestId('open'));

      expect(getByTestId('helperInformation').checked).toBeTruthy();

      fireEvent.click(getByTestId('close'));

      expect(getByTestId('helperInformation').checked).toBeFalsy();
    });
  });

  describe('build calendar month', () => {
    it('should build the calendar for the given date', () => {
      const defaultDate = new Date('January 17, 2019');
      const { getByTestId } = render(
        <DatePickerCore>
          {({ buildCalendarMonth }) => {
            const calendarData = React.createRef();
            return (
              <>
                <button
                  data-testid="buildCalendarButton"
                  onClick={() => {
                    const month = buildCalendarMonth(defaultDate);

                    expect(month.length).toEqual(5);
                    expect(month[0][0]).toEqual(null);
                    expect(
                      isSameDay(month[0][2], new Date('January 1, 2019'))
                    ).toBeTruthy();
                  }}
                >
                  Build Calendar
                </button>
                <span
                  data-testid="calendarData"
                  ref={calendarData}
                  data-calendardata=""
                />
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.click(getByTestId('buildCalendarButton'));
    });

    it('should build the calendar for the given date with outside dates enabled', () => {
      const defaultDate = new Date('January 17, 2019');
      const { getByTestId } = render(
        <DatePickerCore>
          {({ buildCalendarMonth }) => {
            return (
              <>
                <button
                  data-testid="buildCalendarButton"
                  onClick={() => {
                    const month = buildCalendarMonth(defaultDate, true);

                    expect(month.length).toEqual(5);
                    expect(
                      isSameDay(month[0][0], new Date('December 30, 2018'))
                    ).toBeTruthy();
                    expect(
                      isSameDay(month[0][2], new Date('January 1, 2019'))
                    ).toBeTruthy();
                  }}
                >
                  Build Calendar
                </button>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.click(getByTestId('buildCalendarButton'));
    });
  });

  describe('handle calendar icon click', () => {
    it('should open the calendar icon click', () => {
      const { getByTestId } = render(
        <DatePickerCore>
          {({ calendarOpened, onIconClick }) => {
            return (
              <>
                <button data-testid="buttonToClick" onClick={onIconClick} />
                <span
                  data-testid="calendarOpened"
                  data-calendaropened={calendarOpened}
                />
              </>
            );
          }}
        </DatePickerCore>
      );

      expect(
        getByTestId('calendarOpened').getAttribute('data-calendaropened')
      ).toBeFalsy();

      fireEvent.click(getByTestId('buttonToClick'));

      expect(
        getByTestId('calendarOpened').getAttribute('data-calendaropened')
      ).toBeTruthy();
    });
  });

  describe('Focus and blur', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should handle date focus', () => {
      const { getByTestId } = render(
        <DatePickerCore>
          {({ dateFocused, toggleDateFocus, onHelperFocus }) => {
            return (
              <>
                <div
                  data-testid="focusDate"
                  onFocus={() => toggleDateFocus(true)}
                />
                <div data-testid="focusHelper" onFocus={onHelperFocus} />
                <input data-testid="dateFocused" checked={dateFocused} />
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('focusDate'));

      expect(getByTestId('dateFocused').checked).toBeTruthy();

      fireEvent.focus(getByTestId('focusHelper'));

      expect(getByTestId('dateFocused').checked).toBeFalsy();
    });

    it('should update the focused date', () => {
      const newFocusedDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore>
          {({ focusedDate, updateFocusedDate }) => {
            return (
              <>
                <button
                  data-testid="changeFocusedDate"
                  onClick={() => updateFocusedDate(newFocusedDate)}
                >
                  Update Focused Date
                </button>
                <div data-testid="focusedDate" data-date={focusedDate} />
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.click(getByTestId('changeFocusedDate'));

      expect(
        isSameDay(
          getByTestId('focusedDate').getAttribute('data-date'),
          newFocusedDate
        )
      ).toBeTruthy();
    });

    it('should toggle the calendar', () => {
      const { getByTestId } = render(
        <DatePickerCore
          defaultDate={new Date('January 17, 2019')}
          calendarOpened={true}
        >
          {({ toggleCalendar, calendarOpened }) => {
            return (
              <>
                <div
                  style={{ display: calendarOpened ? 'block' : 'none' }}
                  id="calendar"
                >
                  <button
                    data-testid="calendarButton"
                    onClick={() => toggleCalendar(false)}
                  />
                </div>
              </>
            );
          }}
        </DatePickerCore>
      );

      const calendarButton = getByTestId('calendarButton');

      fireEvent.click(calendarButton);

      expect(calendarButton).not.toBeVisible();
    });

    it('should not close the calendar when active element is outside of calendar container', () => {
      const { container } = render(
        <DatePickerCore {...DATE_PICKER_CORE_PROPS} calendarOpened={true}>
          {({ onCalendarBlur, calendarOpened }) => {
            return (
              <>
                <div
                  style={{ display: calendarOpened ? 'block' : 'none' }}
                  id="calendar"
                  onBlur={onCalendarBlur}
                >
                  <button id="calendarButton" />
                  <button id="calendarButton2" />
                </div>
                <button id="notInCalendarButton" />
              </>
            );
          }}
        </DatePickerCore>
      );

      const calendarButton = container.querySelector('#calendarButton');
      const calendarButton2 = container.querySelector('#calendarButton2');

      calendarButton.focus();
      calendarButton2.focus();

      jest.advanceTimersByTime(1000);

      expect(calendarButton2).toBeVisible();
    });
  });

  describe('on previous button click', () => {
    it('changes the focus date to the first of the previous month', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ focusedDate, onPrevMonthClick }) => {
            return (
              <>
                <button
                  data-testid="prevMonthButton"
                  onClick={onPrevMonthClick}
                >
                  Previous Month
                </button>
                <span data-testid="focusedDate" data-date={focusedDate} />
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.click(getByTestId('prevMonthButton'));

      expect(
        isSameDay(
          getByTestId('focusedDate').getAttribute('data-date'),
          startOfMonth(subMonths(defaultDate, 1))
        )
      ).toBeTruthy();
    });
  });

  describe('on next button click', () => {
    it('changes the focus date to the first of the next month', () => {
      const defaultDate = new Date();
      const { getByTestId } = render(
        <DatePickerCore defaultDate={defaultDate}>
          {({ focusedDate, onNextMonthClick }) => {
            return (
              <>
                <button
                  data-testid="nextMonthButton"
                  onClick={onNextMonthClick}
                >
                  Previous Month
                </button>
                <span data-testid="focusedDate" data-date={focusedDate} />
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.click(getByTestId('nextMonthButton'));

      expect(
        isSameDay(
          getByTestId('focusedDate').getAttribute('data-date'),
          startOfMonth(addMonths(defaultDate, 1))
        )
      ).toBeTruthy();
    });
  });

  describe('on day click', () => {
    it('should updated the chosen date and close the calendar', () => {
      const defaultDate = new Date();
      const newDate = addDays(defaultDate, 1);
      const { getByTestId } = render(
        <DatePickerCore calendarOpened={true} defaultDate={defaultDate}>
          {({ calendarOpened, chosenDate, toggleDateFocus, onDateChange }) => {
            return (
              <>
                <div
                  data-testid="calendarContainer"
                  role="table"
                  onFocus={() => toggleDateFocus(true)}
                >
                  <button
                    data-testid="dayClickButton"
                    onClick={() => {
                      onDateChange(newDate);
                    }}
                  >
                    Click Day
                  </button>
                  <span data-testid="chosenDate" data-date={chosenDate} />
                  <input
                    data-testid="calendarOpened"
                    checked={calendarOpened}
                    onChange={() => {}}
                  />
                </div>
              </>
            );
          }}
        </DatePickerCore>
      );

      fireEvent.focus(getByTestId('calendarContainer'));
      fireEvent.click(getByTestId('dayClickButton'));

      expect(
        isSameDay(getByTestId('chosenDate').getAttribute('data-date'), newDate)
      ).toBeTruthy();
      expect(getByTestId('calendarOpened').checked).toBeFalsy();
    });
  });
});
