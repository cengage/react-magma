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

    const { selectionContextValue, expansionContextValue, configContextValue } =
      useTreeView(props);

    useTreeItem({ label: ariaLabel, itemId: '' }, ref);

    const inverseContextValue = React.useMemo(
      () => ({ isInverse }),
      [isInverse]
    );

    const parentRef = React.useRef<HTMLUListElement>(null);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
      setIsMounted(true);
    }, []);

    // Flatten tree structure for virtualization
    const flattenedItems = React.useMemo(() => {
      if (!enableVirtualization || !isMounted) return [];

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

          // Filter children to separate TreeItem elements from other content
          // Keep non-TreeItem children (like Tag, text, etc.) but remove nested TreeItems
          const nonTreeItemChildren: React.ReactNode[] = [];
          let hasTreeItemChildren = false;

          React.Children.forEach(child.props.children, childNode => {
            if (
              !React.isValidElement(childNode) ||
              childNode.type !== TreeItem
            ) {
              nonTreeItemChildren.push(childNode);
            } else {
              hasTreeItemChildren = true;
            }
          });

          // Clone the child with only non-TreeItem children to prevent double rendering
          const childWithoutNested = React.cloneElement(child, {
            ...child.props,
            hasTreeItemChildren,
            children:
              nonTreeItemChildren.length > 0 ? nonTreeItemChildren : null,
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
    }, [
      children,
      enableVirtualization,
      expansionContextValue.expandedSet,
      isMounted,
    ]);

    const shouldUseVirtualization = enableVirtualization && isMounted;

    const rowVirtualizer = useVirtualizer({
      count: shouldUseVirtualization ? flattenedItems.length : 0,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 32,
      overscan: 3,
      enabled: shouldUseVirtualization,
    });

    // Process children without cloneElement - use context instead
    const processedChildren = React.useMemo(() => {
      if (shouldUseVirtualization) {
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
    }, [children, shouldUseVirtualization]);

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
                isVirtualized={shouldUseVirtualization}
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
                  ...(shouldUseVirtualization && height
                    ? { height: `${height}px`, overflow: 'auto' }
                    : {}),
                }}
              >
                {shouldUseVirtualization ? (
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
                          data-index={virtualItem.index}
                          key={item.key}
                          transform={virtualItem.start}
                          ref={(el: HTMLDivElement) => {
                            rowVirtualizer.measureElement(el);
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
