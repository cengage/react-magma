import * as React from 'react';

import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { CloseIcon, KeyboardIcon } from 'react-magma-icons';

import { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { Tooltip } from '../Tooltip';
import { CalendarContext } from './CalendarContext';
import { CalendarDay } from './CalendarDay';
import { CalendarHeader } from './CalendarHeader';
import { HelperInformation } from './HelperInformation';
import { useFocusLock } from '../../hooks/useFocusLock';
import { I18nContext } from '../../i18n';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { usePrevious } from '../../utils';
import { Hyperlink } from '../Hyperlink';

interface CalendarMonthProps {
  calendarOpened?: boolean;
  focusOnOpen?: boolean;
  isInverse?: boolean;
  handleCloseButtonClick: (event: React.SyntheticEvent) => void;
  setDateFocused?: (value: boolean) => void;
  additionalContent?: React.ReactNode;
}

const CalendarContainer = styled.div<{ isInverse?: boolean }>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.primary500
      : props.theme.colors.neutral100};
  overflow: visible;

  &:focus {
    border-radius: ${props => props.theme.borderRadius};
  }
`;

const MonthContainer = styled.div<{ isInverse?: boolean }>`
  position: relative;
  background: ${props =>
    props.isInverse
      ? props.theme.colors.primary500
      : props.theme.colors.neutral100};
  font-family: ${props => props.theme.bodyFont};
  text-align: center;
  user-select: none;
  vertical-align: top;
  padding: 45px ${props => props.theme.spaceScale.spacing03}
    ${props => props.theme.spaceScale.spacing03};
`;

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
`;

const Th = styled.th<{ isInverse?: boolean }>`
  border: 0;
  color: ${props =>
    props.isInverse
      ? transparentize(0.3, props.theme.colors.neutral100)
      : props.theme.colors.neutral500};
  font-size: ${props => props.theme.typeScale.size01.fontSize};
  line-height: ${props => props.theme.typeScale.size01.lineHeight};
  padding: 0;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  padding-bottom: ${props => props.theme.spaceScale.spacing03};
`;

const HelperButton = styled.span<{ theme?: ThemeInterface }>`
  margin: ${props => props.theme.spaceScale.spacing02};
  top: -1px;
  position: absolute;
  left: 0;
  z-index: 2;
`;

const CloseButton = styled.span<{ theme?: ThemeInterface }>`
  position: absolute;
  right: 3px;
  top: 3px;
  z-index: 1;
`;

const HeaderWrapper = styled.div<{
  theme?: ThemeInterface;
  isInverse?: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  background: ${props =>
    props.isInverse
      ? props.theme.colors.primary600
      : props.theme.colors.neutral200};
  padding: 11px ${props => props.theme.spaceScale.spacing03};
  border-bottom: 1px solid
    ${props =>
      props.isInverse
        ? props.theme.colors.primary400
        : props.theme.colors.neutral300};
  width: 100%;
  height: 44px;
`;

const Divider = styled.span<{
  isInverse?: boolean;
  theme?: ThemeInterface;
}>`
  margin-right: ${props => props.theme.spaceScale.spacing04};
  width: ${props => props.theme.spaceScale.spacing02};
  height: ${props => props.theme.spaceScale.spacing02};
  border-radius: 50%;
  background: ${props =>
    props.isInverse
      ? props.theme.colors.neutral300
      : props.theme.colors.neutral400};
`;

const TodayWrapper = styled.div<{
  isInverse?: boolean;
  theme?: ThemeInterface;
}>`
  display: flex;
  align-items: center;
  margin-top: ${props => props.theme.spaceScale.spacing01};
  margin-left: ${props => props.theme.spaceScale.spacing09};
  font-size: ${props => props.theme.typeScale.size02.fontSize};
  line-height: ${props => props.theme.typeScale.size02.lineHeight};
  font-weight: 600;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.tertiary500
      : props.theme.colors.primary500};

  &:hover {
    color: ${props =>
      props.isInverse
        ? props.theme.colors.neutral100
        : props.theme.colors.primary600};
  }
`;

export const CalendarMonth: React.FunctionComponent<CalendarMonthProps> = (
  props: CalendarMonthProps
) => {
  const lastFocus = React.useRef<any>();
  const helperButtonRef = React.useRef<any>();
  const context = React.useContext(CalendarContext);
  const [dayFocusable, setDayFocusable] = React.useState<boolean>(false);
  const prevCalendarOpened = usePrevious(props.calendarOpened);
  const focusTrapElement = useFocusLock(props.calendarOpened);
  const monthContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!prevCalendarOpened && props.calendarOpened) {
      lastFocus.current = document.activeElement;

      if (props.focusOnOpen) {
        setDayFocusable(true);
        context.setDateFocused(true);
      }
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
    <Th
      key={index}
      theme={theme}
      isInverse={context.isInverse}
      aria-label={i18n.days.long[day]}
    >
      {i18n.days.short[day]}
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
            ref={monthContainerRef}
          >
            <CalendarHeader isInverse={context.isInverse} />

            <Table
              onBlur={onCalendarTableBlur}
              onFocus={onCalendarTableFocus}
              theme={theme}
              role="application"
            >
              <tbody>
                <tr>{tableDaysHeaders}</tr>
                {context
                  .buildCalendarMonth(context.focusedDate, true)
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
            {props.additionalContent && props.additionalContent}
            <HeaderWrapper theme={theme} isInverse={context.isInverse}>
              <Tooltip
                content={'Keyboard instructions'}
                tooltipStyle={{ position: 'fixed' }}
              >
                <HelperButton theme={theme}>
                  <IconButton
                    color={ButtonColor.subtle}
                    ref={helperButtonRef}
                    aria-label={i18n.datePicker.helpModal.helpButtonAriaLabel}
                    icon={<KeyboardIcon />}
                    onClick={context.showHelperInformation}
                    onFocus={turnOffDateFocused}
                    type={ButtonType.button}
                    variant={ButtonVariant.link}
                    style={{
                      color: context.isInverse
                        ? theme.colors.neutral100
                        : theme.colors.neutral900,
                    }}
                  />
                </HelperButton>
              </Tooltip>
              <TodayWrapper
                data-testid="todayWrapper"
                isInverse={context.isInverse}
                theme={theme}
                onClick={e => context.setFocusedTodayDate(e)}
                onKeyDown={e => context.setFocusedTodayDate(e)}
              >
                <Divider
                  data-testid="divider"
                  theme={theme}
                  isInverse={context.isInverse}
                />
                <Hyperlink
                  aria-label={i18n.datePicker.navigateToCurrentDateAriaLabel}
                  target="_self"
                  to="#"
                  hasUnderline={false}
                >
                  {i18n.datePicker.today}
                </Hyperlink>
              </TodayWrapper>
              <CloseButton theme={theme}>
                <IconButton
                  aria-label={i18n.datePicker.calendarCloseAriaLabel}
                  color={ButtonColor.subtle}
                  icon={<CloseIcon />}
                  onClick={props.handleCloseButtonClick}
                  size={ButtonSize.medium}
                  type={ButtonType.button}
                  variant={ButtonVariant.link}
                  style={{
                    color: context.isInverse
                      ? theme.colors.neutral100
                      : theme.colors.neutral900,
                  }}
                />
              </CloseButton>
            </HeaderWrapper>
          </MonthContainer>
        )}
      </CalendarContainer>
    </>
  );
};
