import * as React from 'react';

export interface FocusableElement extends HTMLElement {
  focus(options?: FocusOptions): void;
}

export function useFocusLock(
  active: boolean,
  header?: React.MutableRefObject<FocusableElement>,
  body?: React.MutableRefObject<FocusableElement>
): React.MutableRefObject<any> {
  const rootNode = React.useRef<HTMLElement>(null);
  const focusableItems = React.useRef<Array<HTMLElement>>([]);

  const updateFocusableItems = () => {
    focusableItems.current = rootNode.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video'
    ) as unknown as Array<HTMLElement>;
  };

  React.useEffect(() => {
    if (active) {
      updateFocusableItems();

      if (header && header.current) {
        header.current.focus();
      } else if (focusableItems.current && focusableItems.current.length > 0) {
        const { 0: firstItem } = focusableItems.current;

        firstItem.focus();
      } else if (body && body.current) {
        (body.current.firstChild as HTMLElement).setAttribute('tabIndex', '-1');
        (body.current.firstChild as HTMLElement).focus();
      }
    }
  }, [active]);

  React.useEffect(() => {
    const observer: MutationObserver = new MutationObserver(() => {
      updateFocusableItems();
    });

    updateFocusableItems();

    rootNode.current &&
      observer.observe(rootNode.current, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
  }, [rootNode]);

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!focusableItems.current) return;

      const { key, shiftKey } = event;
      const {
        length,
        0: firstItem,
        [length - 1]: lastItem,
      } = focusableItems.current;

      if (active && key === 'Tab') {
        // If no focusable items are
        if (length === 0) {
          event.preventDefault();
          return;
        }

        // If only one item then prevent tabbing when locked
        if (length === 1) {
          event.preventDefault();
          if (firstItem !== document.activeElement) {
            firstItem.focus();
          }

          return;
        }

        // If focused on last item then focus on first item when tab is pressed
        if (!shiftKey && document.activeElement === lastItem) {
          event.preventDefault();
          firstItem.focus();
          return;
        }

        // If focused on first item then focus on last item when shift + tab is pressed
        if (
          shiftKey &&
          (document.activeElement === firstItem ||
            document.activeElement === header?.current)
        ) {
          event.preventDefault();
          lastItem.focus();
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [active, focusableItems]);

  return rootNode;
}
