import React, { FunctionComponent, memo } from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
import { v4 as uuidv4 } from 'uuid';
import {
  Checkbox as MagmaCheckbox,
  CheckboxProps,
  FormGroup,
} from 'react-magma-dom';

const GroupedCheckbox: FunctionComponent = (props: any) => {
  const { input } = useFieldApi({
    name: props.name,
    type: 'checkbox',
    value: props.value,
  });
  return <MagmaCheckbox {...props} {...input} />;
};

export const CheckboxMapping: FunctionComponent = (props: any) => {
  const {
    input,
    options,
    validateOnMount,
    showError,
    meta: { error, submitFailed },
    ...rest
  } = useFieldApi(props);
  const name = input.name || uuidv4();

  const errorMessage =
    ((validateOnMount || submitFailed || showError) && error) ||
    rest.errorMessage;

  if (options && options.length > 0) {
    return (
      <FormGroup
        // name={name}
        errorMessage={errorMessage}
        {...rest}
      >
        {options.map((option: CheckboxProps) => {
          return (
            <GroupedCheckbox
              name={name}
              {...option}
              key={option.value?.toString()}
            />
          );
        })}
      </FormGroup>
    );
  } else {
    return (
      <MagmaCheckbox
        {...input}
        name={name}
        labelText={rest.labelText}
        errorMessage={errorMessage}
        {...rest}
      />
    );
  }
};

export const Checkbox = memo(CheckboxMapping);
