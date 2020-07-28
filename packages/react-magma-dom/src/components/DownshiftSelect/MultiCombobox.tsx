import * as React from 'react';
import {
  instanceOfDefaultItemObject,
  DownshiftOption,
  DownshiftMultiComboboxInterface
} from '.';
import {
  useCombobox,
  useMultipleSelection,
  UseMultipleSelectionProps
} from 'downshift';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { defaultComponents } from './components';
import { DownshiftSelectContainer } from './SelectContainer';
import { ItemsList } from './ItemsList';
import { ComboboxInput } from './ComboboxInput';
import { ButtonSize, ButtonVariant } from '../Button';
import { useComboboxItems } from './shared';

export function MultiCombobox<T>(props: DownshiftMultiComboboxInterface<T>) {
  const [inputValue, setInputValue] = React.useState('');
  const {
    components: customComponents,
    defaultItems,
    disableCreateItem,
    labelText,
    isLoading,
    items,
    itemToString,
    newItemTransform,
    onInputChange,
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

  function isCreatedItem(item) {
    return (
      !(typeof item === 'string') &&
      instanceOfDefaultItemObject(item) &&
      item.react_magma__created_item
    );
  }

  function getFilteredItems(unfilteredItems) {
    return unfilteredItems.filter(
      item =>
        (selectedItems.indexOf(item) < 0 &&
          itemToString(item)
            .toLowerCase()
            .startsWith(inputValue.toLowerCase())) ||
        isCreatedItem(item)
    );
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
        typeof newItemTransform === 'function' &&
        newItemTransform(createdItem);

      items && onItemCreated && typeof onItemCreated === 'function'
        ? onItemCreated(newItem || createdItem)
        : updateItemsRef(newItem || createdItem);
      addSelectedItem(newItem);
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

  const { ClearIndicator } = defaultComponents({
    ...customComponents
  });

  return (
    <DownshiftSelectContainer
      getLabelProps={getLabelProps}
      labelText={labelText}
    >
      <ComboboxInput
        customComponents={customComponents}
        getComboboxProps={getComboboxProps}
        getInputProps={options => ({ ...getInputProps(getDropdownProps()) })}
        getToggleButtonProps={getToggleButtonProps}
        isLoading={isLoading}
      >
        {selectedItems &&
          selectedItems.map((multiSelectedItem, index) => (
            <span
              key={`selected-item-${index}`}
              {...getSelectedItemProps({
                selectedItem: multiSelectedItem,
                index
              })}
            >
              {multiSelectedItem}
              <ClearIndicator
                aria-label="reset item"
                icon={<CrossIcon size={10} />}
                onClick={event =>
                  handleRemoveSelectedItem(event, multiSelectedItem)
                }
                size={ButtonSize.small}
                variant={ButtonVariant.link}
              />
            </span>
          ))}
      </ComboboxInput>
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
