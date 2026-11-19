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
  itemToString: (item: T) => string
): boolean {
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
  excludedIndexes?: Set<number>
): number {
  if (!items || itemToFind === null || itemToFind === undefined) {
    return -1;
  }

  const isAvailable = (index: number) =>
    !excludedIndexes || !excludedIndexes.has(index);

  const exactIndex = items.findIndex(
    (item, index) =>
      isAvailable(index) && isSameItem(item, itemToFind, itemToString)
  );

  if (exactIndex !== -1) {
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
  itemToString: (item: T) => string
): Set<number> {
  const selectedIndexes = new Set<number>();

  if (!items || !selectedItems) {
    return selectedIndexes;
  }

  const unmatchedItems = selectedItems.filter(selectedItem => {
    const index = items.findIndex(item =>
      isSameItem(item, selectedItem, itemToString)
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
      selectedIndexes
    );

    if (index !== -1) {
      selectedIndexes.add(index);
    }
  });

  return selectedIndexes;
}

export const setFocusedItem = (
  step: number,
  highlightedIndex: number,
  items: any[],
  setHighlightedIndex: (index: number) => void
) => {
  if (!items || items.length === 0) return;

  let nextIndex = highlightedIndex ?? 0;

  if (nextIndex === -1 && step < 0) {
    nextIndex = 0;
  }

  let iterations = 0;

  while (iterations < items.length) {
    nextIndex = (nextIndex + step + items.length) % items.length;

    if (!isItemDisabled(items[nextIndex])) {
      setHighlightedIndex?.(nextIndex);

      return;
    }

    iterations++;
  }
};
