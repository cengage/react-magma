import { instanceOfItemWithOptionalDisabled } from '.';

export function isItemDisabled(item) {
  return instanceOfItemWithOptionalDisabled(item) && item.disabled;
}

function hasItemValue(object: unknown): object is { value: unknown } {
  return typeof object === 'object' && object !== null && 'value' in object;
}

export function isSameItem<T>(
  item: T,
  itemToCompare: T,
  itemToString: (item: T) => string,
  itemToKey?: (item: T | null) => unknown
): boolean {
  if (itemToKey) {
    return itemToKey(item) === itemToKey(itemToCompare);
  }

  if (item === itemToCompare) {
    return true;
  }

  if (!item || !itemToCompare) {
    return false;
  }

  if (hasItemValue(item) && hasItemValue(itemToCompare)) {
    return (
      item.value === itemToCompare.value &&
      itemToString(item) === itemToString(itemToCompare)
    );
  }

  return itemToString(item) === itemToString(itemToCompare);
}

export function findItemIndex<T>(
  items: T[],
  itemToFind: T,
  itemToString: (item: T) => string,
  excludedIndexes?: Set<number>,
  itemToKey?: (item: T | null) => unknown
): number {
  if (!items || itemToFind === null || itemToFind === undefined) {
    return -1;
  }

  const isAvailable = (index: number) =>
    !excludedIndexes || !excludedIndexes.has(index);

  const exactIndex = items.findIndex(
    (item, index) =>
      isAvailable(index) &&
      isSameItem(item, itemToFind, itemToString, itemToKey)
  );

  if (exactIndex !== -1 || itemToKey) {
    return exactIndex;
  }

  const itemString = itemToString(itemToFind);

  return items.findIndex(
    (item, index) => isAvailable(index) && itemToString(item) === itemString
  );
}

export function getSelectedItemIndexes<T>(
  items: T[],
  selectedItems: T[],
  itemToString: (item: T) => string,
  itemToKey?: (item: T | null) => unknown
): Set<number> {
  const selectedIndexes = new Set<number>();

  if (!items || !selectedItems) {
    return selectedIndexes;
  }

  const unmatchedItems = selectedItems.filter(selectedItem => {
    const index = items.findIndex(item =>
      isSameItem(item, selectedItem, itemToString, itemToKey)
    );

    if (index === -1) {
      return true;
    }

    selectedIndexes.add(index);

    return false;
  });

  unmatchedItems.forEach(selectedItem => {
    const index = findItemIndex(
      items,
      selectedItem,
      itemToString,
      selectedIndexes,
      itemToKey
    );

    if (index !== -1) {
      selectedIndexes.add(index);
    }
  });

  return selectedIndexes;
}

// Match recreated value objects by value; custom shapes retain reference identity
// unless their consumer supplies itemToKey. Labels remain presentation only.
export function getItemKey<T>(item: T | null): unknown {
  return hasItemValue(item) ? item.value : item;
}
