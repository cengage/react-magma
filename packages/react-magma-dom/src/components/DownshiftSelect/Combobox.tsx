import * as React from 'react';
import { DownshiftComboboxInterface, instanceOfDefaultItemObject } from '.';
import { useCombobox } from 'downshift';
import styled from '@emotion/styled';

import { baseInputStyles } from '../BaseInput';
import { ButtonShape, ButtonVariant, ButtonSize } from '../Button';
import { CaretDownIcon } from '../Icon/types/CaretDownIcon';
import { Label } from '../Label';
import { ThemeContext } from '../../theme/ThemeContext';

import { SelectContainer, StyledCard, StyledList, StyledItem } from './shared';
import { CrossIcon } from '../Icon/types/CrossIcon';
import { defaultComponents } from './components';

const StyledInput = styled.input`
  ${baseInputStyles}

  border-radius: 5px 0 0 5px;
`;

export function Combobox<T>(props: DownshiftComboboxInterface<T>) {
  const {
    components: customComponents,
    defaultItems,
    labelText,
    isClearable,
    isLoading,
    items,
    itemToString,
    newItemTransform,
    onInputChange,
    onInputValueChange,
    onItemCreated
  } = props;

  const allItems = React.useRef(defaultItems || items);
  const [displayItems, setDisplayItems] = React.useState(defaultItems || items);
  const theme = React.useContext(ThemeContext);

  function updateItemsRef(newItem) {
    allItems.current = [...allItems.current, newItem];
  }

  React.useEffect(() => {
    if (items) {
      allItems.current = items;
      setDisplayItems(items);
    }
  }, [items]);

  function defaultOnInputValueChange(changes) {
    const filteredItems = allItems.current
      .filter(item =>
        itemToString(item)
          .toLowerCase()
          .startsWith(changes.inputValue.toLowerCase())
      )
      .concat(
        changes.inputValue && !allItems.current.includes(changes.inputValue)
          ? {
              label: `Create "${changes.inputValue}"`,
              value: changes.inputValue,
              react_magma__created_item: true
            }
          : null
      )
      .filter(Boolean);

    setDisplayItems(filteredItems);
    onInputChange &&
      typeof onInputChange === 'function' &&
      onInputChange(changes);
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
        typeof newItemTransform === 'function' &&
        newItemTransform(createdItem);

      items && onItemCreated && typeof onItemCreated === 'function'
        ? onItemCreated(newItem || createdItem)
        : updateItemsRef(newItem || createdItem);
      selectItem(newItem);
    }
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
    onSelectedItemChange: defaultOnSelectedItemChange
  });

  const {
    ClearIndicator,
    DropdownIndicator,
    LoadingIndicator
  } = defaultComponents({
    ...customComponents
  });

  function defaultHandleClearIndicatorClick(event: React.SyntheticEvent) {
    event.stopPropagation();

    reset();
  }

  return (
    <SelectContainer>
      <Label {...getLabelProps()}>{labelText}</Label>
      <div {...getComboboxProps()} style={{ display: 'flex' }}>
        <StyledInput {...getInputProps()} theme={theme} />
        {isClearable && selectedItem && (
          <ClearIndicator
            aria-label="reset"
            icon={<CrossIcon size={10} />}
            onClick={defaultHandleClearIndicatorClick}
            size={ButtonSize.small}
            variant={ButtonVariant.link}
          />
        )}
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <DropdownIndicator
            {...getToggleButtonProps()}
            aria-label="toggle menu"
            icon={<CaretDownIcon size={10} />}
            shape={ButtonShape.rightCap}
            theme={theme}
            variant={ButtonVariant.link}
          />
        )}
      </div>
      <StyledCard isOpen={isOpen} hasDropShadow>
        <StyledList isOpen={isOpen} {...getMenuProps()}>
          {displayItems.map((item, index) => {
            const itemString = itemToString(item);
            return (
              <StyledItem
                key={`${itemString}${index}`}
                isFocused={highlightedIndex === index}
                {...getItemProps({ item, index })}
                theme={theme}
              >
                {itemString}
              </StyledItem>
            );
          })}
        </StyledList>
      </StyledCard>
    </SelectContainer>
  );
}
