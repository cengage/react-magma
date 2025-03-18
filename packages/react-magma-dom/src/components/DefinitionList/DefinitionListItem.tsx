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
  type: DefinitionListType;
}

export enum DefinitionListType {
  /**
   * Represents the term in a definition list.
   * Will be wrapped in a <dt> (definition term) tag.
   */
  term = 'term',
  /**
   * Represents the description of a term.
   * Will be wrapped in a <dd> (definition description) tag.
   */
  description = 'description',
}

const StyledDefinitionListItem = styled.dt`
  margin: 0;
  padding: 0;
`;

export const DefinitionListItem = React.forwardRef<
  HTMLDListElement,
  DefinitionListItemProps
>((props, ref) => {
  const { children, testId, type, isInverse: isInverseProp, ...rest } = props;
  const theme = React.useContext(ThemeContext);
  const isInverse = useIsInverse(isInverseProp);

  return (
    <InverseContext.Provider value={{ isInverse }}>
      <StyledDefinitionListItem
        {...rest}
        as={type === DefinitionListType.term ? 'dt' : 'dd'}
        ref={ref}
        theme={theme}
        data-testid={testId}
      >
        {children}
      </StyledDefinitionListItem>
    </InverseContext.Provider>
  );
});
