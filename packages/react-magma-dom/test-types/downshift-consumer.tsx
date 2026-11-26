import * as React from 'react';

import {
  Combobox,
  ComboboxProps,
  MultiComboboxProps,
  MultiSelectProps,
  Select,
  SelectProps,
  SelectStateChangeTypes,
  SelectionState,
} from '../dist';
import type {
  UseComboboxProps,
  UseMultipleSelectionProps,
  UseSelectProps,
} from './downshift-v5';

declare const oldSelect: UseSelectProps<string>;
declare const oldCombobox: UseComboboxProps<string>;
// v5 Magma's multi props omitted the single-selection reducer/state callback.
declare const oldMultiSelect: Omit<
  UseSelectProps<string>,
  'stateReducer' | 'onStateChange'
> &
  UseMultipleSelectionProps<string>;
declare const oldMultiCombobox: Omit<
  UseComboboxProps<string>,
  'stateReducer' | 'onStateChange'
> &
  UseMultipleSelectionProps<string>;

export const selectProps: SelectProps<string> = {
  ...oldSelect,
  labelText: 'Colors',
};
export const comboProps: ComboboxProps<string> = {
  ...oldCombobox,
  labelText: 'Colors',
};
export const multiProps: MultiSelectProps<string> = {
  ...oldMultiSelect,
  labelText: 'Colors',
  isMulti: true,
};
export const multiComboProps: MultiComboboxProps<string> = {
  ...oldMultiCombobox,
  labelText: 'Colors',
  isMulti: true,
};

export const legacy = (
  <Select
    {...selectProps}
    circularNavigation
    getA11yStatusMessage={options =>
      `${options.previousResultCount}: ${options.itemToString(options.highlightedItem)}`
    }
    stateReducer={(state, action) => {
      const keySoFar: string = state.keySoFar;
      const type = SelectStateChangeTypes.MenuKeyDownEnter;

      return action.type === type
        ? { ...action.changes, keySoFar }
        : action.changes;
    }}
  />
);

const objects = [{ id: 1, text: 'Red' }];
export const modern = (
  <Combobox
    labelText="Colors"
    items={objects}
    selectedItem={null}
    itemToString={item => item?.text || ''}
    itemToKey={item => item?.id}
    navigationMode="bounded"
    onSelectionChange={item => {
      const value: number | undefined = item?.id;
      void value;
    }}
    selectionStateReducer={(state, action) => ({
      ...action.changes,
      selectedItem: state.selectedItem,
    })}
    onSelectionStateChange={changes => {
      const state: SelectionState<{ id: number; text: string }> = changes;
      void state;
    }}
  />
);
export const nullStringSelect = (
  <Select labelText="Colors" items={['Red']} selectedItem={null} />
);
export const nullObjectSelect = (
  <Select labelText="Colors" items={objects} selectedItem={null} />
);
export const nullStringCombobox = (
  <Combobox labelText="Colors" items={['Red']} selectedItem={null} />
);

export const contextualMultiSelectReducer = (
  <Select
    labelText="Colors"
    items={objects}
    isMulti
    stateReducer={(state, action) => {
      const selectedItems = action.props.selectedItems ?? state.selectedItems;
      const id: number | undefined = selectedItems[0]?.id;

      // @ts-expect-error Reducer props retain the inferred item shape.
      selectedItems[0]?.missingProperty;
      void id;

      return { ...action.changes, selectedItems };
    }}
  />
);
export const contextualMultiComboboxReducer = (
  <Combobox
    labelText="Colors"
    items={objects}
    isMulti
    stateReducer={(state, action) => {
      const selectedItems = action.props.selectedItems ?? state.selectedItems;
      const text: string | undefined = selectedItems[0]?.text;

      // @ts-expect-error Reducer props retain the inferred item shape.
      selectedItems[0]?.missingProperty;
      void text;

      return { ...action.changes, selectedItems };
    }}
  />
);

// prettier-ignore
export const wrongCallback = (
  // @ts-expect-error onSelectionChange must receive the inferred item shape.
  <Select labelText="Colors" items={objects} onSelectionChange={(item: string | null) => { void item; }} />
);
// prettier-ignore
export const wrongItem = (
  // @ts-expect-error selection cannot use a different item shape.
  <Select<{ id: number; text: string }> labelText="Colors" items={objects} selectedItem="Red" />
);
// prettier-ignore
export const wrongNavigation = (
  // @ts-expect-error navigation modes are a closed union.
  <Combobox labelText="Colors" items={objects} navigationMode="random" />
);

// Public inference matrix: two components x two selection modes x two item shapes.
// Keep callbacks contextually typed; explicit generic arguments would mask holes.
function expectType<T>(_value: T): void {}

type Color = { id: number; text: string };
const strings = ['Red'];
const buttonRef = React.createRef<HTMLButtonElement>();
const inputRef = React.createRef<HTMLInputElement>();
const textareaRef = React.createRef<HTMLTextAreaElement>();
const textareaCallback = (_node: HTMLTextAreaElement | null) => {};

export const singleStringSelect = (
  <Select
    labelText="Colors"
    items={strings}
    selectedItem={null}
    initialSelectedItem={null}
    defaultSelectedItem={null}
    innerRef={buttonRef}
    onSelectionChange={item => {
      expectType<string | null>(item);
      // @ts-expect-error Nullable selection requires a null check.
      expectType<string>(item);
      // @ts-expect-error Strings do not have custom object fields.
      item?.id;
    }}
    stateReducer={(state, action) => {
      expectType<string[]>(action.props.items);
      expectType<string>(action.changes.selectedItem);
      // @ts-expect-error Legacy reducer props preserve the inferred item shape.
      action.props.items[0].id;

      return { ...action.changes, selectedItem: state.selectedItem };
    }}
    onKeyDown={event => {
      expectType<React.KeyboardEvent>(event);
      expectType<string>(event.key);
      // @ts-expect-error Keyboard events do not expose pointer buttons.
      event.button;
    }}
  />
);
export const singleObjectSelect = (
  <Select
    labelText="Colors"
    items={objects}
    selectedItem={null}
    innerRef={node => {
      expectType<HTMLButtonElement | null>(node);
      expectType<string | undefined>(node?.type);
    }}
    onSelectionChange={item => {
      expectType<Color | null>(item);
      // @ts-expect-error Objects retain their exact inferred fields.
      item?.missingProperty;
    }}
    stateReducer={(_state, action) => {
      expectType<Color[]>(action.props.items);
      // @ts-expect-error Known item fields cannot change type.
      expectType<string>(action.props.items[0].id);

      return action.changes;
    }}
    selectionStateReducer={(state, action) => {
      expectType<Color[]>(action.props.items);
      expectType<Color | null>(action.changes.selectedItem);
      expectType<Color | null>(state.selectedItem);
      // @ts-expect-error Modern reducer state includes nullable selection.
      expectType<Color>(action.changes.selectedItem);
      // @ts-expect-error Modern action props retain inferred fields.
      action.props.items[0].missingProperty;

      return action.changes;
    }}
    onBlur={event => {
      expectType<React.FocusEvent>(event);
      // @ts-expect-error Focus events do not expose keyboard keys.
      event.key;
    }}
    components={{
      Item: options => {
        expectType<Color>(options.item);
        expectType<string>(options.itemString);
        expectType<boolean | undefined>(options.isFocused);
        expectType<React.Ref<HTMLLIElement>>(options.itemRef);
        // @ts-expect-error Declared renderer fields retain their types.
        expectType<number>(options.itemString);
        // @ts-expect-error Renderer items retain inferred fields.
        options.item.missingProperty;

        return <li ref={options.itemRef}>{options.item.text}</li>;
      },
    }}
  />
);
export const singleStringCombobox = (
  <Combobox
    labelText="Colors"
    items={strings}
    selectedItem={null}
    initialSelectedItem={null}
    defaultSelectedItem={null}
    innerRef={inputRef}
    toggleButtonRef={buttonRef}
    onSelectionChange={item => {
      expectType<string | null>(item);
      // @ts-expect-error Strings do not have custom object fields.
      item?.id;
    }}
    stateReducer={(_state, action) => {
      expectType<string[]>(action.props.items);
      // @ts-expect-error Legacy action props are required.
      const invalid: typeof action = {
        type: action.type,
        changes: action.changes,
      };
      void invalid;

      return action.changes;
    }}
    onInputKeyDown={event => {
      expectType<React.KeyboardEvent>(event);
      // @ts-expect-error Keyboard events do not expose pointer buttons.
      event.button;
    }}
  />
);
export const singleObjectCombobox = (
  <Combobox
    labelText="Colors"
    items={objects}
    selectedItem={null}
    innerRef={node => {
      expectType<HTMLInputElement | null>(node);
      expectType<string | undefined>(node?.value);
    }}
    toggleButtonRef={node => {
      expectType<HTMLButtonElement | null>(node);
    }}
    onSelectionChange={item => {
      expectType<Color | null>(item);
      // @ts-expect-error Nullable selection requires a null check.
      expectType<Color>(item);
    }}
    stateReducer={(_state, action) => {
      expectType<Color[]>(action.props.items);
      // @ts-expect-error Legacy action props preserve known item fields.
      action.props.items[0].missingProperty;

      return action.changes;
    }}
    selectionStateReducer={(_state, action) => {
      expectType<Color[]>(action.props.items);
      expectType<Color | null>(action.changes.selectedItem);
      // @ts-expect-error Modern action props are required.
      const invalid: typeof action = {
        type: action.type,
        changes: action.changes,
      };
      void invalid;

      return action.changes;
    }}
    onInputBlur={event => {
      expectType<React.FocusEvent>(event);
      // @ts-expect-error Focus events do not expose keyboard keys.
      event.key;
    }}
    onInputValueChange={(changes, updateItems) => {
      expectType<Color | undefined>(changes.selectedItem);
      updateItems?.(current => {
        expectType<Color[]>(current);
        // @ts-expect-error Input update callbacks preserve the item shape.
        current[0].missingProperty;

        return current;
      });
    }}
  />
);
export const multiStringSelect = (
  <Select
    labelText="Colors"
    items={strings}
    isMulti
    selectedItems={strings}
    innerRef={node => {
      expectType<HTMLButtonElement | null>(node);
    }}
    stateReducer={(state, action) => {
      expectType<string[] | undefined>(action.props.selectedItems);
      expectType<string[]>(state.selectedItems);
      // @ts-expect-error Multi reducer props are required.
      const invalid: typeof action = {
        type: action.type,
        changes: action.changes,
      };
      void invalid;

      return action.changes;
    }}
    onSelectedItemsChange={changes => {
      expectType<string[] | undefined>(changes.selectedItems);
      // @ts-expect-error Multiple-selection changes preserve string items.
      changes.selectedItems?.[0].id;
    }}
  />
);
export const multiObjectSelect = (
  <Select
    labelText="Colors"
    items={objects}
    isMulti
    innerRef={buttonRef}
    stateReducer={(state, action) => {
      expectType<Color[] | undefined>(action.props.selectedItems);
      expectType<Color[]>(state.selectedItems);
      // @ts-expect-error Multiple-selection action items retain their fields.
      action.props.selectedItems?.[0].missingProperty;

      return action.changes;
    }}
    onRemoveSelectedItem={item => {
      expectType<Color>(item);
      // @ts-expect-error Removal callbacks preserve object fields.
      item.missingProperty;
    }}
  />
);
export const multiStringCombobox = (
  <Combobox
    labelText="Colors"
    items={strings}
    isMulti
    selectedItems={strings}
    innerRef={node => {
      expectType<HTMLInputElement | null>(node);
    }}
    toggleButtonRef={node => {
      expectType<HTMLButtonElement | null>(node);
    }}
    stateReducer={(state, action) => {
      expectType<string[] | undefined>(action.props.selectedItems);
      expectType<string[]>(state.selectedItems);
      // @ts-expect-error Multi reducer props preserve string items.
      action.props.selectedItems?.[0].id;

      return action.changes;
    }}
    onSelectedItemsChange={changes => {
      expectType<string[] | undefined>(changes.selectedItems);
      // @ts-expect-error Multiple-selection changes preserve string items.
      changes.selectedItems?.[0].id;
    }}
  />
);
export const multiObjectCombobox = (
  <Combobox
    labelText="Colors"
    items={objects}
    isMulti
    innerRef={inputRef}
    toggleButtonRef={buttonRef}
    stateReducer={(state, action) => {
      expectType<Color[] | undefined>(action.props.selectedItems);
      expectType<Color[]>(state.selectedItems);
      // @ts-expect-error Multi reducer props are required.
      const invalid: typeof action = {
        type: action.type,
        changes: action.changes,
      };
      void invalid;
      // @ts-expect-error Multiple-selection action items retain their fields.
      action.props.selectedItems?.[0].missingProperty;

      return action.changes;
    }}
    onRemoveSelectedItem={item => {
      expectType<Color>(item);
      // @ts-expect-error Removal callbacks preserve object fields.
      item.missingProperty;
    }}
    components={{
      Item: options => {
        expectType<Color>(options.item);
        expectType<React.Ref<HTMLLIElement>>(options.itemRef);
        // @ts-expect-error Declared renderer fields retain their types.
        expectType<string>(options.isSelected);

        return <li ref={options.itemRef}>{options.item.text}</li>;
      },
    }}
  />
);

// Ref guards exercise object and callback refs against each public ref slot.
// prettier-ignore
export const invalidRefs = [
  // @ts-expect-error Select declares a button ref, not a textarea ref.
  <Select labelText="Colors" items={strings} innerRef={textareaRef} />,
  // @ts-expect-error Multi Select retains the same public button-ref contract.
  <Select labelText="Colors" items={objects} isMulti innerRef={textareaCallback} />,
  // @ts-expect-error Combobox input refs reject textarea objects.
  <Combobox labelText="Colors" items={objects} innerRef={textareaRef} />,
  // @ts-expect-error Multi Combobox input refs reject textarea callbacks.
  <Combobox labelText="Colors" items={strings} isMulti innerRef={textareaCallback} />,
  // @ts-expect-error Combobox toggle refs declare buttons.
  <Combobox labelText="Colors" items={strings} toggleButtonRef={textareaCallback} />,
  // @ts-expect-error Multi Combobox toggle refs declare buttons.
  <Combobox labelText="Colors" items={objects} isMulti toggleButtonRef={textareaRef} />,
];

type PublicItemRenderer = NonNullable<
  NonNullable<SelectProps<Color>['components']>['Item']
>;
type PublicItemRenderOptions = React.ComponentProps<PublicItemRenderer>;
declare const rendererOptions: PublicItemRenderOptions;

// Custom renderer extensions remain supported by the existing public contract.
export const customRendererOptions: PublicItemRenderOptions = {
  ...rendererOptions,
  trackingName: 'color-option',
};
export const invalidRendererOptions: PublicItemRenderOptions = {
  ...rendererOptions,
  // @ts-expect-error The extension index cannot override declared field types.
  itemString: 123,
};
export const invalidRendererRef: PublicItemRenderOptions = {
  ...rendererOptions,
  // @ts-expect-error Renderer refs are list-item refs.
  itemRef: textareaRef,
};

export const emittedRendererOptions: PublicItemRenderOptions = {
  ...rendererOptions,
  id: 'color-option',
  role: 'option',
  isDisabled: false,
  'aria-selected': true,
  'aria-disabled': 'false',
  'aria-label': 'Red',
  onClick: event => {
    expectType<React.MouseEvent<HTMLLIElement>>(event);
    expectType<HTMLLIElement>(event.currentTarget);
    // @ts-expect-error A list item is not a file input.
    event.currentTarget.files;
  },
  onMouseDown: event => {
    expectType<React.MouseEvent<HTMLLIElement>>(event);
    event.preventDefault();
  },
  onMouseMove: event => {
    expectType<HTMLLIElement>(event.currentTarget);
  },
};
export const invalidRendererDisabled: PublicItemRenderOptions = {
  ...rendererOptions,
  // @ts-expect-error Emitted disabled state is boolean.
  isDisabled: 'disabled',
};
export const invalidRendererAriaSelected: PublicItemRenderOptions = {
  ...rendererOptions,
  // @ts-expect-error Emitted ARIA state rejects arbitrary objects.
  'aria-selected': { selected: true },
};
export const invalidRendererClick: PublicItemRenderOptions = {
  ...rendererOptions,
  // @ts-expect-error Emitted click handlers must be functions.
  onClick: 'select-item',
};

export const inputHandlers: Pick<
  ComboboxProps<Color>,
  | 'onInputBlur'
  | 'onInputFocus'
  | 'onInputKeyDown'
  | 'onInputKeyPress'
  | 'onInputKeyUp'
> = {
  onInputBlur: event => {
    expectType<React.FocusEvent>(event);
    expectType<string>(event.currentTarget.tagName);
  },
  onInputFocus: event => {
    expectType<React.FocusEvent>(event);
    expectType<string>(event.currentTarget.tagName);
  },
  onInputKeyDown: event => {
    expectType<React.KeyboardEvent>(event);
    expectType<string>(event.currentTarget.tagName);
    // @ts-expect-error Input callbacks cannot access textarea-only properties.
    event.currentTarget.rows;
  },
  onInputKeyPress: event => {
    expectType<React.KeyboardEvent>(event);
  },
  onInputKeyUp: event => {
    expectType<React.KeyboardEvent>(event);
  },
};

declare const legacyInputKeyDown: (event: React.KeyboardEvent) => void;
declare const legacyInputFocus: (event: React.FocusEvent) => void;
interface ExistingWrapperHandlers {
  onInputBlur?: (event: React.FocusEvent) => void;
  onInputFocus?: (event: React.FocusEvent) => void;
  onInputKeyDown?: (event: React.KeyboardEvent) => void;
  onInputKeyPress?: (event: React.KeyboardEvent) => void;
  onInputKeyUp?: (event: React.KeyboardEvent) => void;
}
declare const currentComboboxProps: ComboboxProps<Color>;
declare const currentMultiComboboxProps: MultiComboboxProps<Color>;
export const forwardedLegacyHandlers: ExistingWrapperHandlers =
  currentComboboxProps;
export const forwardedMultiLegacyHandlers: ExistingWrapperHandlers =
  currentMultiComboboxProps;

export const legacyInputHandlers: Pick<
  ComboboxProps<Color>,
  'onInputKeyDown' | 'onInputFocus'
> = {
  onInputKeyDown: legacyInputKeyDown,
  onInputFocus: legacyInputFocus,
};
