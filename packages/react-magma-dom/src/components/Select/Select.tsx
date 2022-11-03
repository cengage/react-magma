import * as React from 'react';
import { SelectProps } from '.';
import { useSelect } from 'downshift';
import { SelectText } from './shared';
import { defaultComponents } from './components';
import { CloseIcon } from 'react-magma-icons';
import { ButtonSize, ButtonVariant } from '../Button';
import { ItemsList } from './ItemsList';
import { SelectContainer } from './SelectContainer';
import { SelectTriggerButton } from './SelectTriggerButton';
import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';
import { useForkedRef } from '../../utils';

export function Select<T>(props: SelectProps<T>) {
  const {
    ariaDescribedBy,
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
  } = props;

  const toggleButtonRef = React.useRef<HTMLButtonElement>();
  const theme = React.useContext(ThemeContext);
  const i18n = React.useContext(I18nContext);

  const ref = useForkedRef(innerRef || null, toggleButtonRef);

  function getValidItem(itemToCheck: T, key: string): object {
    return items.findIndex(
      i => itemToString(i) === itemToString(itemToCheck)
    ) !== -1
      ? { [key]: itemToCheck }
      : { [key]: null };
  }

  function handleOnIsOpenChange(changes) {
    const { isOpen: changedIsOpen, selectedItem: changedSelectedItem } =
      changes;

    if (changedIsOpen && changedSelectedItem) {
      setHighlightedIndex(
        items.findIndex(
          i => itemToString(i) === itemToString(changedSelectedItem)
        )
      );
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
    onKeyDown: event => {
      if (
        getToggleButtonProps().id === document.activeElement.id &&
        (event.key === 'Enter' || event.key === ' ')
      ) {
        event.preventDefault();
        openMenu();
      }

      onKeyDown && typeof onKeyDown === 'function' && onKeyDown(event);
    },
    onKeyPress,
    onKeyUp,
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

  return (
    <SelectContainer
      errorMessage={errorMessage}
      descriptionId={ariaDescribedBy}
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
        toggleButtonProps={toggleButtonProps}
        hasError={hasError}
        disabled={disabled}
        isInverse={isInverse}
        style={inputStyle}
      >
        <SelectText data-testid="selectedItemText">{selectText}</SelectText>
        {isClearable && selectedItem && (
          <ClearIndicator
            aria-label={clearIndicatorAriaLabel}
            icon={<CloseIcon size={theme.iconSizes.xSmall} />}
            onClick={defaultHandleClearIndicatorClick}
            size={ButtonSize.small}
            style={{ marginTop: '0', marginBottom: '0' }}
            testId="clearIndicator"
            variant={ButtonVariant.link}
          />
        )}
      </SelectTriggerButton>
      <ItemsList
        customComponents={customComponents}
        getItemProps={getItemProps}
        getMenuProps={getMenuProps}
        highlightedIndex={highlightedIndex}
        isOpen={isOpen}
        isInverse={isInverse}
        maxHeight={itemListMaxHeight || theme.select.menu.maxHeight}
        items={items}
        itemToString={itemToString}
        menuStyle={menuStyle}
      />
    </SelectContainer>
  );
}
