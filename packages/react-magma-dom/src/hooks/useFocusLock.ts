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
      if (!(element instanceof HTMLElement)) {
        return false;
      }
      const style = window.getComputedStyle(element);
      if (
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        element.hasAttribute('disabled') ||
        element.tabIndex === -1
      ) {
        return false;
      }
      // CSS `display` is not inherited, so children of a `display:none` parent
      // still report their own display value. Walk up the ancestor chain to
      // exclude elements hidden by a collapsed ancestor (e.g. a closed calendar).
      let ancestor: HTMLElement | null = element.parentElement;
      while (ancestor && ancestor !== rootNode.current) {
        if (window.getComputedStyle(ancestor).display === 'none') {
          return false;
        }
        ancestor = ancestor.parentElement;
      }
      return true;
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

      if (active && key === 'Tab') {
        // Refresh the list on every Tab so CSS-toggled visibility changes
        // (e.g. a DatePicker calendar opening/closing via display:none) are
        // always reflected — the MutationObserver only fires on childList
        // mutations and cannot detect styled-component class/style updates.
        updateFocusableItems();

        // Destructure after the refresh so values reflect the current DOM state.
        const {
          length,
          0: firstItem,
          [focusableItems.current.length - 1]: lastItem,
        } = focusableItems.current;

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
