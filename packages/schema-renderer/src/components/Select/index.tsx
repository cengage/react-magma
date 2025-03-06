import * as React from 'react';

import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import { Select as MagmaSelect } from 'react-magma-dom';
import { v4 as uuidv4 } from 'uuid';

interface SelectOption {
  label: string;
  value: string;
  name: string;
}

interface SelectOptionEvent {
  selectedItem: SelectOption;
}

interface MultiSelectOptionEvent {
  selectedItems: SelectOption[];
}

const SelectMapping = (props: any) => {
  const {
    input,
    validateOnMount,
    showError,
    options,
    type,
    meta: { error, submitFailed },
    ...rest
  } = useFieldApi(props);
  const name = input.name || uuidv4();
  const errorMessage =
    ((validateOnMount || submitFailed || showError) && error) || '';

  if (rest.isMulti) {
    rest.onSelectedItemsChange = (evt: MultiSelectOptionEvent) => {
      input.onChange(evt.selectedItems.map(item => item.value));
    };
  } else {
    rest.onSelectedItemChange = (evt: SelectOptionEvent) => {
      input.onChange(evt.selectedItem.value);
    };
  }

  return (
    <MagmaSelect
      id={name}
      items={options.map(({ labelText, ...rest }: { labelText: string }) => {
        return { label: labelText, ...rest };
      })}
      errorMessage={errorMessage}
      labelText={rest.labelText}
      {...rest}
    />
  );
};

export const Select = React.memo(SelectMapping);
