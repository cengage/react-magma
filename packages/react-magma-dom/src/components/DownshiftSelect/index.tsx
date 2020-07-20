import * as React from 'react';
import { UseSelectProps, UseComboboxProps, UseComboboxState } from 'downshift';
import { XOR } from '../../utils';

import { Select } from './Select';
import { Combobox } from './Combobox';
import { InputMessage } from '../Input/InputMessage';
import { DownshiftComponents } from './components';

type DownshiftOption<T> =
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
  messageStyle?: React.CSSProperties;
}

export interface DownshiftSelectInterface<T>
  extends UseSelectProps<DownshiftOption<T>>,
    InternalSelectInterface {
  type?: 'select';
}

export interface DownshiftComboboxInterface<T>
  extends UseComboboxProps<DownshiftOption<T>>,
    InternalSelectInterface {
  defaultItems: DownshiftOption<T>[];
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

export type SelectInterface<T> = XOR<
  DownshiftSelectInterface<T>,
  DownshiftComboboxInterface<T>
>;

export function instanceOfCombobox<T>(
  object: any
): object is DownshiftComboboxInterface<T> {
  return 'type' in object && object.type === 'combo';
}

export function instanceOfDefaultItemObject(
  object: any
): object is { label: string; value: string; [key: string]: any } {
  return object && 'label' in object;
}

export function DownshiftSelect<T>(props: SelectInterface<T>) {
  const { isInverse, errorMessage, messageStyle, helperMessage } = props;

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
        <Combobox itemToString={itemToString} {...props} />
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
