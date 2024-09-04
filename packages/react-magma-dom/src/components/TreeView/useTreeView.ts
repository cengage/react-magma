import * as React from 'react';
import { useDescendants } from '../../hooks/useDescendants';
import { TreeItemSelectedInterface } from './TreeViewContext';
import {
  findFirstBranchNode,
  getChildrenItemIdsInTree,
  getFirstItemInTree,
} from './utils';

export enum TreeViewSelectable {
  single = 'single',
  multi = 'multi',
  off = 'off',
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
   */
  onExpandedChange?: (event: React.SyntheticEvent) => void;
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
  children?: React.ReactNode[];
}

export function useTreeView(props: UseTreeViewProps) {
  const {
    selectable = TreeViewSelectable.single,
    onSelectedItemChange,
    onExpandedChange,
    initialExpandedItems,
    preselectedItems,
    checkChildren = true,
    checkParents = true,
    children,
  } = props;

  const [hasIcons, setHasIcons] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState(
    preselectedItems || []
  );

  const [preselectedItemsNeedUpdate, setPreselectedItemsNeedUpdate] =
    React.useState(false);
  const [initialExpandedItemsNeedUpdate, setInitialExpandedItemsNeedUpdate] =
    React.useState(false);
  const [selectedItemsChanged, setSelectedItemsChanged] = React.useState(false);
  const [itemToFocus, setItemToFocus] = React.useState(null);

  const [treeItemRefArray, registerTreeItem] = useDescendants();

  React.useEffect(() => {
    if (selectable !== TreeViewSelectable.off && preselectedItems) {
      setPreselectedItemsNeedUpdate(true);
    }
    if (initialExpandedItems) {
      setInitialExpandedItemsNeedUpdate(true);
    }

    getItemToFocusFirst();
  }, []);

  React.useEffect(() => {
    if (selectable !== TreeViewSelectable.off && selectedItemsChanged) {
      onSelectedItemChange &&
        typeof onSelectedItemChange === 'function' &&
        onSelectedItemChange(selectedItems);

      setSelectedItemsChanged(false);
      getItemToFocusFirst();
    }
  }, [selectedItemsChanged]);

  function getItemToFocusFirst() {
    let item = null;

    if (children?.length > 0) {
      const allChildrenInTree = getChildrenItemIdsInTree(children);
      const firstBranchNode = findFirstBranchNode(children)?.props.itemId;
      const firstItemSelected = getFirstItemInTree(selectedItems, children);
      const firstNode = allChildrenInTree?.[0].itemId;

      if (selectable === TreeViewSelectable.off) {
        /*
        If there is at least one node with a branch, focus is set on the first branch node.
        If there are no nodes with branches, the first item is focused and the tree can be traversed
      */
        item = firstBranchNode || allChildrenInTree?.[0].itemId;
      } else {
        // Same behavior for Single and Multiple
        if (selectedItems.length === 0) {
          // If none of the nodes are selected before the tree receives focus, focus is set on the first node.
          item = firstNode;
        } else if (selectedItems.length > 0) {
          // If one or more nodes are selected before the tree receives focus, focus is set on the first selected node.
          item = firstItemSelected;
        }
      }
    }
    setItemToFocus(item);
  }

  React.useEffect(() => {
    if (selectable !== TreeViewSelectable.off && initialSelectedItems) {
      setInitialSelectedItemsNeedUpdate(true);
    }
    if (initialExpandedItems) {
      setInitialExpandedItemsNeedUpdate(true);
    }
  }, []);

  const contextValue = {
    hasIcons,
    itemToFocus,
    onSelectedItemChange,
    onExpandedChange,
    selectable,
    setHasIcons,
    selectedItems,
    setSelectedItems,
    initialExpandedItems,
    treeItemRefArray,
    registerTreeItem,
    preselectedItemsNeedUpdate,
    setPreselectedItemsNeedUpdate,
    initialExpandedItemsNeedUpdate,
    setInitialExpandedItemsNeedUpdate,
    selectedItemsChanged,
    setSelectedItemsChanged,
    checkChildren,
    checkParents
  };

  return { contextValue };
}

export type UseTreeViewReturn = ReturnType<typeof useTreeView>;
