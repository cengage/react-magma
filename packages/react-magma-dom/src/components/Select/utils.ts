import { instanceOfItemWithOptionalDisabled } from '.';

export function isItemDisabled(item) {
  return instanceOfItemWithOptionalDisabled(item) && item.disabled;
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
