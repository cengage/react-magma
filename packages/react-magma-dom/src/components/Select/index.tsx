import * as React from 'react';
import {
  useMultipleSelection,
  UseMultipleSelectionProps,
  useSelect,
  UseSelectProps,
} from 'downshift';
import { autoUpdate, flip, useFloating } from '@floating-ui/react-dom';
import { ReferenceType } from '@floating-ui/react-dom/dist/floating-ui.react-dom';
import { Select as InternalSelect } from './Select';
import { MultiSelect } from './MultiSelect';
import { SelectComponents } from './components';
import { Omit, useGenerateId, XOR } from '../../utils';
import { LabelPosition } from '../Label';
import { useIsInverse } from '../../inverse';

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
   * Positioning styles to apply to the floating element
   */
  floatingStyles?: React.CSSProperties;
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
   * Callback to set the floating element (reactive).
   */
  setFloating?: (node: ReferenceType) => void;
  /**
   * Callback to set the reference element (reactive).
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
    whileElementsMounted: autoUpdate,
  });

  const customFloatingStyles = { ...floatingStyles, width: '100%' };

  return (
    <div style={containerStyle} data-testid={testId}>
      {isMulti && instanceOfMultiSelect<T>(props) ? (
        <MultiSelect
          ariaDescribedBy={descriptionId}
          floatingStyles={customFloatingStyles}
          hasError={hasError}
          id={id}
          isInverse={isInverse}
          itemToString={itemToString}
          labelPosition={labelPosition || LabelPosition.top}
          labelWidth={labelWidth}
          setFloating={refs.setFloating}
          setReference={refs.setReference}
          {...(props as MultiSelectProps<T>)}
        />
      ) : (
        <InternalSelect
          ariaDescribedBy={descriptionId}
          errorMessage={errorMessage}
          floatingStyles={customFloatingStyles}
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
