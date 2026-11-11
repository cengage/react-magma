import * as React from 'react';

export interface TreeViewExpansionContextInterface {
  expandedSet: Set<string>;
  handleExpandedChange: (
    event: React.SyntheticEvent,
    expandedItemId: string
  ) => void;
  onExpandedChange?: (
    event: React.SyntheticEvent,
    expandedItems: Array<string>
  ) => void;
  initialExpandedItems: Array<string>;
  /**
   * Marks an expansion change as coming from `expandAll`/`collapseAll`. Tree
   * items stay silent while it is set; `TreeView` announces the action once.
   */
  bulkExpansionRef?: React.MutableRefObject<'expand' | 'collapse' | null>;
}

export const TreeViewExpansionContext =
  React.createContext<TreeViewExpansionContextInterface>({
    expandedSet: new Set<string>(),
    handleExpandedChange: () => undefined,
    initialExpandedItems: [],
  });
