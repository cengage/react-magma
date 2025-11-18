import React from 'react';

import styled from '@emotion/styled';

import {
  Button,
  ButtonColor,
  ButtonSize,
  I18nContext,
  ThemeContext,
} from '../..';
import { DatePicker } from '../DatePicker';
import { LabelPosition } from '../Label';
import { TimePicker } from '../TimePicker';

export interface DateTimePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'defaultValue'
  > {
  /**
   * Default selected date and time values
   */
  defaultValue?: Date;
  /**
   * Content of the error message. If a value is provided, the component will be styled to show an error state
   */
  errorMessage?: React.ReactNode;
  /**
   * Content of the helper message
   */
  helperMessage?: React.ReactNode;
  /**
   * Style properties for the input element
   */
  inputStyle?: React.CSSProperties;
  /**
   * Clear contents of input by clicking a clear button
   * @default false
   */
  isClearable?: boolean;
  /**
   * If true, the component will have inverse styling to better appear on a dark background
   * @default false
   */
  isInverse?: boolean;
  /**
   * Style properties for the label element
   */
  labelStyle?: React.CSSProperties;
  /**
   * Text for label
   */
  labelText: React.ReactNode;
  /**
   * Text for time picker label
   */
  timePickerLabelText?: React.ReactNode;
  /**
   * Text for button label
   */
  buttonLabelText?: React.ReactNode;
  /**
   * Maximum date allowed to be chosen in the calendar
   */
  maxDate?: Date;
  /**
   * Style properties for the helper or error message
   */
  messageStyle?: React.CSSProperties;
  /**
   * Minimum date allowed to be chosen in the calendar
   */
  minDate?: Date;
  /**
   * Text for input placeholder
   */
  placeholder?: string;
  /**
   * If true, this component must have a value
   * @default false
   */
  required?: boolean;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Value of the date input, used when setting the date value externally
   */
  value?: Date;
  /**
   * Optional timezone to display with the selected date and time (e.g. "America/New_York").
   * If provided, the component will display its short abbreviation (e.g. "EST") and include the timezone when returning values.
   */
  timezone?: string;
  /**
   * Event that will fire when day is changed
   */
  onDateChange?: (
    day: Date,
    event: React.SyntheticEvent,
    timezone?: string
  ) => void;
  /**
   * Event that will fire when time is changed
   */
  onTimeChange?: (time: string, timezone?: string) => void;
  /**
   * Event that will fire when the text input loses focus
   */
  onInputBlur?: (event: React.FocusEvent) => void;
  /**
   * Event that will fire when the text input is changed
   */
  onInputChange?: (event: React.ChangeEvent) => void;
  /**
   * Event that will fire when the text input gains focus
   */
  onInputFocus?: (event: React.FocusEvent) => void;
  /**
   * Event that will fire when the done button is clicked
   */
  onDone?: (event: React.SyntheticEvent) => void;
}

const DoneButtonWrapper = styled.div<{ isInverse?: boolean }>`
  background-color: ${props =>
    props.isInverse
      ? props.theme.colors.primary600
      : props.theme.colors.neutral200};
  padding: ${props => props.theme.spaceScale.spacing05};
  margin: ${props =>
    `0 -${props.theme.spaceScale.spacing03} -${props.theme.spaceScale.spacing03}`};
  display: flex;
  justify-content: flex-end;
`;

function isValidTimezone(timezone: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });

    return true;
  } catch {
    return false;
  }
}

function getTimezoneAbbr(date: Date, timezone: string): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'short',
    });
    const parts = formatter.formatToParts(date);
    const timezonePart = parts.find(p => p.type === 'timeZoneName');

    return timezonePart?.value || '';
  } catch {
    return '';
  }
}

export const DateTimePicker = React.forwardRef<
  HTMLInputElement,
  DateTimePickerProps
>((props, forwardedRef) => {
  const {
    onTimeChange,
    onInputChange,
    onDateChange,
    onDone,
    placeholder,
    value,
    defaultValue,
    labelText,
    timePickerLabelText,
    buttonLabelText,
    timezone,
    ...other
  } = props;
  const i18n = React.useContext(I18nContext);

  const getTimeFromDate = (date: Date | number) => {
    if (!date) return '';

    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const initialTime = getTimeFromDate(value ?? defaultValue);

  const theme = React.useContext(ThemeContext);
  const datePickerApiRef = React.useRef(null);
  const previousTime = React.useRef<string>('');
  const [additionalInputContent, setAdditionalInputContent] = React.useState(
    initialTime || ''
  );
  const [timezoneAbbr, setTimezoneAbbr] = React.useState('');

  React.useEffect(() => {
    if (timezone && isValidTimezone(timezone)) {
      const abbr = getTimezoneAbbr(
        value ?? defaultValue ?? new Date(),
        timezone
      );

      setTimezoneAbbr(abbr);
    } else {
      setTimezoneAbbr('');
    }
  }, [timezone, value, defaultValue]);

  const handleDoneClick = (event: React.SyntheticEvent) => {
    datePickerApiRef.current?.closeDatePickerManually();

    onDone && onDone(event);
  };

  const handleClear = () => {
    setAdditionalInputContent('');
    previousTime.current = '';
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (!value) {
      setAdditionalInputContent('');
      previousTime.current = '';
      return;
    }

    const timeMatch = value.match(/\b(\d{1,2}:\d{2}\s?[AP]M)\b/i);

    if (timeMatch) {
      const timeValue = timeMatch[1];
      setAdditionalInputContent(timeValue);
      previousTime.current = timeValue;
    } else {
      const cuttedValue = value.split(' ');
      if (cuttedValue[0] && cuttedValue[0] !== '') {
        setAdditionalInputContent(previousTime.current);
      } else {
        setAdditionalInputContent('');
        previousTime.current = '';
      }
    }

    onInputChange && onInputChange(event);
  };

  const onTimeHandleChange = (value: string) => {
    setAdditionalInputContent(value);
    previousTime.current = value;

    if (onTimeChange) {
      timezone ? onTimeChange(value, timezone) : onTimeChange(value);
    }
  };

  const onDateHandleChange = (day: Date, event: React.SyntheticEvent) => {
    if (onDateChange) {
      timezone
        ? onDateChange && onDateChange(day, event, timezone)
        : onDateChange && onDateChange(day, event);
    }
  };

  React.useEffect(() => {
    if (!value && !defaultValue) {
      handleClear();
    } else if (value) {
      const newTime = getTimeFromDate(value);

      setAdditionalInputContent(newTime);
      previousTime.current = newTime;
    }
  }, [value, defaultValue]);

  const dateFormat = i18n.dateFormat;
  const updatedPlaceholder = placeholder
    ? placeholder
    : `${dateFormat.toLowerCase()} hh:mm AM`;

  const additionalInputContentWithTimezone =
    additionalInputContent && timezoneAbbr
      ? `${additionalInputContent} ${timezoneAbbr}`
      : additionalInputContent;

  return (
    <DatePicker
      {...other}
      labelText={labelText ?? i18n.dateTimePickerLabel}
      apiRef={datePickerApiRef}
      additionalInputContent={additionalInputContentWithTimezone}
      placeholder={updatedPlaceholder}
      onInputChange={handleInputChange}
      setAdditionalInputContent={setAdditionalInputContent}
      isClearable
      onDateChange={onDateHandleChange}
      onClear={handleClear}
      ref={forwardedRef}
      value={value}
      defaultDate={defaultValue}
      dateTimePickerContent={
        <>
          <TimePicker
            value={!additionalInputContent ? undefined : additionalInputContent}
            onChange={onTimeHandleChange}
            labelPosition={LabelPosition.left}
            inputStyle={{ width: '100%' }}
            labelText={timePickerLabelText ?? 'Time'}
            containerStyle={{
              padding: theme.spaceScale.spacing05,
              margin: `0 -${theme.spaceScale.spacing03}`,
              borderBlock: `1px solid ${props.isInverse ? theme.colors.primary400 : theme.colors.neutral300}`,
            }}
            timezone={timezoneAbbr}
          />
          <DoneButtonWrapper theme={theme} isInverse={props.isInverse}>
            <Button
              onClick={handleDoneClick}
              size={ButtonSize.small}
              color={ButtonColor.subtle}
            >
              {buttonLabelText ?? 'Done'}
            </Button>
          </DoneButtonWrapper>
        </>
      }
    />
  );
});
