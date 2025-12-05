---
'react-magma-dom': minor
---

chore(TreeView): preformance refactor

- Introduced a new `treeViewReducer` to manage the state of the TreeView component, handling actions such as item selection, expansion, and item updates.
- Refactored `useTreeView` and `useTreeItem` hooks to utilize the new reducer, improving state management and reducing re-renders.
- Enhanced utility functions for better performance, including optimized selection and status processing using Maps for O(1) lookups.
- Updated context providers to split responsibilities for selection, expansion, and configuration, allowing for more granular updates and improved performance.
