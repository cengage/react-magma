import * as React from 'react';
import { Button, ButtonVariant } from '../Button';
import { QuestionCircleOIcon } from '../Icon/types/QuestionCircleOIcon';
import { CalendarContext } from './CalendarContext';
import { CalendarHeader } from './CalendarHeader';
import { CalendarDay } from './CalendarDay';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '@emotion/styled';
import { HelperInformation } from './HelperInformation';

interface CalendarMonthState {
  dayFocusable?: boolean;
}

const CalendarContainer = styled.div`
  background: ${props => props.theme.colors.neutral08};
  padding: 0 19px 10px;
`;

const MonthContainer = styled.div`
  background: ${props => props.theme.colors.neutral08};
  text-align: center;
  user-select: none;
  vertical-align: top;
`;

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 38px;
`;

const Th = styled.th`
  border: 0;
  color: $ ${props => props.theme.colors.neutral02};
  font-size: 13px;
  font-weight: normal;
  padding: 0;
  text-align: center;
`;

const HelperButton = styled.span`
  bottom: 0px;
  position: absolute;
  right: 0px;
  z-index: 2;
`;

export class CalendarMonth extends React.Component<{}, CalendarMonthState> {
  constructor(props) {
    super(props);

    this.onCalendarTableFocus = this.onCalendarTableFocus.bind(this);
    this.onCalendarTableBlur = this.onCalendarTableBlur.bind(this);

    this.state = {
      dayFocusable: false
    };
  }

  onCalendarTableFocus() {
    this.setState({ dayFocusable: true });
  }

  onCalendarTableBlur() {
    this.setState({ dayFocusable: false });
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <CalendarContext.Consumer>
            {context =>
              context && (
                <CalendarContainer
                  tabIndex={-1}
                  theme={theme}
                  onKeyDown={context.onKeyDown}
                >
                  <MonthContainer data-visible="true" theme={theme}>
                    <CalendarHeader />
                    <Table
                      role="presentation"
                      onBlur={() => {
                        this.onCalendarTableBlur();
                        context.toggleDateFocus(false);
                      }}
                      onFocus={this.onCalendarTableFocus}
                    >
                      <tbody>
                        <tr>
                          <Th theme={theme}>S</Th>
                          <Th theme={theme}>M</Th>
                          <Th theme={theme}>T</Th>
                          <Th theme={theme}>W</Th>
                          <Th theme={theme}>T</Th>
                          <Th theme={theme}>F</Th>
                          <Th theme={theme}>S</Th>
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
                    <HelperButton>
                      <Button
                        aria-label="Calendar Help"
                        icon={<QuestionCircleOIcon />}
                        onClick={context.openHelperInformation}
                        onFocus={context.onHelperFocus}
                        variant={ButtonVariant.link}
                      />
                      <HelperInformation
                        open={context.showHelperInformation}
                        onClose={context.closeHelperInformation}
                      />
                    </HelperButton>
                  </MonthContainer>
                </CalendarContainer>
              )
            }
          </CalendarContext.Consumer>
        )}
      </ThemeContext.Consumer>
    );
  }
}
