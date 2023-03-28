import * as React from 'react';

export enum ExpandInitialOptions {
  all = 'all',
  first = 'first',
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
   * @default none
   */
  expandInitial?: ExpandInitialOptions;
  isInverse?: boolean;
  /**
   * Type of selectable for the tree view: off, single, multi
   * @default TreeViewSelectable.off
   */
  selectable?: TreeViewSelectable;
  // /**
  //  * Whether or not the TreeView and the TreeItems have icons
  //  */
  // hasIcons?: boolean;
  /**
   * @internal
   */
  testId?: string;
  label: React.ReactNode;
}

export interface TreeViewContextInterface {
  expandInitial?: ExpandInitialOptions;
  selectable: TreeViewSelectable;
  hasIcons: boolean;
  setHasIcons: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TreeViewContext = React.createContext<TreeViewContextInterface>({
  selectable: TreeViewSelectable.off,
  hasIcons: false,
  setHasIcons: () => {},
});

export function useTreeView(props: UseTreeViewProps) {
  const { selectable, expandInitial,  } = props;

  const [hasIcons, setHasIcons] = React.useState(false);

  const contextValue = {
    expandInitial,
    selectable,
    hasIcons,
    setHasIcons,
  };

  return { contextValue };
}

export type UseTreeViewReturn = ReturnType<typeof useTreeView>;
