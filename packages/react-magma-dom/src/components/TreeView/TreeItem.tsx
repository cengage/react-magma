import * as React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import {
  FolderIcon,
  ArticleIcon,
  ExpandMoreIcon,
  ChevronRightIcon,
} from 'react-magma-icons';

import { TreeItemContext } from './TreeItemContext';
import { TreeViewContext } from './TreeViewContext';
import { TreeViewSelectable } from './types';
import {
  UseTreeItemProps,
  useTreeItem,
  checkedStatusToBoolean,
} from './useTreeItem';
import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { Checkbox } from '../Checkbox';
import {
  IndeterminateCheckbox,
  IndeterminateCheckboxStatus,
} from '../IndeterminateCheckbox';
import { Transition } from '../Transition';
import {
  calculateOffset,
  TreeNodeType,
  getTreeItemLabelColor,
  getTreeItemWrapperCursor,
} from './utils';

export type TreeItemProps = UseTreeItemProps;

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
  position: relative;
  margin-bottom: 0;

  padding-inline-start: ${props =>
    calculateOffset(props.nodeType, props.depth)};

  &:focus {
    outline: none;

    & > *:first-child {
      outline-offset: -2px;
      outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
}
  }

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
        !props.isDisabled
          ? props.isInverse
            ? transparentize(0.8, props.theme.colors.neutral900)
            : transparentize(0.95, props.theme.colors.neutral900)
          : undefined}
    }
  `;

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
  width: 100%;
`;

const StyledExpandWrapper = styled.div<{
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
  align-items: flex-start;
  cursor: ${props =>
    getTreeItemWrapperCursor(
      props.isDisabled,
      props.selectable,
      props.nodeType
    )};
`;

export const TreeItem = React.forwardRef<HTMLLIElement, TreeItemProps>(
  (props, forwardedRef) => {
    const {
      children,
      icon,
      index,
      label,
      labelStyle,
      style,
      testId,
      topLevel,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse();

    const {
      selectable,
      hasIcons,
      onExpandedChange,
      itemToFocus,
      handleExpandedChange,
    } = React.useContext(TreeViewContext);

    const { contextValue, handleClick, handleKeyDown } = useTreeItem(
      props,
      forwardedRef
    );

    const { isDisabled } = contextValue;

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
    } = contextValue;

    const nodeType = hasOwnTreeItems ? TreeNodeType.branch : TreeNodeType.leaf;
    const selectedItem =
      selectable === TreeViewSelectable.single
        ? selectedItems?.[0]?.itemId === itemId
        : null;

    const ariaCheckedValue =
      selectable === TreeViewSelectable.multi
        ? checkedStatus === IndeterminateCheckboxStatus.indeterminate
          ? 'mixed'
          : checkedStatus === IndeterminateCheckboxStatus.checked
        : null;

    const defaultIcon =
      nodeType === TreeNodeType.branch ? (
        <FolderIcon aria-hidden />
      ) : (
        <ArticleIcon aria-hidden />
      );

    const labelText = (
      <StyledLabelWrapper
        theme={theme}
        isDisabled={isDisabled}
        isInverse={isInverse}
        style={labelStyle}
        id={`${itemId}-label`}
        data-testid={`${testId || itemId}-label`}
        onClick={(e: any) => {
          if (isDisabled) {
            e.stopPropagation();
            return;
          }

          if (selectable === TreeViewSelectable.single) {
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
      disabled: isDisabled,
      hideFocus: true,
      id: `${itemId}-checkbox`,
      inputStyle: { marginRight: theme.spaceScale.spacing03 },
      labelStyle: {
        padding: 0,
      },
      labelText: labelText,
      onChange: checkboxChangeHandler,
      tabIndex: -1,
      testId: `${itemId}-checkbox`,
    };

    const onExpandedClicked = (event: React.SyntheticEvent) => {
      setExpanded(state => !state);

      event.preventDefault();

      onExpandedChange &&
        typeof onExpandedChange === 'function' &&
        handleExpandedChange(event, itemId);
    };

    const tabIndex = React.useMemo(() => {
      if (isDisabled) {
        return undefined;
      }

      return itemToFocus === itemId ? 0 : -1;
    }, [isDisabled, itemToFocus, itemId]);

    return (
      <TreeItemContext.Provider value={contextValue}>
        <StyledTreeItem
          {...rest}
          aria-expanded={hasOwnTreeItems ? expanded : null}
          aria-selected={selectedItem}
          aria-checked={ariaCheckedValue}
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
          tabIndex={tabIndex}
          onKeyDown={handleKeyDown}
        >
          <StyledItemWrapper
            data-testid={`${testId || itemId}-itemwrapper`}
            depth={itemDepth}
            id={`${itemId}-itemwrapper`}
            isDisabled={isDisabled}
            isInverse={isInverse}
            nodeType={nodeType}
            selectable={selectable}
            style={style}
            theme={theme}
            ref={ref}
          >
            {hasOwnTreeItems && (
              <StyledExpandWrapper
                aria-hidden={Boolean(!expanded)}
                data-testid={`${testId || itemId}-expand`}
                isDisabled={isDisabled}
                isInverse={isInverse}
                onClick={event => {
                  if (!isDisabled) {
                    onExpandedClicked(event);
                  }
                }}
                theme={theme}
              >
                {expanded ? (
                  <ExpandMoreIcon aria-hidden />
                ) : (
                  <ChevronRightIcon aria-hidden />
                )}
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
              return child?.type === TreeItem ? (
                <Transition isOpen={expanded} unmountOnExit>
                  <ul role="group">
                    {React.cloneElement(child, {
                      index,
                      key: index,
                      itemDepth,
                      parentDepth,
                    })}
                  </ul>
                </Transition>
              ) : (
                child
              );
            }
          )}
        </StyledTreeItem>
      </TreeItemContext.Provider>
    );
  }
);
