import * as React from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';

import { TreeItem } from './TreeItem';
import { TreeItemHierarchyContext } from './TreeItemHierarchyContext';
import { TreeViewVirtualizationContext } from './TreeViewVirtualizationContext';
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

      const key = isTreeItem
        ? child.props.itemId
        : (React.isValidElement(child) && child.key) || `content-${index}`;

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
  const getScrollElement = React.useCallback(
    () => context?.scrollRef.current ?? null,
    [context?.scrollRef]
  );
  const getItemKey = React.useCallback(
    (index: number) => rows[index].key,
    [rows]
  );
  const virtualizer = useVirtualizer<HTMLUListElement, HTMLDivElement>({
    count: rows.length,
    getScrollElement,
    getItemKey,
    estimateSize: () => 32,
    overscan: 3,
    scrollMargin,
    initialOffset: () => context?.scrollRef.current?.scrollTop ?? 0,
    useAnimationFrameWithResizeObserver: true,
  });
  const virtualItems = virtualizer.getVirtualItems();

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
      style={{ height: virtualizer.getTotalSize(), position: 'relative' }}
    >
      {virtualItems.map(item => {
        const row = rows[item.index];

        return (
          <div
            data-index={item.index}
            key={item.key}
            ref={virtualizer.measureElement}
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
