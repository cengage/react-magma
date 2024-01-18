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
  ExpandLessIcon,
  ExpandMoreIcon,
  FolderIcon,
  ArticleIcon,
} from 'react-magma-icons';
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
  selected?: boolean;
  selectableType?: TreeViewSelectable;
  isDisabled?: boolean;
}>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral700};
  list-style-type: none;
  cursor: ${props => !props.isDisabled && props.nodeType === TreeNodeType.branch && props.selectableType === TreeViewSelectable.single ? 'pointer' : 'default'};
  padding-left: ${props => calculateLeftPadding(props.nodeType, props.depth)};
  border-left: ${props =>
    props.selected &&
    `4px solid ${
      props.isInverse
        ? props.theme.colors.tertiary500
        : props.theme.colors.primary500
    }`};
    background: ${props =>
      props.selected && props.isInverse
        ? transparentize(0.7, props.theme.colors.neutral900)
        : props.selected && transparentize(0.92, props.theme.colors.neutral900)};
    // :hover { background: ${props => transparentize(0.95, props.theme.colors.neutral900)};}
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
  // cursor: ${props => props.isDisabled && 'not-allowed'};
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
  // cursor: ${props => props.isDisabled && 'not-allowed'};
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
  isInverse: boolean;
}>`
  display: flex;
  align-items: ${props =>
    props.selectable === TreeViewSelectable.multi ? 'center' : 'flex-start'};
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
      selectedItems,
    } = contextValue;

    let childTreeItemIndex = 0;

    const nodeType = hasOwnTreeItems ? TreeNodeType.branch : TreeNodeType.leaf;

    const defaultIcon =
      nodeType === TreeNodeType.branch ? <FolderIcon /> : <ArticleIcon />;

    const labelText = (
      <StyledLabelWrapper
        theme={theme}
        isDisabled={isDisabled}
        isInverse={isInverse}
        style={labelStyle}
        id={`${itemId}-label`}
        onClick={e => {
          if (selectable === TreeViewSelectable.single) {
            // console.log('labelText clicked - single select');
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
          selected={
            selectable === TreeViewSelectable.single &&
            selectedItems?.[0] === `${itemId}-label`
          }
          selectableType={selectable}
          // aria-controls={panelId}
          id={`${itemId}-wrapper`}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          <StyledItemWrapper
            theme={theme}
            selectable={selectable}
            nodeType={nodeType}
            depth={itemDepth}
            // selected={
            //   selectable === TreeViewSelectable.single &&
            //   selectedItems?.[0] === `${itemId}-label`
            // }
            isInverse={isInverse}
          >
            {hasOwnTreeItems && (
              <StyledExpandWrapper
                theme={theme}
                isDisabled={isDisabled}
                isInverse={isInverse}
                aria-expanded={Boolean(expanded)}
                aria-hidden={Boolean(!expanded)}
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
            )
          }

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
                  <Transition isOpen={expanded} collapse unmountOnExit>
                    <ul>
                      {React.cloneElement(child, {
                        index,
                        key: index,
                        treeItemIndex: childTreeItemIndex,
                        parentDepth,
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
