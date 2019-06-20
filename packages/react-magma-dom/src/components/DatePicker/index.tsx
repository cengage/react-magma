import * as React from 'react';
import { DatePickerCore } from 'react-magma-core';
import { CalendarContext } from './CalendarContext';
import { CalendarMonth } from './CalendarMonth';
import { Input, IconPosition } from '../Input';
import { format } from 'date-fns';
import { magma } from '../../theme/magma';
import styled from '@emotion/styled';
import { CalendarIcon } from '../Icon/types/CalendarIcon';

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
  transition: opacity 0.2s ease-in-out 0s;
  width: 320px;
  z-index: ${props => (props.opened ? '999' : '-1')};
`;

export const DatePicker: React.FunctionComponent<DatePickerProps> = (
  props: DatePickerProps
) => (
  <DatePickerCore
    id={props.id}
    defaultDate={props.defaultDate}
    onDayClick={props.onDayClick}
  >
    {({
      id,
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
      onKeyDown,
      onDayClick
    }) => {
      const { labelText } = props;
      const inputValue = chosenDate ? format(chosenDate, 'MM/DD/YYYY') : '';
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
            <Input
              icon={<CalendarIcon />}
              iconPosition={IconPosition.left}
              id={id}
              labelText={labelText}
              onFocus={onInputFocus}
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
