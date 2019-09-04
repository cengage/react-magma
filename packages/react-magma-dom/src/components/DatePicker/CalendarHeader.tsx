import * as React from 'react';
import { CalendarContext } from './CalendarContext';
import { ArrowLeft2Icon } from '../Icon/types/ArrowLeft2Icon';
import { ArrowRight2Icon } from '../Icon/types/ArrowRight2Icon';
import { Button, ButtonVariant } from '../Button';
import { ThemeContext } from '../../theme/ThemeContext';
import { format, addMonths, subMonths } from 'date-fns';
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
  color: ${props => props.theme.colors.neutral02};
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
        <ThemeContext.Consumer>
          {theme => (
            <CalendarHeaderContainer>
              <CalendarIconButton>
                <Button
                  aria-label={`Previous Month ${format(
                    subMonths(context.focusedDate, 1),
                    'MMMM YYYY'
                  )}`}
                  icon={<ArrowLeft2Icon />}
                  variant={ButtonVariant.link}
                  onClick={context.onPrevMonthClick}
                />
              </CalendarIconButton>
              <CalendarHeaderText theme={theme}>
                {format(context.focusedDate, 'MMMM YYYY')}
              </CalendarHeaderText>
              <CalendarIconButton>
                <Button
                  aria-label={`Next Month ${format(
                    addMonths(context.focusedDate, 1),
                    'MMMM YYYY'
                  )}`}
                  icon={<ArrowRight2Icon />}
                  variant={ButtonVariant.link}
                  onClick={context.onNextMonthClick}
                />
              </CalendarIconButton>
            </CalendarHeaderContainer>
          )}
        </ThemeContext.Consumer>
      )
    }
  </CalendarContext.Consumer>
);
