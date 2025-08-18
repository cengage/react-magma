import * as React from 'react';

import styled from '@emotion/styled';
import { addMonths, subMonths } from 'date-fns';
import { enUS } from 'date-fns/locale';
import {
  KeyboardArrowLeftIcon,
  KeyboardArrowRightIcon,
} from 'react-magma-icons';

import { Announce } from '../Announce';
import { CalendarContext } from './CalendarContext';
import { i18nFormat as format } from './utils';
import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { useForkedRef, usePrevious } from '../../utils';
import { ButtonColor, ButtonType, ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';

interface CalendarHeaderProps {
  focusHeader?: boolean;
  isInverse?: boolean;
}

const CalendarHeaderContainer = styled.div`
  align-items: center;
  display: flex;
  padding: ${props => props.theme.spaceScale.spacing03} 0
    ${props => props.theme.spaceScale.spacing03}
    ${props => props.theme.spaceScale.spacing03};
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
    outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
`;

const MonthYearWrapper = styled.span`
  display: inline-flex;
  gap: ${props => props.theme.spaceScale.spacing03};
`;

const NavigationWrapper = styled.span`
  display: flex;
  flex-direction: row;
`;

export const CalendarHeader = React.forwardRef<
  HTMLDivElement,
  CalendarHeaderProps
>((props, forwardedRef) => {
  const calendarHeader = React.useRef<HTMLDivElement>();
  const { focusedDate, onPrevMonthClick, onNextMonthClick } =
    React.useContext(CalendarContext);
  const prevFocusHeader = usePrevious(props.focusHeader);
  const ref = useForkedRef(forwardedRef, calendarHeader);

  React.useEffect(() => {
    if (!prevFocusHeader && props.focusHeader) {
      calendarHeader.current.focus();
    }
  }, [props.focusHeader]);

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const locale = i18n.locale || enUS;

  const currentMonth = format(focusedDate, 'MMMM yyyy', locale);

  const capitalizeCurrentMonth =
    currentMonth &&
    currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  const [month, year] = capitalizeCurrentMonth
    ? capitalizeCurrentMonth.split(' ')
    : ['', ''];

  return (
    <CalendarHeaderContainer theme={theme}>
      <CalendarHeaderText
        data-testid="calendar-header"
        tabIndex={-1}
        theme={theme}
        ref={ref}
        isInverse={props.isInverse}
      >
        <Announce>
          <MonthYearWrapper theme={theme}>
            <span>{month}</span>
            <span>{year}</span>
          </MonthYearWrapper>
        </Announce>
      </CalendarHeaderText>
      <NavigationWrapper>
        <IconButton
          aria-label={`${i18n.datePicker.previousMonthAriaLabel} ${format(
            subMonths(new Date(focusedDate), 1),
            'MMMM yyyy',
            locale
          )}`}
          color={ButtonColor.subtle}
          icon={<KeyboardArrowLeftIcon />}
          type={ButtonType.button}
          variant={ButtonVariant.link}
          onClick={onPrevMonthClick}
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
          type={ButtonType.button}
          variant={ButtonVariant.link}
          onClick={onNextMonthClick}
          style={{ marginLeft: theme.spaceScale.spacing02 }}
        />
      </NavigationWrapper>
    </CalendarHeaderContainer>
  );
});
