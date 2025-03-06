import * as React from 'react';

import { useDescendants } from '../../hooks/useDescendants';

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
  defaultIndex?: number[] | number;
  /**
   * Position of the chevron icon.  If 'none', the icon will not render at all.
   * @default AccordionIconPosition.right
   */
  iconPosition?: AccordionIconPosition;
  index?: number[] | number;
  isInverse?: boolean;
  /**
   * If true, multiple accordion items may be expanded at once
   * @default true
   */
  isMulti?: boolean;
  /**
   * Event that fires when an accordion button is clicked
   */
  onExpandedChange?: (event: any) => void;
  /**
   * @internal
   */
  testId?: string;
}

interface AccordionContextInterface {
  buttonRefArray?: React.MutableRefObject<React.MutableRefObject<Element>[]>;
  expandedIndex?: number[] | number;
  iconPosition?: AccordionIconPosition;
  isControlled?: boolean;
  isMulti?: boolean;
  onExpandedChange?: any;
  setExpandedIndex?: any;
  registerAccordionButton: (
    itemRefArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    itemRef: React.MutableRefObject<Element>
  ) => void;
}

export const AccordionContext = React.createContext<AccordionContextInterface>({
  isControlled: false,
  iconPosition: AccordionIconPosition.right,
  isMulti: false,
  registerAccordionButton: (elements, element) => {},
});

export function useAccordion(props: UseAccordionProps) {
  const {
    isMulti = true,
    defaultIndex = isMulti ? [] : null,
    index,
    iconPosition = AccordionIconPosition.right,
    onExpandedChange,
  } = props;

  const isControlled = typeof index !== 'undefined';

  const indexProp = isControlled ? index : defaultIndex;

  const [expandedIndex, setExpandedIndex] = React.useState(indexProp);

  React.useEffect(() => {
    if (isControlled) {
      setExpandedIndex(index);
    }
  }, [index]);

  const [buttonRefArray, registerAccordionButton] = useDescendants();

  const contextValue = {
    buttonRefArray,
    expandedIndex,
    iconPosition,
    isControlled,
    isMulti,
    onExpandedChange,
    registerAccordionButton,
    setExpandedIndex,
  };

  return {
    contextValue,
  };
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>;
