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
  value?: string;
  onChange?: (value: string) => void;
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
  background: ${props => props.theme.colors.neutral08};
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
    background: ${props => props.theme.colors.foundation02};
    color: ${props => props.theme.colors.neutral08};
  }
`;

export const TimePicker: React.FunctionComponent<TimePickerProps> = (
  props: TimePickerProps
) => {
  const theme = React.useContext(ThemeContext);
  const {
    errorMessage,
    helperMessage,
    isInverse,
    labelText,
    onChange,
    ...other
  } = props;

  const [hour, setHour] = React.useState<string>('');
  const [minute, setMinute] = React.useState<string>('');
  const [amPm, setAmPm] = React.useState<'AM' | 'PM'>('AM');
  const [time, setTime] = React.useState<string>('');
  const hourRef = React.useRef<HTMLInputElement>();
  const minuteRef = React.useRef<HTMLInputElement>();
  const amPmRef = React.useRef<HTMLButtonElement>();
  const id = useGenerateId(props.id);

  React.useEffect(() => {
    if (validTime(props.value)) {
      convertPassedInTime(props.value);
    }
  }, [props.value]);

  const hourId = `${id}__hour`;
  const minuteId = `${id}__minute`;
  const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;

  function updateTime(newTime: string) {
    setTime(newTime);
    onChange && typeof onChange === 'function' && onChange(newTime);
  }

  function validTime(passedInTime: string) {
    return /^([01]?[0-9]|2[0-3]):[0-5][0-9]( [AaPp][Mm])?$/.test(passedInTime);
  }

  function convertPassedInTime(passedInTime: string) {
    const [timeHour, timeMinuteAndAmPm] = passedInTime.split(':');
    const timeMinute = timeMinuteAndAmPm.substring(0, 2);

    const timeAmPm =
      Number(timeHour) > 12
        ? 'PM'
        : timeMinuteAndAmPm.length > 2
        ? (timeMinuteAndAmPm.split(' ')[1].toUpperCase() as 'AM' | 'PM')
        : 'AM';

    setHour(calculateHour(Number(timeHour)));
    setMinute(timeMinute);
    setAmPm(timeAmPm);
    updateTime(`${timeHour}:${timeMinute} ${timeAmPm}`);
  }

  function calculateHour(newHour: number): string {
    if (newHour >= 13 && newHour <= 23) {
      newHour = newHour - 12;
      setAmPm('PM');
    } else {
      setAmPm('AM');
    }

    if (newHour < 10) {
      return `0${newHour}`;
    } else if (newHour >= 24) {
      return `0${newHour.toString().substring(0, 1)}`;
    }

    return newHour.toString();
  }

  function calculateMinute(newMinute: number): string {
    if (newMinute === 0) {
      return `00`;
    } else if (newMinute < 10) {
      return `0${newMinute}`;
    } else if (newMinute > 59) {
      return `0${newMinute.toString().substring(0, 1)}`;
    }

    return newMinute.toString();
  }

  function handleHourChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newHour = calculateHour(Number(event.target.value));

    setHour(newHour);
    updateTime(`${newHour}:${minute} ${amPm}`);
  }

  function handleMinuteChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newMinute = calculateMinute(Number(event.target.value));

    setMinute(newMinute);
    updateTime(`${hour}:${newMinute} ${amPm}`);
  }

  function toggleAmPm() {
    const newAmPm = amPm === 'AM' ? 'PM' : 'AM';

    setAmPm(newAmPm);
    updateTime(`${hour}:${minute} ${newAmPm}`);
  }

  function handleHourKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Backspace') {
      setHour('00');
    }

    if (event.key === 'ArrowRight') {
      minuteRef.current.focus();
    }
  }

  function handleMinuteKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Backspace') {
      setMinute('00');
    }

    if (event.key === 'ArrowLeft') {
      hourRef.current.focus();
    }

    if (event.key === 'ArrowRight') {
      amPmRef.current.focus();
    }
  }

  function handleAmPmKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      minuteRef.current.focus();
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      toggleAmPm();
    }
  }

  return (
    <TimePickerContainer isInverse={isInverse} theme={theme}>
      <Input
        {...other}
        disabled
        errorMessage={errorMessage}
        helperMessage={helperMessage}
        icon={<ClockIcon />}
        isInverse={isInverse}
        id={id}
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
        value={time}
      />
      <InputsContainer theme={theme}>
        <StyledNumInput
          aria-label="Hours"
          aria-describedby={descriptionId}
          data-testid="hoursTimeInput"
          id={hourId}
          maxLength={2}
          max="12"
          min="1"
          onChange={handleHourChange}
          onKeyDown={handleHourKeyDown}
          placeholder="--"
          ref={hourRef}
          theme={theme}
          type="number"
          value={hour}
        />
        <Divider> : </Divider>
        <StyledNumInput
          aria-label="Minutes"
          data-testid="minutesTimeInput"
          id={minuteId}
          maxLength={2}
          max="59"
          min="0"
          onChange={handleMinuteChange}
          onKeyDown={handleMinuteKeyDown}
          placeholder="--"
          ref={minuteRef}
          theme={theme}
          type="number"
          value={minute}
        />
        <AmPmToggle
          ref={amPmRef}
          onClick={toggleAmPm}
          onKeyDown={handleAmPmKeyDown}
        >
          {amPm}
        </AmPmToggle>
      </InputsContainer>
    </TimePickerContainer>
  );
};
