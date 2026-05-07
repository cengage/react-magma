import React from 'react';

import { transparentize } from 'polished';

import { TreeItem } from './TreeItem';
import { TreeViewSelectable } from './types';
import { UseTreeViewProps } from './useTreeView';
import { ThemeInterface } from '../../theme/magma';
import { IndeterminateCheckboxStatus } from '../IndeterminateCheckbox';
import {
  TreeItemSelectedInterface,
  TreeViewItemInterface,
} from './TreeViewContext';

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
  depth = 0,
  labelElem = false,
  negative = false,
  isVirtualized = false
) {
  let padding = 0;

  if (type === TreeNodeType.leaf) {
    if (isVirtualized) {
      // For virtualized items, calculate cumulative padding
      // Base padding (40px) + (depth * 24px per level after first)
      padding = 40 + depth * 24;
    } else {
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
    }
  } else if (type === TreeNodeType.branch) {
    if (isVirtualized) {
      // For virtualized items, calculate cumulative padding
      // Base padding (8px) + (depth * 24px per level after first)
      padding = 8 + depth * 24;
    } else {
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

const getIsDisabled = ({
  selectable,
  props,
  preselectedItems,
  isTreeViewDisabled,
  isParentDisabled,
  checkChildren,
}: {
  props: TreeViewItemInterface;
  isParentDisabled?: TreeViewItemInterface['isDisabled'];
  isTreeViewDisabled: UseTreeViewProps['isDisabled'];
} & Pick<
  UseTreeViewProps,
  'checkChildren' | 'selectable' | 'preselectedItems'
>) => {
  if (isTreeViewDisabled) {
    return true;
  }

  const preselectedItem = preselectedItems?.find(
    item => item.itemId === props.itemId
  );
  const isDisabled =
    preselectedItem?.isDisabled !== undefined
      ? preselectedItem?.isDisabled
      : props?.isDisabled;

  if (selectable === TreeViewSelectable.multi && !checkChildren) {
    return isDisabled;
  }

  return isParentDisabled || isDisabled;
};

/* Returns a boolean indicating whether at least one child is valid.
A child is considered valid if it can be counted as an item that would make the parent expandable.
This is used to set `hasOwnTreeItems` which manages visibility of the expandable arrow.
*/
const areChildrenValid = children => {
  if (!children) {
    return false;
  } else if (!children.length && children.type !== TreeItem) {
    return false;
  }

  let hasValidChild = true;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    if (typeof child === 'string') {
      return false; // Return false if a child is a string
    }

    if (child?.type !== TreeItem) {
      return hasValidChild;
    }
    // Recursively check the validity of nested children
    if (child.props.children) {
      const nestedChildren = Array.isArray(child.props.children)
        ? child.props.children
        : [child.props.children];

      if (areChildrenValid(nestedChildren)) {
        hasValidChild = true;
        return hasValidChild;
      }
    }
  }

  return hasValidChild;
};

const getTreeViewData = ({
  children,
  selectable,
  checkChildren,
  parentId = null,
  isParentDisabled,
  preselectedItems,
  isTreeViewDisabled,
}: {
  isParentDisabled?: TreeViewItemInterface['isDisabled'];
  isTreeViewDisabled: UseTreeViewProps['isDisabled'];
} & Pick<TreeViewItemInterface, 'parentId'> &
  Pick<
    UseTreeViewProps,
    'children' | 'checkChildren' | 'selectable' | 'preselectedItems'
  >) => {
  const treeItemChildren = React.Children.toArray(children).filter(
    (child: React.ReactElement<any>) => child.type === TreeItem
  ) as React.ReactElement[];

  return treeItemChildren
    .map(({ props }) => {
      const isDisabled = getIsDisabled({
        selectable,
        props,
        preselectedItems,
        isTreeViewDisabled,
        isParentDisabled,
        checkChildren,
      });

      return [
        {
          itemId: props.itemId,
          parentId,
          icon: props.icon,
          hasOwnTreeItems: areChildrenValid(props.children),
          isDisabled,
        },
        ...(props.children
          ? getTreeViewData({
              children: props.children,
              parentId: props.itemId,
              selectable,
              checkChildren,
              isParentDisabled: isDisabled,
              preselectedItems,
              isTreeViewDisabled,
            })
          : []),
      ];
    })
    .flat();
};

// Public entry: builds itemMap/parentChildMap once and delegates to the
// mutable variant. Avoids per-recursion-call `new Map(items.map(...))`
// and `Array.from(...)` allocations on a hot path.
const processChildrenSelection = ({
  items,
  itemId,
  checkedStatus,
  forceCheckedStatusForDisabled,
  parentChildMap,
}: {
  items: TreeViewItemInterface[];
  itemId: TreeViewItemInterface['itemId'];
  checkedStatus: TreeViewItemInterface['checkedStatus'];
  forceCheckedStatusForDisabled?: boolean;
  parentChildMap?: Map<string, string[]>;
}) => {
  const map = parentChildMap || buildParentChildMap(items);
  const itemMap = new Map(items.map(item => [item.itemId, item]));

  processChildrenSelectionMut({
    itemMap,
    parentChildMap: map,
    itemId,
    checkedStatus,
    forceCheckedStatusForDisabled,
  });

  return Array.from(itemMap.values());
};

// Internal: mutates `itemMap` in place. Behaviour is identical to the
// previous implementation, including the "inspect ALL descendants when
// computing the parent's indeterminate status" rule.
const processChildrenSelectionMut = ({
  itemMap,
  parentChildMap,
  itemId,
  checkedStatus,
  forceCheckedStatusForDisabled,
}: {
  itemMap: Map<string, TreeViewItemInterface>;
  parentChildMap: Map<string, string[]>;
  itemId: TreeViewItemInterface['itemId'];
  checkedStatus: TreeViewItemInterface['checkedStatus'];
  forceCheckedStatusForDisabled?: boolean;
}) => {
  const item = itemMap.get(itemId);

  // Update the current item (skip if disabled and not forced).
  if (item && (!item.isDisabled || forceCheckedStatusForDisabled)) {
    itemMap.set(itemId, { ...item, checkedStatus });
  }

  if (!item?.hasOwnTreeItems) {
    return;
  }

  // Recurse into direct children, mutating the shared map.
  const directChildren = parentChildMap.get(itemId);

  if (directChildren) {
    for (const childId of directChildren) {
      processChildrenSelectionMut({
        itemMap,
        parentChildMap,
        itemId: childId,
        checkedStatus,
        forceCheckedStatusForDisabled,
      });
    }
  }

  // Inspect ALL descendants to decide between `checkedStatus` and
  // `indeterminate` for this parent.
  const descendantStatuses = new Set<boolean>();
  const stack: string[] = directChildren ? [...directChildren] : [];

  while (stack.length > 0) {
    const id = stack.pop() as string;
    const child = itemMap.get(id);

    if (child) {
      descendantStatuses.add(
        child.checkedStatus === IndeterminateCheckboxStatus.checked
      );
    }

    const grand = parentChildMap.get(id);

    if (grand) {
      for (const gId of grand) {
        stack.push(gId);
      }
    }
  }

  const isAllDescendantsSameCheckedStatus = descendantStatuses.size === 1;
  const itemCheckedStatus = isAllDescendantsSameCheckedStatus
    ? checkedStatus
    : IndeterminateCheckboxStatus.indeterminate;

  const updatedItem = itemMap.get(itemId);

  if (updatedItem) {
    itemMap.set(itemId, {
      ...updatedItem,
      checkedStatus: itemCheckedStatus,
    });
  }
};

// Optimized: Build parent-child relationship map once for O(1) lookups
const buildParentChildMap = (items: TreeViewItemInterface[]) => {
  const map = new Map<string, string[]>();

  for (const item of items) {
    if (item.parentId) {
      const children = map.get(item.parentId) || [];
      children.push(item.itemId);
      map.set(item.parentId, children);
    }
  }

  return map;
};

// Optimized: Use memoized parent-child map for faster lookups
export const getChildrenIds = ({
  items,
  itemId,
  parentChildMap,
}: {
  items: TreeViewItemInterface[];
  itemId: TreeViewItemInterface['itemId'];
  parentChildMap?: Map<string, string[]>;
}) => {
  const map = parentChildMap || buildParentChildMap(items);
  const result: string[] = [itemId];
  const queue = [itemId];

  while (queue.length > 0) {
    const currentId = queue.shift();
    if (!currentId) continue;

    const children = map.get(currentId);

    if (children) {
      result.push(...children);
      queue.push(...children);
    }
  }

  return result;
};

// Optimized: Use Set for O(1) lookup and reduce iterations
const getChildrenUniqueStatuses = ({
  items,
  itemId,
  parentChildMap,
}: {
  items: TreeViewItemInterface[];
  itemId: TreeViewItemInterface['itemId'];
  parentChildMap?: Map<string, string[]>;
}) => {
  const childrenAndItemIds = getChildrenIds({ items, itemId, parentChildMap });
  const childrenIdSet = new Set(childrenAndItemIds);
  const uniqueStatuses = new Set<IndeterminateCheckboxStatus>();

  for (const item of items) {
    if (!item?.hasOwnTreeItems && childrenIdSet.has(item.itemId)) {
      const status =
        item.checkedStatus ?? IndeterminateCheckboxStatus.unchecked;
      if (status && status !== IndeterminateCheckboxStatus.indeterminate) {
        uniqueStatuses.add(status);
      }
    }
  }

  return Array.from(uniqueStatuses);
};

// Optimized: Build map once and reuse
const processInitialParentStatuses = ({
  items,
  isTopLevelSelectable = true,
}: {
  items: TreeViewItemInterface[];
  isTopLevelSelectable?: boolean;
}) => {
  const parentChildMap = buildParentChildMap(items);
  let itemsWithSelectedChildren = items;

  for (const item of items) {
    if (
      !item?.hasOwnTreeItems ||
      item?.checkedStatus !== IndeterminateCheckboxStatus.checked
    ) {
      continue;
    }

    itemsWithSelectedChildren = processChildrenSelection({
      items: itemsWithSelectedChildren,
      itemId: item.itemId,
      checkedStatus: IndeterminateCheckboxStatus.checked,
      forceCheckedStatusForDisabled: true,
      parentChildMap,
    });
  }

  const result: TreeViewItemInterface[] = [];

  for (const item of itemsWithSelectedChildren) {
    if (
      !item?.hasOwnTreeItems ||
      (isTopLevelSelectable === false && item.parentId === null)
    ) {
      result.push(item);
      continue;
    }

    const childrenUniqueStatuses = getChildrenUniqueStatuses({
      items: itemsWithSelectedChildren,
      itemId: item.itemId,
      parentChildMap,
    });

    const parentStatus =
      childrenUniqueStatuses.length > 1
        ? IndeterminateCheckboxStatus.indeterminate
        : childrenUniqueStatuses[0];

    result.push(parentStatus ? { ...item, checkedStatus: parentStatus } : item);
  }

  return result;
};

const filterTopLevelItemsIfNeeded = (
  preselectedItems: TreeItemSelectedInterface[] | undefined,
  treeViewData: TreeViewItemInterface[],
  isTopLevelSelectable: boolean
): TreeItemSelectedInterface[] | undefined => {
  if (!preselectedItems || isTopLevelSelectable !== false) {
    return preselectedItems;
  }

  return preselectedItems.filter(item => {
    const itemData = treeViewData.find(i => i.itemId === item.itemId);
    return itemData ? itemData.parentId !== null : false;
  });
};

export const getInitialItems = ({
  children,
  preselectedItems: rawPreselectedItems,
  checkParents,
  checkChildren,
  selectable,
  isDisabled: isTreeViewDisabled,
  isTopLevelSelectable,
  items,
}: Pick<
  UseTreeViewProps,
  | 'children'
  | 'preselectedItems'
  | 'checkParents'
  | 'checkChildren'
  | 'selectable'
  | 'isDisabled'
  | 'isTopLevelSelectable'
> & { items?: TreeViewItemInterface[] }) => {
  const treeViewData =
    items ||
    getTreeViewData({
      children,
      checkChildren,
      selectable,
      preselectedItems: rawPreselectedItems,
      isTreeViewDisabled,
    });

  const preselectedItems =
    rawPreselectedItems?.length && selectable === TreeViewSelectable.single
      ? [rawPreselectedItems[0]]
      : rawPreselectedItems;

  const filteredPreselectedItems = filterTopLevelItemsIfNeeded(
    preselectedItems,
    treeViewData,
    isTopLevelSelectable
  );

  const enhancedWithPreselectedItems = filteredPreselectedItems
    ? treeViewData.map(treeViewDataItem => {
        if (
          isTopLevelSelectable === false &&
          treeViewDataItem.parentId === null
        ) {
          return treeViewDataItem;
        }

        const preselectedItem = filteredPreselectedItems.find(
          ({ itemId }) => treeViewDataItem.itemId === itemId
        );

        return preselectedItem
          ? {
              ...treeViewDataItem,
              checkedStatus: preselectedItem.checkedStatus,
            }
          : treeViewDataItem;
      })
    : treeViewData;

  const itemsWithProcessedChildrenSelection = checkChildren
    ? enhancedWithPreselectedItems.reduce((result, item) => {
        return item.checkedStatus === IndeterminateCheckboxStatus.checked
          ? processChildrenSelection({
              items: result,
              itemId: item.itemId,
              checkedStatus: item.checkedStatus,
            })
          : result;
      }, enhancedWithPreselectedItems)
    : enhancedWithPreselectedItems;

  const result =
    selectable === TreeViewSelectable.multi &&
    checkParents &&
    filteredPreselectedItems
      ? processInitialParentStatuses({
          items: itemsWithProcessedChildrenSelection,
          isTopLevelSelectable,
        })
      : itemsWithProcessedChildrenSelection;

  if (
    isTopLevelSelectable === false &&
    selectable === TreeViewSelectable.multi
  ) {
    return result.map(item =>
      item.parentId === null ? { ...item, checkedStatus: undefined } : item
    );
  }

  return result;
};

export const selectSingle = ({
  items,
  itemId,
  checkedStatus,
}: {
  items: TreeViewItemInterface[];
  itemId: TreeViewItemInterface['itemId'];
  checkedStatus: TreeViewItemInterface['checkedStatus'];
}) => {
  return items.map(item => ({
    ...item,
    checkedStatus:
      item.itemId === itemId
        ? checkedStatus
        : IndeterminateCheckboxStatus.unchecked,
  }));
};

// Internal: walks parents bottom-up, mutating `itemMap` in place.
// Reused by `toggleMulti` so we don't rebuild itemMap/parentChildMap per call.
const processParentsSelectionMut = ({
  itemMap,
  parentChildMap,
  itemId,
  checkedStatus,
  isTopLevelSelectable = true,
}: {
  itemMap: Map<string, TreeViewItemInterface>;
  parentChildMap: Map<string, string[]>;
  itemId: TreeViewItemInterface['itemId'];
  checkedStatus: TreeViewItemInterface['checkedStatus'];
  isTopLevelSelectable?: boolean;
}) => {
  let currentItem = itemMap.get(itemId);
  let currentStatus = checkedStatus;

  // Iteratively process parents from bottom to top
  while (currentItem && currentItem.parentId !== null) {
    const parentId = currentItem.parentId;
    const parent = parentId ? itemMap.get(parentId) : undefined;

    if (!parent || !parentId) break;

    if (!isTopLevelSelectable && !parent.parentId) break;

    // Get all siblings including current item
    const siblings = parentChildMap.get(parentId) || [];
    let allSameStatus = true;
    const firstStatus = currentStatus;

    for (const siblingId of siblings) {
      const sibling = itemMap.get(siblingId);
      if (!sibling) continue;

      const siblingStatus =
        sibling.checkedStatus || IndeterminateCheckboxStatus.unchecked;
      if (siblingStatus !== firstStatus) {
        allSameStatus = false;
        break;
      }
    }

    const parentStatus = allSameStatus
      ? currentStatus
      : IndeterminateCheckboxStatus.indeterminate;

    // Update parent in shared map
    itemMap.set(parentId, { ...parent, checkedStatus: parentStatus });

    // Move up to next parent
    currentItem = parent;
    currentStatus = parentStatus;
  }
};

// Internal: scans the subtree under `itemId` directly on the shared maps,
// without allocating an intermediate children array.
const getMultiToggledStatusFromMaps = ({
  itemMap,
  parentChildMap,
  itemId,
}: {
  itemMap: Map<string, TreeViewItemInterface>;
  parentChildMap: Map<string, string[]>;
  itemId: string;
}) => {
  const stack: string[] = [itemId];

  while (stack.length > 0) {
    const id = stack.pop() as string;
    const item = itemMap.get(id);

    if (!item) continue;

    if (!item.isDisabled) {
      if (
        !item.checkedStatus ||
        item.checkedStatus === IndeterminateCheckboxStatus.unchecked
      ) {
        return IndeterminateCheckboxStatus.checked;
      }
    }

    const children = parentChildMap.get(id);

    if (children) {
      for (const childId of children) {
        stack.push(childId);
      }
    }
  }

  return IndeterminateCheckboxStatus.unchecked;
};

// Optimized: Build maps once and reuse them, reduce array iterations
export const toggleMulti = ({
  items,
  itemId,
  checkedStatus: rawCheckedStatus,
  forceCheckedStatus,
  checkChildren,
  checkParents,
  isTopLevelSelectable,
}: {
  items: TreeViewItemInterface[];
  itemId: TreeViewItemInterface['itemId'];
  checkedStatus: TreeViewItemInterface['checkedStatus'];
  forceCheckedStatus?: boolean;
} & Pick<
  UseTreeViewProps,
  'checkChildren' | 'checkParents' | 'isTopLevelSelectable'
>) => {
  // Build the shared lookup maps once and reuse them across all helpers
  // below, instead of letting each rebuild its own.
  const parentChildMap = buildParentChildMap(items);
  const itemMap = new Map<string, TreeViewItemInterface>();

  for (const it of items) {
    if (it.itemId) itemMap.set(it.itemId, it);
  }

  const item = itemId ? itemMap.get(itemId) : undefined;

  if (isTopLevelSelectable === false && !item?.parentId) {
    return items;
  }

  if (!itemId) {
    return items;
  }

  const checkedStatus =
    checkChildren && !forceCheckedStatus
      ? getMultiToggledStatusFromMaps({ itemMap, parentChildMap, itemId })
      : rawCheckedStatus;

  // Update the item itself in the shared map.
  if (item) {
    itemMap.set(itemId, { ...item, checkedStatus });
  }

  // Process children if needed (mutates itemMap in place).
  if (checkChildren) {
    processChildrenSelectionMut({
      itemMap,
      parentChildMap,
      itemId,
      checkedStatus,
    });
  }

  // Process parents if needed (mutates itemMap in place).
  if (checkParents) {
    processParentsSelectionMut({
      itemMap,
      parentChildMap,
      itemId,
      checkedStatus,
      isTopLevelSelectable,
    });
  }

  // Single materialisation at the end.
  return Array.from(itemMap.values());
};

const getParentIds = ({
  items,
  itemId,
  prevParentIds = [],
}: {
  items: TreeViewItemInterface[];
  itemId: TreeViewItemInterface['itemId'];
  prevParentIds?: TreeViewItemInterface['itemId'][];
}) => {
  const item = items.find(item => item.itemId === itemId);

  if (!item) {
    return prevParentIds;
  }

  const { parentId } = item;

  return parentId
    ? getParentIds({
        itemId: parentId,
        items,
        prevParentIds: [...prevParentIds, parentId],
      })
    : prevParentIds;
};

const getEnabledRootParentIds = (items: TreeViewItemInterface[]) => {
  const rootParents = items.filter(
    ({ parentId, isDisabled }) => !parentId && !isDisabled
  );

  return rootParents.map(({ itemId }) => itemId);
};

// Optimized: Reduce iterations and use Map for batch updates
export const toggleAllMulti = ({
  items,
  checkedStatus,
  checkChildren,
  checkParents,
  isTopLevelSelectable,
}: {
  items: TreeViewItemInterface[];
  checkedStatus: TreeViewItemInterface['checkedStatus'];
} & Pick<
  UseTreeViewProps,
  'checkChildren' | 'checkParents' | 'isTopLevelSelectable'
>) => {
  // Fast path: simple case without children/parent checking
  if (!checkChildren) {
    const result: TreeViewItemInterface[] = [];
    for (const item of items) {
      if (
        item?.isDisabled ||
        (isTopLevelSelectable === false && !item.parentId)
      ) {
        result.push(item);
      } else {
        result.push({ ...item, checkedStatus });
      }
    }
    return result;
  }

  if (isTopLevelSelectable === false) {
    const result: TreeViewItemInterface[] = [];
    for (const item of items) {
      if (item.isDisabled || item.parentId === null) {
        result.push(item);
      } else {
        result.push({ ...item, checkedStatus });
      }
    }
    return result;
  }

  if (!checkParents) {
    const result: TreeViewItemInterface[] = [];
    for (const item of items) {
      if (item.isDisabled) {
        result.push(item);
      } else {
        result.push({ ...item, checkedStatus });
      }
    }
    return result;
  }

  // Complex case: need to process each root parent
  const rootParentIds = getEnabledRootParentIds(items);
  let resultItems = items;

  for (const rootParentId of rootParentIds) {
    resultItems = toggleMulti({
      items: resultItems,
      itemId: rootParentId,
      checkedStatus,
      forceCheckedStatus: true,
      checkChildren,
      checkParents,
      isTopLevelSelectable,
    });
  }

  return resultItems;
};

export const getInitialExpandedIds = ({
  items,
  initialExpandedItems,
}: { items: TreeViewItemInterface[] } & Pick<
  UseTreeViewProps,
  'initialExpandedItems'
>) => {
  if (!initialExpandedItems || initialExpandedItems.length === 0) {
    return [];
  }

  return initialExpandedItems.reduce((result, itemId) => {
    return [...result, itemId, ...getParentIds({ itemId, items })];
  }, []);
};

// Structural shallow comparison for arrays of TreeItemSelectedInterface-shaped
// objects. Replaces a previous JSON.stringify-based check that ran on the
// hot path (effects in useTreeView).
export const isEqualArrays = <T>(arrayA: T[], arrayB: T[]) => {
  if (arrayA === arrayB) return true;
  if (!arrayA || !arrayB) return false;
  if (arrayA.length !== arrayB.length) return false;

  for (let i = 0; i < arrayA.length; i++) {
    const a = arrayA[i] as unknown as TreeItemSelectedInterface | undefined;
    const b = arrayB[i] as unknown as TreeItemSelectedInterface | undefined;

    if (a === b) continue;
    if (!a || !b) return false;

    if (
      a.itemId !== b.itemId ||
      a.checkedStatus !== b.checkedStatus ||
      a.isDisabled !== b.isDisabled
    ) {
      return false;
    }
  }

  return true;
};

export const isSelectedItemsChanged = (
  prevSelectedItems: TreeItemSelectedInterface[] | null,
  selectedItems: TreeItemSelectedInterface[]
) => {
  return !isEqualArrays(prevSelectedItems ?? [], selectedItems);
};
