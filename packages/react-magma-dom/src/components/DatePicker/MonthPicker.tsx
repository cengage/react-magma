import * as React from 'react';

import { CalendarContext } from './CalendarContext';
import { StyledSelect } from './StyledSelect';
import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { NativeSelect } from '../NativeSelect';

export interface MonthPickerProps {
  currentMonth: string;
  isInverse: boolean;
}

export const MonthPicker: React.FunctionComponent<MonthPickerProps> = props => {
  const { currentMonth, isInverse } = props;
  const { setMonthFocusedDate } = React.useContext(CalendarContext);
  const i18n = React.useContext(I18nContext);
  const monthsLabels = i18n.months.long;
  const theme = React.useContext(ThemeContext);
  const months = Object.values(monthsLabels).map((label, value) => ({
    label,
    value: value,
  }));

  const getNumberMonthByLabel = (label: string) =>
    months.find(month => month.label === label)?.value;

  function onMonthChange(month: number) {
    setMonthFocusedDate(month);
  }

  return (
    <StyledSelect isInverse={isInverse} theme={theme}>
      <NativeSelect
        aria-label={`${currentMonth}. ${i18n.datePicker.selectMonth}`}
        data-testid="month-picker"
        fieldId={''}
        onChange={e => onMonthChange(Number(e.target.value))}
        value={getNumberMonthByLabel(currentMonth)}
      >
        {months.map(month => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </NativeSelect>
    </StyledSelect>
  );
};
