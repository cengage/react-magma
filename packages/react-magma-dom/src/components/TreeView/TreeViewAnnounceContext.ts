import * as React from 'react';

export interface TreeViewAnnounceContextInterface {
  /**
   * Publishes a message to the tree's single live region, which is owned by
   * `TreeView` and rendered outside the `ul[role="tree"]`. A region rendered
   * inside a tree item would become a permanent part of that item's accessible
   * name.
   */
  announce: (message: string) => void;
}

export const TreeViewAnnounceContext =
  React.createContext<TreeViewAnnounceContextInterface>({
    announce: () => undefined,
  });
