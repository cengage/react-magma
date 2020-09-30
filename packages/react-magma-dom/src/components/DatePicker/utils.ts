import {
  subDays,
  subWeeks,
  subMonths,
  addDays,
  addWeeks,
  addMonths,
  getDay,
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  differenceInDays,
  parseISO
} from 'date-fns';
import { enUS } from 'date-fns/locale';

export function handleKeyPress(
  e: React.KeyboardEvent,
  prevDate: Date,
  toggleCalendar?: (calendarOpened: boolean) => void,
  setShowHelperInformation?: (value: boolean) => void,
  onDateChange?: (day: Date) => void,
  iconRef?: React.RefObject<any>
) {
  const { key } = e;

  if (key === 'Enter' || key === ' ') {
    if (!(e.target as HTMLElement).getAttribute('aria-disabled')) {
      onDateChange(prevDate);
    }
  }

  switch (key) {
    case 'ArrowUp':
      e.preventDefault();
      return subWeeks(prevDate, 1);

    case 'ArrowLeft':
      e.preventDefault();
      return subDays(prevDate, 1);

    case 'Home':
      e.preventDefault();
      return startOfWeek(prevDate);

    case 'PageUp':
      e.preventDefault();
      return subMonths(prevDate, 1);

    case 'ArrowDown':
      e.preventDefault();
      return addWeeks(prevDate, 1);

    case 'ArrowRight':
      e.preventDefault();
      return addDays(prevDate, 1);

    case 'End':
      e.preventDefault();
      return endOfWeek(prevDate);

    case 'PageDown':
      e.preventDefault();
      return addMonths(prevDate, 1);

    case 'Escape':
      e.preventDefault();
      toggleCalendar(false);
      iconRef.current.focus();
      break;

    case '?':
      e.preventDefault();
      setShowHelperInformation(true);
      break;

    default:
      break;
  }
}

export function getCalendarMonthWeeks(
  month,
  enableOutsideDays,
  firstDayOfWeek = 0
): Date[][] {
  const firstOfMonth = startOfMonth(month);
  const lastOfMonth = endOfMonth(month);

  const prevDays = (getDay(firstOfMonth) + 7 - firstDayOfWeek) % 7;
  const nextDays = (firstDayOfWeek + 6 - getDay(lastOfMonth)) % 7;
  const firstDay = subDays(firstOfMonth, prevDays);
  const lastDay = addDays(lastOfMonth, nextDays);

  const totalDays = differenceInDays(lastDay, firstDay) + 1;

  const currentDay = firstDay;
  const weeksInMonth = [];

  for (let i = 0; i < totalDays; i += 1) {
    if (i % 7 === 0) {
      weeksInMonth.push([]);
    }

    let day = null;
    if ((i >= prevDays && i < totalDays - nextDays) || enableOutsideDays) {
      day = addDays(currentDay, i);
    }

    weeksInMonth[weeksInMonth.length - 1].push(day);
  }

  return weeksInMonth;
}

export function getPrevMonthFromDate(prevDate) {
  return startOfMonth(subMonths(prevDate, 1));
}

export function getNextMonthFromDate(prevDate) {
  return startOfMonth(addMonths(prevDate, 1));
}

export function i18nFormat(date, formatStr = 'PP', locale = enUS) {
  return (
    date &&
    format(convertToUtc(date), formatStr, {
      locale
    })
  );
}

export function getDateFromString(date) {
  return date ? (date instanceof Date ? date : new Date(date)) : null;
}

export function convertToUtc(date) {
  date = getDateFromString(date);

  const utcDate = parseISO(
    `${date.getFullYear()}-${('0' + String(Number(date.getMonth()) + 1)).slice(
      -2
    )}-${('0' + String(date.getDate())).slice(-2)}`
  );

  return utcDate;
}
