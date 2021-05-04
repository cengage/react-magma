import * as React from 'react';

import { AccordionContext } from './useAccordion';
import { AccordionItemContext } from './useAccordionItem';

export interface UseAccordionButtonProps {
  testId?: string;
  isInverse?: boolean;
}

export function useAccordionButton(props: UseAccordionButtonProps) {
  const {
    iconPosition,
    isCollapsible,
    isMultiple,
    setExpandedIndex,
  } = React.useContext(AccordionContext);

  const {
    buttonId,
    index,
    isDisabled,
    isExpanded,
    panelId,
    setIsExpanded,
  } = React.useContext(AccordionItemContext);

  const handleClick = () => {
    if (isMultiple) {
      setIsExpanded(!isExpanded);
    } else if (isExpanded && isCollapsible) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return {
    iconPosition,
    isCollapsible,
    isMultiple,
    setExpandedIndex,
    buttonId,
    index,
    isDisabled,
    isExpanded,
    panelId,
    setIsExpanded,
    handleClick,
  };
}

export type UseAccordionButtonReturn = ReturnType<typeof useAccordionButton>;
