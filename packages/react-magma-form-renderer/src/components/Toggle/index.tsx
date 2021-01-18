import React, { FunctionComponent, memo } from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
import { v4 as uuidv4 } from 'uuid';
import { Toggle as MagmaToggle } from 'react-magma-dom';

const ToggleMapping: FunctionComponent = (props: any) => {
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
    <MagmaToggle
      {...input}
      id={id}
      errorMessage={errorMessage}
      labelText={rest.labelText}
      {...rest}
    />
  );
};

export const Toggle = memo(ToggleMapping);
