import * as React from 'react';
import { instanceOfDefaultItemObject, MultiSelectProps } from '.';
import { useSelect, useMultipleSelection } from 'downshift';
import { CloseIcon } from 'react-magma-icons';
import { ItemsList } from './ItemsList';
import { SelectContainer } from './SelectContainer';
import { SelectTriggerButton } from './SelectTriggerButton';
import { SelectText, SelectedItemButton, IconWrapper } from './shared';

import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';
import { ButtonSize, ButtonVariant } from '../Button';
import { defaultComponents } from './components';

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
  } = props;

  function checkSelectedItemValidity(itemToCheck: T) {
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
          selectedItem: state.selectedItem,
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
    openMenu,
  } = useSelect({
    ...selectProps,
    items: getFilteredItems(items),
    onSelectedItemChange: defaultOnSelectedItemChange,
    stateReducer,
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

        onKeyDown && typeof onKeyDown === 'function' && onKeyDown?.(event);
      },
      onKeyPress: (event: any) => onKeyPress?.(event),
      onKeyUp: (event: any) => onKeyUp?.(event),
      onFocus,
      preventKeyAction: isOpen,
      ...(innerRef && { ref: innerRef }),
    }),
    disabled: disabled,
  });

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

  const toggleButtonRef = React.useRef<HTMLButtonElement>();

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
              >
                {multiSelectedItemString}
                <IconWrapper>
                  <CloseIcon size={theme.iconSizes.xSmall} />
                </IconWrapper>
              </SelectedItemButton>
            );
          })
        ) : typeof placeholder === 'string' ? (
          <SelectText>{placeholder}</SelectText>
        ) : (
          <SelectText>{i18n.multiSelect.placeholder}</SelectText>
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
            right: '2.75em',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
      )}
      <ItemsList
        customComponents={customComponents}
        getItemProps={getItemProps}
        getMenuProps={getMenuProps}
        highlightedIndex={highlightedIndex}
        isOpen={isOpen}
        isInverse={isInverse}
        items={getFilteredItems(items)}
        itemToString={itemToString}
        maxHeight={itemListMaxHeight || theme.select.menu.maxHeight}
        menuStyle={menuStyle}
      />
    </SelectContainer>
  );
}
