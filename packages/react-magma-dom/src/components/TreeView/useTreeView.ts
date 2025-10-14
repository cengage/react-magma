import * as React from 'react';

import { useDescendants } from '../../hooks/useDescendants';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';
import {
  TreeItemSelectedInterface,
  TreeViewItemInterface,
} from './TreeViewContext';
import { treeViewReducer } from './treeViewReducer';
import { TreeViewSelectable } from './types';
import {
  getInitialExpandedIds,
  getInitialItems,
  isSelectedItemsChanged,
  isEqualArrays,
} from './utils';

export { TreeItemSelectedInterface };

export interface TreeViewApi {
  selectItem({
    itemId,
    checkedStatus,
  }: Pick<TreeViewItemInterface, 'itemId' | 'checkedStatus'>): void;
  selectAll(): void;
  clearAll(): void;
  showMore(): void;
  showLess(): void;
  expandAll(): void;
  collapseAll(): void;
  addItem(item: TreeViewItemInterface): void;
}

export interface UseTreeViewProps {
  /**
   * The ref object that allows TreeView manipulation.
   * Actions available:
   * selectItem({ itemId, checkedStatus }: Pick<TreeViewItemInterface, 'itemId' | 'checkedStatus'>): void - action that allows to change item selection,
   * selectAll(): void - action that allows to select all items,
   * clearAll(): void - action that allows to unselect all items.
   * showMore(): void - action that gets called when a tree has hidden items and they get expanded.
   * showLess(): void - action that gets called when a tree has hidden items and they get collapsed.
   * expandAll(): void - action that allows to expand all items.
   * collapseAll(): void - action that allows to collapse all items.
   */
  apiRef?: React.MutableRefObject<TreeViewApi | undefined>;
  /**
   * Text for aria-label attribute for the tree.
   * If there is no visible name for the element you can reference, use aria-label to provide the user with a recognizable accessible name.
   * It's required to use either `ariaLabel` OR `ariaLabelledBy`.
   */
  ariaLabel?: string;
  /**
   * Text for aria-labelledby attribute for the tree.
   * If there is visible text that labels an element, use aria-labelledby.
   * It's required to use either `ariaLabel` OR `ariaLabelledBy`.
   */
  ariaLabelledBy?: string;
  /**
   * Only affects if selectable mode is TreeViewSelectable.multi.
   * Determines if the parent checkbox will get selected when the user selects all its children checkboxes.
   * When checkParents is enabled, the TreeView displays the indeterminate state of the parent checkboxes too.
   * @default true
   */
  checkParents?: boolean;
  /**
   * Only affects if selectable mode is TreeViewSelectable.multi.
   * Determines if the child checkboxes get selected when the user selects parent checkbox.
   * @default true
   */
  checkChildren?: boolean;
  children?: React.ReactNode[] | React.ReactNode;
  /**
   * Expand icon styles.
   */
  expandIconStyles?: ExpandIconStylesProps;
  /**
   * If true, every item is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Array list of itemIds of items that should be expanded by default.
   * For all items expanded, provide an array with all the indexes
   * @default [] (no items expanded)
   */
  initialExpandedItems?: Array<string>;
  isInverse?: boolean;
  /**
   * If false, top-level items will not be selectable in multi-select mode.
   * Their checkboxes will be hidden, and they will only function as expandable groups.
   * @default true
   */
  isTopLevelSelectable?: boolean;
  /**
   * Action that fires when an item is expanded or collapsed
   * Return an array of itemIds of items that are expanded
   * Example: ['item0', 'item1', 'item3']
   */
  onExpandedChange?: (
    event: React.SyntheticEvent,
    expandedItems: Array<string>
  ) => void;
  /**
   * Action that fires when an item is selected
   * Return an array of objects.
   * Example: [ {itemId: 'item0', checkedStatus: IndeterminateCheckboxStatus.indeterminate}, {itemId: 'item0-child', checkedStatus: IndeterminateCheckboxStatus.checked} ]
   */
  onSelectedItemChange?: (
    selectedItems: Array<TreeItemSelectedInterface>
  ) => void;
  /**
   * Array list of itemIds of items that should be selected when the component renders
   * * @default [] (no items selected)
   */
  preselectedItems?: Array<TreeItemSelectedInterface>;
  /**
   * How many items can be selected in the tree view: single, multi, off
   * @default TreeViewSelectable.single
   */
  selectable?: TreeViewSelectable;
  /**
   * @internal
   */
  testId?: string;
}

interface ExpandIconStylesProps {
  /**
   * Size for the expand/collapse icon.
   * @default 24
   */
  size?: number;
  /**
   * Color for the expand/collapse icon.
   */
  color?: string;
}

export function useTreeView(props: UseTreeViewProps) {
  const {
    selectable = TreeViewSelectable.single,
    onSelectedItemChange,
    onExpandedChange,
    initialExpandedItems: rawInitialExpandedItems,
    preselectedItems,
    checkChildren = selectable !== TreeViewSelectable.single,
    checkParents = selectable !== TreeViewSelectable.single,
    children,
    apiRef,
    isDisabled,
    isTopLevelSelectable = true,
    expandIconStyles,
  } = props;

  const hasPreselectedItems = Boolean(preselectedItems);

  // Initialize state with useReducer instead of multiple useState calls
  const [state, dispatch] = React.useReducer(treeViewReducer, {
    items: getInitialItems({
      children,
      preselectedItems,
      checkParents,
      checkChildren,
      selectable,
      isDisabled,
      isTopLevelSelectable,
    }),
    expandedSet: new Set<string>(),
    itemsNeedUpdate: null,
  });

  const { items, expandedSet, itemsNeedUpdate } = state;

  const [hasIcons] = React.useState(() => {
    const initialItems = getInitialItems({
      children,
      preselectedItems,
      checkParents,
      checkChildren,
      selectable,
      isDisabled,
      isTopLevelSelectable,
    });

    return initialItems.some(item => item.icon);
  });

  const selectedItems = React.useMemo(() => {
    return items.filter(
      item => item.checkedStatus === IndeterminateCheckboxStatus.checked
    );
  }, [items]);

  const initialExpandedItems = React.useMemo(() => {
    return getInitialExpandedIds({
      items,
      initialExpandedItems: rawInitialExpandedItems,
    });
  }, [items, rawInitialExpandedItems]);

  const itemToFocus = React.useMemo(() => {
    const enabledItems = items.filter(item => !item.isDisabled);
    const [firstItem] = enabledItems;

    if (selectable === TreeViewSelectable.off) {
      const firstExpandableItem = enabledItems.find(
        item => item?.hasOwnTreeItems
      );

      return firstExpandableItem
        ? firstExpandableItem.itemId
        : firstItem?.itemId;
    }

    const firstNonUncheckedItem = enabledItems.find(
      item =>
        item?.checkedStatus &&
        item.checkedStatus !== IndeterminateCheckboxStatus.unchecked
    );

    if (firstNonUncheckedItem) {
      return firstNonUncheckedItem.itemId;
    }

    return firstItem?.itemId;
  }, [items, selectable]);

  const prevSelectedItemsRef = React.useRef(null);
  const prevPreselectedItemsRef = React.useRef(preselectedItems);
  const prevChildrenRef = React.useRef(children);
  const initializationRef = React.useRef(true);
  const onSelectedItemChangeRef = React.useRef(onSelectedItemChange);

  // itemsNeedUpdate is now part of the reducer state

  React.useEffect(() => {
    onSelectedItemChangeRef.current = onSelectedItemChange;
  }, [onSelectedItemChange]);

  React.useEffect(() => {
    if (isEqualArrays(prevPreselectedItemsRef.current, preselectedItems)) {
      return;
    }

    dispatch({
      type: 'SET_ITEMS',
      payload: {
        items: getInitialItems({
          children,
          preselectedItems,
          checkParents,
          checkChildren,
          selectable,
          isDisabled,
          isTopLevelSelectable,
        }),
      },
    });
    prevPreselectedItemsRef.current = preselectedItems;
  }, [
    preselectedItems,
    checkParents,
    checkChildren,
    selectable,
    isDisabled,
    children,
    isTopLevelSelectable,
  ]);

  React.useEffect(() => {
    if (initializationRef.current) {
      return;
    }

    const itemsWithUpdatedDisabledState = getInitialItems({
      children,
      preselectedItems,
      checkParents,
      checkChildren,
      selectable,
      isDisabled,
      isTopLevelSelectable,
      items,
    });

    dispatch({
      type: 'UPDATE_ITEMS_DISABLED_STATE',
      payload: {
        updatedItems: itemsWithUpdatedDisabledState,
      },
    });
  }, [
    checkChildren,
    checkParents,
    children,
    isDisabled,
    isTopLevelSelectable,
    preselectedItems,
    selectable,
    items,
  ]);

  React.useEffect(() => {
    const isInitialization = initializationRef.current;

    initializationRef.current = false;

    if (isInitialization && !hasPreselectedItems) {
      return;
    }

    if (selectable === TreeViewSelectable.off) {
      return;
    }
    const nextSelectedItems = items
      .filter(
        ({ checkedStatus }) =>
          checkedStatus &&
          checkedStatus !== IndeterminateCheckboxStatus.unchecked
      )
      .map(({ itemId, checkedStatus }) => ({ itemId, checkedStatus }));

    if (
      !isSelectedItemsChanged(prevSelectedItemsRef.current, nextSelectedItems)
    ) {
      return;
    }

    prevSelectedItemsRef.current = nextSelectedItems;
    onSelectedItemChangeRef.current &&
      onSelectedItemChangeRef.current(nextSelectedItems);
  }, [items, selectable, hasPreselectedItems]);

  const selectItem = React.useCallback(
    ({
      itemId,
      checkedStatus,
    }: Pick<TreeViewItemInterface, 'itemId'> &
      Partial<Pick<TreeViewItemInterface, 'checkedStatus'>>) => {
      if (selectable === TreeViewSelectable.off) {
        return;
      }

      dispatch({
        type: 'SELECT_ITEM',
        payload: {
          itemId,
          checkedStatus,
          selectable,
          checkChildren,
          checkParents,
          isTopLevelSelectable,
        },
      });
    },
    [selectable, checkChildren, checkParents, isTopLevelSelectable]
  );

  const showMore = React.useCallback(
    (fromSelectAll = false) => {
      if (fromSelectAll) {
        dispatch({
          type: 'SELECT_ALL',
          payload: {
            checkChildren,
            checkParents,
            isTopLevelSelectable,
          },
        });
      } else {
        dispatch({ type: 'TRIGGER_ITEMS_UPDATE' });
      }
    },
    [checkChildren, checkParents, isTopLevelSelectable]
  );

  const showLess = React.useCallback(() => {
    dispatch({
      type: 'SET_ITEMS',
      payload: {
        items: getInitialItems({
          children,
          preselectedItems: selectedItems,
          checkParents,
          checkChildren,
          selectable,
          isDisabled,
          isTopLevelSelectable,
        }),
      },
    });
  }, [
    children,
    selectedItems,
    checkParents,
    checkChildren,
    selectable,
    isDisabled,
    isTopLevelSelectable,
  ]);

  const selectAll = React.useCallback(() => {
    if (
      [TreeViewSelectable.single, TreeViewSelectable.off].includes(
        selectable
      ) ||
      isDisabled
    ) {
      return;
    }

    dispatch({
      type: 'SELECT_ALL',
      payload: {
        checkChildren,
        checkParents,
        isTopLevelSelectable,
      },
    });
  }, [
    selectable,
    isDisabled,
    checkChildren,
    checkParents,
    isTopLevelSelectable,
  ]);

  const clearAll = React.useCallback(() => {
    if (isDisabled) {
      return;
    }

    dispatch({
      type: 'CLEAR_ALL',
      payload: {
        checkChildren,
        checkParents,
        isTopLevelSelectable,
      },
    });
  }, [isDisabled, checkChildren, checkParents, isTopLevelSelectable]);

  const handleExpandedChange = React.useCallback(
    (event: React.SyntheticEvent, itemId: string | string[]) => {
      dispatch({
        type: 'TOGGLE_EXPAND',
        payload: { itemId },
      });

      // Calculate the new expanded set for the callback
      const updatedExpandedSet = new Set(expandedSet);
      if (Array.isArray(itemId)) {
        itemId.forEach(id => updatedExpandedSet.add(id));
      } else if (itemId === '') {
        updatedExpandedSet.clear();
      } else if (updatedExpandedSet.has(itemId)) {
        updatedExpandedSet.delete(itemId);
      } else {
        updatedExpandedSet.add(itemId);
      }

      const expandedItemsArray = Array.from(updatedExpandedSet);
      onExpandedChange &&
        typeof onExpandedChange === 'function' &&
        onExpandedChange(event, expandedItemsArray);
    },
    [onExpandedChange, expandedSet]
  );

  const expandAll = React.useCallback(() => {
    const expandableIds = items.reduce((ids: string[], item) => {
      if (item.hasOwnTreeItems) {
        ids.push(item.itemId);
      }

      return ids;
    }, []);

    dispatch({
      type: 'EXPAND_ALL',
      payload: { expandableIds },
    });

    const syntheticEvent = {} as React.SyntheticEvent;
    onExpandedChange &&
      typeof onExpandedChange === 'function' &&
      onExpandedChange(syntheticEvent, expandableIds);
  }, [items, onExpandedChange]);

  const collapseAll = React.useCallback(() => {
    dispatch({ type: 'COLLAPSE_ALL' });

    const syntheticEvent = {} as React.SyntheticEvent;
    onExpandedChange &&
      typeof onExpandedChange === 'function' &&
      onExpandedChange(syntheticEvent, []);
  }, [onExpandedChange]);

  const addItem = React.useCallback(
    (newItem: TreeViewItemInterface) => {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          newItem,
          checkParents,
          selectable,
        },
      });

      // If the item has a parent, we need to reinitialize items to handle checkChildren logic
      if (newItem.parentId) {
        // We need to get the updated items after ADD_ITEM dispatch
        // This is a limitation of the current approach - we'll handle it in the next effect
        dispatch({
          type: 'SET_ITEMS',
          payload: {
            items: getInitialItems({
              children,
              preselectedItems: selectedItems,
              checkParents,
              checkChildren: false, // newly added children should preserve their state regardless of checkChildren
              selectable,
              isDisabled,
              isTopLevelSelectable,
              items: [...items, newItem],
            }),
          },
        });
      }
    },
    [
      checkParents,
      children,
      isDisabled,
      isTopLevelSelectable,
      items,
      selectable,
      selectedItems,
    ]
  );

  React.useEffect(() => {
    if (apiRef) {
      apiRef.current = {
        selectItem,
        selectAll,
        clearAll,
        showMore,
        showLess,
        expandAll,
        collapseAll,
        addItem,
      };
    }
  }, [
    selectItem,
    selectAll,
    clearAll,
    showMore,
    showLess,
    expandAll,
    collapseAll,
    addItem,
    apiRef,
  ]);

  React.useEffect(() => {
    if (itemsNeedUpdate) {
      dispatch({
        type: 'SET_ITEMS',
        payload: {
          items: getInitialItems({
            children,
            preselectedItems: selectedItems,
            checkParents,
            checkChildren,
            selectable,
            isDisabled,
            isTopLevelSelectable,
          }),
        },
      });
      prevChildrenRef.current = children;

      dispatch({ type: 'COMPLETE_ITEMS_UPDATE' });
    }
  }, [
    itemsNeedUpdate,
    children,
    selectedItems,
    checkParents,
    checkChildren,
    selectable,
    isDisabled,
    isTopLevelSelectable,
  ]);

  const [treeItemRefArray, registerTreeItem] = useDescendants();

  // Initialize expandedSet with initialExpandedItems
  React.useEffect(() => {
    if (initialExpandedItems && initialExpandedItems.length > 0) {
      dispatch({
        type: 'EXPAND_ALL',
        payload: { expandableIds: initialExpandedItems },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  const contextValue = React.useMemo(
    () => ({
      hasIcons,
      itemToFocus,
      onSelectedItemChange,
      onExpandedChange,
      selectable,
      selectedItems,
      initialExpandedItems,
      treeItemRefArray,
      registerTreeItem,
      checkChildren,
      checkParents,
      items,
      selectItem,
      handleExpandedChange,
      expandedSet,
      expandIconStyles,
      isTopLevelSelectable,
    }),
    [
      hasIcons,
      itemToFocus,
      onSelectedItemChange,
      onExpandedChange,
      selectable,
      selectedItems,
      initialExpandedItems,
      treeItemRefArray,
      registerTreeItem,
      checkChildren,
      checkParents,
      items,
      selectItem,
      handleExpandedChange,
      expandedSet,
      expandIconStyles,
      isTopLevelSelectable,
    ]
  );

  // Split context values for reduced re-render scope
  const selectionContextValue = React.useMemo(
    () => ({
      items,
      selectedItems,
      selectItem,
      onSelectedItemChange,
      selectable,
      itemToFocus,
    }),
    [
      items,
      selectedItems,
      selectItem,
      onSelectedItemChange,
      selectable,
      itemToFocus,
    ]
  );

  const expansionContextValue = React.useMemo(
    () => ({
      expandedSet,
      handleExpandedChange,
      onExpandedChange,
      initialExpandedItems,
    }),
    [expandedSet, handleExpandedChange, onExpandedChange, initialExpandedItems]
  );

  const configContextValue = React.useMemo(
    () => ({
      hasIcons,
      selectable,
      checkParents,
      checkChildren,
      isTopLevelSelectable,
      expandIconStyles,
      registerTreeItem,
      treeItemRefArray,
    }),
    [
      hasIcons,
      selectable,
      checkParents,
      checkChildren,
      isTopLevelSelectable,
      expandIconStyles,
      registerTreeItem,
      treeItemRefArray,
    ]
  );

  return {
    contextValue,
    selectionContextValue,
    expansionContextValue,
    configContextValue,
  };
}

export type UseTreeViewReturn = ReturnType<typeof useTreeView>;
