import * as React from 'react';

import styled from '@emotion/styled';
import { isAfter, isBefore, isSameDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { transparentize } from 'polished';

import { CalendarContext } from './CalendarContext';
import { i18nFormat as format } from './utils';
import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';

interface CalendarDayProps {
  day: Date;
  dayFocusable?: boolean;
  isInverse?: boolean;
  onDateChange?: (day: Date, event: React.SyntheticEvent) => void;
}

function buildCalendarDayBackground(props) {
  if (props.isInverse) {
    if (props.isChosen) {
      return props.theme.colors.tertiary;
    }
    return props.theme.colors.primary;
  }
  if (props.isChosen) {
    return props.theme.colors.primary;
  }
  return props.theme.colors.neutral100;
}

function buildCalendarDayColor(props) {
  if (props.isInverse) {
    if (props.isChosen) {
      return props.theme.colors.primary600;
    }
    if (props.disabled) {
      return transparentize(0.6, props.theme.colors.neutral100);
    }
    return props.theme.colors.neutral100;
  }

  if (props.isChosen) {
    return props.theme.colors.neutral100;
  }
  if (props.disabled) {
    return transparentize(0.4, props.theme.colors.neutral500);
  }
  return props.theme.colors.neutral700;
}

function buildTodayCalendarDayColor(props) {
  if (props.isInverse) {
    return props.isChosen
      ? props.theme.colors.primary600
      : props.theme.colors.secondary500;
  }
  return props.isChosen
    ? props.theme.colors.neutral100
    : props.theme.colors.primary500;
}

function buildChosenDayBorder(props) {
  if (props.isChosen) {
    return `1px solid ${
      props.isInverse
        ? props.theme.colors.primary600
        : props.theme.colors.neutral100
    }`;
  }
}

function buildChosenDayHover(props) {
  if (props.isChosen) {
    return props.isInverse
      ? props.theme.colors.neutral200
      : props.theme.colors.primary600;
  }

  return props.isInverse
    ? props.theme.colors.primary600
    : props.theme.colors.neutral200;
}

const CalendarDayCell = styled.td<{
  isInverse?: boolean;
  isChosen?: boolean;
}>`
  color: ${props =>
    props.isInverse ? props.theme.colors.danger : props.theme.colors.neutral};
  font-size: ${props => props.theme.typeScale.size03.fontSize};
  font-family: ${props => props.theme.bodyFont};
  line-height: ${props => props.theme.typeScale.size03.lineHeight};
  height: ${props => props.theme.spaceScale.spacing09};
  padding: 0;
  position: relative;
  text-align: center;
  width: ${props => props.theme.spaceScale.spacing09};
`;

const CalendarDayInner = styled.button<{
  isChosen?: boolean;
  isFocused?: boolean;
  isInverse?: boolean;
  isSameDateAsToday: boolean;
  disabled?: boolean;
}>`
  align-items: center;
  background: ${props => buildCalendarDayBackground(props)};
  border: 2px solid transparent;
  color: ${props =>
    props.isSameDateAsToday
      ? buildTodayCalendarDayColor(props)
      : buildCalendarDayColor(props)};
  font-weight: ${props => (props.isSameDateAsToday ? 700 : 500)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  height: calc(${props => props.theme.spaceScale.spacing09} - 4px);
  justify-content: center;
  margin: ${props => props.theme.spaceScale.spacing01};
  overflow: hidden;
  outline-offset: 0;
  position: relative;
  transition: background 0.5s ease-in-out 0s;
  width: calc(${props => props.theme.spaceScale.spacing09} - 4px);

  &:focus {
    outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
    border: ${props => buildChosenDayBorder(props)};
  }

  &:before {
    background: ${props =>
      props.isInverse
        ? props.theme.colors.danger200
        : props.theme.colors.neutral};
    content: '';
    height: 200%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: -50%;
    transition: 0.2s;
    width: 200%;
  }

  &:hover {
    &:before {
      opacity: ${props => (props.disabled ? 0 : 0.1)};
    }
    border: none;
    background: ${props => buildChosenDayHover(props)};
  }
`;

const EmptyCell = styled.td`
  border: 0;
  padding: 0;
`;

const TodayIndicator = styled.span<{
  isInverse?: boolean;
  isChosen?: boolean;
}>`
  position: absolute;
  bottom: 5px;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${props => buildTodayCalendarDayColor(props)};
`;

export const CalendarDay: React.FunctionComponent<CalendarDayProps> = (
  props: CalendarDayProps
) => {
  const dayRef = React.useRef<HTMLButtonElement>();
  const {
    dateFocused,
    focusedDate,
    chosenDate,
    maxDate,
    minDate,
    setDateFocused,
    onDateChange,
    isInverse,
  } = React.useContext(CalendarContext);
  const [focused, setFocused] = React.useState<boolean>(false);
  const { day, dayFocusable } = props;

  React.useEffect(() => {
    if (dateFocused && isSameDay(props.day, focusedDate)) {
      dayRef.current.focus();
      setFocused(true);
    } else {
      if (focused) {
        setFocused(false);
      }
    }
  }, [focusedDate, dateFocused]);

  function onCalendarDayFocus() {
    setDateFocused(true);
  }

  function onDayClick(event: React.SyntheticEvent) {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onDateChange(day, event);
  }

  const disabled: boolean =
    (maxDate ? isAfter(props.day, maxDate) : false) ||
    (minDate ? isBefore(props.day, minDate) : false);

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  if (day) {
    const sameDateAsFocusedDate = isSameDay(day, focusedDate);
    const sameDateAsChosenDate = isSameDay(day, chosenDate);
    const sameDateAsToday = isSameDay(day, new Date());
    const locale = i18n.locale || enUS;
    const ariaLabel = `${
      disabled ? i18n.datePicker.disabledDayAriaLabel : ''
    } ${format(day, 'EEEE, MMMM do yyyy', locale)} ${
      sameDateAsToday ? i18n.datePicker.todayAriaLabel : ''
    } ${sameDateAsChosenDate ? i18n.datePicker.selectedDayAriaLabel : ''}`;

    return (
      <CalendarDayCell
        onFocus={onCalendarDayFocus}
        isInverse={isInverse}
        theme={theme}
      >
        <CalendarDayInner
          aria-disabled={disabled}
          aria-label={ariaLabel}
          aria-current={sameDateAsToday ? 'date' : undefined}
          aria-selected={sameDateAsChosenDate}
          disabled={disabled}
          data-testid="calendar-day"
          isChosen={sameDateAsChosenDate}
          isFocused={dayFocusable && sameDateAsFocusedDate}
          isInverse={isInverse}
          isSameDateAsToday={sameDateAsToday}
          onClick={onDayClick}
          ref={dayRef}
          tabIndex={sameDateAsFocusedDate ? 0 : -1}
          type="button"
          theme={theme}
        >
          {format(day, 'd', locale)}
        </CalendarDayInner>
        {sameDateAsToday && (
          <TodayIndicator
            data-testid="todayIndicator"
            theme={theme}
            isInverse={isInverse}
            isChosen={sameDateAsChosenDate}
          />
        )}
      </CalendarDayCell>
    );
  } else {
    return <EmptyCell />;
  }
};
