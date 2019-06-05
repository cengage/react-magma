import * as React from 'react';

export interface CalendarContextInterface {
  chosenDate: Date;
  focusedDate: Date;
  dateFocused?: boolean;
  buildCalendarMonth: (date: Date, endableOutsideDates?: boolean) => [[]];
  onDayClick: (day: Date, event: React.SyntheticEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onPrevMonthClick: () => void;
  onNextMonthClick: () => void;
  onDateFocus: () => void;
  onHelperFocus: () => void;
}

export const CalendarContext = React.createContext<CalendarContextInterface | null>(
  null
);
