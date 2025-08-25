import * as React from 'react';

import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { isAfter, isBefore, isSameDay, isSameMonth } from 'date-fns';
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

type CalendarDayState = {
  isChosen: boolean;
  disabled: boolean;
  isDayInCurrentMonth: boolean;
  isToday: boolean;
};

function getCalendarDayBackground(
  isInverse: boolean,
  isChosen: boolean,
  theme: Theme
) {
  if (isInverse) {
    return isChosen ? theme.colors.tertiary : theme.colors.primary;
  }
  return isChosen ? theme.colors.primary : theme.colors.neutral100;
}

const getTodayColor = (isChosen: boolean, isInverse: boolean, theme: Theme) => {
  if (isInverse) {
    return isChosen ? theme.colors.primary600 : theme.colors.secondary500;
  }
  return isChosen ? theme.colors.neutral100 : theme.colors.primary500;
};

const getChosenDayColor = (isInverse: boolean, theme: Theme) => {
  return isInverse ? theme.colors.primary600 : theme.colors.neutral100;
};

const getDisabledColor = (isInverse: boolean, theme: Theme) => {
  return isInverse
    ? transparentize(0.6, theme.colors.neutral100)
    : transparentize(0.4, theme.colors.neutral500);
};

const getNotCurrentMonthColor = (isInverse: boolean, theme: Theme) => {
  return isInverse
    ? transparentize(0.3, theme.colors.neutral100)
    : theme.colors.neutral500;
};

const getCurrentMonthColor = (isInverse: boolean, theme: Theme) => {
  return isInverse ? theme.colors.neutral100 : theme.colors.neutral700;
};

const getCalendarDayColor = (
  state: CalendarDayState,
  isInverse: boolean,
  theme: any
) => {
  if (state.isToday) return getTodayColor(state.isChosen, isInverse, theme);
  if (state.disabled) return getDisabledColor(isInverse, theme);
  if (state.isChosen) return getChosenDayColor(isInverse, theme);
  if (!state.isDayInCurrentMonth && !state.disabled)
    return getNotCurrentMonthColor(isInverse, theme);
  return getCurrentMonthColor(isInverse, theme);
};

function getChosenDayBorder(
  isInverse: boolean,
  isChosen: boolean,
  theme: Theme
) {
  if (isChosen) {
    return `1px solid ${
      isInverse ? theme.colors.primary600 : theme.colors.neutral100
    }`;
  }
}

function getChosenDayHover(
  isChosen: boolean,
  isInverse: boolean,
  theme: Theme
) {
  if (isChosen) {
    return isInverse ? theme.colors.neutral200 : theme.colors.primary600;
  }

  return isInverse ? theme.colors.primary600 : theme.colors.neutral200;
}

const getCalendarDayFontSize = (state: CalendarDayState) => {
  if (state.isToday) return 700;
  return !state.isDayInCurrentMonth || state.disabled ? 400 : 500;
};

const CalendarDayCell = styled.td<{
  isInverse: boolean;
  theme: Theme;
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
`;

const CalendarDayInner = styled.button<{
  state: CalendarDayState;
  isInverse?: boolean;
  theme: Theme;
}>`
  align-items: center;
  background: ${props =>
    getCalendarDayBackground(
      props.isInverse,
      props.state.isChosen,
      props.theme
    )};
  border: 2px solid transparent;
  color: ${props =>
    getCalendarDayColor(props.state, props.isInverse, props.theme)};
  font-weight: ${props => getCalendarDayFontSize(props.state)};
  cursor: ${props => (props.state.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  height: ${props => props.theme.spaceScale.spacing09};
  justify-content: center;
  overflow: hidden;
  outline-offset: 0;
  position: relative;
  transition: background 0.5s ease-in-out 0s;
  width: 43px;

  &:focus {
    outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
    border: ${props =>
      getChosenDayBorder(props.isInverse, props.state.isChosen, props.theme)};
    width: ${props => props.theme.spaceScale.spacing09};
    height: 36px;
    margin: 1px;
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
      opacity: ${props => (props.state.disabled ? 0 : 0.1)};
    }
    border: none;
    background: ${props =>
      getChosenDayHover(props.state.isChosen, props.isInverse, props.theme)};
  }
`;

const EmptyCell = styled.td`
  border: 0;
  padding: 0;
`;

const TodayIndicator = styled.span<{
  isInverse: boolean;
  isChosen: boolean;
  theme: Theme;
}>`
  position: absolute;
  bottom: 5px;
  left: 19px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${props =>
    getTodayColor(props.isChosen, props.isInverse, props.theme)};
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
    onDateChange,
    setDateFocused,
    setFocusedDate,
    isInverse,
  } = React.useContext(CalendarContext);
  const [focused, setFocused] = React.useState<boolean>(false);
  const { day } = props;

  React.useEffect(() => {
    if (dateFocused && isSameDay(day, focusedDate)) {
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

  function onFocusDay(event: React.SyntheticEvent) {
    if (disabled || !isSameMonth(day, focusedDate)) {
      event.preventDefault();
      return;
    }
    setFocusedDate(day);
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
    const isDayInCurrentMonth = isSameMonth(day, focusedDate);
    const locale = i18n.locale || enUS;
    const ariaLabel = `${
      disabled ? i18n.datePicker.disabledDayAriaLabel : ''
    } ${format(day, 'EEEE, MMMM do yyyy', locale)} ${
      sameDateAsToday ? i18n.datePicker.todayAriaLabel : ''
    } ${sameDateAsChosenDate ? i18n.datePicker.selectedDayAriaLabel : ''}`;
    const dayState: CalendarDayState = {
      isChosen: sameDateAsChosenDate,
      disabled,
      isDayInCurrentMonth,
      isToday: sameDateAsToday,
    };

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
          data-testid="calendar-day"
          state={dayState}
          isInverse={isInverse}
          onClick={onDayClick}
          onMouseDown={onFocusDay}
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
            isInverse={isInverse}
            isChosen={sameDateAsChosenDate}
            theme={theme}
          />
        )}
      </CalendarDayCell>
    );
  } else {
    return <EmptyCell />;
  }
};
