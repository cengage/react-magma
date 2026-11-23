import * as React from 'react';

import styled from '@emotion/styled';
import { useVirtualizer } from '@tanstack/react-virtual';

import { TreeItem } from './TreeItem';
import { TreeItemHierarchyContext } from './TreeItemHierarchyContext';
import { TreeViewAnnounceContext } from './TreeViewAnnounceContext';
import {
  TreeViewAnnouncer,
  TreeViewAnnouncerHandle,
} from './TreeViewAnnouncer';
import { TreeViewConfigContext } from './TreeViewConfigContext';
import { TreeViewExpansionContext } from './TreeViewExpansionContext';
import { TreeViewSelectionContext } from './TreeViewSelectionContext';
import { TreeViewVirtualizationContext } from './TreeViewVirtualizationContext';
import { TreeViewSelectable } from './types';
import { useTreeItem } from './useTreeItem';
import { UseTreeViewProps, useTreeView } from './useTreeView';
import {
  containsTreeItem,
  flattenTreeViewChildren,
  resolveTreeViewString,
} from './utils';
import { I18nContext } from '../../i18n';
import { InverseContext, useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';

export interface TreeViewProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'>,
    UseTreeViewProps {
  /**
   * Enable virtualization for better performance with large trees.
   * @default false
   */
  enableVirtualization?: boolean;
  /**
   * Height of the scrollable TreeView container in pixels.
   * When enableVirtualization is true, provide this prop or a bounded CSS
   * height with overflow: auto so virtualization can calculate the viewport.
   * @example height={400}
   */
  height?: number;
}

interface VirtualContainerProps {
  height: number;
}

interface VirtualItemProps {
  transform: number;
}

const StyledTreeView = styled.ul<TreeViewProps & { isVirtualized?: boolean }>`
  padding: 0;
  margin: 0;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral0
      : props.theme.colors.neutral700};
  position: ${props => (props.isVirtualized ? 'relative' : 'static')};
  ul {
    padding: 0;
    margin: 0;
    li {
      margin: 0;
    }
  }
`;

const VirtualContainer = styled.div<VirtualContainerProps>`
  width: 100%;
  position: relative;
  height: ${props => props.height}px;
`;

const VirtualItem = styled.div<VirtualItemProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform: ${props => `translateY(${props.transform}px)`};

  /* Ensure dropdowns and other floating elements appear above items */
  &:focus-within {
    z-index: 1;
  }
  &[data-testid='popoverContent'] {
    z-index: 1;
  }
`;

export const TreeView = React.forwardRef<HTMLUListElement, TreeViewProps>(
  (props, ref) => {
    const {
      ariaLabel,
      ariaLabelledBy,
      children,
      isInverse: isInverseProp,
      onExpandedChange,
      onSelectedItemChange,
      selectable,
      testId,
      apiRef,
      enableVirtualization = false,
      height,
      ...rest
    } = props;

    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);
    const i18n = React.useContext(I18nContext);

    const { selectionContextValue, expansionContextValue, configContextValue } =
      useTreeView(props);

    useTreeItem({ label: ariaLabel, itemId: '' }, ref);

    const inverseContextValue = React.useMemo(
      () => ({ isInverse }),
      [isInverse]
    );

    const parentRef = React.useRef<HTMLUListElement>(null);
    const setTreeRef = React.useCallback(
      (element: HTMLUListElement | null) => {
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLUListElement | null>).current =
            element;
        }
        parentRef.current = element;
      },
      [ref]
    );
    const [requestedItemId, setRequestedItemId] = React.useState<string | null>(
      null
    );
    const resolveRequestedFocus = React.useCallback(() => {
      if (!requestedItemId) return;

      const target = parentRef.current?.querySelector<HTMLElement>(
        `#${CSS.escape(requestedItemId)}`
      );

      if (target) {
        target.focus();
        setRequestedItemId(null);
      }
    }, [requestedItemId]);
    const virtualizationContextValue = React.useMemo(
      () => ({
        scrollRef: parentRef,
        requestedItemId,
        resolveRequestedFocus,
      }),
      [requestedItemId, resolveRequestedFocus]
    );
    const [isMounted, setIsMounted] = React.useState(false);

    // Live regions sit outside the tree so they do not affect item names.
    const announcerRef = React.useRef<TreeViewAnnouncerHandle>(null);
    const branchIds = React.useMemo(() => {
      if (
        configContextValue.selectable !== TreeViewSelectable.multi ||
        !configContextValue.checkChildren
      ) {
        return [];
      }

      return Array.from(
        new Set(
          selectionContextValue.items
            .map(item => item.parentId)
            .filter((parentId): parentId is string => Boolean(parentId))
        )
      );
    }, [
      configContextValue.checkChildren,
      configContextValue.selectable,
      selectionContextValue.items,
    ]);

    const announceContextValue = React.useMemo(
      () => ({
        announce: (message: string, itemId?: string) =>
          announcerRef.current?.announce(message, itemId),
      }),
      []
    );

    React.useEffect(() => {
      setIsMounted(true);
    }, []);

    // A bulk action moves no focus and changes no item under the cursor, so no
    // screen reader reports it. No dependency array on purpose: this must run
    // after the tree items' effects in the same commit, which read the flag.
    React.useEffect(() => {
      const bulkAction = expansionContextValue.bulkExpansionRef?.current;

      if (!bulkAction) {
        return;
      }

      expansionContextValue.bulkExpansionRef.current = null;

      announceContextValue.announce(
        resolveTreeViewString(
          i18n,
          bulkAction === 'expand'
            ? 'allItemsExpandedAnnounce'
            : 'allItemsCollapsedAnnounce'
        )
      );
    });

    // Flatten tree structure for virtualization
    const flattenedItems = React.useMemo(() => {
      if (!enableVirtualization || !isMounted) return [];

      const items: Array<{
        child: React.ReactElement;
        depth: number;
        index: number;
        key: string;
        itemId: string;
        isMixed: boolean;
        posInSet?: number;
        setSize?: number;
      }> = [];

      const flatten = (childrenToFlatten: React.ReactNode, depth = 0) => {
        const childNodes = flattenTreeViewChildren(childrenToFlatten);
        const setSize = childNodes.filter(
          child => React.isValidElement(child) && child.type === TreeItem
        ).length;
        let treeItemIndex = 0;

        childNodes.forEach(child => {
          if (!React.isValidElement(child) || child.type !== TreeItem) {
            return;
          }

          const currentIndex = treeItemIndex++;

          const itemId = child.props.itemId;
          const itemKey = `${itemId}-${depth}`;

          const directChildren = flattenTreeViewChildren(child.props.children);
          const directChildItemIds = directChildren
            .filter(
              (
                childNode
              ): childNode is React.ReactElement<{ itemId: string }> =>
                React.isValidElement(childNode) && childNode.type === TreeItem
            )
            .map(childNode => childNode.props.itemId);
          const isMixed =
            directChildItemIds.length > 0 &&
            directChildren.some(
              childNode =>
                !React.isValidElement(childNode) || childNode.type !== TreeItem
            );

          // Keep mixed children inside their parent. Their ordered child flow
          // virtualizes visible rows without moving content out of the branch.
          const rowChild = isMixed
            ? child
            : React.cloneElement(child, {
                ...child.props,
                hasTreeItemChildren: directChildItemIds.length > 0,
                directChildItemIds:
                  directChildItemIds.length > 0
                    ? directChildItemIds
                    : undefined,
                children:
                  directChildItemIds.length > 0 ? null : child.props.children,
              });

          items.push({
            child: rowChild,
            depth,
            index: currentIndex,
            key: itemKey,
            itemId,
            isMixed,
            posInSet: currentIndex + 1,
            setSize,
          });

          const isExpanded = expansionContextValue.expandedSet?.has(itemId);

          if (isExpanded && directChildItemIds.length > 0 && !isMixed) {
            flatten(child.props.children, depth + 1);
          }
        });
      };

      flatten(children);

      return items;
    }, [
      children,
      enableVirtualization,
      expansionContextValue.expandedSet,
      isMounted,
    ]);

    const shouldUseVirtualization = enableVirtualization && isMounted;

    // Expansion changes row indexes. Keep measurements and ResizeObserver
    // subscriptions attached to the same item as its index changes.
    const getItemKey = React.useCallback(
      (index: number) => flattenedItems[index].key,
      [flattenedItems]
    );

    const rowVirtualizer = useVirtualizer<HTMLUListElement, HTMLDivElement>({
      count: shouldUseVirtualization ? flattenedItems.length : 0,
      getScrollElement: () => parentRef.current,
      getItemKey,
      estimateSize: () => 32,
      overscan: 3,
      enabled: shouldUseVirtualization,
      useAnimationFrameWithResizeObserver: true,
    });
    const virtualItems = rowVirtualizer.getVirtualItems();

    const visibleItemIds = React.useMemo(() => {
      const disabledIds = new Set(
        selectionContextValue.items
          .filter(item => item.isDisabled)
          .map(item => item.itemId)
      );
      const itemIds: string[] = [];
      const visit = (nodes: React.ReactNode) => {
        flattenTreeViewChildren(nodes).forEach(node => {
          if (!React.isValidElement(node) || node.type !== TreeItem) return;

          const itemId = node.props.itemId;

          if (!disabledIds.has(itemId)) itemIds.push(itemId);
          if (expansionContextValue.expandedSet?.has(itemId)) {
            visit(node.props.children);
          }
        });
      };

      visit(children);

      return itemIds;
    }, [
      children,
      expansionContextValue.expandedSet,
      selectionContextValue.items,
    ]);

    const handleKeyDownCapture = (
      event: React.KeyboardEvent<HTMLUListElement>
    ) => {
      rest.onKeyDownCapture?.(event);

      if (
        event.defaultPrevented ||
        event.isPropagationStopped() ||
        !shouldUseVirtualization ||
        !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)
      ) {
        return;
      }

      const target = event.target as HTMLElement;
      const treeItem = target.closest<HTMLElement>('[role="treeitem"]');

      if (target !== treeItem) return;

      const index = visibleItemIds.indexOf(treeItem.id);

      if (index < 0) return;

      let nextIndex = index;

      switch (event.key) {
        case 'ArrowDown':
          nextIndex = (index + 1) % visibleItemIds.length;
          break;
        case 'ArrowUp':
          nextIndex =
            (index - 1 + visibleItemIds.length) % visibleItemIds.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = visibleItemIds.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      event.stopPropagation();
      setRequestedItemId(visibleItemIds[nextIndex]);
    };

    React.useLayoutEffect(() => {
      if (!requestedItemId || !shouldUseVirtualization) return;

      const index = flattenedItems.findIndex(item =>
        containsTreeItem(item.child, requestedItemId)
      );

      if (index >= 0) {
        resolveRequestedFocus();

        if (
          !parentRef.current?.querySelector(
            `#${CSS.escape(flattenedItems[index].itemId)}`
          )
        ) {
          rowVirtualizer.scrollToIndex(index, { align: 'auto' });
        }
      }
    }, [
      flattenedItems,
      requestedItemId,
      resolveRequestedFocus,
      rowVirtualizer,
      shouldUseVirtualization,
      virtualItems,
    ]);

    // Process children without cloneElement - use context instead
    const processedChildren = React.useMemo(() => {
      if (shouldUseVirtualization) {
        return null; // Handled by virtualizer below
      }

      let treeItemIndex = 0;

      return flattenTreeViewChildren(children).map(child => {
        if (!React.isValidElement(child)) {
          return null;
        }

        if (child.type === TreeItem) {
          const currentIndex = treeItemIndex++;
          const hierarchyValue = {
            depth: 0,
            parentDepth: 0,
            isTopLevel: true,
            index: currentIndex,
          };

          // Wrap in context provider instead of cloning
          return (
            <TreeItemHierarchyContext.Provider
              key={`tree-item-${currentIndex}`}
              value={hierarchyValue}
            >
              {child}
            </TreeItemHierarchyContext.Provider>
          );
        }

        return null;
      });
    }, [children, shouldUseVirtualization]);

    return (
      <InverseContext.Provider value={inverseContextValue}>
        <TreeViewSelectionContext.Provider value={selectionContextValue}>
          <TreeViewExpansionContext.Provider value={expansionContextValue}>
            <TreeViewConfigContext.Provider value={configContextValue}>
              <TreeViewAnnounceContext.Provider value={announceContextValue}>
                <StyledTreeView
                  {...rest}
                  onKeyDownCapture={handleKeyDownCapture}
                  aria-label={ariaLabel}
                  aria-labelledby={ariaLabelledBy}
                  aria-multiselectable={selectable === TreeViewSelectable.multi}
                  data-testid={testId}
                  isInverse={isInverse}
                  isVirtualized={shouldUseVirtualization}
                  ref={setTreeRef}
                  role="tree"
                  theme={theme}
                  style={{
                    ...rest.style,
                    ...(shouldUseVirtualization && height
                      ? { height: `${height}px`, overflow: 'auto' }
                      : {}),
                  }}
                >
                  {shouldUseVirtualization ? (
                    <VirtualContainer height={rowVirtualizer.getTotalSize()}>
                      {virtualItems.map(virtualItem => {
                        const item = flattenedItems[virtualItem.index];
                        const hierarchyValue = {
                          depth: item.depth,
                          parentDepth: Math.max(0, item.depth - 1),
                          isTopLevel: item.depth === 0,
                          index: item.index,
                          isVirtualized: !item.isMixed,
                          posInSet: item.posInSet,
                          setSize: item.setSize,
                        };

                        return (
                          <VirtualItem
                            data-index={virtualItem.index}
                            key={virtualItem.key}
                            transform={virtualItem.start}
                            ref={(el: HTMLDivElement) => {
                              rowVirtualizer.measureElement(el);
                            }}
                          >
                            <TreeItemHierarchyContext.Provider
                              value={hierarchyValue}
                            >
                              {item.isMixed ? (
                                <TreeViewVirtualizationContext.Provider
                                  value={virtualizationContextValue}
                                >
                                  {item.child}
                                </TreeViewVirtualizationContext.Provider>
                              ) : (
                                item.child
                              )}
                            </TreeItemHierarchyContext.Provider>
                          </VirtualItem>
                        );
                      })}
                    </VirtualContainer>
                  ) : (
                    processedChildren
                  )}
                </StyledTreeView>

                <TreeViewAnnouncer
                  ref={announcerRef}
                  branchIds={branchIds}
                  testId={testId ? `${testId}-announce` : undefined}
                />
              </TreeViewAnnounceContext.Provider>
            </TreeViewConfigContext.Provider>
          </TreeViewExpansionContext.Provider>
        </TreeViewSelectionContext.Provider>
      </InverseContext.Provider>
    );
  }
);
