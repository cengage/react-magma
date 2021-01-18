import React from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
import { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer';
import { v4 as uuidv4 } from 'uuid';
import {
  DatePicker as MagmaDatePicker,
  DatePickerProps as MagmaDatePickerProps,
} from 'react-magma-dom';

export type DatePickerProps = MagmaDatePickerProps & UseFieldApiConfig;

const DatePickerMapping: React.FunctionComponent<DatePickerProps> = props => {
  const {
    input,
    validateOnMount,
    showError,
    type,
    meta: { error, submitFailed },
    ...rest
  } = useFieldApi(props);
  const id = input.name || uuidv4();
  const errorMessage =
    ((validateOnMount || submitFailed || showError) && error) || '';

  return (
    <MagmaDatePicker
      {...input}
      id={id}
      errorMessage={errorMessage}
      labelText={rest.labelText}
      {...rest}
    />
  );
};

export const DatePicker = React.memo(DatePickerMapping);
