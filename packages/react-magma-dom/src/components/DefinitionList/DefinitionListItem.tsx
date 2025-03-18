import React from 'react';

import styled from '@emotion/styled';

import { DefinitionListProps } from './DefinitionList';
import { InverseContext, useIsInverse } from '../../inverse';
import { ThemeContext } from '../../theme/ThemeContext';

export interface DefinitionListItemProps
  extends DefinitionListProps,
    React.HTMLAttributes<HTMLDListElement> {
  /**
   * Types of definition list element.
   */
  type: 'term' | 'description';
}

const StyledDefinitionListItem = styled.dt<any>`
  margin: 0;
  padding: 0;
`;

export const DefinitionListItem = React.forwardRef<
  HTMLDivElement,
  DefinitionListItemProps
>((props, ref) => {
  const { children, testId, type, isInverse: isInverseProp } = props;
  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(isInverseProp);

  return (
    <InverseContext.Provider value={{ isInverse }}>
      <StyledDefinitionListItem
        as={type === 'term' ? 'dt' : 'dd'}
        isInverse={isInverse}
        ref={ref}
        theme={theme}
        testId={testId}
      >
        {children}
      </StyledDefinitionListItem>
    </InverseContext.Provider>
  );
});
