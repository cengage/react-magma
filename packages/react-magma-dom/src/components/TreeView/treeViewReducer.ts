import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';
import { TreeViewItemInterface } from './TreeViewContext';
import { toggleMulti, selectSingle, toggleAllMulti } from './utils';

/**
 * TreeView State Shape
 * Consolidates all state managed by the TreeView component
 */
export interface TreeViewState {
  /** Array of all tree items with their metadata */
  items: TreeViewItemInterface[];
  /** Set of expanded item IDs for O(1) lookup */
  expandedSet: Set<string>;
  /** Flag indicating if items need to be updated (for showAll functionality) */
  itemsNeedUpdate: boolean | null;
}

/**
 * TreeView Action Types
 * Defines all possible state mutations
 */
export type TreeViewAction =
  // Selection actions
  | {
      type: 'SELECT_ITEM';
      payload: {
        itemId: string;
        checkedStatus?: IndeterminateCheckboxStatus;
        selectable: string;
        checkChildren: boolean;
        checkParents: boolean;
        isTopLevelSelectable: boolean;
      };
    }
  | {
      type: 'SELECT_ALL';
      payload: {
        checkChildren: boolean;
        checkParents: boolean;
        isTopLevelSelectable: boolean;
      };
    }
  | {
      type: 'CLEAR_ALL';
      payload: {
        checkChildren: boolean;
        checkParents: boolean;
        isTopLevelSelectable: boolean;
      };
    }
  // Expansion actions
  | {
      type: 'TOGGLE_EXPAND';
      payload: {
        itemId: string | string[];
      };
    }
  | { type: 'EXPAND_ALL'; payload: { expandableIds: string[] } }
  | { type: 'COLLAPSE_ALL' }
  // Item management actions
  | {
      type: 'SET_ITEMS';
      payload: {
        items: TreeViewItemInterface[];
      };
    }
  | {
      type: 'ADD_ITEM';
      payload: {
        newItem: TreeViewItemInterface;
        checkParents: boolean;
        selectable: string;
      };
    }
  | {
      type: 'UPDATE_ITEMS_DISABLED_STATE';
      payload: {
        updatedItems: TreeViewItemInterface[];
      };
    }
  // Show more/less actions
  | { type: 'TRIGGER_ITEMS_UPDATE' }
  | { type: 'COMPLETE_ITEMS_UPDATE' };

/**
 * TreeView Reducer
 * Pure function that handles all state transitions
 *
 * State Transitions:
 * - SELECT_ITEM: Updates item selection based on selectable mode (single/multi)
 * - SELECT_ALL: Selects all items in multi-select mode
 * - CLEAR_ALL: Clears all selections
 * - TOGGLE_EXPAND: Toggles expansion state of one or more items
 * - EXPAND_ALL: Expands all expandable items
 * - COLLAPSE_ALL: Collapses all items
 * - SET_ITEMS: Replaces entire items array (used for initialization and updates)
 * - ADD_ITEM: Adds a new item to the tree
 * - UPDATE_ITEMS_DISABLED_STATE: Updates disabled state of items
 * - TRIGGER_ITEMS_UPDATE: Flags that items need updating (for showAll)
 * - COMPLETE_ITEMS_UPDATE: Clears the update flag
 */
export function treeViewReducer(
  state: TreeViewState,
  action: TreeViewAction
): TreeViewState {
  switch (action.type) {
    case 'SELECT_ITEM': {
      const {
        itemId,
        checkedStatus,
        selectable,
        checkChildren,
        checkParents,
        isTopLevelSelectable,
      } = action.payload;

      // Find the item to check if it's disabled or non-selectable
      const item = state.items.find(item => item.itemId === itemId);

      if (item?.isDisabled) {
        return state;
      }

      if (!isTopLevelSelectable && !item?.parentId && selectable === 'multi') {
        return state;
      }

      let newItems: TreeViewItemInterface[];

      if (selectable === 'single') {
        newItems = selectSingle({
          items: state.items,
          itemId,
          checkedStatus: checkedStatus ?? IndeterminateCheckboxStatus.checked,
        });
      } else if (selectable === 'multi') {
        newItems = toggleMulti({
          items: state.items,
          itemId,
          checkedStatus,
          checkChildren,
          checkParents,
          isTopLevelSelectable,
        });
      } else {
        return state;
      }

      // Only return new state if items actually changed
      if (newItems === state.items) {
        return state;
      }

      return {
        ...state,
        items: newItems,
      };
    }

    case 'SELECT_ALL': {
      const { checkChildren, checkParents, isTopLevelSelectable } =
        action.payload;

      const newItems = toggleAllMulti({
        items: state.items,
        checkedStatus: IndeterminateCheckboxStatus.checked,
        checkChildren,
        checkParents,
        isTopLevelSelectable,
      });

      return {
        ...state,
        items: newItems,
      };
    }

    case 'CLEAR_ALL': {
      const { checkChildren, checkParents, isTopLevelSelectable } =
        action.payload;

      const newItems = toggleAllMulti({
        items: state.items,
        checkedStatus: IndeterminateCheckboxStatus.unchecked,
        checkChildren,
        checkParents,
        isTopLevelSelectable,
      });

      return {
        ...state,
        items: newItems,
      };
    }

    case 'TOGGLE_EXPAND': {
      const { itemId } = action.payload;
      const updatedExpandedSet = new Set(state.expandedSet);

      if (Array.isArray(itemId)) {
        itemId.forEach(id => updatedExpandedSet.add(id));
      } else if (itemId === '') {
        updatedExpandedSet.clear();
      } else if (updatedExpandedSet.has(itemId)) {
        updatedExpandedSet.delete(itemId);
      } else {
        updatedExpandedSet.add(itemId);
      }

      return {
        ...state,
        expandedSet: updatedExpandedSet,
      };
    }

    case 'EXPAND_ALL': {
      const { expandableIds } = action.payload;
      const updatedExpandedSet = new Set(state.expandedSet);

      expandableIds.forEach(id => updatedExpandedSet.add(id));

      return {
        ...state,
        expandedSet: updatedExpandedSet,
      };
    }

    case 'COLLAPSE_ALL': {
      return {
        ...state,
        expandedSet: new Set(),
      };
    }

    case 'SET_ITEMS': {
      const { items } = action.payload;
      // Only return new state if items actually changed
      if (items === state.items) {
        return state;
      }
      return {
        ...state,
        items,
      };
    }

    case 'ADD_ITEM': {
      const { newItem, checkParents, selectable } = action.payload;

      const newItems = state.items.map(item => {
        if (item.itemId === newItem.parentId) {
          item.hasOwnTreeItems = true;

          if (checkParents) {
            if (
              item.checkedStatus === IndeterminateCheckboxStatus.checked &&
              newItem.checkedStatus !== IndeterminateCheckboxStatus.checked
            ) {
              item.checkedStatus = IndeterminateCheckboxStatus.indeterminate;
            } else if (
              item.checkedStatus ===
                IndeterminateCheckboxStatus.indeterminate &&
              newItem.checkedStatus === IndeterminateCheckboxStatus.checked
            ) {
              const allChildrenChecked = [...state.items, newItem]
                .filter(child => child.parentId === item.itemId)
                .every(
                  child =>
                    child.checkedStatus === IndeterminateCheckboxStatus.checked
                );

              if (allChildrenChecked) {
                item.checkedStatus = IndeterminateCheckboxStatus.checked;
              }
            }
          }
        }

        return item;
      });

      if (
        newItem.checkedStatus === IndeterminateCheckboxStatus.checked &&
        selectable === 'single'
      ) {
        newItems.forEach(item => {
          item.checkedStatus = IndeterminateCheckboxStatus.unchecked;
        });
      }

      return {
        ...state,
        items: [...newItems, newItem],
      };
    }

    case 'UPDATE_ITEMS_DISABLED_STATE': {
      const { updatedItems } = action.payload;

      let hasChanges = false;
      const newItems = state.items.map(prevItem => {
        const itemWithUpdatedDisabledState = updatedItems.find(
          item => item.itemId === prevItem.itemId
        );

        if (itemWithUpdatedDisabledState?.isDisabled === prevItem?.isDisabled) {
          return prevItem;
        }

        hasChanges = true;
        return {
          ...prevItem,
          isDisabled: itemWithUpdatedDisabledState?.isDisabled,
        };
      });

      // Only return new state if something actually changed
      if (!hasChanges) {
        return state;
      }

      return {
        ...state,
        items: newItems,
      };
    }

    case 'TRIGGER_ITEMS_UPDATE': {
      return {
        ...state,
        itemsNeedUpdate: true,
      };
    }

    case 'COMPLETE_ITEMS_UPDATE': {
      return {
        ...state,
        itemsNeedUpdate: false,
      };
    }

    default:
      return state;
  }
}
