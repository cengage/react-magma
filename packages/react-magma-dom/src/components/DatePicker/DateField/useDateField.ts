import * as React from 'react';

import { enUS } from 'date-fns/locale';
import { isEmpty } from 'lodash';

import { MAX_YEAR, MIN_YEAR } from '../utils';

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

  const allMonthNames = Array.from({ length: 12 }, (_, i) =>
    enUS.localize.month(i, { width: 'wide' })
  );
  const [isMonthNumberMode, setIsMonthNumberMode] =
    React.useState<boolean>(false);
  const [monthTypingBuffer, setMonthTypingBuffer] = React.useState<string>('');

  const onClear = () => {
    setDayValue('');
    setMonthValue('');
    setYearValue('');
    setMonthTypingBuffer('');
  };

  const formatWithLeadingZero = (
    value: number,
    maxValue?: number,
    isYearField?: boolean
  ): string => {
    if (isYearField) {
      return String(value).padStart(4, '0');
    }

    if (value < 10) {
      return `0${value}`;
    }

    if (maxValue && value > maxValue) {
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

  const sanitizeInputValue = (input: string): string => {
    return input.replace(/\s/g, '');
  };

  const sanitizeMonth = (
    newMonth: string,
    hasMonthLongFormat?: boolean
  ): number => {
    const cleanedMonth = sanitizeInputValue(newMonth);
    const monthNum = Number(cleanedMonth);

    if (monthNum > 12) {
      return Number(cleanedMonth.slice(hasMonthLongFormat ? 1 : 2));
    }
    if (cleanedMonth.length > 2) {
      return Number(cleanedMonth.slice(-2));
    }

    return monthNum;
  };

  const sanitizeDay = (newDay: string, daysInMonth: number): string => {
    const cleanedDay = sanitizeInputValue(newDay);
    const dayNum = Number(cleanedDay);

    if (dayNum > daysInMonth) {
      return cleanedDay.slice(2);
    }
    if (cleanedDay.length > 2) {
      return cleanedDay.slice(-2);
    }

    return cleanedDay;
  };

  const sanitizeYear = (newYear: string): number => {
    const yearNum = Number(newYear);

    if (yearNum.toString().length > 4) {
      return Number(newYear.slice(-1));
    }

    return yearNum;
  };

  const getIndexMonth = (prefix: string): number[] => {
    if (!prefix) return [];

    const matches = allMonthNames
      .map((name, index) => ({ name: name.toLowerCase(), index }))
      .filter(m => m.name.startsWith(prefix.toLowerCase()));

    const indexes = matches.map(m => m.index);

    return indexes;
  };

  const handleMonthChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    hasMonthLongFormat: boolean
  ) => {
    const inputValue = event.target.value;

    if (!hasMonthLongFormat) {
      const sanitizedMonth = sanitizeMonth(inputValue);

      setMonthValue(formatWithLeadingZero(sanitizedMonth));

      return;
    }

    const textMatch = inputValue.match(/^([a-zA-Z]+)/);
    const numberMatch = inputValue.match(/(\d+)$/);
    const monthText = textMatch ? textMatch[0] : '';
    const numberPart = numberMatch ? numberMatch[0] : '';

    if (isEmpty(numberPart)) {
      const lastChar = inputValue.slice(-1);
      const newBuffer = monthTypingBuffer + lastChar;

      setMonthTypingBuffer(newBuffer);

      const monthIndexes = getIndexMonth(newBuffer);
      const monthIndex = monthIndexes[0];

      if (monthIndexes.length === 1 || monthIndex === undefined) {
        setMonthTypingBuffer('');
      }

      if (monthIndex === undefined) return;

      setIsMonthNumberMode(false);
      setMonthValue(allMonthNames[monthIndex]);

      return;
    }

    // Handle January case where user types "January0, January1, and January2" for January
    const monthIndexes = getIndexMonth(monthText);
    const monthIndex = monthIndexes[0];

    if (monthIndex === 0 && isMonthNumberMode) {
      const combinedValue = `1${numberPart}`;
      const sanitizedMonth = sanitizeMonth(combinedValue, hasMonthLongFormat);

      setIsMonthNumberMode(false);
      setMonthValue(allMonthNames[sanitizedMonth - 1]);

      return;
    }

    const numberPartValue = Number(numberPart);

    if (numberPartValue === 0) {
      return;
    }

    setIsMonthNumberMode(true);
    setMonthValue(allMonthNames[numberPartValue - 1]);
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const daysInMonth = getDaysInMonth();
    const sanitizedDay = sanitizeDay(event.target.value, daysInMonth);
    const newDay = formatWithLeadingZero(Number(sanitizedDay), daysInMonth);

    setDayValue(newDay);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedYear = sanitizeYear(event.target.value);

    setYearValue(formatWithLeadingZero(sanitizedYear, undefined, true));
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
      setMonthTypingBuffer('');
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
        newYear = Math.min(MAX_YEAR, currentYear + 1);
      } else {
        newYear = Math.max(MIN_YEAR, currentYear - 1);
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
        if (isMonthField) {
          setMonthValue('');
          setMonthTypingBuffer('');
        }
        if (isYearField) setYearValue('');
        break;
      }
      default:
        break;
    }
  };

  return {
    allMonthNames,
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
    getIndexMonth,
  };
}

export type UseDateFieldReturn = ReturnType<typeof useDateField>;
