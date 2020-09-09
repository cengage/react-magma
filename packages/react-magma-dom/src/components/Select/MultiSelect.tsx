import * as React from 'react';
import { MultiSelectInterface } from '.';
import { useSelect, useMultipleSelection } from 'downshift';
import { CrossIcon } from 'react-magma-icons';
import { ItemsList } from './ItemsList';
import { SelectContainer } from './SelectContainer';
import { SelectTriggerButton } from './SelectTriggerButton';
import { SelectedItemButton, IconWrapper } from './shared';

import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';

export function MultiSelect<T>(props: MultiSelectInterface<T>) {
  const {
    ariaDescribedBy,
    hasError,
    inputStyle,
    isLabelVisuallyHidden,
    itemToString,
    items,
    labelStyle,
    labelText,
    isDisabled,
    isInverse,
    onBlur,
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onRemoveSelectedItem
  } = props;

  function checkSelectedItemValidity(itemToCheck) {
    return (
      items.findIndex(i => itemToString(i) === itemToString(itemToCheck)) !== -1
    );
  }

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
    setActiveIndex
  } = useMultipleSelection({
    ...props,
    ...(props.initialSelectedItems && {
      initialSelectedItems: props.initialSelectedItems.filter(
        checkSelectedItemValidity
      )
    }),
    ...(props.selectedItems && {
      selectedItems: props.selectedItems.filter(checkSelectedItemValidity)
    })
  });

  function getFilteredItems(unfilteredItems) {
    return unfilteredItems.filter(
      item =>
        selectedItems.findIndex(
          selectedItem => itemToString(selectedItem) === itemToString(item)
        ) < 0
    );
  }

  const {
    stateReducer: passedInStateReducer,
    onStateChange,
    ...selectProps
  } = props;

  function stateReducer(state, actionAndChanges) {
    const { type, changes } = actionAndChanges;
    switch (type) {
      case useSelect.stateChangeTypes.ToggleButtonKeyDownCharacter:
        return {
          ...changes,
          selectedItem: state.selectedItem
        };
      default:
        return changes;
    }
  }

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
    onSelectedItemChange: defaultOnSelectedItemChange,
    stateReducer
  });

  function defaultOnSelectedItemChange(changes) {
    const { selectedItem: newSelectedItem } = changes;

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
  const i18n = React.useContext(I18nContext);

  const toggleButtonProps = getToggleButtonProps({
    ...getDropdownProps({
      onBlur,
      onKeyDown: event => {
        if (
          document.activeElement.tagName.toLowerCase() === 'button' &&
          (event.key === 'Backspace' ||
            event.key === 'Delete' ||
            event.key === 'ArrowLeft')
        ) {
          event.nativeEvent.preventDownshiftDefault = true;
        }

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openMenu();
        }

        onKeyDown && typeof onKeyDown === 'function' && onKeyDown(event);
      },
      onKeyPress,
      onKeyUp,
      onFocus,
      preventKeyAction: isOpen
    }),
    disabled: isDisabled
  });

  return (
    <SelectContainer
      getLabelProps={getLabelProps}
      isLabelVisuallyHidden={isLabelVisuallyHidden}
      labelStyle={labelStyle}
      labelText={labelText}
      isInverse={isInverse}
    >
      <SelectTriggerButton
        ariaDescribedBy={ariaDescribedBy}
        toggleButtonProps={toggleButtonProps}
        hasError={hasError}
        isDisabled={isDisabled}
        isInverse={isInverse}
        style={inputStyle}
      >
        {selectedItems &&
          selectedItems.map((multiSelectedItem, index) => {
            const multiSelectedItemString = itemToString(multiSelectedItem);
            return (
              <SelectedItemButton
                aria-label={i18n.multiSelect.selectedItemButtonAriaLabel(
                  multiSelectedItemString
                )}
                key={`selected-item-${index}`}
                {...getSelectedItemProps({
                  selectedItem: multiSelectedItem,
                  index
                })}
                onClick={event =>
                  handleRemoveSelectedItem(event, multiSelectedItem)
                }
                onFocus={() => setActiveIndex(index)}
                theme={theme}
              >
                {multiSelectedItemString}
                <IconWrapper>
                  <CrossIcon size={8} />
                </IconWrapper>
              </SelectedItemButton>
            );
          })}
      </SelectTriggerButton>
      <ItemsList
        getItemProps={getItemProps}
        getMenuProps={getMenuProps}
        highlightedIndex={highlightedIndex}
        isOpen={isOpen}
        items={getFilteredItems(items)}
        itemToString={itemToString}
      />
    </SelectContainer>
  );
}
