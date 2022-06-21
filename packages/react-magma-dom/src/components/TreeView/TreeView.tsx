import * as React from 'react';
import styled from '../../theme/styled';

import { ThemeContext } from '../../theme/ThemeContext';
import { ThemeInterface } from '../../theme/magma';
import { InverseContext, useIsInverse } from '../../inverse';

/**
* @children required
*/
export interface TreeViewProps extends React.HTMLAttributes<HTMLDivElement>{
  testId?: string;
  isInverse?: boolean;
  /**
  * @internal
  */
  theme?: ThemeInterface;
}

const StyledTreeView = styled.div<TreeViewProps>`
  background: ${props =>
  props.isInverse
  ? props.theme.colors.primary600
  : props.theme.colors.neutral100};
  color: ${props =>
  props.isInverse
  ? props.theme.colors.neutral100
  : props.theme.colors.neutral};
`;

export const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  (props, ref) => {
    const {children, testId, isInverse: isInverseProp,  ...rest} = props;
    const theme = React.useContext(ThemeContext);
    const isInverse = useIsInverse(isInverseProp);

    return (<InverseContext.Provider value={{ isInverse, }}>
      <StyledTreeView
       theme={theme} 
       isInverse={isInverse}
      ref={ref}
      data-testid={props.testId}
      {...rest} >
        {children}
        
      </StyledTreeView>
    </InverseContext.Provider>);
  }
)