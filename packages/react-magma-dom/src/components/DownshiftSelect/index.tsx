import * as React from 'react';
import { UseSelectProps, UseComboboxProps } from 'downshift';
import { XOR } from '../../utils';

import { Select } from './Select';
import { Combobox } from './Combobox';
import { InputMessage } from '../Input/InputMessage';

export type DownshiftOption = string;

interface InternalSelectInterface {
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
  return (
    <>
      {instanceOfCombobox(props) ? (
        <Combobox {...props} />
      ) : (
        <Select {...props} />
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
