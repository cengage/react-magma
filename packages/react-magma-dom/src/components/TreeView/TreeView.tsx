import * as React from 'react';
import styled from '../../theme/styled';

import { UseTreeViewProps, TreeViewContext, useTreeView } from './useTreeView';
import { TreeItem } from './TreeItem';

import { ThemeContext } from '../../theme/ThemeContext';
import { InverseContext, useIsInverse } from '../../inverse';

export interface TreeViewProps extends UseTreeViewProps, React.HTMLAttributes<HTMLUListElement>{}

const StyledTreeView = styled.ul<TreeViewProps>`
  background: ${props =>
  props.isInverse
  ? props.theme.colors.primary600
  : props.theme.colors.neutral100};
  color: ${props =>
  props.isInverse
  ? props.theme.colors.neutral100
  : props.theme.colors.neutral};
  ul {
    padding: 0px;
    margin-left: ${props => props.theme.spaceScale.spacing06};
  }
`;

export const TreeView = React.forwardRef<HTMLUListElement, TreeViewProps>(
  (props, ref) => {
    const {children, testId, isInverse: isInverseProp, ...rest} = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    const { contextValue } = useTreeView(props);
    let treeItemIndex = 0;

    return (
      <InverseContext.Provider value={{ isInverse }}>
        <TreeViewContext.Provider value={contextValue}>
          <StyledTreeView
            theme={theme} 
            isInverse={isInverse}
            ref={ref}
            data-testid={testId}
            {...rest} >
              {React.Children.map(
                children,
                (child: React.ReactElement<any>) => {
                  if (child.type === TreeItem) {
                    const item = React.cloneElement(child, {
                      index: treeItemIndex,
                      key: treeItemIndex,
                    });
                    treeItemIndex++;
                    return item;
                  }
                }
              )}
          </StyledTreeView>
        </TreeViewContext.Provider>
      </InverseContext.Provider>
      );
  }
)