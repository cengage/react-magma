import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { Input } from '../Input';
import { Clock2Icon } from '../Icon/types/Clock2Icon';

export interface TimePickerProps {
  id?: string;
  inverse?: boolean;
  labelText: string;
}

const TimePickerContainer = styled.div<{ inverse?: boolean }>`
  position: relative;

  &:focus-within {
    input[type='text'] {
      outline: 2px dotted
        ${props =>
          props.inverse
            ? props.theme.colors.neutral08
            : props.theme.colors.pop02};
      outline-offset: 2px;
    }
  }
`;

const InputsContainer = styled.div`
  bottom: 46px;
  left: 29px;
  position: absolute;
`;

const Divider = styled.span`
  position: relative;
  top: -1px;
`;

const StyledNumInput = styled.input`
  border: 0;
  border-radius: 3px;
  padding: 0 3px;
  text-align: right;
  width: 23px;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  -moz-appearance: textfield;

  &:focus {
    outline: 0;
    background: ${props => props.theme.colors.foundation01};
    color: ${props => props.theme.colors.neutral08};
  }
`;

const AmPmToggle = styled.button`
  background: none;
  border: 0;
  border-radius: 3px;
  margin-left: 3px;
  padding: 0 3px;

  &:focus {
    outline: 0;
    background: ${props => props.theme.colors.foundation01};
    color: ${props => props.theme.colors.neutral08};
  }
`;

function renderTimePicker(props) {
  const { id, inverse, labelText } = props;

  return (
    <ThemeContext.Consumer>
      {theme => (
        <TimePickerContainer id={id} inverse={inverse} theme={theme}>
          <Input
            disabled
            icon={<Clock2Icon />}
            inverse={inverse}
            labelText={labelText}
            inputStyle={{
              background: `${theme.colors.neutral08}`,
              borderColor: `${theme.colors.neutral04}`,
              width: '125px'
            }}
          />
          <InputsContainer>
            <StyledNumInput
              maxLength={2}
              max="12"
              min="1"
              placeholder="--"
              theme={theme}
              type="number"
            />
            <Divider> : </Divider>
            <StyledNumInput
              maxLength={2}
              max="59"
              min="0"
              placeholder="--"
              theme={theme}
              type="number"
            />
            <AmPmToggle theme={theme}>AM</AmPmToggle>
          </InputsContainer>
        </TimePickerContainer>
      )}
    </ThemeContext.Consumer>
  );
}

export const TimePicker: React.FunctionComponent<TimePickerProps> = (
  props: TimePickerProps
) => renderTimePicker(props);
