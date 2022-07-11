import * as React from 'react';
import { CalendarContext } from './CalendarContext';
import { CalendarMonth } from './CalendarMonth';
import { Announce } from '../Announce';
import { Input } from '../Input';
import { InputType } from '../InputBase';
import { isAfter, isBefore, isValid, isSameDay } from 'date-fns';
import { ThemeContext } from '../../theme/ThemeContext';
import styled from '../../theme/styled';
import { EventIcon } from 'react-magma-icons';
import { VisuallyHidden } from '../VisuallyHidden';
import {
  handleKeyPress,
  getCalendarMonthWeeks,
  getPrevMonthFromDate,
  getNextMonthFromDate,
  i18nFormat as format,
  getDateFromString,
} from './utils';
import { omit, useGenerateId, Omit, useForkedRef } from '../../utils';
import { I18nContext } from '../../i18n';
import { InverseContext, useIsInverse } from '../../inverse';
import { transparentize } from 'polished';

export interface DatePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
  > {
  /**
   * Style properties for the component container element
   */
  containerStyle?: React.CSSProperties;
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

const DatePickerContainer = styled.div`
  position: relative;
`;

const DatePickerCalendar = styled.div<{ opened: boolean; isInverse?: boolean }>`
  border: 1px solid
    ${props =>
      props.isInverse
        ? transparentize(0.5, props.theme.colors.neutral100)
        : props.theme.colors.neutral300};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  display: ${props => (props.opened ? 'block' : 'none')};
  margin-top: ${props => props.theme.spaceScale.spacing01};
  opacity: ${props => (props.opened ? '1' : '0')};
  overflow: hidden;
  position: absolute;
  transition: opacity 0.2s ease-in-out 0s;
  width: 320px;
  z-index: ${props => (props.opened ? '998' : '-1')};
`;

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (props, forwardedRef) => {
    const theme = React.useContext(ThemeContext);
    const i18n = React.useContext(I18nContext);
    const iconRef = React.useRef<HTMLButtonElement>();
    const inputRef = React.useRef<HTMLInputElement>();
    const lastFocus = React.useRef<any>();
    const id: string = useGenerateId(props.id);
    const [helperInformationShown, setHelperInformationShown] =
      React.useState<boolean>(false);
    const [calendarOpened, setCalendarOpened] = React.useState<boolean>(false);
    const [dateFocused, setDateFocused] = React.useState<boolean>(false);

    const [focusedDate, setFocusedDate] = React.useState<Date>(
      setDateFromConsumer(props.value || props.defaultDate) ||
        setDefaultFocusedDate()
    );
    const [chosenDate, setChosenDate] = React.useState<Date | null>(
      setDateFromConsumer(props.value || props.defaultDate)
    );

    const ref = useForkedRef(forwardedRef, inputRef);

    React.useEffect(() => {
      if (!calendarOpened) {
        setDateFocused(false);
      }
    }, [calendarOpened]);

    React.useEffect(() => {
      if (props.value) {
        setChosenDate(setDateFromConsumer(props.value));
        setFocusedDate(
          setDateFromConsumer(props.value) || setDefaultFocusedDate()
        );
      }
    }, [props.value]);

    function showHelperInformation() {
      lastFocus.current = document.activeElement;
      setHelperInformationShown(true);
    }

    function hideHelperInformation() {
      setHelperInformationShown(false);
      lastFocus.current.focus();
    }

    function setDateFromConsumer(date: Date): Date {
      const convertedDate = getDateFromString(date);
      const convertedMinDate = getDateFromString(props.minDate);
      const convertedMaxDate = getDateFromString(props.maxDate);

      return date &&
        inDateRange(convertedDate, convertedMinDate, convertedMaxDate)
        ? convertedDate
        : null;
    }

    function setDefaultFocusedDate(): Date {
      const newDate = new Date();
      const convertedMinDate = getDateFromString(props.minDate);
      const convertedMaxDate = getDateFromString(props.maxDate);

      if (inDateRange(newDate, convertedMinDate, convertedMaxDate)) {
        return newDate;
      } else if (convertedMaxDate || convertedMinDate) {
        return convertedMinDate ? convertedMinDate : convertedMaxDate;
      }
    }

    function inDateRange(
      date: Date,
      minDateValue?: Date,
      maxDateValue?: Date
    ): boolean {
      return (
        (maxDateValue
          ? isBefore(date, maxDateValue) || isSameDay(date, maxDateValue)
          : true) &&
        (minDateValue
          ? isAfter(date, minDateValue) || isSameDay(date, minDateValue)
          : true)
      );
    }

    function buildCalendarMonth(date: Date, enableOutsideDates: boolean) {
      const days = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ];
      const { startOfWeek } = i18n.datePicker;
      return getCalendarMonthWeeks(
        date,
        enableOutsideDates,
        days.indexOf(startOfWeek)
      );
    }

    function onPrevMonthClick() {
      setFocusedDate(getPrevMonthFromDate);
    }

    function onNextMonthClick() {
      setFocusedDate(getNextMonthFromDate);
    }

    function onDateChange(day: Date) {
      setChosenDate(day);
      setCalendarOpened(false);
    }

    function reset() {
      setFocusedDate(setDefaultFocusedDate());
      setChosenDate(null);
      setDateFocused(false);
    }

    function isValidDateFromString(value: string, day: Date) {
      const isValidDateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value);
      const isValidDate = isValid(day);

      return isValidDateFormat && isValidDate;
    }

    function handleInputChange(event) {
      const { value } = event.target;
      const day = new Date(value);
      setCalendarOpened(false);

      props.onInputChange &&
        typeof props.onInputChange === 'function' &&
        props.onInputChange(event);

      const isValidDay = isValidDateFromString(value, day);

      props.onChange &&
        typeof props.onChange === 'function' &&
        props.onChange(isValidDay ? day.toISOString() : value, event);
    }

    function handleInputFocus(event: React.FocusEvent) {
      props.onInputFocus &&
        typeof props.onInputFocus === 'function' &&
        props.onInputFocus(event);
    }

    function handleInputBlur(event: React.FocusEvent) {
      const { value } = inputRef.current;
      const day = new Date(value);
      const convertedMinDate = getDateFromString(props.minDate);
      const convertedMaxDate = getDateFromString(props.maxDate);

      if (
        isValidDateFromString(value, day) &&
        inDateRange(day, convertedMinDate, convertedMaxDate)
      ) {
        handleDateChange(day, event);
      } else {
        reset && typeof reset === 'function' && reset();
      }

      props.onInputBlur &&
        typeof props.onInputBlur === 'function' &&
        props.onInputBlur(event);
    }

    function handleInputKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setCalendarOpened(false);
        inputRef.current.focus();
      }
    }

    function handleKeyDown(event: React.KeyboardEvent) {
      if (dateFocused && document.activeElement.closest('table')) {
        const newChosenDate = handleKeyPress(
          event,
          focusedDate,
          setCalendarOpened,
          showHelperInformation,
          onDateChange,
          iconRef
        );
        if (newChosenDate) {
          setFocusedDate(newChosenDate);
        }
      } else {
        if (event.key === 'Escape') {
          setCalendarOpened(false);
          iconRef.current.focus();
        }

        if (event.key === '?') {
          showHelperInformation();
        }
      }
    }

    function handleDateChange(
      day: Date,
      event: React.SyntheticEvent | React.ChangeEvent
    ) {
      props.onDateChange &&
        typeof props.onDateChange === 'function' &&
        props.onDateChange(day, event);

      props.onChange &&
        typeof props.onChange === 'function' &&
        props.onChange(day.toISOString(), event);

      onDateChange(day);
      setFocusedDate(day);
    }

    function handleDaySelection(day: Date, event: React.SyntheticEvent) {
      handleDateChange(day, event);
      inputRef.current.focus();
    }

    function handleCalendarBlur(event: React.SyntheticEvent) {
      const { currentTarget } = event;

      // timeout needed for active element to update. Browser behavior.
      // https://bugzilla.mozilla.org/show_bug.cgi?id=452307
      setTimeout(() => {
        const isInCalendar = currentTarget.contains(document.activeElement);

        if (!isInCalendar && !helperInformationShown) {
          setCalendarOpened(false);
        }
      }, 0);
    }

    function handleCloseButtonClick(event: React.SyntheticEvent) {
      iconRef.current.focus();
      setCalendarOpened(false);
    }

    function toggleCalendarOpened() {
      setCalendarOpened(opened => !opened);
    }

    const { placeholder, testId, ...rest } = props;
    const other = omit(
      ['onDateChange', 'onInputChange', 'onInputBlur', 'onInputFocus'],
      rest
    );

    const isInverse = useIsInverse(props.isInverse);

    const minDate = getDateFromString(props.minDate);
    const maxDate = getDateFromString(props.maxDate);

    const dateFormat = i18n.dateFormat;

    const inputValue = chosenDate ? format(chosenDate, dateFormat) : '';

    return (
      <CalendarContext.Provider
        value={{
          chosenDate,
          focusedDate,
          dateFocused,
          maxDate,
          minDate,
          helperInformationShown,
          isInverse,
          buildCalendarMonth,
          showHelperInformation,
          hideHelperInformation,
          onKeyDown: handleKeyDown,
          onPrevMonthClick,
          onNextMonthClick,
          onDateChange: handleDaySelection,
          setDateFocused,
        }}
      >
        <DatePickerContainer data-testid={testId} onBlur={handleCalendarBlur}>
          <Announce>
            {calendarOpened && (
              <VisuallyHidden>
                {i18n.datePicker.calendarOpenAnnounce}
              </VisuallyHidden>
            )}
          </Announce>
          <Input
            {...other}
            icon={<EventIcon />}
            iconAriaLabel={i18n.datePicker.calendarIconAriaLabel}
            iconRef={iconRef}
            onIconClick={toggleCalendarOpened}
            onIconKeyDown={handleInputKeyDown}
            id={id}
            isInverse={isInverse}
            ref={ref}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder ? placeholder : dateFormat.toLowerCase()}
            type={InputType.text}
            value={inputValue}
          />
          <InverseContext.Provider value={{ isInverse }}>
            <DatePickerCalendar
              data-testid="calendarContainer"
              opened={calendarOpened}
              isInverse={isInverse}
              theme={theme}
            >
              <CalendarMonth
                focusOnOpen={
                  calendarOpened && Boolean(focusedDate) && Boolean(chosenDate)
                }
                isInverse={isInverse}
                handleCloseButtonClick={handleCloseButtonClick}
                calendarOpened={calendarOpened}
                setDateFocused={setDateFocused}
              />
            </DatePickerCalendar>
          </InverseContext.Provider>
        </DatePickerContainer>
      </CalendarContext.Provider>
    );
  }
);
