import * as React from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { AmPmToggle } from './AmPmToggle';
import { ClockIcon } from '../Icon/types/ClockIcon';
import { Input } from '../Input';
import { useGenerateId } from '../utils';

export interface TimePickerProps {
  errorMessage?: string;
  id?: string;
  isInverse?: boolean;
  labelText: string;
  helperMessage?: string;
}

const TimePickerContainer = styled.div<{ isInverse?: boolean }>`
  position: relative;

  &:focus-within {
    input[type='text'] {
      outline: 2px dotted
        ${props =>
          props.isInverse
            ? props.theme.colors.neutral08
            : props.theme.colors.focus};
      outline-offset: 2px;
    }
  }
`;

const InputsContainer = styled.div`
  bottom: 46px;
  left: 31px;
  position: absolute;
`;

const Divider = styled.span`
  display: inline-block;
  margin: 0 1px;
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

export const TimePicker: React.FunctionComponent<
  TimePickerProps
> = React.forwardRef((props: TimePickerProps, ref: any) => {
  const theme = React.useContext(ThemeContext);
  const { errorMessage, helperMessage, isInverse, labelText, ...other } = props;

  const id = useGenerateId(props.id);

  const hourId = `${id}__hour`;
  const minuteId = `${id}__minute`;
  const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;

  return (
    <TimePickerContainer isInverse={isInverse} theme={theme}>
      <Input
        {...other}
        errorMessage={errorMessage}
        helperMessage={helperMessage}
        icon={<ClockIcon />}
        isInverse={isInverse}
        labelText={labelText}
        inputStyle={{
          background: `${theme.colors.neutral08}`,
          borderColor: `${
            errorMessage
              ? theme.colors.danger
              : isInverse
              ? theme.colors.neutral08
              : theme.colors.neutral04
          }`,
          cursor: 'default',
          width: '125px'
        }}
      />
      <InputsContainer>
        <StyledNumInput
          aria-label="Hours"
          aria-describedby={descriptionId}
          id={hourId}
          maxLength={2}
          max="12"
          min="1"
          placeholder="--"
          theme={theme}
          type="number"
        />
        <Divider> : </Divider>
        <StyledNumInput
          aria-label="Minutes"
          id={minuteId}
          maxLength={2}
          max="59"
          min="0"
          placeholder="--"
          theme={theme}
          type="number"
        />
        <AmPmToggle>AM</AmPmToggle>
      </InputsContainer>
    </TimePickerContainer>
  );
});
