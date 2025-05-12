import React from 'react';

import { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer';
import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import {
  PasswordInput as MagmaPasswordInput,
  PasswordInputProps as MagmaPasswordInputProps,
} from 'react-magma-dom';
import { v4 as uuidv4 } from 'uuid';

export type PasswordInputProps = MagmaPasswordInputProps & UseFieldApiConfig;

const PasswordInputMapping = (props: PasswordInputProps) => {
  const {
    input,
    validateOnMount,
    showError,
    meta: { error, submitFailed },
    ...rest
  } = useFieldApi(props);
  const id = input.name || uuidv4();
  const errorMessage =
    ((validateOnMount || submitFailed || showError) && error) || '';

  return (
    <MagmaPasswordInput
      {...input}
      labelText={rest.labelText}
      id={id}
      errorMessage={errorMessage}
      {...rest}
    />
  );
};

export const PasswordInput = React.memo(PasswordInputMapping);
