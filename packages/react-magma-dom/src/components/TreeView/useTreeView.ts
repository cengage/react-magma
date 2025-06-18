import * as React from 'react';

import {
  TreeItemSelectedInterface,
  TreeViewItemInterface,
} from './TreeViewContext';
import { TreeViewSelectable } from './types';
import {
  getInitialExpandedIds,
  getInitialItems,
  toggleMulti,
  selectSingle,
  toggleAllMulti,
  isSelectedItemsChanged,
  isEqualArrays,
} from './utils';
import { useDescendants } from '../../hooks/useDescendants';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';

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
}

export interface UseTreeViewProps {
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
   * Array list of itemIds of items that should be expanded by default.
   * For all items expanded, provide an array with all the indexes
   * @default [] (no items expanded)
   */
  initialExpandedItems?: Array<string>;
  isInverse?: boolean;
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
   * If true, every item is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * If false, top-level items will not be selectable in multi-select mode.
   * Their checkboxes will be hidden, and they will only function as expandable groups.
   * @default true
   */
  isTopLevelSelectable?: boolean;
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
  } = props;

  const hasPreselectedItems = Boolean(preselectedItems);

  const [items, setItems] = React.useState(() =>
    getInitialItems({
      children,
      preselectedItems,
      checkParents,
      checkChildren,
      selectable,
      isDisabled,
      isTopLevelSelectable,
    })
  );
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

  // Used for showAll button
  const [itemsNeedUpdate, setItemsNeedUpdate] = React.useState(null);

  React.useEffect(() => {
    if (isEqualArrays(prevPreselectedItemsRef.current, preselectedItems)) {
      return;
    }

    setItems(
      getInitialItems({
        children,
        preselectedItems,
        checkParents,
        checkChildren,
        selectable,
        isDisabled,
        isTopLevelSelectable,
      })
    );
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
    });

    setItems(prevItems => {
      return prevItems.map(prevItem => {
        const itemWithUpdatedDisabledState = itemsWithUpdatedDisabledState.find(
          item => item.itemId === prevItem.itemId
        );

        if (itemWithUpdatedDisabledState?.isDisabled === prevItem?.isDisabled) {
          return prevItem;
        }

        return {
          ...prevItem,
          isDisabled: itemWithUpdatedDisabledState?.isDisabled,
        };
      });
    });
  }, [
    checkChildren,
    checkParents,
    children,
    isDisabled,
    isTopLevelSelectable,
    preselectedItems,
    selectable,
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
    onSelectedItemChange && onSelectedItemChange(nextSelectedItems);
  }, [items, selectable, hasPreselectedItems, onSelectedItemChange]);

  const selectItem = React.useCallback(
    ({
      itemId,
      checkedStatus,
    }: Pick<TreeViewItemInterface, 'itemId'> &
      Partial<Pick<TreeViewItemInterface, 'checkedStatus'>>) => {
      if (selectable === TreeViewSelectable.off) {
        return;
      }

      const item = items.find(item => item.itemId === itemId);

      if (item?.isDisabled) {
        return;
      }

      if (
        !isTopLevelSelectable &&
        !item?.parentId &&
        selectable === TreeViewSelectable.multi
      ) {
        return;
      }

      setItems(prevItems => {
        if (selectable === TreeViewSelectable.single) {
          return selectSingle({
            items: prevItems,
            itemId,
            checkedStatus: checkedStatus ?? IndeterminateCheckboxStatus.checked,
          });
        }

        if (selectable === TreeViewSelectable.multi) {
          return toggleMulti({
            items: prevItems,
            itemId,
            checkedStatus,
            checkChildren,
            checkParents,
            isTopLevelSelectable,
          });
        }

        return prevItems;
      });
    },
    [selectable, checkChildren, checkParents, items, isTopLevelSelectable]
  );

  const showMore = React.useCallback(
    (fromSelectAll = false) => {
      if (fromSelectAll) {
        setItems(() => {
          return toggleAllMulti({
            items,
            checkedStatus: IndeterminateCheckboxStatus.checked,
            checkChildren,
            checkParents,
            isTopLevelSelectable,
          });
        });
      } else {
        setItemsNeedUpdate(true);
      }
    },
    [items, checkChildren, checkParents, isTopLevelSelectable]
  );

  const showLess = React.useCallback(() => {
    setItems(
      getInitialItems({
        children,
        preselectedItems: selectedItems,
        checkParents,
        checkChildren,
        selectable,
        isDisabled,
        isTopLevelSelectable,
      })
    );
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

    setItems(() => {
      return toggleAllMulti({
        items,
        checkedStatus: IndeterminateCheckboxStatus.checked,
        checkChildren,
        checkParents,
        isTopLevelSelectable,
      });
    });
  }, [
    selectable,
    isDisabled,
    items,
    checkChildren,
    checkParents,
    isTopLevelSelectable,
  ]);

  const clearAll = React.useCallback(() => {
    if (isDisabled) {
      return;
    }

    setItems(() => {
      return toggleAllMulti({
        items,
        checkedStatus: IndeterminateCheckboxStatus.unchecked,
        checkChildren,
        checkParents,
        isTopLevelSelectable,
      });
    });
  }, [isDisabled, items, checkChildren, checkParents, isTopLevelSelectable]);

  const handleExpandedChange = React.useCallback(
    (event: React.SyntheticEvent, itemId: string | string[]) => {
      setExpandedSet(prevExpandedSet => {
        const updatedExpandedSet = new Set(prevExpandedSet);

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

        return updatedExpandedSet;
      });
    },
    [onExpandedChange]
  );

  const expandAll = React.useCallback(() => {
    const expandableIds = items.reduce((ids: string[], item) => {
      if (item.hasOwnTreeItems) {
        ids.push(item.itemId);
      }

      return ids;
    }, []);

    const syntheticEvent = {} as React.SyntheticEvent;

    handleExpandedChange(syntheticEvent, expandableIds);
  }, [handleExpandedChange, items]);

  const collapseAll = React.useCallback(() => {
    const syntheticEvent = {} as React.SyntheticEvent;

    handleExpandedChange(syntheticEvent, '');
  }, [handleExpandedChange]);

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
    apiRef,
  ]);

  React.useEffect(() => {
    if (itemsNeedUpdate) {
      setItems(
        getInitialItems({
          children,
          preselectedItems: selectedItems,
          checkParents,
          checkChildren,
          selectable,
          isDisabled,
          isTopLevelSelectable,
        })
      );
      prevChildrenRef.current = children;

      setItemsNeedUpdate(false);
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

  const [expandedSet, setExpandedSet] = React.useState<Set<string>>(
    new Set(initialExpandedItems)
  );

  const contextValue = {
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
    isTopLevelSelectable,
  };

  return { contextValue };
}

export type UseTreeViewReturn = ReturnType<typeof useTreeView>;
