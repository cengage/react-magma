import React from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
import { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer';
import { v4 as uuidv4 } from 'uuid';
import { Input, InputType, InputProps } from 'react-magma-dom';

export type TextFieldProps = InputProps & UseFieldApiConfig;

const TextFieldMapping: React.FunctionComponent<TextFieldProps> = props => {
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
    <Input
      {...input}
      type={InputType.text}
      id={id}
      errorMessage={errorMessage}
      {...rest}
    />
  );
};

export const TextField = React.memo(TextFieldMapping);
