import * as React from 'react';
import { DownshiftSelectInterface, DownshiftOption } from '.';
import { useSelect } from 'downshift';
import { SelectText } from './shared';
import { defaultComponents } from './components';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { ButtonSize, ButtonVariant } from '../Button';
import { ItemsList } from './ItemsList';
import { DownshiftSelectContainer } from './SelectContainer';
import { SelectTriggerButton } from './SelectTriggerButton';

export function Select<T>(props: DownshiftSelectInterface<T>) {
  const {
    ariaDescribedBy,
    components: customComponents,
    defaultSelectedItem,
    hasError,
    inputStyle,
    isLabelVisuallyHidden,
    itemToString,
    items,
    labelStyle,
    labelText,
    initialSelectedItem,
    isClearable,
    isDisabled,
    isInverse,
    onBlur,
    onFocus,
    onIsOpenChange,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    selectedItem: passedInSelectedItem
  } = props;

  const toggleButtonRef = React.useRef<HTMLButtonElement>();

  function getValidItem(itemToCheck: DownshiftOption<T>, key: string): object {
    return items.findIndex(
      i => itemToString(i) === itemToString(itemToCheck)
    ) !== -1
      ? { [key]: itemToCheck }
      : { [key]: null };
  }

  function handleOnIsOpenChange(changes) {
    const {
      isOpen: changedIsOpen,
      selectedItem: changedSelectedItem
    } = changes;

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
    setHighlightedIndex
  } = useSelect<DownshiftOption<T>>({
    ...props,
    onIsOpenChange: handleOnIsOpenChange,
    ...(defaultSelectedItem &&
      getValidItem(defaultSelectedItem, 'defaultSelectedItem')),
    ...(initialSelectedItem &&
      getValidItem(initialSelectedItem, 'initialSelectedItem')),
    ...(passedInSelectedItem &&
      getValidItem(passedInSelectedItem, 'selectedItem'))
  });

  const { ClearIndicator } = defaultComponents({ ...customComponents });

  const toggleButtonProps = getToggleButtonProps({
    disabled: isDisabled,
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
    ref: toggleButtonRef
  });

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
      isInverse={isInverse}
      isLabelVisuallyHidden={isLabelVisuallyHidden}
      labelStyle={labelStyle}
      labelText={labelText}
    >
      <SelectTriggerButton
        ariaDescribedBy={ariaDescribedBy}
        toggleButtonProps={toggleButtonProps}
        hasError={hasError}
        isDisabled={isDisabled}
        isInverse={isInverse}
        style={inputStyle}
      >
        <SelectText data-testid="selectedItemText">
          {itemToString(selectedItem) || 'Select...'}
        </SelectText>
        {isClearable && selectedItem && (
          <ClearIndicator
            aria-label={`reset selection for ${labelText}.  ${itemToString(
              selectedItem
            )} is selected`}
            icon={<CrossIcon size={12} />}
            onClick={defaultHandleClearIndicatorClick}
            size={ButtonSize.small}
            style={{ margin: '0 4px', height: '28px', width: '28px' }}
            testId="clearIndicator"
            variant={ButtonVariant.link}
          />
        )}
      </SelectTriggerButton>
      <ItemsList
        getItemProps={getItemProps}
        getMenuProps={getMenuProps}
        highlightedIndex={highlightedIndex}
        isOpen={isOpen}
        items={items}
        itemToString={itemToString}
      />
    </DownshiftSelectContainer>
  );
}
