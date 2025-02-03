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
  negative = false
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

const processItemCheckedStatus = ({
  items,
  itemId,
  checkedStatus,
  forceCheckedStatusForDisabled,
}: {
  items: TreeViewItemInterface[];
  itemId: TreeViewItemInterface['itemId'];
  checkedStatus: TreeViewItemInterface['checkedStatus'];
  forceCheckedStatusForDisabled?: boolean;
}) => {
  const item = items.find(item => item.itemId === itemId);

  if (item?.isDisabled && !forceCheckedStatusForDisabled) {
    return items;
  }

  return items.map(item =>
    item.itemId === itemId ? { ...item, checkedStatus } : item
  );
};

const processChildrenSelection = ({
  items,
  itemId,
  checkedStatus,
  forceCheckedStatusForDisabled,
}: {
  items: TreeViewItemInterface[];
  itemId: TreeViewItemInterface['itemId'];
  checkedStatus: TreeViewItemInterface['checkedStatus'];
  forceCheckedStatusForDisabled?: boolean;
}) => {
  const item = items.find(item => item.itemId === itemId);

  const itemsWithProcessedItemCheckedStatus = processItemCheckedStatus({
    items,
    itemId,
    checkedStatus,
    forceCheckedStatusForDisabled,
  });

  if (!item?.hasOwnTreeItems) {
    return itemsWithProcessedItemCheckedStatus;
  }

  const directChildren = itemsWithProcessedItemCheckedStatus.filter(
    item => item?.parentId === itemId
  );

  const itemsWithProcessedChildren = directChildren.reduce(
    (result, directChild) => {
      return processChildrenSelection({
        items: result,
        itemId: directChild.itemId,
        checkedStatus,
        forceCheckedStatusForDisabled,
      });
    },
    itemsWithProcessedItemCheckedStatus
  );

  const childrenIds = getChildrenIds({
    items: itemsWithProcessedChildren,
    itemId,
  });
  const children = itemsWithProcessedChildren.filter(item =>
    childrenIds.includes(item.itemId)
  );

  const uniqueChildrenCheckedStatus = Array.from(
    new Set(
      children.map(
        children =>
          children.checkedStatus === IndeterminateCheckboxStatus.checked
      )
    )
  );
  const isAllChildrenWithTheSameCheckedStatus =
    uniqueChildrenCheckedStatus.length === 1;
  const itemCheckedStatus = isAllChildrenWithTheSameCheckedStatus
    ? checkedStatus
    : IndeterminateCheckboxStatus.indeterminate;

  return processItemCheckedStatus({
    items: itemsWithProcessedChildren,
    itemId,
    checkedStatus: itemCheckedStatus,
    forceCheckedStatusForDisabled,
  });
};

export const getChildrenIds = ({
  items,
  itemId,
}: {
  items: TreeViewItemInterface[];
  itemId: TreeViewItemInterface['itemId'];
}) => {
  return items.reduce(
    (result, item) => {
      if (item?.parentId !== itemId) {
        return result;
      }

      if (item?.hasOwnTreeItems) {
        return [...result, ...getChildrenIds({ items, itemId: item.itemId })];
      }

      return [...result, item.itemId];
    },
    [itemId]
  );
};

const getChildren = ({
  items,
  itemId,
}: {
  items: TreeViewItemInterface[];
  itemId: TreeViewItemInterface['itemId'];
}) => {
  const childrenIds = getChildrenIds({ items, itemId });
  return items.filter(item => childrenIds.includes(item.itemId));
};

const getChildrenUniqueStatuses = ({
  items,
  itemId,
}: {
  items: TreeViewItemInterface[];
  itemId: TreeViewItemInterface['itemId'];
}) => {
  const childrenAndItemIds = getChildrenIds({ items, itemId });
  const leaves = items.filter(item => {
    return !item?.hasOwnTreeItems && childrenAndItemIds.includes(item.itemId);
  });
  const uniqueStatuses = Array.from(
    new Set(
      leaves.map(
        item => item.checkedStatus ?? IndeterminateCheckboxStatus.unchecked
      )
    )
  );

  return uniqueStatuses.filter(
    checkedStatus =>
      checkedStatus &&
      checkedStatus !== IndeterminateCheckboxStatus.indeterminate
  );
};

const processInitialParentStatuses = ({
  items,
}: {
  items: TreeViewItemInterface[];
}) => {
  const itemsWithSelectedChildren = items.reduce((result, item) => {
    if (
      !item?.hasOwnTreeItems ||
      item?.checkedStatus !== IndeterminateCheckboxStatus.checked
    ) {
      return result;
    }

    return processChildrenSelection({
      items: result,
      itemId: item.itemId,
      checkedStatus: IndeterminateCheckboxStatus.checked,
      forceCheckedStatusForDisabled: true,
    });
  }, items);

  return itemsWithSelectedChildren.map(item => {
    if (!item?.hasOwnTreeItems) {
      return item;
    }

    const childrenUniqueStatuses = getChildrenUniqueStatuses({
      items: itemsWithSelectedChildren,
      itemId: item.itemId,
    });

    const parentStatus =
      childrenUniqueStatuses.length > 1
        ? IndeterminateCheckboxStatus.indeterminate
        : childrenUniqueStatuses[0];

    return parentStatus ? { ...item, checkedStatus: parentStatus } : item;
  });
};

export const getInitialItems = ({
  children,
  preselectedItems: rawPreselectedItems,
  checkParents,
  checkChildren,
  selectable,
  isDisabled: isTreeViewDisabled,
}: Pick<
  UseTreeViewProps,
  | 'children'
  | 'preselectedItems'
  | 'checkParents'
  | 'checkChildren'
  | 'selectable'
  | 'isDisabled'
>) => {
  const treeViewData = getTreeViewData({
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

  const enhancedWithPreselectedItems = preselectedItems
    ? treeViewData.map(treeViewDataItem => {
        const preselectedItem = preselectedItems.find(
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

  return selectable === TreeViewSelectable.multi &&
    checkParents &&
    preselectedItems
    ? processInitialParentStatuses({
        items: itemsWithProcessedChildrenSelection,
      })
    : itemsWithProcessedChildrenSelection;
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

const processParentsSelection = ({
  items,
  itemId,
  checkedStatus,
}: {
  items: TreeViewItemInterface[];
  itemId: TreeViewItemInterface['itemId'];
  checkedStatus: TreeViewItemInterface['checkedStatus'];
}) => {
  const item = items.find(item => item.itemId === itemId);

  if (item?.parentId === null) {
    return items;
  }

  const siblings = items.filter(i => i.parentId === item?.parentId);
  const isAllSiblingsHasTheSameStatus = siblings.every(
    item =>
      (item.checkedStatus || IndeterminateCheckboxStatus.unchecked) ===
      checkedStatus
  );
  const parentStatus = isAllSiblingsHasTheSameStatus
    ? checkedStatus
    : IndeterminateCheckboxStatus.indeterminate;

  const parent = items.find(i => i.itemId === item?.parentId);

  const nextItems = items.map(item =>
    item.itemId === parent.itemId
      ? { ...item, checkedStatus: parentStatus }
      : item
  );

  return processParentsSelection({
    items: nextItems,
    itemId: parent.itemId,
    checkedStatus: parentStatus,
  });
};

const getMultiToggledStatus = ({ items, itemId }) => {
  const children = getChildren({ items, itemId });
  const enabledChildren = children.filter(item => !item.isDisabled);

  if (
    enabledChildren.some(
      item =>
        !item.checkedStatus ||
        item.checkedStatus === IndeterminateCheckboxStatus.unchecked
    )
  ) {
    return IndeterminateCheckboxStatus.checked;
  }

  return IndeterminateCheckboxStatus.unchecked;
};

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
  const checkedStatus =
    checkChildren && !forceCheckedStatus
      ? getMultiToggledStatus({ items, itemId })
      : rawCheckedStatus;

  const itemsWithProcessedItemSelection = items.map(item =>
    item.itemId === itemId ? { ...item, checkedStatus } : item
  );
  const itemsWithProcessedChildrenSelection = checkChildren
    ? processChildrenSelection({
        items: itemsWithProcessedItemSelection,
        itemId,
        checkedStatus,
      })
    : itemsWithProcessedItemSelection;
  return checkParents && isTopLevelSelectable
    ? processParentsSelection({
        items: itemsWithProcessedChildrenSelection,
        itemId,
        checkedStatus,
      })
    : itemsWithProcessedChildrenSelection;
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
  if (!checkChildren) {
    return items.map(item => {
      if (item?.isDisabled) {
        return item;
      }

      return {
        ...item,
        ...(checkedStatus === IndeterminateCheckboxStatus.unchecked
          ? {}
          : { checkedStatus }),
      };
    });
  }

  const rootParentIds = getEnabledRootParentIds(items);

  return rootParentIds.reduce((result, rootParentId) => {
    return toggleMulti({
      items: result,
      itemId: rootParentId,
      checkedStatus,
      forceCheckedStatus: true,
      checkChildren,
      checkParents,
      isTopLevelSelectable,
    });
  }, items);
};

export const getInitialExpandedIds = ({
  items,
  initialExpandedItems,
}: { items: TreeViewItemInterface[] } & Pick<
  UseTreeViewProps,
  'initialExpandedItems'
>) => {
  if (!initialExpandedItems) {
    return initialExpandedItems;
  }

  return initialExpandedItems.reduce((result, itemId) => {
    return [...result, itemId, ...getParentIds({ itemId, items })];
  }, []);
};

export const isEqualArrays = <T>(arrayA: T[], arrayB: T[]) => {
  return JSON.stringify(arrayA) === JSON.stringify(arrayB);
};

export const isSelectedItemsChanged = (
  prevSelectedItems: TreeItemSelectedInterface[] | null,
  selectedItems: TreeItemSelectedInterface[]
) => {
  return !isEqualArrays(prevSelectedItems ?? [], selectedItems);
};
