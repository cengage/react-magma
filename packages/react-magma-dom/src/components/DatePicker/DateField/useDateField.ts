import * as React from 'react';

export interface UseDateFieldProps {
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
}

export function useDateField(props: UseDateFieldProps) {
  const { dateFormat } = props;
  const [day, setDayValue] = React.useState<string>('');
  const [month, setMonthValue] = React.useState<string>('');
  const [year, setYearValue] = React.useState<string>('');

  const dayRef = React.useRef<HTMLInputElement>();
  const monthRef = React.useRef<HTMLInputElement>();
  const yearRef = React.useRef<HTMLInputElement>();

  const onClear = () => {
    setDayValue('');
    setMonthValue('');
    setYearValue('');
  };

  const formatWithLeadingZero = (value: number, maxValue?: number): string => {
    if (value < 10) {
      return `0${value}`;
    } else if (maxValue && value > maxValue) {
      return `0${String(value).substring(0, 1)}`;
    }

    return String(value);
  };

  const getDaysInMonth = (date?: Date) => {
    const today = date || new Date();
    const referenceMonth = Number(month) || today.getMonth() + 1;
    const referenceYear = Number(year) || today.getFullYear();
    const daysInMonth = new Date(referenceYear, referenceMonth, 0).getDate();

    return daysInMonth;
  };

  const sanitizeMonth = (newMonth: string): number => {
    const monthNum = Number(newMonth);

    if (monthNum > 12) {
      return Number(newMonth.slice(2));
    }
    if (monthNum < 1) {
      return 1;
    }
    if (newMonth.length > 2) {
      return Number(newMonth.slice(-2));
    }

    return monthNum;
  };

  const sanitizeDay = (newDay: string, daysInMonth: number): string => {
    const dayNum = Number(newDay);

    if (dayNum > daysInMonth) {
      return newDay.slice(2);
    }

    if (newDay.length > 2) {
      return newDay.slice(-2);
    }

    return newDay;
  };

  const sanitizeYear = (newYear: string): number => {
    const yearNum = Number(newYear);

    if (newYear.length > 4) {
      return Number(newYear.slice(-4));
    }

    return yearNum;
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedMonth = sanitizeMonth(event.target.value);

    setMonthValue(formatWithLeadingZero(sanitizedMonth));
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const daysInMonth = getDaysInMonth();
    const sanitizedDay = sanitizeDay(event.target.value, daysInMonth);
    const newDay = formatWithLeadingZero(Number(sanitizedDay), daysInMonth);

    setDayValue(newDay);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedYear = sanitizeYear(event.target.value);

    setYearValue(formatWithLeadingZero(sanitizedYear));
  };

  const changeDay = (direction: ChangeDirection) => {
    const today = new Date();
    const daysInMonth = getDaysInMonth();
    let newDay;

    // First press: just show current day, don't increment/decrement
    if (!day) {
      newDay = today.getDate();
    } else {
      const currentDay = Number(day);

      if (direction === ChangeDirection.Increment) {
        newDay = currentDay >= daysInMonth ? 1 : currentDay + 1;
      } else {
        newDay = currentDay <= 1 ? daysInMonth : currentDay - 1;
      }
    }

    setDayValue(formatWithLeadingZero(newDay, daysInMonth));
  };

  const changeMonth = (
    direction: ChangeDirection,
    hasMonthLongFormat: boolean
  ) => {
    let newMonthNumber: number;

    // First press: just show current month, don't increment/decrement
    if (!month) {
      newMonthNumber = new Date().getMonth() + 1;
    } else {
      // Convert month string to number if it's in long format
      if (hasMonthLongFormat) {
        const monthDate = new Date(`${month} 1, 2000`);

        newMonthNumber = monthDate.getMonth() + 1;
      } else {
        newMonthNumber = Number(month);
      }

      if (direction === ChangeDirection.Increment) {
        newMonthNumber = newMonthNumber >= 12 ? 1 : newMonthNumber + 1;
      } else {
        newMonthNumber = newMonthNumber <= 1 ? 12 : newMonthNumber - 1;
      }
    }

    // Format the month based on the format type
    if (hasMonthLongFormat) {
      const date = new Date(2000, newMonthNumber - 1, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'long' });

      setMonthValue(monthName);
    } else {
      setMonthValue(formatWithLeadingZero(newMonthNumber));
    }
  };

  const changeYear = (direction: ChangeDirection) => {
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

    // Timeout to avoid React maximum update depth error
    setTimeout(() => {
      setYearValue(String(newYear));
    }, 0);
  };

  const getFieldOrder = (format: string) => {
    const parts = format.split(/[^A-Za-z]+/);

    return parts.map(part => {
      if (part.includes('y')) return InputDateFields.Year;
      if (part.includes('M')) return InputDateFields.Month;
      if (part.includes('d')) return InputDateFields.Day;

      return part;
    });
  };

  const fieldOrder = getFieldOrder(dateFormat);
  const fieldRefs: Record<string, React.RefObject<HTMLInputElement>> = {};

  fieldOrder.forEach(key => {
    if (key === InputDateFields.Day) fieldRefs.day = dayRef;
    if (key === InputDateFields.Month) fieldRefs.month = monthRef;
    if (key === InputDateFields.Year) fieldRefs.year = yearRef;
  });

  const handleFieldKeyDown = (
    event: React.KeyboardEvent,
    fieldKey: string,
    hasMonthLongFormat?: boolean
  ) => {
    const currentIndex = fieldOrder.indexOf(fieldKey);
    const isDayField = fieldKey === InputDateFields.Day;
    const isMonthField = fieldKey === InputDateFields.Month;
    const isYearField = fieldKey === InputDateFields.Year;

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        if (isDayField) changeDay(ChangeDirection.Increment);
        if (isMonthField)
          changeMonth(ChangeDirection.Increment, hasMonthLongFormat);
        if (isYearField) changeYear(ChangeDirection.Increment);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (isDayField) changeDay(ChangeDirection.Decrement);
        if (isMonthField)
          changeMonth(ChangeDirection.Decrement, hasMonthLongFormat);
        if (isYearField) changeYear(ChangeDirection.Decrement);
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
      case 'Backspace': {
        if (isDayField) setDayValue('');
        if (isMonthField) setMonthValue('');
        if (isYearField) setYearValue('');
        break;
      }
      default:
        break;
    }
  };

  return {
    month,
    day,
    year,
    fieldRefs,
    fieldOrder,
    handleMonthChange,
    handleDayChange,
    handleYearChange,
    handleFieldKeyDown,
    setMonthValue,
    setDayValue,
    setYearValue,
    onClear,
    formatWithLeadingZero,
  };
}

export type UseDateFieldReturn = ReturnType<typeof useDateField>;
