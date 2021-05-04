import * as React from 'react';
import { AccordionContext } from './useAccordion';
import {
  AccordionItemContext,
  UseAccordionItemProps,
  useAccordionItem,
} from './useAccordionItem';
import { ThemeInterface } from '../../theme/magma';
import styled from '../../theme/styled';

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
  const {
    children,
    index,
    isDisabled,
    isExpanded: isExpandedProp,
    testId,
    ...rest
  } = props;

  const { expandedIndex, isMultiple } = React.useContext(AccordionContext);
  const { contextValue, setIsExpanded } = useAccordionItem(props);

  React.useEffect(() => {
    if (!isMultiple) {
      setIsExpanded(expandedIndex == index);
    }
  });

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <StyledItem ref={ref} data-testid={props.testId} {...rest}>
        {children}
      </StyledItem>
    </AccordionItemContext.Provider>
  );
});
