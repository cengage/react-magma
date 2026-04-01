import * as React from 'react';

import { ButtonVariant, IconButton, Tooltip } from 'react-magma-dom';

import { useChartToolbarI18n } from './chartToolbarI18n';

export interface ChartFullscreenButtonProps {
  /** Accessible label for the button, e.g. "View Overall Performance in full screen" */
  ariaLabel: string;
  /** Icon rendered when not in fullscreen mode */
  icon: React.ReactElement;
  /** Icon rendered when in fullscreen mode. Falls back to `icon` if omitted. */
  exitIcon?: React.ReactElement;
  /**
   * If true, the button uses inverse (dark) styling.
   * @default false
   */
  isInverse?: boolean;
  /** Whether the chart is currently in fullscreen mode */
  isFullscreen: boolean;
  /** Click handler – should toggle fullscreen */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Optional ref forwarded to the underlying IconButton */
  buttonRef?: React.Ref<HTMLButtonElement>;
  /**
   * Tooltip text shown on hover.
   * @default "Make full screen" / "Exit full screen" based on state (i18n overridable)
   */
  tooltipContent?: string;
}

export function ChartFullscreenButton({
  ariaLabel,
  buttonRef,
  exitIcon,
  icon,
  isInverse,
  isFullscreen,
  onClick,
  tooltipContent,
}: ChartFullscreenButtonProps) {
  const t = useChartToolbarI18n();
  const resolvedTooltip =
    tooltipContent ?? (isFullscreen ? t.exitFullScreen : t.makeFullScreen);
  const resolvedIcon = isFullscreen && exitIcon ? exitIcon : icon;

  return (
    <Tooltip content={resolvedTooltip} isInverse={isInverse}>
      <IconButton
        aria-label={ariaLabel}
        icon={resolvedIcon}
        isInverse={isInverse}
        onClick={onClick}
        ref={buttonRef}
        variant={ButtonVariant.link}
      />
    </Tooltip>
  );
}
