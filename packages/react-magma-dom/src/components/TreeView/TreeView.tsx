import * as React from 'react';

import styled from '@emotion/styled';
import { useVirtualizer } from '@tanstack/react-virtual';

import { TreeItem } from './TreeItem';
import { TreeItemHierarchyContext } from './TreeItemHierarchyContext';
import { TreeViewConfigContext } from './TreeViewConfigContext';
import { TreeViewExpansionContext } from './TreeViewExpansionContext';
import { TreeViewSelectionContext } from './TreeViewSelectionContext';
import { TreeViewSelectable } from './types';
import { useTreeItem } from './useTreeItem';
import { UseTreeViewProps, useTreeView } from './useTreeView';
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
   * Height of the TreeView container in pixels.
   * REQUIRED when enableVirtualization is true.
   * Without a fixed height, virtualization cannot calculate the viewport properly.
   * @example height={400}
   */
  height?: number;
}

interface VirtualContainerProps {
  height: number;
}

interface VirtualItemProps {
  height: number;
  transform: number;
}

const StyledTreeView = styled.ul<TreeViewProps & { isVirtualized?: boolean }>`
  padding: 0;
  margin: 0;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral};
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
  min-height: ${props => props.height}px;
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
      onExpandedChange: _onExpandedChange,
      onSelectedItemChange: _onSelectedItemChange,
      selectable,
      testId,
      apiRef: _apiRef,
      enableVirtualization = false,
      height,
      ...rest
    } = props;

    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    const { selectionContextValue, expansionContextValue, configContextValue } =
      useTreeView(props);

    useTreeItem({ label: ariaLabel, itemId: '' }, ref);

    const inverseContextValue = React.useMemo(
      () => ({ isInverse }),
      [isInverse]
    );

    const parentRef = React.useRef<HTMLUListElement>(null);
    const itemHeightsByIdRef = React.useRef<Map<string, number>>(new Map());
    const measurementRefs = React.useRef<Map<string, HTMLDivElement>>(
      new Map()
    );

    // Flatten tree structure for virtualization
    const flattenedItems = React.useMemo(() => {
      if (!enableVirtualization) return [];

      const items: Array<{
        child: React.ReactElement;
        depth: number;
        index: number;
        key: string;
        itemId: string;
      }> = [];

      const flatten = (childrenToFlatten: React.ReactNode, depth = 0) => {
        React.Children.forEach(childrenToFlatten, (child, index) => {
          if (!React.isValidElement(child) || child.type !== TreeItem) {
            return;
          }

          const itemId = child.props.itemId;
          const itemKey = `${itemId}-${depth}`;

          // Clone the child without its children to prevent double rendering
          const childWithoutNested = React.cloneElement(child, {
            ...child.props,
            children: null,
          });

          items.push({
            child: childWithoutNested,
            depth,
            index,
            key: itemKey,
            itemId,
          });

          // Check if item has children and is expanded
          const isExpanded = expansionContextValue.expandedSet?.has(itemId);

          if (isExpanded && child.props.children) {
            flatten(child.props.children, depth + 1);
          }
        });
      };

      flatten(children);

      return items;
    }, [children, enableVirtualization, expansionContextValue.expandedSet]);

    const rowVirtualizer = useVirtualizer({
      count: flattenedItems.length,
      getScrollElement: () => parentRef.current,
      estimateSize: React.useCallback(
        (index: number) => {
          const itemId = flattenedItems[index]?.itemId;

          if (!itemId) {
            return 32;
          }

          return itemHeightsByIdRef.current.get(itemId) ?? 32;
        },
        [flattenedItems]
      ),
      overscan: 3,
    });

    // Measure item heights after render
    React.useEffect(() => {
      if (!enableVirtualization) {
        measurementRefs.current.clear();
        itemHeightsByIdRef.current.clear();

        return;
      }

      const measureHeights = () => {
        let hasChanges = false;

        measurementRefs.current.forEach((element, itemId) => {
          if (element) {
            const treeViewHeight = element.offsetHeight;
            const currentHeight = itemHeightsByIdRef.current.get(itemId);

            if (currentHeight !== treeViewHeight && treeViewHeight > 0) {
              itemHeightsByIdRef.current.set(itemId, treeViewHeight);
              hasChanges = true;
            }
          }
        });

        if (hasChanges) {
          rowVirtualizer.measure();
        }
      };

      const timeoutId = setTimeout(() => {
        measureHeights();
      }, 0);

      if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
        const resizeObserver = new (
          window as unknown as { ResizeObserver: typeof ResizeObserver }
        ).ResizeObserver(() => {
          measureHeights();
        });

        measurementRefs.current.forEach(element => {
          if (element) {
            resizeObserver.observe(element);
          }
        });

        return () => {
          clearTimeout(timeoutId);
          resizeObserver.disconnect();
        };
      }

      return () => {
        clearTimeout(timeoutId);
      };
    }, [enableVirtualization, flattenedItems, rowVirtualizer]);

    // Process children without cloneElement - use context instead
    const processedChildren = React.useMemo(() => {
      if (enableVirtualization) {
        return null; // Handled by virtualizer below
      }

      let treeItemIndex = 0;

      return React.Children.map(children, child => {
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
    }, [children, enableVirtualization]);

    return (
      <InverseContext.Provider value={inverseContextValue}>
        <TreeViewSelectionContext.Provider value={selectionContextValue}>
          <TreeViewExpansionContext.Provider value={expansionContextValue}>
            <TreeViewConfigContext.Provider value={configContextValue}>
              <StyledTreeView
                {...rest}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                aria-multiselectable={selectable === TreeViewSelectable.multi}
                data-testid={testId}
                isInverse={isInverse}
                isVirtualized={enableVirtualization}
                ref={mergedRefs => {
                  if (typeof ref === 'function') {
                    ref(mergedRefs);
                  } else if (ref) {
                    (ref as React.MutableRefObject<HTMLUListElement>).current =
                      mergedRefs;
                  }
                  parentRef.current = mergedRefs;
                }}
                role="tree"
                theme={theme}
                style={{
                  ...rest.style,
                  ...(enableVirtualization && height
                    ? { height: `${height}px`, overflow: 'auto' }
                    : {}),
                }}
              >
                {enableVirtualization ? (
                  <VirtualContainer height={rowVirtualizer.getTotalSize()}>
                    {rowVirtualizer.getVirtualItems().map(virtualItem => {
                      const item = flattenedItems[virtualItem.index];
                      const hierarchyValue = {
                        depth: item.depth,
                        parentDepth: Math.max(0, item.depth - 1),
                        isTopLevel: item.depth === 0,
                        index: item.index,
                        isVirtualized: true,
                      };

                      return (
                        <VirtualItem
                          key={item.key}
                          height={virtualItem.size}
                          transform={virtualItem.start}
                          ref={(el: HTMLDivElement) => {
                            if (el) {
                              measurementRefs.current.set(item.itemId, el);
                            } else {
                              measurementRefs.current.delete(item.itemId);
                            }
                          }}
                        >
                          <TreeItemHierarchyContext.Provider
                            value={hierarchyValue}
                          >
                            {item.child}
                          </TreeItemHierarchyContext.Provider>
                        </VirtualItem>
                      );
                    })}
                  </VirtualContainer>
                ) : (
                  processedChildren
                )}
              </StyledTreeView>
            </TreeViewConfigContext.Provider>
          </TreeViewExpansionContext.Provider>
        </TreeViewSelectionContext.Provider>
      </InverseContext.Provider>
    );
  }
);
