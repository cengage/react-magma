import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '@emotion/styled';
import { isAfter, isBefore, isSameDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { CalendarContext } from './CalendarContext';
import { I18nContext } from '../../i18n';
import { i18nFormat as format } from './utils';

interface CalendarDayProps {
  day: Date;
  dayFocusable?: boolean;
  onDateChange?: (day: Date, event: React.SyntheticEvent) => void;
}

const CalendarDayCell = styled.td`
  border: 1px solid ${props => props.theme.colors.neutral06};
  color: ${props => props.theme.colors.neutral};
  font-size: ${props => props.theme.typeScale.size03.fontSize};
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
  disabled?: boolean;
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
      : props.disabled
      ? props.theme.colors.disabledText
      : props.theme.colors.neutral};
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
    outline: 2px dotted ${props => props.theme.colors.focus};
  }

  &:before {
    background: ${props => props.theme.colors.neutral};
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
  }
`;

const EmptyCell = styled.td`
  border: 0;
  padding: 0;
`;

const TodayIndicator = styled.span`
  border-left: 8px solid ${props => props.theme.colors.pop};
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
    onDateChange,
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
      <CalendarDayCell onFocus={onCalendarDayFocus} theme={theme}>
        <CalendarDayInner
          aria-disabled={disabled}
          aria-label={ariaLabel}
          disabled={disabled}
          isChosen={sameDateAsChosenDate}
          isFocused={dayFocusable && sameDateAsFocusedDate}
          onClick={onDayClick}
          ref={dayRef}
          tabIndex={sameDateAsFocusedDate ? 0 : -1}
          type="button"
          theme={theme}
        >
          {format(day, 'd', locale)}
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
