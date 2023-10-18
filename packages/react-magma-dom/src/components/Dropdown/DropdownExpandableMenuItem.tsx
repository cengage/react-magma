import * as React from 'react';
import { AccordionItem, AccordionItemProps } from '../Accordion';
import {
  DropdownExpandableMenuButton,
  DropdownExpandableMenuButtonProps,
} from './DropdownExpandableMenuButton';
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

export const DropdownExpandableMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownExpandableMenuItemProps
>((props, ref) => {
  const { children, disabled, testId, ...other } = props;

  const dropdownExpandableMenuItemChildren = React.Children.map(
    children,
    child => {
      const item = child as React.ReactElement<
        React.PropsWithChildren<DropdownExpandableMenuButtonProps>
      >;

      if (item.type === DropdownExpandableMenuButton) {
        if (disabled) {
          return React.cloneElement(item, { disabled: true });
        }
      }
      return child;
    }
  );

  return (
    <AccordionItem {...other} isDisabled={disabled} ref={ref} testId={testId}>
      {dropdownExpandableMenuItemChildren}
    </AccordionItem>
  );
});

DropdownExpandableMenuItem.displayName = 'DropdownExpandableMenuItem';
