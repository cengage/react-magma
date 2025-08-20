import * as React from 'react';

export interface CalendarContextInterface {
  chosenDate: Date;
  focusedDate: Date;
  dateFocused?: boolean;
  maxDate?: Date;
  minDate?: Date;
  helperInformationShown?: boolean;
  isInverse?: boolean;
  buildCalendarMonth: (date: Date, enableOutsideDates?: boolean) => Date[][];
  showHelperInformation: () => void;
  hideHelperInformation: () => void;
  onClose: (event?: React.SyntheticEvent) => void;
  onDateChange: (day: Date, event: React.SyntheticEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onPrevMonthClick: () => void;
  onNextMonthClick: () => void;
  setDateFocused: (value: boolean) => void;
  setFocusedDate: (day: Date) => void;
  setFocusedTodayDate: (event: React.SyntheticEvent) => void;
}

export const CalendarContext = React.createContext<CalendarContextInterface>({
  chosenDate: new Date(),
  focusedDate: new Date(),
  buildCalendarMonth: (newDate: Date, enableOutsideDates: boolean) => [
    [newDate],
  ],
  showHelperInformation: () => {},
  hideHelperInformation: () => {},
  onClose: () => {},
  onDateChange: (newDate: Date, event: React.SyntheticEvent) => {},
  onKeyDown: (event: React.KeyboardEvent) => {},
  onPrevMonthClick: () => {},
  onNextMonthClick: () => {},
  setDateFocused: (value: boolean) => {},
  setFocusedDate: (day: Date) => {},
  setFocusedTodayDate: (event: React.SyntheticEvent) => {},
});
