import React from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
import { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer';
import { v4 as uuidv4 } from 'uuid';
import {
  Input as MagmaInput,
  InputType,
  InputProps as MagmaInputProps,
} from 'react-magma-dom';

export type InputProps = MagmaInputProps & UseFieldApiConfig;

const InputMapping = (props: InputProps) => {
  const {
    input,
    validateOnMount,
    showError,
    meta: { error, submitFailed },
    input: {type='text', ...inputRest},
    ...rest
  } = useFieldApi(props);
  const fields = useFieldApi(props);
  const id = input.name || uuidv4();
  const errorMessage =
    ((validateOnMount || submitFailed || showError) && error) || '';

  return (
    <MagmaInput
      {...inputRest}
      type={InputType[type as keyof typeof InputType] || InputType.text }
      id={id}
      errorMessage={errorMessage}
      helperMessage={JSON.stringify({props, fields}, null, 2)}
      {...rest}
    />
  );
};

export const Input = React.memo(InputMapping);
