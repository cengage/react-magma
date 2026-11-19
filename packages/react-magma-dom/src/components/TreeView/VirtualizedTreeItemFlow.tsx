import * as React from 'react';

import { TreeItem } from './TreeItem';
import { TreeItemHierarchyContext } from './TreeItemHierarchyContext';
import { TreeViewVirtualizationContext } from './TreeViewVirtualizationContext';
import { useTreeViewVirtualizer } from './useTreeViewVirtualizer';
import { containsTreeItem } from './utils';

interface VirtualizedTreeItemFlowProps {
  childDepth: number;
  children: React.ReactNode[];
  expanded: boolean;
}

export const VirtualizedTreeItemFlow = ({
  childDepth,
  children,
  expanded,
}: VirtualizedTreeItemFlowProps) => {
  const context = React.useContext(TreeViewVirtualizationContext);
  const groupRef = React.useRef<HTMLUListElement>(null);
  const [scrollMargin, setScrollMargin] = React.useState(0);
  const rows = React.useMemo(() => {
    const setSize = children.filter(
      child => React.isValidElement(child) && child.type === TreeItem
    ).length;
    let position = 0;

    return children.flatMap((child, index) => {
      const isTreeItem = React.isValidElement(child) && child.type === TreeItem;

      if (isTreeItem && !expanded) return [];
      if (isTreeItem) position += 1;

      let key = `content-${index}`;

      if (React.isValidElement(child)) {
        key = isTreeItem ? child.props.itemId : child.key || key;
      }

      return [
        {
          child,
          index,
          isTreeItem,
          key,
          position,
          setSize,
        },
      ];
    });
  }, [children, expanded]);
  const getItemKey = React.useCallback(
    (index: number) => rows[index].key,
    [rows]
  );
  const virtualizer = useTreeViewVirtualizer({
    size: rows.length,
    parentRef: context?.scrollRef ?? groupRef,
    getItemKey,
    scrollMargin,
  });
  const virtualItems = virtualizer.virtualItems;

  // Content before this group can change height without changing its rows.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useLayoutEffect(() => {
    const group = groupRef.current;
    const scroll = context?.scrollRef.current;

    if (group && scroll) {
      const offset =
        group.getBoundingClientRect().top -
        scroll.getBoundingClientRect().top +
        scroll.scrollTop;

      setScrollMargin(previous => (previous === offset ? previous : offset));
    }
  });

  React.useLayoutEffect(() => {
    const requestedItemId = context?.requestedItemId;

    if (!requestedItemId) return;

    const index = rows.findIndex(row =>
      row.isTreeItem ? containsTreeItem(row.child, requestedItemId) : false
    );

    if (index >= 0) {
      if (!groupRef.current?.querySelector(`#${CSS.escape(requestedItemId)}`)) {
        virtualizer.scrollToIndex(index, { align: 'auto' });
      }
      context.resolveRequestedFocus();
    }
  }, [context, rows, virtualItems, virtualizer]);

  return (
    <ul
      ref={groupRef}
      role={expanded ? 'group' : 'none'}
      style={{
        height: Math.max(0, virtualizer.totalSize - scrollMargin),
        position: 'relative',
      }}
    >
      {virtualItems.map(item => {
        const row = rows[item.index];

        return (
          <div
            data-index={item.index}
            key={item.key}
            ref={item.measureRef}
            role="none"
            style={{
              position: 'absolute',
              top: 0,
              transform: `translateY(${item.start - scrollMargin}px)`,
              width: '100%',
            }}
          >
            {row.isTreeItem ? (
              <TreeItemHierarchyContext.Provider
                value={{
                  depth: childDepth,
                  parentDepth: childDepth - 1,
                  isTopLevel: false,
                  index: row.index,
                  posInSet: row.position,
                  setSize: row.setSize,
                }}
              >
                {row.child}
              </TreeItemHierarchyContext.Provider>
            ) : (
              row.child
            )}
          </div>
        );
      })}
    </ul>
  );
};
