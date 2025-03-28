import React from 'react';

import {
  AlignedPlacement,
  autoUpdate,
  flip,
  ReferenceType,
  useFloating,
} from '@floating-ui/react-dom';
import {
  useCombobox,
  UseComboboxProps,
  UseComboboxState,
  UseMultipleSelectionProps,
} from 'downshift';

import {
  instanceOfDefaultItemObject,
  InternalMultiProps,
  InternalSelectProps,
  SelectOptions,
} from '../Select';
import { InternalCombobox } from './Combobox';
import { MultiCombobox } from './MultiCombobox';
import { useIsInverse } from '../../inverse';
import { Omit, useGenerateId, XOR } from '../../utils';
import { LabelPosition } from '../Label';

export interface ComboboxProps<T extends SelectOptions>
  extends Omit<UseComboboxProps<T>, 'items'>,
    InternalSelectProps<T> {
  /**
   * Id of the element that describes the combobox input
   */
  ariaDescribedBy?: string;
  /**
   * Style properties for the component container element
   */
  containerStyle?: React.CSSProperties;
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
  floatingElementStyles?: React.CSSProperties;
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
   * When false, the selected item gets validated to ensure it's in the original `items` list.
   * When using Combobox for typeahead with a large `items` list, set this boolean to true to allow the selected item to not be part of the original `items` list.
   * In addition, when this is true and `isLoading` is used, the loading indicator will appear on the list instead of the input
   * @default false
   */
  isTypeahead?: boolean;
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
   * @internal
   */
  setFloating?: (node: ReferenceType) => void;
  /**
   * @internal
   */
  setReference?: (node: ReferenceType) => void;
  /**
   * Reference to the toggle button element wrapping the input in the combobox
   */
  toggleButtonRef?: React.Ref<HTMLButtonElement>;
  /**
   * @internal
   */
  testId?: string;
}

export interface MultiComboboxProps<T extends SelectOptions>
  extends UseMultipleSelectionProps<T>,
    Omit<ComboboxProps<T>, 'onStateChange' | 'stateReducer' | 'isMulti'>,
    InternalMultiProps<T> {
  /**
   * @internal
   */
  isMulti: true;
  /**
   * Keeps the list of items open after selection
   * @default false
   */
  hasPersistentMenu?: boolean;
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

  const { floatingStyles, refs } = useFloating({
    middleware: [flip()],
    placement: 'bottom-start' as AlignedPlacement,
    whileElementsMounted: autoUpdate,
  });

  const floatingElementStyles = { ...floatingStyles, width: '100%' };

  return (
    <div style={containerStyle} data-testid={testId}>
      {isMulti && instanceOfMultiCombobox<T>(props) ? (
        <MultiCombobox
          ariaDescribedBy={descriptionId}
          errorMessage={errorMessage}
          floatingElementStyles={floatingElementStyles}
          hasError={hasError}
          helperMessage={helperMessage}
          isInverse={isInverse}
          itemToString={itemToString}
          labelPosition={labelPosition || LabelPosition.top}
          messageStyle={messageStyle}
          setFloating={refs.setFloating}
          setReference={refs.setReference}
          {...(props as MultiComboboxProps<T>)}
        />
      ) : (
        <InternalCombobox
          ariaDescribedBy={descriptionId}
          errorMessage={errorMessage}
          floatingElementStyles={floatingElementStyles}
          hasError={hasError}
          helperMessage={helperMessage}
          isInverse={isInverse}
          itemToString={itemToString}
          labelPosition={labelPosition || LabelPosition.top}
          messageStyle={messageStyle}
          setFloating={refs.setFloating}
          setReference={refs.setReference}
          {...(props as ComboboxProps<T>)}
        />
      )}
    </div>
  );
}
