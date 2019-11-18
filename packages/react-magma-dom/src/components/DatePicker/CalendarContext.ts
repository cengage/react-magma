import * as React from 'react';

export interface CalendarContextInterface {
  chosenDate: Date;
  focusedDate: Date;
  dateFocused?: boolean;
  showHelperInformation?: boolean;
  buildCalendarMonth: (date: Date, endableOutsideDates?: boolean) => Date[][];
  setShowHelperInformation: (value: boolean) => void;
  onDateChange: (day: Date, event: React.SyntheticEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onPrevMonthClick: () => void;
  onNextMonthClick: () => void;
  setDateFocused: (value: boolean) => void;
}

export const CalendarContext = React.createContext<CalendarContextInterface | null>(
  null
);
