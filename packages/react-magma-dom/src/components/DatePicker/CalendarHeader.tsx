import * as React from 'react';
import { CalendarContext } from './CalendarContext';
import { ArrowLeft2Icon } from '../Icon/types/ArrowLeft2Icon';
import { ArrowRight2Icon } from '../Icon/types/ArrowRight2Icon';
import { ButtonType, ButtonVariant } from '../Button';
import { IconButton } from '../IconButton';
import { ThemeContext } from '../../theme/ThemeContext';
import { format, addMonths, subMonths } from 'date-fns';
import styled from '../../theme/styled';
import { usePrevious } from '../utils';

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

  return (
    <CalendarHeaderContainer>
      <CalendarHeaderText tabIndex={-1} theme={theme} ref={calendarHeader}>
        {format(focusedDate, 'MMMM YYYY')}
      </CalendarHeaderText>
      <CalendarIconButton>
        <IconButton
          aria-label={`Previous Month ${format(
            subMonths(focusedDate, 1),
            'MMMM YYYY'
          )}`}
          icon={<ArrowLeft2Icon />}
          type={ButtonType.button}
          variant={ButtonVariant.link}
          onClick={onPrevMonthClick}
        />
      </CalendarIconButton>
      <CalendarIconButton next>
        <IconButton
          aria-label={`Next Month ${format(
            addMonths(focusedDate, 1),
            'MMMM YYYY'
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
