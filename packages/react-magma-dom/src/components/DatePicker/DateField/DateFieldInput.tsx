import * as React from 'react';

import { ReferenceType } from '@floating-ui/react-dom';
import { ClearIcon, EventIcon } from 'react-magma-icons';

import {
  DateFieldInputContainer,
  Divider,
  IconWrapper,
  InputsContainer,
  IsClearableContainer,
  StyledInput,
} from './StyledInput';
import { InputDateFields, useDateField } from './useDateField';
import { I18nContext } from '../../../i18n';
import { useIsInverse } from '../../../inverse';
import { ThemeContext } from '../../../theme/ThemeContext';
import { isNotEmpty } from '../../../utils';
import {
  ButtonShape,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '../../Button';
import {
  FormFieldContainer,
  FormFieldContainerBaseProps,
} from '../../FormFieldContainer';
import { IconButton } from '../../IconButton';
import { IconButtonContainer } from '../../InputBase';

export interface DateFieldInputProps
  extends Omit<FormFieldContainerBaseProps, 'inputSize' | 'fieldId'> {
  id?: string;
  dateFormat?: string;
  inputStyle?: React.CSSProperties;
  labelText: React.ReactNode;
  onIconClick?: (event: React.MouseEvent) => void;
  setReference?: (node: ReferenceType) => void;
  iconRef?: React.RefObject<HTMLButtonElement>;
  isClearable?: boolean;
  iconAriaLabel?: string;
  inputRef?: React.RefObject<HTMLDivElement>;
  inputValue: Date | string;
  handleDateChange?: (day: Date, event) => void;
  onClearDate?: () => void;
  onIconKeyDown?: (event: React.KeyboardEvent) => void;
  onChange?: (value: Date | null) => void;
  onInputBlur?: (event: React.FocusEvent) => void;
  onInputFocus?: (event: React.FocusEvent) => void;
  required?: boolean;
}

export const DateFieldInput = React.forwardRef<
  HTMLInputElement,
  DateFieldInputProps
>((props, ref) => {
  const {
    id,
    containerStyle,
    errorMessage,
    helperMessage,
    inputStyle,
    labelPosition,
    labelText,
    labelWidth,
    onChange,
    handleDateChange,
    inputRef,
    inputValue,
    setReference,
    dateFormat,
    onIconClick,
    onClearDate,
    onIconKeyDown,
    onInputBlur,
    onInputFocus,
    required,
    ...other
  } = props;

  const {
    month,
    day,
    year,
    monthDayValue,
    handleMonthChange,
    handleDayChange,
    handleYearChange,
    onClear,
    setMonthValue,
    setDayValue,
    setYearValue,
    setMonthDayValue,
    handleFieldKeyDown,
    fieldOrder,
    fieldRefs,
  } = useDateField({
    onChange,
    dateFormat,
  });

  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(props.isInverse);

  const dayId = `${id}__day`;
  const monthId = `${id}__month`;
  const monthDayId = `${id}__month-day`;
  const yearId = `${id}__year`;
  const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;

  const i18n = React.useContext(I18nContext);
  const { datePicker } = i18n;

  const isFocused =
    fieldRefs.day?.current === document.activeElement ||
    fieldRefs.month?.current === document.activeElement ||
    fieldRefs.year?.current === document.activeElement;

  const isNotEmptyDate =
    isNotEmpty(day) || isNotEmpty(month) || isNotEmpty(year);

  const isClearableInput = props.isClearable && isNotEmptyDate;

  const renderInput = (key: string) => {
    switch (key) {
      case InputDateFields.MonthDay:
        return (
          <StyledInput
            aria-label={`${datePicker.month} ${month} ${datePicker.day} ${day}`}
            data-testid="month-day-input"
            id={monthDayId}
            isInverse={isInverse}
            isFocused={isFocused}
            onChange={e => setMonthDayValue(e.target.value)}
            onBlur={() => {
              const [monthInput, dayInput] = monthDayValue.split(' ');

              setMonthValue(monthInput);
              setDayValue(dayInput);
            }}
            placeholder="mmmm d"
            ref={fieldRefs[InputDateFields.MonthDay]}
            required={required}
            theme={theme}
            type="text"
            value={monthDayValue}
            minLength={4}
            maxLength={20}
            size={day && month ? month.length + day.length + 1 : 8}
          />
        );
      case InputDateFields.Day:
        return (
          <StyledInput
            aria-label={`${datePicker.day} ${day}`}
            data-testid="day-input"
            id={dayId}
            isInverse={isInverse}
            isFocused={isFocused}
            maxLength={2}
            max="31"
            min="1"
            onChange={handleDayChange}
            onKeyDown={event => handleFieldKeyDown(event, InputDateFields.Day)}
            placeholder="dd"
            ref={fieldRefs.day}
            required={required}
            theme={theme}
            type="number"
            value={day ?? ''}
          />
        );
      case InputDateFields.Month:
        return (
          <StyledInput
            aria-label={`${datePicker.month} ${month}`}
            aria-describedby={descriptionId}
            data-testid="month-input"
            id={monthId}
            isInverse={isInverse}
            isFocused={isFocused}
            maxLength={2}
            max="12"
            min="1"
            onChange={handleMonthChange}
            onKeyDown={event =>
              handleFieldKeyDown(event, InputDateFields.Month)
            }
            placeholder={props.dateFormat === 'MMMM d, yyyy' ? 'mmmm' : 'mm'}
            ref={fieldRefs.month}
            required={required}
            theme={theme}
            type={props.dateFormat === 'MMMM d, yyyy' ? 'text' : 'number'}
            value={month ?? ''}
          />
        );
      case InputDateFields.Year:
        return (
          <StyledInput
            aria-label={`${datePicker.year} ${year}`}
            data-testid="year-input"
            id={yearId}
            isInverse={isInverse}
            isFocused={isFocused}
            maxLength={4}
            max="2099"
            min="1900"
            onChange={handleYearChange}
            onKeyDown={event => handleFieldKeyDown(event, InputDateFields.Year)}
            placeholder="yyyy"
            ref={fieldRefs.year}
            required={required}
            theme={theme}
            type="number"
            value={year ?? ''}
          />
        );
    }
  };

  const inputHandleDateChange = () => {
    let constructedDate: Date;

    if (props.dateFormat === 'MMMM d, yyyy') {
      constructedDate = new Date(`${month} ${day}, ${year}`);
    } else {
      const monthNum = parseInt(month, 10);
      const dayNum = parseInt(day, 10);
      const yearNum = parseInt(year, 10);

      constructedDate = new Date(yearNum, monthNum - 1, dayNum);
    }
    if (isNaN(constructedDate.getTime())) {
      return;
    }
    handleDateChange && handleDateChange(constructedDate, null);
  };

  React.useEffect(() => {
    if (month && day && year) {
      inputHandleDateChange();
    }
  }, [month, day, year]);

  React.useEffect(() => {
    if (setReference && inputRef && inputRef.current) {
      setReference(inputRef.current);
    }
  }, [setReference, inputRef]);

  const focusInputContainer = (e: React.MouseEvent | React.FocusEvent) => {
    if (e.target !== e.currentTarget) return;

    // Focus the first available field in fieldOrder
    const firstFieldRef = fieldRefs[fieldOrder[0]]?.current;

    firstFieldRef?.focus();
  };

  const clearDate = (event: React.MouseEvent) => {
    onClear();
    props.handleDateChange?.(null, event);
    onClearDate?.();
  };

  React.useEffect(() => {
    if (!inputValue) return onClear();

    let dayValue: string;
    let monthValue: string;
    let yearValue: string;

    if (typeof inputValue === 'string') {
      const stringDate = inputValue.trim().split(/[\s,]+/);

      if (stringDate.length >= 3) {
        [monthValue, dayValue, yearValue] = stringDate;
      }
    } else if (inputValue instanceof Date) {
      dayValue = inputValue.getDate().toString();
      monthValue = (inputValue.getMonth() + 1).toString();
      yearValue = inputValue.getFullYear().toString();
    }

    setDayValue(dayValue);
    setMonthValue(monthValue);
    setYearValue(yearValue);
    setMonthDayValue(`${monthValue} ${dayValue}`);
  }, [inputValue, i18n.dateFormat]);

  const renderDateFields = () => {
    const fieldOrderLength = fieldOrder.length;

    return fieldOrder.map((key, idx) => (
      <React.Fragment key={key}>
        {renderInput(key)}
        {idx < fieldOrderLength - 1 && (
          <Divider
            isFocused={isFocused}
            isInverse={isInverse}
            isNotEmptyDate={isNotEmptyDate}
            theme={theme}
          >
            {fieldOrderLength === 2 ? ',' : '/'}
          </Divider>
        )}
      </React.Fragment>
    ));
  };

  return (
    <FormFieldContainer
      {...other}
      containerStyle={containerStyle}
      errorMessage={errorMessage}
      fieldId={id}
      helperMessage={helperMessage}
      isInverse={isInverse}
      labelText={labelText}
      labelPosition={labelPosition}
      labelWidth={labelWidth}
    >
      <DateFieldInputContainer>
        <InputsContainer
          data-testid="date-field-input"
          ref={inputRef}
          isInverse={isInverse}
          hasError={!!errorMessage}
          theme={theme}
          style={inputStyle}
          onClick={focusInputContainer}
          onFocusCapture={e => {
            if (e.target === e.currentTarget) {
              focusInputContainer(e);
              onInputFocus?.(e);
            }
          }}
          onBlurCapture={onInputBlur}
          tabIndex={0}
        >
          {renderDateFields()}
        </InputsContainer>
        {isClearableInput && (
          <IsClearableContainer theme={theme}>
            <IconButton
              aria-label={i18n.input.isClearableAriaLabel}
              icon={<ClearIcon />}
              size={ButtonSize.small}
              isInverse={props.isInverse}
              shape={ButtonShape.fill}
              testId="clear-button"
              type={ButtonType.button}
              variant={ButtonVariant.link}
              onClick={clearDate}
            />
          </IsClearableContainer>
        )}
        <IconWrapper theme={theme}>
          <IconButtonContainer theme={theme} isClickable>
            <IconButton
              aria-label={props.iconAriaLabel}
              data-testid="toggle-calendar-button"
              icon={<EventIcon />}
              size={ButtonSize.small}
              isInverse={props.isInverse}
              ref={props.iconRef}
              onClick={onIconClick}
              shape={ButtonShape.fill}
              type={ButtonType.button}
              variant={ButtonVariant.link}
              onKeyDown={onIconKeyDown}
            />
          </IconButtonContainer>
        </IconWrapper>
      </DateFieldInputContainer>
    </FormFieldContainer>
  );
});
