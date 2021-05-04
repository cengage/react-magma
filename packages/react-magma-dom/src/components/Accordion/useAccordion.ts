import * as React from 'react';

export enum AccordionIconPosition {
  left = 'left',
  none = 'none',
  right = 'right', // default
}

export interface UseAccordionProps {
  /**
   * Index of the expanded accordion panel.  Used when the only one tab can be active at once.
   * @default 0
   */
  expandedIndex?: number;
  /**
   * Position of the chevron icon.  If 'none', the icon will not render at all.
   * @default AccordionIconPosition.right
   */
  iconPosition?: AccordionIconPosition;
  /**
   * If true, all accordion items may be collapsed at once
   * @default false
   */
  isCollapsible?: boolean;
  isInverse?: boolean;
  /**
   * If true, multiple accordion items may be expanded at once
   * @default false
   */
  isMultiple?: boolean;
  testId?: string;
}

interface AccordionContextInterface {
  expandedIndex?: number;
  iconPosition?: AccordionIconPosition;
  isCollapsible?: boolean;
  isMultiple?: boolean;
  setExpandedIndex?: any;
}

export const AccordionContext = React.createContext<AccordionContextInterface>({
  expandedIndex: 0,
  iconPosition: AccordionIconPosition.right,
  isCollapsible: false,
  isMultiple: false,
});

export function useAccordion(props: UseAccordionProps) {
  const {
    isCollapsible,
    expandedIndex: expandedIndexProp = isCollapsible ? null : 0,
    iconPosition = AccordionIconPosition.right,
    isMultiple,
  } = props;

  const [expandedIndex, setExpandedIndex] = React.useState(expandedIndexProp);

  const contextValue = {
    iconPosition,
    isMultiple,
    isCollapsible,
    expandedIndex,
    setExpandedIndex,
  };

  return {
    expandedIndex,
    iconPosition,
    isCollapsible,
    isMultiple,
    setExpandedIndex,
    contextValue,
  };
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>;
