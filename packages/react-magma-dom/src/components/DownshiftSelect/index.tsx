import * as React from 'react';
import {
  UseSelectProps,
  UseComboboxProps,
  UseComboboxState,
  UseMultipleSelectionProps
} from 'downshift';
import { XOR } from '../../utils';

import { Select } from './Select';
import { MultiSelect } from './MultiSelect';
import { Combobox } from './Combobox';
import { InputMessage } from '../Input/InputMessage';
import { DownshiftComponents } from './components';
import { MultiCombobox } from './MultiCombobox';

export type DownshiftOption<T> =
  | string
  | { value: string; label: string; [key: string]: any }
  | T;

interface InternalSelectInterface {
  components?: DownshiftComponents;
  errorMessage?: React.ReactNode;
  helperMessage?: React.ReactNode;
  labelText: string;
  isClearable?: boolean;
  isDisabled?: boolean;
  isInverse?: boolean;
  isMulti?: boolean;
  messageStyle?: React.CSSProperties;
}

interface InternalMultiInterface<T> {
  onRemoveSelectedItem?: (removedItem: DownshiftOption<T>) => void;
}

export interface DownshiftSelectInterface<T>
  extends UseSelectProps<DownshiftOption<T>>,
    InternalSelectInterface {
  type?: 'select';
}

export interface DownshiftComboboxInterface<T>
  extends UseComboboxProps<DownshiftOption<T>>,
    InternalSelectInterface {
  defaultItems?: DownshiftOption<T>[];
  disableCreateItem?: boolean;
  isLoading?: boolean;
  newItemTransform?: (item: {
    label: string;
    value: string;
  }) => DownshiftOption<T>;
  onInputChange?: (
    changes: Partial<UseComboboxState<DownshiftOption<T>>>
  ) => void;
  onInputValueChange?: (
    changes: Partial<UseComboboxState<DownshiftOption<T>>>,
    updateInputItems?: React.Dispatch<
      React.SetStateAction<DownshiftOption<T>[]>
    >
  ) => void;
  onItemCreated?: (newItem: DownshiftOption<T>) => void;
  type: 'combo';
}

export interface DownshiftMultiSelectInterface<T>
  extends UseMultipleSelectionProps<DownshiftOption<T>>,
    Omit<DownshiftSelectInterface<T>, 'onStateChange' | 'stateReducer'>,
    InternalMultiInterface<T> {}

export interface DownshiftMultiComboboxInterface<T>
  extends UseMultipleSelectionProps<DownshiftOption<T>>,
    Omit<DownshiftComboboxInterface<T>, 'onStateChange' | 'stateReducer'>,
    InternalMultiInterface<T> {}

export type SelectInterface<T> = XOR<
  DownshiftSelectInterface<T>,
  DownshiftComboboxInterface<T>
>;

export function instanceOfCombobox<T>(
  object: any
): object is DownshiftComboboxInterface<T> {
  return 'type' in object && object.type === 'combo';
}

export function instanceOfMultiSelect<T>(
  object: any
): object is DownshiftMultiSelectInterface<T> {
  return 'isMulti' in object && object.type !== 'combo';
}

export function instanceOfMultiCombobox<T>(
  object: any
): object is DownshiftMultiComboboxInterface<T> {
  return 'isMulti' in object && object.type === 'combo';
}

export function instanceOfDefaultItemObject(
  object: any
): object is { label: string; value: string; [key: string]: any } {
  return object && 'label' in object;
}

export function instanceOfToBeCreatedItemObject(
  object: any
): object is {
  label: string;
  value: string;
  react_magma__created_item: boolean;
} {
  return (
    typeof object !== 'string' &&
    object &&
    'react_magma__created_item' in object
  );
}

// TODO: Focus events for everything
// TODO: Need documentation on how to migrate from react-select to this select
// TODO: Rename react-select to LegacySelect

export function DownshiftSelect<T>(props: SelectInterface<T>) {
  const {
    isInverse,
    isMulti,
    errorMessage,
    messageStyle,
    helperMessage
  } = props;

  function itemToString(item: DownshiftOption<T>) {
    return item && typeof item === 'string'
      ? item
      : item && instanceOfDefaultItemObject(item)
      ? item.label
      : '';
  }

  return (
    <>
      {instanceOfCombobox<T>(props) ? (
        isMulti && instanceOfMultiCombobox<T>(props) ? (
          <MultiCombobox itemToString={itemToString} {...props} />
        ) : (
          <Combobox itemToString={itemToString} {...props} />
        )
      ) : isMulti && instanceOfMultiSelect<T>(props) ? (
        <MultiSelect itemToString={itemToString} {...props} />
      ) : (
        <Select itemToString={itemToString} {...props} />
      )}
      <InputMessage
        isInverse={isInverse}
        isError={!!errorMessage}
        style={messageStyle}
      >
        {(errorMessage || helperMessage) && (
          <>{errorMessage ? errorMessage : helperMessage}</>
        )}
      </InputMessage>
    </>
  );
}
