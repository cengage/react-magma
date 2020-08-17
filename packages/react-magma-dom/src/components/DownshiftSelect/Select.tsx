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
    hasError,
    highlightedIndex: passedInHighlightedIndex,
    itemToString,
    items,
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

  function getInitialSelectedItem(): DownshiftOption<T> {
    return initialSelectedItem
      ? initialSelectedItem
      : passedInSelectedItem
      ? passedInSelectedItem
      : null;
  }

  const toggleButtonRef = React.useRef<HTMLButtonElement>();

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
  } = useSelect({
    ...props,
    onIsOpenChange: changes => {
      const {
        isOpen: changedIsOpen,
        selectedItem: changedSelectedItem
      } = changes;
      if (changedIsOpen) {
        setHighlightedIndex(
          items.findIndex(
            i => itemToString(i) === itemToString(changedSelectedItem)
          )
        );
      }

      onIsOpenChange &&
        typeof onIsOpenChange === 'function' &&
        onIsOpenChange(changes);
    },
    initialHighlightedIndex: passedInHighlightedIndex
      ? passedInHighlightedIndex
      : passedInSelectedItem || initialSelectedItem
      ? items.findIndex(
          i => itemToString(i) === itemToString(getInitialSelectedItem())
        )
      : -1
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
      labelText={labelText}
    >
      <SelectTriggerButton
        ariaDescribedBy={ariaDescribedBy}
        toggleButtonProps={toggleButtonProps}
        hasError={hasError}
        isDisabled={isDisabled}
        isInverse={isInverse}
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
