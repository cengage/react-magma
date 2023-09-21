import * as React from 'react';
import styled from '../../theme/styled';
import { Accordion, AccordionProps } from '../Accordion';
import { DropdownContext } from './Dropdown';

const StyledAccordion = styled(Accordion)<{}>`
  border: none;
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
>(props => {
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
        isInverse={context.isInverse}
        role="group"
        testId={testId}
      >
        {children}
      </StyledAccordion>
    </DropdownExpandableMenuGroupContext.Provider>
  );
});

DropdownExpandableMenuGroup.displayName = 'DropdownExpandableMenuGroup';
