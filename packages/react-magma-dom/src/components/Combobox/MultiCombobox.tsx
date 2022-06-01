import * as React from 'react';
import { instanceOfDefaultItemObject } from '../Select';
import { useCombobox, useMultipleSelection } from 'downshift';
import { CloseIcon } from 'react-magma-icons';
import { SelectContainer } from '../Select/SelectContainer';
import { ItemsList } from '../Select/ItemsList';
import { ComboboxInput } from './ComboboxInput';
import { SelectedItemButton, IconWrapper } from '../Select/shared';
import { useComboboxItems, defaultOnInputValueChange } from './shared';

import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';
import { MultiComboboxProps } from '.';

export function MultiCombobox<T>(props: MultiComboboxProps<T>) {
  const [inputValue, setInputValue] = React.useState('');
  const {
    ariaDescribedBy,
    components: customComponents,
    errorMessage,
    defaultItems,
    disableCreateItem,
    hasError,
    helperMessage,
    inputStyle,
    disabled,
    innerRef,
    isLabelVisuallyHidden,
    isLoading,
    isInverse,
    itemListMaxHeight,
    items,
    itemToString,
    labelPosition,
    labelStyle,
    labelText,
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
    onRemoveSelectedItem,
    placeholder,
    toggleButtonRef,
  } = props;

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const [
    allItems,
    displayItems,
    setDisplayItems,
    updateItemsRef,
  ] = useComboboxItems(defaultItems, items);

  function checkSelectedItemValidity(itemToCheck) {
    return (
      allItems.current.findIndex(
        i => itemToString(i) === itemToString(itemToCheck)
      ) !== -1
    );
  }

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    setActiveIndex,
    selectedItems,
  } = useMultipleSelection({
    ...props,
    ...(props.initialSelectedItems && {
      initialSelectedItems: props.initialSelectedItems.filter(
        checkSelectedItemValidity
      ),
    }),
    ...(props.selectedItems && {
      selectedItems: props.selectedItems.filter(checkSelectedItemValidity),
    }),
  });

  function isCreatedItem(item) {
    return (
      !(typeof item === 'string') &&
      instanceOfDefaultItemObject(item) &&
      item.react_magma__created_item
    );
  }

  function getFilteredItems(unfilteredItems) {
    return unfilteredItems.filter(item => {
      const itemString =
        typeof item === 'object' && item.react_magma__created_item
          ? item.value
          : itemToString(item);
      return (
        (selectedItems.findIndex(
          selectedItem => itemToString(selectedItem) === itemToString(item)
        ) < 0 &&
          itemString.toLowerCase().startsWith(inputValue.toLowerCase())) ||
        isCreatedItem(item)
      );
    });
  }

  function defaultNewItemTransform(newItem) {
    return newItem.value;
  }

  function defaultOnSelectedItemChange(changes) {
    if (isCreatedItem(changes.selectedItem)) {
      const {
        react_magma__created_item,
        ...createdItem
      } = changes.selectedItem;

      const newItem =
        react_magma__created_item &&
        newItemTransform &&
        typeof newItemTransform === 'function'
          ? newItemTransform(createdItem)
          : defaultNewItemTransform(createdItem);

      items && onItemCreated && typeof onItemCreated === 'function'
        ? onItemCreated(newItem)
        : updateItemsRef(newItem);
      addSelectedItem(newItem);

      if (process.env.NODE_ENV === 'development') {
        if (!items && !disableCreateItem) {
          console.warn(
            'React Magma Warning: Switching from uncontrolled to controlled items. If allowing new items to be created you should handle the onItemCreated event and control the items list in your code.'
          );
        }
      }
    } else if (changes.selectedItem) {
      addSelectedItem(changes.selectedItem);
    }

    selectItem(null);
    setInputValue('');
  }

  const {
    stateReducer: passedInStateReducer,
    onStateChange,
    ...comboboxProps
  } = props;

  function handleOnIsOpenChange(changes) {
    const { isOpen: changedIsOpen } = changes;

    if (!changedIsOpen) {
      setDisplayItems(allItems.current);
    }

    onIsOpenChange &&
      typeof onIsOpenChange === 'function' &&
      onIsOpenChange(changes);
  }

  function stateReducer(state, actionAndChanges) {
    const { type, changes } = actionAndChanges;
    switch (type) {
      case useCombobox.stateChangeTypes.InputKeyDownEnter: {
        const newSelectedItem = getFilteredItems(displayItems)[
          state.highlightedIndex
        ];
        return {
          ...changes,
          ...(newSelectedItem && {
            selectedItem: newSelectedItem,
          }),
          inputValue: '',
        };
      }
      case useCombobox.stateChangeTypes.ItemClick: {
        return {
          ...changes,
          inputValue: '',
        };
      }
      case useCombobox.stateChangeTypes.InputBlur:
        return {
          ...changes,
          inputValue: '',
        };
      default:
        return changes;
    }
  }

  function handleInputChange(changes) {
    setInputValue(changes.inputValue);

    onInputChange &&
      typeof onInputChange === 'function' &&
      onInputChange(changes);
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
    selectItem,
    setHighlightedIndex,
  } = useCombobox({
    ...comboboxProps,
    itemToString,
    items: getFilteredItems(displayItems),
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
              handleInputChange,
              i18n.combobox.createLabel
            ),
    onIsOpenChange: handleOnIsOpenChange,
    onSelectedItemChange: defaultOnSelectedItemChange,
    stateReducer,
  });

  function handleRemoveSelectedItem(event: React.SyntheticEvent, selectedItem) {
    event.stopPropagation();

    onRemoveSelectedItem && typeof onRemoveSelectedItem === 'function'
      ? onRemoveSelectedItem(selectedItem)
      : removeSelectedItem(selectedItem);
  }

  function handleInputFocus(event: React.FocusEvent) {
    setActiveIndex(-1);

    onInputFocus && typeof onInputFocus === 'function' && onInputFocus(event);
  }

  const selectedItemsContent =
    selectedItems && selectedItems.length > 0 ? (
      <>
        {selectedItems.map((multiSelectedItem, index) => (
          <SelectedItemButton
            aria-label={i18n.multiCombobox.selectedItemButtonAriaLabel.replace(
              /\{selectedItem\}/g,
              itemToString(multiSelectedItem)
            )}
            key={`selected-item-${index}`}
            {...getSelectedItemProps({
              selectedItem: multiSelectedItem,
              index,
            })}
            onClick={event =>
              handleRemoveSelectedItem(event, multiSelectedItem)
            }
            onFocus={() => setActiveIndex(index)}
            theme={theme}
            isInverse={isInverse}
          >
            {itemToString(multiSelectedItem)}
            <IconWrapper>
              <CloseIcon size={theme.iconSizes.xSmall} />
            </IconWrapper>
          </SelectedItemButton>
        ))}
      </>
    ) : null;

  return (
    <SelectContainer
      descriptionId={ariaDescribedBy}
      errorMessage={errorMessage}
      getLabelProps={getLabelProps}
      helperMessage={helperMessage}
      isInverse={isInverse}
      isLabelVisuallyHidden={isLabelVisuallyHidden}
      labelPosition={labelPosition}
      labelStyle={labelStyle}
      labelText={labelText}
      messageStyle={messageStyle}
    >
      <ComboboxInput
        ariaDescribedBy={ariaDescribedBy}
        customComponents={customComponents}
        getComboboxProps={getComboboxProps}
        getInputProps={options => ({
          ...getInputProps({
            ...options,
            ...getDropdownProps({
              onKeyDown: onInputKeyDown,
              preventKeyAction: isOpen,
              ...(innerRef && { ref: innerRef }),
            }),
          }),
        })}
        getToggleButtonProps={getToggleButtonProps}
        inputStyle={inputStyle}
        disabled={disabled}
        isInverse={isInverse}
        isLoading={isLoading}
        hasError={hasError}
        onInputBlur={onInputBlur}
        onInputFocus={handleInputFocus}
        onInputKeyDown={onInputKeyDown}
        onInputKeyPress={onInputKeyPress}
        onInputKeyUp={onInputKeyUp}
        placeholder={placeholder}
        selectedItems={selectedItemsContent}
        toggleButtonRef={toggleButtonRef}
      />
      <ItemsList
        customComponents={customComponents}
        getItemProps={getItemProps}
        getMenuProps={getMenuProps}
        highlightedIndex={highlightedIndex}
        isInverse={isInverse}
        isOpen={isOpen}
        items={getFilteredItems(displayItems)}
        itemToString={itemToString}
        maxHeight={itemListMaxHeight || theme.combobox.menu.maxHeight}
        menuStyle={menuStyle}
      />
    </SelectContainer>
  );
}
