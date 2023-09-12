import * as React from 'react';
import styled from '../../theme/styled';
import { IconProps } from 'react-magma-icons';
import { AccordionItem, AccordionItemProps } from '../Accordion';

export interface DropdownExpandableMenuItemProps extends AccordionItemProps {
  /**
   * Leading icon for the menu item
   */
  icon?: React.ReactElement<IconProps>;
  /**
   * @internal
   */
  index?: number;
  /**
   * @internal
   */
  isInverse?: boolean;
  /**
   * If true, item will be disabled; it will appear dimmed and onClick event (or any other events) will not fire
   * @default false
   */
  disabled?: boolean;
  testId?: string;
  /**
   * Action that fires when the menu item is clicked. If the menuitem also has a value prop, the value will be passed to the onClick handler
   */
  /**
   * Value of the component, gets passed to the onClick event
   */
  value?: string | number;
}

export interface DropdownExpandableMenuItemContext {
  hasIcon?: boolean;
  isExpandablePanel?: boolean;
}

export const DropdownExpandableMenuItemContext =
  React.createContext<DropdownExpandableMenuItemContext>({});

const StyledAccordionItem = styled(AccordionItem)``;

export const DropdownExpandableMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownExpandableMenuItemProps
>(props => {
  const { children, isInverse, testId, ...other } = props;

  const dropdownExpandableItems = React.Children.toArray(children);

  const hasIcon = dropdownExpandableItems.some(child => {
    if (React.isValidElement(child)) {
      return Object.keys(child.props).includes('icon');
    }
  });

  const isExpandablePanel = dropdownExpandableItems.some(child => {
    if (React.isValidElement(child)) {
      return true;
    }
  });

  return (
    <StyledAccordionItem {...other} testId={testId}>
      <DropdownExpandableMenuItemContext.Provider
        value={{
          hasIcon,
          isExpandablePanel,
        }}
      >
        {children}
      </DropdownExpandableMenuItemContext.Provider>
    </StyledAccordionItem>
  );
});
