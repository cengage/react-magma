import * as React from 'react';

import { autoUpdate } from '@floating-ui/react-dom';
import type { UseSelectState, UseSelectStateChangeOptions } from 'downshift';
import { CloseOutlinedIcon } from 'react-magma-icons';

import { useForkedRef } from '../../utils';
import {
  useSelect,
  DownshiftSelectStateChangeTypes,
} from '../../utils/downshift';
import { ButtonSize, ButtonVariant } from '../Button';
import { ClearAnnouncer } from './ClearAnnouncer';
import { defaultComponents } from './components';
import { ItemListAnnouncer } from './ItemListAnnouncer';
import { ItemsList } from './ItemsList';
import { SelectContainer } from './SelectContainer';
import { SelectTriggerButton } from './SelectTriggerButton';
import { SelectText } from './shared';
import { findItemIndex, getItemKey, isItemDisabled } from './utils';
import { useMagmaFloating } from '../../hooks/useMagmaFloating';
import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';

import { SelectProps } from '.';

export function Select<T>(props: SelectProps<T>) {
  const {
    additionalContent,
    ariaDescribedBy,
    ariaLabel,
    components: customComponents,
    defaultSelectedItem,
    errorMessage,
    hasError,
    helperMessage,
    inputStyle,
    isLabelVisuallyHidden,
    innerRef,
    itemListMaxHeight,
    itemToString,
    items,
    labelStyle,
    labelText,
    initialSelectedItem,
    isClearable,
    disabled,
    isInverse,
    labelPosition,
    labelWidth,
    menuStyle,
    onBlur,
    onFocus,
    onIsOpenChange,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    messageStyle,
    placeholder,
    selectedItem: passedInSelectedItem,
    initialHighlightedIndex,
  } = props;

  const toggleButtonRef = React.useRef<HTMLButtonElement>();
  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);
  const [clearAnnouncement, setClearAnnouncement] = React.useState('');

  const ref = useForkedRef(innerRef || null, toggleButtonRef);

  function itemDisabled(item: T, index?: number) {
    if (item == null) {
      return false;
    }

    return props.isItemDisabled
      ? props.isItemDisabled(
          item,
          index ??
            findItemIndex(items, item, itemToString, undefined, props.itemToKey)
        )
      : isItemDisabled(item);
  }

  function getValidItem(itemToCheck: T, key: string): object {
    const itemIndex = findItemIndex(
      items,
      itemToCheck,
      itemToString,
      undefined,
      props.itemToKey
    );

    // Only reject items not in the list; a disabled item is still a valid selected value
    if (itemIndex === -1) {
      return { [key]: null };
    }

    return { [key]: itemToCheck };
  }

  function getValidItemIndex(indexToCheck: number) {
    if (itemDisabled(items[indexToCheck], indexToCheck)) {
      return -1;
    } else {
      return indexToCheck;
    }
  }

  function stateReducer(
    state: UseSelectState<T>,
    actionAndChanges: UseSelectStateChangeOptions<T>
  ) {
    const { type } = actionAndChanges;
    let { changes } = actionAndChanges;

    if (!state.isOpen && changes.isOpen) {
      changes = {
        ...changes,
        highlightedIndex: state.selectedItem
          ? itemDisabled(state.selectedItem)
            ? -1
            : findItemIndex(
                items,
                state.selectedItem,
                itemToString,
                undefined,
                props.itemToKey
              )
          : (initialHighlightedIndex >= 0 ||
                props.defaultHighlightedIndex >= 0) &&
              changes.highlightedIndex >= 0
            ? changes.highlightedIndex
            : items.findIndex((item, index) => !itemDisabled(item, index)),
      };
    }

    switch (type) {
      case DownshiftSelectStateChangeTypes.ToggleButtonBlur:
        return {
          ...changes,
          selectedItem: state.selectedItem,
        };
      case DownshiftSelectStateChangeTypes.ToggleButtonKeyDownCharacter:
        return {
          ...changes,
          selectedItem: state.selectedItem,
          isOpen: state.isOpen,
        };
      case DownshiftSelectStateChangeTypes.ItemClick:
      case DownshiftSelectStateChangeTypes.ToggleButtonKeyDownEnter:
        if (itemDisabled(changes.selectedItem)) {
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

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    reset,
  } = useSelect<T>({
    ...props,
    initialHighlightedIndex: getValidItemIndex(initialHighlightedIndex),
    isItemDisabled: itemDisabled,
    itemToKey: props.itemToKey || getItemKey,
    navigationMode:
      props.navigationMode ??
      (props.circularNavigation === false ? 'bounded' : 'circular'),
    onIsOpenChange,
    internalStateReducer: stateReducer,
    native: props.downshift?.select,
    userStateReducer: props.stateReducer,
    ...(defaultSelectedItem &&
      getValidItem(defaultSelectedItem, 'defaultSelectedItem')),
    ...(initialSelectedItem &&
      getValidItem(initialSelectedItem, 'initialSelectedItem')),
    ...(passedInSelectedItem &&
      getValidItem(passedInSelectedItem, 'selectedItem')),
  });

  const { ClearIndicator } = defaultComponents<T>({
    ...customComponents,
  });

  const toggleButtonProps = getToggleButtonProps({
    // Label the combobox by its label only; the selected value is already exposed as the combobox value
    'aria-labelledby': getLabelProps().id,
    disabled: disabled,
    onBlur,
    onKeyDown: (event: React.KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        event.nativeEvent.stopImmediatePropagation();
      }

      onKeyDown?.(event);
    },
    onKeyPress: (event: React.KeyboardEvent<HTMLElement>) =>
      onKeyPress?.(event),
    onKeyUp: (event: React.KeyboardEvent<HTMLElement>) => onKeyUp?.(event),
    onFocus,
    ref,
  });

  function defaultHandleClearIndicatorClick(event: React.SyntheticEvent) {
    event.stopPropagation();

    if (toggleButtonRef.current) {
      toggleButtonRef.current.focus();
    }

    reset();

    setClearAnnouncement(
      i18n.select.clearAnnounce.replace(/\{labelText\}/g, labelText)
    );

    // Clear the announcement after a delay to allow for re-announcements
    setTimeout(() => {
      setClearAnnouncement('');
    }, 1000);
  }

  const clearIndicatorAriaLabel = i18n.select.clearIndicatorAriaLabel
    .replace(/\{labelText\}/g, labelText)
    .replace(/\{selectedItem\}/g, itemToString(selectedItem));

  const selectText = itemToString(selectedItem)
    ? itemToString(selectedItem)
    : typeof placeholder === 'string'
      ? placeholder
      : i18n.select.placeholder;

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
    <>
      <SelectContainer
        additionalContent={additionalContent}
        ariaLabel={ariaLabel}
        descriptionId={ariaDescribedBy}
        errorMessage={errorMessage}
        getLabelProps={getLabelProps}
        helperMessage={helperMessage}
        isInverse={isInverse}
        isLabelVisuallyHidden={isLabelVisuallyHidden}
        labelPosition={labelPosition}
        labelStyle={labelStyle}
        labelText={labelText}
        labelWidth={labelWidth}
        messageStyle={messageStyle}
      >
        <SelectTriggerButton
          ariaDescribedBy={ariaDescribedBy}
          customComponents={customComponents}
          disabled={disabled}
          hasError={hasError}
          isInverse={isInverse}
          setReference={refs.setReference}
          style={inputStyle}
          toggleButtonProps={toggleButtonProps}
        >
          <SelectText
            data-testid="selectedItemText"
            isClearable={isClearable}
            isShowPlaceholder={!selectedItem}
            isInverse={isInverse}
            isDisabled={disabled}
            theme={theme}
          >
            {selectText}
          </SelectText>
        </SelectTriggerButton>

        {isClearable && selectedItem && (
          <ClearIndicator
            aria-label={clearIndicatorAriaLabel}
            icon={<CloseOutlinedIcon size={theme.iconSizes.xSmall} />}
            onClick={defaultHandleClearIndicatorClick}
            isInverse={isInverse}
            size={ButtonSize.small}
            style={{
              position: 'absolute',
              right: '3.25em',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            testId="clearIndicator"
            variant={ButtonVariant.link}
          />
        )}

        <ItemsList
          customComponents={customComponents}
          floatingElementStyles={floatingElementStyles}
          getItemProps={getItemProps}
          getMenuProps={getMenuProps}
          highlightedIndex={highlightedIndex}
          isInverse={isInverse}
          isItemDisabled={itemDisabled}
          isOpen={isOpen}
          items={items}
          itemToString={itemToString}
          itemToKey={props.itemToKey}
          maxHeight={itemListMaxHeight ?? theme.select.menu.maxHeight}
          menuStyle={menuStyle}
          setFloating={refs.setFloating}
          selectedItem={selectedItem}
        />
      </SelectContainer>

      {!props.downshift?.select?.getA11yStatusMessage && (
        <ItemListAnnouncer isOpen={isOpen} labelText={labelText} />
      )}
      {isClearable && !props.downshift?.select?.getA11yStatusMessage && (
        <ClearAnnouncer clearAnnouncement={clearAnnouncement} />
      )}
    </>
  );
}
