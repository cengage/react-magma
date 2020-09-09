import React from 'react';
import {
  useCombobox,
  UseComboboxProps,
  UseComboboxState,
  UseMultipleSelectionProps
} from 'downshift';
import {
  Option,
  instanceOfDefaultItemObject,
  InternalSelectInterface,
  InternalMultiInterface
} from '../Select';
import { InternalCombobox } from './Combobox';
import { MultiCombobox } from './MultiCombobox';
import { InputMessage } from '../Input/InputMessage';
import { useGenerateId } from '../../utils';

export interface ComboboxInterface<T>
  extends UseComboboxProps<Option<T>>,
    InternalSelectInterface {
  ariaDescribedBy?: string;
  defaultItems?: Option<T>[];
  disableCreateItem?: boolean;
  hasError?: boolean;
  isLoading?: boolean;
  newItemTransform?: (item: { label: string; value: string }) => Option<T>;
  onInputBlur?: (event: React.FocusEvent) => void;
  onInputChange?: (changes: Partial<UseComboboxState<Option<T>>>) => void;
  onInputFocus?: (event: React.FocusEvent) => void;
  onInputKeyDown?: (event: React.KeyboardEvent) => void;
  onInputKeyPress?: (event: React.KeyboardEvent) => void;
  onInputKeyUp?: (event: React.KeyboardEvent) => void;
  onInputValueChange?: (
    changes: Partial<UseComboboxState<Option<T>>>,
    updateInputItems?: React.Dispatch<React.SetStateAction<Option<T>[]>>
  ) => void;
  onItemCreated?: (newItem: Option<T>) => void;
  placeholder?: string;
}

export interface MultiComboboxInterface<T>
  extends UseMultipleSelectionProps<Option<T>>,
    Omit<ComboboxInterface<T>, 'onStateChange' | 'stateReducer'>,
    InternalMultiInterface<T> {
  ariaDescribedBy?: string;
  hasError?: boolean;
  isInverse?: boolean;
}

export function instanceOfMultiCombobox<T>(
  object: any
): object is MultiComboboxInterface<T> {
  return 'isMulti' in object;
}

export const ComboboxStateChangeTypes = useCombobox.stateChangeTypes;

export function Combobox<T>(props: ComboboxInterface<T>) {
  const {
    containerStyle,
    errorMessage,
    id: defaultId,
    isInverse,
    isMulti,
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
      {isMulti && instanceOfMultiCombobox<T>(props) ? (
        <MultiCombobox
          ariaDescribedBy={descriptionId}
          itemToString={itemToString}
          {...props}
          hasError={hasError}
        />
      ) : (
        <InternalCombobox
          ariaDescribedBy={descriptionId}
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
