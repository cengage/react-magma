import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '../../theme/styled';
import { format, isAfter, isBefore, isSameDay } from 'date-fns';

import { CalendarContext } from './CalendarContext';

interface CalendarDayProps {
  day: Date;
  dayFocusable?: boolean;
  onDateChange?: (day: Date, event: React.SyntheticEvent) => void;
}

const CalendarDayCell = styled.td`
  border: 1px solid ${props => props.theme.colors.neutral06};
  color: ${props => props.theme.colors.neutral01};
  font-size: 15px;
  height: 40px;
  padding: 0;
  position: relative;
  text-align: center;
  width: 40px;
`;

const CalendarDayInner = styled.button<{
  isChosen?: boolean;
  isFocused?: boolean;
  isDisabled?: boolean;
}>`
  align-items: center;
  background: ${props =>
    props.isChosen
      ? props.theme.colors.foundation02
      : props.theme.colors.neutral08};
  border: 2px solid transparent;
  border-radius: 100%;
  color: ${props =>
    props.isChosen
      ? props.theme.colors.neutral08
      : props.isDisabled
      ? props.theme.colors.disabledText
      : props.theme.colors.neutral01};
  cursor: ${props => (props.isDisabled ? 'not-allowed' : 'pointer')};
  display: flex;
  height: 35px;
  justify-content: center;
  margin: 2px;
  overflow: hidden;
  outline-offset: 0;
  position: relative;
  transition: background 0.5s ease-in-out 0s;
  width: 35px;

  &:focus {
    outline: 2px dotted ${props => props.theme.colors.focus};
  }

  &:before {
    background: ${props => props.theme.colors.neutral01};
    content: '';
    height: 200%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: -50%;
    transition: 0.2s;
    width: 200%;
  }

  &:not(:disabled) {
    &:hover {
      &:before {
        opacity: ${props => (props.isDisabled ? 0.1 : 1)};
      }
    }
  }
`;

const EmptyCell = styled.td`
  border: 0;
  padding: 0;
`;

const TodayIndicator = styled.span`
  border-left: 8px solid ${props => props.theme.colors.pop01};
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  bottom: -6px;
  display: block;
  height: 0;
  position: absolute;
  transform: rotate(45deg);
  right: -2px;
  width: 0;
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
    onDateChange
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
    if (isDisabled) {
      event.preventDefault();
      return;
    }

    onDateChange(day, event);
  }

  const isDisabled: boolean =
    (maxDate ? isAfter(props.day, maxDate) : false) ||
    (minDate ? isBefore(props.day, minDate) : false);

  const theme = React.useContext(ThemeContext);

  if (day) {
    const sameDateAsFocusedDate = isSameDay(day, focusedDate);
    const sameDateAsChosenDate = isSameDay(day, chosenDate);
    const sameDateAsToday = isSameDay(day, new Date());

    return (
      <CalendarDayCell onFocus={onCalendarDayFocus} theme={theme}>
        <CalendarDayInner
          aria-disabled={isDisabled}
          aria-label={format(day, 'MMMM Do YYYY')}
          isDisabled={isDisabled}
          isChosen={sameDateAsChosenDate}
          isFocused={dayFocusable && sameDateAsFocusedDate}
          onClick={onDayClick}
          ref={dayRef}
          tabIndex={sameDateAsFocusedDate ? 0 : -1}
          type="button"
          theme={theme}
        >
          {format(day, 'D')}
        </CalendarDayInner>
        {sameDateAsToday && (
          <TodayIndicator data-testid="todayIndicator" theme={theme} />
        )}
      </CalendarDayCell>
    );
  } else {
    return <EmptyCell />;
  }
};
