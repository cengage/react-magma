import * as React from 'react';

import styled from '@emotion/styled';

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

// Long selected labels truncate inside a narrow trigger; the icons never shrink,
// so the dropdown arrow always stays visible.
const StyledDropdown = styled(Dropdown)`
  max-width: 100%;

  [data-segmented-trigger] {
    max-width: 100%;
  }

  /* Button structure: button > content wrapper > [leading icon, label, arrow] */
  [data-segmented-trigger] > span {
    max-width: 100%;
    min-width: 0;
  }

  [data-segmented-trigger] > span > span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  [data-segmented-trigger] svg {
    flex-shrink: 0;
  }
`;

interface SegmentedControlDropdownProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  disabled?: boolean;
  isFullWidth?: boolean;
  isInverse?: boolean;
  /**
   * Set to a function that closes the menu, so the group's keyboard handler can
   * close it on Tab after the consumer's onKeyDown has had a chance to cancel.
   */
  closeMenuRef?: React.MutableRefObject<(event: React.SyntheticEvent) => void>;
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
  closeMenuRef,
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

  if (closeMenuRef) {
    closeMenuRef.current = event =>
      apiRef.current?.closeDropdownManually(event);
  }

  return (
    <StyledDropdown
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
            role="menu"
            tabIndex={-1}
          >
            {options.map(option =>
              React.cloneElement(option.element, { key: option.value })
            )}
          </div>
        </DropdownContent>
      </SegmentedControlContext.Provider>
    </StyledDropdown>
  );
}
