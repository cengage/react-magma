import * as React from 'react';
import { DownshiftSelectInterface } from '.';
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
    components: customComponents,
    hasError,
    itemToString,
    items,
    labelText,
    isClearable,
    isDisabled,
    isInverse
  } = props;

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    reset,
    openMenu
  } = useSelect(props);

  const { ClearIndicator } = defaultComponents({ ...customComponents });

  function defaultHandleClearIndicatorClick(event: React.SyntheticEvent) {
    event.stopPropagation();

    reset();
  }

  // TODO: Figure out a11y messaging overrides

  return (
    <DownshiftSelectContainer
      getLabelProps={getLabelProps}
      isInverse={isInverse}
      labelText={labelText}
    >
      <SelectTriggerButton
        toggleButtonProps={...getToggleButtonProps({
          disabled: isDisabled,
          onKeyDown: event => {
            if (
              getToggleButtonProps().id === document.activeElement.id &&
              (event.key === 'Enter' || event.key === ' ')
            ) {
              event.preventDefault();
              openMenu();
            }
          }
        })}
        hasError={hasError}
        isInverse={isInverse}
      >
        <SelectText data-testid="selectedItemText">
          {itemToString(selectedItem) || 'Select...'}
        </SelectText>
        {isClearable && selectedItem && (
          <ClearIndicator
            aria-label="reset"
            icon={<CrossIcon size={10} />}
            onClick={defaultHandleClearIndicatorClick}
            size={ButtonSize.small}
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
