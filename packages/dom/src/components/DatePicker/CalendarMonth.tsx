import * as React from 'react';
import { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { CloseIcon, HelpOutlineIcon } from 'react-magma-icons';
import { CalendarContext } from './CalendarContext';
import { CalendarHeader } from './CalendarHeader';
import { CalendarDay } from './CalendarDay';
import styled from '@emotion/styled';
import { HelperInformation } from './HelperInformation';
import { usePrevious } from '../../utils';
import { I18nContext } from '../../i18n';
import { useFocusLock } from '../../hooks/useFocusLock';

interface CalendarMonthProps {
  calendarOpened?: boolean;
  focusOnOpen?: boolean;
  handleCloseButtonClick: (event: React.SyntheticEvent) => void;
  setDateFocused?: (value: boolean) => void;
}

const CalendarContainer = styled.div`
  background: var(--colors-neutral08);
  padding: 0 var(--spaceScale-spacing05) var(--spaceScale-spacing03);
`;

const MonthContainer = styled.div`
  background: var(--colors-neutral08);
  text-align: center;
  user-select: none;
  vertical-align: top;
`;

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: var(--spaceScale-spacing09);
`;

const Th = styled.th`
  border: 0;
  color: var(--colors-neutral);
  font-size: var(--typeScale-size02-fontSize);
  line-height: var(--typeScale-size02-lineHeight);
  font-weight: normal;
  padding: 0;
  text-align: center;
`;

const HelperButton = styled.span`
  bottom: var(--spaceScale-spacing01);
  position: absolute;
  right: var(--spaceScale-spacing01);
  z-index: 2;
`;

const CloseButton = styled.span`
  position: absolute;
  right: var(--spaceScale-spacing01);
  top: var(--spaceScale-spacing01);
  z-index: 1;
`;

export const CalendarMonth: React.FunctionComponent<CalendarMonthProps> = (
  props: CalendarMonthProps
) => {
  const lastFocus = React.useRef<any>();
  const headingRef = React.useRef<any>();
  const context = React.useContext(CalendarContext);
  const [dayFocusable, setDayFocusable] = React.useState<boolean>(false);
  const [focusHeader, setFocusHeader] = React.useState<boolean>(false);
  const prevCalendarOpened = usePrevious(props.calendarOpened);

  const focusTrapElement = useFocusLock(props.calendarOpened, headingRef);

  React.useEffect(() => {
    if (!prevCalendarOpened && props.calendarOpened) {
      lastFocus.current = document.activeElement;

      if (props.focusOnOpen) {
        setDayFocusable(true);
        context.setDateFocused(true);
      }
    }

    if (props.calendarOpened && !props.focusOnOpen && !focusHeader) {
      setFocusHeader(true);
    }

    if (prevCalendarOpened && !props.calendarOpened) {
      setFocusHeader(false);
    }
  }, [props.calendarOpened, props.focusOnOpen]);

  function onCalendarTableFocus() {
    setDayFocusable(true);
  }

  function onCalendarTableBlur() {
    setDayFocusable(false);
    context.setDateFocused(false);
  }

  function turnOffDateFocused() {
    context.setDateFocused(false);
  }

  const i18n = React.useContext(I18nContext);

  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  const startOfWeek = days.indexOf(i18n.datePicker.startOfWeek);
  const sortedDays = days.slice(startOfWeek).concat(days.slice(0, startOfWeek));
  const tableDaysHeaders = sortedDays.map((day, index) => (
    <Th key={index}>{i18n.days.min[day]}</Th>
  ));

  return (
    <CalendarContainer
      data-testid="calendarMonthContainer"
      tabIndex={-1}
      onKeyDown={context.onKeyDown}
    >
      <MonthContainer
        data-testid="monthContainer"
        data-visible="true"
        ref={focusTrapElement}
      >
        <CalendarHeader ref={headingRef} focusHeader={focusHeader} />
        <Table
          role="presentation"
          onBlur={onCalendarTableBlur}
          onFocus={onCalendarTableFocus}
        >
          <tbody>
            <tr>{tableDaysHeaders}</tr>
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
          <IconButton
            aria-label={i18n.datePicker.helpModal.helpButtonAriaLabel}
            icon={<HelpOutlineIcon />}
            onClick={context.showHelperInformation}
            size={ButtonSize.small}
            onFocus={turnOffDateFocused}
            type={ButtonType.button}
            variant={ButtonVariant.link}
          />
          <HelperInformation
            isOpen={context.helperInformationShown}
            onClose={context.hideHelperInformation}
          />
        </HelperButton>
        <CloseButton>
          <IconButton
            aria-label={i18n.datePicker.calendarCloseAriaLabel}
            color={ButtonColor.secondary}
            icon={<CloseIcon />}
            onClick={props.handleCloseButtonClick}
            size={ButtonSize.medium}
            type={ButtonType.button}
            variant={ButtonVariant.link}
          />
        </CloseButton>
      </MonthContainer>
    </CalendarContainer>
  );
};
