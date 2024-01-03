import * as React from 'react';

import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { useIsInverse } from '../../inverse';

import styled from '../../theme/styled';

import {
  TreeItemContext,
  UseTreeItemProps,
  useTreeItem,
  checkedStatusToBoolean,
} from './useTreeItem';
import { TreeViewContext, TreeViewSelectable } from './useTreeView';
import { ExpandLessIcon, ExpandMoreIcon } from 'react-magma-icons';
import { Checkbox } from '../Checkbox';
import { IndeterminateCheckbox } from '../IndeterminateCheckbox';
import { Transition } from '../Transition';

import { calculateLeftPadding } from './utils';
import { transparentize } from 'polished';

export interface TreeItemProps extends UseTreeItemProps {}

const StyledTreeItem = styled.li<{
  theme?: ThemeInterface;
  isInverse?: boolean;
  hasOwnTreeItems: boolean;
  type: string;
  depth: number;
  isSelectable?: boolean;
}>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  list-style-type: none;
  // border: 1px solid orange;
  // background: pink;
`;
// margin-left: ${props =>
//   props.hasOwnTreeItems
//     ? '0px'
//     : addPxStyleStrings([
//         props.theme.spaceScale.spacing05,
//         props.theme.iconSizes.medium,
//       ])};

const IconWrapper = styled.span<{
  theme?: ThemeInterface;
  isInverse?: boolean;
  isSelectable?: boolean;
}>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral500};
  margin-right: ${props => props.theme.spaceScale.spacing03};
  margin-left: 0px;
  svg {
    height: ${props => props.theme.iconSizes.medium}px;
    width: ${props => props.theme.iconSizes.medium}px;
    vertical-align: middle;
  }
`;

const StyledExpandWrapper = styled.div<{ theme?: ThemeInterface }>`
  display: inline-block;
  vertical-align: middle;
  // background: green;
  // width: ${props => props.theme.spaceScale.spacing06};
  // min-width: ${props => props.theme.spaceScale.spacing06};
  margin-right: ${props => props.theme.spaceScale.spacing03};
`;

const StyledCheckboxWrapper = styled.div<{ theme?: ThemeInterface }>`
  margin-right: ${props => props.theme.spaceScale.spacing03};
  vertical-align: middle;
  display: inline-flex;
`;

const StyledLabelWrapper = styled.div<{
  theme?: ThemeInterface;
  isSelectable?: boolean;
  type: string;
  depth: number;
  selected: boolean;
}>`
  padding-left: ${props => calculateLeftPadding(props.type, props.depth)};
  // margin-left: ${props => calculateLeftPadding(props.type, props.depth)};
  // cursor: pointer;
  background: ${props => props.selected ? transparentize(0.92, props.theme.colors.neutral900) : 'none'};
  :hover {
    background: ${props =>
      props.isSelectable && !props.selected
        ? transparentize(0.95, props.theme.colors.neutral900)
        : 'none'};
  }
`;

export const TreeItem = React.forwardRef<HTMLLIElement, TreeItemProps>(
  (props, ref) => {
    const {
      children,
      index,
      testId,
      icon,
      parentCheckedStatus,
      updateParentCheckStatus,
      label,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse();

    const { selectable, hasIcons } = React.useContext(TreeViewContext);

    const { contextValue } = useTreeItem(props);

    const {
      itemId,
      expanded,
      setExpanded,
      checkedStatus,
      checkboxChangeHandler,
      hasOwnTreeItems,
      updateCheckedStatusFromChild,
      itemDepth,
      numberOfDirectChildren,
      singleSelectItemId,
    } = contextValue;

    // Number of children an item has
    let childTreeItemIndex = 0;

    // React.useEffect(() => {
    console.log(numberOfDirectChildren, numberOfDirectChildren)
    // }, [hasOwnTreeItems]);

    const nodeType = hasOwnTreeItems ? 'branch' : 'leaf';

    // console.log(label.props.children, nodeType, itemDepth)


    // TODO expanded is a lil broken

    return (
      <TreeItemContext.Provider value={contextValue}>
        <StyledTreeItem
          theme={theme}
          isInverse={isInverse}
          hasOwnTreeItems
          ref={ref}
          data-testid={testId}
          type={nodeType}
          depth={itemDepth}
          isSelectable={selectable === TreeViewSelectable.single}
          {...rest}
        >
          <StyledLabelWrapper
            theme={theme}
            onClick={() => setExpanded(state => !state)}
            isSelectable={selectable === TreeViewSelectable.single}
            type={nodeType}
            depth={itemDepth}
            selected={selectable === TreeViewSelectable.single && singleSelectItemId === itemId}
          >
            {hasOwnTreeItems && (
              <StyledExpandWrapper theme={theme}>
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </StyledExpandWrapper>
            )}

            {selectable === TreeViewSelectable.multi && (
              <StyledCheckboxWrapper theme={theme}>
                {hasOwnTreeItems ? (
                  <IndeterminateCheckbox
                    id={itemId}
                    labelText="branch"
                    isTextVisuallyHidden
                    status={checkedStatus}
                    onChange={checkboxChangeHandler}
                  />
                ) : (
                  <Checkbox
                    labelText="leaf"
                    isTextVisuallyHidden
                    checked={checkedStatusToBoolean(checkedStatus)}
                    onChange={checkboxChangeHandler}
                  />
                )}
              </StyledCheckboxWrapper>
            )}

            {hasIcons && (
              <IconWrapper
                isInverse={isInverse}
                theme={theme}
                isSelectable={
                  selectable === TreeViewSelectable.multi ||
                  selectable === TreeViewSelectable.single
                }
              >
                {icon}
              </IconWrapper>
            )}
            {label}
          </StyledLabelWrapper>

          {React.Children.map(
            children,
            (child: React.ReactElement<any>, index) => {
              const component =
                child.type === TreeItem ? (
                  <Transition isOpen={expanded} collapse>
                    <ul>
                      {React.cloneElement(child, {
                        index,
                        treeItemIndex: childTreeItemIndex,
                        key: index,
                        parentCheckedStatus: checkedStatus,
                        updateParentCheckStatus: updateCheckedStatusFromChild,
                      })}
                    </ul>
                  </Transition>
                ) : (
                  child
                );
              if (child.type === TreeItem) {
                childTreeItemIndex++;
              }
              return component;
            }
          )}
        </StyledTreeItem>
      </TreeItemContext.Provider>
    );
  }
);
