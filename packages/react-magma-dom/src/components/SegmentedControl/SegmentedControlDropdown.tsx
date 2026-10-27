import * as React from 'react';

import { SegmentedControlContext } from './SegmentedControlContext';
import { SegmentedControlItemProps } from './SegmentedControlItem';
import { ThemeContext } from '../../theme/ThemeContext';
import { useGenerateId } from '../../utils';
import { ButtonColor, ButtonSize } from '../Button';
import {
  Dropdown,
  DropdownApi,
  DropdownButton,
  DropdownContent,
} from '../Dropdown';
import { VisuallyHidden } from '../VisuallyHidden';

export interface SegmentedControlOption {
  disabled: boolean;
  element: React.ReactElement<SegmentedControlItemProps>;
  icon?: React.ReactElement;
  label: React.ReactNode;
  value: string;
}

interface SegmentedControlDropdownProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  disabled?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  options: SegmentedControlOption[];
  selectedValue?: string;
  size?: ButtonSize;
}

/** Narrow-screen presentation; selection remains owned by SegmentedControl. */
export function SegmentedControlDropdown({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  disabled,
  isFullWidth,
  isInverse,
  options,
  selectedValue,
  size,
}: SegmentedControlDropdownProps) {
  const context = React.useContext(SegmentedControlContext);
  const theme = React.useContext(ThemeContext);
  const buttonId = useGenerateId();
  const labelId = useGenerateId();
  const apiRef = React.useRef<DropdownApi>();
  const selected = options.find(option => option.value === selectedValue);
  const labelReference = ariaLabelledBy || (ariaLabel ? labelId : undefined);
  const labelledBy = selected
    ? [labelReference, buttonId].filter(Boolean).join(' ')
    : labelReference;

  function handleSelect(event: React.SyntheticEvent, value: string) {
    context.onSelect?.(event, value);
    apiRef.current?.closeDropdownManually(event);
  }

  function handleMenuFocus(event: React.FocusEvent<HTMLDivElement>) {
    // Dropdown focuses its content when it has no registered DropdownMenuItems.
    // Read the current DOM instead of keeping a second option index.
    if (event.target === event.currentTarget) {
      const target =
        event.currentTarget.querySelector<HTMLElement>(
          '[role="menuitemradio"]:not(:disabled)'
        ) || event.currentTarget.querySelector<HTMLElement>('[role="menu"]');

      target?.focus();
    }
  }

  function handleMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Tab' && !event.defaultPrevented) {
      // Close before native Tab navigation, using the trigger as its starting
      // point. Outside clicks/blur and Escape remain owned by Dropdown.
      apiRef.current?.closeDropdownManually(event);
    }
  }

  return (
    <Dropdown
      apiRef={apiRef}
      isInverse={isInverse}
      style={isFullWidth ? { width: '100%' } : undefined}
    >
      {ariaLabel && <VisuallyHidden id={labelId}>{ariaLabel}</VisuallyHidden>}
      <DropdownButton
        aria-labelledby={labelledBy}
        color={ButtonColor.secondary}
        data-segmented-trigger
        disabled={disabled}
        id={buttonId}
        isFullWidth={isFullWidth}
        leadingIcon={selected?.icon}
        size={size}
      >
        <>{selected?.label ?? ariaLabel}</>
      </DropdownButton>
      <SegmentedControlContext.Provider
        value={{ ...context, isDropdown: true, onSelect: handleSelect }}
      >
        <DropdownContent
          id={buttonId}
          onFocus={handleMenuFocus}
          // Size the menu to its labels; the floating wrapper would otherwise
          // squeeze it to the trigger's width. Long labels still wrap at the cap.
          style={{
            maxWidth: `calc(100vw - ${theme.spaceScale.spacing05})`,
            width: 'max-content',
          }}
        >
          <div
            aria-labelledby={labelledBy || buttonId}
            onKeyDown={handleMenuKeyDown}
            role="menu"
            tabIndex={-1}
          >
            {options.map(option =>
              React.cloneElement(option.element, { key: option.value })
            )}
          </div>
        </DropdownContent>
      </SegmentedControlContext.Provider>
    </Dropdown>
  );
}
