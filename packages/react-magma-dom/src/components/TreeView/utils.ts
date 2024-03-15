import { ThemeInterface } from '../../theme/magma';
import { transparentize } from 'polished';
import { TreeViewSelectable } from './useTreeView';
import React from 'react';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';

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
 *
 * The label element (the div inside the li) gets additional spacing.
 * In order to highlight the entire line, we need to negate the value for margin.
 */
export function calculateOffset(
  type: TreeNodeType,
  depth: number = 0,
  labelElem: boolean = false,
  negative: boolean = false
) {
  let padding = 0;

  if (type === TreeNodeType.leaf) {
    if (labelElem) {
      padding = depth * 8 + 40;
      if (depth !== 0) {
        padding += depth * 16;
      }
    } else if (depth === 0) {
      padding = 40;
    } else {
      padding = 56;
    }
  } else if (type === TreeNodeType.branch) {
    if (labelElem) {
      padding = depth * 8 + 8;
      if (depth !== 0) {
        padding += depth * 16;
      }
    } else if (depth === 0) {
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
  if (
    (nodeType === TreeNodeType.branch &&
      selectable === TreeViewSelectable.off) ||
    selectable === TreeViewSelectable.single
  ) {
    return 'pointer';
  }

  return 'default';
}

export function selectedItemsIncludesId(selectedItems, itemId) {
  return selectedItems?.some(item => item.itemId === itemId);
}

// Return an array of all the enabled children ids recursively
export function getChildrenItemIds(children) {
  let itemIds = [];

  React.Children.forEach(children, child => {
    if (!child.props?.isDisabled) {
      if (child.props?.itemId) {
        itemIds.push({
          itemId: child.props.itemId,
          checkedStatus: IndeterminateCheckboxStatus.checked,
        });
      }

      if (child.props?.children) {
        const nestedItemIds = getChildrenItemIds(child.props.children);
        itemIds = itemIds.concat(nestedItemIds);
      }
    }
  });

  return itemIds;
}

// Return the node of an itemId by traversing through the children
export function findChildByItemId(children, itemId) {
  if (!children) {
    return null;
  }

  for (const child of children) {
    if (child?.props?.itemId === itemId) {
      return child;
    }

    if (child?.props?.children) {
      const nestedChild = findChildByItemId(child?.props?.children, itemId);
      if (nestedChild) {
        return nestedChild;
      }
    }
  }

  return null;
}

// Return whether all the children are enabled
export function getAllChildrenEnabled(children) {
  return !children.some(child => child.props.isDisabled);
}

// Return an array that filters out the childrenIds & itemId from selectedItems
// (used for deselecting indeterminate checkboxes)
export function filterSelectedItems(selectedItems, childrenIds, itemId) {
  const allItems = [...childrenIds, itemId];
  const ids = allItems.map(item => item.itemId);
  return selectedItems.filter(item => !ids.includes(item.itemId));
}

// Return an array of childrenIds that are missing from selectedItems
export function getMissingChildrenIds(selectedItems, childrenIds) {
  const selectedIds = selectedItems.map(item => item.itemId);
  return childrenIds.filter(item => !selectedIds.includes(item.itemId));
}

// Return an array of statuses for all enabled children
export function getChildrenCheckedStatus(childrenIds, status) {
  return childrenIds.map(child => (child.isDisabled ? IndeterminateCheckboxStatus.unchecked : status));
}

// Return the length of enabled children
export function getEnabledTreeItemChildrenLength(treeItemChildren) {
  return treeItemChildren.reduce((count, child) => {
    if (!child.props.isDisabled) {
      return count + 1;
    }
    return count;
  }, 0);
}

// Updates the checkedStatus of the itemId in selectedItems and returns the selectedItems
export function getUpdatedSelectedItems(selectedItems, itemId, checkedStatus) {
  const updatedItems = selectedItems.map(item => {
    if (item.itemId === itemId) {
      return { ...item, checkedStatus };
    }
    return item;
  });

  return updatedItems;
}

// Return an array of unique items from the previous state, initially selected items and the childrem item ids
export function getUniqueSelectedItemsArray(
  prev,
  initialSelectedItems,
  childrenItemIds
) {
  const combinedArray = [...prev, ...initialSelectedItems, ...childrenItemIds];
  const uniqueItemsMap = new Map();
  for (const item of combinedArray) {
    uniqueItemsMap.set(item.itemId, item);
  }
  return Array.from(uniqueItemsMap.values());
}

// Return items in both arrays
export function findCommonItems(initialSelectedItems, childrenItemIds) {
  const commonItems = [];

  for (const initialItem of initialSelectedItems) {
    for (const childItem of childrenItemIds) {
      if (initialItem.itemId === childItem.itemId) {
        commonItems.push(initialItem);
        break;
      }
    }
  }

  return commonItems;
}

export function areArraysEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    const obj1 = array1[i];
    const obj2 = array2[i];

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }

  return true;
}

// TODO
export function getSelectedItemsIndexes(selectedItems, treeItemChildren) {
  const fullSelectedItems = treeItemChildren.map(child => {
    return selectedItems.includes(child.props.itemId);
  });
  return fullSelectedItems;
}

// TODO
// Return the selected item with the lowest index
export function getLowestIndexItem(selectedItems, treeItemChildren) {
  // const fullSelectedItems = getSelectedItemsIndexes(selectedItems, treeItemChildren);

  if (selectedItems.length === 0) {
    return null;
  }

  let lowestIndexItem = selectedItems[0];

  for (let i = 1; i < selectedItems.length; i++) {
    if (selectedItems[i] < lowestIndexItem) {
      lowestIndexItem = selectedItems[i];
    }
  }

  return lowestIndexItem;
}
