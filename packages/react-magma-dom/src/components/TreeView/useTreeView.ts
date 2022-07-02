import * as React from "react"

export enum ExpandInitialOptions {
  all = "all",
  first = "first",
  none = "none",
}
export interface UseTreeViewProps {
  expandInitial?: ExpandInitialOptions;
  isInverse?: boolean;
  isSelectable?: boolean;
  testId?: string;
}

export interface TreeViewContextInterface {
  expandInitial?: ExpandInitialOptions;
  isSelectable: boolean;
  hasIcons: boolean;
  setHasIcons: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TreeViewContext = React.createContext<TreeViewContextInterface>({
  isSelectable: false,
  hasIcons: false,
  setHasIcons: () => {},
});

export function useTreeView(props: UseTreeViewProps) {
  const { isSelectable, expandInitial } = props;

  const [hasIcons, setHasIcons] = React.useState(false);

  const contextValue = {
    expandInitial,
    isSelectable,
    hasIcons,
    setHasIcons,
  };

  return { contextValue };
}

export type UseTreeViewReturn = ReturnType<typeof useTreeView>