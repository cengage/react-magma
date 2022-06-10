import * as React from 'react';

import { AccordionContext } from './useAccordion';
import { useGenerateId } from '../../utils';

export interface UseAccordionItemProps {
  /**
   * @internal
   */
  index?: number;
  isDisabled?: boolean;
  /**
   * @internal
   */
  testId?: string;
}

interface AccordionItemContextInterface {
  buttonId?: string;
  index?: number;
  isDisabled?: boolean;
  isExpanded?: boolean;
  panelId?: string;
  setIsExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AccordionItemContext =
  React.createContext<AccordionItemContextInterface>({
    isDisabled: false,
    isExpanded: false,
    setIsExpanded: () => {},
  });

export function useAccordionItem(props: UseAccordionItemProps) {
  const { index, isDisabled } = props;

  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const { expandedIndex, isMulti } = React.useContext(AccordionContext);

  const idPrefix = useGenerateId();

  const buttonId = `${idPrefix}_btn`;
  const panelId = `${idPrefix}_panel`;

  React.useEffect(() => {
    const newIsExpanded = isMulti
      ? Array.isArray(expandedIndex) && expandedIndex.includes(index)
      : expandedIndex == index;

    setIsExpanded(newIsExpanded);
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
