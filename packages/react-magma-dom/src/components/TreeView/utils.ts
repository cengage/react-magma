import { ThemeInterface } from '../../theme/magma';
import { transparentize } from 'polished';
import { TreeViewSelectable } from './useTreeView';
import React from 'react';

export enum TreeNodeType {
  branch = 'branch',
  leaf = 'leaf',
}

/**
 * Leaf node - 1st level has 40px of left padding.
 * Each level after that adds 56px of left padding.
 * 40, 64, 88, 112, 136, etc.
 *
 * Branch node - 1st level has 8px of left padding.
 * Each level after that adds 24px of left padding.
 * 8, 32, 56, 80, 104, etc.
 */
export function calculateLeftPadding(
  type: TreeNodeType,
  depth: number = 0,
  negative: boolean = false
) {
  let padding = 0;

  if (type === TreeNodeType.leaf) {
    if (depth === 0) {
      if (negative) {
        // padding = 40;
        padding = 8;
      } else {
        // padding = 54;
        padding = 20;
      }
    } else {
      padding = 56;
    }
  } else if (type === TreeNodeType.branch) {
    if (depth === 0) {
      padding = 8;
    } else {
      padding = 24;
    }
  }

  return `${negative ? '-' : ''}${padding}px`;
}

export function getTreeItemLabelColor(
  isInverse: boolean,
  disabled: boolean,
  theme: ThemeInterface
) {
  if (disabled) {
    if (isInverse) {
      return transparentize(0.6, theme.colors.neutral100);
    }
    return transparentize(0.6, theme.colors.neutral500);
  }
  if (isInverse) {
    return theme.colors.neutral100;
  }
  return theme.colors.neutral700;
}

export function getTreeItemWrapperCursor(
  disabled: boolean,
  selectable: TreeViewSelectable,
  nodeType: TreeNodeType
) {
  if (disabled) {
    return 'not-allowed';
  }
  if (nodeType === TreeNodeType.branch) {
    if (
      selectable === TreeViewSelectable.off ||
      selectable === TreeViewSelectable.single
    ) {
      return 'pointer';
    }
  }

  return 'default';
}

// Return an array of all the enabled children ids recursively
export function getChildrenItemIds(children) {
  let itemIds = [];

  React.Children.forEach(children, child => {
    if (!child.props?.isDisabled) {
      if (child.props?.itemId) {
        itemIds.push(child.props.itemId);
      }

      if (child.props?.children) {
        const nestedItemIds = getChildrenItemIds(child.props.children);
        itemIds = itemIds.concat(nestedItemIds);
      }
    }
  });

  return itemIds;
}

// Return whether all the children are enabled
export function getAllChildrenEnabled(children) {
  return !children.some(child => child.props.isDisabled);
}

// Return an array that filters out the childrenIds & itemId from selectedItems
// (used for deselecting undeterminate checkboxes)
export function filterSelectedItems(selectedItems, childrenIds, itemId) {
  const allIds = [...childrenIds, itemId];
  return selectedItems.filter(item => !allIds.includes(item));
}

// Return an array of childrenIds that are missing from selectedItems
export function getMissingChildrenIds(selectedItems, childrenIds) {
  return childrenIds.filter(itemId => !selectedItems.includes(itemId));
}

export function getChildrenCheckedStatus(childrenIds, status) {
  return childrenIds.map(child => (child.isDisabled ? null : status));
}

export function getEnabledTreeItemChildrenLength(treeItemChildren) {
  return treeItemChildren.reduce((count, child) => {
    if (!child.props.isDisabled) {
      return count + 1;
    }
    return count;
  }, 0);
}
