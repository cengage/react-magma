import * as React from 'react';
import { instanceOfDefaultItemObject } from '../Select';
import { useCombobox, useMultipleSelection } from 'downshift';
import { CloseIcon } from 'react-magma-icons';
import { defaultComponents } from '../Select/components';
import { SelectContainer } from '../Select/SelectContainer';
import { ItemsList } from '../Select/ItemsList';
import { ComboboxInput } from './ComboboxInput';
import { IconWrapper, SelectedItemButton } from '../Select/shared';
import { defaultOnInputValueChange, useComboboxItems } from './shared';
import { useForkedRef } from '../../utils';

import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';
import { MultiComboboxProps } from '.';
import { ButtonShape, ButtonSize, ButtonType, ButtonVariant } from '../Button';

export function MultiCombobox<T>(props: MultiComboboxProps<T>) {
  const [inputValue, setInputValue] = React.useState('');
  const {
    ariaDescribedBy,
    arrowDropDirection,
    components: customComponents,
    defaultItems,
    disableCreateItem,
    errorMessage,
    floatingStyles,
    hasError,
    hasPersistentMenu = false,
    helperMessage,
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
    onRemoveSelectedItem,
    setReference,
    setFloating,
    placeholder,
    toggleButtonRef,
  } = props;

  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const [allItems, displayItems, setDisplayItems, updateItemsRef] =
    useComboboxItems(defaultItems, items);

  function checkSelectedItemValidity(itemToCheck) {
    // When using Typeahead, don't validate the items
    if (isTypeahead) {
      return allItems;
    }
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
    reset,
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

    if (changes.selectedItem) {
      selectItem(null);
      setInputValue('');
    }
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
        const newSelectedItem =
          getFilteredItems(displayItems)[state.highlightedIndex];
        return {
          ...changes,
          ...(newSelectedItem && {
            selectedItem: newSelectedItem,
          }),
          inputValue: '',
          isOpen: changes.isOpen,
        };
      }
      case useCombobox.stateChangeTypes.ItemClick:
        return {
          ...changes,
          inputValue: '',
        };
      case useCombobox.stateChangeTypes.InputBlur:
        return {
          ...changes,
          inputValue: '',
          selectedItem: state.selectedItem ? state.selectedItem : '',
        };
      case useCombobox.stateChangeTypes.InputKeyDownEscape:
      case useCombobox.stateChangeTypes.ToggleButtonClick:
        return {
          ...changes,
          isOpen: changes.isOpen,
        };
      default:
        return {
          ...changes,
          isOpen: hasPersistentMenu || changes.isOpen,
        };
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

  const { ClearIndicator } = defaultComponents<T>({
    ...customComponents,
  });

  function itemsArrayToString(itemsArray: any[]) {
    let allItems = [];
    itemsArray.map(item => {
      if (typeof item === 'string') {
        allItems.push(item);
      } else if (instanceOfDefaultItemObject(item)) {
        allItems.push(item.label);
      }
    });

    return allItems.join(', ');
  }

  const inputRef = React.useRef<HTMLInputElement>();
  const ref = useForkedRef(innerRef || null, inputRef);

  const clearIndicatori18n =
    selectedItems.length > 1
      ? i18n.combobox.multi.clearIndicatorAriaLabel
      : i18n.combobox.clearIndicatorAriaLabel;

  const clearIndicatorAriaLabel = clearIndicatori18n
    .replace(/\{labelText\}/g, labelText)
    .replace(/\{selectedItem\}/g, itemsArrayToString(selectedItems));

  function defaultHandleClearIndicatorClick(event: React.SyntheticEvent) {
    event.stopPropagation();

    if (inputRef.current) {
      inputRef.current.focus();
    }

    reset();
  }

  const selectedItemsContent =
    selectedItems && selectedItems.length > 0 ? (
      <>
        {selectedItems.map((multiSelectedItem, index) => {
          return (
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
              disabled={disabled}
              onClick={event =>
                handleRemoveSelectedItem(event, multiSelectedItem)
              }
              onFocus={() => setActiveIndex(index)}
              theme={theme}
              isInverse={isInverse}
              type={ButtonType.button}
            >
              {itemToString(multiSelectedItem)}
              <IconWrapper>
                <CloseIcon size={theme.iconSizes.xSmall} />
              </IconWrapper>
            </SelectedItemButton>
          );
        })}
      </>
    ) : null;

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
        arrowDropDirection={arrowDropDirection}
        customComponents={customComponents}
        getComboboxProps={getComboboxProps}
        getInputProps={options => ({
          ...getInputProps({
            ...options,
            ...getDropdownProps({
              onKeyDown: handleOnKeyDown,
              ...(innerRef && { ref: innerRef }),
            }),
          }),
        })}
        getToggleButtonProps={getToggleButtonProps}
        inputStyle={inputStyle}
        disabled={disabled}
        isInverse={isInverse}
        isLoading={isLoading}
        isTypeahead={isTypeahead}
        hasError={hasError}
        innerRef={ref}
        onInputBlur={onInputBlur}
        onInputFocus={handleInputFocus}
        onInputKeyDown={handleOnKeyDown}
        onInputKeyPress={onInputKeyPress}
        onInputKeyUp={onInputKeyUp}
        placeholder={selectedItems.length > 0 ? null : placeholder}
        selectedItems={selectedItemsContent}
        setReference={setReference}
        toggleButtonRef={toggleButtonRef}
      >
        {isClearable && selectedItems?.length > 0 && (
          <ClearIndicator
            aria-label={clearIndicatorAriaLabel}
            icon={<CloseIcon />}
            isInverse={isInverse}
            onClick={defaultHandleClearIndicatorClick}
            shape={ButtonShape.fill}
            size={ButtonSize.small}
            variant={ButtonVariant.link}
            disabled={disabled}
          />
        )}
      </ComboboxInput>
      <ItemsList
        customComponents={customComponents}
        floatingStyles={floatingStyles}
        getItemProps={getItemProps}
        getMenuProps={getMenuProps}
        highlightedIndex={highlightedIndex}
        isInverse={isInverse}
        isOpen={isOpen}
        items={getFilteredItems(displayItems)}
        itemToString={itemToString}
        isLoading={isLoading && isTypeahead}
        maxHeight={itemListMaxHeight || theme.combobox.menu.maxHeight}
        menuStyle={{ ...menuStyle, position: 'static' }}
        setFloating={setFloating}
      />
    </SelectContainer>
  );
}
