import { memo } from 'react';
import { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer';
import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
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
    input: { type = 'text', ...inputRest },
    ...rest
  } = useFieldApi(props);
  const id = input.name || uuidv4();
  const errorMessage =
    ((validateOnMount || submitFailed || showError) && error) || '';

  return (
    <MagmaInput
      {...inputRest}
      type={InputType[type as keyof typeof InputType] || InputType.text}
      id={id}
      errorMessage={errorMessage}
      {...rest}
    />
  );
};

export const Input = memo(InputMapping);
