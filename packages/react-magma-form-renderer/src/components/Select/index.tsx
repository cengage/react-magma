import React, { FunctionComponent, memo } from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';

import { v4 as uuidv4 } from 'uuid';
import { Select as MagmaSelect } from 'react-magma-dom';

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

const SelectMapping: FunctionComponent = (props: any) => {
  const {
    input,
    validateOnMount,
    showError,
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
      items={rest.items}
      errorMessage={errorMessage}
      labelText={rest.labelText}
      {...rest}
    />
  );
};

export const Select = memo(SelectMapping);
