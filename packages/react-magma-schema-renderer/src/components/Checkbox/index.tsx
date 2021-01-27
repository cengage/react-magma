import React from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
import { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer';
import { v4 as uuidv4 } from 'uuid';
import {
  Checkbox as MagmaCheckbox,
  CheckboxProps as MagmaCheckboxProps,
  FormGroup,
  FormGroupProps as MagmaFormGroupProps,
} from 'react-magma-dom';

interface MagmaMultiCheckboxProps extends MagmaFormGroupProps {
  options: MagmaCheckboxProps[];
}

type CheckboxProps = MagmaCheckboxProps & UseFieldApiConfig;
type MultiCheckboxProps = MagmaMultiCheckboxProps & UseFieldApiConfig;

const GroupedCheckbox: React.FunctionComponent<CheckboxProps> = props => {
  const { input } = useFieldApi({
    name: props.name,
    type: 'checkbox',
    value: props.value,
  });
  return <MagmaCheckbox {...props} {...input} />;
};

export const CheckboxMapping: React.FunctionComponent<MultiCheckboxProps> = props => {
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
      <FormGroup errorMessage={errorMessage} {...rest}>
        {options.map((option: MagmaCheckboxProps) => {
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

export const Checkbox = React.memo(CheckboxMapping);
