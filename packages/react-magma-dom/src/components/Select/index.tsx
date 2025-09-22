import * as React from 'react';

import {
  useMultipleSelection,
  UseMultipleSelectionProps,
  useSelect,
  UseSelectProps,
} from 'downshift';

import { useIsInverse } from '../../inverse';
import { Omit, useGenerateId, XOR } from '../../utils';
import { LabelPosition } from '../Label';
import { SelectComponents } from './components';
import { MultiSelect } from './MultiSelect';
import { Select as InternalSelect } from './Select';

export type SelectOptions =
  | string
  | { value: string; label: string; [key: string]: any; disabled?: boolean }
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
   * Max-height for the item menu list ul element
   */
  itemListMaxHeight?: number | string;
  /**
   * If true, item will be disabled; it will appear dimmed and events will not fire
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, the component will have inverse styling to better appear on a dark background
   * @default false
   */
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
   * Position of text label relative to form field
   */
  labelPosition?: LabelPosition;
  /**
   * If the labelPosition value is 'left' then Input labels have a specified width in percentage, otherwise no width is set.
   */
  labelWidth?: number;
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
  /**
   * @internal
   */
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
   * Content above the select. For use with Icon Buttons to relay information.
   */
  additionalContent?: React.ReactNode;
  /**
   * Id of the element that describes the select trigger button
   */
  ariaDescribedBy?: string;
  /**
   * @internal
   */
  floatingElementStyles?: React.CSSProperties;
  /**
   * @internal
   */
  hasError?: boolean;
  /**
   * Reference to the trigger button element in the select
   */
  innerRef?: React.Ref<HTMLButtonElement>;
  /**
   * @internal
   */
  isMulti?: false;
  /**
   * Index of the item that should be highlighted by default. Use this prop when you want to set a specific item on the list to be highlighted when the component is first rendered.
   */
  initialHighlightedIndex?: number;
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
  /**
   * @internal
   */
  setFloating?: (node: ReferenceType) => void;
  /**
   * @internal
   */
  setReference?: (node: ReferenceType) => void;
}

export interface MultiSelectProps<T extends SelectOptions>
  extends UseMultipleSelectionProps<T>,
    Omit<SelectProps<T>, 'onStateChange' | 'stateReducer' | 'isMulti'>,
    InternalMultiProps<T> {
  /**
   * @internal
   */
  hasError?: boolean;
  /**
   * @internal
   */
  isInverse?: boolean;
  /**
   * @internal
   */
  isMulti: true;
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

export function instanceOfToBeCreatedItemObject(object: any): object is {
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

export function instanceOfItemWithOptionalDisabled(
  object: any
): object is { label: string; value: string; disabled?: boolean } {
  return typeof object !== 'string' && object && 'disabled' in object;
}

export type XORSelectProps<T> = XOR<SelectProps<T>, MultiSelectProps<T>>;

export const SelectStateChangeTypes = useSelect.stateChangeTypes;
export const MultipleSelectionStateChangeTypes =
  useMultipleSelection.stateChangeTypes;

export function Select<T>(props: XORSelectProps<T>) {
  const {
    containerStyle,
    id: defaultId,
    isMulti,
    labelPosition,
    labelWidth,
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

  const isInverse = useIsInverse(props.isInverse);

  const { floatingStyles, refs } = useFloating({
    middleware: [flip()],
    placement: 'bottom-start' as AlignedPlacement,
    whileElementsMounted: autoUpdate,
  });

  const floatingElementStyles = { ...floatingStyles, width: '100%' };

  return (
    <div style={containerStyle} data-testid={testId}>
      {isMulti && instanceOfMultiSelect<T>(props) ? (
        <MultiSelect
          ariaDescribedBy={descriptionId}
          hasError={hasError}
          id={id}
          isInverse={isInverse}
          itemToString={itemToString}
          labelPosition={labelPosition || LabelPosition.top}
          labelWidth={labelWidth}
          {...(props as MultiSelectProps<T>)}
        />
      ) : (
        <InternalSelect
          ariaDescribedBy={descriptionId}
          errorMessage={errorMessage}
          hasError={hasError}
          helperMessage={helperMessage}
          id={id}
          isInverse={isInverse}
          itemToString={itemToString}
          labelPosition={labelPosition || LabelPosition.top}
          labelWidth={labelWidth}
          messageStyle={messageStyle}
          setFloating={refs.setFloating}
          setReference={refs.setReference}
          {...(props as SelectProps<T>)}
        />
      )}
    </div>
  );
}
