import * as React from 'react';

import { AccordionContext } from './useAccordion';
import { useGenerateId } from '../../utils';
import { isArray } from 'lodash';

export interface UseAccordionItemProps {
  /**
   * @internal
   */
  index?: number;
  isDisabled?: boolean;
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
  const { index, isDisabled } = props;

  const [isExpanded, setIsExpanded] = React.useState(false);
  const { expandedIndex, isMultiple } = React.useContext(AccordionContext);

  const idPrefix = useGenerateId();

  const buttonId = `${idPrefix}_btn`;
  const panelId = `${idPrefix}_panel`;

  React.useEffect(() => {
    if (isMultiple) {
      setIsExpanded(isArray(expandedIndex) && expandedIndex.includes(index));
    } else {
      setIsExpanded(expandedIndex == index);
    }
  });

  const contextValue = {
    buttonId,
    index,
    isDisabled,
    isExpanded,
    panelId,
    setIsExpanded,
  };

  return {
    contextValue,
  };
}

export type UseAccordionItemReturn = ReturnType<typeof useAccordionItem>;
