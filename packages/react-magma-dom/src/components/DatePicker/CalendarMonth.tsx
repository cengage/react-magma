import * as React from 'react';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../Button';
import { QuestionCircleOIcon } from '../Icon/types/QuestionCircleOIcon';
import { CrossIcon } from '../Icon/types/CrossIcon';

import { CalendarContext } from './CalendarContext';
import { CalendarHeader } from './CalendarHeader';
import { CalendarDay } from './CalendarDay';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '@emotion/styled';
import { HelperInformation } from './HelperInformation';
import { getTrapElements, getFocusedElementIndex } from '../Modal/utils';

interface CalendarMonthProps {
  calendarOpened?: boolean;
  focusOnOpen?: boolean;
  toggleDateFocus?: (value: boolean) => void;
}

interface CalendarMonthState {
  dayFocusable?: boolean;
  focusableElements: Array<HTMLElement>;
  focusHeader?: boolean;
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

const CloseButton = styled.span`
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 2;
`;

export class CalendarMonth extends React.Component<
  CalendarMonthProps,
  CalendarMonthState
> {
  private lastFocus = React.createRef<any>();
  private focusTrapElement = React.createRef<any>();

  constructor(props) {
    super(props);

    this.onCalendarTableFocus = this.onCalendarTableFocus.bind(this);
    this.onCalendarTableBlur = this.onCalendarTableBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      dayFocusable: false,
      focusableElements: []
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.calendarOpened && this.props.calendarOpened) {
      // @ts-ignore: CreateRef only gives back a immutable ref
      this.lastFocus.current = document.activeElement;

      const focusableElements = getTrapElements(this.focusTrapElement);

      if (this.props.focusOnOpen) {
        this.setState({ dayFocusable: true, focusableElements });
        this.props.toggleDateFocus(true);
      } else {
        this.setState({ focusableElements });
      }
    }

    if (
      this.props.calendarOpened &&
      !this.props.focusOnOpen &&
      !this.state.focusHeader
    ) {
      this.setState({ focusHeader: true });
    }

    if (prevProps.calendarOpened && !this.props.calendarOpened) {
      this.setState({ focusHeader: false, focusableElements: [] });

      if (this.lastFocus.current) {
        this.lastFocus.current.focus();
      }
    }
  }

  onCalendarTableFocus() {
    this.setState({ dayFocusable: true });
  }

  onCalendarTableBlur() {
    this.setState({ dayFocusable: false });
  }

  handleKeyDown(event) {
    const { keyCode, shiftKey } = event;

    if (shiftKey && keyCode === 9) {
      const index = getFocusedElementIndex(
        this.state.focusableElements,
        event.target
      );

      if (index === 0) {
        event.preventDefault();
        this.state.focusableElements[
          this.state.focusableElements.length - 1
        ].focus();
      }
    } else if (keyCode === 9) {
      const index = getFocusedElementIndex(
        this.state.focusableElements,
        event.target
      );

      if (index === this.state.focusableElements.length - 1) {
        event.preventDefault();
        if (this.state.focusableElements.length > 0) {
          this.state.focusableElements[0].focus();
        }
      }
    }
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
                  ref={this.focusTrapElement}
                >
                  <MonthContainer
                    data-testid="monthContainer"
                    data-visible="true"
                    theme={theme}
                    ref={this.focusTrapElement}
                    onKeyDown={this.handleKeyDown}
                  >
                    <CalendarHeader focusHeader={this.state.focusHeader} />
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
                                  onDateChange={context.onDateChange}
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
                    <CloseButton>
                      <Button
                        aria-label="Close Calendar"
                        color={ButtonColor.secondary}
                        icon={<CrossIcon />}
                        onClick={() => {}}
                        size={ButtonSize.small}
                        variant={ButtonVariant.link}
                      />
                    </CloseButton>
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
