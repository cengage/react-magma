import * as React from 'react';
import {
  instanceOfDefaultItemObject,
  DownshiftOption
} from '../DownshiftSelect';
import {
  useCombobox,
  useMultipleSelection,
  UseMultipleSelectionProps
} from 'downshift';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { DownshiftSelectContainer } from '../DownshiftSelect/SelectContainer';
import { ItemsList } from '../DownshiftSelect/ItemsList';
import { ComboboxInput } from './ComboboxInput';
import {
  SelectedItemsWrapper,
  SelectedItemButton,
  IconWrapper
} from '../DownshiftSelect/shared';
import { useComboboxItems } from './shared';

import { ThemeContext } from '../../theme/ThemeContext';
import { DownshiftMultiComboboxInterface } from '.';

export function MultiCombobox<T>(props: DownshiftMultiComboboxInterface<T>) {
  const [inputValue, setInputValue] = React.useState('');
  const {
    ariaDescribedBy,
    components: customComponents,
    defaultItems,
    disableCreateItem,
    hasError,
    isDisabled,
    isLoading,
    isInverse,
    items,
    itemToString,
    labelText,
    newItemTransform,
    onInputBlur,
    onInputFocus,
    onInputChange,
    onInputKeyDown,
    onInputKeyPress,
    onInputKeyUp,
    onInputValueChange,
    onItemCreated,
    onRemoveSelectedItem
  } = props;
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems
  } = useMultipleSelection(
    (props as unknown) as UseMultipleSelectionProps<DownshiftOption<T>>
  );

  console.log('selected items: ', selectedItems);

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
        (selectedItems.indexOf(item) < 0 &&
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
        ? onItemCreated(newItem || createdItem)
        : updateItemsRef(newItem || createdItem);
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

    setInputValue('');
    selectItem(null);
  }

  const [
    displayItems,
    setDisplayItems,
    updateItemsRef,
    defaultOnInputValueChange
  ] = useComboboxItems(defaultItems, items, {
    itemToString,
    disableCreateItem,
    onInputChange: changes => {
      setInputValue(changes.inputValue);
      onInputChange &&
        typeof onInputChange === 'function' &&
        onInputChange(changes);
    }
  });

  const { stateReducer, onStateChange, ...comboboxProps } = props;

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
    selectItem
  } = useCombobox({
    ...comboboxProps,
    itemToString,
    items: getFilteredItems(displayItems),
    onInputValueChange:
      onInputValueChange && typeof onInputValueChange === 'function'
        ? changes => onInputValueChange(changes, setDisplayItems)
        : defaultOnInputValueChange,
    onSelectedItemChange: defaultOnSelectedItemChange
  });

  function handleRemoveSelectedItem(event: React.SyntheticEvent, selectedItem) {
    event.stopPropagation();

    onRemoveSelectedItem && typeof onRemoveSelectedItem === 'function'
      ? onRemoveSelectedItem(selectedItem)
      : removeSelectedItem(selectedItem);
  }

  function handleInputBlur(event: React.FocusEvent) {
    reset();
    onInputBlur && typeof onInputBlur === 'function' && onInputBlur(event);
  }

  const theme = React.useContext(ThemeContext);

  const selectedItemsContent =
    selectedItems && selectedItems.length > 0 ? (
      <SelectedItemsWrapper>
        {selectedItems.map((multiSelectedItem, index) => (
          <SelectedItemButton
            aria-label="reset item"
            key={`selected-item-${index}`}
            {...getSelectedItemProps({
              selectedItem: multiSelectedItem,
              index
            })}
            onClick={event =>
              handleRemoveSelectedItem(event, multiSelectedItem)
            }
            tabIndex={0}
            theme={theme}
          >
            {itemToString(multiSelectedItem)}
            <IconWrapper>
              <CrossIcon size={9} />
            </IconWrapper>
          </SelectedItemButton>
        ))}
      </SelectedItemsWrapper>
    ) : null;

  return (
    <DownshiftSelectContainer
      getLabelProps={getLabelProps}
      isInverse={isInverse}
      labelText={labelText}
    >
      <ComboboxInput
        ariaDescribedBy={ariaDescribedBy}
        customComponents={customComponents}
        getComboboxProps={getComboboxProps}
        getInputProps={options => ({
          ...getInputProps({ ...getDropdownProps(), ...options })
        })}
        getToggleButtonProps={getToggleButtonProps}
        isDisabled={isDisabled}
        isInverse={isInverse}
        isLoading={isLoading}
        hasError={hasError}
        onInputBlur={handleInputBlur}
        onInputFocus={onInputFocus}
        onInputKeyDown={onInputKeyDown}
        onInputKeyPress={onInputKeyPress}
        onInputKeyUp={onInputKeyUp}
        selectedItems={selectedItemsContent}
      />
      <ItemsList
        getItemProps={getItemProps}
        getMenuProps={getMenuProps}
        highlightedIndex={highlightedIndex}
        isOpen={isOpen}
        items={getFilteredItems(displayItems)}
        itemToString={itemToString}
      />
    </DownshiftSelectContainer>
  );
}
