import * as React from 'react';
import { useDescendants } from '../../hooks/useDescendants';

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
  initialSelectedItems?: Array<string>;
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
   */
  onSelectedItemChange?: (selectedItems: any) => void;
  /**
   * Action that fires when an item is expanded or collapsed
   */
  onExpandedChange?: (event: React.SyntheticEvent) => void;
}

export function useTreeView(props: UseTreeViewProps) {
  const {
    selectable = TreeViewSelectable.single,
    onSelectedItemChange,
    onExpandedChange,
    initialExpandedItems,
    initialSelectedItems,
  } = props;
  const [hasIcons, setHasIcons] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const [treeItemRefArray, registerTreeItem] = useDescendants();

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
  };

  return { contextValue };
}

export type UseTreeViewReturn = ReturnType<typeof useTreeView>;
