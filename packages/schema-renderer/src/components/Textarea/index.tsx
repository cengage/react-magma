import { memo } from 'react';
import { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer';
import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import { v4 as uuidv4 } from 'uuid';
import {
  Textarea as MagmaTextarea,
  TextareaProps as MagmaTextareaProps,
} from 'react-magma-dom';

export type TextareaProps = MagmaTextareaProps & UseFieldApiConfig;

const TextareaMapping = (props: TextareaProps) => {
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
    <MagmaTextarea
      {...input}
      id={id}
      errorMessage={errorMessage}
      labelText={rest.labelText}
      {...rest}
    />
  );
};

export const Textarea = memo(TextareaMapping);
