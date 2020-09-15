import * as React from 'react';
import { CalendarContext } from './CalendarContext';
import { ArrowLeft2Icon, ArrowRight2Icon } from 'react-magma-icons';
import { ButtonType, ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { ThemeContext } from '../../theme/ThemeContext';
import { addMonths, subMonths } from 'date-fns';
import { enUS } from 'date-fns/locale';
import styled from '../../theme/styled';
import { usePrevious } from '../../utils';
import { i18nFormat as format } from './utils';
import { I18nContext } from '../../i18n';

interface CalendarHeaderProps {
  focusHeader?: boolean;
}

const CalendarHeaderContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 25px 0 10px;
`;

const CalendarIconButton = styled.div<{ next?: boolean }>`
  flex-grow: 0;
  flex-width: 25%;
  flex-basis: 25%;
  order: ${props => (props.next ? 2 : 0)};
`;

const CalendarHeaderText = styled.div`
  caption-side: initial;
  color: ${props => props.theme.colors.neutral01};
  font-size: 18px;
  order: 1;
  text-align: center;
  flex-grow: 0;
  flex-width: 75%;
  flex-basis: 75%;
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
    currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  return (
    <CalendarHeaderContainer>
      <CalendarHeaderText tabIndex={-1} theme={theme} ref={calendarHeader}>
        {capitalizeCurrentMonth}
      </CalendarHeaderText>
      <CalendarIconButton>
        <IconButton
          aria-label={`${i18n.datePicker.previousMonthAriaLabel} ${format(
            subMonths(new Date(focusedDate), 1),
            'MMMM yyyy',
            locale
          )}`}
          icon={<ArrowLeft2Icon />}
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
          icon={<ArrowRight2Icon />}
          type={ButtonType.button}
          variant={ButtonVariant.link}
          onClick={onNextMonthClick}
        />
      </CalendarIconButton>
    </CalendarHeaderContainer>
  );
};
