import React from 'react';

import { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer';
import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import {
  DatePicker as MagmaDatePicker,
  DatePickerProps as MagmaDatePickerProps,
} from 'react-magma-dom';
import { v4 as uuidv4 } from 'uuid';

export type DatePickerProps = MagmaDatePickerProps & UseFieldApiConfig;

const DatePickerMapping = (props: DatePickerProps) => {
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
