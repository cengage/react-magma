import * as React from 'react';

/**
 * @children required
 */
export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isDisabled?: boolean;
  isExpanded?: boolean;
  testId?: string;
}

interface AccordionItemContextInterface {
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
    isDisabled,
    isExpanded: isExpandedProp,
    testId,
    ...rest
  } = props;

  const [isExpanded, setIsExpanded] = React.useState(isExpandedProp);
  const value = { isDisabled, isExpanded, setIsExpanded };

  return (
    <AccordionItemContext.Provider value={value}>
      <div ref={ref} data-testid={props.testId} {...rest}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
});
