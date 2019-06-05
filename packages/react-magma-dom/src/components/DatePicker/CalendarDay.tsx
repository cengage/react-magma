import * as React from 'react';
import { CalendarDayCore } from 'react-magma-core';
import { magma } from '../../theme/magma';
import styled from '@emotion/styled';
import { format, isSameDay } from 'date-fns';

// must import CalendarContextInterface for typescript compiler to build types file
// @ts-ignore: Declared but never read error
import { CalendarContext, CalendarContextInterface } from './CalendarContext';

interface CalendarDayProps {
  day: Date;
  dayFocusable?: boolean;
  onDayClick?: (day: Date, event: React.SyntheticEvent) => void;
}

interface CalendarDayState {
  focused?: boolean;
}

const CalendarDayCell = styled.td`
  border: 1px solid ${magma.colors.neutral06};
  color: ${magma.colors.neutral02};
  cursor: pointer;
  font-size: 15px;
  height: 40px;
  padding: 0;
  position: relative;
  text-align: center;
  width: 40px;
`;

const CalendarDayInner = styled.span<{
  isChosen?: boolean;
  isFocused?: boolean;
}>`
  align-items: center;
  background: ${props =>
    props.isChosen ? magma.colors.foundation01 : magma.colors.neutral08};
  border: 2px solid;
  border-color: ${props =>
    props.isFocused ? magma.colors.pop02 : 'transparent'};
  border-radius: 100%;
  color: ${props =>
    props.isChosen ? magma.colors.neutral08 : magma.colors.neutral02};
  display: flex;
  height: 35px;
  justify-content: center;
  margin: 2px;
  outline: 0;
  overflow: hidden;
  position: relative;
  transition: background 0.5s ease-in-out 0s;
  width: 35px;

  &:before {
    background: ${magma.colors.neutral02};
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
`;

const EmptyCell = styled.td`
  border: 0;
  padding: 0;
`;

const TodayIndicator = styled.span`
  border-left: 8px solid ${magma.colors.pop01};
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

export class CalendarDay extends React.Component<
  CalendarDayProps,
  CalendarDayState
> {
  private readonly dayRef = React.createRef<any>();
  static contextType = CalendarContext;
  context!: React.ContextType<typeof CalendarContext>;

  state = {
    focused: false
  };

  constructor(props) {
    super(props);

    this.focusCurrentDay = this.focusCurrentDay.bind(this);
  }

  componentDidMount() {
    this.focusCurrentDay();
  }

  componentDidUpdate() {
    this.focusCurrentDay();
  }

  focusCurrentDay() {
    if (
      this.context.dateFocused &&
      isSameDay(this.props.day, this.context.focusedDate)
    ) {
      if (!this.state.focused) {
        this.dayRef.current.focus();
        this.setState({ focused: true });
      }
    } else {
      if (this.state.focused) {
        this.setState({ focused: false });
      }
    }
  }

  render() {
    const { day, dayFocusable } = this.props;
    const { onDateFocus } = this.context;

    return (
      <CalendarContext.Consumer>
        {context =>
          context && day ? (
            <CalendarDayCore onClick={context.onDayClick}>
              {({ onClick }) => {
                const sameDateAsFocusedDate = isSameDay(
                  day,
                  context.focusedDate
                );

                const sameDateAsChosenDate = isSameDay(day, context.chosenDate);

                const sameDateAsToday = isSameDay(day, new Date());

                return (
                  <CalendarDayCell onFocus={onDateFocus}>
                    <CalendarDayInner
                      aria-label={format(day, 'MMMM Do YYYY')}
                      isChosen={sameDateAsChosenDate}
                      isFocused={dayFocusable && sameDateAsFocusedDate}
                      role="button"
                      onClick={e => {
                        onClick(day, e);
                      }}
                      ref={this.dayRef}
                      tabIndex={sameDateAsFocusedDate ? 0 : -1}
                    >
                      {format(day, 'D')}
                    </CalendarDayInner>
                    {sameDateAsToday && <TodayIndicator />}
                  </CalendarDayCell>
                );
              }}
            </CalendarDayCore>
          ) : (
            <EmptyCell />
          )
        }
      </CalendarContext.Consumer>
    );
  }
}
