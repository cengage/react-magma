import * as React from 'react';

import styled from '@emotion/styled';
import { autoUpdate } from '@floating-ui/react-dom';
import { CloseIcon } from 'react-magma-icons';

import { useMagmaFloating } from '../../hooks/useMagmaFloating';
import { I18nContext } from '../../i18n';
import { defaultI18n } from '../../i18n/default';
import { useIsInverse } from '../../inverse';
import { ThemeInterface } from '../../theme/magma';
import { ThemeContext } from '../../theme/ThemeContext';
import { descriptionSuffix, labelSuffix, useGenerateId } from '../../utils';
import { Announce } from '../Announce';
import { Badge, BadgeColor } from '../Badge';
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '../Button';
import { CardBorderRadius, CardCornerTreatment } from '../Card';
import { Checkbox } from '../Checkbox';
import {
  FormFieldContainer,
  getInputFormFieldColors,
} from '../FormFieldContainer';
import {
  IndeterminateCheckbox,
  IndeterminateCheckboxStatus,
} from '../IndeterminateCheckbox';
import { inputBaseStyles, InputSize, inputWrapperStyles } from '../InputBase';
import { LabelPosition } from '../Label';
import { SelectOptions } from '../Select';
import { DefaultDropdownIndicator } from '../Select/components';
import { StyledCard, StyledItem, StyledList } from '../Select/shared';
import { isItemDisabled } from '../Select/utils';
import { VisuallyHidden } from '../VisuallyHidden';

export enum MultiSelectSelectionBehavior {
  immediate = 'immediate',
  deferred = 'deferred',
}

export interface MultiSelectProps<T extends SelectOptions> {
  /**
   * Content displayed beside the label. Intended for supporting actions such as help links.
   */
  additionalContent?: React.ReactNode;
  /**
   * Id of an element outside the component that also describes the field.
   */
  ariaDescribedBy?: string;
  /**
   * Accessible name for the trigger. When omitted, labelText names the trigger.
   */
  ariaLabel?: string;
  /**
   * Style properties for the outer container.
   */
  containerStyle?: React.CSSProperties;
  /**
   * Items selected on first render when the component is uncontrolled.
   */
  defaultSelectedItems?: T[];
  /**
   * If true, the component cannot be opened or changed.
   * @default false
   */
  disabled?: boolean;
  /**
   * Content of the error message. If provided, the field is styled as invalid.
   */
  errorMessage?: React.ReactNode;
  /**
   * If true, a Select all option is shown.
   * @default false
   */
  hasSelectAll?: boolean;
  /**
   * Content of the helper message.
   */
  helperMessage?: React.ReactNode;
  /**
   * Placeholder text shown while the filterable menu is open.
   * Defaults to the localized MultiSelect filter placeholder.
   */
  filterPlaceholder?: string;
  /**
   * Id for the field. A generated id is used when omitted.
   */
  id?: string;
  /**
   * Style properties for the trigger or filter input.
   */
  inputStyle?: React.CSSProperties;
  /**
   * Relative size of the field.
   * @default InputSize.medium
   */
  inputSize?: InputSize;
  /**
   * Reference to the rendered button or filter input.
   */
  innerRef?: React.Ref<HTMLButtonElement | HTMLInputElement>;
  /**
   * If true, the menu includes a text filter.
   * @default false
   */
  isFilterable?: boolean;
  /**
   * If true, the component uses inverse styling for dark backgrounds.
   * @default false
   */
  isInverse?: boolean;
  /**
   * If true, label text is visually hidden but remains available to assistive technology.
   * @default false
   */
  isLabelVisuallyHidden?: boolean;
  /**
   * Converts an item to its visible label.
   */
  itemToString?: (item: T) => string;
  /**
   * Returns the group label for an item. Items with the same label are rendered
   * together beneath a group heading.
   */
  itemToGroup?: (item: T) => string | undefined;
  /**
   * Converts an item to a stable value used to compare selections.
   */
  itemToValue?: (item: T) => string;
  /**
   * Maximum height for the options menu.
   */
  itemListMaxHeight?: number | string;
  /**
   * Selectable items.
   */
  items: T[];
  /**
   * Position of the label relative to the field.
   * @default LabelPosition.top
   */
  labelPosition?: LabelPosition;
  /**
   * Style properties for the label.
   */
  labelStyle?: React.CSSProperties;
  /**
   * Field label.
   */
  labelText: React.ReactNode;
  /**
   * Width of a left-positioned label as a percentage.
   */
  labelWidth?: number;
  /**
   * Style properties for the options menu.
   */
  menuStyle?: React.CSSProperties;
  /**
   * Style properties for the helper or error message.
   */
  messageStyle?: React.CSSProperties;
  /**
   * Called whenever the selected items change.
   */
  onSelectedItemsChange?: (selectedItems: T[]) => void;
  /**
   * Called when the trigger loses focus.
   */
  onBlur?: (event: React.FocusEvent) => void;
  /**
   * Called when the trigger receives focus.
   */
  onFocus?: (event: React.FocusEvent) => void;
  /**
   * Called when a key is pressed on the trigger, before internal keyboard handling.
   */
  onKeyDown?: (event: React.KeyboardEvent) => void;
  /**
   * Called when a printable key is pressed on the trigger.
   */
  onKeyPress?: (event: React.KeyboardEvent) => void;
  /**
   * Called when a key is released on the trigger.
   */
  onKeyUp?: (event: React.KeyboardEvent) => void;
  /**
   * Text shown when there are no selected items.
   */
  placeholder?: string;
  /**
   * Customizes the content displayed in the trigger for selected items.
   */
  renderSelectedItems?: (
    selectedItems: T[],
    options: { allSelected: boolean }
  ) => string;
  /**
   * Determines whether changes are committed as options are selected or only
   * after the user applies them.
   * @default MultiSelectSelectionBehavior.immediate
   */
  selectionBehavior?: MultiSelectSelectionBehavior;
  /**
   * Selected items when the component is controlled.
   */
  selectedItems?: T[];
  /**
   * @internal
   */
  testId?: string;
}

interface StyledFieldProps {
  disabled?: boolean;
  hasError?: boolean;
  inputSize?: InputSize;
  isInverse?: boolean;
  textColor?: string;
  theme: ThemeInterface;
}

const Root = styled.div`
  position: relative;

  &[data-trigger-focused='false'] [data-highlighted='true'] {
    border-color: transparent;
  }
`;

const Field = styled.div<StyledFieldProps>`
  ${inputWrapperStyles}

  &[data-badge-focused='true'] {
    outline: none;
  }
`;

const TriggerButton = styled.button<StyledFieldProps>`
  ${inputBaseStyles}
  align-items: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  flex: 1;
  min-width: 0;
  padding-right: ${props => props.theme.spaceScale.spacing09};
  text-align: left;
`;

const FilterInput = styled.input<StyledFieldProps>`
  ${inputBaseStyles}
  flex: 1;
  min-width: 0;
  padding-right: ${props => props.theme.spaceScale.spacing09};
`;

const SelectionBadge = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  margin-left: ${props => props.theme.spaceScale.spacing03};
`;

const DropdownIndicator = styled.span`
  align-items: center;
  display: inline-flex;
  pointer-events: none;
  position: absolute;
  right: ${props => props.theme.spaceScale.spacing03};
`;

const MenuPositioner = styled.div`
  z-index: 2;
`;

const EmptyItem = styled(StyledItem)`
  justify-content: center;
`;

const OptionItem = styled(StyledItem)<{ isIndented?: boolean }>`
  padding-left: ${props =>
    props.isIndented
      ? props.theme.spaceScale.spacing08
      : props.theme.spaceScale.spacing05};
`;

const OptionGroupContainer = styled.li`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const OptionGroup = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const OptionGroupDivider = styled.hr<{ isInverse?: boolean }>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.neutral800
      : props.theme.colors.neutral200};
  border: 0;
  height: 1px;
  margin: ${props => props.theme.spaceScale.spacing02} 0;
`;

const OptionGroupHeader = styled.div<{ isInverse?: boolean }>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral500
      : props.theme.colors.neutral700};
  font-family: ${props => props.theme.bodyFont};
  font-size: ${props => props.theme.typeScale.size01.fontSize};
  font-weight: ${props =>
    props.theme.typographyVisualStyles.heading2XSmall.fontWeight};
  letter-spacing: ${props => props.theme.typeScale.size01.letterSpacing};
  line-height: ${props => props.theme.typeScale.size01.lineHeight};
  margin: 0;
  padding: ${props =>
    `${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing05} ${props.theme.spaceScale.spacing02}`};
  text-transform: uppercase;
`;

const SelectAllDivider = styled.li<{ isInverse?: boolean }>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.neutral800
      : props.theme.colors.neutral200};
  height: 1px;
  margin: 0;
`;

const ActionFooter = styled.div<{ isInverse?: boolean }>`
  align-items: center;
  border-top: 1px solid
    ${props =>
      props.isInverse
        ? props.theme.colors.neutral800
        : props.theme.colors.neutral200};
  display: flex;
  gap: ${props => props.theme.spaceScale.spacing03};
  justify-content: flex-end;
  padding: ${props => props.theme.spaceScale.spacing04};
`;

function defaultItemToString(item: SelectOptions) {
  if (typeof item === 'string') {
    return item;
  }

  return item?.label || '';
}

function defaultItemToValue(item: SelectOptions) {
  if (typeof item === 'string') {
    return item;
  }

  return item?.value ?? defaultItemToString(item);
}

function toCssValue(value: number | string) {
  return typeof value === 'number' ? `${value}px` : value;
}

export function MultiSelect<T extends SelectOptions>(
  props: MultiSelectProps<T>
) {
  const {
    additionalContent,
    ariaDescribedBy,
    ariaLabel,
    containerStyle,
    defaultSelectedItems = [],
    disabled = false,
    errorMessage,
    hasSelectAll = false,
    helperMessage,
    filterPlaceholder,
    id: defaultId,
    innerRef,
    inputStyle,
    inputSize = InputSize.medium,
    isFilterable = false,
    isInverse: isInverseProp,
    isLabelVisuallyHidden,
    itemToGroup,
    itemListMaxHeight,
    items,
    labelPosition = LabelPosition.top,
    labelStyle,
    labelText,
    labelWidth,
    menuStyle,
    messageStyle,
    onBlur,
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onSelectedItemsChange,
    placeholder,
    renderSelectedItems,
    selectionBehavior = MultiSelectSelectionBehavior.immediate,
    selectedItems: controlledSelectedItems,
    testId,
  } = props;
  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);
  const isInverse = useIsInverse(isInverseProp);
  const fieldColors = getInputFormFieldColors(theme, isInverse);
  const id = useGenerateId(defaultId);
  const menuId = `${id}__menu`;
  const labelId = `${id}${labelSuffix}`;
  const selectionSummaryId = `${id}__selection-summary`;
  const descriptionId =
    errorMessage || helperMessage ? `${id}${descriptionSuffix}` : undefined;
  const itemToString = props.itemToString || defaultItemToString;
  const itemToValue = props.itemToValue || defaultItemToValue;
  const [internalSelectedItems, setInternalSelectedItems] =
    React.useState<T[]>(defaultSelectedItems);
  const [draftSelectedItems, setDraftSelectedItems] = React.useState<T[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [filterValue, setFilterValue] = React.useState('');
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);
  const [announcement, setAnnouncement] = React.useState('');
  const rootRef = React.useRef<HTMLDivElement>(null);
  const cancelButtonRef = React.useRef<HTMLButtonElement>(null);
  const hadNoOptionsRef = React.useRef(false);
  const selectedItems = controlledSelectedItems ?? internalSelectedItems;
  const isDeferred =
    selectionBehavior === MultiSelectSelectionBehavior.deferred;
  const menuSelectedItems = isDeferred ? draftSelectedItems : selectedItems;

  const committedSelectedValues = React.useMemo(
    () => new Set(selectedItems.map(itemToValue)),
    [itemToValue, selectedItems]
  );
  const menuSelectedValues = React.useMemo(
    () => new Set(menuSelectedItems.map(itemToValue)),
    [itemToValue, menuSelectedItems]
  );
  const enabledItems = items.filter(item => !isItemDisabled(item));
  const allItemsSelected =
    enabledItems.length > 0 &&
    enabledItems.every(item => committedSelectedValues.has(itemToValue(item)));
  const filteredItems = isFilterable
    ? items.filter(item =>
        itemToString(item)
          .toLowerCase()
          .includes(filterValue.trim().toLowerCase())
      )
    : items;
  const enabledFilteredItems = filteredItems.filter(
    item => !isItemDisabled(item)
  );
  const allSelected =
    enabledFilteredItems.length > 0 &&
    enabledFilteredItems.every(item =>
      menuSelectedValues.has(itemToValue(item))
    );
  const someSelected = enabledFilteredItems.some(item =>
    menuSelectedValues.has(itemToValue(item))
  );
  const hasPendingChanges =
    selectedItems.length !== draftSelectedItems.length ||
    selectedItems.some(item => !menuSelectedValues.has(itemToValue(item)));
  const optionCount = filteredItems.length + (hasSelectAll ? 1 : 0);
  const groupedFilteredItems = filteredItems.reduce<
    Array<{ label?: string; items: Array<{ item: T; itemIndex: number }> }>
  >((groups, item, itemIndex) => {
    const label = itemToGroup?.(item);
    const group = groups[groups.length - 1];

    if (group && group.label === label) {
      group.items.push({ item, itemIndex });
    } else {
      groups.push({ label, items: [{ item, itemIndex }] });
    }

    return groups;
  }, []);
  const multiSelectI18n = {
    applyButtonLabel:
      i18n.multiSelect.applyButtonLabel ||
      defaultI18n.multiSelect.applyButtonLabel!,
    allItemsDeselectedAnnounce:
      i18n.multiSelect.allItemsDeselectedAnnounce ||
      defaultI18n.multiSelect.allItemsDeselectedAnnounce!,
    allItemsSelectedAnnounce:
      i18n.multiSelect.allItemsSelectedAnnounce ||
      defaultI18n.multiSelect.allItemsSelectedAnnounce!,
    allSelected:
      i18n.multiSelect.allSelected || defaultI18n.multiSelect.allSelected!,
    clearAllButtonAriaLabel:
      i18n.multiSelect.clearAllButtonAriaLabel ||
      defaultI18n.multiSelect.clearAllButtonAriaLabel!,
    cancelButtonLabel:
      i18n.multiSelect.cancelButtonLabel ||
      defaultI18n.multiSelect.cancelButtonLabel!,
    filterPlaceholder:
      i18n.multiSelect.filterPlaceholder ||
      defaultI18n.multiSelect.filterPlaceholder!,
    itemDeselectedAnnounce:
      i18n.multiSelect.itemDeselectedAnnounce ||
      defaultI18n.multiSelect.itemDeselectedAnnounce!,
    itemSelectedAnnounce:
      i18n.multiSelect.itemSelectedAnnounce ||
      defaultI18n.multiSelect.itemSelectedAnnounce!,
    noOptions: i18n.multiSelect.noOptions || defaultI18n.multiSelect.noOptions!,
    placeholder: i18n.multiSelect.placeholder,
    selectAllLabel:
      i18n.multiSelect.selectAllLabel ||
      defaultI18n.multiSelect.selectAllLabel!,
    selectedCount:
      i18n.multiSelect.selectedCount || defaultI18n.multiSelect.selectedCount!,
  };

  function getOptionId(index: number) {
    return `${id}__option-${index}`;
  }

  function commitSelectedItems(nextSelectedItems: T[]) {
    if (controlledSelectedItems === undefined) {
      setInternalSelectedItems(nextSelectedItems);
    }

    onSelectedItemsChange?.(nextSelectedItems);
  }

  function updateSelectedItems(nextSelectedItems: T[], message: string) {
    if (isDeferred && isOpen) {
      setDraftSelectedItems(nextSelectedItems);
      setAnnouncement(message);

      return;
    }

    commitSelectedItems(nextSelectedItems);
    setAnnouncement(message);
  }

  function toggleItem(item: T) {
    if (isItemDisabled(item)) {
      return;
    }

    const value = itemToValue(item);
    const isSelected = menuSelectedValues.has(value);
    const nextSelectedItems = isSelected
      ? menuSelectedItems.filter(selected => itemToValue(selected) !== value)
      : [...menuSelectedItems, item];
    const messageTemplate = isSelected
      ? multiSelectI18n.itemDeselectedAnnounce
      : multiSelectI18n.itemSelectedAnnounce;

    updateSelectedItems(
      nextSelectedItems,
      messageTemplate
        .replace(/\{item\}/g, itemToString(item))
        .replace(/\{count\}/g, String(nextSelectedItems.length))
    );
  }

  function toggleAll() {
    if (!enabledFilteredItems.length) {
      return;
    }

    const enabledValues = new Set(enabledFilteredItems.map(itemToValue));
    const nextSelectedItems = allSelected
      ? menuSelectedItems.filter(item => !enabledValues.has(itemToValue(item)))
      : [
          ...menuSelectedItems.filter(
            item => !enabledValues.has(itemToValue(item))
          ),
          ...enabledFilteredItems,
        ];

    updateSelectedItems(
      nextSelectedItems,
      (allSelected
        ? multiSelectI18n.allItemsDeselectedAnnounce
        : multiSelectI18n.allItemsSelectedAnnounce
      ).replace(/\{count\}/g, String(nextSelectedItems.length))
    );
  }

  function handleSelectAllClick() {
    setHighlightedIndex(0);
    toggleAll();
  }

  function handleItemClick(item: T, optionIndex: number) {
    if (isItemDisabled(item)) {
      return;
    }

    setHighlightedIndex(optionIndex);
    toggleItem(item);
  }

  function preserveTriggerFocus(event: React.MouseEvent) {
    event.preventDefault();
  }

  function setBadgeFocus(isFocused: boolean) {
    rootRef.current
      ?.querySelector<HTMLElement>('[data-multiselect-field]')
      ?.setAttribute('data-badge-focused', String(isFocused));
  }

  function clearAllSelections() {
    if (disabled || selectedItems.length === 0) {
      return;
    }

    updateSelectedItems(
      [],
      multiSelectI18n.allItemsDeselectedAnnounce.replace(/\{count\}/g, '0')
    );
    setFilterValue('');

    requestAnimationFrame(() => {
      rootRef.current?.querySelector<HTMLElement>('[role="combobox"]')?.focus();
    });
  }

  function isOptionEnabled(index: number) {
    if (hasSelectAll && index === 0) {
      return enabledFilteredItems.length > 0;
    }

    const itemIndex = index - (hasSelectAll ? 1 : 0);
    const item = filteredItems[itemIndex];

    return !!item && !isItemDisabled(item);
  }

  function toggleHighlightedOption() {
    if (!isOptionEnabled(highlightedIndex)) {
      return;
    }

    if (hasSelectAll && highlightedIndex === 0) {
      toggleAll();

      return;
    }

    const itemIndex = highlightedIndex - (hasSelectAll ? 1 : 0);
    const item = filteredItems[itemIndex];

    if (item) {
      toggleItem(item);
    }
  }

  function moveHighlight(step: number) {
    if (!optionCount) {
      return;
    }

    let nextIndex = highlightedIndex;
    let attempts = 0;

    do {
      nextIndex = (nextIndex + step + optionCount) % optionCount;
      if (isOptionEnabled(nextIndex)) {
        setHighlightedIndex(nextIndex);

        return;
      }

      attempts++;
    } while (attempts < optionCount);
  }

  function findEnabledOptionIndex(direction: 1 | -1) {
    let index = direction === 1 ? 0 : optionCount - 1;

    while (index >= 0 && index < optionCount) {
      if (isOptionEnabled(index)) {
        return index;
      }

      index += direction;
    }

    return -1;
  }

  function openMenu() {
    if (!disabled) {
      if (!isOpen && isDeferred) {
        setDraftSelectedItems(selectedItems);
      }

      setIsOpen(true);
      setHighlightedIndex(Math.max(0, findEnabledOptionIndex(1)));
    }
  }

  function closeMenu() {
    setIsOpen(false);
    setFilterValue('');
  }

  function returnFocusToTrigger() {
    requestAnimationFrame(() => {
      rootRef.current?.querySelector<HTMLElement>('[role="combobox"]')?.focus();
    });
  }

  function cancelDeferredSelection({ returnFocus = false } = {}) {
    closeMenu();

    if (returnFocus) {
      returnFocusToTrigger();
    }
  }

  function applyDeferredSelection() {
    if (!hasPendingChanges) {
      return;
    }

    commitSelectedItems(draftSelectedItems);
    closeMenu();
    returnFocusToTrigger();
  }

  function handleTriggerKeyDown(event: React.KeyboardEvent) {
    onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          openMenu();
        } else {
          moveHighlight(1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          openMenu();
        } else {
          moveHighlight(-1);
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (isOpen) {
          toggleHighlightedOption();
        } else {
          openMenu();
        }
        break;
      case ' ':
        if (!isFilterable) {
          event.preventDefault();
          if (isOpen) {
            toggleHighlightedOption();
          } else {
            openMenu();
          }
        }
        break;
      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          cancelDeferredSelection();
        }
        break;
      case 'Home':
        if (isOpen && !isFilterable) {
          event.preventDefault();
          setHighlightedIndex(Math.max(0, findEnabledOptionIndex(1)));
        }
        break;
      case 'End':
        if (isOpen && !isFilterable && optionCount) {
          event.preventDefault();
          setHighlightedIndex(Math.max(0, findEnabledOptionIndex(-1)));
        }
        break;
      case 'Tab':
        if (isDeferred && isOpen && !event.shiftKey) {
          event.preventDefault();
          cancelButtonRef.current?.focus();
        } else {
          closeMenu();
        }
        break;
      default:
        break;
    }
  }

  React.useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFilterValue('');
      }
    }

    document.addEventListener('mousedown', handlePointerDown);

    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  React.useEffect(() => {
    if (highlightedIndex >= optionCount) {
      setHighlightedIndex(Math.max(0, optionCount - 1));
    }
  }, [highlightedIndex, optionCount]);

  React.useEffect(() => {
    const hasNoOptions = isFilterable && isOpen && filteredItems.length === 0;

    if (hasNoOptions && !hadNoOptionsRef.current) {
      setAnnouncement(multiSelectI18n.noOptions);
    } else if (!hasNoOptions && hadNoOptionsRef.current) {
      setAnnouncement('');
    }

    hadNoOptionsRef.current = hasNoOptions;
  }, [filteredItems.length, isFilterable, isOpen, multiSelectI18n.noOptions]);

  React.useEffect(() => {
    if (isOpen && highlightedIndex >= 0) {
      const animationFrame = requestAnimationFrame(() => {
        const highlightedElement = rootRef.current?.querySelector(
          '[data-highlighted="true"]'
        );

        highlightedElement?.scrollIntoView?.({
          behavior: 'smooth',
          block: 'nearest',
        });
      });

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [highlightedIndex, isOpen]);

  const defaultSummary = allItemsSelected
    ? multiSelectI18n.allSelected.replace(
        /\{count\}/g,
        String(selectedItems.length)
      )
    : multiSelectI18n.selectedCount.replace(
        /\{count\}/g,
        String(selectedItems.length)
      );
  const selectedSummary =
    selectedItems.length > 0
      ? renderSelectedItems?.(selectedItems, {
          allSelected: allItemsSelected,
        }) || defaultSummary
      : placeholder || multiSelectI18n.placeholder;
  const maxHeight = toCssValue(
    itemListMaxHeight || theme.combobox.menu.maxHeight
  );
  const activeDescendant =
    isOpen && optionCount && isOptionEnabled(highlightedIndex)
      ? getOptionId(highlightedIndex)
      : undefined;
  const describedBy = [
    ariaDescribedBy,
    descriptionId,
    selectedItems.length ? selectionSummaryId : undefined,
  ]
    .filter(Boolean)
    .join(' ');
  const commonTriggerProps = {
    'aria-label': ariaLabel,
    'aria-activedescendant': activeDescendant,
    'aria-controls': menuId,
    'aria-describedby': describedBy || undefined,
    'aria-expanded': isOpen,
    'aria-haspopup': 'listbox' as const,
    'aria-invalid': !!errorMessage || undefined,
    'aria-labelledby': ariaLabel ? undefined : labelId,
    disabled,
    id,
    onBlur: (event: React.FocusEvent) => {
      rootRef.current?.setAttribute('data-trigger-focused', 'false');
      onBlur?.(event);
    },
    onFocus: (event: React.FocusEvent) => {
      setBadgeFocus(false);
      rootRef.current?.setAttribute('data-trigger-focused', 'true');
      onFocus?.(event);
    },
    onKeyDown: handleTriggerKeyDown,
    onKeyPress,
    onKeyUp,
    role: 'combobox',
  };
  const { floatingStyles, refs, elements, update } = useMagmaFloating();

  React.useEffect(() => {
    if (isOpen && elements.reference && elements.floating) {
      return autoUpdate(elements.reference, elements.floating, update);
    }
  }, [elements, isOpen, update]);

  const setFloatingRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      refs.setFloating(isOpen ? node : null);
    },
    [isOpen, refs]
  );
  let selectAllStatus = IndeterminateCheckboxStatus.unchecked;

  if (someSelected) {
    selectAllStatus = IndeterminateCheckboxStatus.indeterminate;
  }

  if (allSelected) {
    selectAllStatus = IndeterminateCheckboxStatus.checked;
  }

  let dropdownIndicatorColor = isInverse
    ? theme.colors.neutral0
    : theme.colors.brand.navy;

  if (disabled) {
    dropdownIndicatorColor = isInverse
      ? theme.colors.neutral700
      : theme.colors.neutral500;
  }

  let triggerTextColor: string | undefined;

  if (selectedItems.length === 0) {
    if (disabled) {
      triggerTextColor = isInverse
        ? theme.colors.neutral700
        : theme.colors.neutral500;
    } else {
      triggerTextColor = isInverse
        ? theme.colors.neutral500
        : theme.colors.neutral700;
    }
  }

  let filterInputPlaceholder: string | undefined;

  if (isOpen) {
    filterInputPlaceholder =
      filterPlaceholder ?? multiSelectI18n.filterPlaceholder;
  } else if (selectedItems.length === 0) {
    filterInputPlaceholder = selectedSummary;
  }

  function renderOption(item: T, itemIndex: number) {
    const optionIndex = itemIndex + (hasSelectAll ? 1 : 0);
    const isSelected = menuSelectedValues.has(itemToValue(item));
    const itemDisabled = isItemDisabled(item);

    return (
      <OptionItem
        aria-disabled={itemDisabled || undefined}
        aria-selected={isSelected}
        data-highlighted={highlightedIndex === optionIndex}
        id={getOptionId(optionIndex)}
        isDisabled={itemDisabled}
        isFocused={highlightedIndex === optionIndex}
        isIndented={hasSelectAll}
        isInverse={isInverse}
        key={itemToValue(item)}
        onClick={() => handleItemClick(item, optionIndex)}
        onMouseDown={preserveTriggerFocus}
        role="option"
        theme={theme}
      >
        <Checkbox
          checked={isSelected}
          containerStyle={{
            pointerEvents: 'none',
            width: '100%',
          }}
          disabled={itemDisabled}
          hideFocus
          isInverse={isInverse}
          isVisualOnly
          labelStyle={{ padding: 0, width: '100%' }}
          labelText={itemToString(item)}
          tabIndex={-1}
        />
      </OptionItem>
    );
  }

  return (
    <FormFieldContainer
      additionalContent={additionalContent}
      containerStyle={containerStyle}
      errorMessage={errorMessage}
      errorIconColor={fieldColors.errorIconColor}
      errorMessageColor={fieldColors.errorMessageColor}
      fieldId={id}
      helperMessage={helperMessage}
      inputSize={inputSize}
      isInverse={isInverse}
      isLabelVisuallyHidden={isLabelVisuallyHidden}
      labelPosition={labelPosition}
      labelColor={fieldColors.labelColor}
      labelFontWeight={fieldColors.labelFontWeight}
      labelStyle={labelStyle}
      labelText={labelText}
      labelWidth={labelWidth}
      messageStyle={messageStyle}
      messageColor={fieldColors.messageColor}
      testId={testId}
    >
      <Root
        data-trigger-focused="false"
        onBlur={event => {
          if (
            isOpen &&
            !event.currentTarget.contains(event.relatedTarget as Node | null)
          ) {
            closeMenu();
          }
        }}
        ref={rootRef}
      >
        {selectedItems.length > 0 && (
          <VisuallyHidden id={selectionSummaryId}>
            {selectedSummary}
          </VisuallyHidden>
        )}
        <Field
          data-badge-focused="false"
          data-multiselect-field
          disabled={disabled}
          hasError={!!errorMessage}
          inputSize={inputSize}
          isInverse={isInverse}
          ref={refs.setReference}
          theme={theme}
        >
          {selectedItems.length > 0 && (
            <SelectionBadge key="selection-badge" theme={theme}>
              <Badge
                aria-label={
                  disabled
                    ? undefined
                    : `${selectedSummary}. ${multiSelectI18n.clearAllButtonAriaLabel}`
                }
                color={BadgeColor.primary}
                data-multiselect-selection-badge
                disabled={disabled}
                isInverse={isInverse}
                onBlur={() => setBadgeFocus(false)}
                onClick={disabled ? undefined : clearAllSelections}
                onFocus={() => setBadgeFocus(true)}
                rightIcon={disabled ? undefined : <CloseIcon />}
              >
                {selectedSummary}
              </Badge>
            </SelectionBadge>
          )}
          {isFilterable ? (
            <FilterInput
              {...commonTriggerProps}
              aria-autocomplete="list"
              autoComplete="off"
              inputSize={inputSize}
              isInverse={isInverse}
              key="trigger"
              onChange={event => {
                setFilterValue(event.target.value);
                openMenu();
              }}
              onClick={openMenu}
              placeholder={filterInputPlaceholder}
              ref={innerRef as React.Ref<HTMLInputElement>}
              style={inputStyle}
              theme={theme}
              type="text"
              value={filterValue}
            />
          ) : (
            <TriggerButton
              {...commonTriggerProps}
              inputSize={inputSize}
              isInverse={isInverse}
              key="trigger"
              onClick={() => (isOpen ? closeMenu() : openMenu())}
              ref={innerRef as React.Ref<HTMLButtonElement>}
              style={inputStyle}
              textColor={triggerTextColor}
              theme={theme}
              type="button"
            >
              {selectedItems.length === 0 && selectedSummary}
            </TriggerButton>
          )}
          <DropdownIndicator theme={theme}>
            <DefaultDropdownIndicator
              aria-hidden="true"
              color={dropdownIndicatorColor}
            />
          </DropdownIndicator>
        </Field>
        <MenuPositioner
          ref={setFloatingRef}
          style={{ ...floatingStyles, width: '100%' }}
        >
          <StyledCard
            borderRadius={CardBorderRadius.small}
            cornerTreatment={CardCornerTreatment.all}
            hasDropShadow
            isInverse={isInverse}
            isOpen={isOpen}
            style={menuStyle}
            theme={theme}
          >
            <StyledList
              aria-labelledby={labelId}
              aria-multiselectable="true"
              id={menuId}
              isOpen={isOpen}
              maxHeight={maxHeight}
              role="listbox"
            >
              {isOpen && hasSelectAll && (
                <>
                  <StyledItem
                    aria-disabled={
                      enabledFilteredItems.length === 0 || undefined
                    }
                    aria-label={
                      someSelected && !allSelected
                        ? `${multiSelectI18n.selectAllLabel}, ${i18n.indeterminateCheckbox.isIndeterminateAnnounce}`
                        : undefined
                    }
                    aria-selected={allSelected}
                    data-highlighted={highlightedIndex === 0}
                    id={getOptionId(0)}
                    isDisabled={enabledFilteredItems.length === 0}
                    isFocused={highlightedIndex === 0}
                    isInverse={isInverse}
                    onClick={handleSelectAllClick}
                    onMouseDown={preserveTriggerFocus}
                    role="option"
                    theme={theme}
                  >
                    <IndeterminateCheckbox
                      containerStyle={{ pointerEvents: 'none', width: '100%' }}
                      disabled={enabledFilteredItems.length === 0}
                      hideFocus
                      isInverse={isInverse}
                      isVisualOnly
                      labelStyle={{ padding: 0, width: '100%' }}
                      labelText={multiSelectI18n.selectAllLabel}
                      status={selectAllStatus}
                      tabIndex={-1}
                    />
                  </StyledItem>
                  <SelectAllDivider
                    aria-hidden="true"
                    data-testid="multiSelect-selectAllDivider"
                    isInverse={isInverse}
                    theme={theme}
                  />
                </>
              )}
              {isOpen &&
                groupedFilteredItems.map((group, groupIndex) => {
                  if (!group.label) {
                    return group.items.map(({ item, itemIndex }) =>
                      renderOption(item, itemIndex)
                    );
                  }

                  const groupLabelId = `${id}__group-${groupIndex}`;

                  return (
                    <OptionGroupContainer
                      key={`${group.label}-${groupIndex}`}
                      role="presentation"
                    >
                      {groupIndex > 0 && (
                        <OptionGroupDivider
                          aria-hidden="true"
                          data-testid="multiSelect-groupDivider"
                          isInverse={isInverse}
                          theme={theme}
                        />
                      )}
                      <OptionGroupHeader
                        id={groupLabelId}
                        isInverse={isInverse}
                        theme={theme}
                      >
                        {group.label}
                      </OptionGroupHeader>
                      <OptionGroup aria-labelledby={groupLabelId} role="group">
                        {group.items.map(({ item, itemIndex }) =>
                          renderOption(item, itemIndex)
                        )}
                      </OptionGroup>
                    </OptionGroupContainer>
                  );
                })}
              {isOpen && filteredItems.length === 0 && (
                <EmptyItem
                  isInverse={isInverse}
                  role="presentation"
                  theme={theme}
                >
                  {multiSelectI18n.noOptions}
                </EmptyItem>
              )}
            </StyledList>
            {isOpen && isDeferred && (
              <ActionFooter
                isInverse={isInverse}
                onKeyDown={event => {
                  if (event.key === 'Escape') {
                    event.preventDefault();
                    cancelDeferredSelection({ returnFocus: true });
                  }
                }}
                theme={theme}
              >
                <Button
                  color={ButtonColor.secondary}
                  isInverse={isInverse}
                  onKeyDown={event => {
                    if (event.key === 'Tab' && event.shiftKey) {
                      event.preventDefault();
                      rootRef.current
                        ?.querySelector<HTMLElement>('[role="combobox"]')
                        ?.focus();
                    }
                  }}
                  onClick={() => cancelDeferredSelection({ returnFocus: true })}
                  ref={cancelButtonRef}
                  size={ButtonSize.small}
                  type={ButtonType.button}
                  variant={ButtonVariant.solid}
                >
                  {multiSelectI18n.cancelButtonLabel}
                </Button>
                <Button
                  color={ButtonColor.primary}
                  disabled={!hasPendingChanges}
                  isInverse={isInverse}
                  onClick={applyDeferredSelection}
                  size={ButtonSize.small}
                  type={ButtonType.button}
                  variant={ButtonVariant.solid}
                >
                  {multiSelectI18n.applyButtonLabel}
                </Button>
              </ActionFooter>
            )}
          </StyledCard>
        </MenuPositioner>
        <VisuallyHidden>
          <Announce>{announcement}</Announce>
        </VisuallyHidden>
      </Root>
    </FormFieldContainer>
  );
}
