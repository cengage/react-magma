import * as React from 'react';

export interface CalendarContextInterface {
  chosenDate: Date;
  focusedDate: Date;
  dateFocused?: boolean;
  maxDate?: Date;
  minDate?: Date;
  showHelperInformation?: boolean;
  buildCalendarMonth: (date: Date, enableOutsideDates?: boolean) => Date[][];
  setShowHelperInformation: (value: boolean) => void;
  onDateChange: (day: Date, event: React.SyntheticEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onPrevMonthClick: () => void;
  onNextMonthClick: () => void;
  setDateFocused: (value: boolean) => void;
}

export const CalendarContext = React.createContext<CalendarContextInterface>({
  chosenDate: new Date(),
  focusedDate: new Date(),
  buildCalendarMonth: (newDate: Date, enableOutsideDates: boolean) => [
    [newDate],
  ],
  setShowHelperInformation: (value: boolean) => {},
  onDateChange: (newDate: Date, event: React.SyntheticEvent) => {},
  onKeyDown: (event: React.KeyboardEvent) => {},
  onPrevMonthClick: () => {},
  onNextMonthClick: () => {},
  setDateFocused: (value: boolean) => {},
});
