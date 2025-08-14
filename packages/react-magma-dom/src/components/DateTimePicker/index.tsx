import React from 'react';

import styled from '@emotion/styled';

import { Button, ButtonColor, ButtonSize, ThemeContext } from '../..';
import { DatePicker } from '../DatePicker';
import { LabelPosition } from '../Label';
import { TimePicker } from '../TimePicker';

export interface DateTimePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
  > {
  /**
   * Default selected date value
   */
  defaultDate?: Date;
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
   * Event fired in multiple instances when internal values are changed and can be used as a generic state change event
   */
  onChange?: (
    value: string,
    event: React.ChangeEvent | React.SyntheticEvent
  ) => void;
  /**
   * Event that will fire when day is changed
   */
  onDateChange?: (day: Date, event: React.SyntheticEvent) => void;
  /**
   * Event that will fire when time is changed
   */
  onTimeChange?: (time: string) => void;
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
}

const DoneButtonWrapper = styled.div<{ isInverse?: boolean }>`
  background-color: ${props =>
    props.isInverse
      ? props.theme.colors.primary600
      : props.theme.colors.neutral200};
  padding: 16px;
  margin: 0 -16px -8px;
  display: flex;
  justify-content: flex-end;
`;

export const DateTimePicker = React.forwardRef<
  HTMLInputElement,
  DateTimePickerProps
>((props, forwardedRef) => {
  const { onTimeChange, value, defaultDate, testId, ...other } = props;

  const getTimeFromDate = (date: Date | number) => {
    if (!date) return '';

    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const initialTime = getTimeFromDate(value ?? defaultDate);

  const theme = React.useContext(ThemeContext);
  const datePickerApiRef = React.useRef(null);
  const previousTime = React.useRef<string>('');
  const [additionalInputContent, setAdditionalInputContent] = React.useState(
    initialTime || ''
  );

  const handleDoneClick = () => {
    datePickerApiRef.current?.closeDatePickerManually();
  };

  const handleClear = () => {
    setAdditionalInputContent('');
    previousTime.current = '';
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const onTimeHandleChange = (value: string) => {
    setAdditionalInputContent(value);
    previousTime.current = value;

    onTimeChange && onTimeChange(value);
  };

  React.useEffect(() => {
    if (!value && !defaultDate) {
      handleClear();
    }
  }, [value, defaultDate]);

  return (
    <DatePicker
      labelText="Pick a date and time"
      apiRef={datePickerApiRef}
      additionalInputContent={additionalInputContent}
      placeholder="mm/dd/yyyy hh:mm AM"
      onInputChange={onInputChange}
      setAdditionalInputContent={setAdditionalInputContent}
      isClearable
      onClear={handleClear}
      data-testid={testId}
      ref={forwardedRef}
      value={value}
      defaultDate={defaultDate}
      additionalContent={
        <>
          <TimePicker
            value={!additionalInputContent ? undefined : additionalInputContent}
            onChange={onTimeHandleChange}
            labelPosition={LabelPosition.left}
            inputStyle={{ width: '100%' }}
            labelText="Time"
            containerStyle={{
              padding: '16px',
              margin: '0 -16px',
              borderTop: `1px solid ${theme.colors.neutral300}`,
            }}
          />
          <DoneButtonWrapper theme={theme} isInverse={props.isInverse}>
            <Button
              onClick={handleDoneClick}
              size={ButtonSize.small}
              color={ButtonColor.subtle}
            >
              Done
            </Button>
          </DoneButtonWrapper>
        </>
      }
      {...other}
    />
  );
});
