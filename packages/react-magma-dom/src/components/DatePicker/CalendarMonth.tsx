import * as React from 'react';
import { Button } from '../Button';
import { ButtonVariant } from '../StyledButton';
import { QuestionCircleOIcon } from '../Icon/types/QuestionCircleOIcon';
import { CalendarContext } from './CalendarContext';
import { CalendarHeader } from './CalendarHeader';
import { CalendarDay } from './CalendarDay';
import { ThemeContext } from '../../theme/themeContext';
import styled from '@emotion/styled';
import { HelperInformation } from './HelperInformation';

interface CalendarMonthState {
  dayFocusable?: boolean;
  showHelperInformation?: boolean;
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
  state = {
    dayFocusable: false,
    showHelperInformation: false
  };

  constructor(props) {
    super(props);

    this.onCalendarTableFocus = this.onCalendarTableFocus.bind(this);
    this.onCalendarTableBlur = this.onCalendarTableBlur.bind(this);
    this.onHelperButtonClick = this.onHelperButtonClick.bind(this);
    this.onHelperClose = this.onHelperClose.bind(this);
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

  onHelperClose() {
    this.setState({ showHelperInformation: false });
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
                      onBlur={this.onCalendarTableBlur}
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
                        ariaLabel="Help"
                        icon={<QuestionCircleOIcon />}
                        onClick={this.onHelperButtonClick}
                        onFocus={context.onHelperFocus}
                        variant={ButtonVariant.link}
                      />
                      <HelperInformation
                        open={this.state.showHelperInformation}
                        onClose={this.onHelperClose}
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
