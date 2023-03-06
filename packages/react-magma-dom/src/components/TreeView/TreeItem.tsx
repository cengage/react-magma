import * as React from 'react';

import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { useIsInverse } from '../../inverse';

import styled from '../../theme/styled';

import { TreeItemContext, UseTreeItemProps, useTreeItem, checkedStatusToBoolean} from './useTreeItem';
import { TreeViewContext } from './useTreeView';
import { ExpandLessIcon, ExpandMoreIcon } from 'react-magma-icons';
import { Checkbox } from '../Checkbox';
import { IndeterminateCheckbox } from '../IndeterminateCheckbox';
import { Transition } from '../Transition';
import { Button, ButtonVariant, ButtonColor } from '../Button';


export interface TreeItemProps extends UseTreeItemProps{}

const addPxStyleStrings = (
  styleStrings: (string | number)[]
): string => {
  const pxValues: number[] = styleStrings.map(styleString => {
    return parseInt(styleString.toString().replace(/\s*px$/,''));
  });
  return pxValues.reduce((total, value) => total + value).toString()+'px';
}

const StyledTreeItem = styled.li<{ theme?: ThemeInterface, isInverse?: boolean, hasOwnTreeItems: boolean}>`
  color: ${props =>
    props.isInverse
    ? props.theme.colors.neutral100
    : props.theme.colors.neutral700};
  list-style-type: none;
  margin-left: ${props =>
    props.hasOwnTreeItems
    ? '0px'
    : addPxStyleStrings([
      props.theme.spaceScale.spacing05,
      props.theme.iconSizes.medium
    ])};
`;

const IconWrapper = styled.span<{ theme?: ThemeInterface, isInverse?: boolean, isSelectable?: boolean }>`
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

const StyledButton = styled(Button)<{ theme?: ThemeInterface }>`
  width: ${props => props.theme.spaceScale.spacing06};
  min-width: ${props => props.theme.spaceScale.spacing06};
  margin-right: ${props => props.theme.spaceScale.spacing06};
`;

const StyledCheckbox = styled.div<{ theme?: ThemeInterface }>`
  border: none;
  color: inherit;
  background: inherit;
  padding: 0;
  margin-right: ${props => props.theme.spaceScale.spacing05};
  vertical-align: middle;
  display: inline-flex;
  width: ${props => props.theme.iconSizes.medium}px;
`;

export const TreeItem = React.forwardRef<HTMLLIElement, TreeItemProps>(
  (props, ref) => {
    const {children, index, testId, icon, parentCheckedStatus, updateParentCheckStatus, ...rest} = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse();

    const { isSelectable, hasIcons } = React.useContext(TreeViewContext);

    const { contextValue } = useTreeItem(props);

    const {
      itemId,
      expanded,
      setExpanded,
      checkedStatus,
      checkboxChangeHandler,
      hasOwnTreeItems,
      updateCheckedStatusFromChild, 
    } = contextValue;

    let childTreeItemIndex = 0;

    return (<TreeItemContext.Provider value={contextValue}>
      <StyledTreeItem
        theme={theme} 
        isInverse={isInverse}
        hasOwnTreeItems
        ref={ref}
        data-testid={testId}
        {...rest}
      >
        {hasOwnTreeItems &&
          <StyledButton theme={theme} variant={ButtonVariant.link} color={ButtonColor.subtle} onClick={() => setExpanded(state => !state)}>
            {
              expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
            }
          </StyledButton>
        }

        {isSelectable &&
          <StyledCheckbox theme={theme}>
            {hasOwnTreeItems ?
              (<IndeterminateCheckbox
                id={itemId}
                labelText="branch"
                isTextVisuallyHidden
                status={checkedStatus}
                onChange={checkboxChangeHandler}/>)
              :
              (<Checkbox
                labelText="leaf"
                isTextVisuallyHidden
                checked={checkedStatusToBoolean(checkedStatus)}
                onChange={checkboxChangeHandler} />)
            }
          </StyledCheckbox>
        }

        {hasIcons &&
          <IconWrapper isInverse={isInverse} theme={theme} isSelectable={isSelectable}>
          {icon}
          </IconWrapper>
        }

        {
          React.Children.map(children, (child: React.ReactElement<any>, index) => {
            const component = (child.type === TreeItem) ? (
              <Transition isOpen={expanded} collapse>
                <ul>
                  {React.cloneElement(child, {
                    index,
                    treeItemIndex: childTreeItemIndex,
                    key: index,
                    parentCheckedStatus: checkedStatus,
                    updateParentCheckStatus: updateCheckedStatusFromChild
                  })}
                </ul>
              </Transition>
            ) : child;
            if (child.type === TreeItem) {
              childTreeItemIndex++;
            }
            return component;
          })
        }
      </StyledTreeItem>
    </TreeItemContext.Provider>);
});
