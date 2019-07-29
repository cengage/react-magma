import * as React from 'react';
import { CalendarContext } from './CalendarContext';
import { ArrowLeft2Icon } from '../Icon/types/ArrowLeft2Icon';
import { ArrowRight2Icon } from '../Icon/types/ArrowRight2Icon';
import { Button, ButtonVariant } from '../Button';
import { magma } from '../../theme/magma';
import { format } from 'date-fns';
import styled from '@emotion/styled';

const CalendarHeaderContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 5px 0 10px;
`;

const CalendarIconButton = styled.div`
  flex-grow: 0;
  flex-width: 25%;
  flex-basis: 25%;
`;

const CalendarHeaderText = styled.div`
  caption-side: initial;
  color: ${magma.colors.neutral02};
  font-size: 18px;
  text-align: center;
  flex-grow: 0;
  flex-width: 75%;
  flex-basis: 75%;
`;

export const CalendarHeader: React.FunctionComponent<{}> = () => (
  <CalendarContext.Consumer>
    {context =>
      context && (
        <CalendarHeaderContainer>
          <CalendarIconButton>
            <Button
              aria-label="Previous Month"
              icon={<ArrowLeft2Icon />}
              variant={ButtonVariant.link}
              onClick={context.onPrevMonthClick}
            />
          </CalendarIconButton>
          <CalendarHeaderText>
            {format(context.focusedDate, 'MMMM YYYY')}
          </CalendarHeaderText>
          <CalendarIconButton>
            <Button
              aria-label="Next Month"
              icon={<ArrowRight2Icon />}
              variant={ButtonVariant.link}
              onClick={context.onNextMonthClick}
            />
          </CalendarIconButton>
        </CalendarHeaderContainer>
      )
    }
  </CalendarContext.Consumer>
);
