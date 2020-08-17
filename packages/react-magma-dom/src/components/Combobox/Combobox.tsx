import * as React from 'react';
import { instanceOfDefaultItemObject } from '../DownshiftSelect';
import { useCombobox } from 'downshift';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { defaultComponents } from '../DownshiftSelect/components';
import { DownshiftSelectContainer } from '../DownshiftSelect/SelectContainer';
import { ItemsList } from '../DownshiftSelect/ItemsList';
import { ComboboxInput } from './ComboboxInput';
import { ButtonSize, ButtonVariant } from '../Button';
import { useComboboxItems } from './shared';
import { DownshiftComboboxInterface } from '.';

export function InternalCombobox<T>(props: DownshiftComboboxInterface<T>) {
  const {
    ariaDescribedBy,
    components: customComponents,
    defaultItems,
    disableCreateItem,
    hasError,
    inputStyle,
    isClearable,
    isDisabled,
    isLabelVisuallyHidden,
    isLoading,
    isInverse,
    items,
    itemToString,
    labelStyle,
    labelText,
    newItemTransform,
    onInputBlur,
    onInputChange,
    onInputFocus,
    onInputKeyDown,
    onInputKeyPress,
    onInputKeyUp,
    onInputValueChange,
    onItemCreated,
    placeholder
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
        ? onItemCreated(newItem)
        : updateItemsRef(newItem);

      selectItem(newItem);

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
      case useCombobox.stateChangeTypes.InputBlur:
        return {
          ...changes,
          inputValue:
            state.inputValue && !state.selectedItem
              ? ''
              : itemToString(state.selectedItem),
          selectedItem: state.selectedItem ? state.selectedItem : ''
        };
      case useCombobox.stateChangeTypes.FunctionReset:
        return {
          ...changes,
          inputValue: changes.selectedItem
            ? itemToString(changes.selectedItem)
            : ''
        };
      default:
        return changes;
    }
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
    onSelectedItemChange: defaultOnSelectedItemChange,
    stateReducer
  });

  const { ClearIndicator } = defaultComponents({
    ...customComponents
  });

  const toggleButtonRef = React.useRef<HTMLDivElement>();

  function defaultHandleClearIndicatorClick(event: React.SyntheticEvent) {
    event.stopPropagation();

    if (toggleButtonRef.current) {
      toggleButtonRef.current.focus();
    }

    reset();
  }

  return (
    <DownshiftSelectContainer
      getLabelProps={getLabelProps}
      hasError={hasError}
      isLabelVisuallyHidden={isLabelVisuallyHidden}
      isInverse={isInverse}
      labelStyle={labelStyle}
      labelText={labelText}
    >
      <ComboboxInput
        ariaDescribedBy={ariaDescribedBy}
        customComponents={customComponents}
        getComboboxProps={getComboboxProps}
        getInputProps={getInputProps}
        getToggleButtonProps={getToggleButtonProps}
        inputStyle={inputStyle}
        isDisabled={isDisabled}
        isInverse={isInverse}
        isLoading={isLoading}
        hasError={hasError}
        onInputBlur={onInputBlur}
        onInputFocus={onInputFocus}
        onInputKeyDown={onInputKeyDown}
        onInputKeyPress={onInputKeyPress}
        onInputKeyUp={onInputKeyUp}
        placeholder={placeholder}
        ref={toggleButtonRef}
      >
        {isClearable && selectedItem && (
          <ClearIndicator
            aria-label={`reset selection for ${labelText}.  ${itemToString(
              selectedItem
            )} is selected`}
            icon={<CrossIcon size={10} />}
            onClick={defaultHandleClearIndicatorClick}
            size={ButtonSize.small}
            style={{ margin: '0 5px' }}
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
