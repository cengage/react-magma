import * as React from 'react';

export interface UseDateFieldProps {
  onChange: (value: Date | null) => void;
  dateFormat: string;
}

enum ChangeDirection {
  Increment = 'increment',
  Decrement = 'decrement',
}

export enum InputDateFields {
  Day = 'day',
  Month = 'month',
  Year = 'year',
  MonthDay = 'month-day',
}

export function useDateField(props: UseDateFieldProps) {
  const { onChange, dateFormat } = props;
  const [day, setDayValue] = React.useState<string>('');
  const [month, setMonthValue] = React.useState<string>('');
  const [year, setYearValue] = React.useState<string>('');
  const [monthDayValue, setMonthDayValue] = React.useState(
    month && day ? `${month} ${day}` : ''
  );

  const dayRef = React.useRef<HTMLInputElement>();
  const monthRef = React.useRef<HTMLInputElement>();
  const yearRef = React.useRef<HTMLInputElement>();
  const monthDayRef = React.useRef<HTMLInputElement>();

  const onClear = () => {
    setDayValue('');
    setMonthValue('');
    setYearValue('');
    setMonthDayValue('');
  };

  function updateDate(newDate: Date | null) {
    onChange && typeof onChange === 'function' && onChange(newDate);
  }

  function sanitizeMonth(newMonth: string): number {
    const monthNum = Number(newMonth);
    if (monthNum > 12) {
      return Number(newMonth.slice(-1)) || 1;
    }
    if (monthNum < 1) {
      return 1;
    }
    if (newMonth.length > 2) {
      return Number(newMonth.slice(-2)) || 1;
    }
    return monthNum;
  }

  function sanitizeDay(
    newDay: string,
    currentMonth: number,
    currentYear: number
  ): number {
    const dayNum = Number(newDay);
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    if (dayNum > daysInMonth) {
      return Number(newDay.slice(-1)) || 1;
    }
    if (dayNum < 1) {
      return 1;
    }
    if (newDay.length > 2) {
      return Number(newDay.slice(-2)) || 1;
    }
    return dayNum;
  }

  function sanitizeYear(newYear: string): number {
    const yearNum = Number(newYear);
    if (newYear.length > 4) {
      return Number(newYear.slice(-4));
    }
    return yearNum;
  }

  function buildCompleteDate(): Date | null {
    if (!month || !day || !year) {
      return null;
    }
    const monthNum = Number(month);
    const dayNum = Number(day);
    const yearNum = Number(year);
    const newDate = new Date(yearNum, monthNum - 1, dayNum);
    // Validate the date is actually valid (e.g., not Feb 30)
    if (newDate.getMonth() !== monthNum - 1) {
      return null;
    }
    return newDate;
  }

  function handleMonthChange(event: React.ChangeEvent<HTMLInputElement>) {
    const sanitizedMonth = sanitizeMonth(event.target.value);
    const paddedMonth = sanitizedMonth.toString();
    setMonthValue(paddedMonth);
    const completeDate = buildCompleteDate();
    updateDate(completeDate);
  }

  function handleDayChange(event: React.ChangeEvent<HTMLInputElement>) {
    const today = new Date();
    const currentMonth = Number(month) || today.getMonth() + 1;
    const currentYear = Number(year) || today.getFullYear();
    const sanitizedDay = sanitizeDay(
      event.target.value,
      currentMonth,
      currentYear
    );
    const paddedDay = sanitizedDay.toString();
    setDayValue(paddedDay);
    const completeDate = buildCompleteDate();
    updateDate(completeDate);
  }

  function handleYearChange(event: React.ChangeEvent<HTMLInputElement>) {
    const sanitizedYear = sanitizeYear(event.target.value);
    setYearValue(sanitizedYear.toString());
    const completeDate = buildCompleteDate();
    updateDate(completeDate);
  }

  function changeDay(direction: ChangeDirection) {
    const today = new Date();
    let newDay;
    // First press: just show current day, don't increment/decrement
    if (!day) {
      newDay = today.getDate();
    } else {
      const referenceMonth = Number(month) || today.getMonth() + 1;
      const referenceYear = Number(year) || today.getFullYear();
      const currentDay = Number(day);
      const daysInMonth = new Date(referenceYear, referenceMonth, 0).getDate();
      if (direction === 'increment') {
        newDay = currentDay >= daysInMonth ? 1 : currentDay + 1;
      } else {
        newDay = currentDay <= 1 ? daysInMonth : currentDay - 1;
      }
    }
    const paddedDay = newDay.toString();
    setDayValue(paddedDay);
  }

  function changeMonth(direction: ChangeDirection) {
    let newMonth;
    // First press: just show current month, don't increment/decrement
    if (!month) {
      newMonth = new Date().getMonth() + 1;
    } else {
      const currentMonth = Number(month);
      if (direction === ChangeDirection.Increment) {
        newMonth = currentMonth >= 12 ? 1 : currentMonth + 1;
      } else {
        newMonth = currentMonth <= 1 ? 12 : currentMonth - 1;
      }
    }
    const paddedMonth = newMonth.toString();
    setMonthValue(paddedMonth);
  }

  function changeYear(direction: ChangeDirection) {
    let newYear;
    // First press: just show current year, don't increment/decrement
    if (!year) {
      newYear = new Date().getFullYear();
    } else {
      const currentYear = Number(year);
      if (direction === ChangeDirection.Increment) {
        newYear = Math.min(2099, currentYear + 1);
      } else {
        newYear = Math.max(1900, currentYear - 1);
      }
    }
    setYearValue(newYear.toString());
  }

  const getFieldOrder = (format: string) => {
    const parts = format.split(/[^A-Za-z]+/);
    const hasLongMonth = parts.includes('MMMM');
    return parts
      .map(part => {
        if (part.includes('y')) return InputDateFields.Year;
        if (part.includes('M'))
          return hasLongMonth
            ? InputDateFields.MonthDay
            : InputDateFields.Month;
        if (part.includes('d') && !hasLongMonth) return InputDateFields.Day;
        return part;
      })
      .filter(part => part !== 'd');
  };

  const fieldOrder = getFieldOrder(dateFormat);
  const fieldRefs: Record<string, React.RefObject<HTMLInputElement>> = {};
  fieldOrder.forEach(key => {
    if (key === InputDateFields.Day) fieldRefs.day = dayRef;
    if (key === InputDateFields.Month) fieldRefs.month = monthRef;
    if (key === InputDateFields.Year) fieldRefs.year = yearRef;
    if (key === InputDateFields.MonthDay)
      fieldRefs[InputDateFields.MonthDay] = monthDayRef;
  });

  function handleFieldKeyDown(event: React.KeyboardEvent, fieldKey: string) {
    const currentIndex = fieldOrder.indexOf(fieldKey);
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        if (fieldKey === InputDateFields.Day)
          changeDay(ChangeDirection.Increment);
        if (fieldKey === InputDateFields.Month)
          changeMonth(ChangeDirection.Increment);
        if (fieldKey === InputDateFields.Year)
          changeYear(ChangeDirection.Increment);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (fieldKey === InputDateFields.Day)
          changeDay(ChangeDirection.Decrement);
        if (fieldKey === InputDateFields.Month)
          changeMonth(ChangeDirection.Decrement);
        if (fieldKey === InputDateFields.Year)
          changeYear(ChangeDirection.Decrement);
        break;
      case 'ArrowLeft': {
        event.preventDefault();
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
          fieldRefs[fieldOrder[prevIndex]]?.current?.focus();
        }
        break;
      }
      case 'ArrowRight': {
        event.preventDefault();
        const nextIndex = currentIndex + 1;
        if (nextIndex < fieldOrder.length) {
          fieldRefs[fieldOrder[nextIndex]]?.current?.focus();
        }
        break;
      }
      default:
        break;
    }
  }

  return {
    month,
    day,
    year,
    monthDayValue,
    fieldRefs,
    fieldOrder,
    handleMonthChange,
    handleDayChange,
    handleYearChange,
    handleFieldKeyDown,
    setMonthValue,
    setDayValue,
    setYearValue,
    setMonthDayValue,
    onClear,
  };
}

export type UseDateFieldReturn = ReturnType<typeof useDateField>;
