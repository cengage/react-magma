import * as React from 'react';

import {
  ButtonVariant,
  Dropdown,
  DropdownButton,
  DropdownContent,
} from 'react-magma-dom';

export interface ChartMoreOptionsButtonProps {
  /**
   * Accessible label for the trigger button.
   * @default "More options"
   */
  ariaLabel?: string;
  /** Menu items rendered inside the dropdown (DropdownMenuItem, DropdownDivider, etc.) */
  children: React.ReactNode;
  /** Icon element rendered inside the trigger button */
  icon: React.ReactElement;
  /**
   * If true, the dropdown uses inverse (dark) styling.
   * @default false
   */
  isInverse?: boolean;
}

export function ChartMoreOptionsButton({
  ariaLabel = 'More options',
  children,
  icon,
  isInverse,
}: ChartMoreOptionsButtonProps) {
  return (
    <Dropdown isInverse={isInverse}>
      <DropdownButton
        aria-label={ariaLabel}
        icon={icon}
        variant={ButtonVariant.link}
      />
      <DropdownContent>{children}</DropdownContent>
    </Dropdown>
  );
}
