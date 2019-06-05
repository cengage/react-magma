import * as React from 'react';
import { CalendarContext } from './CalendarContext';
import { CalendarHeader } from './CalendarHeader';
import { CalendarDay } from './CalendarDay';
import { magma } from '../../theme/magma';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { HelperInformation } from './HelperInformation';

interface CalendarMonthState {
  dayFocusable?: boolean;
  showHelperInformation?: boolean;
}

const CalendarContainer = styled.div`
  background: ${magma.colors.neutral08};
  padding: 0 19px 10px;
`;

const MonthContainer = styled.div`
  background: ${magma.colors.neutral08};
  text-align: center;
  user-select: none;
  vertical-align: top;
`;

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
`;

const Th = styled.th`
  border: 0;
  color: ${magma.colors.neutral02};
  font-size: 13px;
  font-weight: normal;
  padding: 0;
  text-align: center;
`;

const HelperButton = styled.button`
  color: inherit;
  cursor: pointer;
  width: 33px;
  height: 26px;
  position: absolute;
  z-index: 2;
  bottom: 0px;
  right: 0px;
  background: none;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  border-radius: 0px;
  overflow: visible;
  padding: 0px;
`;

export class CalendarMonth extends React.Component<{}, CalendarMonthState> {
  state = {
    dayFocusable: false,
    showHelperInformation: false
  };

  constructor(props) {
    super(props);

    this.onCalendarTableFocus = this.onCalendarTableFocus.bind(this);
    this.onCalendarTableBlur = this.onCalendarTableBlur.bind(this);
    this.onHelperButtonClick = this.onHelperButtonClick.bind(this);
  }

  onCalendarTableFocus() {
    this.setState({ dayFocusable: true });
  }

  onCalendarTableBlur() {
    this.setState({ dayFocusable: false });
  }

  onHelperButtonClick() {
    this.setState({ showHelperInformation: true });
  }

  render() {
    return (
      <CalendarContext.Consumer>
        {context =>
          context && (
            <CalendarContainer>
              <MonthContainer data-visible="true">
                <CalendarHeader
                  text={format(context.focusedDate, 'MMMM YYYY')}
                />
                <Table
                  role="presentation"
                  onKeyDown={context.onKeyDown}
                  onBlur={this.onCalendarTableBlur}
                  onFocus={this.onCalendarTableFocus}
                >
                  <tbody>
                    <tr>
                      <Th>S</Th>
                      <Th>M</Th>
                      <Th>T</Th>
                      <Th>W</Th>
                      <Th>T</Th>
                      <Th>F</Th>
                      <Th>S</Th>
                    </tr>
                    {context
                      .buildCalendarMonth(context.focusedDate)
                      .map((week, i) => (
                        <tr key={i}>
                          {week.map((day, dayOfWeek) => (
                            <CalendarDay
                              key={dayOfWeek}
                              day={day}
                              dayFocusable={this.state.dayFocusable}
                              onDayClick={context.onDayClick}
                            />
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <HelperButton
                  onClick={this.onHelperButtonClick}
                  onFocus={context.onHelperFocus}
                >
                  ?
                </HelperButton>
                {this.state.showHelperInformation && <HelperInformation />}
              </MonthContainer>
            </CalendarContainer>
          )
        }
      </CalendarContext.Consumer>
    );
  }
}
