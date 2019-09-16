import * as React from 'react';
import { DatePickerCore } from 'react-magma-core';
import { CalendarContext } from './CalendarContext';
import { CalendarMonth } from './CalendarMonth';
import { Announce } from '../Announce';
import { Input } from '../Input';
import { format, isValid } from 'date-fns';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '@emotion/styled';
import { CalendarIcon } from '../Icon/types/CalendarIcon';
import { VisuallyHidden } from '../VisuallyHidden';
import { handleKeyPress } from './utils';

interface DatePickerProps {
  defaultDate?: Date;
  errorMessage?: string;
  helperMessage?: string;
  id?: string;
  inputRef?: React.RefObject<{}>;
  labelText: string;
  placeholderText?: string;
  onDateChange?: (day: Date, event: React.SyntheticEvent) => void;
  onInputBlur?: (event: React.FocusEvent) => void;
  onInputChange?: (event: React.ChangeEvent) => void;
}

const DatePickerContainer = styled.div`
  position: relative;
`;

const DatePickerCalendar = styled.div<{ opened: boolean }>`
  border: 1px solid ${props => props.theme.colors.neutral06};
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

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDaySelection = this.handleDaySelection.bind(this);
    this.handleCalendarBlur = this.handleCalendarBlur.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
  }

  inputRef = React.createRef<any>();

  handleInputChange(toggleCalendar: (calendarOpened: boolean) => void) {
    return event => {
      toggleCalendar(false);

      this.props.onInputChange &&
        typeof this.props.onInputChange === 'function' &&
        this.props.onInputChange(event);
    };
  }

  handleInputBlur(
    onDateChange: (day: Date) => void,
    updateFocusedDate: (day: Date) => void,
    reset: () => void
  ) {
    return (event: React.FocusEvent) => {
      const { value } = this.inputRef.current;
      const day = new Date(value);
      const isValidDateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value);
      const isValidDate = isValid(day);

      if (isValidDateFormat && isValidDate) {
        this.handleDateChange(day, event, onDateChange, updateFocusedDate);
      } else {
        reset && typeof reset === 'function' && reset();
      }

      this.props.onInputBlur &&
        typeof this.props.onInputBlur === 'function' &&
        this.props.onInputBlur(event);
    };
  }

  handleInputKeyDown(
    openHelperInformation: () => void,
    toggleCalendar: (calendarOpened: boolean) => void
  ) {
    return (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        toggleCalendar(false);
        this.inputRef.current.focus();
      }

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
    onDateChange: (day: Date) => void,
    updateFocusedDate: (day: Date) => void
  ) {
    return (event: React.KeyboardEvent) => {
      if (dateFocused && document.activeElement.closest('table')) {
        const newChosenDate = handleKeyPress(
          event,
          focusedDate,
          toggleCalendar,
          openHelperInformation,
          onDateChange,
          this.inputRef
        );
        if (newChosenDate) {
          updateFocusedDate(newChosenDate);
        }
      } else {
        if (event.key === 'Escape') {
          toggleCalendar(false);
          this.inputRef.current.focus();
        }

        if (event.key === '?') {
          openHelperInformation();
        }
      }
    };
  }

  handleDateChange(
    day: Date,
    event: React.SyntheticEvent | React.ChangeEvent,
    onDateChange: (day: Date) => void,
    updateFocusedDate?: (day: Date) => void
  ) {
    this.props.onDateChange &&
      typeof this.props.onDateChange === 'function' &&
      this.props.onDateChange(day, event);

    onDateChange(day);

    updateFocusedDate &&
      typeof updateFocusedDate === 'function' &&
      updateFocusedDate(day);
  }

  handleDaySelection(onDateChange: (day: Date) => void) {
    return (day: Date, event: React.SyntheticEvent) => {
      this.handleDateChange(day, event, onDateChange);

      this.inputRef.current.focus();
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

  handleCloseButtonClick(toggleCalendar: (calendarOpended: boolean) => void) {
    return (event: React.SyntheticEvent) => {
      toggleCalendar(false);
    };
  }

  render() {
    const {
      defaultDate,
      errorMessage,
      helperMessage,
      id,
      labelText,
      placeholderText
    } = this.props;

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
          onIconClick,
          toggleDateFocus,
          onHelperFocus,
          onPrevMonthClick,
          onNextMonthClick,
          updateFocusedDate,
          onDateChange,
          reset
        }) => {
          const dateFormat = 'MM/DD/YYYY';
          const inputValue = chosenDate ? format(chosenDate, dateFormat) : '';

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
                  onDateChange,
                  updateFocusedDate
                ),
                onPrevMonthClick,
                onNextMonthClick,
                onDateChange: this.handleDaySelection(onDateChange),
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
                <Announce>
                  {calendarOpened && (
                    <VisuallyHidden>
                      Calendar widget is now open. Press the question mark key
                      to get the keyboard shortcuts for changing dates.
                    </VisuallyHidden>
                  )}
                </Announce>
                <Input
                  errorMessage={errorMessage}
                  helperMessage={helperMessage}
                  icon={<CalendarIcon />}
                  iconAriaLabel="Calendar"
                  onIconClick={onIconClick}
                  onIconKeyDown={this.handleInputKeyDown(
                    openHelperInformation,
                    toggleCalendar
                  )}
                  id={id}
                  ref={this.inputRef}
                  labelText={labelText}
                  onChange={this.handleInputChange(toggleCalendar)}
                  onBlur={this.handleInputBlur(
                    onDateChange,
                    updateFocusedDate,
                    reset
                  )}
                  onKeyDown={this.handleInputKeyDown(
                    openHelperInformation,
                    toggleCalendar
                  )}
                  placeholder={placeholderText ? placeholderText : dateFormat}
                  value={inputValue}
                />
                <ThemeContext.Consumer>
                  {theme => (
                    <DatePickerCalendar
                      data-testid="calendarContainer"
                      opened={calendarOpened}
                      theme={theme}
                    >
                      <CalendarMonth
                        focusOnOpen={
                          calendarOpened && focusedDate && chosenDate
                        }
                        handleCloseButtonClick={this.handleCloseButtonClick(
                          toggleCalendar
                        )}
                        calendarOpened={calendarOpened}
                        toggleDateFocus={toggleDateFocus}
                      />
                    </DatePickerCalendar>
                  )}
                </ThemeContext.Consumer>
              </DatePickerContainer>
            </CalendarContext.Provider>
          );
        }}
      </DatePickerCore>
    );
  }
}
