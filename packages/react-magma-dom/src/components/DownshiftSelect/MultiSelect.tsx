import * as React from 'react';
import { DownshiftOption, DownshiftMultiSelectInterface } from '.';
import {
  useSelect,
  useMultipleSelection,
  UseMultipleSelectionProps
} from 'downshift';
import { defaultComponents } from './components';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { ButtonSize, ButtonVariant } from '../Button';
import { ItemsList } from './ItemsList';
import { DownshiftSelectContainer } from './SelectContainer';
import { SelectTriggerButton } from './SelectTriggerButton';

export function MultiSelect<T>(props: DownshiftMultiSelectInterface<T>) {
  const {
    components: customComponents,
    itemToString,
    items,
    labelText,
    isDisabled,
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

  function getFilteredItems(unfilteredItems) {
    return unfilteredItems.filter(item => selectedItems.indexOf(item) < 0);
  }

  const { stateReducer, onStateChange, ...selectProps } = props;

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    selectItem,
    openMenu
  } = useSelect({
    ...selectProps,
    items: getFilteredItems(items),
    onSelectedItemChange: defaultOnSelectedItemChange
  });

  function defaultOnSelectedItemChange({ selectedItem: newSelectedItem }) {
    if (newSelectedItem) {
      addSelectedItem(newSelectedItem);
      selectItem(null);
    }
  }

  function handleRemoveSelectedItem(event: React.SyntheticEvent, selectedItem) {
    event.stopPropagation();

    onRemoveSelectedItem && typeof onRemoveSelectedItem === 'function'
      ? onRemoveSelectedItem(selectedItem)
      : removeSelectedItem(selectedItem);
  }

  const { ClearIndicator } = defaultComponents({ ...customComponents });

  return (
    <DownshiftSelectContainer
      getLabelProps={getLabelProps}
      labelText={labelText}
    >
      <SelectTriggerButton
        toggleButtonProps={...getToggleButtonProps({
          ...getDropdownProps(),
          disabled: isDisabled,
          onKeyDown: event => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              openMenu();
            }
          }
        })}
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
      </SelectTriggerButton>
      <ItemsList
        getItemProps={getItemProps}
        getMenuProps={getMenuProps}
        highlightedIndex={highlightedIndex}
        isOpen={isOpen}
        items={getFilteredItems(items)}
        itemToString={itemToString}
      />
    </DownshiftSelectContainer>
  );
}
