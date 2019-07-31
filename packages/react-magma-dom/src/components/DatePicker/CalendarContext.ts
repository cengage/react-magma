import * as React from 'react';

export interface CalendarContextInterface {
  chosenDate: Date;
  focusedDate: Date;
  dateFocused?: boolean;
  showHelperInformation?: boolean;
  buildCalendarMonth: (date: Date, endableOutsideDates?: boolean) => [[]];
  openHelperInformation: () => void;
  closeHelperInformation: () => void;
  onDayClick: (day: Date, event: React.SyntheticEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onPrevMonthClick: () => void;
  onNextMonthClick: () => void;
  toggleDateFocus: (dateFocused: boolean) => void;
  onHelperFocus: () => void;
}

export const CalendarContext = React.createContext<CalendarContextInterface | null>(
  null
);
