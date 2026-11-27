import * as React from 'react';

import { autoUpdate } from '@floating-ui/react-dom';
import type {
  UseComboboxState,
  UseComboboxStateChange,
  UseComboboxStateChangeOptions,
} from 'downshift';
import { CloseOutlinedIcon } from 'react-magma-icons';

import {
  useCombobox,
  DownshiftComboboxStateChangeTypes,
} from '../../utils/downshift';
import { instanceOfDefaultItemObject } from '../Select';
import { ComboboxInput } from './ComboboxInput';
import { defaultOnInputValueChange, useComboboxItems } from './shared';
import { useMagmaFloating } from '../../hooks/useMagmaFloating';
import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { useForkedRef } from '../../utils';
import { ButtonShape, ButtonSize, ButtonVariant } from '../Button';
import { ClearAnnouncer } from '../Select/ClearAnnouncer';
import { defaultComponents } from '../Select/components';
import { ItemListAnnouncer } from '../Select/ItemListAnnouncer';
import { ItemsList } from '../Select/ItemsList';
import { SelectContainer } from '../Select/SelectContainer';
import { findItemIndex, getItemKey, isItemDisabled } from '../Select/utils';

import { ComboboxProps } from '.';

export function InternalCombobox<T>(props: ComboboxProps<T>) {
  const {
    ariaDescribedBy,
    components: customComponents,
    defaultItems,
    defaultSelectedItem,
    disableCreateItem,
    errorMessage,
    hasError,
    helperMessage,
    initialSelectedItem,
    inputStyle,
    isClearable,
    disabled,
    innerRef,
    isLabelVisuallyHidden,
    isLoading,
    isInverse,
    isTypeahead = false,
    itemListMaxHeight,
    items,
    itemToString: passedItemToString,
    labelPosition,
    labelStyle,
    labelText,
    labelWidth,
    menuStyle,
    messageStyle,
    newItemTransform,
    onInputBlur,
    onInputChange,
    onInputFocus,
    onInputKeyDown,
    onInputKeyPress,
    onInputKeyUp,
    onInputValueChange,
    onIsOpenChange,
    onItemCreated,
    placeholder,
    selectedItem: passedInSelectedItem,
    toggleButtonRef,
  } = props;

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);
  const [clearAnnouncement, setClearAnnouncement] = React.useState('');
  const clearAnnouncementTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  function isCreatedItem(item: unknown): item is {
    label: string;
    value: string;
    react_magma__created_item: boolean;
  } {
    return (
      !(typeof item === 'string') &&
      instanceOfDefaultItemObject(item) &&
      item.react_magma__created_item
    );
  }

  function itemToString(item: T | null) {
    if (props.downshift?.combobox && isCreatedItem(item)) {
      return item.label;
    }

    return passedItemToString(item);
  }

  function itemKey(item: T | null) {
    if (props.downshift?.combobox && isCreatedItem(item)) {
      return item;
    }

    return (props.itemToKey || getItemKey)(item);
  }

  function itemDisabled(item: T, index?: number) {
    if (props.downshift?.combobox && isCreatedItem(item)) {
      return false;
    }

    return (props.isItemDisabled || isItemDisabled)(item, index);
  }

  function defaultNewItemTransform(newItem) {
    return newItem.value;
  }

  function createItem(item) {
    const { react_magma__created_item, ...createdItem } = item;

    const newItem =
      react_magma__created_item &&
      newItemTransform &&
      typeof newItemTransform === 'function'
        ? newItemTransform(createdItem)
        : defaultNewItemTransform(createdItem);

    items && onItemCreated && typeof onItemCreated === 'function'
      ? onItemCreated(newItem)
      : updateItemsRef(newItem);

    if (process.env.NODE_ENV === 'development') {
      if (!items && !disableCreateItem) {
        console.warn(
          'React Magma Warning: Switching from uncontrolled to controlled items. If allowing new items to be created you should handle the onItemCreated event and control the items list in your code.'
        );
      }
    }

    return newItem;
  }

  function defaultOnSelectedItemChange(changes) {
    if (isCreatedItem(changes.selectedItem)) {
      const newItem = createItem(changes.selectedItem);

      selectItem(newItem);
      setInputValue(itemToString(newItem));
    }
  }

  function stateReducer(
    state: UseComboboxState<T>,
    actionAndChanges: UseComboboxStateChangeOptions<T>
  ) {
    const { type, changes } = actionAndChanges;

    switch (type) {
      case DownshiftComboboxStateChangeTypes.InputKeyDownEnter: {
        const inputValue = isCreatedItem(displayItems[0])
          ? ''
          : changes.inputValue;

        return {
          ...changes,
          inputValue,
        };
      }
      case DownshiftComboboxStateChangeTypes.ItemClick: {
        const inputValue = isCreatedItem(displayItems[0])
          ? ''
          : changes.inputValue;

        return {
          ...changes,
          inputValue,
        };
      }
      case DownshiftComboboxStateChangeTypes.InputBlur:
        return {
          ...changes,
          inputValue:
            state.inputValue && !state.selectedItem
              ? ''
              : itemToString(state.selectedItem),
          selectedItem: state.selectedItem,
        };
      case DownshiftComboboxStateChangeTypes.FunctionReset:
        return {
          ...changes,
          inputValue: changes.selectedItem
            ? itemToString(changes.selectedItem)
            : '',
        };
      default:
        return changes;
    }
  }

  const [allItems, displayItems, setDisplayItems, updateItemsRef] =
    useComboboxItems(defaultItems, items);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (clearAnnouncementTimeoutRef.current) {
        clearTimeout(clearAnnouncementTimeoutRef.current);
      }
    };
  }, []);

  function getValidItem(itemToCheck: T, key: string): object {
    // When using Typeahead, don't validate the items
    if (isTypeahead) {
      return allItems;
    }

    return findItemIndex(
      allItems.current,
      itemToCheck,
      itemToString,
      undefined,
      props.itemToKey ? itemKey : undefined
    ) !== -1
      ? { [key]: itemToCheck }
      : { [key]: null };
  }

  function handleOnIsOpenChange(changes: UseComboboxStateChange<T>) {
    const { isOpen: changedIsOpen, selectedItem: changedSelectedItem } =
      changes;

    if (!changedIsOpen) {
      setDisplayItems(allItems.current);
    }

    if (changedIsOpen && changedSelectedItem) {
      const index = findItemIndex(
        displayItems,
        changedSelectedItem,
        itemToString,
        undefined,
        props.itemToKey ? itemKey : undefined
      );

      setHighlightedIndex(
        index >= 0 && itemDisabled(displayItems[index], index) ? -1 : index
      );
    }
  }

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    reset,
    selectItem,
    selectedItem,
    setInputValue,
    setHighlightedIndex,
  } = useCombobox<T>({
    ...props,
    itemToString,
    itemToKey: itemKey,
    isItemDisabled: itemDisabled,
    items: displayItems,
    onInputValueChange: onInputValueChange
      ? changes => onInputValueChange(changes, setDisplayItems)
      : undefined,
    internalOnInputValueChange: changes => {
      if (
        !onInputValueChange ||
        props.downshift?.combobox?.onInputValueChange
      ) {
        defaultOnInputValueChange(
          changes,
          allItems,
          itemToString,
          disableCreateItem,
          setDisplayItems,
          setHighlightedIndex,
          onInputChange,
          i18n.combobox.createLabel,
          itemDisabled
        );
      }
    },
    internalOnIsOpenChange: handleOnIsOpenChange,
    onIsOpenChange,
    internalOnSelectedItemChange: defaultOnSelectedItemChange,
    onSelectedItemChange: changes => {
      if (!isCreatedItem(changes.selectedItem))
        props.onSelectedItemChange?.(changes);
    },
    native: props.downshift?.combobox,
    isCreateOption: props.downshift?.combobox ? isCreatedItem : undefined,
    resolveCreatedItem: props.downshift?.combobox
      ? index => {
          const item = displayItems[index];

          return isCreatedItem(item) ? { item: createItem(item) } : undefined;
        }
      : undefined,
    onSelectionChange: item => {
      if (!isCreatedItem(item)) {
        props.onSelectionChange?.(item);
      }
    },
    internalStateReducer: stateReducer,
    userStateReducer: props.stateReducer,
    ...(defaultSelectedItem &&
      getValidItem(defaultSelectedItem, 'defaultSelectedItem')),
    ...(initialSelectedItem &&
      getValidItem(initialSelectedItem, 'initialSelectedItem')),
    ...(passedInSelectedItem &&
      getValidItem(passedInSelectedItem, 'selectedItem')),
  });

  const { ClearIndicator } = defaultComponents<T>({
    ...customComponents,
  });

  const inputRef = React.useRef<HTMLInputElement>();
  const ref = useForkedRef(innerRef || null, inputRef);

  function defaultHandleClearIndicatorClick(event: React.SyntheticEvent) {
    event.stopPropagation();

    if (inputRef.current) {
      inputRef.current.focus();
    }

    reset();

    setClearAnnouncement(
      i18n.combobox.clearAnnounce?.replace(/\{labelText\}/g, labelText)
    );

    // Clear the announcement after a delay to allow for re-announcements
    if (clearAnnouncementTimeoutRef.current) {
      clearTimeout(clearAnnouncementTimeoutRef.current);
    }
    clearAnnouncementTimeoutRef.current = setTimeout(() => {
      setClearAnnouncement('');
    }, 1000);
  }

  const clearIndicatorAriaLabel = i18n.combobox.clearIndicatorAriaLabel
    ?.replace(/\{labelText\}/g, labelText)
    ?.replace(/\{selectedItem\}/g, itemToString(selectedItem));

  function handleOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case 'Escape':
        if (isOpen) {
          event.stopPropagation();
          event.nativeEvent.stopImmediatePropagation();
        }
        break;
      default:
        break;
    }

    onInputKeyDown &&
      typeof onInputKeyDown === 'function' &&
      onInputKeyDown(event);
  }

  const { floatingStyles, refs, elements, update } = useMagmaFloating();

  React.useEffect(() => {
    const referenceComboboxInput = elements.reference;
    const floatingItemsList = elements.floating;

    if (isOpen && referenceComboboxInput && floatingItemsList) {
      return autoUpdate(referenceComboboxInput, floatingItemsList, update);
    }
  }, [isOpen, elements, update]);

  const floatingElementStyles = { ...floatingStyles, width: '100%' };

  return (
    <SelectContainer
      descriptionId={ariaDescribedBy}
      errorMessage={errorMessage}
      getLabelProps={getLabelProps}
      hasError={hasError}
      helperMessage={helperMessage}
      isLabelVisuallyHidden={isLabelVisuallyHidden}
      isInverse={isInverse}
      labelPosition={labelPosition}
      labelStyle={labelStyle}
      labelText={labelText}
      labelWidth={labelWidth}
      messageStyle={messageStyle}
    >
      <ComboboxInput
        ariaDescribedBy={ariaDescribedBy}
        customComponents={customComponents}
        disabled={disabled}
        getInputProps={getInputProps}
        getToggleButtonProps={getToggleButtonProps}
        hasError={hasError}
        innerRef={ref}
        inputStyle={inputStyle}
        isInverse={isInverse}
        isLoading={isLoading}
        isTypeahead={isTypeahead}
        onInputBlur={onInputBlur}
        onInputFocus={onInputFocus}
        onInputKeyDown={handleOnKeyDown}
        onInputKeyPress={onInputKeyPress}
        onInputKeyUp={onInputKeyUp}
        placeholder={placeholder}
        setReference={refs.setReference}
        toggleButtonRef={toggleButtonRef}
      >
        {isClearable && selectedItem && (
          <ClearIndicator
            aria-label={clearIndicatorAriaLabel}
            icon={<CloseOutlinedIcon />}
            isInverse={isInverse}
            onClick={defaultHandleClearIndicatorClick}
            shape={ButtonShape.fill}
            size={ButtonSize.small}
            variant={ButtonVariant.link}
          />
        )}
      </ComboboxInput>
      <ItemsList
        customComponents={customComponents}
        floatingElementStyles={floatingElementStyles}
        getItemProps={getItemProps}
        getMenuProps={getMenuProps}
        highlightedIndex={highlightedIndex}
        isOpen={isOpen}
        isInverse={isInverse}
        items={displayItems}
        itemToString={itemToString}
        itemToKey={props.itemToKey ? itemKey : undefined}
        isItemDisabled={itemDisabled}
        isLoading={isLoading && isTypeahead}
        maxHeight={itemListMaxHeight || theme.combobox.menu.maxHeight}
        menuStyle={menuStyle}
        setFloating={refs.setFloating}
        selectedItem={selectedItem}
      />
      {!props.downshift?.combobox?.getA11yStatusMessage && (
        <ItemListAnnouncer isOpen={isOpen} labelText={labelText} />
      )}
      {isClearable && !props.downshift?.combobox?.getA11yStatusMessage && (
        <ClearAnnouncer clearAnnouncement={clearAnnouncement} />
      )}
    </SelectContainer>
  );
}
