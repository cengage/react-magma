import * as React from 'react';
import { useDescendants } from '../../utils';

export enum AccordionIconPosition {
  left = 'left',
  none = 'none',
  right = 'right', // default
}

export interface UseAccordionProps {
  /**
   * Index of the accordion panel expanded by default. If multiple panels are allowed, takes an array.
   * @default null
   */
  expandedIndex?: number[] | number;
  /**
   * Position of the chevron icon.  If 'none', the icon will not render at all.
   * @default AccordionIconPosition.right
   */
  iconPosition?: AccordionIconPosition;
  isInverse?: boolean;
  /**
   * If true, multiple accordion items may be expanded at once
   * @default false
   */
  isMultiple?: boolean;
  testId?: string;
}

interface AccordionContextInterface {
  buttonRefArray?: React.MutableRefObject<React.MutableRefObject<Element>[]>;
  expandedIndex?: number[] | number;
  iconPosition?: AccordionIconPosition;
  isMultiple?: boolean;
  setExpandedIndex?: any;
  registerAccordionButton: (
    itemRefArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    itemRef: React.MutableRefObject<Element>
  ) => void;
}

export const AccordionContext = React.createContext<AccordionContextInterface>({
  iconPosition: AccordionIconPosition.right,
  isMultiple: false,
  registerAccordionButton: (elements, element) => {},
});

export function useAccordion(props: UseAccordionProps) {
  const {
    isMultiple,
    expandedIndex: expandedIndexProp = isMultiple ? [] : null,
    iconPosition = AccordionIconPosition.right,
  } = props;

  const [expandedIndex, setExpandedIndex] = React.useState(expandedIndexProp);
  const [buttonRefArray, registerAccordionButton] = useDescendants();

  const contextValue = {
    buttonRefArray,
    iconPosition,
    isMultiple,
    expandedIndex,
    setExpandedIndex,
    registerAccordionButton,
  };

  return {
    contextValue,
  };
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>;
