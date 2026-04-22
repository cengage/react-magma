import * as React from 'react';

import { ButtonVariant, IconButton, Tooltip } from 'react-magma-dom';

import { useChartToolbarI18n } from './chartToolbarI18n';

export interface ChartTableButtonProps {
  /** Accessible label for the button – should describe the chart, e.g. "Overall Performance" */
  ariaLabel: string;
  /** Icon element rendered inside the button */
  icon: React.ReactElement;
  /**
   * If true, the button uses inverse (dark) styling.
   * @default false
   */
  isInverse?: boolean;
  /** Whether the associated modal is currently open */
  isTableOpen: boolean;
  /** Click handler – should open the modal */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Optional ref forwarded to the underlying IconButton */
  buttonRef?: React.Ref<HTMLButtonElement>;
  /**
   * Tooltip text shown on hover.
   * @default "Show as table" (i18n overridable)
   */
  tooltipContent?: string;
}

export function ChartTableButton({
  ariaLabel,
  buttonRef,
  icon,
  isInverse,
  isTableOpen,
  onClick,
  tooltipContent,
}: ChartTableButtonProps) {
  const t = useChartToolbarI18n();
  const resolvedTooltip = tooltipContent ?? t.showAsTableTooltip;

  return (
    <Tooltip content={resolvedTooltip} isInverse={isInverse}>
      <IconButton
        aria-expanded={isTableOpen}
        aria-haspopup="dialog"
        aria-label={ariaLabel}
        icon={icon}
        isInverse={isInverse}
        onClick={onClick}
        ref={buttonRef}
        variant={ButtonVariant.link}
      />
    </Tooltip>
  );
}
