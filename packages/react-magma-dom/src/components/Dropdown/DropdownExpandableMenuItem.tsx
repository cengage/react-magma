import * as React from 'react';
import { IconProps } from 'react-magma-icons';
import { AccordionItem, AccordionItemProps } from '../Accordion';
export interface DropdownExpandableMenuItemProps extends AccordionItemProps {
  /**
   * If true, item will be disabled; it will appear dimmed and onClick event (or any other events) will not fire
   * @default false
   */
  disabled?: boolean;
  /**
   * Leading icon for the menu item
   */
  icon?: React.ReactElement<IconProps>;
  /**
   * @internal
   */
  index?: number;
  testId?: string;
}

export const DropdownExpandableMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownExpandableMenuItemProps
>(props => {
  const { children, disabled, testId, ...other } = props;

  return (
    <AccordionItem isDisabled={disabled} {...other} testId={testId}>
      {children}
    </AccordionItem>
  );
});

DropdownExpandableMenuItem.displayName = 'DropdownExpandableMenuItem';
