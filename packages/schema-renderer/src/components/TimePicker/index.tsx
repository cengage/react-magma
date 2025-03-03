import React from 'react';

import { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer';
import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import {
  TimePicker as MagmaTimePicker,
  TimePickerProps as MagmaTimePickerProps,
} from 'react-magma-dom';
import { v4 as uuidv4 } from 'uuid';

export type TimePickerProps = MagmaTimePickerProps & UseFieldApiConfig;

const TimePickerMapping = (props: TimePickerProps) => {
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
    <MagmaTimePicker
      {...input}
      id={id}
      errorMessage={errorMessage}
      labelText={rest.labelText}
      {...rest}
    />
  );
};

export const TimePicker = React.memo(TimePickerMapping);
