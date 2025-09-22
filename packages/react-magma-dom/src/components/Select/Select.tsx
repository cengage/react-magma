import * as React from 'react';

import { autoUpdate } from '@floating-ui/react-dom';
import { useSelect } from 'downshift';
import { CloseIcon } from 'react-magma-icons';

import { I18nContext } from '../../i18n';
import { ThemeContext } from '../../theme/ThemeContext';
import { useForkedRef } from '../../utils';
import { ButtonSize, ButtonVariant } from '../Button';
import { defaultComponents } from './components';
import { ItemsList } from './ItemsList';
import { SelectContainer } from './SelectContainer';
import { SelectTriggerButton } from './SelectTriggerButton';
import { SelectText } from './shared';
import { isItemDisabled } from './utils';
import { useMagmaFloating } from '../../hooks/useMagmaFloating';

import { SelectProps } from '.';

export function Select<T>(props: SelectProps<T>) {
  const {
    additionalContent,
    ariaDescribedBy,
    components: customComponents,
    defaultSelectedItem,
    errorMessage,
    floatingElementStyles,
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

  const ref = useForkedRef(innerRef || null, toggleButtonRef);

  function isDisabledItemIndex(index) {
    return isItemDisabled(items[index]);
  }

  function getValidItem(itemToCheck: T, key: string): object {
    const itemIndex = items.findIndex(
      i => itemToString(i) === itemToString(itemToCheck)
    );

    if (
      itemIndex === -1 ||
      isItemDisabled(itemToCheck) ||
      isItemDisabled(items[itemIndex])
    ) {
      return { [key]: null };
    }

    return { [key]: itemToCheck };
  }

  function getValidItemIndex(indexToCheck: number) {
    if (isDisabledItemIndex(indexToCheck)) {
      return -1;
    } else {
      return indexToCheck;
    }
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

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    reset,
    openMenu,
    setHighlightedIndex,
  } = useSelect<T>({
    ...props,
    initialHighlightedIndex: getValidItemIndex(initialHighlightedIndex),
    onIsOpenChange: handleOnIsOpenChange,
    stateReducer,
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
    disabled: disabled,
    onBlur,
    onKeyDown: (event: any) => {
      if (
        getToggleButtonProps().id === document.activeElement.id &&
        (event.key === 'Enter' || event.key === ' ')
      ) {
        event.preventDefault();
        openMenu();
      }

      onKeyDown && typeof onKeyDown === 'function' && onKeyDown?.(event);
    },
    onKeyPress: (event: any) => onKeyPress?.(event),
    onKeyUp: (event: any) => onKeyUp?.(event),
    onFocus,
    ref,
  });

  function defaultHandleClearIndicatorClick(event: React.SyntheticEvent) {
    event.stopPropagation();

    if (toggleButtonRef.current) {
      toggleButtonRef.current.focus();
    }

    reset();
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
    <SelectContainer
      additionalContent={additionalContent}
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
          icon={<CloseIcon size={theme.iconSizes.xSmall} />}
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
        isOpen={isOpen}
        items={items}
        itemToString={itemToString}
        maxHeight={itemListMaxHeight ?? theme.select.menu.maxHeight}
        menuStyle={menuStyle}
        setFloating={refs.setFloating}
        setHighlightedIndex={setHighlightedIndex}
      />
    </SelectContainer>
  );
}
