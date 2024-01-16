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
import { ExpandLessIcon, ExpandMoreIcon, FolderIcon, ArticleIcon } from 'react-magma-icons';
import { Checkbox } from '../Checkbox';
import { IndeterminateCheckbox } from '../IndeterminateCheckbox';
import { Transition } from '../Transition';

import {
  calculateLeftPadding,
  TreeNodeType,
  getTreeItemLabelColor,
} from './utils';
import { transparentize } from 'polished';
import { IconButton } from '../IconButton';
import { ButtonColor, ButtonSize, ButtonShape, ButtonVariant } from '../Button';

export interface TreeItemProps extends UseTreeItemProps {}

const StyledTreeItem = styled.li<{
  theme?: ThemeInterface;
  isInverse?: boolean;
  hasOwnTreeItems: boolean;
  nodeType: TreeNodeType;
  depth: number;
  isSelectable?: boolean;
}>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  list-style-type: none;
  cursor: ${props =>
    props.nodeType === TreeNodeType.branch ? 'pointer' : 'default'};
  padding-left: ${props => calculateLeftPadding(props.nodeType, props.depth)};

  // :hover {
  //   background: ${props =>
    transparentize(0.95, props.theme.colors.neutral900)};
  // }
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
  isDisabled?: boolean;
  isInverse?: boolean;
}>`
  color: ${props =>
    getTreeItemLabelColor(props.isInverse, props.isDisabled, props.theme)};
  margin-right: ${props => props.theme.spaceScale.spacing03};
  margin-left: 0px;
  svg {
    height: ${props => props.theme.iconSizes.medium}px;
    width: ${props => props.theme.iconSizes.medium}px;
    vertical-align: middle;
  }
`;

const StyledLabelWrapper = styled.span<{
  theme?: ThemeInterface;
  isDisabled?: boolean;
  isInverse?: boolean;
}>`
  display: flex;
  align-items: flex-start;
  color: ${props =>
    getTreeItemLabelColor(props.isInverse, props.isDisabled, props.theme)};
  cursor: ${props => props.isDisabled && 'not-allowed'};
`;

const StyledExpandWrapper = styled.div<{
  theme?: ThemeInterface;
  isDisabled?: boolean;
  isInverse?: boolean;
}>`
  display: inline-block;
  vertical-align: middle;
  // background: green;
  // width: ${props => props.theme.spaceScale.spacing06};
  // min-width: ${props => props.theme.spaceScale.spacing06};
  margin-right: ${props => props.theme.spaceScale.spacing03};
  cursor: ${props => props.isDisabled && 'not-allowed'};
  color: ${props =>
    getTreeItemLabelColor(props.isInverse, props.isDisabled, props.theme)};
`;

const StyledCheckboxWrapper = styled.div<{ theme?: ThemeInterface }>`
  margin-right: ${props => props.theme.spaceScale.spacing03};
  vertical-align: middle;
  display: inline-flex;
`;

const StyledItemWrapper = styled.div<{
  theme?: ThemeInterface;
  selectable?: TreeViewSelectable;
  nodeType: TreeNodeType;
  depth: number;
  selected: boolean;
  isInverse: boolean;
}>`
  display: flex;
  align-items: ${props =>
    props.selectable === TreeViewSelectable.multi ? 'center' : 'flex-start'};
  background: ${props =>
    props.selected && props.isInverse
      ? transparentize(0.7, props.theme.colors.neutral900)
      : props.selected && transparentize(0.92, props.theme.colors.neutral900)};
  border-left: ${props =>
    props.selected &&
    `4px solid ${
      props.isInverse
        ? props.theme.colors.tertiary500
        : props.theme.colors.primary500
    }`};

  cursor: ${props =>
    props.nodeType === TreeNodeType.branch ? 'pointer' : 'default'};
  // padding-left: ${props => calculateLeftPadding(props.nodeType, props.depth)};
`;

export const TreeItem = React.forwardRef<HTMLLIElement, TreeItemProps>(
  (props, forwardedRef) => {
    const {
      children,
      treeItemIndex,
      icon,
      parentCheckedStatus,
      updateParentCheckStatus,
      
      testId,
      label,
      isDisabled,
      labelStyle,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse();

    const {
      selectable,
      hasIcons,
      children: treeViewChildren,
    } = React.useContext(TreeViewContext);

    const { contextValue, handleClick, handleKeyDown } = useTreeItem(
      props,
      forwardedRef
    );

    const {
      itemId,
      expanded,
      setExpanded,
      checkedStatus,
      checkboxChangeHandler,
      hasOwnTreeItems,
      updateCheckedStatusFromChild,
      itemDepth,
      parentDepth,
      setParentDepth,
      numberOfTreeItemChildren,
      // singleSelectItemId,
      isDirectChild,
      selectedItems,
    } = contextValue;

    // Number of children an item has
    let childTreeItemIndex = 0;

    // React.useEffect(() => {
    // console.log('numberOfTreeItemChildren', numberOfTreeItemChildren)
    // console.log('hasOwnTreeItems', hasOwnTreeItems);
    // console.log('---');
    // }, [hasOwnTreeItems]);

    const nodeType = hasOwnTreeItems ? TreeNodeType.branch : TreeNodeType.leaf;

    const defaultIcon = nodeType === TreeNodeType.branch ? <FolderIcon/> : <ArticleIcon/>;

    const labelText = (
      <StyledLabelWrapper
        theme={theme}
        isDisabled={isDisabled}
        isInverse={isInverse}
        style={labelStyle}
        id={`${itemId}-label`}
        onClick={e => {
          if (selectable === TreeViewSelectable.single) {
            console.log('labelText clicked - single select');
            handleClick(e);
          }
          // e.preventDefault();
        }}
      >
        {hasIcons && (
        <IconWrapper
          isInverse={isInverse}
          theme={theme}
          isDisabled={isDisabled}
        >
          {icon || defaultIcon}
        </IconWrapper>

        )}
        {label}
      </StyledLabelWrapper>
    );

    React.useEffect(() => {
      isDirectChild(label);
    }, []);

    return (
      <TreeItemContext.Provider value={contextValue}>
        <StyledTreeItem
          theme={theme}
          isInverse={isInverse}
          hasOwnTreeItems
          ref={forwardedRef}
          data-testid={testId}
          nodeType={nodeType}
          depth={treeItemIndex}
          isSelectable={selectable === TreeViewSelectable.single}
          // aria-controls={panelId}
          // aria-expanded={Boolean(expanded)}
          id={itemId}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          <StyledItemWrapper
            theme={theme}
            selectable={selectable}
            nodeType={nodeType}
            depth={itemDepth}
            selected={
              // false
              selectable === TreeViewSelectable.single
              && selectedItems?.[0] === `${itemId}-label`
            }
            isInverse={isInverse}
          >
            {hasOwnTreeItems ? (
              <StyledExpandWrapper
                theme={theme}
                isDisabled={isDisabled}
                isInverse={isInverse}
              >
                {isDisabled || !expanded ? (
                  // <ExpandMoreIcon />
                  <IconButton
                    icon={<ExpandMoreIcon />}
                    color={ButtonColor.subtle}
                    size={ButtonSize.small}
                    shape={ButtonShape.fill}
                    variant={ButtonVariant.link}
                    aria-label="expand"
                    onClick={() => {
                      // console.log('expand button clicked');
                      setExpanded(state => !state);
                    }}
                    disabled={isDisabled}
                  />
                ) : (
                  // <ExpandLessIcon />
                  <IconButton
                    icon={<ExpandLessIcon />}
                    color={ButtonColor.subtle}
                    size={ButtonSize.small}
                    shape={ButtonShape.fill}
                    variant={ButtonVariant.link}
                    aria-label="collapse"
                    onClick={() => {
                      // console.log('collapse button clicked');
                      setExpanded(state => !state);
                    }}
                    disabled={isDisabled}
                  />
                )}
              </StyledExpandWrapper>
            ) : (
              <div style={{ width: '24px' }}></div>
            )}

            {selectable === TreeViewSelectable.multi ? (
              <StyledCheckboxWrapper theme={theme}>
                {hasOwnTreeItems ? (
                  <IndeterminateCheckbox
                    id={itemId}
                    labelText={labelText}
                    status={checkedStatus}
                    onChange={checkboxChangeHandler}
                    disabled={isDisabled}
                  />
                ) : (
                  <Checkbox
                    labelText={labelText}
                    checked={checkedStatusToBoolean(checkedStatus)}
                    onChange={checkboxChangeHandler}
                    disabled={isDisabled}
                  />
                )}
              </StyledCheckboxWrapper>
            ) : (
              <>{labelText}</>
            )}
          </StyledItemWrapper>

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
                        parentDepth: 1,
                      })}
                    </ul>
                  </Transition>
                ) : (
                  child
                );
              if (child.type === TreeItem) {
                childTreeItemIndex++;
              }

              // hide the disabled item + the children
              if (isDisabled) return <></>;

              return component;
            }
          )}
        </StyledTreeItem>
      </TreeItemContext.Provider>
    );
  }
);
