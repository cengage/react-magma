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
   * Array list of itemIds of items that should be expanded by default.
   * For all items expanded, provide an array with all the indexes
   * @default [] (no items expanded)
   */
  initialExpandedItems?: Array<string>;
  /**
   * Array list of itemIds of items that should be selected by default
   * * @default [] (no items selected)
   */
  initialSelectedItems?: Array<TreeItemSelectedInterface>;
  isInverse?: boolean;
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
   * Action that fires when an item is selected
   * Return an array of objects.
   * Example: [ {itemId: 'item0', checkedStatus: IndeterminateCheckboxStatus.indeterminate}, {itemId: 'item0-child', checkedStatus: IndeterminateCheckboxStatus.checked} ]
   */
  onSelectedItemChange?: (selectedItems: Array<Object>) => void;
  /**
   * Action that fires when an item is expanded or collapsed
   */
  onExpandedChange?: (event: React.SyntheticEvent) => void;
  /**
   * @internal
   */
  selection?: Array<TreeItemSelectedInterface>;
}

export function useTreeView(props: UseTreeViewProps) {
  const {
    selectable = TreeViewSelectable.single,
    onSelectedItemChange,
    onExpandedChange,
    initialExpandedItems,
    initialSelectedItems,
    selection,
  } = props;
  const [hasIcons, setHasIcons] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState(selection || []);
  const [initialSelectedItemsNeedUpdate, setInitialSelectedItemsNeedUpdate] =
    React.useState(false);
  const [initialExpandedItemsNeedUpdate, setInitialExpandedItemsNeedUpdate] =
    React.useState(false);
  const [selectedItemsChanged, setSelectedItemsChanged] = React.useState(false);

  // TODO new name prob
  const [needsUpdate, setNeedsUpdate] = React.useState(false);

  const [treeItemRefArray, registerTreeItem] = useDescendants();

  React.useEffect(() => {
    if (selection && selection !== selectedItems && !needsUpdate) {
      setSelectedItems(selection);
      setNeedsUpdate(true);
    }
  }, [selection]);


  React.useEffect(() => {
    if (selectable !== TreeViewSelectable.off && selectedItemsChanged) {
      onSelectedItemChange &&
        typeof onSelectedItemChange === 'function' &&
        onSelectedItemChange(selectedItems);

      console.log('selectedItems changed:', selectedItems);
      setSelectedItemsChanged(false);
    }
  }, [selectedItemsChanged]);

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
    onSelectedItemChange,
    onExpandedChange,
    selectable,
    setHasIcons,
    selectedItems,
    setSelectedItems,
    initialExpandedItems,
    initialSelectedItems,
    treeItemRefArray,
    registerTreeItem,
    initialSelectedItemsNeedUpdate,
    setInitialSelectedItemsNeedUpdate,
    initialExpandedItemsNeedUpdate,
    setInitialExpandedItemsNeedUpdate,
    selectedItemsChanged,
    setSelectedItemsChanged,
    needsUpdate, 
    setNeedsUpdate,
  };

  return { contextValue };
}

export type UseTreeViewReturn = ReturnType<typeof useTreeView>;
