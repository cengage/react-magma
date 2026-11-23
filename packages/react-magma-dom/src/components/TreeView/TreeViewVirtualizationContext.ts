import * as React from 'react';

interface TreeViewVirtualizationContextValue {
  scrollRef: React.RefObject<HTMLUListElement>;
  requestedItemId: string | null;
  resolveRequestedFocus: () => void;
}

export const TreeViewVirtualizationContext =
  React.createContext<TreeViewVirtualizationContextValue | null>(null);
