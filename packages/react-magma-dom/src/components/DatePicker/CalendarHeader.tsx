import * as React from 'react';

import styled from '@emotion/styled';
import { addMonths, subMonths, startOfMonth } from 'date-fns';
import { enUS } from 'date-fns/locale';
import {
  KeyboardArrowLeftIcon,
  KeyboardArrowRightIcon,
} from 'react-magma-icons';

import { CalendarContext } from './CalendarContext';
import { i18nFormat as format, getCurrentMonthAndYear } from './utils';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { ButtonColor, ButtonType, ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { MonthPicker } from './MonthPicker';
import { YearPicker } from './YearPicker';
import { Announce } from '../Announce';
import { VisuallyHidden } from '../VisuallyHidden';

interface CalendarHeaderProps {
  focusHeader?: boolean;
  isInverse?: boolean;
}

const CalendarHeaderContainer = styled.div`
  align-items: center;
  display: flex;
  padding: ${props => props.theme.spaceScale.spacing03} 0
    ${props => props.theme.spaceScale.spacing05};
  justify-content: space-between;
`;

const CalendarHeaderText = styled.div<{ isInverse?: boolean }>`
  caption-side: initial;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  font-size: ${props => props.theme.typeScale.size03.fontSize};
  line-height: ${props => props.theme.typeScale.size03.lineHeight};
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: 600;

  &:focus {
    outline: none;
  }
`;

const MonthYearWrapper = styled.div`
  display: flex;
  gap: ${props => props.theme.spaceScale.spacing01};
`;

const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export const CalendarHeader: React.FunctionComponent<
  CalendarHeaderProps
> = props => {
  const {
    focusedDate,
    onPrevMonthClick,
    onNextMonthClick,
    minDate,
    maxDate,
    setFocusedDate,
  } = React.useContext(CalendarContext);
  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);
  const locale = i18n.locale || enUS;
  const monthAndYear = getCurrentMonthAndYear(focusedDate, locale);
  const minDateOrDefault = minDate ?? new Date(1900, 0, 1);
  const maxDateOrDefault = maxDate ?? new Date(2099, 11, 31);
  const { isSafari } = useDeviceDetect();
  const previousMonthRef = React.useRef<HTMLButtonElement>();
  const nextMonthRef = React.useRef<HTMLButtonElement>();

  const isDateEarlierThanMinDate = (numberMonths: number) => {
    return (
      startOfMonth(subMonths(focusedDate, numberMonths)) <
      startOfMonth(minDateOrDefault)
    );
  };

  const isDateLaterThanMaxDate = (numberMonths: number) => {
    return (
      startOfMonth(addMonths(focusedDate, numberMonths)) >
      startOfMonth(maxDateOrDefault)
    );
  };

  const isDisabledPrevMonth = isDateEarlierThanMinDate(1);
  const isDisabledNextMonth = isDateLaterThanMaxDate(1);

  const onClickPrevMonth = () => {
    if (isDateEarlierThanMinDate(2)) {
      nextMonthRef.current?.focus();
    }

    if (startOfMonth(maxDateOrDefault) >= startOfMonth(focusedDate)) {
      onPrevMonthClick();
      return;
    }
    if (!isDisabledPrevMonth && isDisabledNextMonth) {
      setFocusedDate(maxDateOrDefault);
      return;
    }
    onPrevMonthClick();
  };

  const onClickNextMonth = () => {
    if (isDateLaterThanMaxDate(2)) {
      previousMonthRef.current?.focus();
    }

    if (startOfMonth(minDateOrDefault) <= startOfMonth(focusedDate)) {
      onNextMonthClick();
      return;
    }
    if (isDisabledPrevMonth && !isDisabledNextMonth) {
      setFocusedDate(minDateOrDefault);
      return;
    }
    onNextMonthClick();
  };

  return (
    <CalendarHeaderContainer theme={theme}>
      <CalendarHeaderText
        tabIndex={-1}
        theme={theme}
        isInverse={props.isInverse}
      >
        <MonthYearWrapper theme={theme}>
          <MonthPicker
            currentMonth={monthAndYear.month}
            isInverse={props.isInverse}
          />
          <YearPicker
            currentYear={Number(monthAndYear.year)}
            isInverse={props.isInverse}
          />
        </MonthYearWrapper>
        {!isSafari && (
          <VisuallyHidden>
            <Announce aria-atomic="true">
              {monthAndYear.month} {monthAndYear.year}
            </Announce>
          </VisuallyHidden>
        )}
      </CalendarHeaderText>
      <NavigationWrapper>
        <IconButton
          aria-label={`${i18n.datePicker.previousMonthAriaLabel} ${format(
            subMonths(new Date(focusedDate), 1),
            'MMMM yyyy',
            locale
          )}`}
          color={ButtonColor.subtle}
          disabled={isDisabledPrevMonth}
          icon={<KeyboardArrowLeftIcon />}
          type={ButtonType.button}
          variant={ButtonVariant.link}
          onClick={onClickPrevMonth}
          ref={previousMonthRef}
          style={{ marginRight: theme.spaceScale.spacing02 }}
        />
        <IconButton
          aria-label={`${i18n.datePicker.nextMonthAriaLabel} ${format(
            addMonths(new Date(focusedDate), 1),
            'MMMM yyyy',
            locale
          )}`}
          icon={<KeyboardArrowRightIcon />}
          color={ButtonColor.subtle}
          disabled={isDisabledNextMonth}
          type={ButtonType.button}
          variant={ButtonVariant.link}
          onClick={onClickNextMonth}
          ref={nextMonthRef}
          style={{ marginLeft: theme.spaceScale.spacing02 }}
        />
      </NavigationWrapper>
    </CalendarHeaderContainer>
  );
};
