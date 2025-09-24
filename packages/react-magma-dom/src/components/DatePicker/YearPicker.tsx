import React from 'react';

import { getYear } from 'date-fns';

import { CalendarContext } from './CalendarContext';
import { StyledSelect } from './StyledSelect';
import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { NativeSelect } from '../NativeSelect';

interface YearPickerProps {
  currentYear: number;
  isInverse: boolean;
}

export const YearPicker: React.FunctionComponent<YearPickerProps> = (
  props: YearPickerProps
) => {
  const { currentYear, isInverse } = props;
  const { minDate, maxDate } = React.useContext(CalendarContext);
  const minYear = minDate ? getYear(minDate) : 1900;
  const maxYear = maxDate ? getYear(maxDate) : 2099;
  const theme = React.useContext(ThemeContext);
  const { setYearFocusedDate } = React.useContext(CalendarContext);
  const i18n = React.useContext(I18nContext);

  const visibleYears = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i
  );

  const years = visibleYears.map(year => ({
    label: String(year),
    value: year,
  }));

  // Show the current year as a disabled option if it's not in the range between minDate and maxDate
  const showCurrentYearOption = !years.some(year => year.value === currentYear);
  const isCurrentYearBeforeRange = currentYear < minYear;
  const isCurrentYearAfterRange = currentYear > maxYear;

  function onYearChange(year: number) {
    setYearFocusedDate(year);
  }

  return (
    <StyledSelect isInverse={isInverse} theme={theme}>
      <NativeSelect
        aria-label={i18n.datePicker.selectYear}
        data-testid="year-picker"
        fieldId={'year-picker-id'}
        onChange={e => onYearChange(Number(e.target.value))}
        value={currentYear}
      >
        {showCurrentYearOption && isCurrentYearBeforeRange && (
          <option value={currentYear} disabled>
            {currentYear}
          </option>
        )}
        {years.map(year => (
          <option key={year.value} value={year.value}>
            {year.label}
          </option>
        ))}
        {showCurrentYearOption && isCurrentYearAfterRange && (
          <option value={currentYear} disabled>
            {currentYear}
          </option>
        )}
      </NativeSelect>
    </StyledSelect>
  );
};
