import React from 'react';
import {
  useCombobox,
  UseComboboxProps,
  UseComboboxState,
  UseMultipleSelectionProps,
} from 'downshift';
import {
  SelectOptions,
  instanceOfDefaultItemObject,
  InternalSelectInterface,
  InternalMultiInterface,
} from '../Select';
import { InternalCombobox } from './Combobox';
import { MultiCombobox } from './MultiCombobox';
import { InputMessage } from '../Input/InputMessage';
import { useGenerateId } from '../../utils';

export interface ComboboxInterface<T extends SelectOptions>
  extends Omit<UseComboboxProps<T>, 'items'>,
    InternalSelectInterface {
  ariaDescribedBy?: string;
  defaultItems?: T[];
  disableCreateItem?: boolean;
  hasError?: boolean;
  innerRef?: React.Ref<HTMLInputElement>;
  isLoading?: boolean;
  items?: T[];
  newItemTransform?: (item: { label: string; value: string }) => T;
  onInputBlur?: (event: React.FocusEvent) => void;
  onInputChange?: (changes: Partial<UseComboboxState<T>>) => void;
  onInputFocus?: (event: React.FocusEvent) => void;
  onInputKeyDown?: (event: React.KeyboardEvent) => void;
  onInputKeyPress?: (event: React.KeyboardEvent) => void;
  onInputKeyUp?: (event: React.KeyboardEvent) => void;
  onInputValueChange?: (
    changes: Partial<UseComboboxState<T>>,
    updateInputItems?: React.Dispatch<React.SetStateAction<T[]>>
  ) => void;
  onItemCreated?: (newItem: T) => void;
  placeholder?: string;
  toggleButtonRef?: React.Ref<HTMLButtonElement>;
}

export interface MultiComboboxInterface<T extends SelectOptions>
  extends UseMultipleSelectionProps<T>,
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
