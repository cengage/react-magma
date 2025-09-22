import * as React from 'react';

import { autoUpdate } from '@floating-ui/react-dom';
import { useMultipleSelection, useSelect } from 'downshift';
import { CloseIcon } from 'react-magma-icons';

import { defaultComponents } from './components';
import { ItemsList } from './ItemsList';
import { SelectContainer } from './SelectContainer';
import { SelectTriggerButton } from './SelectTriggerButton';
import { IconWrapper, SelectedItemButton, SelectText } from './shared';
import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { useForkedRef } from '../../utils';
import { ButtonSize, ButtonVariant } from '../Button';
import { isItemDisabled } from './utils';
import { useMagmaFloating } from '../../hooks/useMagmaFloating';

import { instanceOfDefaultItemObject, MultiSelectProps } from '.';

export function MultiSelect<T>(props: MultiSelectProps<T>) {
  const {
    additionalContent,
    ariaDescribedBy,
    components: customComponents,
    errorMessage,
    hasError,
    helperMessage,
    inputStyle,
    isLabelVisuallyHidden,
    innerRef,
    itemToString,
    items,
    labelPosition,
    labelStyle,
    labelText,
    labelWidth,
    disabled,
    isInverse,
    itemListMaxHeight,
    menuStyle,
    messageStyle,
    onBlur,
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onRemoveSelectedItem,
    placeholder,
    isClearable,
    initialHighlightedIndex,
  } = props;

  function checkSelectedItemValidity(itemToCheck: T) {
    const itemIndex = items.findIndex(
      i => itemToString(i) === itemToString(itemToCheck)
    );

    return (
      !isItemDisabled(itemToCheck) &&
      itemIndex !== -1 &&
      !isItemDisabled(items[itemIndex])
    );
  }

  function getFilteredItemIndex(item: T, filteredItems: T[]) {
    const index = filteredItems.findIndex(
      filteredItem => itemToString(filteredItem) === itemToString(item)
    );

    if (isItemDisabled(filteredItems[index])) {
      return -1;
    }
    return index;
  }

  function handleOnIsOpenChange(changes) {
    const { isOpen: changedIsOpen, selectedItem: changedSelectedItem } =
      changes;

    if (changedIsOpen && changedSelectedItem) {
      if (isItemDisabled(changedSelectedItem)) {
        setHighlightedIndex(-1);
      } else {
        setHighlightedIndex(
          items.findIndex(
            i => itemToString(i) === itemToString(changedSelectedItem)
          )
        );
      }
    }

    onIsOpenChange &&
      typeof onIsOpenChange === 'function' &&
      onIsOpenChange(changes);
  }

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
    setActiveIndex,
    reset,
  } = useMultipleSelection<T>({
    ...props,
    ...(props.initialSelectedItems && {
      initialSelectedItems: props.initialSelectedItems.filter(
        checkSelectedItemValidity
      ),
    }),
    ...(props.selectedItems && {
      selectedItems: props.selectedItems.filter(checkSelectedItemValidity),
    }),
    ...(props.defaultSelectedItems && {
      defaultSelectedItems: props.defaultSelectedItems.filter(
        checkSelectedItemValidity
      ),
    }),
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
    onIsOpenChange,
    ...selectProps
  } = props;

  function stateReducer(state, actionAndChanges) {
    const { type, changes } = actionAndChanges;
    switch (type) {
      case useSelect.stateChangeTypes.ToggleButtonKeyDownCharacter:
        return {
          ...changes,
          selectedItem: state.selectedItem,
        };
      case useSelect.stateChangeTypes.ItemClick:
      case useSelect.stateChangeTypes.MenuKeyDownEnter:
        if (isItemDisabled(changes.selectedItem)) {
          return {
            ...changes,
            selectedItem: state.selectedItem,
          };
        }
        return changes;
      default:
        return changes;
    }
  }

  const filteredItems = getFilteredItems(items);
  const initialIndex = getFilteredItemIndex(
    items[initialHighlightedIndex],
    filteredItems
  );

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    selectItem,
    openMenu,
    setHighlightedIndex,
  } = useSelect({
    ...selectProps,
    items: filteredItems,
    onSelectedItemChange: defaultOnSelectedItemChange,
    stateReducer,
    initialHighlightedIndex: initialIndex,
    onIsOpenChange: handleOnIsOpenChange,
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

  const toggleButtonRef = React.useRef<HTMLButtonElement>();
  const forkedtoggleButtonRef = useForkedRef(innerRef || null, toggleButtonRef);

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

        onKeyDown && typeof onKeyDown === 'function' && onKeyDown?.(event);
      },
      onKeyPress: (event: any) => onKeyPress?.(event),
      onKeyUp: (event: any) => onKeyUp?.(event),
      onFocus,
      preventKeyAction: isOpen,
      ...(forkedtoggleButtonRef && { ref: forkedtoggleButtonRef }),
    }),
    disabled: disabled,
  });

  const { ClearIndicator } = defaultComponents<T>({
    ...customComponents,
  });

  function itemsArrayToString(itemsArray: any[]) {
    const allItems = [];
    itemsArray.map(item => {
      if (typeof item === 'string') {
        allItems.push(item);
      } else if (instanceOfDefaultItemObject(item)) {
        allItems.push(item.label);
      }
    });

    return allItems.join(', ');
  }

  const clearIndicatori18n =
    selectedItems.length > 1
      ? i18n.select.multi.clearIndicatorAriaLabel
      : i18n.select.clearIndicatorAriaLabel;

  const clearIndicatorAriaLabel = clearIndicatori18n
    .replace(/\{labelText\}/g, labelText)
    .replace(/\{selectedItem\}/g, itemsArrayToString(selectedItems));

  function defaultHandleClearIndicatorClick(event: React.SyntheticEvent) {
    event.stopPropagation();

    if (toggleButtonRef.current) {
      toggleButtonRef.current.focus();
    }

    reset();
  }

  const { floatingStyles, refs, elements, update } = useMagmaFloating();

  React.useEffect(() => {
    const referenceSelectButton = elements.reference;
    const floatingItemsList = elements.floating;

    if (isOpen && referenceSelectButton && floatingItemsList) {
      return autoUpdate(referenceSelectButton, floatingItemsList, update);
    }
  }, [isOpen, elements, update]);

  const floatingElementStyles = { ...floatingStyles, width: '100%' };

  return (
    <SelectContainer
      additionalContent={additionalContent}
      descriptionId={ariaDescribedBy}
      errorMessage={errorMessage}
      getLabelProps={getLabelProps}
      helperMessage={helperMessage}
      isLabelVisuallyHidden={isLabelVisuallyHidden}
      labelPosition={labelPosition}
      labelStyle={labelStyle}
      labelText={labelText}
      labelWidth={labelWidth}
      isInverse={isInverse}
      messageStyle={messageStyle}
    >
      <SelectTriggerButton
        ariaDescribedBy={ariaDescribedBy}
        toggleButtonProps={toggleButtonProps}
        hasError={hasError}
        disabled={disabled}
        isInverse={isInverse}
        setReference={refs.setReference}
        style={inputStyle}
      >
        {selectedItems && selectedItems.length > 0 ? (
          selectedItems.map((multiSelectedItem, index) => {
            const multiSelectedItemString = itemToString(multiSelectedItem);
            return (
              <SelectedItemButton
                aria-label={i18n.multiSelect.selectedItemButtonAriaLabel.replace(
                  /\{selectedItem\}/g,
                  multiSelectedItemString
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
                disabled={disabled}
              >
                {multiSelectedItemString}
                <IconWrapper>
                  <CloseIcon size={theme.iconSizes.xSmall} />
                </IconWrapper>
              </SelectedItemButton>
            );
          })
        ) : (
          <SelectText
            isShowPlaceholder
            isInverse={isInverse}
            isDisabled={disabled}
            theme={theme}
          >
            {typeof placeholder === 'string'
              ? placeholder
              : i18n.multiSelect.placeholder}
          </SelectText>
        )}
      </SelectTriggerButton>

      {isClearable && selectedItems?.length > 0 && (
        <ClearIndicator
          aria-label={clearIndicatorAriaLabel}
          icon={<CloseIcon size={theme.iconSizes.xSmall} />}
          isInverse={isInverse}
          onClick={defaultHandleClearIndicatorClick}
          size={ButtonSize.small}
          variant={ButtonVariant.link}
          disabled={disabled}
          testId="clearIndicator"
          style={{
            position: 'absolute',
            right: '3.25em',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      )}
      <ItemsList
        customComponents={customComponents}
        floatingElementStyles={floatingElementStyles}
        getItemProps={getItemProps}
        getMenuProps={getMenuProps}
        highlightedIndex={highlightedIndex}
        isOpen={isOpen}
        isInverse={isInverse}
        items={getFilteredItems(items)}
        itemToString={itemToString}
        maxHeight={itemListMaxHeight ?? theme.select.menu.maxHeight}
        menuStyle={menuStyle}
        setFloating={refs.setFloating}
        setHighlightedIndex={setHighlightedIndex}
      />
    </SelectContainer>
  );
}
