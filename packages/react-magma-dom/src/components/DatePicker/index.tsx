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

export const DatePicker: React.FunctionComponent<DatePickerProps> = (
  props: DatePickerProps
) => {
  const { defaultDate, id, labelText } = props;

  return (
    <DatePickerCore
      id={id}
      defaultDate={defaultDate}
      onDayClick={props.onDayClick}
    >
      {({
        calendarOpened,
        chosenDate,
        focusedDate,
        dateFocused,
        showHelperInformation,
        buildCalendarMonth,
        openHelperInformation,
        closeHelperInformation,
        srMessageId,
        onInputFocus,
        onInputKeyDown,
        onDateFocus,
        onHelperFocus,
        onCalendarBlur,
        onPrevMonthClick,
        onNextMonthClick,
        onKeyDown,
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
                Press the tab key to interact with the calendar and select a
                date. Press the question mark key to get the keyboard shortcuts
                for changing dates.
              </VisuallyHidden>
              <Input
                aria-describedby={srMessageId}
                icon={<CalendarIcon />}
                iconPosition={InputIconPosition.left}
                id={id}
                labelText={labelText}
                onFocus={onInputFocus}
                onKeyDown={onInputKeyDown}
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
};
