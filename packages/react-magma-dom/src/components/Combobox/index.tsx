import React from 'react';
import {
  UseComboboxProps,
  UseComboboxState,
  UseMultipleSelectionProps
} from 'downshift';
import {
  DownshiftOption,
  instanceOfDefaultItemObject,
  InternalSelectInterface,
  InternalMultiInterface
} from '../DownshiftSelect';
import { InternalCombobox } from './Combobox';
import { MultiCombobox } from './MultiCombobox';
import { InputMessage } from '../Input/InputMessage';
import { useGenerateId } from '../../utils';

export interface DownshiftComboboxInterface<T>
  extends UseComboboxProps<DownshiftOption<T>>,
    InternalSelectInterface {
  ariaDescribedBy?: string;
  defaultItems?: DownshiftOption<T>[];
  disableCreateItem?: boolean;
  hasError?: boolean;
  isLoading?: boolean;
  newItemTransform?: (item: {
    label: string;
    value: string;
  }) => DownshiftOption<T>;
  onInputBlur?: (event: React.FocusEvent) => void;
  onInputChange?: (
    changes: Partial<UseComboboxState<DownshiftOption<T>>>
  ) => void;
  onInputFocus?: (event: React.FocusEvent) => void;
  onInputKeyDown?: (event: React.KeyboardEvent) => void;
  onInputKeyPress?: (event: React.KeyboardEvent) => void;
  onInputKeyUp?: (event: React.KeyboardEvent) => void;
  onInputValueChange?: (
    changes: Partial<UseComboboxState<DownshiftOption<T>>>,
    updateInputItems?: React.Dispatch<
      React.SetStateAction<DownshiftOption<T>[]>
    >
  ) => void;
  onItemCreated?: (newItem: DownshiftOption<T>) => void;
}

export interface DownshiftMultiComboboxInterface<T>
  extends UseMultipleSelectionProps<DownshiftOption<T>>,
    Omit<DownshiftComboboxInterface<T>, 'onStateChange' | 'stateReducer'>,
    InternalMultiInterface<T> {
  ariaDescribedBy?: string;
  hasError?: boolean;
  isInverse?: boolean;
}

export function instanceOfMultiCombobox<T>(
  object: any
): object is DownshiftMultiComboboxInterface<T> {
  return 'isMulti' in object;
}

// ON BLUR REMOVING SELECTED ITEMS WHEN SELECTED WITH MOUSE

export function Combobox<T>(props: DownshiftComboboxInterface<T>) {
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
    </>
  );
}
