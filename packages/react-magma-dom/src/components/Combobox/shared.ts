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
    const filteredItems = allItems.current
      .filter(item =>
        itemToString(item)
          .toLowerCase()
          .startsWith(changes.inputValue.toLowerCase())
      )
      .concat(
        !disableCreateItem &&
          changes.inputValue &&
          !inputValueInList(changes.inputValue)
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

  return [
    displayItems,
    setDisplayItems,
    updateItemsRef,
    defaultOnInputValueChange
  ];
}
