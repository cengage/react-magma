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
import {
  FolderIcon,
  ArticleIcon,
  ExpandMoreIcon,
  ExpandLessIcon,
} from 'react-magma-icons';
import { Checkbox } from '../Checkbox';
import { IndeterminateCheckbox } from '../IndeterminateCheckbox';
import { Transition } from '../Transition';

import {
  calculateLeftPadding,
  TreeNodeType,
  getTreeItemLabelColor,
  getTreeItemWrapperCursor,
} from './utils';
import { transparentize } from 'polished';

export interface TreeItemProps extends UseTreeItemProps {}

const StyledTreeItem = styled.li<{
  theme?: ThemeInterface;
  isInverse?: boolean;
  hasOwnTreeItems: boolean;
  nodeType: TreeNodeType;
  depth: number;
  selected?: boolean;
  selectableType?: TreeViewSelectable;
  isDisabled?: boolean;
}>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  list-style-type: none;
  cursor: ${props =>
    getTreeItemWrapperCursor(
      props.isDisabled,
      props.selectableType,
      props.nodeType
    )};
    // height: 32px;

  padding-inline-start: ${props =>
    !props.selected &&
    calculateLeftPadding(props.nodeType, props.depth, props.selected)};
  margin-inline-start: ${props =>
    !props.selected &&
    calculateLeftPadding(props.nodeType, props.depth, props.selected, true)};

  > div:first-of-type {
    background: ${props =>
      props.selected && props.isInverse
        ? transparentize(0.7, props.theme.colors.neutral900)
        : props.selected &&
          transparentize(0.92, props.theme.colors.neutral900)};
    border-left: ${props =>
      props.selected &&
      `4px solid ${
        props.isInverse
          ? props.theme.colors.tertiary500
          : props.theme.colors.primary500
      }`};

    padding-inline-start: ${props =>
      calculateLeftPadding(props.nodeType, props.depth, props.selected)};
    margin-inline-start: ${props => calculateLeftPadding(props.nodeType, props.depth, props.selected, true)};

    &:hover {
      background: ${props =>
        !props.isDisabled &&
        transparentize(0.95, props.theme.colors.neutral900)};
    }
  }
`;

const IconWrapper = styled.span<{
  theme?: ThemeInterface;
  isDisabled?: boolean;
  isInverse?: boolean;
}>`
  color: ${props =>
    getTreeItemLabelColor(props.isInverse, props.isDisabled, props.theme)};
  margin-right: ${props => props.theme.spaceScale.spacing04};
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
  width: 100%;
`;

const StyledExpandWrapper = styled.div<{
  theme?: ThemeInterface;
  isDisabled?: boolean;
  isInverse?: boolean;
}>`
  display: inline-block;
  vertical-align: middle;
  margin-right: ${props => props.theme.spaceScale.spacing02};
  color: ${props =>
    getTreeItemLabelColor(props.isInverse, props.isDisabled, props.theme)};
  border-radius: 0;
  width: ${props => props.theme.spaceScale.spacing06};
  height: ${props => props.theme.spaceScale.spacing06};
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
  isInverse: boolean;
  isDisabled: boolean;
}>`
  display: flex;
  align-items: ${props =>
    props.selectable === TreeViewSelectable.multi ? 'center' : 'flex-start'};
  cursor: ${props =>
    getTreeItemWrapperCursor(
      props.isDisabled,
      props.selectable,
      props.nodeType
    )};
  &:focus {
    outline-offset: 0;
    // outline: none;
  }
`;

export const TreeItem = React.forwardRef<HTMLLIElement, TreeItemProps>(
  (props, forwardedRef) => {
    const {
      children,
      treeItemIndex,
      icon,
      index,
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

    const { selectable, hasIcons, onExpandedChange } =
      React.useContext(TreeViewContext);

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
      selectedItems,
    } = contextValue;

    let childTreeItemIndex = 0;

    const nodeType = hasOwnTreeItems ? TreeNodeType.branch : TreeNodeType.leaf;
    const selectedItem =
      selectable === TreeViewSelectable.single
        ? selectedItems?.[0] === `${itemId}-label`
        : null;
    const checkedItem =
      selectable === TreeViewSelectable.multi
        ? checkedStatusToBoolean(checkedStatus)
        : null;

    const defaultIcon =
      nodeType === TreeNodeType.branch ? <FolderIcon /> : <ArticleIcon />;

    const labelText = (
      <StyledLabelWrapper
        theme={theme}
        isDisabled={isDisabled}
        isInverse={isInverse}
        style={labelStyle}
        id={`${itemId}-label`}
        onClick={(e: any) => {
          if (selectable === TreeViewSelectable.single && !isDisabled) {
            // console.log('labelText clicked - single select');
            handleClick(e);
            // e.preventDefault();
          }
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

    // Props shared by Checkbox and IndeterminateCheckbox
    const checkboxProps = {
      id: itemId,
      labelText: labelText,
      onChange: checkboxChangeHandler,
      disabled: isDisabled,
      inputStyle: { marginRight: theme.spaceScale.spacing03 },
      labelStyle: { paddingTop: theme.spaceScale.spacing02, paddingBottom: theme.spaceScale.spacing02},
      tabIndex: -1,
    };

    const onExpandedClicked = (event: React.SyntheticEvent) => {
      setExpanded(state => !state);

      onExpandedChange &&
        typeof onExpandedChange === 'function' &&
        onExpandedChange(event);
    };

    const focusedItem = () => {
      if (selectable === TreeViewSelectable.single && selectedItem) {
        return true;
      } else if (
        selectable === TreeViewSelectable.multi &&
        selectedItems?.[0]?.id === itemId
      ) {
        return true;
      } else if (selectable === TreeViewSelectable.off) {
        if (nodeType === TreeNodeType.branch) {
          // TODO:  missing logic so that it's only the first one
          return true;
        }
      } else {
        // focus first item in all other cases (selectable is off, no item is selected)
        return (
          treeItemIndex === 0 && itemDepth === 0 && childTreeItemIndex === 0
        );
      }
    };

    return (
      <TreeItemContext.Provider value={contextValue}>
        <StyledTreeItem
          theme={theme}
          isInverse={isInverse}
          hasOwnTreeItems
          ref={forwardedRef}
          data-testid={testId}
          nodeType={nodeType}
          depth={itemDepth}
          isDisabled={isDisabled}
          selected={selectedItem}
          selectableType={selectable}
          id={`${itemId}-wrapper`}
          onKeyDown={handleKeyDown}
          role="treeitem"
          aria-expanded={hasOwnTreeItems ? expanded : null}
          aria-selected={selectedItem}
          aria-checked={checkedItem}
          {...rest}
        >
          <StyledItemWrapper
            theme={theme}
            selectable={selectable}
            nodeType={nodeType}
            tabIndex={focusedItem() ? 0 : -1}
            depth={itemDepth}
            isDisabled={isDisabled}
            // selected={
            //   selectedItem
            // }
            isInverse={isInverse}
            onClick={event => {
              if (selectable === TreeViewSelectable.off) {
                onExpandedClicked(event);
              }
            }}
          >
            {hasOwnTreeItems && (
              <StyledExpandWrapper
                theme={theme}
                isDisabled={isDisabled}
                isInverse={isInverse}
                aria-hidden={Boolean(!expanded)}
                onClick={event => {
                  if (!isDisabled && selectable !== TreeViewSelectable.off) {
                    onExpandedClicked(event);
                  }
                }}
              >
                {expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </StyledExpandWrapper>
            )}

            {selectable === TreeViewSelectable.multi ? (
              <StyledCheckboxWrapper theme={theme}>
                {hasOwnTreeItems ? (
                  <IndeterminateCheckbox
                    {...checkboxProps}
                    status={checkedStatus}
                  />
                ) : (
                  <Checkbox
                    {...checkboxProps}
                    checked={checkedStatusToBoolean(checkedStatus)}
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
              console.log(parentDepth);
              
              const component =
                child.type === TreeItem ? (
                  <Transition isOpen={expanded} collapse unmountOnExit>
                    <ul role="group">
                      {React.cloneElement(child, {
                        index,
                        key: index,
                        treeItemIndex: childTreeItemIndex,
                        parentDepth,
                        parentCheckedStatus: checkedStatus,
                        updateParentCheckStatus: updateCheckedStatusFromChild,
                        'data-laura-id': `${childTreeItemIndex}-${index}`,
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