import * as React from 'react';

import { useDeviceDetect } from './useDeviceDetect';

export interface FocusableElement extends HTMLElement {
  focus(options?: FocusOptions): void;
}

/**
 * Returns a grouping key if the element belongs to a group
 * that shares a single tab stop (e.g. named radio groups).
 * Returns null if the element is independently tabbable.
 *
 * Extend this function to support new grouping patterns.
 */
function getTabStopGroupKey(el: HTMLElement): string | null {
  // Native radio buttons with the same name share a single tab stop.
  // Scope by form so identically-named groups in different forms stay separate.
  if (el instanceof HTMLInputElement && el.type === 'radio' && el.name) {
    const formScope = el.form ? `f${el.form.id || ''}` : 'noform';

    return `radio:${formScope}:${el.name}`;
  }

  return null;
}

/**
 * Within a shared-tab-stop group, decides whether `candidate`
 * should replace `current` as the representative tab stop.
 * For radio buttons the checked element wins; otherwise the
 * first element in DOM order is kept (it was set when the
 * group was first encountered).
 */
function isPreferredTabStop(
  candidate: HTMLElement,
  current: HTMLElement
): boolean {
  if (
    candidate instanceof HTMLInputElement &&
    candidate.type === 'radio' &&
    current instanceof HTMLInputElement
  ) {
    return candidate.checked && !current.checked;
  }

  return false;
}

/**
 * From a flat list of focusable elements, removes duplicates
 * that share a single tab stop, keeping only the representative
 * element for each group (the checked radio, or the first one
 * in DOM order when nothing is checked, etc.).
 */
function deduplicateTabStops(allFocusable: HTMLElement[]): HTMLElement[] {
  const groupRepresentatives = new Map<string, HTMLElement>();

  for (const el of allFocusable) {
    const key = getTabStopGroupKey(el);

    if (key) {
      const current = groupRepresentatives.get(key);

      if (!current || isPreferredTabStop(el, current)) {
        groupRepresentatives.set(key, el);
      }
    }
  }

  return allFocusable.filter(el => {
    const key = getTabStopGroupKey(el);

    if (key) {
      return groupRepresentatives.get(key) === el;
    }

    return true;
  });
}

/**
 * Module-level registry of currently active focus-lock root elements.
 * Used in Safari to prevent an outer lock from handling Tab for elements
 * that belong to an inner (descendant) lock.
 */
const activeFocusLockRoots = new Set<HTMLElement>();

export function useFocusLock(
  active: boolean,
  header?: React.MutableRefObject<FocusableElement>,
  body?: React.MutableRefObject<FocusableElement>
): React.MutableRefObject<any> {
  const rootNode = React.useRef<HTMLElement>(null);
  const focusableItems = React.useRef<Array<HTMLElement>>([]);

  const { isSafari } = useDeviceDetect();

  // The filter is necessary for the proper functioning of focus in drawer-navigation or similar cases
  const updateFocusableItems = () => {
    const allFocusable = Array.from(
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
        element.tabIndex >= 0
      );
    });

    focusableItems.current = deduplicateTabStops(allFocusable);
  };

  React.useEffect(() => {
    if (active) {
      const root = rootNode.current;

      if (root) {
        activeFocusLockRoots.add(root);
      }

      updateFocusableItems();

      const observer: MutationObserver = new MutationObserver(() => {
        updateFocusableItems();
      });

      if (root) {
        observer.observe(root, { childList: true, subtree: true });
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
        if (root) {
          activeFocusLockRoots.delete(root);
        }

        observer.disconnect();
      };
    }
  }, [active, header, body]);

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!focusableItems.current) return;

      const { key, shiftKey } = event;

      if (active && key === 'Tab') {
        updateFocusableItems();

        const { length } = focusableItems.current;
        const firstItem = focusableItems.current[0];
        const lastItem = focusableItems.current[length - 1];

        const activeElement = document.activeElement as HTMLElement | null;
        const eventTarget = event.target as Node | null;
        const isEventInsideCurrentLock =
          !!rootNode.current &&
          !!eventTarget &&
          rootNode.current.contains(eventTarget);

        const isActiveElementTracked =
          !!activeElement &&
          (activeElement === header?.current ||
            focusableItems.current.includes(activeElement));

        const isActiveElementInsideCurrentLock =
          !!rootNode.current &&
          !!activeElement &&
          rootNode.current.contains(activeElement);

        /**
         * Safari + VoiceOver can place screen reader focus on non-interactive content.
         * In that case, on next Tab the DOM focus may no longer be on one of the tracked
         * interactive elements, and the default browser tabbing can escape the lock.
         *
         * We only handle this as a fallback:
         * - lock is active
         * - Tab was pressed
         * - event still belongs to the current lock
         * - but DOM focus is no longer on a tracked interactive element
         *
         * This keeps the default logic intact and avoids breaking nested focus locks.
         */
        if (
          length > 0 &&
          isEventInsideCurrentLock &&
          !isActiveElementTracked &&
          (isActiveElementInsideCurrentLock || activeElement === document.body)
        ) {
          event.preventDefault();

          if (shiftKey) {
            lastItem.focus();
          } else {
            firstItem.focus();
          }

          return;
        }

        // If no focusable items
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

        // If focused on header then focus on first/last item
        if (document.activeElement === header?.current) {
          event.preventDefault();
          (shiftKey ? lastItem : firstItem).focus();

          return;
        }

        /**
         * Safari does not keep Tab navigation inside React portals,
         * so we manually move focus to the next/prev item for every Tab.
         * Other browsers handle intermediate navigation natively and
         * only need the boundary guards below.
         */
        if (isSafari) {
          // In Safari we manually manage every Tab, so we must exclude:
          // 1. Elements hidden by an ancestor (e.g. closed DatePicker calendar)
          // 2. Elements inside a nested active focus lock (they have their own handler)
          const nestedLockRoots = Array.from(activeFocusLockRoots).filter(
            lockRoot =>
              lockRoot !== rootNode.current &&
              rootNode.current!.contains(lockRoot)
          );

          const visibleItems = focusableItems.current.filter(el => {
            if (
              typeof (el as any).checkVisibility === 'function' &&
              !(el as any).checkVisibility()
            ) {
              return false;
            }

            // Skip elements managed by a nested lock
            if (
              nestedLockRoots.length > 0 &&
              nestedLockRoots.some(lockRoot => lockRoot.contains(el))
            ) {
              return false;
            }

            return true;
          });
          const visibleLength = visibleItems.length;

          if (visibleLength === 0) {
            event.preventDefault();

            return;
          }

          const idx = visibleItems.indexOf(activeElement as HTMLElement);

          // Active element is not in this lock's own elements
          // (it must be inside a nested lock) — let that lock handle it.
          if (idx === -1) {
            return;
          }

          event.preventDefault();

          if (shiftKey) {
            visibleItems[idx <= 0 ? visibleLength - 1 : idx - 1].focus();
          } else {
            visibleItems[idx >= visibleLength - 1 ? 0 : idx + 1].focus();
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
        if (shiftKey && document.activeElement === firstItem) {
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
  }, [active, focusableItems, header]);

  return rootNode;
}
