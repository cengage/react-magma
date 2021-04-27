import * as React from 'react';
import { AccordionContext } from './';

/**
 * @children required
 */
export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  index?: number;
  isDisabled?: boolean;
  isExpanded?: boolean;
  testId?: string;
}

interface AccordionItemContextInterface {
  index?: number;
  isDisabled?: boolean;
  isExpanded?: boolean;
  setIsExpanded?: any;
}

export const AccordionItemContext = React.createContext<AccordionItemContextInterface>(
  {
    isDisabled: false,
    isExpanded: false,
    setIsExpanded: () => {},
  }
);

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

  const [isExpanded, setIsExpanded] = React.useState(isExpandedProp);
  const value = { index, isDisabled, isExpanded, setIsExpanded };
  const { expandedIndex, isMultiple } = React.useContext(AccordionContext);

  React.useEffect(() => {
    if (!isMultiple) {
      setIsExpanded(expandedIndex == index);
    }
  });

  return (
    <AccordionItemContext.Provider value={value}>
      <div ref={ref} data-testid={props.testId} {...rest}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
});
