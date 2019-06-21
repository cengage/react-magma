import * as React from 'react';
import { DatePickerCore } from 'react-magma-core';
import { CalendarContext } from './CalendarContext';
import { CalendarMonth } from './CalendarMonth';
import { Input, IconPosition } from '../Input';
import { format } from 'date-fns';
import { magma } from '../../theme/magma';
import styled from '@emotion/styled';
import { CalendarIcon } from '../Icon/types/CalendarIcon';
import { VisuallyHidden } from '../VisuallyHidden';

interface DatePickerProps {
  id?: string;
  labelText: string;
  defaultDate?: Date;
  onDayClick?: (day: Date, event: React.SyntheticEvent) => void;
}

interface DatePickerState {
  showHelperInformation?: boolean;
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
  transition: opacity 0.2s ease-in-out 0s;
  width: 320px;
  z-index: ${props => (props.opened ? '999' : '-1')};
`;

export class DatePicker extends React.Component<
  DatePickerProps,
  DatePickerState
> {
  state = {
    showHelperInformation: false
  };

  constructor(props) {
    super(props);
  }

  handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === '?') {
      this.handleHelperInformationOpen();
      return;
    }

    if (e.key === 'ArrowDown') {
      console.log('TODO: Put focus in calendar');
      return;
    }
  };

  handleHelperInformationClose = () => {
    this.setState({
      showHelperInformation: false
    });
  };

  handleHelperInformationOpen = () => {
    this.setState({
      showHelperInformation: true
    });
  };

  render() {
    const { defaultDate, id, labelText, onDayClick } = this.props;

    return (
      <DatePickerCore
        id={id}
        defaultDate={defaultDate}
        onDayClick={onDayClick}
        onHelperInformationOpen={this.handleHelperInformationOpen}
      >
        {({
          calendarOpened,
          chosenDate,
          focusedDate,
          dateFocused,
          buildCalendarMonth,
          onInputFocus,
          onDateFocus,
          onHelperFocus,
          onCalendarBlur,
          onPrevMonthClick,
          onNextMonthClick,
          onKeyDown
        }) => {
          const inputValue = chosenDate ? format(chosenDate, 'MM/DD/YYYY') : '';
          const srMessageId = `${id}_sr`;

          return (
            <CalendarContext.Provider
              value={{
                chosenDate,
                focusedDate,
                dateFocused,
                buildCalendarMonth,
                onKeyDown,
                onPrevMonthClick,
                onNextMonthClick,
                onDayClick,
                onDateFocus,
                onHelperFocus
              }}
            >
              <DatePickerContainer onBlur={onCalendarBlur}>
                <VisuallyHidden id={srMessageId}>
                  Press the down arrow key to interact with the calendar and
                  select a date. Press the question mark key to get the keyboard
                  shortcuts for changing dates.
                </VisuallyHidden>
                <Input
                  aria-describedby={srMessageId}
                  icon={<CalendarIcon />}
                  iconPosition={IconPosition.left}
                  id={id}
                  labelText={labelText}
                  onFocus={onInputFocus}
                  onKeyDown={e => {
                    this.handleInputKeyDown(e);
                  }}
                  placeholder="Select Date"
                  value={inputValue}
                />
                <DatePickerCalendar id="calendar" opened={calendarOpened}>
                  <CalendarMonth
                    showHelperInformation={this.state.showHelperInformation}
                    onHelperInformationClose={this.handleHelperInformationClose}
                    onHelperInformationOpen={this.handleHelperInformationOpen}
                  />
                </DatePickerCalendar>
              </DatePickerContainer>
            </CalendarContext.Provider>
          );
        }}
      </DatePickerCore>
    );
  }
}
