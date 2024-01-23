import * as React from 'react';

// TODO: do we really need 2 props for this?
export enum ExpandInitialOptions {
  all = 'all',
  list = 'list',
  none = 'none',
}

export enum TreeViewSelectable {
  off = 'off',
  single = 'single',
  multi = 'multi',
}

export interface UseTreeViewProps {
  /**
   * Initial expand state
   * @default ExpandInitialOptions.none
   */
  expandInitial?: ExpandInitialOptions;
  /**
   * Array list of indexes of items that should be expanded by default
   */
  initialExpandedItems?: Array<number>;
  /**
   * Array list of indexes of items that should be selected by default
   */
  initialSelectedItems?: Array<number>;
  isInverse?: boolean;
  /**
   * Type of selectable for the tree view: off, single, multi
   * @default TreeViewSelectable.off
   */
  selectable?: TreeViewSelectable;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Content of label for accessibility
   */
  // label: React.ReactNode;
  /**
   * TODO??
   */
  // singleSelectItemId?: string;
  // children?: React.ReactNode | React.ReactNode[];
  /**
   * Action that fires when an item is selected
   */
  onSelectedItemChange?: () => void;
}

export interface TreeViewContextInterface {
  children?: React.ReactNode | React.ReactNode[];
  expandInitial?: ExpandInitialOptions;
  hasIcons: boolean;
  onSelectedItemChange?: () => void;
  selectable: TreeViewSelectable;
  setHasIcons: React.Dispatch<React.SetStateAction<boolean>>;
  // singleSelectItemId?: string;
  selectedItems: Array<any>;
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>;
  initialExpandedItems: Array<number>;
  initialSelectedItems: Array<number>;
}

export const TreeViewContext = React.createContext<TreeViewContextInterface>({
  expandInitial: ExpandInitialOptions.none,
  selectable: TreeViewSelectable.off,
  hasIcons: false,
  setHasIcons: () => {},
  selectedItems: [],
  setSelectedItems: () => {},
  initialExpandedItems: [],
  initialSelectedItems: [],
});

export function useTreeView(props: UseTreeViewProps) {
  const {
    selectable,
    expandInitial,
    onSelectedItemChange,
    initialExpandedItems,
    initialSelectedItems,
    // children,
  } = props;
  const [hasIcons, setHasIcons] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const contextValue = {
    // children,
    expandInitial,
    hasIcons,
    onSelectedItemChange,
    selectable,
    setHasIcons,
    selectedItems,
    setSelectedItems,
    initialExpandedItems,
    initialSelectedItems,
    // singleSelectItemId: '',
  };

  return { contextValue };
}

export type UseTreeViewReturn = ReturnType<typeof useTreeView>;
