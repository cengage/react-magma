import * as React from 'react';

import {
  ButtonVariant,
  Dropdown,
  DropdownButton,
  DropdownContent,
} from 'react-magma-dom';

import { useChartToolbarI18n } from './chartToolbarI18n';

export interface ChartMoreOptionsButtonProps {
  /**
   * Accessible label for the trigger button.
   * @default "More options" (i18n overridable)
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
  ariaLabel,
  children,
  icon,
  isInverse,
}: ChartMoreOptionsButtonProps) {
  const t = useChartToolbarI18n();
  const resolvedAriaLabel = ariaLabel ?? t.moreOptionsAriaLabel;
  return (
    <Dropdown isInverse={isInverse}>
      <DropdownButton
        aria-label={resolvedAriaLabel}
        icon={icon}
        variant={ButtonVariant.link}
      />
      <DropdownContent>{children}</DropdownContent>
    </Dropdown>
  );
}
