import * as React from 'react';
import { UseSelectProps, UseMultipleSelectionProps } from 'downshift';

import { Select } from './Select';
import { MultiSelect } from './MultiSelect';
import { InputMessage } from '../Input/InputMessage';
import { DownshiftComponents } from './components';
import { useGenerateId } from '../../utils';

export type DownshiftOption<T> =
  | string
  | { value: string; label: string; [key: string]: any }
  | T;

export interface InternalSelectInterface {
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

export interface InternalMultiInterface<T> {
  onRemoveSelectedItem?: (removedItem: DownshiftOption<T>) => void;
}

export interface DownshiftSelectInterface<T>
  extends UseSelectProps<DownshiftOption<T>>,
    InternalSelectInterface {
  ariaDescribedBy?: string;
  hasError?: boolean;
  onBlur?: (event: React.FocusEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onKeyPress?: (event: React.KeyboardEvent) => void;
  onKeyUp?: (event: React.KeyboardEvent) => void;
}

export interface DownshiftMultiSelectInterface<T>
  extends UseMultipleSelectionProps<DownshiftOption<T>>,
    Omit<DownshiftSelectInterface<T>, 'onStateChange' | 'stateReducer'>,
    InternalMultiInterface<T> {
  hasError?: boolean;
  isInverse?: boolean;
}

export function instanceOfMultiSelect<T>(
  object: any
): object is DownshiftMultiSelectInterface<T> {
  return 'isMulti' in object && object.type !== 'combo';
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

// TODO: Need documentation on how to migrate from react-select to this select
// TODO: Rename react-select to LegacySelect

export function DownshiftSelect<T>(props: DownshiftSelectInterface<T>) {
  const {
    id: defaultId,
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

  const hasError = !!errorMessage;

  const id = useGenerateId(defaultId);

  const descriptionId = errorMessage || helperMessage ? `${id}__desc` : null;

  return (
    <>
      {isMulti && instanceOfMultiSelect<T>(props) ? (
        <MultiSelect
          ariaDescribedBy={descriptionId}
          id={id}
          itemToString={itemToString}
          {...props}
          hasError={hasError}
          isInverse={isInverse}
        />
      ) : (
        <Select
          ariaDescribedBy={descriptionId}
          id={id}
          itemToString={itemToString}
          {...props}
          hasError={hasError}
        />
      )}
      <InputMessage
        id={descriptionId}
        isInverse={isInverse}
        isError={hasError}
        style={messageStyle}
      >
        {(errorMessage || helperMessage) && (
          <>{errorMessage ? errorMessage : helperMessage}</>
        )}
      </InputMessage>
    </>
  );
}
