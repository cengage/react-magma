import * as React from 'react';

import { ReferenceType } from '@floating-ui/react-dom';
import { isEmpty } from 'lodash';
import { ClearIcon, EventIcon } from 'react-magma-icons';

import {
  DateFieldInputContainer,
  IconWrapper,
  InputsContainer,
  IsClearableContainer,
} from './StyledDateFieldInput';
import { InputDateFields, useDateField } from './useDateField';
import { I18nContext } from '../../../i18n';
import { useIsInverse } from '../../../inverse';
import { ThemeContext } from '../../../theme/ThemeContext';
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
import { Divider, StyledNumInput } from '../../TimePicker';

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
  onInputBlur?: (event: React.FocusEvent) => void;
  onInputFocus?: (event: React.FocusEvent) => void;
  required?: boolean;
}

export const DateFieldInput: React.FunctionComponent<DateFieldInputProps> = (
  props: DateFieldInputProps
) => {
  const {
    id,
    containerStyle,
    errorMessage,
    helperMessage,
    inputStyle,
    labelPosition,
    labelText,
    labelWidth,
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
  } = props;

  const {
    month,
    day,
    year,
    handleMonthChange,
    handleDayChange,
    handleYearChange,
    onClear,
    setMonthValue,
    setDayValue,
    setYearValue,
    handleFieldKeyDown,
    formatWithLeadingZero,
    fieldOrder,
    fieldRefs,
  } = useDateField({
    dateFormat,
  });

  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(props.isInverse);
  const hasMonthLongFormat = props.dateFormat === 'MMMM d, yyyy';
  const didMountRef = React.useRef(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const dayId = `${id}__day`;
  const monthId = `${id}__month`;
  const yearId = `${id}__year`;

  const i18n = React.useContext(I18nContext);
  const { datePicker } = i18n;

  const isNotEmptyDate = !isEmpty(day) || !isEmpty(month) || !isEmpty(year);
  const isClearableInput = props.isClearable && isNotEmptyDate;
  const monthSize = () => {
    if (hasMonthLongFormat) {
      return isEmpty(month) ? 7 : month.length + 0.5;
    }

    return isEmpty(month) ? 3.25 : 2;
  };

  const renderInput = (key: string) => {
    switch (key) {
      case InputDateFields.Day:
        return (
          <StyledNumInput
            aria-label={`${datePicker.day} ${day}`}
            aria-describedby={dayId}
            aria-valuemin={1}
            aria-valuemax={31}
            aria-valuenow={parseInt(day, 10)}
            aria-valuetext={`${day}`}
            data-testid="day-input"
            id={dayId}
            isInverse={isInverse}
            isFocused={isFocused || isNotEmptyDate}
            onChange={handleDayChange}
            onKeyDown={event => handleFieldKeyDown(event, InputDateFields.Day)}
            placeholder="dd"
            ref={fieldRefs.day}
            required={required}
            theme={theme}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            size={2}
            value={day ?? ''}
          />
        );
      case InputDateFields.Month:
        return (
          <StyledNumInput
            aria-label={`${datePicker.month} ${month}`}
            aria-describedby={monthId}
            aria-valuemax={12}
            aria-valuemin={1}
            aria-valuenow={parseInt(month, 10)}
            aria-valuetext={`${month}`}
            data-testid="month-input"
            id={monthId}
            isInverse={isInverse}
            isFocused={isFocused || isNotEmptyDate}
            onChange={handleMonthChange}
            onKeyDown={event =>
              handleFieldKeyDown(
                event,
                InputDateFields.Month,
                hasMonthLongFormat
              )
            }
            placeholder={hasMonthLongFormat ? 'mmmm' : 'mm'}
            ref={fieldRefs.month}
            required={required}
            theme={theme}
            type="text"
            size={monthSize()}
            value={month ?? ''}
          />
        );
      case InputDateFields.Year:
        return (
          <StyledNumInput
            aria-label={`${datePicker.year} ${year}`}
            aria-describedby={yearId}
            aria-valuemin={1900}
            aria-valuemax={2099}
            aria-valuenow={parseInt(year, 10)}
            aria-valuetext={`${year}`}
            data-testid="year-input"
            id={yearId}
            isInverse={isInverse}
            isFocused={isFocused || isNotEmptyDate}
            onChange={handleYearChange}
            onKeyDown={event => handleFieldKeyDown(event, InputDateFields.Year)}
            placeholder="yyyy"
            ref={fieldRefs.year}
            required={required}
            theme={theme}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            size={isEmpty(year) ? 3.5 : 4.5}
            value={year ?? ''}
          />
        );
      default:
        return null;
    }
  };

  const clearDate = () => {
    onClear();
    handleDateChange?.(null, null);
    onClearDate?.();
  };

  const focusInputContainer = (e: React.MouseEvent | React.FocusEvent) => {
    if (e.target !== e.currentTarget) return;

    // Focus the first available field in fieldOrder
    const firstFieldRef = fieldRefs[fieldOrder[0]]?.current;

    firstFieldRef?.focus();
  };

  React.useEffect(() => {
    let isMounted = true;

    // Preventing calling handleDateChange and onClearDate on initial mount when fields are empty
    if (!didMountRef.current) {
      didMountRef.current = true;

      return;
    }

    const allFieldsEmpty = isEmpty(day) && isEmpty(month) && isEmpty(year);

    if (allFieldsEmpty && isMounted) {
      handleDateChange?.(null, null);
      onClearDate?.();

      return;
    }

    const isCompletedDate = month && day && year;

    if (!isCompletedDate) return;
    const newDate = hasMonthLongFormat
      ? new Date(`${month} ${day}, ${year}`)
      : new Date(Number(year), Number(month) - 1, Number(day));

    if (!isNaN(newDate.getTime()) && isMounted) {
      handleDateChange?.(newDate, null);
    }

    return () => {
      isMounted = false;
    };
  }, [month, day, year, hasMonthLongFormat]);

  React.useEffect(() => {
    let isMounted = true;

    if (!inputValue && isMounted) {
      onClear();

      return () => {
        isMounted = false;
      };
    }

    const date = new Date(inputValue);
    const dayValue = date.getDate().toString();
    const monthValue = (date.getMonth() + 1).toString();
    const yearValue = date.getFullYear().toString();

    if (isMounted) {
      setDayValue(formatWithLeadingZero(Number(dayValue)));
      setMonthValue(
        hasMonthLongFormat
          ? date.toLocaleDateString('en-US', { month: 'long' })
          : formatWithLeadingZero(Number(monthValue))
      );
      setYearValue(formatWithLeadingZero(Number(yearValue)));
    }

    return () => {
      isMounted = false;
    };
  }, [inputValue, hasMonthLongFormat]);

  React.useEffect(() => {
    if (setReference && inputRef && inputRef.current) {
      setReference(inputRef.current);
    }
  }, [setReference, inputRef]);

  const renderDateFields = () => {
    const fieldOrderLength = fieldOrder.length;

    return fieldOrder.map((key, idx) => (
      <React.Fragment key={key}>
        {renderInput(key)}
        {idx < fieldOrderLength - 1 && (
          <Divider
            isFocused={isFocused || isNotEmptyDate}
            isInverse={isInverse}
            theme={theme}
            style={{ marginRight: hasMonthLongFormat ? '2px' : 0 }}
          >
            {hasMonthLongFormat ? (idx === 1 ? ',' : '') : '/'}
          </Divider>
        )}
      </React.Fragment>
    ));
  };

  return (
    <FormFieldContainer
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
          onFocus={e => {
            if (e.target === e.currentTarget) {
              focusInputContainer(e);
              onInputFocus?.(e);
            }
            setIsFocused(true);
          }}
          onBlur={e => {
            onInputBlur?.(e);
            setIsFocused(false);
          }}
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
};
