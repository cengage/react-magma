import React from 'react';

import { Button, ButtonColor, ButtonSize, styled, ThemeContext } from '../..';
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

const DoneButtonWrapper = styled.div`
  background-color: ${props => props.theme.colors.neutral200};
  padding: 16px;
  margin: 0 -16px -8px;
  display: flex;
  justify-content: flex-end;
`;

export const DateTimePicker = React.forwardRef<
  HTMLInputElement,
  DateTimePickerProps
>((props, forwardedRef) => {
  const { testId, ...other } = props;

  const getTimeFromDate = (date: Date | number) => {
    if (!date) return '';

    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const initialTime = getTimeFromDate(props.defaultDate);

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

    const cuttedValue = value.split(' ');

    const index = cuttedValue.findIndex(item => item.includes(':'));

    if (index > -1) {
      setAdditionalInputContent(cuttedValue.slice(index).join(' '));
      previousTime.current = cuttedValue.slice(index).join(' ');
    } else {
      if (cuttedValue[0] && cuttedValue[0] !== '') {
        setAdditionalInputContent(previousTime.current);
      } else {
        setAdditionalInputContent('');
        previousTime.current = '';
      }
    }
  };

  const onTimeChange = (value: string) => {
    setAdditionalInputContent(value);
    previousTime.current = value;
  };

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
      additionalContent={
        <>
          <TimePicker
            value={!additionalInputContent ? undefined : additionalInputContent}
            onChange={onTimeChange}
            labelPosition={LabelPosition.left}
            inputStyle={{ width: '100%' }}
            labelText="Time"
            containerStyle={{
              padding: '16px',
              margin: '0 -16px',
              borderTop: `1px solid ${theme.colors.neutral300}`,
            }}
          />
          <DoneButtonWrapper theme={theme}>
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
