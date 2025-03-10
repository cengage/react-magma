import * as React from 'react';

import styled from '@emotion/styled';

import { TreeItem, TreeItemProps } from './TreeItem';
import { TreeViewContext } from './TreeViewContext';
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

    const { contextValue } = useTreeView(props);

    useTreeItem({ label: ariaLabel, itemId: '' }, ref);

    let treeItemIndex = 0;

    const inverseContextValue = React.useMemo(
      () => ({ isInverse }),
      [isInverse]
    );

    const processedChildren = React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return null;
      }

      if (child.type === TreeItem) {
        const treeItemChild = child as React.ReactElement<TreeItemProps>;

        const treeItemProps: Partial<TreeItemProps> = {
          index: treeItemIndex,
          parentDepth: 0,
          itemDepth: 0,
          topLevel: true,
        };

        const processedItem = React.cloneElement(treeItemChild, {
          ...treeItemProps,
          key: `tree-item-${treeItemIndex}`,
        });

        treeItemIndex++;
        return processedItem;
      }

      return null;
    });

    return (
      <InverseContext.Provider value={inverseContextValue}>
        <TreeViewContext.Provider value={contextValue}>
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
        </TreeViewContext.Provider>
      </InverseContext.Provider>
    );
  }
);
