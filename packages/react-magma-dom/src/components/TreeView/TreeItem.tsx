import * as React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import {
  ArticleIcon,
  ChevronRightIcon,
  ExpandMoreIcon,
  FolderIcon,
} from 'react-magma-icons';

import { TreeItemContext } from './TreeItemContext';
import { TreeViewContext } from './TreeViewContext';
import { TreeViewSelectable } from './types';
import {
  checkedStatusToBoolean,
  useTreeItem,
  UseTreeItemProps,
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
  getTreeItemLabelColor,
  getTreeItemWrapperCursor,
  TreeNodeType,
} from './utils';
import { useFocusLock } from '../../hooks/useFocusLock';
import { mergeRefs } from '../../utils';

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
  hoverColor?: string;
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
        getHoverBackground({
          isDisabled: props.isDisabled,
          hoverColor: props.hoverColor,
          isInverse: props.isInverse,
          theme: props.theme,
        })};
    }
  }
`;

function getHoverBackground({ isDisabled, hoverColor, isInverse, theme }) {
  if (isDisabled) return undefined;
  if (hoverColor) return hoverColor;

  const transparency = isInverse ? 0.8 : 0.95;
  return transparentize(transparency, theme.colors.neutral900);
}

const IconWrapper = styled.span<{
  theme?: ThemeInterface;
  isDisabled?: boolean;
  isInverse?: boolean;
}>`
  color: ${props =>
    getTreeItemLabelColor(props.isInverse, props.isDisabled, props.theme)};
  margin-right: ${props => props.theme.spaceScale.spacing03};
  margin-left: 0;

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
  color?: string;
  isDisabled?: boolean;
  isInverse?: boolean;
  size?: number;
  theme?: ThemeInterface;
}>`
  display: inline-block;
  vertical-align: middle;
  margin-right: ${props => props.theme.spaceScale.spacing03};
  color: ${props =>
    props.color ||
    getTreeItemLabelColor(props.isInverse, props.isDisabled, props.theme)};
  border-radius: 0;
  width: ${({ size, theme }) =>
    size !== undefined ? `${size}px` : theme.spaceScale.spacing06};
  height: ${({ size, theme }) =>
    size !== undefined ? `${size}px` : theme.spaceScale.spacing06};
`;

const StyledCheckboxWrapper = styled.div<{
  theme?: ThemeInterface;
  hasAdditionalContent?: boolean;
}>`
  margin-right: ${props => props.theme.spaceScale.spacing03};
  vertical-align: middle;
  display: ${props => (props.hasAdditionalContent ? 'flex' : 'inline-flex')};
  flex-direction: column;
  width: ${props => `calc(100% - ${props.theme.spaceScale.spacing03})`};
`;

const StyledItemWrapper = styled.div<{
  hasAdditionalContent?: boolean;
  hasCustomIconSize?: boolean;
  theme?: ThemeInterface;
  selectable?: TreeViewSelectable;
  nodeType: TreeNodeType;
  depth: number;
  isInverse: boolean;
  isDisabled: boolean;
}>`
  display: flex;
  flex-direction: ${props => (props.hasAdditionalContent ? 'column' : 'row')};
  align-items: ${props => (props.hasCustomIconSize ? 'center' : 'flex-start')};
  cursor: ${props =>
    getTreeItemWrapperCursor(
      props.isDisabled,
      props.selectable,
      props.nodeType
    )};
`;

const AdditionalContentWrapper = styled.div<{ theme?: ThemeInterface }>`
  margin-bottom: ${props => props.theme.spaceScale.spacing05};
`;

export const TreeItem = React.forwardRef<HTMLLIElement, TreeItemProps>(
  (props, forwardedRef) => {
    const {
      additionalContent,
      children,
      hoverColor,
      icon,
      index,
      label,
      labelStyle,
      style,
      testId,
      topLevel,
      treeItemStyles,
      ...rest
    } = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse();

    const {
      expandIconStyles,
      handleExpandedChange,
      hasIcons,
      itemToFocus,
      isTopLevelSelectable,
      selectable,
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

    const [isInsideTreeItem, setIsInsideTreeItem] = React.useState(false);
    const treeItemRef = React.useRef<HTMLLIElement>(null);
    const focusTrapElement = useFocusLock(isInsideTreeItem);
    const interactiveElements =
      'button, [role="button"], input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])';

    const getInteractiveElements = (
      container: HTMLElement,
      selector: string
    ): HTMLElement[] => {
      return Array.from(
        container.querySelectorAll<HTMLElement>(selector)
      ).filter(
        el =>
          !el.hasAttribute('tabindex') ||
          (el.tabIndex !== undefined && el.tabIndex >= 0)
      );
    };

    /**
     * This function allows for keyboard navigation within the label and additional content of a tree item.
     *
     * You can navigate through interactive elements using the `Tab` key, activate them with `Enter` or `Space`,
     * and exit outside and focus the whole tree item with `Escape`.
     * **/
    const handleLabelAndAdditionalContentKeyDown = (
      event: React.KeyboardEvent
    ) => {
      const { key, target, currentTarget, shiftKey } = event;
      const currentElement = target as HTMLElement;
      const isEnter = key === 'Enter';
      const isSpace = key === ' ';
      const isEscape = key === 'Escape';
      const isTab = key === 'Tab';
      const isActivationKey = isEnter || isSpace;
      const interactiveElement =
        currentElement.closest<HTMLElement>(interactiveElements);

      // If the key is `Tab`, we navigate through interactive elements inside the tree item
      if (isTab && isInsideTreeItem) {
        event.preventDefault();

        const interactiveElementsList = getInteractiveElements(
          currentTarget as HTMLElement,
          interactiveElements
        );

        // Filter list of interactive elements which are only included for current tree item
        const currentTreeItemInteractiveElements =
          interactiveElementsList.filter(el => {
            const closestTreeItem = el.closest('[role="treeitem"]');

            return closestTreeItem === treeItemRef.current;
          });

        const currentIndex =
          currentTreeItemInteractiveElements.indexOf(currentElement);
        const direction = shiftKey ? -1 : 1;
        const total = currentTreeItemInteractiveElements.length;
        const nextIndex = (currentIndex + direction + total) % total;
        const elementToFocus = currentTreeItemInteractiveElements[nextIndex];
        if (elementToFocus) {
          setTimeout(() => elementToFocus.focus(), 0);
        }
        return;
      }

      // Pressing `Enter` or `Space` on an interactive element will trigger its click event
      if (isActivationKey && interactiveElement) {
        event.preventDefault();
        interactiveElement.click();
      }

      // Moves focus outside the tree item and focuses the tree item itself when `Escape` is pressed
      if (isEscape) {
        event.preventDefault();
        event.stopPropagation();
        setIsInsideTreeItem(false);

        const treeItemNode = treeItemRef.current;
        if (treeItemNode) {
          treeItemNode.focus();
        }
        return;
      }
    };

    const handleOnClick = (event: React.MouseEvent) => {
      if (isDisabled) {
        event.stopPropagation();
        return;
      }

      const currentElement = event.target as HTMLElement;
      const interactiveElement = currentElement.closest<HTMLElement>(
        'button, [role="button"], a[href], input, select, textarea, [role="menuitem"]'
      );

      // Preventing selecting the item when clicking on interactive elements when `selectable` is `single`
      if (interactiveElement) {
        event.stopPropagation();
        return;
      }

      if (selectable === TreeViewSelectable.single) {
        handleClick(event, itemId);
      }
    };

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

    const treeItemAdditionalContent = additionalContent ? (
      <AdditionalContentWrapper
        theme={theme}
        id={`${itemId}-additionalcontentwrapper`}
        data-testid={`${testId ?? itemId}-additionalcontentwrapper`}
      >
        {additionalContent}
      </AdditionalContentWrapper>
    ) : null;

    // Props shared by Checkbox and IndeterminateCheckbox
    const checkboxProps = {
      disabled: isDisabled,
      hideFocus: true,
      id: `${itemId}-checkbox`,
      inputStyle: { marginRight: theme.spaceScale.spacing03 },
      labelStyle: {
        padding: 0,
        width: '100%',
      },
      labelText: labelText,
      onChange: checkboxChangeHandler,
      tabIndex: -1,
      testId: `${itemId}-checkbox`,
    };

    const onExpandedClicked = (event: React.SyntheticEvent) => {
      event.preventDefault();

      handleExpandedChange(event, itemId);
    };

    const tabIndex = React.useMemo(() => {
      if (isDisabled) {
        return undefined;
      }

      return itemToFocus === itemId ? 0 : -1;
    }, [isDisabled, itemToFocus, itemId]);

    const shouldShowCheckbox =
      selectable === TreeViewSelectable.multi &&
      (isTopLevelSelectable !== false || !topLevel);

    /**
     * This function allows for keyboard navigation within the tree item.
     *
     * Pressing `Ctrl + Enter` or `Command + Enter` focuses the first interactive element within the tree item
     * and locks focus inside the tree item.
     *
     * If the focus is within the label or additional content, it handles key events for interaction elements.
     *
     * It also handles the other keys to trigger the click event on the tree item.
     * **/
    const onKeyDownHandler = (event: React.KeyboardEvent) => {
      const { key, target, currentTarget } = event;
      const isEnter = key === 'Enter';
      const isCtrlOrCommand = event.ctrlKey || event.metaKey;
      const isCtrlEnter = isCtrlOrCommand && isEnter;

      // If the key is Ctrl + Enter or Command + Enter, focus the first interactive element
      // and lock focus inside the tree item
      if (isCtrlEnter && target === currentTarget) {
        setIsInsideTreeItem(true);

        const interactiveElementsList = getInteractiveElements(
          currentTarget as HTMLElement,
          interactiveElements
        );
        const elementToFocus = interactiveElementsList[0];

        if (elementToFocus) {
          setTimeout(() => {
            elementToFocus.focus();
          }, 0);
        }
        return;
      }

      // Ensure valid CSS selectors by escaping special characters (e.g., periods in itemId)
      const safeItemId = CSS.escape(itemId);
      const isWithinLabelOrAdditionalContent = (target as HTMLElement).closest(
        `#${safeItemId}-label, #${safeItemId}-additionalcontentwrapper`
      );

      // If the target is within the label or additional content, handle key events for those areas
      if (isWithinLabelOrAdditionalContent) {
        handleLabelAndAdditionalContentKeyDown(event);
        return;
      }

      // If the target is the tree item itself, handle key down for the tree item
      if (target === currentTarget) {
        handleKeyDown(event);
        return;
      }
    };

    return (
      <TreeItemContext.Provider value={contextValue}>
        <div style={treeItemStyles}>
          <StyledTreeItem
            {...rest}
            aria-expanded={hasOwnTreeItems ? expanded : null}
            aria-selected={selectedItem}
            aria-checked={shouldShowCheckbox ? ariaCheckedValue : null}
            data-testid={testId}
            depth={itemDepth}
            hasOwnTreeItems={hasOwnTreeItems}
            id={itemId}
            isDisabled={isDisabled}
            isInverse={isInverse}
            nodeType={nodeType}
            role="treeitem"
            selectableType={selectable}
            selected={selectedItem}
            theme={theme}
            tabIndex={tabIndex}
            onKeyDown={onKeyDownHandler}
            ref={treeItemRef}
            hoverColor={hoverColor}
          >
            <StyledItemWrapper
              data-testid={`${testId ?? itemId}-itemwrapper`}
              depth={itemDepth}
              hasAdditionalContent={!!additionalContent}
              hasCustomIconSize={!!expandIconStyles?.size}
              id={`${itemId}-itemwrapper`}
              isDisabled={isDisabled}
              isInverse={isInverse}
              nodeType={nodeType}
              selectable={selectable}
              style={style}
              theme={theme}
              ref={mergeRefs(ref, focusTrapElement)}
              onClick={handleOnClick}
            >
              {hasOwnTreeItems && (
                <StyledExpandWrapper
                  aria-hidden={Boolean(!expanded)}
                  size={expandIconStyles?.size}
                  color={expandIconStyles?.color}
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
                    <ExpandMoreIcon aria-hidden size={expandIconStyles?.size} />
                  ) : (
                    <ChevronRightIcon
                      aria-hidden
                      size={expandIconStyles?.size}
                    />
                  )}
                </StyledExpandWrapper>
              )}
              {shouldShowCheckbox ? (
                <StyledCheckboxWrapper
                  hasAdditionalContent={!!additionalContent}
                  theme={theme}
                >
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
                  {treeItemAdditionalContent}
                </StyledCheckboxWrapper>
              ) : (
                <>
                  {labelText}
                  {treeItemAdditionalContent}
                </>
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
                        key: child.props.itemId,
                        itemDepth,
                        parentDepth,
                        topLevel: false,
                      })}
                    </ul>
                  </Transition>
                ) : (
                  child
                );
              }
            )}
          </StyledTreeItem>
        </div>
      </TreeItemContext.Provider>
    );
  }
);
