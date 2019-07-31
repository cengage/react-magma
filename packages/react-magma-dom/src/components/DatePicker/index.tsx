import * as React from 'react';
import { DatePickerCore } from 'react-magma-core';
import { CalendarContext } from './CalendarContext';
import { CalendarMonth } from './CalendarMonth';
import { Input, InputIconPosition } from '../Input';
import { format } from 'date-fns';
import { magma } from '../../theme/magma';
import styled from '@emotion/styled';
import { CalendarIcon } from '../Icon/types/CalendarIcon';
import { VisuallyHidden } from '../VisuallyHidden';
import { handleKeyPress } from './utils';

interface DatePickerProps {
  id?: string;
  labelText: string;
  defaultDate?: Date;
  onDayClick?: (day: Date, event: React.SyntheticEvent) => void;
}

const DatePickerContainer = styled.div`
  position: relative;
`;

const DatePickerCalendar = styled.div<{ opened: boolean }>`
  border: 1px solid ${magma.colors.neutral06};
  border-radius: 3px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
  display: ${props => (props.opened ? 'block' : 'none')};
  opacity: ${props => (props.opened ? '1' : '0')};
  position: absolute;
  overflow: hidden;
  top: 70px;
  transition: opacity 0.2s ease-in-out 0s;
  width: 320px;
  z-index: ${props => (props.opened ? '998' : '-1')};
`;

export class DatePicker extends React.Component<DatePickerProps> {
  constructor(props) {
    super(props);

    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleCalendarBlur = this.handleCalendarBlur.bind(this);
  }

  handleInputKeyDown(openHelperInformation: () => void) {
    return (event: React.KeyboardEvent) => {
      if (event.key === '?') {
        event.preventDefault();
        openHelperInformation();
      }
    };
  }

  handleKeyDown(
    dateFocused: boolean,
    focusedDate: Date,
    toggleCalendar: (calendarOpened: boolean) => void,
    openHelperInformation: () => void,
    onDayClick: (day: Date) => void,
    updateFocusedDate: (day: Date) => void
  ) {
    return (event: React.KeyboardEvent) => {
      if (dateFocused && document.activeElement.closest('table')) {
        const newChosenDate = handleKeyPress(
          event,
          focusedDate,
          toggleCalendar,
          openHelperInformation,
          onDayClick
        );
        if (newChosenDate) {
          updateFocusedDate(newChosenDate);
        }
      } else {
        if (event.key === 'Escape') {
          toggleCalendar(false);
        }

        if (event.key === '?') {
          openHelperInformation();
        }
      }
    };
  }

  handleDayClick(onDayClick: (day: Date) => void) {
    return (day: Date, event: React.SyntheticEvent) => {
      this.props.onDayClick &&
        typeof this.props.onDayClick === 'function' &&
        this.props.onDayClick(day, event);
      onDayClick(day);
    };
  }

  handleCalendarBlur(
    toggleCalendar: (calendarOpended: boolean) => void,
    showHelperInformation: boolean
  ) {
    return (event: React.SyntheticEvent) => {
      const { currentTarget } = event;

      // timeout needed for active element to update. Browser behavior.
      // https://bugzilla.mozilla.org/show_bug.cgi?id=452307
      setTimeout(() => {
        const isInCalendar = currentTarget.contains(document.activeElement);

        if (!isInCalendar && !showHelperInformation) {
          toggleCalendar(false);
        }
      }, 0);
    };
  }

  render() {
    const { defaultDate, id, labelText } = this.props;

    return (
      <DatePickerCore id={id} defaultDate={defaultDate}>
        {({
          calendarOpened,
          chosenDate,
          focusedDate,
          dateFocused,
          showHelperInformation,
          buildCalendarMonth,
          toggleCalendar,
          openHelperInformation,
          closeHelperInformation,
          srMessageId,
          onInputFocus,
          toggleDateFocus,
          onHelperFocus,
          onPrevMonthClick,
          onNextMonthClick,
          updateFocusedDate,
          onDayClick
        }) => {
          const inputValue = chosenDate ? format(chosenDate, 'MM/DD/YYYY') : '';

          return (
            <CalendarContext.Provider
              value={{
                chosenDate,
                focusedDate,
                dateFocused,
                showHelperInformation,
                buildCalendarMonth,
                openHelperInformation,
                closeHelperInformation,
                onKeyDown: this.handleKeyDown(
                  dateFocused,
                  focusedDate,
                  toggleCalendar,
                  openHelperInformation,
                  onDayClick,
                  updateFocusedDate
                ),
                onPrevMonthClick,
                onNextMonthClick,
                onDayClick: this.handleDayClick(onDayClick),
                toggleDateFocus,
                onHelperFocus
              }}
            >
              <DatePickerContainer
                onBlur={this.handleCalendarBlur(
                  toggleCalendar,
                  showHelperInformation
                )}
              >
                <VisuallyHidden id={srMessageId}>
                  Press the tab key to interact with the calendar and select a
                  date. Press the question mark key to get the keyboard
                  shortcuts for changing dates.
                </VisuallyHidden>
                <Input
                  aria-describedby={srMessageId}
                  icon={<CalendarIcon />}
                  iconPosition={InputIconPosition.left}
                  id={id}
                  labelText={labelText}
                  onFocus={onInputFocus}
                  onKeyDown={this.handleInputKeyDown(openHelperInformation)}
                  placeholder="Select Date"
                  value={inputValue}
                />
                <DatePickerCalendar id="calendar" opened={calendarOpened}>
                  <CalendarMonth />
                </DatePickerCalendar>
              </DatePickerContainer>
            </CalendarContext.Provider>
          );
        }}
      </DatePickerCore>
    );
  }
}
