import * as React from 'react';
import { useDescendants } from '../../hooks/useDescendants';
import { TreeItemSelectedInterface } from './TreeViewContext';

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
  onSelectedItemChange?: (selectedItems: Array<Object>) => void;
}

export function useTreeView(props: UseTreeViewProps) {
  const {
    selectable = TreeViewSelectable.single,
    onSelectedItemChange,
    onExpandedChange,
    initialExpandedItems,
    preselectedItems,
  } = props;

  const [hasIcons, setHasIcons] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState(preselectedItems || []);
  
  // Keeps track of when to call the user's onSelectedItemChange
  const [selectedItemsChanged, setSelectedItemsChanged] = React.useState(false);
  const [updateInitialExpandedItems, setUpdateInitialExpandedItems] = React.useState(false);
  const [updatePreselectedItems, setUpdatePreselectedItems] = React.useState(false);

  const [treeItemRefArray, registerTreeItem] = useDescendants();

  React.useEffect(() => {
    if (initialExpandedItems) {
      setUpdateInitialExpandedItems(true);
    }
  }, []);

  React.useEffect(() => {
    if (
      preselectedItems &&
      preselectedItems !== selectedItems &&
      !updatePreselectedItems
    ) {
      setSelectedItems(preselectedItems);
      setUpdatePreselectedItems(true);
    }
  }, [preselectedItems]);

  React.useEffect(() => {
    if (selectable !== TreeViewSelectable.off && selectedItemsChanged) {
      onSelectedItemChange &&
        typeof onSelectedItemChange === 'function' &&
        onSelectedItemChange(selectedItems);

      setSelectedItemsChanged(false);
    }
  }, [selectedItemsChanged]);

  const contextValue = {
    hasIcons,
    onSelectedItemChange,
    onExpandedChange,
    selectable,
    setHasIcons,
    selectedItems,
    setSelectedItems,
    initialExpandedItems,
    treeItemRefArray,
    registerTreeItem,
    updateInitialExpandedItems,
    setUpdateInitialExpandedItems,
    selectedItemsChanged,
    setSelectedItemsChanged,
    updatePreselectedItems,
    setUpdatePreselectedItems,
  };

  return { contextValue };
}

export type UseTreeViewReturn = ReturnType<typeof useTreeView>;
