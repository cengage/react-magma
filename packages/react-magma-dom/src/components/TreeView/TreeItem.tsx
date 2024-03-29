import * as React from 'react';

import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { useIsInverse } from '../../inverse';

import styled from '../../theme/styled';
import { css } from '@emotion/core';
import {
  UseTreeItemProps,
  useTreeItem,
  checkedStatusToBoolean,
} from './useTreeItem';
import { TreeViewSelectable } from './useTreeView';
import {
  FolderIcon,
  ArticleIcon,
  ExpandMoreIcon,
  ChevronRightIcon,
} from 'react-magma-icons';
import { Checkbox } from '../Checkbox';
import { IndeterminateCheckbox } from '../IndeterminateCheckbox';
import { Transition } from '../Transition';

import {
  calculateOffset,
  TreeNodeType,
  getTreeItemLabelColor,
  getTreeItemWrapperCursor,
  getLowestIndexItem,
} from './utils';
import { transparentize } from 'polished';
import { TreeItemContext } from './TreeItemContext';
import { TreeViewContext } from './TreeViewContext';

export interface TreeItemProps extends UseTreeItemProps {}

const StyledTreeItem = styled('li')<{
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
  position: relative;
  margin-bottom: 0;

  padding-inline-start: ${props =>
    calculateOffset(props.nodeType, props.depth)};

  > div:first-of-type {
    background: ${props =>
      props.selected && props.isInverse
        ? transparentize(0.7, props.theme.colors.neutral900)
        : props.selected &&
          transparentize(0.92, props.theme.colors.neutral900)};
    position: relative;

    padding-inline-start: ${props =>
      calculateOffset(props.nodeType, props.depth, true)};
    margin-inline-start: ${props =>
      calculateOffset(props.nodeType, props.depth, true, true)};
    padding-block-end: ${props => props.theme.spaceScale.spacing02};
    padding-block-start: ${props => props.theme.spaceScale.spacing02};
    padding-right: ${props => props.theme.spaceScale.spacing02};

    ${props =>
      props.selected &&
      css`
        &:before {
          position: absolute;
          background-color: ${props.isInverse
            ? props.theme.colors.tertiary500
            : props.theme.colors.primary500};
          block-size: 100%;
          content: '';
          inline-size: ${props.theme.spaceScale.spacing02};
          inset-block-start: 0;
          inset-inline-start: 0;
        }
      `}

    &:hover {
      background: ${props =>
        !props.isDisabled &&
        props.selectableType !== TreeViewSelectable.off &&
        transparentize(0.95, props.theme.colors.neutral900)};
    }
  }
`;

const IconWrapper = styled('span')<{
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

const StyledLabelWrapper = styled('span')<{
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

const StyledExpandWrapper = styled('div')<{
  theme?: ThemeInterface;
  isDisabled?: boolean;
  isInverse?: boolean;
}>`
  display: inline-block;
  vertical-align: middle;
  margin-right: ${props => props.theme.spaceScale.spacing03};
  color: ${props =>
    getTreeItemLabelColor(props.isInverse, props.isDisabled, props.theme)};
  border-radius: 0;
  width: ${props => props.theme.spaceScale.spacing06};
  height: ${props => props.theme.spaceScale.spacing06};
`;

const StyledCheckboxWrapper = styled('div')<{ theme?: ThemeInterface }>`
  margin-right: ${props => props.theme.spaceScale.spacing03};
  vertical-align: middle;
  display: inline-flex;
`;

const StyledItemWrapper = styled('div')<{
  theme?: ThemeInterface;
  selectable?: TreeViewSelectable;
  nodeType: TreeNodeType;
  depth: number;
  isInverse: boolean;
  isDisabled: boolean;
}>`
  display: flex;
  align-items: flex-start;
  cursor: ${props =>
    getTreeItemWrapperCursor(
      props.isDisabled,
      props.selectable,
      props.nodeType
    )};
  &:focus {
    outline-offset: -2px;
  }
`;

export const TreeItem = React.forwardRef<HTMLLIElement, TreeItemProps>(
  (props, forwardedRef) => {
    const {
      children,
      icon,
      index,
      isDisabled,
      label,
      labelStyle,
      parentCheckedStatus,
      style,
      testId,
      updateParentCheckStatus,
      topLevel,
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
      checkboxChangeHandler,
      checkedStatus,
      expanded,
      hasOwnTreeItems,
      itemDepth,
      itemId,
      parentDepth,
      ref,
      selectedItems,
      setExpanded,
      updateCheckedStatusFromChild,
      treeItemChildren,
    } = contextValue;

    const nodeType = hasOwnTreeItems ? TreeNodeType.branch : TreeNodeType.leaf;
    const selectedItem =
      selectable === TreeViewSelectable.single
        ? selectedItems?.[0]?.['itemId'] === itemId
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
        data-testid={`${testId || itemId}-label`}
        onClick={(e: any) => {
          if (selectable === TreeViewSelectable.single && !isDisabled) {
            handleClick(e, itemId);
          }
        }}
      >
        {hasIcons && (
          <IconWrapper
            isInverse={isInverse}
            theme={theme}
            isDisabled={isDisabled}
            data-testid={`${testId || itemId}-icon`}
          >
            {icon || defaultIcon}
          </IconWrapper>
        )}
        {label}
      </StyledLabelWrapper>
    );

    // Props shared by Checkbox and IndeterminateCheckbox
    const checkboxProps = {
      id: `${itemId}-checkbox`,
      testId: `${itemId}-checkbox`,
      labelText: labelText,
      onChange: checkboxChangeHandler,
      disabled: isDisabled,
      inputStyle: { marginRight: theme.spaceScale.spacing03 },
      labelStyle: {
        padding: 0,
      },
      tabIndex: -1,
    };

    const onExpandedClicked = (event: React.SyntheticEvent) => {
      setExpanded(state => !state);

      event.preventDefault();

      onExpandedChange &&
        typeof onExpandedChange === 'function' &&
        onExpandedChange(event);
    };

    const focusedItem = () => {
      const firstSelectedItem = getLowestIndexItem(
        selectedItems,
        treeItemChildren
      );

      // TODO: FIX
      if (selectable === TreeViewSelectable.single && selectedItem) {
        return true;
      } else if (
        selectable === TreeViewSelectable.multi &&
        firstSelectedItem === itemId
      ) {
        return true;
      } else if (selectable === TreeViewSelectable.off) {
        if (nodeType === TreeNodeType.branch && firstSelectedItem) {
          return true;
        }
      } else {
        // focus first item in all other cases (selectable is off, no item is selected)
        return itemDepth === 0 && topLevel;
      }
    };

    return (
      <TreeItemContext.Provider value={contextValue}>
        <StyledTreeItem
          {...rest}
          aria-expanded={hasOwnTreeItems ? expanded : null}
          aria-selected={selectedItem}
          aria-checked={checkedItem}
          data-testid={testId}
          depth={itemDepth}
          hasOwnTreeItems
          id={itemId}
          isDisabled={isDisabled}
          isInverse={isInverse}
          nodeType={nodeType}
          role="treeitem"
          selectableType={selectable}
          selected={selectedItem}
          theme={theme}
        >
          <StyledItemWrapper
            data-testid={`${testId || itemId}-itemwrapper`}
            depth={itemDepth}
            id={`${itemId}-itemwrapper`}
            isDisabled={isDisabled}
            isInverse={isInverse}
            nodeType={nodeType}
            onClick={event => {
              if (selectable === TreeViewSelectable.off && hasOwnTreeItems) {
                onExpandedClicked(event);
              }
            }}
            onKeyDown={e => {
              handleKeyDown(e);
            }}
            ref={ref}
            selectable={selectable}
            style={style}
            tabIndex={focusedItem() ? 0 : -1}
            theme={theme}
          >
            {hasOwnTreeItems && (
              <StyledExpandWrapper
                aria-hidden={Boolean(!expanded)}
                data-testid={`${testId || itemId}-expand`}
                isDisabled={isDisabled}
                isInverse={isInverse}
                onClick={event => {
                  if (!isDisabled && selectable !== TreeViewSelectable.off) {
                    onExpandedClicked(event);
                  }
                }}
                theme={theme}
              >
                {expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
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
              const component =
                child.type === TreeItem ? (
                  <Transition isOpen={expanded} collapse unmountOnExit>
                    <ul role="group">
                      {React.cloneElement(child, {
                        index,
                        key: index,
                        itemDepth,
                        parentDepth,
                        parentCheckedStatus: checkedStatus,
                        updateParentCheckStatus: updateCheckedStatusFromChild,
                      })}
                    </ul>
                  </Transition>
                ) : (
                  child
                );
              // hide the disabled item + the children
              // if (isDisabled) return <></>;

              return component;
            }
          )}
        </StyledTreeItem>
      </TreeItemContext.Provider>
    );
  }
);
