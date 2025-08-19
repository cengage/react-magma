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
import { ButtonColor, ButtonType, ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { MonthPicker } from './MonthPicker';
import { YearPicker } from './YearPicker';

interface CalendarHeaderProps {
  focusHeader?: boolean;
  isInverse?: boolean;
  monthContainerHeight?: number;
}

const CalendarHeaderContainer = styled.div`
  align-items: center;
  display: flex;
  padding: ${props => props.theme.spaceScale.spacing03} 0
    ${props => props.theme.spaceScale.spacing03} 0;
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
  gap: ${props => props.theme.spaceScale.spacing03};
`;

const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export const CalendarHeader: React.FunctionComponent<
  CalendarHeaderProps
> = props => {
  const { focusedDate, onPrevMonthClick, onNextMonthClick } =
    React.useContext(CalendarContext);
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
        tabIndex={-1}
        theme={theme}
        isInverse={props.isInverse}
      >
        <Announce>
          <MonthYearWrapper theme={theme}>
            <MonthPicker
              currentMonth={month}
              isInverse={props.isInverse}
              monthContainerHeight={props.monthContainerHeight}
            />
            <YearPicker
              currentYear={Number(year)}
              isInverse={props.isInverse}
              monthContainerHeight={props.monthContainerHeight}
            />
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
};
