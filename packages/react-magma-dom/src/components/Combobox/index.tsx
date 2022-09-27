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
  InternalSelectProps,
  InternalMultiProps,
} from '../Select';
import { InternalCombobox } from './Combobox';
import { MultiCombobox } from './MultiCombobox';
import { useGenerateId, XOR, Omit } from '../../utils';
import { LabelPosition } from '../Label';
import { useIsInverse } from '../../inverse';

export interface ComboboxProps<T extends SelectOptions>
  extends Omit<UseComboboxProps<T>, 'items'>,
    InternalSelectProps<T> {
  /**
   * Id of the element that describes the combobox input
   */
  ariaDescribedBy?: string;
  /**
   * Default selectable options. Allows for uncontrolled component and internal creation of items. Can be an array of strings or objects
   */
  defaultItems?: T[];
  /**
   * If true, the new items cannot be created by typing in the text field
   * @default false
   */
  disableCreateItem?: boolean;
  /**
   * @internal
   */
  hasError?: boolean;
  /**
   * Position of text label relative to form field
   * @default LabelPosition.top
   */
  labelPosition?: LabelPosition;
  /**
   * Reference to the input element in the combobox
   */
  innerRef?: React.Ref<HTMLInputElement>;
  /**
   * @internal
   */
  isMulti?: false;
  /**
   * If true, the loading component is shown
   * @default false
   */
  isLoading?: boolean;
  /**
   * Default selectable options. Can be an array of strings or objects
   */
  items?: T[];
  /**
   * Function passed in that transforms a newly created item to whatever format your items are in
   */
  newItemTransform?: (item: { label: string; value: string }) => T;
  /**
   * Event that fires when the input loses focus
   */
  onInputBlur?: (event: React.FocusEvent) => void;
  /**
   * Event that fires when the input's value is changed
   */
  onInputChange?: (changes: Partial<UseComboboxState<T>>) => void;
  /**
   * Event that fires when the input gains focus
   */
  onInputFocus?: (event: React.FocusEvent) => void;
  /**
   * Event that will fire when input receives keypress.
   */
  onInputKeyDown?: (event: React.KeyboardEvent) => void;
  /**
   * Event that will fire when a character is typed in the input
   */
  onInputKeyPress?: (event: React.KeyboardEvent) => void;
  /**
   * Event that will fire when a keypress is released on the input
   */
  onInputKeyUp?: (event: React.KeyboardEvent) => void;
  /**
   * Event that fires when the selected item changes
   */
  onInputValueChange?: (
    changes: Partial<UseComboboxState<T>>,
    updateInputItems?: React.Dispatch<React.SetStateAction<T[]>>
  ) => void;
  /**
   * Event that fires when a new item is created with the create item option is clicked in the item list menu
   */
  onItemCreated?: (newItem: T) => void;
  /**
   * Reference to the toggle button element wrapping the input in the combobox
   */
  toggleButtonRef?: React.Ref<HTMLButtonElement>;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Style properties for the component container element
   */
  containerStyle?: React.CSSProperties;
}

export interface MultiComboboxProps<T extends SelectOptions>
  extends UseMultipleSelectionProps<T>,
    Omit<ComboboxProps<T>, 'onStateChange' | 'stateReducer' | 'isMulti'>,
    InternalMultiProps<T> {
  /**
   * @internal
   */
  isMulti: true;
}

export function instanceOfMultiCombobox<T>(
  object: any
): object is MultiComboboxProps<T> {
  return 'isMulti' in object;
}

export type XORComboboxProps<T> = XOR<ComboboxProps<T>, MultiComboboxProps<T>>;

export const ComboboxStateChangeTypes = useCombobox.stateChangeTypes;

export function Combobox<T>(props: XORComboboxProps<T>) {
  const {
    containerStyle,
    errorMessage,
    id: defaultId,
    isMulti,
    labelPosition,
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

  return (
    <div style={containerStyle} data-testid={testId}>
      {isMulti && instanceOfMultiCombobox<T>(props) ? (
        <MultiCombobox
          ariaDescribedBy={descriptionId}
          errorMessage={errorMessage}
          hasError={hasError}
          helperMessage={helperMessage}
          isInverse={isInverse}
          itemToString={itemToString}
          labelPosition={labelPosition || LabelPosition.top}
          messageStyle={messageStyle}
          {...(props as MultiComboboxProps<T>)}
        />
      ) : (
        <InternalCombobox
          ariaDescribedBy={descriptionId}
          errorMessage={errorMessage}
          hasError={hasError}
          helperMessage={helperMessage}
          isInverse={isInverse}
          itemToString={itemToString}
          labelPosition={labelPosition || LabelPosition.top}
          messageStyle={messageStyle}
          {...(props as ComboboxProps<T>)}
        />
      )}
    </div>
  );
}
