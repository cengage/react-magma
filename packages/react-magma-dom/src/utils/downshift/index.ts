import * as React from 'react';

import {
  useCombobox as useDownshiftCombobox,
  useMultipleSelection as useDownshiftMultipleSelection,
  useSelect as useDownshiftSelect,
} from 'downshift';
import type {
  UseSelectReturnValue,
  UseSelectStateChangeOptions as UpstreamSelectAction,
  UseComboboxStateChangeOptions as UpstreamComboboxAction,
  UseSelectStateChange as NativeSelectChange,
  UseComboboxStateChange as NativeComboboxChange,
} from 'downshift';

import { useGenerateId } from '..';
import {
  A11yStatusMessageOptions,
  NativeSelectOptions,
  NativeComboboxOptions,
  NativeMultipleSelectionOptions,
  LegacyUseSelectProps,
  LegacyUseComboboxProps,
  Environment,
  SelectionState,
  UseComboboxProps,
  UseComboboxState,
  UseComboboxStateChangeTypes,
  UseMultipleSelectionProps,
  UseMultipleSelectionStateChangeTypes,
  UseSelectProps,
  UseSelectState,
  UseSelectStateChangeTypes,
} from './types';

export * from './types';

export const DownshiftSelectStateChangeTypes =
  useDownshiftSelect.stateChangeTypes;
export const DownshiftComboboxStateChangeTypes =
  useDownshiftCombobox.stateChangeTypes;
export const DownshiftMultipleSelectionStateChangeTypes =
  useDownshiftMultipleSelection.stateChangeTypes;

/** Resolve shared resources once, so rendered options and hooks use the same values. */
export function resolveNativeOptions<Item>(
  selection?: Pick<NativeSelectOptions<Item>, 'itemToString' | 'environment'>,
  multiple?: Pick<NativeMultipleSelectionOptions<Item>, 'environment'>
) {
  const primary = selection?.environment;
  const secondary = multiple?.environment;

  if (
    primary &&
    secondary &&
    (
      ['document', 'Node', 'addEventListener', 'removeEventListener'] as const
    ).some(key => primary[key] !== secondary[key])
  ) {
    throw new Error('Downshift groups must use the same environment.');
  }
  const nativeEnvironment = primary ?? secondary;

  return {
    ...(selection?.itemToString !== undefined && {
      itemToString: selection.itemToString,
    }),
    ...(nativeEnvironment !== undefined && { environment: nativeEnvironment }),
  };
}

const selectTypes = {
  ...UseSelectStateChangeTypes,
  ToggleButtonKeyDownEscape: '__togglebutton_keydown_escape__',
  ToggleButtonKeyDownHome: '__togglebutton_keydown_home__',
  ToggleButtonKeyDownEnd: '__togglebutton_keydown_end__',
  ToggleButtonKeyDownEnter: '__togglebutton_keydown_enter__',
  ToggleButtonKeyDownSpaceButton: '__togglebutton_keydown_space_button__',
  ToggleButtonKeyDownPageUp: '__togglebutton_keydown_page_up__',
  ToggleButtonKeyDownPageDown: '__togglebutton_keydown_page_down__',
  ToggleButtonBlur: '__togglebutton_blur__',
};

function actionName(types: Record<string, string | number>, type: string) {
  return Object.keys(types).find(key => types[key] === type) || '';
}

function modernSelectType(type: string) {
  const name = actionName(useDownshiftSelect.stateChangeTypes, type);

  return selectTypes[name as keyof typeof selectTypes] || type;
}

function modernComboboxType(type: string) {
  const name = actionName(useDownshiftCombobox.stateChangeTypes, type);
  const types = {
    ...UseComboboxStateChangeTypes,
    InputClick: '__input_click__',
    InputKeyDownPageUp: '__input_keydown_page_up__',
    InputKeyDownPageDown: '__input_keydown_page_down__',
  };

  return types[name as keyof typeof types] || type;
}

function selectType(type: string, wasOpen: boolean) {
  let name = actionName(useDownshiftSelect.stateChangeTypes, type);

  if (name === 'ToggleButtonBlur') {
    name = 'MenuBlur';
  } else if (wasOpen && name.startsWith('ToggleButtonKeyDown')) {
    const menuName = name.replace('ToggleButton', 'Menu');

    if (menuName in UseSelectStateChangeTypes) {
      name = menuName;
    }
  }

  // A runtime numeric action in a production bundle is translated by key, never by value.
  return selectTypes[name as keyof typeof selectTypes] || type;
}

function comboboxType(type: string) {
  const name = actionName(useDownshiftCombobox.stateChangeTypes, type);

  // Magma's v5 input click bubbled to its surrounding toggle button.
  if (name === 'InputClick') {
    return UseComboboxStateChangeTypes.ToggleButtonClick;
  }

  return (
    UseComboboxStateChangeTypes[
      name as keyof typeof UseComboboxStateChangeTypes
    ] || modernComboboxType(type)
  );
}

/**
 * Downshift 5 declared selectedItem as Item although its runtime used null.
 * These two conversions preserve that historical declaration for explicitly
 * annotated callbacks. No value is changed: nullable consumers should use
 * onSelectionChange / SelectionState instead of the legacy declaration.
 */
function legacyComboboxState<Item>(
  state: SelectionState<Item>
): UseComboboxState<Item> {
  return state as UseComboboxState<Item>;
}

function legacySelectState<Item>(
  state: SelectionState<Item>
): UseSelectState<Item> {
  return { ...legacyComboboxState(state), keySoFar: state.inputValue };
}

function selectionState<Item>(
  state: SelectionState<Item>
): SelectionState<Item> {
  return {
    highlightedIndex: state.highlightedIndex,
    isOpen: state.isOpen,
    selectedItem: state.selectedItem,
    inputValue: state.inputValue,
  };
}

function legacyChangedState<Item>(changes: Partial<SelectionState<Item>>) {
  return changes as Partial<UseComboboxState<Item>>;
}

function environment(value: Environment & { Node?: typeof window.Node }) {
  return {
    ...value,
    Node: value.Node ?? value.document.defaultView?.Node ?? window.Node,
  };
}

function stringify<Item>(
  item: Item | null,
  itemToString?: (item: Item) => string
) {
  if (item === null || item === undefined) {
    return '';
  }

  return itemToString ? itemToString(item) : String(item);
}

// Keep Magma's zoom-safe smooth scrolling, using Downshift's exact item ref and
// scroll scheduling. Consumers can replace it through scrollIntoView.
function scrollHighlightedItem(node: HTMLElement) {
  node.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
}

// Upstream schedules scrolling only when the index changes. Preserve opening
// an initially/externally highlighted menu without duplicating keyboard scrolls.
function useScrollOnOpen<Item>(
  props: UseSelectProps<Item> | UseComboboxProps<Item>,
  result: Pick<
    UseSelectReturnValue<Item>,
    'isOpen' | 'highlightedIndex' | 'getMenuProps' | 'getItemProps'
  >
) {
  const previous = React.useRef({
    isOpen: result.isOpen,
    index: result.highlightedIndex,
  });

  React.useEffect(() => {
    const before = previous.current;
    const index = result.highlightedIndex;

    previous.current = { isOpen: result.isOpen, index };
    if (
      before.isOpen ||
      !result.isOpen ||
      before.index !== index ||
      index < 0 ||
      index >= props.items.length
    ) {
      return;
    }
    const ownerDocument =
      props.environment?.document ??
      (typeof document === 'undefined' ? undefined : document);
    const menu = ownerDocument?.getElementById(result.getMenuProps().id);
    const item = ownerDocument?.getElementById(
      result.getItemProps({ index }).id
    );

    if (menu && item) {
      (props.scrollIntoView ?? scrollHighlightedItem)(item, menu);
    }
  }, [
    result.isOpen,
    result.highlightedIndex,
    result.getMenuProps,
    result.getItemProps,
    props.environment,
    props.items,
    props.scrollIntoView,
  ]);
}

function useA11yMessage<Item>(
  props: UseComboboxProps<Item> | UseSelectProps<Item>,
  state: SelectionState<Item>,
  isSelect = false,
  disabled = false
) {
  const id = useGenerateId();
  const previous = React.useRef({ state, items: props.items });
  const mounted = React.useRef(false);
  const region = React.useRef<HTMLDivElement>();
  const ownerDocument =
    props.environment?.document ??
    (typeof document === 'undefined' ? undefined : document);

  React.useEffect(() => {
    if (disabled) {
      mounted.current = true;
      region.current?.remove();
      region.current = undefined;
      previous.current = { state, items: props.items };

      return;
    }
    const before = previous.current;
    const statusChanged =
      before.items !== props.items ||
      before.state.isOpen !== state.isOpen ||
      before.state.highlightedIndex !== state.highlightedIndex ||
      before.state.inputValue !== state.inputValue;
    const selectionChanged = before.state.selectedItem !== state.selectedItem;

    previous.current = { state, items: props.items };
    if (!mounted.current) {
      mounted.current = true;

      return;
    }

    const options: A11yStatusMessageOptions<Item> = {
      ...legacyComboboxState(state),
      highlightedItem: props.items[state.highlightedIndex],
      itemToString: item => stringify(item, props.itemToString),
      resultCount: props.items.length,
      previousResultCount: before.items.length,
    };

    if (!ownerDocument) {
      return;
    }
    // v5 debounced both effects together: a changed selection replaces status.
    // Invoke only the winning callback, after the final update has settled.
    const publish = setTimeout(() => {
      let message = '';

      if (props.a11yStatusMessage) {
        message = props.a11yStatusMessage(state);
      } else if (selectionChanged) {
        if (props.getA11ySelectionMessage) {
          message = props.getA11ySelectionMessage(options);
        } else if (state.selectedItem) {
          message = `${options.itemToString(state.selectedItem)} has been selected.`;
        }
      } else if (statusChanged) {
        if (props.getA11yStatusMessage) {
          message = props.getA11yStatusMessage(options);
        } else if (state.isOpen) {
          if (!options.resultCount) {
            message = 'No results are available.';
          } else if (options.resultCount !== options.previousResultCount) {
            message = `${options.resultCount} result${options.resultCount === 1 ? ' is' : 's are'} available, use up and down arrow keys to navigate. Press ${isSelect ? 'Enter or Space Bar keys' : 'Enter key'} to select.`;
          }
        }
      }

      if (!message) {
        if (region.current) {
          region.current.textContent = '';
        }

        return;
      }
      if (!region.current) {
        const element = ownerDocument.createElement('div');

        element.id = `${id}-selection-status`;
        element.setAttribute('role', 'status');
        element.setAttribute('aria-live', 'polite');
        element.setAttribute('aria-atomic', 'true');
        Object.assign(element.style, {
          border: '0',
          clip: 'rect(0 0 0 0)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: '0',
          position: 'absolute',
          width: '1px',
        });
        ownerDocument.body.appendChild(element);
        region.current = element;
      }
      region.current.textContent = message;
    }, 200);
    const clear = setTimeout(() => {
      if (region.current) {
        region.current.textContent = '';
      }
    }, 700);

    return () => {
      clearTimeout(publish);
      clearTimeout(clear);
    };
    // Match the v5 announcement dependencies, including async items changes.
  }, [
    disabled,
    state.isOpen,
    state.highlightedIndex,
    state.inputValue,
    state.selectedItem,
    props.items,
    ownerDocument,
    id,
  ]);

  React.useEffect(() => () => region.current?.remove(), []);
}

function navigate<Item>(
  state: SelectionState<Item>,
  changes: SelectionState<Item>,
  type: string,
  props: (UseSelectProps<Item> | UseComboboxProps<Item>) & {
    isCreateOption?: (item: Item) => boolean;
  },
  defaultCircular: boolean,
  altKey = false
) {
  let direction = 0;

  if (type.endsWith('ArrowDown')) {
    direction = 1;
  } else if (type.endsWith('ArrowUp')) {
    direction = -1;
  }
  const circular = props.navigationMode
    ? props.navigationMode === 'circular'
    : (props.circularNavigation ?? defaultCircular);

  const hasCreateAction =
    props.items.length > 0 &&
    props.isCreateOption?.(props.items[props.items.length - 1]);

  if (!state.isOpen || (!direction && !hasCreateAction)) {
    return changes;
  }

  // v5 treated Alt+ArrowUp as navigation. v9 instead commits the
  // highlighted item and closes; keep that change out of the legacy contract.
  const navigationChanges =
    direction === -1 && altKey
      ? {
          ...changes,
          isOpen: state.isOpen,
          selectedItem: state.selectedItem,
          inputValue: state.inputValue,
        }
      : changes;
  const enabled = props.items
    .map((_item, index) => index)
    .filter(
      index =>
        props.isCreateOption?.(props.items[index]) ||
        !props.isItemDisabled?.(props.items[index], index)
    );

  if (!enabled.length) {
    return { ...navigationChanges, highlightedIndex: -1 };
  }

  const first = enabled[0];
  const last = enabled[enabled.length - 1];

  // Create is a UI action outside the hook's Item domain. Keep it reachable
  // using the same menu indices; all ordinary item navigation stays upstream.
  if (hasCreateAction) {
    if (type.endsWith('PageUp') || type.endsWith('PageDown')) {
      // v9 pages by ten and wraps, counting the visible Create action too.
      const offset = type.endsWith('PageDown') ? 10 : -10;
      let current = state.highlightedIndex;

      if (current < 0 || current > last) {
        current = offset > 0 ? -1 : last + 1;
      }
      let target = current + offset;

      if (target < 0) {
        target = last;
      } else if (target > last) {
        target = 0;
      }
      const highlightedIndex =
        offset > 0
          ? (enabled.find(index => index >= target) ?? first)
          : (enabled.filter(index => index <= target).pop() ?? last);

      return { ...navigationChanges, highlightedIndex };
    }
    if (type.endsWith('Home')) {
      return { ...navigationChanges, highlightedIndex: first };
    }
    if (
      type.endsWith('End') ||
      (direction === 1 &&
        (state.highlightedIndex === enabled[enabled.length - 2] ||
          (enabled.length === 1 && state.highlightedIndex < 0))) ||
      (direction === -1 && state.highlightedIndex < 0)
    ) {
      return { ...navigationChanges, highlightedIndex: last };
    }
  }

  if (direction === -1 && altKey) {
    const previousIndex = enabled
      .filter(index => index < state.highlightedIndex)
      .pop();

    return {
      ...navigationChanges,
      highlightedIndex:
        previousIndex ??
        (circular || state.highlightedIndex < 0 ? last : first),
    };
  }

  if (direction === 1 && state.highlightedIndex === last) {
    return { ...changes, highlightedIndex: circular ? first : last };
  }
  if (direction === -1 && state.highlightedIndex === first) {
    return { ...changes, highlightedIndex: circular ? last : first };
  }

  return changes;
}

type SelectHookProps<Item> = UseSelectProps<Item> & {
  native?: NativeSelectOptions<Item>;
  internalStateReducer?: NativeSelectOptions<Item>['stateReducer'];
  internalOnSelectedItemChange?: (changes: NativeSelectChange<Item>) => void;
  userStateReducer?: UseSelectProps<Item>['stateReducer'];
};
type ComboboxHookProps<Item> = UseComboboxProps<Item> & {
  native?: NativeComboboxOptions<Item>;
  resolveCreatedItem?: (index: number) => { item: Item } | undefined;
  isCreateOption?: (item: Item) => boolean;
  internalStateReducer?: NativeComboboxOptions<Item>['stateReducer'];
  internalOnSelectedItemChange?: (changes: NativeComboboxChange<Item>) => void;
  internalOnInputValueChange?: (changes: NativeComboboxChange<Item>) => void;
  internalOnIsOpenChange?: (changes: NativeComboboxChange<Item>) => void;
  userStateReducer?: UseComboboxProps<Item>['stateReducer'];
};

export function useSelect<Item>(props: SelectHookProps<Item>) {
  const { native, environment: legacyEnvironment, ...hookProps } = props;
  // Public components have already resolved one environment for all their hooks.
  const suppliedEnvironment = legacyEnvironment ?? native?.environment;
  const last = React.useRef<{
    state: SelectionState<Item>;
    type: UseSelectStateChangeTypes;
    modernType: string;
  }>();

  function callback(
    key: 'onSelectedItemChange' | 'onIsOpenChange' | 'onHighlightedIndexChange'
  ) {
    return (changes: NativeSelectChange<Item>) => {
      if (!last.current) {
        return;
      }
      if (key === 'onSelectedItemChange')
        props.internalOnSelectedItemChange?.(changes);
      if (native?.[key]) {
        (native[key] as (changes: NativeSelectChange<Item>) => void)(changes);
      } else if (props[key]) {
        props[key]({
          ...legacySelectState(last.current.state),
          type: last.current.type,
          modernType: last.current.modernType,
        });
      }
    };
  }

  const result = useDownshiftSelect<Item>({
    ...hookProps,
    ...(suppliedEnvironment && {
      environment: environment(suppliedEnvironment),
    }),
    itemToString:
      native?.itemToString ?? (item => stringify(item, props.itemToString)),
    // Downshift 9.5 also calls this for setHighlightedIndex(-1).
    // A consumer predicate only receives actual items, as its type promises.
    isItemDisabled: (item, index) =>
      index >= 0 && index < props.items.length
        ? (props.isItemDisabled?.(item, index) ?? false)
        : false,
    // The adapter owns announcements so items-only updates share one live region.
    getA11yStatusMessage: native?.getA11yStatusMessage,
    scrollIntoView: props.scrollIntoView ?? scrollHighlightedItem,
    stateReducer(state, action: UpstreamSelectAction<Item>) {
      const modernType = modernSelectType(action.type);
      const type = selectType(
        action.type,
        state.isOpen
      ) as UseSelectStateChangeTypes;
      const next = navigate(
        state,
        { ...state, ...action.changes },
        actionName(useDownshiftSelect.stateChangeTypes, action.type),
        props,
        false,
        action.altKey
      );
      const proposal = {
        ...next,
        ...props.internalStateReducer?.(state, { ...action, changes: next }),
      };

      if (native?.stateReducer) {
        const nativeChanges = native.stateReducer(state, {
          ...action,
          changes: proposal,
        });

        last.current = {
          state: { ...state, ...nativeChanges },
          type,
          modernType,
        };

        return nativeChanges;
      }
      let reduced: SelectionState<Item> = proposal;

      if (props.userStateReducer || props.stateReducer) {
        // Only consumer legacy contracts cross this conversion boundary.
        const legacyState = legacySelectState(state);
        const legacyAction = {
          ...action,
          type,
          modernType,
          changes: legacySelectState(proposal),
          props: props as LegacyUseSelectProps<Item>,
        };
        const legacyInternal =
          !props.internalStateReducer && props.userStateReducer
            ? props.stateReducer?.(legacyState, legacyAction)
            : undefined;
        const userChanges = { ...legacyAction.changes, ...legacyInternal };
        const user =
          (props.userStateReducer ?? props.stateReducer)?.(legacyState, {
            ...legacyAction,
            changes: userChanges,
          }) ?? userChanges;

        reduced = {
          ...next,
          ...user,
          inputValue: user.inputValue ?? next.inputValue,
        };

        // A legacy reducer can update keySoFar without knowing inputValue exists.
        if (
          user.keySoFar !== undefined &&
          user.keySoFar !== legacyAction.changes.keySoFar &&
          (user.inputValue === undefined ||
            user.inputValue === legacyAction.changes.inputValue)
        ) {
          reduced.inputValue = user.keySoFar;
        }
      }
      const modernChanges = props.selectionStateReducer?.(state, {
        ...action,
        type: modernType,
        changes: reduced,
        props,
      });
      const finalState = selectionState({ ...reduced, ...modernChanges });

      last.current = { state: finalState, type, modernType };

      return finalState;
    },
    onStateChange(changes) {
      if (native?.onStateChange) {
        native.onStateChange(changes);

        return;
      }
      if (last.current && props.onStateChange) {
        const { inputValue, ...changedState } = legacyChangedState(changes);
        const legacyChanges = {
          ...changedState,
          ...('inputValue' in changes && { keySoFar: inputValue }),
          type: last.current.type,
          modernType: last.current.modernType,
        };

        props.onStateChange?.(legacyChanges);
      }
      if (last.current) {
        props.onSelectionStateChange?.({
          ...last.current.state,
          type: last.current.modernType,
        });
      }
    },
    onIsOpenChange: callback('onIsOpenChange'),
    onHighlightedIndexChange: callback('onHighlightedIndexChange'),
    onSelectedItemChange(changes) {
      callback('onSelectedItemChange')(changes);
      if (!native?.onSelectedItemChange)
        props.onSelectionChange?.(changes.selectedItem);
    },
  });

  useA11yMessage(props, result, true, !!native?.getA11yStatusMessage);
  useScrollOnOpen(props, result);

  return result;
}
useSelect.stateChangeTypes = selectTypes;

export function useCombobox<Item>(props: ComboboxHookProps<Item>) {
  const { native, environment: legacyEnvironment, ...hookProps } = props;
  // Public components have already resolved one environment for all their hooks.
  const suppliedEnvironment = legacyEnvironment ?? native?.environment;
  const hookItems = props.isCreateOption
    ? props.items.filter(item => !props.isCreateOption(item))
    : props.items;
  const last = React.useRef<{
    state: SelectionState<Item>;
    type: UseComboboxStateChangeTypes;
    modernType: string;
  }>();

  function callback(
    key:
      | 'onSelectedItemChange'
      | 'onIsOpenChange'
      | 'onHighlightedIndexChange'
      | 'onInputValueChange'
  ) {
    return (changes: NativeComboboxChange<Item>) => {
      if (!last.current) {
        return;
      }
      if (key === 'onIsOpenChange') props.internalOnIsOpenChange?.(changes);
      if (key === 'onInputValueChange')
        props.internalOnInputValueChange?.(changes);
      if (key === 'onSelectedItemChange')
        props.internalOnSelectedItemChange?.(changes);
      if (native?.[key]) {
        (native[key] as (changes: NativeComboboxChange<Item>) => void)(changes);
      } else if (props[key]) {
        props[key]({
          ...legacyComboboxState(last.current.state),
          type: last.current.type,
          modernType: last.current.modernType,
        });
      }
    };
  }

  const result = useDownshiftCombobox<Item>({
    ...hookProps,
    items: hookItems,
    ...(suppliedEnvironment && {
      environment: environment(suppliedEnvironment),
    }),
    // A Magma Create action has a UI index outside native data items. Upstream
    // computes selection text before our reducer handles Alt+ArrowUp.
    itemToString: item =>
      native?.itemToString
        ? native.itemToString(item ?? null)
        : stringify(item, props.itemToString),
    // Downshift 9.5 also calls this for setHighlightedIndex(-1).
    // A consumer predicate only receives actual items, as its type promises.
    isItemDisabled: (item, index) =>
      index >= 0 && index < hookItems.length
        ? (props.isItemDisabled?.(item, index) ?? false)
        : false,
    // The adapter owns announcements so items-only updates share one live region.
    getA11yStatusMessage: native?.getA11yStatusMessage,
    scrollIntoView: props.scrollIntoView ?? scrollHighlightedItem,
    stateReducer(state, action: UpstreamComboboxAction<Item>) {
      const modernType = modernComboboxType(action.type);
      const type = comboboxType(action.type) as UseComboboxStateChangeTypes;
      const next = navigate(
        state,
        {
          ...state,
          ...action.changes,
          ...(action.type ===
            useDownshiftCombobox.stateChangeTypes.InputKeyDownEscape && {
            selectedItem: null,
            inputValue: '',
          }),
        },
        actionName(useDownshiftCombobox.stateChangeTypes, action.type),
        props,
        true,
        action.altKey
      );
      const proposal = {
        ...next,
        ...props.internalStateReducer?.(state, { ...action, changes: next }),
      };

      if (native?.stateReducer) {
        const nativeChanges = native.stateReducer(state, {
          ...action,
          changes: proposal,
        });

        last.current = {
          state: { ...state, ...nativeChanges },
          type,
          modernType,
        };

        return nativeChanges;
      }
      let reduced: SelectionState<Item> = proposal;

      if (props.userStateReducer || props.stateReducer) {
        // Only consumer legacy contracts cross this conversion boundary.
        const legacyState = legacyComboboxState(state);
        const legacyAction = {
          ...action,
          type,
          modernType,
          changes: legacyComboboxState(proposal),
          props: props as LegacyUseComboboxProps<Item>,
        };
        const legacyInternal =
          !props.internalStateReducer && props.userStateReducer
            ? props.stateReducer?.(legacyState, legacyAction)
            : undefined;
        const userChanges = { ...legacyAction.changes, ...legacyInternal };
        const user =
          (props.userStateReducer ?? props.stateReducer)?.(legacyState, {
            ...legacyAction,
            changes: userChanges,
          }) ?? userChanges;

        reduced = {
          ...next,
          ...user,
          inputValue: user.inputValue ?? next.inputValue,
        };
      }
      const modernChanges = props.selectionStateReducer?.(state, {
        ...action,
        type: modernType,
        changes: reduced,
        props,
      });
      const finalState = selectionState({ ...reduced, ...modernChanges });

      last.current = { state: finalState, type, modernType };

      return finalState;
    },
    onStateChange(changes) {
      if (native?.onStateChange) {
        native.onStateChange(changes);

        return;
      }
      if (last.current && props.onStateChange) {
        const legacyChanges = {
          ...legacyChangedState(changes),
          type: last.current.type,
          modernType: last.current.modernType,
        };

        props.onStateChange?.(legacyChanges);
      }
      if (last.current) {
        props.onSelectionStateChange?.({
          ...last.current.state,
          type: last.current.modernType,
        });
      }
    },
    onIsOpenChange: callback('onIsOpenChange'),
    onHighlightedIndexChange: callback('onHighlightedIndexChange'),
    onInputValueChange: callback('onInputValueChange'),
    onSelectedItemChange(changes) {
      callback('onSelectedItemChange')(changes);
      if (!native?.onSelectedItemChange)
        props.onSelectionChange?.(changes.selectedItem);
    },
  });

  useA11yMessage(props, result, false, !!native?.getA11yStatusMessage);
  useScrollOnOpen(props, result);

  function commitCreatedItem(index: number, event: React.SyntheticEvent) {
    if (
      !props.resolveCreatedItem ||
      index < 0 ||
      props.isItemDisabled?.(props.items[index], index)
    ) {
      return;
    }
    const creation = props.resolveCreatedItem(index);

    if (!creation) {
      return;
    }
    // Create is a Magma action, not a selectable Item. Dispatch the resolved
    // value through real v9 actions before any consumer sees selectedItem.
    Object.assign(event.nativeEvent, { preventDownshiftDefault: true });
    event.preventDefault();
    result.setHighlightedIndex(-1);
    result.closeMenu();
    result.selectItem(creation.item);
  }

  function itemActionPrevented(event: React.SyntheticEvent) {
    const marked = event as React.SyntheticEvent & {
      preventDownshiftDefault?: boolean;
      nativeEvent: Event & { preventDownshiftDefault?: boolean };
    };

    return Boolean(
      marked.preventDownshiftDefault ||
        marked.nativeEvent.preventDownshiftDefault
    );
  }

  const getItemProps: typeof result.getItemProps = itemProps =>
    result.getItemProps({
      ...itemProps,
      ...(props.resolveCreatedItem && {
        onClick(event) {
          itemProps?.onClick?.(event);
          if (!itemActionPrevented(event)) {
            commitCreatedItem(
              itemProps?.index ?? props.items.indexOf(itemProps?.item),
              event
            );
          }
        },
      }),
    });

  const getInputProps: typeof result.getInputProps = (inputProps, options) => {
    const input = result.getInputProps(
      {
        ...inputProps,
        ...(props.resolveCreatedItem && {
          onKeyDown(event) {
            inputProps?.onKeyDown?.(event);
            if (
              event.key === 'Enter' &&
              result.isOpen &&
              !itemActionPrevented(event)
            ) {
              commitCreatedItem(result.highlightedIndex, event);
            }
          },
        }),
      },
      options
    );
    // Generic Overwrite retains arbitrary consumer attributes. Narrow only the
    // composed DOM keyboard handler, without changing the getter's return type.
    const { onKeyDown } = input as Pick<
      React.InputHTMLAttributes<HTMLInputElement>,
      'onKeyDown'
    >;

    return {
      ...input,
      ...(onKeyDown && {
        onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
          // v5 left Enter available for form submission without a highlighted item.
          if (
            event.key === 'Enter' &&
            result.isOpen &&
            result.highlightedIndex < 0
          ) {
            inputProps?.onKeyDown?.(event);

            return;
          }
          onKeyDown(event);
        },
      }),
    };
  };

  return { ...result, getInputProps, getItemProps };
}
useCombobox.stateChangeTypes = {
  ...UseComboboxStateChangeTypes,
  InputClick: '__input_click__',
  InputKeyDownPageUp: '__input_keydown_page_up__',
  InputKeyDownPageDown: '__input_keydown_page_down__',
};

export function useMultipleSelection<Item>(
  props: UseMultipleSelectionProps<Item> & {
    native?: NativeMultipleSelectionOptions<Item>;
  }
) {
  const { native, environment: legacyEnvironment, ...hookProps } = props;
  // Public components have already resolved one environment for all their hooks.
  const suppliedEnvironment = legacyEnvironment ?? native?.environment;
  const previous = React.useRef(
    props.selectedItems ??
      props.initialSelectedItems ??
      props.defaultSelectedItems ??
      []
  );

  function typeOf(type: string) {
    const name = actionName(
      useDownshiftMultipleSelection.stateChangeTypes,
      type
    );

    return UseMultipleSelectionStateChangeTypes[
      name as keyof typeof UseMultipleSelectionStateChangeTypes
    ];
  }

  return useDownshiftMultipleSelection<Item>({
    ...hookProps,
    ...(suppliedEnvironment && {
      environment: environment(suppliedEnvironment),
    }),
    stateReducer(state, action) {
      if (native?.stateReducer) {
        return native.stateReducer(state, action);
      }

      return (
        props.stateReducer?.(state, {
          ...action,
          type: typeOf(action.type),
          props,
        }) ?? action.changes
      );
    },
    onStateChange: changes =>
      native?.onStateChange
        ? native.onStateChange(changes)
        : props.onStateChange?.({ ...changes, type: typeOf(changes.type) }),
    onSelectedItemsChange: changes =>
      native?.onSelectedItemsChange
        ? native.onSelectedItemsChange(changes)
        : props.onSelectedItemsChange?.({
            ...changes,
            type: typeOf(changes.type),
          }),
    onActiveIndexChange: changes =>
      native?.onActiveIndexChange
        ? native.onActiveIndexChange(changes)
        : props.onActiveIndexChange?.({
            ...changes,
            type: typeOf(changes.type),
          }),
    getA11yStatusMessage(state) {
      if (native?.getA11yStatusMessage) {
        previous.current = state.selectedItems;

        return native.getA11yStatusMessage(state);
      }
      const removed = previous.current.find(
        item => !state.selectedItems.includes(item)
      );
      const message =
        removed !== undefined && props.getA11yRemovalMessage
          ? props.getA11yRemovalMessage({
              itemToString: item => stringify(item, props.itemToString),
              resultCount: state.selectedItems.length,
              removedSelectedItem: removed,
              activeSelectedItem: state.selectedItems[state.activeIndex],
              activeIndex: state.activeIndex,
            })
          : '';

      previous.current = state.selectedItems;

      return props.multipleA11yStatusMessage?.(state) ?? message;
    },
  });
}
useMultipleSelection.stateChangeTypes = UseMultipleSelectionStateChangeTypes;
