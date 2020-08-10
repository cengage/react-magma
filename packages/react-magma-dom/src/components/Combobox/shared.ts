import React from 'react';

export function useComboboxItems(
  defaultItems,
  items,
  { itemToString, disableCreateItem, onInputChange }
) {
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

  function inputValueInList(inputValue) {
    return (
      allItems.current.filter(
        item => itemToString(item).toLowerCase() === inputValue.toLowerCase()
      ).length > 0
    );
  }

  function defaultOnInputValueChange(changes) {
    const { inputValue: baseInputValue } = changes;
    const inputValue =
      typeof baseInputValue === 'string'
        ? baseInputValue
        : itemToString(baseInputValue);

    const filteredItems = inputValue
      ? allItems.current
          .filter(item =>
            itemToString(item)
              .toLowerCase()
              .startsWith(inputValue.toLowerCase())
          )
          .concat(
            !disableCreateItem && inputValue && !inputValueInList(inputValue)
              ? {
                  label: `Create "${inputValue}"`,
                  value: inputValue,
                  react_magma__created_item: true
                }
              : null
          )
          .filter(Boolean)
      : allItems.current;

    setDisplayItems(filteredItems);
    onInputChange &&
      typeof onInputChange === 'function' &&
      onInputChange(changes);
  }

  return [
    displayItems,
    setDisplayItems,
    updateItemsRef,
    defaultOnInputValueChange
  ];
}
