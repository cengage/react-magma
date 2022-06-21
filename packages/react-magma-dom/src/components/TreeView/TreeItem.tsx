import * as React from 'react';
import styled from '../../theme/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { InverseContext, useIsInverse } from '../../inverse';

import { IconProps } from 'react-magma-icons';

/**
* @children required
*/
export interface TreeItemProps extends React.HTMLAttributes<HTMLDivElement>{
  testId?: string;
  isInverse?: boolean;
  /**
  * @internal
  */
  theme?: ThemeInterface;
  icon?: React.ReactElement<IconProps>;
}

const StyledTreeItem = styled.div<TreeItemProps>`
  background: ${props =>
  props.isInverse
  ? props.theme.colors.primary600
  : props.theme.colors.neutral100};
  color: ${props =>
  props.isInverse
  ? props.theme.colors.neutral100
  : props.theme.colors.neutral};
`;

const IconWrapper = styled.span<{ isInverse?: boolean }>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral500};
  display: inline-flex;
  margin-right: ${props => props.theme.spaceScale.spacing03};

  svg {
    height: ${props => props.theme.iconSizes.medium}px;
    width: ${props => props.theme.iconSizes.medium}px;
  }
`;

export const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps>(
  (props, ref) => {
    const {children, testId, isInverse: isInverseProp, icon, ...rest} = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    return (<InverseContext.Provider value={{ isInverse, }}>
      <StyledTreeItem
        theme={theme} 
        isInverse={isInverse}
        ref={ref}
        data-testid={props.testId}
        {...rest} >
          <IconWrapper isInverse={isInverse} theme={theme}>
            {icon}
          </IconWrapper>
          {children}
      </StyledTreeItem>
    </InverseContext.Provider>);
  }
)