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
}

export const TreeViewExpansionContext =
  React.createContext<TreeViewExpansionContextInterface>({
    expandedSet: new Set<string>(),
    handleExpandedChange: () => undefined,
    initialExpandedItems: [],
  });
