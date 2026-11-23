import * as React from 'react';

export interface TreeViewAnnounceContextInterface {
  /**
   * Publishes a message outside the `ul[role="tree"]`. Windows cascade
   * messages use the source item's live region; other messages use the tree's
   * shared region.
   */
  announce: (message: string, itemId?: string) => void;
}

export const TreeViewAnnounceContext =
  React.createContext<TreeViewAnnounceContextInterface>({
    announce: () => undefined,
  });
