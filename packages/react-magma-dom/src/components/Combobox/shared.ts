import React from 'react';

export function useComboboxItems(defaultItems, items) {
  const afterInitialRender = React.useRef(false);
  const allItems = React.useRef(defaultItems || items);
  const [displayItems, setDisplayItems] = React.useState(defaultItems || items);

  function updateItemsRef(newItem) {
    const newItems = [...allItems.current, newItem];

    allItems.current = newItems;
    setDisplayItems(newItems);
  }

  React.useEffect(() => {
    if (!afterInitialRender.current) {
      afterInitialRender.current = true;

      return;
    }

    const cleanItems = items ? items : [];

    allItems.current = cleanItems;
    setDisplayItems(cleanItems);
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
  onInputChange,
  createLabel
) {
  const { inputValue: inputBaseValue, isOpen } = changes;

  if (isOpen) {
    const inputValue =
      typeof inputBaseValue === 'string'
        ? inputBaseValue
        : itemToString(inputBaseValue);

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
                  label: createLabel.replace(/\{inputValue\}/g, inputValue),
                  value: inputValue,
                  react_magma__created_item: true,
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
