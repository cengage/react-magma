import * as React from 'react';
import styled from '../../theme/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';
import { Transition } from '../Transition';

import { ExpandLessIcon, ExpandMoreIcon, IconProps } from 'react-magma-icons';
import { Checkbox } from '../Checkbox';
import { TreeContext } from './';

/**
* @children required
*/
export interface TreeItemProps extends React.HTMLAttributes<HTMLLIElement>{
  testId?: string;
  isInverse?: boolean;
  /**
  * @internal
  */
  theme?: ThemeInterface;
  icon?: React.ReactElement<IconProps>;
  hasOwnTreeItems?: boolean;
  isSelectable?: boolean;
}

const addPxStyleStrings = (
  styleStrings: (string | number)[]
): string => {
  const pxValues: number[] = styleStrings.map(styleString => {
    return parseInt(styleString.toString().replace(/\s*px$/,''));
  });
  return pxValues.reduce((total, value) => total + value).toString()+'px';
}

const StyledTreeItem = styled.li<TreeItemProps>`
  background: ${props =>
    props.isInverse
    ? props.theme.colors.primary600
    : props.theme.colors.neutral100};
  color: ${props =>
    props.isInverse
    ? props.theme.colors.neutral100
    : props.theme.colors.neutral};
  list-style-type: none;
  margin-left: ${props =>
    props.hasOwnTreeItems
    ? '0px'
    : addPxStyleStrings([
      props.theme.spaceScale.spacing05,
      props.theme.iconSizes.medium
    ])};
`;

const IconWrapper = styled.span<{ hasIcon?: boolean; isInverse?: boolean }>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral500};
  margin-right: ${props => props.theme.spaceScale.spacing03};
  margin-left: ${props =>
    props.hasIcon
    ? '24px'
    : '0px'
    };
  svg {
    height: ${props => props.theme.iconSizes.medium}px;
    width: ${props => props.theme.iconSizes.medium}px;
    vertical-align: middle;
  }
`;

const StyledButton = styled.button<{ theme?: ThemeInterface; isInverse?: boolean; }>`
  border: none;
  color: inherit;
  background: inherit;
  padding: 0;
  margin-right: ${props => props.theme.spaceScale.spacing05};
  vertical-align: middle;
`;

const StyledCheckbox = styled.div<{theme?: ThemeInterface; isInverse?: boolean;}>`
  border: none;
  color: inherit;
  background: inherit;
  padding: 0;
  margin-right: ${props => props.theme.spaceScale.spacing05};
  vertical-align: middle;
  display: inline-flex;
  width: ${props => props.theme.iconSizes.medium}px;
`

export const TreeItem = React.forwardRef<HTMLLIElement, TreeItemProps>(
  (props, ref) => {
    const {children, testId, isInverse: isInverseProp, icon, ...rest} = props;
    const theme = React.useContext(ThemeContext);
    const treeContext = React.useContext(TreeContext);
    const isInverse = useIsInverse(isInverseProp);
    const isSelectable = treeContext.isSelectable;
    const hasIcons = treeContext.hasIcons;
    const [expanded, setExpanded] = React.useState(true);

    const hasOwnTreeItems = React.Children.toArray(children).filter((child: React.ReactElement<any>) => child.type === TreeItem).length > 0;

    const [selected, updateSelected] = React.useState(false);

    return (<TreeContext.Provider value={{ isInverse, isSelectable, hasIcons }}>
      <StyledTreeItem
        theme={theme} 
        isInverse={isInverse}
        ref={ref}
        data-testid={props.testId}
        hasOwnTreeItems={hasOwnTreeItems}
        {...rest}
      >
        {hasOwnTreeItems &&
          <StyledButton isInverse={isInverse} theme={theme} onClick={() => setExpanded(state => !state)}>
            {
              expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
            }
          </StyledButton>
        }

        {treeContext.isSelectable &&
          <StyledCheckbox isInverse={isInverse} theme={theme}>
            <Checkbox isInverse={isInverse} isTextVisuallyHidden labelText="Checkbox" onChange={() => updateSelected(!selected)}></Checkbox>
          </StyledCheckbox>
        }
        {treeContext.hasIcons &&
          <IconWrapper isInverse={isInverse} theme={theme} hasIcon={treeContext.hasIcons && !icon}>
          {icon}
          </IconWrapper>
        }
        {
          React.Children.map(children, (child: React.ReactElement<any>, index) => {
            return (child.type === TreeItem) ? (
              <Transition isOpen={expanded} collapse>
                <ul>
                  {child}
                </ul>
              </Transition>
            ) : child;
          })
        }
      </StyledTreeItem>
    </TreeContext.Provider>);
});
