import * as React from 'react';
import styled from '../../theme/styled';

import {
  UseTreeViewProps,
  TreeViewContext,
  useTreeView,
  TreeViewSelectable,
} from './useTreeView';
import { TreeItem } from './TreeItem';

import { ThemeContext } from '../../theme/ThemeContext';
import { InverseContext, useIsInverse } from '../../inverse';
import { useTreeItem } from './useTreeItem';

export interface TreeViewProps
  extends UseTreeViewProps,
    React.HTMLAttributes<HTMLUListElement> {}

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
    // border: 1px solid green;
    // margin-left: ${props => props.theme.spaceScale.spacing03};
    li {
      margin: 0;
    }
  }
`;

export const TreeView = React.forwardRef<HTMLUListElement, TreeViewProps>(
  (props, ref) => {
    const {
      children,
      testId,
      ariaLabel,
      ariaLabelledBy,
      isInverse: isInverseProp,
      selectable,
      onSelectedItemChange,
      onExpandedChange,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    const { contextValue } = useTreeView(props);

    const { contextValue: treeItemContextValue } = useTreeItem(
      { label: ariaLabel, itemId: '' },
      ref
    );

    let treeItemIndex = 0;

    return (
      <InverseContext.Provider value={{ isInverse }}>
        <TreeViewContext.Provider value={contextValue}>
          <StyledTreeView
            theme={theme}
            isInverse={isInverse}
            ref={ref}
            data-testid={testId}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-multiselectable={selectable === TreeViewSelectable.multi}
            role="tree"
            {...rest}
          >
            {React.Children.map(children, (child: React.ReactElement<any>) => {
              if (child.type === TreeItem) {
                const item = React.cloneElement(child, {
                  index: treeItemIndex,
                  key: treeItemIndex,
                  treeItemIndex,
                  parentDepth: 0,
                  topLevel: true,
                  parentCheckedStatus: treeItemContextValue.checkedStatus || null,
                  updateParentCheckStatus:
                    treeItemContextValue.updateCheckedStatusFromChild,
                });
                treeItemIndex++;
                return item;
              }
            })}
          </StyledTreeView>
        </TreeViewContext.Provider>
      </InverseContext.Provider>
    );
  }
);
