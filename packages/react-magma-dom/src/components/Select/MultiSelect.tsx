import * as React from 'react';

import { autoUpdate } from '@floating-ui/react-dom';
import type {
  UseSelectState,
  UseSelectStateChange,
  UseSelectStateChangeOptions,
} from 'downshift';
import { CloseOutlinedIcon } from 'react-magma-icons';

import { ClearAnnouncer } from './ClearAnnouncer';
import { defaultComponents } from './components';
import { ItemListAnnouncer } from './ItemListAnnouncer';
import { ItemsList } from './ItemsList';
import { SelectContainer } from './SelectContainer';
import { SelectTriggerButton } from './SelectTriggerButton';
import { IconWrapper, SelectedItemButton, SelectText } from './shared';
import {
  findItemIndex,
  getItemKey,
  getSelectedItemIndexes,
  isItemDisabled,
} from './utils';
import { useMagmaFloating } from '../../hooks/useMagmaFloating';
import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { useForkedRef } from '../../utils';
import {
  useMultipleSelection,
  useSelect,
  DownshiftSelectStateChangeTypes,
} from '../../utils/downshift';
import { useMultiStatusMessages } from '../../utils/downshift/useMultiStatusMessages';
import { ButtonSize, ButtonVariant } from '../Button';

import { instanceOfDefaultItemObject, MultiSelectProps } from '.';

export function MultiSelect<T>(props: MultiSelectProps<T>) {
  const { menuStatus, multipleStatus } = useMultiStatusMessages(
    props.downshift?.select?.getA11yStatusMessage,
    props.downshift?.multipleSelection?.getA11yStatusMessage,
    props.environment
  );
  const {
    additionalContent,
    ariaDescribedBy,
    ariaLabel,
    components: customComponents,
    errorMessage,
    hasError,
    helperMessage,
    inputStyle,
    isLabelVisuallyHidden,
    innerRef,
    itemToString,
    items,
    labelPosition,
    labelStyle,
    labelText,
    labelWidth,
    disabled,
    isInverse,
    itemListMaxHeight,
    menuStyle,
    messageStyle,
    onBlur,
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onRemoveSelectedItem,
    placeholder,
    isClearable,
    initialHighlightedIndex,
  } = props;

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);
  const [clearAnnouncement, setClearAnnouncement] = React.useState('');
  const [isItemFocused, setItemFocus] = React.useState(false);
  const clearAnnouncementTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (clearAnnouncementTimeoutRef.current) {
        clearTimeout(clearAnnouncementTimeoutRef.current);
      }
    };
  }, []);

  function checkSelectedItemValidity(itemToCheck: T) {
    const itemIndex = findItemIndex(
      items,
      itemToCheck,
      itemToString,
      undefined,
      props.itemToKey
    );

    // Only reject items not in the list; disabled items may be preselected values
    return itemIndex !== -1;
  }

  function itemDisabled(item: T, index?: number) {
    if (item == null) {
      return false;
    }

    return props.isItemDisabled
      ? props.isItemDisabled(
          item,
          index ??
            findItemIndex(
              filteredItems,
              item,
              itemToString,
              undefined,
              props.itemToKey
            )
        )
      : isItemDisabled(item);
  }

  function getFilteredItemIndex(item: T, filteredItems: T[]) {
    const index = findItemIndex(
      filteredItems,
      item,
      itemToString,
      undefined,
      props.itemToKey
    );

    if (itemDisabled(filteredItems[index], index)) {
      return -1;
    }

    return index;
  }

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
    setActiveIndex,
    reset,
  } = useMultipleSelection<T>({
    ...props,
    native: props.downshift?.multipleSelection && {
      ...props.downshift.multipleSelection,
      getA11yStatusMessage: multipleStatus,
    },
    ...(props.initialSelectedItems && {
      initialSelectedItems: props.initialSelectedItems.filter(
        checkSelectedItemValidity
      ),
    }),
    ...(props.selectedItems && {
      selectedItems: props.selectedItems.filter(checkSelectedItemValidity),
    }),
    ...(props.defaultSelectedItems && {
      defaultSelectedItems: props.defaultSelectedItems.filter(
        checkSelectedItemValidity
      ),
    }),
  });

  function getFilteredItems(unfilteredItems) {
    const selectedIndexes = getSelectedItemIndexes(
      unfilteredItems,
      selectedItems,
      itemToString,
      props.itemToKey
    );

    return unfilteredItems.filter(
      (_item, index) => !selectedIndexes.has(index)
    );
  }

  const {
    stateReducer: passedInStateReducer,
    onStateChange,
    onIsOpenChange,
    ...selectProps
  } = props;

  function stateReducer(
    state: UseSelectState<T>,
    actionAndChanges: UseSelectStateChangeOptions<T>
  ) {
    const { type } = actionAndChanges;
    let { changes } = actionAndChanges;

    if (!state.isOpen && changes.isOpen) {
      changes = {
        ...changes,
        highlightedIndex: state.selectedItem
          ? itemDisabled(state.selectedItem)
            ? -1
            : findItemIndex(
                filteredItems,
                state.selectedItem,
                itemToString,
                undefined,
                props.itemToKey
              )
          : changes.highlightedIndex >= 0
            ? changes.highlightedIndex
            : filteredItems.findIndex(
                (item, index) => !itemDisabled(item, index)
              ),
      };
    }

    switch (type) {
      case DownshiftSelectStateChangeTypes.ToggleButtonBlur:
        return {
          ...changes,
          selectedItem: state.selectedItem,
        };
      case DownshiftSelectStateChangeTypes.ToggleButtonKeyDownCharacter:
        return {
          ...changes,
          selectedItem: state.selectedItem,
          isOpen: state.isOpen,
        };
      case DownshiftSelectStateChangeTypes.ItemClick:
      case DownshiftSelectStateChangeTypes.ToggleButtonKeyDownEnter:
        if (itemDisabled(changes.selectedItem)) {
          return {
            ...changes,
            selectedItem: state.selectedItem,
          };
        }

        return changes;
      default:
        return changes;
    }
  }

  const filteredItems = getFilteredItems(items);
  const initialIndex = getFilteredItemIndex(
    items[initialHighlightedIndex],
    filteredItems
  );

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useSelect({
    ...selectProps,
    items: filteredItems,
    isItemDisabled: itemDisabled,
    itemToKey: props.itemToKey || getItemKey,
    navigationMode:
      props.navigationMode ??
      (props.circularNavigation === false ? 'bounded' : 'circular'),
    onSelectedItemChange: undefined,
    internalOnSelectedItemChange: defaultOnSelectedItemChange,
    internalStateReducer: stateReducer,
    native: props.downshift?.select && {
      ...props.downshift.select,
      getA11yStatusMessage: menuStatus,
    },
    initialHighlightedIndex: initialIndex,
    onIsOpenChange,
  });

  function defaultOnSelectedItemChange(changes: UseSelectStateChange<T>) {
    const { selectedItem: newSelectedItem } = changes;

    if (newSelectedItem !== null && newSelectedItem !== undefined) {
      addSelectedItem(newSelectedItem);
      selectItem(null);
    }
  }

  function handleRemoveSelectedItem(event: React.SyntheticEvent, selectedItem) {
    event.stopPropagation();

    // Announce the removal of the specific item
    const itemName = itemToString(selectedItem);
    const removeMessage = i18n.select.multi?.removeItemAnnounce?.replace(
      /\{selectedItem\}/g,
      itemName
    );

    setClearAnnouncement(removeMessage || '');

    // Clear the announcement after a delay
    if (clearAnnouncementTimeoutRef.current) {
      clearTimeout(clearAnnouncementTimeoutRef.current);
    }
    clearAnnouncementTimeoutRef.current = setTimeout(() => {
      setClearAnnouncement('');
    }, 1000);

    onRemoveSelectedItem && typeof onRemoveSelectedItem === 'function'
      ? onRemoveSelectedItem(selectedItem)
      : removeSelectedItem(selectedItem);
  }

  const toggleButtonRef = React.useRef<HTMLButtonElement>();
  const forkedtoggleButtonRef = useForkedRef(innerRef || null, toggleButtonRef);

  const dropdownProps = getDropdownProps({
    onBlur,
    onKeyPress: (event: React.KeyboardEvent) => onKeyPress?.(event),
    onKeyUp: (event: React.KeyboardEvent) => onKeyUp?.(event),
    onFocus,
    preventKeyAction: isOpen,
    ...(forkedtoggleButtonRef && { ref: forkedtoggleButtonRef }),
  });

  const toggleButtonProps = getToggleButtonProps({
    ...dropdownProps,
    onKeyDown: (event: React.KeyboardEvent) => {
      if (
        (
          props.environment?.document ?? event.currentTarget.ownerDocument
        ).activeElement?.tagName.toLowerCase() === 'button' &&
        (event.key === 'Backspace' ||
          event.key === 'Delete' ||
          event.key === 'ArrowLeft')
      ) {
        Object.assign(event.nativeEvent, { preventDownshiftDefault: true });
      }

      if (event.key === 'Escape' && isOpen) {
        event.nativeEvent.stopImmediatePropagation();
      }

      onKeyDown?.(event);
      dropdownProps.onKeyDown?.(event);
    },
    // Label the combobox by its label only; the selected value is already exposed as the combobox value
    'aria-labelledby': getLabelProps().id,
    disabled: disabled,
  });

  const { ClearIndicator } = defaultComponents<T>({
    ...customComponents,
  });

  function itemsArrayToString(itemsArray: T[]) {
    const allItems = [];

    itemsArray.map(item => {
      if (typeof item === 'string') {
        allItems.push(item);
      } else if (instanceOfDefaultItemObject(item)) {
        allItems.push(item.label);
      }
    });

    return allItems.join(', ');
  }

  const clearIndicatori18n =
    selectedItems.length > 1
      ? i18n.select.multi.clearIndicatorAriaLabel
      : i18n.select.clearIndicatorAriaLabel;

  const clearIndicatorAriaLabel = clearIndicatori18n
    .replace(/\{labelText\}/g, labelText)
    .replace(/\{selectedItem\}/g, itemsArrayToString(selectedItems));

  const multiSelectAriaLabel =
    selectedItems.length > 0
      ? i18n.select.multi.ariaLabelWithSelectedItems
          .replace(/\{labelText\}/g, labelText)
          .replace(
            /\{selectedItems\}/g,
            selectedItems.map(item => itemToString(item)).join(', ')
          )
      : i18n.select.multi.ariaLabelWithoutSelectedItems.replace(
          /\{labelText\}/g,
          labelText
        );

  function defaultHandleClearIndicatorClick(event: React.SyntheticEvent) {
    event.stopPropagation();

    if (toggleButtonRef.current) {
      toggleButtonRef.current.focus();
    }

    reset();

    const selectedItemsText = itemsArrayToString(selectedItems);
    const clearMessage =
      selectedItems.length > 1
        ? i18n.select.multi?.clearAnnounce
            ?.replace(/\{labelText\}/g, labelText)
            ?.replace(/\{selectedItems\}/g, selectedItemsText)
        : i18n.select.clearAnnounce?.replace(/\{labelText\}/g, labelText);

    setClearAnnouncement(clearMessage || '');

    // Clear the announcement after a delay to allow for re-announcements
    if (clearAnnouncementTimeoutRef.current) {
      clearTimeout(clearAnnouncementTimeoutRef.current);
    }
    clearAnnouncementTimeoutRef.current = setTimeout(() => {
      setClearAnnouncement('');
    }, 1000);
  }

  const { floatingStyles, refs, elements, update } = useMagmaFloating();

  React.useEffect(() => {
    const referenceSelectButton = elements.reference;
    const floatingItemsList = elements.floating;

    if (isOpen && referenceSelectButton && floatingItemsList) {
      return autoUpdate(referenceSelectButton, floatingItemsList, update);
    }
  }, [isOpen, elements, update]);

  const floatingElementStyles = { ...floatingStyles, width: '100%' };

  return (
    <>
      <SelectContainer
        additionalContent={additionalContent}
        ariaLabel={ariaLabel ?? multiSelectAriaLabel}
        descriptionId={ariaDescribedBy}
        errorMessage={errorMessage}
        getLabelProps={getLabelProps}
        helperMessage={helperMessage}
        isLabelVisuallyHidden={isLabelVisuallyHidden}
        labelPosition={labelPosition}
        labelStyle={labelStyle}
        labelText={labelText}
        labelWidth={labelWidth}
        isInverse={isInverse}
        messageStyle={messageStyle}
      >
        <SelectTriggerButton
          ariaDescribedBy={ariaDescribedBy}
          toggleButtonProps={toggleButtonProps}
          hasError={hasError}
          disabled={disabled}
          isInverse={isInverse}
          setReference={refs.setReference}
          style={inputStyle}
        >
          {selectedItems && selectedItems.length > 0 ? (
            selectedItems.map((multiSelectedItem, index) => {
              const multiSelectedItemString = itemToString(multiSelectedItem);

              return (
                <SelectedItemButton
                  aria-hidden={!isItemFocused}
                  aria-label={i18n.multiSelect.selectedItemButtonAriaLabel.replace(
                    /\{selectedItem\}/g,
                    multiSelectedItemString
                  )}
                  key={`selected-item-${index}`}
                  {...getSelectedItemProps({
                    selectedItem: multiSelectedItem,
                    index,
                  })}
                  onClick={event =>
                    handleRemoveSelectedItem(event, multiSelectedItem)
                  }
                  onFocus={event => {
                    event.stopPropagation();
                    setActiveIndex(index);
                    setItemFocus(true);
                  }}
                  onBlur={() => {
                    setItemFocus(false);
                  }}
                  theme={theme}
                  isInverse={isInverse}
                  disabled={disabled}
                >
                  {multiSelectedItemString}
                  <IconWrapper>
                    <CloseOutlinedIcon size={theme.iconSizes.xSmall} />
                  </IconWrapper>
                </SelectedItemButton>
              );
            })
          ) : (
            <SelectText
              isShowPlaceholder
              isInverse={isInverse}
              isDisabled={disabled}
              theme={theme}
            >
              {typeof placeholder === 'string'
                ? placeholder
                : i18n.multiSelect.placeholder}
            </SelectText>
          )}
        </SelectTriggerButton>

        {isClearable && selectedItems?.length > 0 && (
          <ClearIndicator
            aria-label={clearIndicatorAriaLabel}
            icon={<CloseOutlinedIcon size={theme.iconSizes.xSmall} />}
            isInverse={isInverse}
            onClick={defaultHandleClearIndicatorClick}
            size={ButtonSize.small}
            variant={ButtonVariant.link}
            disabled={disabled}
            testId="clearIndicator"
            style={{
              position: 'absolute',
              right: '3.25em',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
        )}
        <ItemsList
          aria-multiselectable="true"
          customComponents={customComponents}
          floatingElementStyles={floatingElementStyles}
          getItemProps={getItemProps}
          getMenuProps={getMenuProps}
          highlightedIndex={highlightedIndex}
          isOpen={isOpen}
          isInverse={isInverse}
          isItemDisabled={itemDisabled}
          items={filteredItems}
          itemToString={itemToString}
          itemToKey={props.itemToKey}
          maxHeight={itemListMaxHeight ?? theme.select.menu.maxHeight}
          menuStyle={menuStyle}
          setFloating={refs.setFloating}
        />
      </SelectContainer>

      {!props.downshift?.select?.getA11yStatusMessage && (
        <ItemListAnnouncer isOpen={isOpen} labelText={labelText} />
      )}
      {isClearable &&
        !props.downshift?.multipleSelection?.getA11yStatusMessage && (
          <ClearAnnouncer clearAnnouncement={clearAnnouncement} />
        )}
    </>
  );
}
