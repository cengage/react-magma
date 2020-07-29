import * as React from 'react';
import { DownshiftComboboxInterface, instanceOfDefaultItemObject } from '.';
import { useCombobox } from 'downshift';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { defaultComponents } from './components';
import { DownshiftSelectContainer } from './SelectContainer';
import { ItemsList } from './ItemsList';
import { ComboboxInput } from './ComboboxInput';
import { ButtonSize, ButtonVariant } from '../Button';
import { useComboboxItems } from './shared';

// When creating an item, without the items prop being controlled, give a console warning saying that you now have no control over the items list
// When typing and there are no options, show no options item that can't be chosen
// onBlur, show selectedItem
// isDisabled

export function Combobox<T>(props: DownshiftComboboxInterface<T>) {
  const {
    components: customComponents,
    defaultItems,
    disableCreateItem,
    labelText,
    isClearable,
    isLoading,
    items,
    itemToString,
    newItemTransform,
    onInputChange,
    onInputValueChange,
    onItemCreated
  } = props;

  function defaultNewItemTransform(newItem) {
    return newItem.value;
  }

  function defaultOnSelectedItemChange(changes) {
    if (
      !(typeof changes.selectedItem === 'string') &&
      instanceOfDefaultItemObject(changes.selectedItem) &&
      changes.selectedItem.react_magma__created_item
    ) {
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
      selectItem(newItem);
    }

    props.onSelectedItemChange &&
      typeof props.onSelectedItemChange === 'function' &&
      props.onSelectedItemChange(changes);
  }

  const [
    displayItems,
    setDisplayItems,
    updateItemsRef,
    defaultOnInputValueChange
  ] = useComboboxItems(defaultItems, items, {
    itemToString,
    disableCreateItem,
    onInputChange
  });

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
    selectedItem
  } = useCombobox({
    ...props,
    itemToString,
    items: displayItems,
    onInputValueChange:
      onInputValueChange && typeof onInputValueChange === 'function'
        ? changes => onInputValueChange(changes, setDisplayItems)
        : defaultOnInputValueChange,
    onSelectedItemChange: defaultOnSelectedItemChange
  });

  const { ClearIndicator } = defaultComponents({
    ...customComponents
  });

  function defaultHandleClearIndicatorClick(event: React.SyntheticEvent) {
    event.stopPropagation();

    reset();
  }

  return (
    <DownshiftSelectContainer
      getLabelProps={getLabelProps}
      labelText={labelText}
    >
      <ComboboxInput
        customComponents={customComponents}
        getComboboxProps={getComboboxProps}
        getInputProps={getInputProps}
        getToggleButtonProps={getToggleButtonProps}
        isLoading={isLoading}
      >
        {isClearable && selectedItem && (
          <ClearIndicator
            aria-label="reset"
            icon={<CrossIcon size={10} />}
            onClick={defaultHandleClearIndicatorClick}
            size={ButtonSize.small}
            variant={ButtonVariant.link}
          />
        )}
      </ComboboxInput>
      <ItemsList
        getItemProps={getItemProps}
        getMenuProps={getMenuProps}
        highlightedIndex={highlightedIndex}
        isOpen={isOpen}
        items={displayItems}
        itemToString={itemToString}
      />
    </DownshiftSelectContainer>
  );
}
