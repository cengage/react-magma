import * as React from 'react';
import { AccordionItem, AccordionItemProps } from '../Accordion';
export interface DropdownExpandableMenuItemProps extends AccordionItemProps {
  /**
   * If true, item will be disabled; it will appear dimmed and onClick event (or any other events) will not fire
   * @default false
   */
  disabled?: boolean;
  /**
   * @internal
   */
  testId?: string;
}

export interface DropdownExpandableMenuItemContextInterface {
  disabled?: boolean;
}

export const DropdownExpandableMenuItemContext =
  React.createContext<DropdownExpandableMenuItemContextInterface>({});

export const DropdownExpandableMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownExpandableMenuItemProps
>((props, ref) => {
  const { children, disabled, testId, ...other } = props;

  return (
    <DropdownExpandableMenuItemContext.Provider value={{ disabled }}>
      <AccordionItem {...other} isDisabled={disabled} ref={ref} testId={testId}>
        {children}
      </AccordionItem>
    </DropdownExpandableMenuItemContext.Provider>
  );
});

DropdownExpandableMenuItem.displayName = 'DropdownExpandableMenuItem';
