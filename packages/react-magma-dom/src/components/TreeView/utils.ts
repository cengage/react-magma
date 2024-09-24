import { ThemeInterface } from '../../theme/magma';
import { transparentize } from 'polished';
import { UseTreeViewProps } from './useTreeView';
import { TreeViewSelectable } from './types';
import React from 'react';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';
import { TreeViewItemInterface } from './TreeViewContext';
import { TreeItem } from './TreeItem';

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

// Return an array of objects of all the enabled children ids recursively
export function getChildrenItemIds(children, status = '') {
  let itemIds = [];

  React.Children.forEach(children, child => {
    if (!child.props?.isDisabled) {
      const childStatus =
        status === IndeterminateCheckboxStatus.checked
          ? IndeterminateCheckboxStatus.checked
          : IndeterminateCheckboxStatus.unchecked;

      if (
        child.props?.itemId &&
        childStatus !== IndeterminateCheckboxStatus.unchecked
      ) {
        itemIds.push({
          itemId: child.props.itemId,
          checkedStatus: childStatus,
        });
      }

      if (child.props?.children) {
        const nestedItemIds = getChildrenItemIds(
          child.props.children,
          childStatus
        );
        itemIds = itemIds.concat(nestedItemIds);
      }
    }
  });

  return itemIds;
}

// Return an array of strings of all enabled children ids recursively
export function getChildrenItemIdsFlat(children) {
  let itemIds = [];

  React.Children.forEach(children, child => {
    if (!child.props?.isDisabled) {
      if (child.props?.itemId) {
        itemIds.push(child.props.itemId);
      }

      if (child.props?.children) {
        const nestedItemIds = getChildrenItemIdsFlat(child.props.children);
        itemIds = itemIds.concat(nestedItemIds);
      }
    }
  });

  return itemIds;
}

// Return an array of objects where all children are items are nested in the parents
export function getChildrenItemIdsInTree(children) {
  let itemIds = [];

  React.Children.forEach(children, child => {
    if (child.props?.itemId && !child.props?.isDisabled) {
      itemIds.push({
        itemId: child.props?.itemId,
        children: getChildrenItemIdsInTree(child.props?.children),
      });
    }
  });

  return itemIds;
}

// Return a treeItemRefArray object with no null children
export function filterNullEntries(obj) {
  if (Array.isArray(obj.current)) {
    const filteredArray = obj.current.filter(item => item?.current !== null);
    if (filteredArray.length > 0) {
      return { current: filteredArray };
    }
  }
  return {};
}

const getTreeViewData = (children: React.ReactNode[], parentId = null) => {
  const treeItemChildren = React.Children.toArray(children).filter(
    (child: React.ReactElement<any>) => child.type === TreeItem
  ) as React.ReactElement[];

  return treeItemChildren.map(({ props }) => [{ itemId: props.itemId, parentId, icon: props.icon, hasOwnTreeItems: Boolean(props.children) }, ...(props.children ? getTreeViewData(props.children, props.itemId) : [])]).flat();
}


const getChildrenIds = ({ items, itemId }: { items: TreeViewItemInterface[]; itemId: TreeViewItemInterface['itemId']; }) => {
  return items.reduce((result, item) => {
    if (item.parentId !== itemId) {
      return result;
    }

    if (item.hasOwnTreeItems) {
      return [...result, ...getChildrenIds({ items, itemId: item.itemId })];
    }

    return [...result, item.itemId];
  }, [itemId])
}

const getChildrenUniqueStatuses = ({ items, itemId }: { items: TreeViewItemInterface[]; itemId: TreeViewItemInterface['itemId']; }) => {
  const childrenAndItemIds = getChildrenIds({ items, itemId });
  const leaves = items.filter((item) => {
    return !item.hasOwnTreeItems && childrenAndItemIds.includes(item.itemId);
  })
  const uniqueStatuses = Array.from(new Set(leaves.map(item => item.checkedStatus ?? IndeterminateCheckboxStatus.unchecked)));

  return uniqueStatuses.filter(checkedStatus => checkedStatus && checkedStatus !== IndeterminateCheckboxStatus.indeterminate)
}

const processInitialParentStatuses = ({ items }: { items: TreeViewItemInterface[]; }) => {
  const itemsWithSelectedChildren = items.reduce((result, item) => {
    if (!item.hasOwnTreeItems || item.checkedStatus !== IndeterminateCheckboxStatus.checked) {
      return result;
    }

    return processChildrenSelection({items: result, itemId: item.itemId, checkedStatus: IndeterminateCheckboxStatus.checked});
  }, items);

  return itemsWithSelectedChildren.map((item) => {
    if (!item.hasOwnTreeItems) {
      return item;
    }

    const childrenUniqueStatuses = getChildrenUniqueStatuses({ items: itemsWithSelectedChildren, itemId: item.itemId });

    const parentStatus = childrenUniqueStatuses.length > 1 ? IndeterminateCheckboxStatus.indeterminate : childrenUniqueStatuses[0]

    return parentStatus ? { ...item, checkedStatus: parentStatus } : item
  })
}

export const getInitialItems = ({ children, preselectedItems: rawPreselectedItems, checkParents, selectable }: Pick<UseTreeViewProps, 'children' | 'preselectedItems' | 'checkParents' | 'selectable'>) => {
  const treeViewData = getTreeViewData(children);
  const preselectedItems = rawPreselectedItems?.length && selectable === TreeViewSelectable.single ? [rawPreselectedItems[0]] : rawPreselectedItems;

  const enhancedWithPreselectedItems = preselectedItems ? treeViewData.map((treeViewDataItem) => {
    const preselectedItem = preselectedItems.find(({itemId}) => treeViewDataItem.itemId === itemId);

    return preselectedItem ? { ...treeViewDataItem, checkedStatus: preselectedItem.checkedStatus } : treeViewDataItem
  }) : treeViewData

  return selectable === TreeViewSelectable.multi && checkParents && preselectedItems ? processInitialParentStatuses({ items: enhancedWithPreselectedItems }) : enhancedWithPreselectedItems
}

export const selectSingle = ({items, itemId, checkedStatus}: { items: TreeViewItemInterface[]; itemId: TreeViewItemInterface['itemId']; checkedStatus: TreeViewItemInterface['checkedStatus'] }) => {
  return items.map((item) => ({ ...item, checkedStatus: item.itemId === itemId ? checkedStatus : IndeterminateCheckboxStatus.unchecked }))
}

const processChildrenSelection = ({items, itemId, checkedStatus}: { items: TreeViewItemInterface[]; itemId: TreeViewItemInterface['itemId']; checkedStatus: TreeViewItemInterface['checkedStatus'] }) => {
  const childrenAndItemIds = getChildrenIds({ items, itemId })

  return items.map((item) => childrenAndItemIds.includes(item.itemId) ? { ...item, checkedStatus } : item)
}

const processParentsSelection = ({items, itemId, checkedStatus}: { items: TreeViewItemInterface[]; itemId: TreeViewItemInterface['itemId']; checkedStatus: TreeViewItemInterface['checkedStatus'] }) => {
  const item = items.find(item => item.itemId === itemId);
  const { parentId } = item;

  if (parentId === null) {
    return items;
  }

  const siblings = items.filter(item => item.parentId === parentId);
  const isAllSiblingsHasTheSameStatus = siblings.every(item => (item.checkedStatus || IndeterminateCheckboxStatus.unchecked) === checkedStatus);
  const parentStatus = isAllSiblingsHasTheSameStatus ? checkedStatus : IndeterminateCheckboxStatus.indeterminate;

  const parent = items.find(item => item.itemId === parentId)

  const nextItems = items.map(item => item.itemId === parent.itemId ? { ...item, checkedStatus: parentStatus } : item)

  return processParentsSelection({items: nextItems, itemId: parent.itemId, checkedStatus: parentStatus })
}

export const selectMulti = ({items, itemId, checkedStatus, checkChildren, checkParents }: { items: TreeViewItemInterface[]; itemId: TreeViewItemInterface['itemId']; checkedStatus: TreeViewItemInterface['checkedStatus'] } & Pick<UseTreeViewProps, 'checkChildren' | 'checkParents'>) => {
  const itemsWithProcessedItemSelection = items.map((item) => item.itemId === itemId ? { ...item, checkedStatus } : item)
  const itemsWithProcessedChildrenSelection = checkChildren ? processChildrenSelection({ items: itemsWithProcessedItemSelection, itemId, checkedStatus }) : itemsWithProcessedItemSelection
  return checkParents ? processParentsSelection({ items: itemsWithProcessedChildrenSelection, itemId, checkedStatus }) : itemsWithProcessedChildrenSelection;
}
