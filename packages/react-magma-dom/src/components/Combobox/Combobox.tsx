import * as React from 'react';
import { instanceOfDefaultItemObject } from '../Select';
import { useCombobox } from 'downshift';
import { CloseIcon } from 'react-magma-icons';
import { defaultComponents } from '../Select/components';
import { SelectContainer } from '../Select/SelectContainer';
import { ItemsList } from '../Select/ItemsList';
import { ComboboxInput } from './ComboboxInput';
import { ButtonShape, ButtonSize, ButtonVariant } from '../Button';
import { useComboboxItems, defaultOnInputValueChange } from './shared';
import { ComboboxProps } from '.';
import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';
import { useForkedRef } from '../../utils';

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
    itemToString,
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

  function isCreatedItem(item) {
    return (
      !(typeof item === 'string') &&
      instanceOfDefaultItemObject(item) &&
      item.react_magma__created_item
    );
  }

  function defaultNewItemTransform(newItem) {
    return newItem.value;
  }

  function defaultOnSelectedItemChange(changes) {
    if (isCreatedItem(changes.selectedItem)) {
      const { react_magma__created_item, ...createdItem } =
        changes.selectedItem;

      const newItem =
        react_magma__created_item &&
        newItemTransform &&
        typeof newItemTransform === 'function'
          ? newItemTransform(createdItem)
          : defaultNewItemTransform(createdItem);

      items && onItemCreated && typeof onItemCreated === 'function'
        ? onItemCreated(newItem)
        : updateItemsRef(newItem);

      selectItem(newItem);
      setInputValue(itemToString(newItem));

      if (process.env.NODE_ENV === 'development') {
        if (!items && !disableCreateItem) {
          console.warn(
            'React Magma Warning: Switching from uncontrolled to controlled items. If allowing new items to be created you should handle the onItemCreated event and control the items list in your code.'
          );
        }
      }
    } else {
      props.onSelectedItemChange &&
        typeof props.onSelectedItemChange === 'function' &&
        props.onSelectedItemChange(changes);
    }
  }

  function stateReducer(state, actionAndChanges) {
    const { type, changes } = actionAndChanges;

    switch (type) {
      case useCombobox.stateChangeTypes.InputKeyDownEnter: {
        const inputValue = isCreatedItem(displayItems[0])
          ? ''
          : changes.inputValue;
        return {
          ...changes,
          inputValue,
        };
      }
      case useCombobox.stateChangeTypes.ItemClick: {
        const inputValue = isCreatedItem(displayItems[0])
          ? ''
          : changes.inputValue;
        return {
          ...changes,
          inputValue,
        };
      }
      case useCombobox.stateChangeTypes.InputBlur:
        return {
          ...changes,
          inputValue:
            state.inputValue && !state.selectedItem
              ? ''
              : itemToString(state.selectedItem),
          selectedItem: state.selectedItem ? state.selectedItem : '',
        };
      case useCombobox.stateChangeTypes.FunctionReset:
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

  function getValidItem(itemToCheck: T, key: string): object {
    // When using Typeahead, don't validate the items
    if (isTypeahead) {
      return allItems;
    }
    return allItems.current.findIndex(
      i => itemToString(i) === itemToString(itemToCheck)
    ) !== -1
      ? { [key]: itemToCheck }
      : { [key]: null };
  }

  function handleOnIsOpenChange(changes) {
    const { isOpen: changedIsOpen, selectedItem: changedSelectedItem } =
      changes;

    if (!changedIsOpen) {
      setDisplayItems(allItems.current);
    }

    if (changedIsOpen && changedSelectedItem) {
      setHighlightedIndex(
        displayItems.findIndex(
          i => itemToString(i) === itemToString(changedSelectedItem)
        )
      );
    }

    onIsOpenChange &&
      typeof onIsOpenChange === 'function' &&
      onIsOpenChange(changes);
  }

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    reset,
    selectItem,
    selectedItem,
    setInputValue,
    setHighlightedIndex,
  } = useCombobox({
    ...props,
    itemToString,
    items: displayItems,
    onInputValueChange:
      onInputValueChange && typeof onInputValueChange === 'function'
        ? changes => onInputValueChange(changes, setDisplayItems)
        : changes =>
            defaultOnInputValueChange(
              changes,
              allItems,
              itemToString,
              disableCreateItem,
              setDisplayItems,
              setHighlightedIndex,
              onInputChange,
              i18n.combobox.createLabel
            ),
    onIsOpenChange: handleOnIsOpenChange,
    onSelectedItemChange: defaultOnSelectedItemChange,
    stateReducer,
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
  }

  const clearIndicatorAriaLabel = i18n.combobox.clearIndicatorAriaLabel
    .replace(/\{labelText\}/g, labelText)
    .replace(/\{selectedItem\}/g, itemToString(selectedItem));

  function handleOnKeyDown(event: any) {
    const count = document.querySelectorAll('[aria-modal="true"]').length;

    if (event.key === 'Escape') {
      if (count >= 1 && inputRef.current) {
        inputRef.current.focus();
      }
      event.nativeEvent.stopImmediatePropagation();
    }

    onInputKeyDown &&
      typeof onInputKeyDown === 'function' &&
      onInputKeyDown(event);
  }

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
        getComboboxProps={getComboboxProps}
        getInputProps={options => ({
          ...getInputProps({
            ...options,
            ...getComboboxProps({
              onKeyDown: handleOnKeyDown,
              ...innerRef,
            }),
          }),
        })}
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
        toggleButtonRef={toggleButtonRef}
      >
        {isClearable && selectedItem && (
          <ClearIndicator
            aria-label={clearIndicatorAriaLabel}
            icon={<CloseIcon />}
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
        getItemProps={getItemProps}
        getMenuProps={getMenuProps}
        highlightedIndex={highlightedIndex}
        isOpen={isOpen}
        isInverse={isInverse}
        items={displayItems}
        itemToString={itemToString}
        isLoading={isLoading && isTypeahead}
        maxHeight={itemListMaxHeight || theme.combobox.menu.maxHeight}
        menuStyle={menuStyle}
      />
    </SelectContainer>
  );
}
