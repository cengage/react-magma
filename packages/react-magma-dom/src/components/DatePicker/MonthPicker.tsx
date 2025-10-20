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
  const { setMonthFocusedDate, minDate, maxDate, focusedDate } =
    React.useContext(CalendarContext);
  const i18n = React.useContext(I18nContext);
  const monthsLabels = i18n.months.long;
  const theme = React.useContext(ThemeContext);
  const months = Object.values(monthsLabels).map((label, value) => ({
    label,
    value: value,
  }));

  const getNumberMonthByLabel = (label: string) =>
    months.find(month => month.label === label)?.value;

  const isMonthDisabled = (monthValue: number) => {
    const currentYear = new Date(focusedDate).getFullYear();

    if (minDate) {
      const minYear = minDate.getFullYear();
      const minMonth = minDate.getMonth();
      if (currentYear === minYear && monthValue < minMonth) {
        return true;
      }
    }

    if (maxDate) {
      const maxYear = maxDate.getFullYear();
      const maxMonth = maxDate.getMonth();
      if (currentYear === maxYear && monthValue > maxMonth) {
        return true;
      }
    }

    return false;
  };

  function onMonthChange(month: number) {
    setMonthFocusedDate(month);
  }

  const getTextWidth = (text: string, font: string) => {
    try {
      const canvas = document.createElement('canvas');
      // Note: jsdom logs a console error here since Canvas 2D API is not implemented.
      // Safe to ignore in test environment.
      const context = canvas?.getContext?.('2d');

      if (!context) return 0;

      context.font = font;
      return context.measureText(text).width;
    } catch {
      // jsdom throws "Not implemented: HTMLCanvasElement.prototype.getContext"
      return 0;
    }
  };

  const getMonthWidth = (month: string) => {
    const font = `${theme.typeScale.size03.fontSize} ${theme.bodyFont}`;
    const padding = parseInt(theme.spaceScale.spacing03, 10) * 2;
    return Math.ceil(getTextWidth(month, font) + padding);
  };

  const width = getMonthWidth(currentMonth);

  return (
    <StyledSelect isInverse={isInverse} theme={theme}>
      <NativeSelect
        aria-label={i18n.datePicker.selectMonth}
        data-testid="month-picker"
        fieldId={'month-picker-id'}
        onChange={e => onMonthChange(Number(e.target.value))}
        value={getNumberMonthByLabel(currentMonth)}
        style={{ width }}
      >
        {months.map(month => (
          <option
            key={month.value}
            value={month.value}
            disabled={isMonthDisabled(month.value)}
          >
            {month.label}
          </option>
        ))}
      </NativeSelect>
    </StyledSelect>
  );
};
