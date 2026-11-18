import * as React from 'react';

import { useVirtual, VirtualItem } from 'react-virtual';

interface TreeViewVirtualizerOptions {
  size: number;
  parentRef: React.RefObject<HTMLUListElement>;
  getItemKey: (index: number) => string | number;
  scrollMargin?: number;
}

const estimateSize = () => 32;

// React Magma v6 uses react-virtual 2. Keep its measured rows in sync when
// nested content changes size, without changing the package dependency.
export function useTreeViewVirtualizer({
  size,
  parentRef,
  getItemKey,
  scrollMargin = 0,
}: TreeViewVirtualizerOptions): ReturnType<typeof useVirtual> {
  const elements = React.useRef(
    new Map<
      VirtualItem['key'],
      { element: HTMLElement; measureRef: VirtualItem['measureRef'] }
    >()
  );
  const keyExtractor = React.useCallback(
    (index: number) => `tree-item:${getItemKey(index)}`,
    [getItemKey]
  );
  const virtualizer = useVirtual({
    size,
    parentRef,
    estimateSize,
    keyExtractor,
    overscan: 3,
    paddingStart: scrollMargin,
  });
  const virtualItems = React.useMemo(
    () =>
      virtualizer.virtualItems.map(item => ({
        ...item,
        measureRef: (element: HTMLElement | null) => {
          if (element) {
            elements.current.set(item.key, {
              element,
              measureRef: item.measureRef,
            });
            item.measureRef(element);
          } else {
            elements.current.delete(item.key);
          }
        },
      })),
    [virtualizer.virtualItems]
  );
  const measureRows = React.useCallback(() => {
    Array.from(elements.current.values()).forEach(({ element, measureRef }) => {
      if (element.offsetHeight > 0) {
        measureRef(element);
      }
    });
  }, []);

  React.useEffect(() => {
    measureRows();
  });

  React.useEffect(() => {
    const Observer = (
      window as typeof window & {
        ResizeObserver?: new (callback: () => void) => {
          observe(element: Element): void;
          disconnect(): void;
        };
      }
    ).ResizeObserver;

    if (!Observer) return;

    let frameId: number | undefined;
    const observer = new Observer(() => {
      if (frameId !== undefined) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        frameId = undefined;
        measureRows();
      });
    });

    elements.current.forEach(({ element }) => observer.observe(element));

    return () => {
      if (frameId !== undefined) cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [measureRows, virtualItems]);

  const { measure, scrollToIndex, scrollToOffset, totalSize } = virtualizer;

  return React.useMemo(
    () => ({ measure, scrollToIndex, scrollToOffset, totalSize, virtualItems }),
    [measure, scrollToIndex, scrollToOffset, totalSize, virtualItems]
  );
}
