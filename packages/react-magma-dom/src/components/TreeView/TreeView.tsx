import * as React from 'react';
import { UseTreeViewProps, useTreeView } from './useTreeView';
import { TreeViewSelectable } from './types';
import { TreeItem } from './TreeItem';
import { ThemeContext } from '../../theme/ThemeContext';
import { InverseContext, useIsInverse } from '../../inverse';
import { useTreeItem } from './useTreeItem';
import { TreeViewContext } from './TreeViewContext';
import styled from '@emotion/styled';

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
