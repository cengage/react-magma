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

  // The filter is necessary for the proper functioning of focus in drawer-navigation or similar cases
  const updateFocusableItems = () => {
    focusableItems.current = Array.from(
      rootNode.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video'
      ) || []
    ).filter((element): element is HTMLElement => {
      const style = window.getComputedStyle(element);
      return (
        element instanceof HTMLElement &&
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        !element.hasAttribute('disabled') &&
        element.tabIndex !== -1
      );
    });
  };

  React.useEffect(() => {
    if (active) {
      updateFocusableItems();

      const observer: MutationObserver = new MutationObserver(() => {
        updateFocusableItems();
      });

      if (rootNode.current) {
        observer.observe(rootNode.current, { childList: true, subtree: true });
      }

      if (header && header.current) {
        header.current.focus();
      } else if (focusableItems.current && focusableItems.current.length > 0) {
        const { 0: firstItem } = focusableItems.current;

        firstItem.focus();
      } else if (body && body.current) {
        (body.current.firstChild as HTMLElement).setAttribute('tabIndex', '-1');
        (body.current.firstChild as HTMLElement).focus();
      }
      return () => {
        observer.disconnect();
      };
    }
  }, [active, header, body]);

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
        // Only handle Tab if focus is inside this focus lock's root.
        // This prevents nested modals from interfering with each other.
        const activeEl = document.activeElement as HTMLElement;
        if (
          rootNode.current &&
          !rootNode.current.contains(activeEl) &&
          activeEl !== header?.current
        ) {
          return;
        }

        // If no focusable items, prevent tabbing entirely
        if (length === 0) {
          event.preventDefault();
          return;
        }

        // If only one item then prevent tabbing when locked
        if (length === 1) {
          event.preventDefault();
          if (firstItem !== activeEl) {
            firstItem.focus();
          }
          return;
        }

        // Explicitly manage all Tab navigation so focus never escapes
        // the trap (Safari does not respect aria-modal for containment)
        event.preventDefault();

        const currentIndex = focusableItems.current.indexOf(activeEl);

        if (currentIndex === -1) {
          // Focus is on an untracked element (e.g. the header)
          if (shiftKey) {
            lastItem.focus();
          } else {
            firstItem.focus();
          }
          return;
        }

        if (shiftKey) {
          if (currentIndex === 0) {
            lastItem.focus();
          } else {
            focusableItems.current[currentIndex - 1].focus();
          }
        } else {
          if (currentIndex === length - 1) {
            firstItem.focus();
          } else {
            focusableItems.current[currentIndex + 1].focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [active, focusableItems, header]);

  return rootNode;
}
