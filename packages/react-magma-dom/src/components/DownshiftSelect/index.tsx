import * as React from 'react';
import { UseSelectProps, UseComboboxProps, UseComboboxState } from 'downshift';
import { XOR } from '../../utils';

import { Select } from './Select';
import { Combobox } from './Combobox';
import { InputMessage } from '../Input/InputMessage';
import { DownshiftComponents } from './components';

export type DownshiftOption = string | { item: string; label: string };

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

export interface DownshiftSelectInterface
  extends UseSelectProps<DownshiftOption>,
    InternalSelectInterface {
  type?: 'select';
}

export interface DownshiftComboboxInterface
  extends UseComboboxProps<DownshiftOption>,
    InternalSelectInterface {
  isLoading?: boolean;
  onInputChange?: (changes: Partial<UseComboboxState<DownshiftOption>>) => void;
  onInputValueChange?: (
    changes: Partial<UseComboboxState<DownshiftOption>>,
    updateInputItems?: React.Dispatch<React.SetStateAction<DownshiftOption[]>>
  ) => void;
  type: 'combo';
}

export type SelectInterface = XOR<
  DownshiftSelectInterface,
  DownshiftComboboxInterface
>;

export function instanceOfCombobox(
  object: any
): object is DownshiftComboboxInterface {
  return 'type' in object && object.type === 'combo';
}

export const DownshiftSelect = (props: SelectInterface) => {
  const { isInverse, errorMessage, messageStyle, helperMessage } = props;

  function itemToString(item: DownshiftOption) {
    return item && typeof item === 'string'
      ? item
      : item && typeof item === 'object'
      ? item.label
      : '';
  }

  return (
    <>
      {instanceOfCombobox(props) ? (
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
};
