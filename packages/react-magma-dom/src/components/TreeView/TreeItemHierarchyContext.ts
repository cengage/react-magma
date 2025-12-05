import * as React from 'react';

/**
 * Context for passing hierarchy information to TreeItems without cloneElement
 * This reduces the overhead of React.cloneElement by providing depth and position
 * information through context instead
 */
interface TreeItemHierarchyContextInterface {
  depth: number;
  parentDepth: number;
  isTopLevel: boolean;
  index: number;
}

export const TreeItemHierarchyContext =
  React.createContext<TreeItemHierarchyContextInterface>({
    depth: 0,
    parentDepth: 0,
    isTopLevel: true,
    index: 0,
  });
