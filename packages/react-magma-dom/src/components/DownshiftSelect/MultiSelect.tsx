import * as React from 'react';
import { DownshiftOption, DownshiftMultiSelectInterface } from '.';
import {
  useSelect,
  useMultipleSelection,
  UseMultipleSelectionProps
} from 'downshift';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { ItemsList } from './ItemsList';
import { DownshiftSelectContainer } from './SelectContainer';
import { SelectTriggerButton } from './SelectTriggerButton';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';

const SelectedItemButton = styled.button`
  background: ${props => props.theme.colors.neutral06};
  border-radius: 2px;
  border: 0;
  box-shadow: 0 0 0;
  font-size: 12px;
  line-height: 17px;
  margin: 0 5px 0 0;
  padding: 3px 5px;
`;

const IconWrapper = styled.span`
  padding-left: 5px;
`;

export function MultiSelect<T>(props: DownshiftMultiSelectInterface<T>) {
  const {
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

  const theme = React.useContext(ThemeContext);

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
              theme={theme}
            >
              {multiSelectedItem}
              <IconWrapper>
                <CrossIcon size={8} />
              </IconWrapper>
            </SelectedItemButton>
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
