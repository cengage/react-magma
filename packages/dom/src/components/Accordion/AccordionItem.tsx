import * as React from 'react';
import {
  AccordionItemContext,
  UseAccordionItemProps,
  useAccordionItem,
} from './useAccordionItem';
import { ThemeInterface } from '../../theme/magma';
import styled from '@emotion/styled';

/**
 * @children required
 */
export interface AccordionItemProps
  extends UseAccordionItemProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * @internal
   */
  theme?: ThemeInterface;
}

const StyledItem = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    background: none;
    color: inherit;
    font: inherit;
    line-height: inherit;
    margin: 0;
    padding: 0;
  }
`;

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps
>((props, ref) => {
  const { children, testId, ...rest } = props;

  const { contextValue } = useAccordionItem(props);

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <StyledItem ref={ref} data-testid={testId} {...rest}>
        {children}
      </StyledItem>
    </AccordionItemContext.Provider>
  );
});
