import * as React from 'react';
import {
  useSelect,
  useMultipleSelection,
  UseSelectProps,
  UseMultipleSelectionProps,
} from 'downshift';

import { Select as InternalSelect } from './Select';
import { MultiSelect } from './MultiSelect';
import { InputMessage } from '../Input/InputMessage';
import { SelectComponents } from './components';
import { useGenerateId } from '../../utils';

export type SelectOptions =
  | string
  | { value: string; label: string; [key: string]: any }
  | any;

export interface InternalSelectInterface {
  components?: SelectComponents;
  containerStyle?: React.CSSProperties;
  errorMessage?: React.ReactNode;
  helperMessage?: React.ReactNode;
  inputStyle?: React.CSSProperties;
  isClearable?: boolean;
  disabled?: boolean;
  isInverse?: boolean;
  isLabelVisuallyHidden?: boolean;
  isMulti?: boolean;
  labelStyle?: React.CSSProperties;
  labelText: string;
  menuStyle?: React.CSSProperties;
  messageStyle?: React.CSSProperties;
  name?: string;
  placeholder?: string;
  testId?: string;
}

export interface InternalMultiInterface<T> {
  onRemoveSelectedItem?: (removedItem: T) => void;
}

export interface SelectInterface<T extends SelectOptions>
  extends UseSelectProps<T>,
    InternalSelectInterface {
  ariaDescribedBy?: string;
  hasError?: boolean;
  innerRef?: React.Ref<HTMLButtonElement>;
  onBlur?: (event: React.FocusEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onKeyPress?: (event: React.KeyboardEvent) => void;
  onKeyUp?: (event: React.KeyboardEvent) => void;
}

export interface MultiSelectInterface<T extends SelectOptions>
  extends UseMultipleSelectionProps<T>,
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
    helperMessage,
    testId,
  } = props;

  function itemToString(item: T) {
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
    <div style={containerStyle} data-testid={testId}>
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
        hasError={hasError}
        style={messageStyle}
      >
        {(errorMessage || helperMessage) && (
          <>{errorMessage ? errorMessage : helperMessage}</>
        )}
      </InputMessage>
    </div>
  );
}
