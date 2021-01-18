import React from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
import { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer';
import { v4 as uuidv4 } from 'uuid';
import {
  PasswordInput,
  PasswordInputProps as MagmaPasswordInputProps,
} from 'react-magma-dom';

export type PasswordProps = MagmaPasswordInputProps & UseFieldApiConfig;

const PasswordMapping: React.FunctionComponent<PasswordProps> = props => {
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
    <PasswordInput
      {...input}
      labelText={rest.labelText}
      id={id}
      errorMessage={errorMessage}
      {...rest}
    />
  );
};

export const Password = React.memo(PasswordMapping);
