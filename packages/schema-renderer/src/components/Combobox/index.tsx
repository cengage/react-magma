import { useRef, useState, memo } from 'react';
import { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer';
import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import { v4 as uuidv4 } from 'uuid';
import { Combobox as MagmaCombobox } from 'react-magma-dom';
import { XORComboboxProps as MagmaComboboxProps } from 'react-magma-dom/dist/components/Combobox';

export type ComboboxProps = MagmaComboboxProps<ComboOption> & UseFieldApiConfig;

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

const ComboboxMapping = (props: ComboboxProps) => {
  const {
    input,
    validateOnMount,
    showError,
    type,
    options,
    meta: { error, submitFailed },
    ...rest
  } = useFieldApi(props);
  const name = input.name || uuidv4();
  const errorMessage =
    ((validateOnMount || submitFailed || showError) && error) || '';
  const innerRef = useRef<HTMLInputElement>(null);

  const [items, updateItems] = useState(
    options.map(({ labelText, ...rest }: { labelText: string }) => {
      return { label: labelText, ...rest };
    })
  );

  const newItemTransform = ({ value }: { value: string }) => {
    return {
      label: value,
      value: value.toLowerCase(),
    };
  };

  const onItemCreated = (item: any) => {
    updateItems([...items, item]);
    input.onChange(item.value);
  };

  if (rest.isMulti) {
    rest.onSelectedItemsChange = (evt: MultiComboOptionEvent) => {
      input.onChange(evt.selectedItems.map(item => item.value));
    };
    rest.selectedItems = items.filter((item: { value: string }) =>
      input.value.includes(item.value)
    );
  } else {
    rest.onSelectedItemChange = (evt: ComboOptionEvent) => {
      input.onChange(evt.selectedItem.value);
    };
    rest.selectedItem = items
      .filter((item: { value: string }) => item.value === input.value)
      .pop();
  }

  return (
    <MagmaCombobox
      {...input}
      id={name}
      innerRef={innerRef}
      items={items}
      newItemTransform={newItemTransform}
      onItemCreated={onItemCreated}
      errorMessage={errorMessage}
      labelText={rest.labelText}
      {...rest}
    />
  );
};

export const Combobox = memo(ComboboxMapping);
