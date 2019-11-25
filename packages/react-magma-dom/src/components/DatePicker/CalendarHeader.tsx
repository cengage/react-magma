import * as React from 'react';
import { CalendarContext } from './CalendarContext';
import { ArrowLeft2Icon } from '../Icon/types/ArrowLeft2Icon';
import { ArrowRight2Icon } from '../Icon/types/ArrowRight2Icon';
import { Button, ButtonType, ButtonVariant } from '../Button';
import { ThemeContext } from '../../theme/ThemeContext';
import { format, addMonths, subMonths } from 'date-fns';
import styled from '@emotion/styled';

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
  color: ${props => props.theme.colors.neutral02};
  font-size: 18px;
  order: 1;
  text-align: center;
  flex-grow: 0;
  flex-width: 75%;
  flex-basis: 75%;
`;

export class CalendarHeader extends React.Component<CalendarHeaderProps> {
  private calendarHeader = React.createRef<any>();

  componentDidUpdate(prevProps) {
    if (!prevProps.focusHeader && this.props.focusHeader) {
      this.calendarHeader.current.focus();
    }
  }

  render() {
    return (
      <CalendarContext.Consumer>
        {context =>
          context && (
            <ThemeContext.Consumer>
              {theme => (
                <CalendarHeaderContainer>
                  <CalendarHeaderText
                    tabIndex={-1}
                    theme={theme}
                    ref={this.calendarHeader}
                  >
                    {format(context.focusedDate, 'MMMM YYYY')}
                  </CalendarHeaderText>
                  <CalendarIconButton>
                    <Button
                      aria-label={`Previous Month ${format(
                        subMonths(context.focusedDate, 1),
                        'MMMM YYYY'
                      )}`}
                      icon={<ArrowLeft2Icon />}
                      type={ButtonType.button}
                      variant={ButtonVariant.link}
                      onClick={context.onPrevMonthClick}
                    />
                  </CalendarIconButton>
                  <CalendarIconButton next>
                    <Button
                      aria-label={`Next Month ${format(
                        addMonths(context.focusedDate, 1),
                        'MMMM YYYY'
                      )}`}
                      icon={<ArrowRight2Icon />}
                      type={ButtonType.button}
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
  }
}
