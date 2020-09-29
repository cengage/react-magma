import * as React from 'react';
import styled from '@emotion/styled';
import { Announce } from '../Announce';
import { ThemeContext } from '../../theme/ThemeContext';
import { AmPmToggle } from './AmPmToggle';
import { ClockIcon } from 'react-magma-icons';
import { Input } from '../Input';
import { useGenerateId } from '../../utils';
import { I18nContext } from '../../i18n';
import { enUS } from 'date-fns/locale';
import { ThemeInterface } from '../../theme/magma';
import { VisuallyHidden } from '../VisuallyHidden';

export interface TimePickerProps {
  containerStyle?: React.CSSProperties;
  errorMessage?: React.ReactNode;
  id?: string;
  inputStyle?: React.CSSProperties;
  isInverse?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: React.ReactNode;
  helperMessage?: React.ReactNode;
  messageStyle?: React.CSSProperties;
  minutesStep?: number;
  value?: string;
  onChange?: (value: string) => void;
}

const TimePickerContainer = styled.div<{
  containerStyle?: React.CSSProperties;
  isInverse?: boolean;
  theme: ThemeInterface;
}>`
  position: relative;

  &:focus-within {
    input[type='text'] {
      outline: 2px dotted
        ${props =>
          props.isInverse
            ? props.theme.colors.focusInverse
            : props.theme.colors.focus};
      outline-offset: 4px;
    }
  }
`;

const StyledFieldset = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
`;

const StyledLegend = styled.legend<{
  isInverse?: boolean;
  labelStyle?: React.CSSProperties;
  theme: ThemeInterface;
}>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral08
      : props.theme.colors.neutral01};
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 5px;
  max-width: 100%;
  text-align: left;
`;

const InputsContainer = styled.div<{ theme: ThemeInterface }>`
  background: ${props => props.theme.colors.neutral08};
  left: 31px;
  position: absolute;
  top: 5px;
`;

const Divider = styled.span`
  display: inline-block;
  margin: 0 1px;
  position: relative;
  top: -1px;
`;

const StyledNumInput = styled.input<{ theme: ThemeInterface }>`
  border: 0;
  border-radius: 3px;
  padding: 0 2px;
  text-align: right;
  width: 28px;

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
  const i18n = React.useContext(I18nContext);
  const {
    containerStyle,
    errorMessage,
    helperMessage,
    inputStyle,
    isInverse,
    labelStyle,
    labelText,
    minutesStep,
    onChange,
    ...other
  } = props;

  const locale = i18n.locale || enUS;
  const am = locale.localize.dayPeriod('am', { width: 'abbreviated' });
  const pm = locale.localize.dayPeriod('pm', { width: 'abbreviated' });

  const [hour, setHour] = React.useState<string>('');
  const [minute, setMinute] = React.useState<string>('');
  const [amPm, setAmPm] = React.useState<string>(am);
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
    const amPmRegex = `${am}|${am.toLowerCase()}|${pm}|${pm.toLowerCase()}`;
    const timeRegex = new RegExp(
      `^([01]?[0-9]|2[0-3]):[0-5][0-9]( (${amPmRegex}))?$`,
      'g'
    );
    return timeRegex.test(passedInTime);
  }

  function convertPassedInTime(passedInTime: string) {
    const [timeHour, timeMinuteAndAmPm] = passedInTime.split(':');
    const timeMinute = timeMinuteAndAmPm.substring(0, 2);

    const timeAmPm =
      Number(timeHour) > 12
        ? pm
        : timeMinuteAndAmPm.length > 2
        ? timeMinuteAndAmPm.split(' ')[1].toUpperCase()
        : am;

    setHour(calculateHour(Number(timeHour)));
    setMinute(timeMinute);
    setAmPm(timeAmPm);
    updateTime(`${timeHour}:${timeMinute} ${timeAmPm}`);
  }

  function calculateHour(newHour: number): string {
    if (newHour >= 13 && newHour <= 23) {
      newHour = newHour - 12;
      setAmPm(pm);
    } else {
      setAmPm(am);
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
    const newAmPm = amPm === am ? pm : am;

    setAmPm(newAmPm);
    updateTime(`${hour}:${minute} ${newAmPm}`);
  }

  function handleHourKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Backspace') {
      setHour('--');
    }

    if (event.key === 'ArrowRight') {
      minuteRef.current.focus();
    }
  }

  function handleMinuteKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Backspace') {
      setMinute('--');
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

    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      ((event.key === 'A' || event.key === 'a') && amPm === pm) ||
      ((event.key === 'P' || event.key === 'p') && amPm === am)
    ) {
      event.preventDefault();
      toggleAmPm();
    }
  }

  return (
    <TimePickerContainer
      isInverse={isInverse}
      style={containerStyle}
      theme={theme}
    >
      <StyledFieldset>
        <StyledLegend
          isInverse={isInverse}
          labelStyle={labelStyle}
          theme={theme}
        >
          {labelText}
        </StyledLegend>
        <Input
          {...other}
          disabled
          errorMessage={errorMessage}
          helperMessage={helperMessage}
          icon={<ClockIcon />}
          isInverse={isInverse}
          id={id}
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
            width: '134px',
            ...inputStyle
          }}
          value={time}
        >
          <InputsContainer theme={theme}>
            <StyledNumInput
              aria-label={i18n.timePicker.hoursAriaLabel}
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
              aria-label={i18n.timePicker.minutesAriaLabel}
              data-testid="minutesTimeInput"
              id={minuteId}
              maxLength={2}
              max="59"
              min="0"
              onChange={handleMinuteChange}
              onKeyDown={handleMinuteKeyDown}
              placeholder="--"
              ref={minuteRef}
              step={minutesStep || 1}
              theme={theme}
              type="number"
              value={minute}
            />
            <AmPmToggle
              aria-label={
                amPm === am
                  ? i18n.timePicker.amButtonAriaLabel
                  : i18n.timePicker.pmButtonAriaLabel
              }
              ref={amPmRef}
              onClick={toggleAmPm}
              onKeyDown={handleAmPmKeyDown}
            >
              {amPm}
            </AmPmToggle>

            <VisuallyHidden>
              <Announce>
                {amPm === am
                  ? i18n.timePicker.amSelectedAnnounce
                  : i18n.timePicker.pmSelectedAnnounce}
              </Announce>
            </VisuallyHidden>
          </InputsContainer>
        </Input>
      </StyledFieldset>
    </TimePickerContainer>
  );
};
