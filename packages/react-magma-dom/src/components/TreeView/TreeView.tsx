import * as React from 'react';

import styled from '@emotion/styled';

import { TreeItem } from './TreeItem';
import { TreeItemHierarchyContext } from './TreeItemHierarchyContext';
import { TreeViewConfigContext } from './TreeViewConfigContext';
import { TreeViewContext } from './TreeViewContext';
import { TreeViewExpansionContext } from './TreeViewExpansionContext';
import { TreeViewSelectionContext } from './TreeViewSelectionContext';
import { TreeViewSelectable } from './types';
import { useTreeItem } from './useTreeItem';
import { UseTreeViewProps, useTreeView } from './useTreeView';
import { InverseContext, useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';

export interface TreeViewProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'>,
    UseTreeViewProps {}

const StyledTreeView = styled.ul<TreeViewProps>`
  padding: 0;
  margin: 0;
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral};
  ul {
    padding: 0;
    margin: 0;
    li {
      margin: 0;
    }
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
      ...rest
    } = props;

    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    const {
      contextValue,
      selectionContextValue,
      expansionContextValue,
      configContextValue,
    } = useTreeView(props);

    useTreeItem({ label: ariaLabel, itemId: '' }, ref);

    const inverseContextValue = React.useMemo(
      () => ({ isInverse }),
      [isInverse]
    );

    // Process children without cloneElement - use context instead
    const processedChildren = React.useMemo(() => {
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
    }, [children]);

    return (
      <InverseContext.Provider value={inverseContextValue}>
        <TreeViewContext.Provider value={contextValue}>
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
                  ref={ref}
                  role="tree"
                  theme={theme}
                >
                  {processedChildren}
                </StyledTreeView>
              </TreeViewConfigContext.Provider>
            </TreeViewExpansionContext.Provider>
          </TreeViewSelectionContext.Provider>
        </TreeViewContext.Provider>
      </InverseContext.Provider>
    );
  }
);
