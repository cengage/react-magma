import * as React from 'react';

import styled from '@emotion/styled';

import { Accordion, AccordionIconPosition, AccordionProps } from '../Accordion';
import { DropdownContext } from './Dropdown';

const StyledAccordion = styled(Accordion)`
  border: none;
  padding: 0;
`;

export interface DropdownExpandableMenuGroupContextInterface {
  expandableMenuButtonHasIcon?: boolean;
  isExpandablePanel?: boolean;
}

export const DropdownExpandableMenuGroupContext =
  React.createContext<DropdownExpandableMenuGroupContextInterface>({});

export const DropdownExpandableMenuGroup = React.forwardRef<
  HTMLDivElement,
  AccordionProps
>((props, ref) => {
  const { children, testId, ...other } = props;

  const context = React.useContext(DropdownContext);

  let expandableMenuButtonHasIcon = false;
  let isExpandablePanel = false;

  React.Children.forEach(children, (child: any) => {
    if (child.type?.displayName === 'DropdownExpandableMenuItem') {
      React.Children.forEach(child.props.children, (c: any) => {
        if (c.type?.displayName === 'DropdownExpandableMenuButton') {
          if (c.props.icon) {
            expandableMenuButtonHasIcon = true;
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
    <DropdownExpandableMenuGroupContext.Provider
      value={{ expandableMenuButtonHasIcon, isExpandablePanel }}
    >
      <StyledAccordion
        {...other}
        iconPosition={AccordionIconPosition.right}
        isInverse={context.isInverse}
        ref={ref}
        role="group"
        testId={testId}
      >
        {children}
      </StyledAccordion>
    </DropdownExpandableMenuGroupContext.Provider>
  );
});

DropdownExpandableMenuGroup.displayName = 'DropdownExpandableMenuGroup';
