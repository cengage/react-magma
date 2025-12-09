import * as React from 'react';

import styled from '@emotion/styled';
import { useVirtual } from 'react-virtual';

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
   * Estimated size of each tree item in pixels (used for virtualization).
   * @default 40
   */
  estimateSize?: number;
  /**
   * Number of items to render above and below the visible area (overscan).
   * @default 5
   */
  overscan?: number;
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
  height: ${props => props.height}px;
  transform: ${props => `translateY(${props.transform}px)`};
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
      estimateSize = 40,
      overscan = 5,
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

    // Flatten tree structure for virtualization
    const flattenedItems = React.useMemo(() => {
      if (!enableVirtualization) return [];

      const items: Array<{
        child: React.ReactElement;
        depth: number;
        index: number;
        key: string;
        itemSize?: number;
      }> = [];

      const flatten = (childrenToFlatten: React.ReactNode, depth = 0) => {
        React.Children.forEach(childrenToFlatten, (child, index) => {
          if (!React.isValidElement(child) || child.type !== TreeItem) {
            return;
          }

          const itemKey = `tree-item-${depth}-${index}-${items.length}`;

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
            // HERE need to pass the height of the item!!!
            itemSize: child.props.itemSize,
          });

          // Check if item has children and is expanded
          const itemId = child.props.itemId;
          const isExpanded = expansionContextValue.expandedSet?.has(itemId);

          if (isExpanded && child.props.children) {
            flatten(child.props.children, depth + 1);
          }
        });
      };

      flatten(children);
      return items;
    }, [children, enableVirtualization, expansionContextValue.expandedSet]);

    const rowVirtualizer = useVirtual({
      size: flattenedItems.length,
      parentRef,
      estimateSize: React.useCallback(
        (index: number) => {
          // Here we set the height of each item
          return flattenedItems[index]?.itemSize ?? estimateSize;
        },
        [flattenedItems, estimateSize]
      ),
      overscan,
    });

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
              >
                {enableVirtualization ? (
                  <VirtualContainer height={rowVirtualizer.totalSize}>
                    {rowVirtualizer.virtualItems.map(virtualItem => {
                      const item = flattenedItems[virtualItem.index];
                      const hierarchyValue = {
                        depth: item.depth,
                        parentDepth: Math.max(0, item.depth - 1),
                        isTopLevel: item.depth === 0,
                        index: item.index,
                      };

                      return (
                        <VirtualItem
                          key={item.key}
                          height={virtualItem.size}
                          transform={virtualItem.start}
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
