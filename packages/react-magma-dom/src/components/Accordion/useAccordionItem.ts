import * as React from 'react';

import { AccordionContext } from './useAccordion';
import { useGenerateId } from '../../utils';

export interface UseAccordionItemProps {
  index?: number;
  isDisabled?: boolean;
  isExpanded?: boolean;
  testId?: string;
}

interface AccordionItemContextInterface {
  buttonId?: string;
  index?: number;
  isDisabled?: boolean;
  isExpanded?: boolean;
  panelId?: string;
  setIsExpanded?: any;
}

export const AccordionItemContext = React.createContext<AccordionItemContextInterface>(
  {
    isDisabled: false,
    isExpanded: false,
    setIsExpanded: () => {},
  }
);

export function useAccordionItem(props: UseAccordionItemProps) {
  const { index, isDisabled, isExpanded: isExpandedProp } = props;

  const [isExpanded, setIsExpanded] = React.useState(isExpandedProp);
  const { expandedIndex, isMultiple } = React.useContext(AccordionContext);

  const idPrefix = useGenerateId();

  const buttonId = `${idPrefix}_btn`;
  const panelId = `${idPrefix}_panel`;

  const contextValue = {
    buttonId,
    index,
    isDisabled,
    isExpanded,
    panelId,
    setIsExpanded,
  };

  return {
    buttonId,
    panelId,
    expandedIndex,
    isMultiple,
    contextValue,
    isExpanded,
    setIsExpanded,
  };
}

export type UseAccordionItemReturn = ReturnType<typeof useAccordionItem>;
