import {
  subDays,
  subWeeks,
  subMonths,
  addDays,
  addWeeks,
  addMonths,
  startOfWeek,
  endOfWeek
} from 'date-fns';

export function handleKeyPress(
  e: React.KeyboardEvent,
  prevDate: Date,
  toggleCalendar?: (calendarOpened: boolean) => void,
  openHelperInformation?: () => void,
  onDateChange?: (day: Date) => void
) {
  const { key } = e;

  if (key === 'Enter' || key === ' ') {
    onDateChange(prevDate);
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
      break;

    case '?':
      e.preventDefault();
      openHelperInformation();
      break;

    default:
      break;
  }
}
