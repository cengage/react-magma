import React, { FunctionComponent, memo } from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
import { v4 as uuidv4 } from 'uuid';
import { Radio as MagmaRadio, RadioProps, RadioGroup } from 'react-magma-dom';

export const RadioMapping: FunctionComponent = (props: any) => {
  const {
    input,
    options,
    validateOnMount,
    showError,
    meta: { error, submitFailed },
    ...rest
  } = useFieldApi({ ...props, type: 'radio' });
  const name = input.name || uuidv4();

  const errorMessage =
    ((validateOnMount || submitFailed || showError) && error) ||
    rest.errorMessage;

  return (
    <RadioGroup
      onChange={input.onChange}
      errorMessage={errorMessage}
      name={name}
      {...rest}
    >
      {options.map((option: RadioProps) => {
        return <MagmaRadio {...option} key={option.value?.toString()} />;
      })}
    </RadioGroup>
  );
};

export const Radio = memo(RadioMapping);
