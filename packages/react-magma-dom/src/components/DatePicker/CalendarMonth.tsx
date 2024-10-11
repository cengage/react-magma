import * as React from 'react';
import { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { Tooltip } from '../Tooltip';
import { CloseIcon, KeyboardIcon } from 'react-magma-icons';
import { CalendarContext } from './CalendarContext';
import { CalendarHeader } from './CalendarHeader';
import { CalendarDay } from './CalendarDay';
import { ThemeContext } from '../../theme/ThemeContext';
import { HelperInformation } from './HelperInformation';
import { usePrevious } from '../../utils';
import { I18nContext } from '../../i18n';
import { useFocusLock } from '../../hooks/useFocusLock';
import styled from '@emotion/styled';

interface CalendarMonthProps {
  calendarOpened?: boolean;
  focusOnOpen?: boolean;
  isInverse?: boolean;
  handleCloseButtonClick: (event: React.SyntheticEvent) => void;
  setDateFocused?: (value: boolean) => void;
}

const CalendarContainer = styled.div<{ isInverse?: boolean }>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.primary500
      : props.theme.colors.neutral100};
  padding: 0 ${props => props.theme.spaceScale.spacing05}
    ${props => props.theme.spaceScale.spacing03};
  overflow: visible;
`;

const MonthContainer = styled.div<{ isInverse?: boolean }>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.primary500
      : props.theme.colors.neutral100};
  font-family: ${props => props.theme.bodyFont};
  text-align: center;
  user-select: none;
  vertical-align: top;
`;

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: ${props => props.theme.spaceScale.spacing03};
`;

const Th = styled.th<{ isInverse?: boolean }>`
  border: 0;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  line-height: ${props => props.theme.typeScale.size02.lineHeight};
  font-weight: normal;
  padding: 0;
  text-align: center;
`;

const HelperButton = styled.span<{ theme?: any }>`
  margin: ${props => props.theme.spaceScale.spacing02};
  top: ${props => props.theme.spaceScale.spacing01};
  position: absolute;
  left: ${props => props.theme.spaceScale.spacing01};
  z-index: 2;
`;

const CloseButton = styled.span<{ theme?: any }>`
  position: absolute;
  right: ${props => props.theme.spaceScale.spacing01};
  top: ${props => props.theme.spaceScale.spacing01};
  z-index: 1;
  margin: ${props => props.theme.spaceScale.spacing02};
`;

export const CalendarMonth: React.FunctionComponent<CalendarMonthProps> = (
  props: CalendarMonthProps
) => {
  const lastFocus = React.useRef<any>();
  const headingRef = React.useRef<any>();
  const helperButtonRef = React.useRef<any>();
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

  React.useEffect(() => {
    if (prevCalendarOpened && !context.helperInformationShown) {
      helperButtonRef.current.focus();
    }
  }, [context.helperInformationShown]);

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

  const theme = React.useContext(ThemeContext);
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
    <Th key={index} theme={theme} isInverse={context.isInverse}>
      {i18n.days.min[day]}
    </Th>
  ));

  return (
    <>
      <CalendarContainer
        data-testid="calendarMonthContainer"
        tabIndex={-1}
        theme={theme}
        onKeyDown={context.onKeyDown}
        isInverse={context.isInverse}
        ref={focusTrapElement}
      >
        {context.helperInformationShown ? (
          <HelperInformation
            isOpen={context.helperInformationShown}
            isInverse={context.isInverse}
            onReturnBack={context.hideHelperInformation}
            onClose={context.onClose}
          />
        ) : (
          <MonthContainer
            data-testid="monthContainer"
            data-visible="true"
            isInverse={context.isInverse}
            theme={theme}
          >
            <CalendarHeader
              ref={headingRef}
              focusHeader={focusHeader}
              isInverse={context.isInverse}
            />

            <Table
              onBlur={onCalendarTableBlur}
              onFocus={onCalendarTableFocus}
              theme={theme}
            >
              <tbody>
                <tr>{tableDaysHeaders}</tr>
                {context
                  .buildCalendarMonth(context.focusedDate)
                  .map((week, i) => (
                    <tr key={i}>
                      {week.map((day, dayOfWeek) => (
                        <CalendarDay
                          key={dayOfWeek}
                          isInverse={context.isInverse}
                          day={day}
                          dayFocusable={dayFocusable}
                          onDateChange={context.onDateChange}
                        />
                      ))}
                    </tr>
                  ))}
              </tbody>
            </Table>
            <Tooltip
              content={'Keyboard instructions'}
              tooltipStyle={{ position: 'fixed' }}
            >
              <HelperButton theme={theme}>
                <IconButton
                  ref={helperButtonRef}
                  aria-label={i18n.datePicker.helpModal.helpButtonAriaLabel}
                  icon={<KeyboardIcon />}
                  onClick={context.showHelperInformation}
                  size={ButtonSize.small}
                  onFocus={turnOffDateFocused}
                  type={ButtonType.button}
                  variant={ButtonVariant.link}
                />
              </HelperButton>
            </Tooltip>

            <CloseButton theme={theme}>
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
        )}
      </CalendarContainer>
    </>
  );
};
