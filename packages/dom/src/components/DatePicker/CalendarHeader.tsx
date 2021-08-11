import * as React from 'react';
import { Announce } from '../Announce';
import { CalendarContext } from './CalendarContext';
import { ArrowBackIcon, ArrowForwardIcon } from 'react-magma-icons';
import { ButtonType, ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { ThemeContext } from '../../theme/ThemeContext';
import { addMonths, subMonths } from 'date-fns';
import { enUS } from 'date-fns/locale';
import styled from '@emotion/styled';
import { usePrevious } from '../../utils';
import { i18nFormat as format } from './utils';
import { I18nContext } from '../../i18n';

interface CalendarHeaderProps {
  focusHeader?: boolean;
}

const CalendarHeaderContainer = styled.div`
  align-items: center;
  display: flex;
  padding: ${props => props.theme.spaceScale.spacing10} 0
    ${props => props.theme.spaceScale.spacing03};
  margin-top: -${props => props.theme.spaceScale.spacing01};
`;

const CalendarIconButton = styled.div<{ next?: boolean }>`
  flex-grow: 0;
  flex-width: 10%;
  flex-basis: 10%;
  order: ${props => (props.next ? 2 : 0)};
`;

const CalendarHeaderText = styled.div`
  caption-side: initial;
  color: ${props => props.theme.colors.neutral};
  font-size: ${props => props.theme.typeScale.size03.fontSize};
  line-height: ${props => props.theme.typeScale.size03.lineHeight};
  order: 1;
  text-align: center;
  flex-grow: 0;
  flex-width: 90%;
  flex-basis: 90%;
`;

export const CalendarHeader: React.FunctionComponent<CalendarHeaderProps> = (
  props: CalendarHeaderProps
) => {
  const calendarHeader = React.useRef<HTMLDivElement>();
  const { focusedDate, onPrevMonthClick, onNextMonthClick } = React.useContext(
    CalendarContext
  );
  const prevFocusHeader = usePrevious(props.focusHeader);

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

  return (
    <CalendarHeaderContainer theme={theme}>
      <CalendarHeaderText tabIndex={-1} theme={theme} ref={calendarHeader}>
        <Announce>{capitalizeCurrentMonth}</Announce>
      </CalendarHeaderText>
      <CalendarIconButton>
        <IconButton
          aria-label={`${i18n.datePicker.previousMonthAriaLabel} ${format(
            subMonths(new Date(focusedDate), 1),
            'MMMM yyyy',
            locale
          )}`}
          icon={<ArrowBackIcon />}
          type={ButtonType.button}
          variant={ButtonVariant.link}
          onClick={onPrevMonthClick}
        />
      </CalendarIconButton>
      <CalendarIconButton next>
        <IconButton
          aria-label={`${i18n.datePicker.nextMonthAriaLabel} ${format(
            addMonths(new Date(focusedDate), 1),
            'MMMM yyyy',
            locale
          )}`}
          icon={<ArrowForwardIcon />}
          type={ButtonType.button}
          variant={ButtonVariant.link}
          onClick={onNextMonthClick}
        />
      </CalendarIconButton>
    </CalendarHeaderContainer>
  );
};
