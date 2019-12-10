import * as React from 'react';
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonType,
  ButtonVariant
} from '../Button';
import { QuestionCircleOIcon } from '../Icon/types/QuestionCircleOIcon';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { CalendarContext } from './CalendarContext';
import { CalendarHeader } from './CalendarHeader';
import { CalendarDay } from './CalendarDay';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '../../theme/styled';
import { HelperInformation } from './HelperInformation';
import { getTrapElements, getFocusedElementIndex } from '../Modal/utils';
import { usePrevious } from '../utils';

interface CalendarMonthProps {
  calendarOpened?: boolean;
  focusOnOpen?: boolean;
  handleCloseButtonClick: (event: React.SyntheticEvent) => void;
  setDateFocused?: (value: boolean) => void;
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

export const CalendarMonth: React.FunctionComponent<CalendarMonthProps> = (
  props: CalendarMonthProps
) => {
  const lastFocus = React.useRef<any>();
  const focusTrapElement = React.useRef<any>();
  const context = React.useContext(CalendarContext);
  const [dayFocusable, setDayFocusable] = React.useState<boolean>(false);
  const [focusableElements, setFocusableElements] = React.useState<
    HTMLElement[]
  >([]);
  const [focusHeader, setFocusHeader] = React.useState<boolean>(false);
  const prevCalendarOpened = usePrevious(props.calendarOpened);

  React.useEffect(() => {
    if (!prevCalendarOpened && props.calendarOpened) {
      lastFocus.current = document.activeElement;

      const newFocusableElements = getTrapElements(focusTrapElement);

      if (props.focusOnOpen) {
        setDayFocusable(true);
        setFocusableElements(newFocusableElements);
        context.setDateFocused(true);
      } else {
        setFocusableElements(newFocusableElements);
      }
    }

    if (props.calendarOpened && !props.focusOnOpen && !focusHeader) {
      setFocusHeader(true);
    }

    if (prevCalendarOpened && !props.calendarOpened) {
      setFocusHeader(false);
      setFocusableElements([]);
    }
  }, [props.calendarOpened, props.focusOnOpen]);

  function onCalendarTableFocus() {
    setDayFocusable(true);
  }

  function onCalendarTableBlur() {
    setDayFocusable(false);
    context.setDateFocused(false);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    const { keyCode, shiftKey } = event;

    if (shiftKey && keyCode === 9) {
      const index = getFocusedElementIndex(focusableElements, event.target);

      if (index === 0) {
        event.preventDefault();
        focusableElements[focusableElements.length - 1].focus();
      }
    } else if (keyCode === 9) {
      const index = getFocusedElementIndex(focusableElements, event.target);

      if (index === focusableElements.length - 1) {
        event.preventDefault();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    }
  }

  function turnOffDateFocused() {
    context.setDateFocused(false);
  }

  function openHelperInformation() {
    context.setShowHelperInformation(true);
  }

  function closeHelperInformation() {
    context.setShowHelperInformation(false);
  }

  const theme = React.useContext(ThemeContext);

  return (
    <CalendarContainer
      tabIndex={-1}
      theme={theme}
      onKeyDown={context.onKeyDown}
      ref={focusTrapElement}
    >
      <MonthContainer
        data-testid="monthContainer"
        data-visible="true"
        theme={theme}
        ref={focusTrapElement}
        onKeyDown={handleKeyDown}
      >
        <CalendarHeader focusHeader={focusHeader} />
        <Table
          role="presentation"
          onBlur={onCalendarTableBlur}
          onFocus={onCalendarTableFocus}
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
            {context.buildCalendarMonth(context.focusedDate).map((week, i) => (
              <tr key={i}>
                {week.map((day, dayOfWeek) => (
                  <CalendarDay
                    key={dayOfWeek}
                    day={day}
                    dayFocusable={dayFocusable}
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
            onClick={openHelperInformation}
            onFocus={turnOffDateFocused}
            type={ButtonType.button}
            variant={ButtonVariant.link}
          />
          <HelperInformation
            open={context.showHelperInformation}
            onClose={closeHelperInformation}
          />
        </HelperButton>
        <CloseButton>
          <Button
            aria-label="Close Calendar"
            color={ButtonColor.secondary}
            icon={<CrossIcon />}
            onClick={props.handleCloseButtonClick}
            size={ButtonSize.small}
            type={ButtonType.button}
            variant={ButtonVariant.link}
          />
        </CloseButton>
      </MonthContainer>
    </CalendarContainer>
  );
};
