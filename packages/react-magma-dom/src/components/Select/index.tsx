import * as React from 'react';
import {
  useSelect,
  useMultipleSelection,
  UseSelectProps,
  UseMultipleSelectionProps
} from 'downshift';

import { Select as InternalSelect } from './Select';
import { MultiSelect } from './MultiSelect';
import { InputMessage } from '../Input/InputMessage';
import { SelectComponents } from './components';
import { useGenerateId } from '../../utils';

export type Option<T> =
  | string
  | { value: string; label: string; [key: string]: any }
  | T;

export interface InternalSelectInterface {
  components?: SelectComponents;
  containerStyle?: React.CSSProperties;
  errorMessage?: React.ReactNode;
  helperMessage?: React.ReactNode;
  inputStyle?: React.CSSProperties;
  isClearable?: boolean;
  isDisabled?: boolean;
  isInverse?: boolean;
  isLabelVisuallyHidden?: boolean;
  isMulti?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: string;
  messageStyle?: React.CSSProperties;
}

export interface InternalMultiInterface<T> {
  onRemoveSelectedItem?: (removedItem: Option<T>) => void;
}

export interface SelectInterface<T>
  extends UseSelectProps<Option<T>>,
    InternalSelectInterface {
  ariaDescribedBy?: string;
  hasError?: boolean;
  onBlur?: (event: React.FocusEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onKeyPress?: (event: React.KeyboardEvent) => void;
  onKeyUp?: (event: React.KeyboardEvent) => void;
}

export interface MultiSelectInterface<T>
  extends UseMultipleSelectionProps<Option<T>>,
    Omit<SelectInterface<T>, 'onStateChange' | 'stateReducer'>,
    InternalMultiInterface<T> {
  hasError?: boolean;
  isInverse?: boolean;
}

export function instanceOfMultiSelect<T>(
  object: any
): object is MultiSelectInterface<T> {
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

export const SelectStateChangeTypes = useSelect.stateChangeTypes;
export const MultipleSelectionStateChangeTypes =
  useMultipleSelection.stateChangeTypes;

export function Select<T>(props: SelectInterface<T>) {
  const {
    containerStyle,
    id: defaultId,
    isInverse,
    isMulti,
    errorMessage,
    messageStyle,
    helperMessage
  } = props;

  function itemToString(item: Option<T>) {
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
    <div style={containerStyle}>
      {isMulti && instanceOfMultiSelect<T>(props) ? (
        <MultiSelect
          ariaDescribedBy={descriptionId}
          id={id}
          itemToString={itemToString}
          {...props}
          hasError={hasError}
        />
      ) : (
        <InternalSelect
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
    </div>
  );
}
