import React from 'react';

export function useComboboxItems(defaultItems, items) {
  const allItems = React.useRef(defaultItems || items);
  const [displayItems, setDisplayItems] = React.useState(defaultItems || items);

  function updateItemsRef(newItem) {
    allItems.current = [...allItems.current, newItem];
  }

  React.useEffect(() => {
    if (items) {
      allItems.current = items;
      setDisplayItems(items);
    }
  }, [items]);

  return [allItems, displayItems, setDisplayItems, updateItemsRef];
}

function inputValueInList(items, inputValue, itemToString) {
  return (
    items.current.filter(
      item => itemToString(item).toLowerCase() === inputValue.toLowerCase()
    ).length > 0
  );
}

export function defaultOnInputValueChange(
  changes,
  items,
  itemToString,
  disableCreateItem,
  setDisplayItems,
  setHighlightedIndex,
  onInputChange
) {
  const { inputValue: baseInputValue, isOpen } = changes;

  if (isOpen) {
    const inputValue =
      typeof baseInputValue === 'string'
        ? baseInputValue
        : itemToString(baseInputValue);

    const filteredItems = inputValue
      ? items.current
          .filter(item =>
            itemToString(item)
              .toLowerCase()
              .startsWith(inputValue.toLowerCase())
          )
          .concat(
            !disableCreateItem &&
              inputValue &&
              !inputValueInList(items, inputValue, itemToString)
              ? {
                  label: `Create "${inputValue}"`,
                  value: inputValue,
                  react_magma__created_item: true
                }
              : null
          )
          .filter(Boolean)
      : items.current;

    setHighlightedIndex(0);
    setDisplayItems(filteredItems);
  }

  onInputChange &&
    typeof onInputChange === 'function' &&
    onInputChange(changes);
}
