import React from 'react';

export function registerDescendant(
  itemRefArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
  itemRef: React.MutableRefObject<Element>
) {
  if (
    itemRefArray.current.find(
      ({ current: item }) => item === itemRef.current
    ) == null
  ) {
    const index = itemRefArray.current.findIndex(({ current: item }) => {
      if (!item || !itemRef.current) return false;
      
      return Boolean(
        item.compareDocumentPosition(itemRef.current) &
        Node.DOCUMENT_POSITION_PRECEDING
        );
      });
      
      const newItem = itemRef;

    itemRefArray.current =
      index === -1
        ? [...itemRefArray.current, newItem]
        : [
            ...itemRefArray.current.slice(0, index),
            newItem,
            ...itemRefArray.current.slice(index),
          ];
  }
}

export function unregisterDescendant(
  itemRefArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
  itemRef: React.MutableRefObject<Element>
) {
  if (!itemRef.current) return;

  itemRefArray.current = itemRefArray.current.filter(
    item => itemRef.current !== item.current
  );
}

export function useDescendants(): [
  React.MutableRefObject<React.MutableRefObject<Element>[]>,
  (
    refArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    ref: React.MutableRefObject<Element>
  ) => void,
  (
    refArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    ref: React.MutableRefObject<Element>
  ) => void
] {
  const itemRefArray = React.useRef<React.MutableRefObject<Element>[]>([]);

  return [itemRefArray, registerDescendant, unregisterDescendant];
}