import React, { FunctionComponent, memo } from 'react';
import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';

import { v4 as uuidv4 } from 'uuid';
import { Combobox as MagmaCombobox } from 'react-magma-dom';

interface ComboOption {
  label: string;
  value: string;
  name: string;
}

interface ComboOptionEvent {
  selectedItem: ComboOption;
}

interface MultiComboOptionEvent {
  selectedItems: ComboOption[];
}

const ComboboxMapping: FunctionComponent = (props: any) => {
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
  const innerRef = React.useRef<HTMLInputElement>(null);

  if (rest.isMulti) {
    rest.onSelectedItemsChange = (evt: MultiComboOptionEvent) => {
      input.onChange(evt.selectedItems.map(item => item.value));
    };
  } else {
    rest.onSelectedItemChange = (evt: ComboOptionEvent) => {
      input.onChange(evt.selectedItem.value);
    };
  }

  return (
    <MagmaCombobox
      {...input}
      id={name}
      innerRef={innerRef}
      errorMessage={errorMessage}
      labelText={rest.labelText}
      {...rest}
    />
  );
};

export const Combobox = memo(ComboboxMapping);
