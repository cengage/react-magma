import * as React from 'react';
import { AccordionContext } from './';
import styled from '../../theme/styled';
import { useGenerateId } from '../../utils';

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

  const [isExpanded, setIsExpanded] = React.useState(isExpandedProp);
  const { expandedIndex, isMultiple } = React.useContext(AccordionContext);

  const idPrefix = useGenerateId();

  const buttonId = `${idPrefix}_btn`;
  const panelId = `${idPrefix}_panel`;

  const value = {
    buttonId,
    index,
    isDisabled,
    isExpanded,
    panelId,
    setIsExpanded,
  };

  React.useEffect(() => {
    if (!isMultiple) {
      setIsExpanded(expandedIndex == index);
    }
  });

  return (
    <AccordionItemContext.Provider value={value}>
      <StyledItem ref={ref} data-testid={props.testId} {...rest}>
        {children}
      </StyledItem>
    </AccordionItemContext.Provider>
  );
});
