import * as React from 'react';
import styled from '../../theme/styled';
import { Accordion, AccordionProps } from '../Accordion';
import { DropdownContext } from './Dropdown';

const StyledAccordion = styled(Accordion)<{
  testId?: string;
}>`
  border: none;
`;

export interface DropdownExpandableContext {
  hasIcon?: boolean;
  isExpandablePanel?: boolean;
}

export const DropdownExpandableContext =
  React.createContext<DropdownExpandableContext>({});

export const DropdownExpandableMenuGroup = React.forwardRef<
  HTMLDivElement,
  AccordionProps
>(props => {
  const { children, testId, ...other } = props;

  const context = React.useContext(DropdownContext);

  let hasIcon = false;
  let isExpandablePanel = false;

  React.Children.forEach(children, (child: any) => {
    if (child.type?.displayName === 'DropdownExpandableMenuItem') {
      React.Children.forEach(child.props.children, (c: any) => {
        if (c.type?.displayName === 'DropdownExpandableMenuButton') {
          if (c.props.icon) {
            hasIcon = true;
            return;
          }
        }
      });
      if (React.isValidElement(child)) {
        isExpandablePanel = true;
      }
    }
  });

  return (
    <DropdownExpandableContext.Provider value={{ hasIcon, isExpandablePanel }}>
      <StyledAccordion
        {...other}
        isInverse={context.isInverse}
        role="expandable group"
        testId={testId}
      >
        {children}
      </StyledAccordion>
    </DropdownExpandableContext.Provider>
  );
});

DropdownExpandableMenuGroup.displayName = 'DropdownExpandableMenuGroup';
