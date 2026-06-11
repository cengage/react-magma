import * as React from 'react';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (el): el is HTMLElement => {
      const style = window.getComputedStyle(el);

      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        !el.hasAttribute('disabled')
      );
    }
  );
}

function findVisibleModal(wrapper: HTMLElement): HTMLElement | null {
  const modal = wrapper.querySelector<HTMLElement>('.cds--modal');

  if (!modal) return null;

  const isVisible =
    modal.getAttribute('aria-modal') === 'true' ||
    modal.style.visibility === 'visible' ||
    modal.classList.contains('is-visible');

  return isVisible ? modal : null;
}

export function useCarbonModalFocusManagement(
  wrapperRef: React.RefObject<HTMLDivElement>
): void {
  const previouslyFocusedElement = React.useRef<Element | null>(null);
  const keydownHandler = React.useRef<((e: KeyboardEvent) => void) | null>(
    null
  );
  const focusinHandler = React.useRef<((e: FocusEvent) => void) | null>(null);
  const currentModal = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    function focusModalCloseButton(modal: HTMLElement) {
      const closeButton = modal.querySelector<HTMLElement>('.cds--modal-close');

      if (closeButton) {
        closeButton.focus();
      } else {
        const focusable = getFocusableElements(modal);

        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }
    }

    function handleModalOpen(modal: HTMLElement) {
      currentModal.current = modal;
      previouslyFocusedElement.current = document.activeElement;

      // Permanent guard: redirect focus back into modal whenever it escapes
      // (e.g. Carbon's overflow menu returning focus to its trigger).
      focusinHandler.current = (event: FocusEvent) => {
        const target = event.target as HTMLElement;

        if (!modal.contains(target)) {
          setTimeout(() => {
            if (currentModal.current === modal) {
              focusModalCloseButton(modal);
            }
          }, 0);
        }
      };
      document.addEventListener('focusin', focusinHandler.current);

      let pollAttempts = 0;
      const pollAndFocus = () => {
        if (currentModal.current !== modal) return;
        if (modal.contains(document.activeElement)) return;

        const closeBtn = modal.querySelector<HTMLElement>('.cds--modal-close');

        if (
          closeBtn &&
          window.getComputedStyle(closeBtn).visibility !== 'hidden'
        ) {
          closeBtn.focus();

          return;
        }

        if (++pollAttempts < 30) {
          requestAnimationFrame(pollAndFocus);
        }
      };

      requestAnimationFrame(pollAndFocus);

      keydownHandler.current = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return;

        const focusable = getFocusableElements(modal);

        if (focusable.length === 0) {
          event.preventDefault();

          return;
        }

        if (focusable.length === 1) {
          event.preventDefault();
          if (focusable[0] !== document.activeElement) {
            focusable[0].focus();
          }

          return;
        }

        const firstItem = focusable[0];
        const lastItem = focusable[focusable.length - 1];

        if (!event.shiftKey && document.activeElement === lastItem) {
          event.preventDefault();
          firstItem.focus();
        } else if (event.shiftKey && document.activeElement === firstItem) {
          event.preventDefault();
          lastItem.focus();
        }
      };

      document.addEventListener('keydown', keydownHandler.current);
    }

    function handleModalClose() {
      // Null out currentModal first so any pending setTimeout redirects
      // (scheduled by the focusin guard) see a closed modal and bail out.
      currentModal.current = null;

      if (focusinHandler.current) {
        document.removeEventListener('focusin', focusinHandler.current);
        focusinHandler.current = null;
      }

      if (keydownHandler.current) {
        document.removeEventListener('keydown', keydownHandler.current);
        keydownHandler.current = null;
      }

      if (previouslyFocusedElement.current instanceof HTMLElement) {
        previouslyFocusedElement.current.focus();
      }
    }

    const observer = new MutationObserver(() => {
      const visibleModal = findVisibleModal(wrapper);

      if (visibleModal && !currentModal.current) {
        handleModalOpen(visibleModal);
      } else if (!visibleModal && currentModal.current) {
        handleModalClose();
      }
    });

    observer.observe(wrapper, {
      attributes: true,
      attributeFilter: ['class', 'style', 'aria-modal'],
      subtree: true,
    });

    return () => {
      observer.disconnect();
      if (keydownHandler.current) {
        document.removeEventListener('keydown', keydownHandler.current);
      }
      if (focusinHandler.current) {
        document.removeEventListener('focusin', focusinHandler.current);
      }
    };
  }, [wrapperRef]);
}
