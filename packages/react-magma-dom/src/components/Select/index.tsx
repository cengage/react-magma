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

export interface InternalSelectProps<T> {
  /**
   * This complex object includes all the compositional components that are used. If you wish to overwrite a component, pass in a component to the appropriate namespace
   */
  components?: SelectComponents<T>;
  /**
   * Style properties for the component container
   */
  containerStyle?: React.CSSProperties;
  /**
   * Content of the error message. If a value is provided, the component will be styled to show an error state
   */
  errorMessage?: React.ReactNode;
  /**
   * Content of the helper message
   */
  helperMessage?: React.ReactNode;
  /**
   * Style properties for the select trigger or combobox input
   */
  inputStyle?: React.CSSProperties;
  /**
   * If true, the component include a button for clearing the field
   * @default false
   */
  isClearable?: boolean;
  /**
   * If true, item will be disabled; it will appear dimmed and events will not fire
   * @default false
   */
  disabled?: boolean;
  isInverse?: boolean;
  /**
   * If true, label text will be hidden visually, but will still be read by assistive technology
   * @default false
   */
  isLabelVisuallyHidden?: boolean;
  /**
   * If true, multiple items may be selected
   * @default false
   */
  isMulti?: boolean;
  /**
   * Style properties for the label
   */
  labelStyle?: React.CSSProperties;
  /**
   * Text for label
   */
  labelText: string;
  /**
   * Style properties for the items menu
   */
  menuStyle?: React.CSSProperties;
  /**
   * Style properties for the helper or error message
   */
  messageStyle?: React.CSSProperties;
  /**
   * Text for select trigger button or combobox input placeholder
   */
  placeholder?: string;
  testId?: string;
}

export interface InternalMultiProps<T> {
  /**
   * Event that fires when the clear button is clicked on a multi-selected item
   */
  onRemoveSelectedItem?: (removedItem: T) => void;
}

export interface SelectProps<T extends SelectOptions>
  extends UseSelectProps<T>,
    InternalSelectProps<T> {
  /**
   * Id of the element that describes the select trigger button
   */
  ariaDescribedBy?: string;
  /**
   * @internal
   */
  hasError?: boolean;
  /**
   * Reference to the trigger button element in the select
   */
  innerRef?: React.Ref<HTMLButtonElement>;
  /**
   * Event that fires when the trigger button loses focus
   */
  onBlur?: (event: React.FocusEvent) => void;
  /**
   * Event that fires when the trigger button gains focus
   */
  onFocus?: (event: React.FocusEvent) => void;
  /**
   * Event that fires when the trigger button receives keypress
   */
  onKeyDown?: (event: React.KeyboardEvent) => void;
  /**
   * Event that will fire when a character is typed while focused on the trigger button
   */
  onKeyPress?: (event: React.KeyboardEvent) => void;
  /**
   * Event that will fire when a keypress is released while focused on the trigger button
   */
  onKeyUp?: (event: React.KeyboardEvent) => void;
}

export interface MultiSelectProps<T extends SelectOptions>
  extends UseMultipleSelectionProps<T>,
    Omit<SelectProps<T>, 'onStateChange' | 'stateReducer'>,
    InternalMultiProps<T> {
  /**
   * @internal
   */
  hasError?: boolean;
  isInverse?: boolean;
}

export function instanceOfMultiSelect<T>(
  object: any
): object is MultiSelectProps<T> {
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

export function Select<T>(props: SelectProps<T>) {
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
