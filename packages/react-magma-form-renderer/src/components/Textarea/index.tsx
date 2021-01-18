import React, { FunctionComponent, memo } from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';

import { v4 as uuidv4 } from 'uuid';
import { Textarea as MagmaTextarea } from 'react-magma-dom';

const TextareaMapping: FunctionComponent = (props: any) => {
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
