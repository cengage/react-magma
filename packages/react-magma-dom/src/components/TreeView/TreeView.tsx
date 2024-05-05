import * as React from 'react';
import { InverseContext, useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { TreeItem } from './TreeItem';
import { TreeViewContext } from './TreeViewContext';
import { useTreeItem } from './useTreeItem';
import {
  UseTreeViewProps,
  useTreeView,
  TreeViewSelectable,
} from './useTreeView';
import styled, { CreateStyled } from '@emotion/styled';

export interface TreeViewProps
  extends UseTreeViewProps,
    React.HTMLAttributes<HTMLUListElement> {}

const typedStyled = styled as CreateStyled<ThemeInterface>;

const StyledTreeView = typedStyled.ul<TreeViewProps>`
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
            {React.Children.map(children, (child: React.ReactElement<any>) => {
              if (child.type === TreeItem) {
                const item = React.cloneElement(child, {
                  index: treeItemIndex,
                  key: treeItemIndex,
                  parentDepth: 0,
                  itemDepth: 0,
                  topLevel: true,
                  parentCheckedStatus:
                    treeItemContextValue.checkedStatus || null,
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
