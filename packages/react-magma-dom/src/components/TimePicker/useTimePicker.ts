import * as React from 'react';
import { useGenerateId, Omit } from '../../utils';
import { FormFieldContainerBaseProps } from '../FormFieldContainer';

import { enUS } from 'date-fns/locale';
import { I18nContext } from '../../i18n';

export interface UseTimePickerProps
  extends Omit<FormFieldContainerBaseProps, 'inputSize' | 'fieldId'> {
  /**
   * ID of the hidden input that stores the time value.  Also the prefix for other fields.
   */
  id?: string;
  /**
   * Style properties for the outer input
   */
  inputStyle?: React.CSSProperties;
  isInverse?: boolean;
  /**
   * Style properties for the label
   */
  minutesStep?: number;
  /**
   * Full time value passed in and converted to use in hour, minute, and AM/PM fields. To clear the TimePicker - send the undefined value.
   */
  value?: string | undefined;
  /**
   * Function called when the component is changed to a new time
   */
  onChange?: (value: string) => void;
}

export function useTimePicker(props: UseTimePickerProps) {
  const { errorMessage, helperMessage, onChange } = props;
  const i18n = React.useContext(I18nContext);

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
    if(typeof props.value === 'undefined') {
      setHour('');
      setMinute('');
      setAmPm(am);
      updateTime('');
    } else if (validTime(props.value)) {
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
    if (newHour < 10) {
      return `0${newHour}`;
    } else if (newHour > 12) {
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

  function handleHourKeyDown(event: React.KeyboardEvent, hourChangeFunc) {
    if (event.key === 'Backspace') {
      hourChangeFunc(event);
      setHour('');
      updateTime('');
    }

    if (event.key === 'ArrowRight') {
      minuteRef.current.focus();
    }
  }

  function handleMinuteKeyDown(event: React.KeyboardEvent, minChangeFunc) {
    if (event.key === 'Backspace') {
      minChangeFunc(event);
      setMinute('');
      updateTime('');
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

  return {
    amPm,
    am,
    amPmRef,
    toggleAmPm,
    id,
    time,
    hour,
    hourId,
    hourRef,
    minute,
    minuteId,
    minuteRef,
    descriptionId,
    handleHourChange,
    handleMinuteChange,
    handleHourKeyDown,
    handleMinuteKeyDown,
    handleAmPmKeyDown,
  };
}

export type UseTimePickerReturn = ReturnType<typeof useTimePicker>;
