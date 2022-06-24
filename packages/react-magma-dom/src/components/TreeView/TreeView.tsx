import * as React from 'react';
import styled from '../../theme/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { useIsInverse } from '../../inverse';

/**
* @children required
*/
export interface TreeViewProps extends React.HTMLAttributes<HTMLUListElement>{
  testId?: string;
  isInverse?: boolean;
  isSelectable?: boolean;
  hasIcons?: boolean;
  /**
  * @internal
  */
  theme?: ThemeInterface;
}

interface TreeContextInterface {
  isInverse?: boolean;
  isSelectable?: boolean;
  hasIcons?: boolean;
}

export const TreeContext = React.createContext<TreeContextInterface>({
  isInverse: false,
  isSelectable: false,
  hasIcons: false,
});

const StyledTreeView = styled.ul<TreeViewProps>`
  background: ${props =>
  props.isInverse
  ? props.theme.colors.primary600
  : props.theme.colors.neutral100};
  color: ${props =>
  props.isInverse
  ? props.theme.colors.neutral100
  : props.theme.colors.neutral};
  ul {
    padding: 0px;
    margin-left: ${props => props.theme.spaceScale.spacing06};
  }
`;

export const TreeView = React.forwardRef<HTMLUListElement, TreeViewProps>(
  (props, ref) => {
    const {children, testId, isInverse: isInverseProp, isSelectable, hasIcons, ...rest} = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    return (<TreeContext.Provider value={{ isInverse, isSelectable, hasIcons}}>
      <StyledTreeView
        theme={theme} 
        isInverse={isInverse}
        ref={ref}
        data-testid={props.testId}
        {...rest} >
          {children}
        
      </StyledTreeView>
    </TreeContext.Provider>);
  }
)