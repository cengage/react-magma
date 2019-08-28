import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { Input } from '../Input';
import { Clock2Icon } from '../Icon/types/Clock2Icon';

export interface TimePickerProps {
  id?: string;
  labelText: string;
}

const TimePickerContainer = styled.div``;

function renderTimePicker(props) {
  const { id, labelText } = props;

  return (
    <ThemeContext.Consumer>
      {theme => (
        <TimePickerContainer id={id}>
          <Input icon={<Clock2Icon />} labelText={labelText} />
        </TimePickerContainer>
      )}
    </ThemeContext.Consumer>
  );
}

export const TimePicker: React.FunctionComponent<TimePickerProps> = (
  props: TimePickerProps
) => renderTimePicker(props);
