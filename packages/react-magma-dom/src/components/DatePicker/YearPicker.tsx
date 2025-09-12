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

  function onYearChange(year: number) {
    setYearFocusedDate(year);
  }

  return (
    <StyledSelect isInverse={isInverse} theme={theme}>
      <NativeSelect
        aria-label={i18n.datePicker.selectYear}
        data-testid="year-picker"
        fieldId={''}
        onChange={e => onYearChange(Number(e.target.value))}
        value={currentYear}
      >
        {years.map(year => (
          <option
            key={year.value}
            value={year.value}
            // Need to apply it for NVDA to only read the selected option
            aria-hidden={currentYear !== year.value}
          >
            {year.label}
          </option>
        ))}
      </NativeSelect>
    </StyledSelect>
  );
};
