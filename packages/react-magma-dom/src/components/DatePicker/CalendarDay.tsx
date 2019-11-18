import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '../../theme/styled';
import { format, isSameDay } from 'date-fns';

import { CalendarContext } from './CalendarContext';

interface CalendarDayProps {
  day: Date;
  dayFocusable?: boolean;
  onDateChange?: (day: Date, event: React.SyntheticEvent) => void;
}

const CalendarDayCell = styled.td`
  border: 1px solid ${props => props.theme.colors.neutral06};
  color: ${props => props.theme.colors.neutral02};
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
}>`
  align-items: center;
  background: ${props =>
    props.isChosen
      ? props.theme.colors.foundation01
      : props.theme.colors.neutral08};
  border: 2px solid transparent;
  border-radius: 100%;
  color: ${props =>
    props.isChosen
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral02};
  cursor: pointer;
  display: flex;
  height: 35px;
  justify-content: center;
  margin: 2px;
  overflow: hidden;
  outline-offset: 0;
  position: relative;
  transition: background 0.5s ease-in-out 0s, outline 0.1s linear;
  width: 35px;

  &:before {
    background: ${props => props.theme.colors.neutral02};
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
      opacity: 0.1;
    }
  }

  &:focus {
    outline: 2px dotted ${props => props.theme.colors.pop02};
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
    setDateFocused,
    onDateChange
  } = React.useContext(CalendarContext);
  const [focused, setFocused] = React.useState<boolean>(false);

  React.useEffect(() => {
    focusCurrentDay();
  }, [focusedDate, dateFocused]);

  function focusCurrentDay() {
    if (dateFocused && isSameDay(props.day, focusedDate)) {
      dayRef.current.focus();
      setFocused(true);
    } else {
      if (focused) {
        setFocused(false);
      }
    }
  }

  const { day, dayFocusable } = props;

  return (
    <CalendarContext.Consumer>
      {context => {
        if (context && day) {
          const sameDateAsFocusedDate = isSameDay(day, focusedDate);
          const sameDateAsChosenDate = isSameDay(day, chosenDate);
          const sameDateAsToday = isSameDay(day, new Date());

          return (
            <ThemeContext.Consumer>
              {theme => (
                <CalendarDayCell
                  onFocus={() => setDateFocused(true)}
                  theme={theme}
                >
                  <CalendarDayInner
                    aria-label={format(day, 'MMMM Do YYYY')}
                    isChosen={sameDateAsChosenDate}
                    isFocused={dayFocusable && sameDateAsFocusedDate}
                    onClick={e => {
                      onDateChange(day, e);
                    }}
                    ref={dayRef}
                    tabIndex={sameDateAsFocusedDate ? 0 : -1}
                    type="button"
                    theme={theme}
                  >
                    {format(day, 'D')}
                  </CalendarDayInner>
                  {sameDateAsToday && (
                    <TodayIndicator
                      data-testid="todayIndicator"
                      theme={theme}
                    />
                  )}
                </CalendarDayCell>
              )}
            </ThemeContext.Consumer>
          );
        } else {
          return <EmptyCell />;
        }
      }}
    </CalendarContext.Consumer>
  );
};
