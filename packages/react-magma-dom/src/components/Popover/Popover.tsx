import React from 'react';

import styled from '@emotion/styled';
import {
  offset,
  flip,
  autoUpdate,
  ReferenceType,
  arrow,
  shift,
  useFloating,
  AlignedPlacement,
} from '@floating-ui/react';

import { useIsInverse } from '../../inverse';
import { resolveProps, useForkedRef, useGenerateId } from '../../utils';
import { ButtonGroupContext } from '../ButtonGroup';

export enum PopoverPosition {
  bottom = 'bottom', //default
  top = 'top',
}

export enum PopoverAlignment {
  center = 'center', //default
  start = 'start',
  end = 'end',
}

export type PopoverPlacement =
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'top'
  | 'top-start'
  | 'top-end';

export interface PopoverApi {
  closePopoverManually(event): void;
  openPopoverManually(event): void;
}
export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Function called when closing the popover menu
   */
  onClose?: (event: React.SyntheticEvent) => void;
  /**
   * Function called when opening the popover menu
   */
  onOpen?: () => void;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Determines the position of the popover relative to its trigger.
   * @default PopoverPosition.bottom
   */
  position?: PopoverPosition;
  /**
   * Sets the maximum height of the popover content.
   * @default 100%
   */
  maxHeight?: string | number;
  /**
   * Sets the width of the popover.
   * @default Width of longest menu item
   */
  width?: string | number;
  /**
   * If true, the popover will remain open when hovered over.
   * @default false
   */
  hoverable?: boolean;
  /**
   * If true, the component will have inverse styling to better appear on a dark background
   * @default false
   */
  isInverse?: boolean;
  /**
   * If true, the popover will be disabled and cannot be opened.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * If true, a pointer (arrow) is displayed pointing towards the trigger element.
   * @default true
   */
  hasPointer?: boolean;
  /**
   * If true, the popover is open by default when the component is first rendered.
   * @default false
   */
  openByDefault?: boolean;
  /**
   * The ref object that allows Popover manipulation.
   * Actions available:
   * closePopoverManually(event): void - Closes the popover manually.
   * openPopoverManually(event): void - Opens the popover manually.
   */
  apiRef?: React.MutableRefObject<PopoverApi | undefined>;
  /**
   * If true, the focus will be trapped within the popover, preventing focus from moving outside.
   * This is recommended when using interactive elements inside the popover to improve accessibility.
   * @default false
   */
  focusTrap?: boolean;
  /**
   * Alignment of the popover content
   * @default PopoverAlignment.center
   */
  alignment?: PopoverAlignment;
}

export interface PopoverContextInterface {
  floatingStyles?: React.CSSProperties;
  position?: PopoverPlacement;
  closePopover?: (event: React.SyntheticEvent | React.KeyboardEvent) => void;
  popoverTriggerId?: React.MutableRefObject<string>;
  popoverContentId?: React.MutableRefObject<string>;
  openPopover?: () => void;
  isInverse?: boolean;
  isOpen: boolean;
  maxHeight?: string;
  width?: string;
  contentRef?: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFloating?: (node: ReferenceType) => void;
  setReference?: (node: ReferenceType) => void;
  arrowRef?: React.MutableRefObject<any>;
  arrowContext?: any;
  toggleRef?: any;
  isDisabled?: boolean;
  hoverable?: boolean;
  hasPointer?: boolean;
  focusTrap?: boolean;
  hasActiveElements?: boolean;
}

const StyledContainer = styled.div`
  display: inline-block;
`;

export const PopoverContext = React.createContext<PopoverContextInterface>({
  isOpen: false,
  setIsOpen: () => false,
});

export function hasActiveElementsChecker(ref) {
  return (
    Array.from(
      ref.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video'
      ) || []
    ).filter((element: HTMLElement) => {
      const style = window.getComputedStyle(element);
      return (
        element instanceof HTMLElement &&
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        !element.hasAttribute('disabled')
      );
    }).length > 0
  );
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (props, forwardedRef) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const contextProps = React.useContext(ButtonGroupContext);
    const resolvedProps = resolveProps(contextProps, props);

    const ownRef = React.useRef<any>();
    const toggleRef = React.useRef<HTMLButtonElement>();
    const contentRef = React.useRef<any>(null);
    const popoverContentId = React.useRef('');
    const popoverTriggerId = React.useRef('');
    const arrowRef = React.useRef(null);

    const hasActiveElements = React.useMemo(
      () => hasActiveElementsChecker(contentRef),
      [contentRef, contentRef.current]
    );

    const {
      onClose,
      onOpen,
      position = PopoverPosition.bottom,
      children,
      testId,
      maxHeight,
      width,
      hoverable,
      isDisabled,
      hasPointer = true,
      openByDefault,
      id: defaultId,
      apiRef,
      focusTrap,
      alignment = PopoverAlignment.center,
      ...other
    } = props;

    React.useEffect(() => {
      if (apiRef) {
        apiRef.current = {
          closePopoverManually(event) {
            closePopover(event);
          },
          openPopoverManually(event) {
            openPopover();
          },
        };
      }

      if (openByDefault) {
        openPopover();
      }
    }, []);

    React.useEffect(() => {
      const handleEsc = event => {
        if (event.key === 'Escape' && isOpen) {
          closePopover(event);
        }
      };

      window.addEventListener('keydown', handleEsc);

      return () => {
        window.removeEventListener('keydown', handleEsc);
      };
    }, [isOpen]);

    const popoverId = useGenerateId(defaultId);

    popoverTriggerId.current = `${popoverId}_trigger`;
    popoverContentId.current = `${popoverId}_content`;

    const ref = useForkedRef(forwardedRef, ownRef);

    const isInverse = useIsInverse(resolvedProps.isInverse);

    const handleMouseOver = () => {
      if (hoverable && !isDisabled && !hasActiveElements) {
        setIsOpen(true);
      }
    };

    const handleMouseLeave = () => {
      if (hoverable && !isDisabled && !hasActiveElements) {
        setIsOpen(false);
      }
    };

    function openPopover() {
      setIsOpen(true);

      if (!hoverable) {
        toggleRef.current.focus();
      }

      onOpen && typeof onOpen === 'function' && onOpen();
    }

    function closePopover(event) {
      setIsOpen(false);

      if (toggleRef.current !== event.target && !hoverable) {
        toggleRef.current.focus();
      }

      onClose && typeof onClose === 'function' && onClose(event);
    }

    function handleKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Escape') {
        if (isOpen) {
          event.stopPropagation();
        }
        closePopover(event);
      }
    }

    function handlePopoverBlur(event: React.FocusEvent) {
      const { currentTarget, relatedTarget } = event;

      const isInMenu =
        relatedTarget && currentTarget.contains(relatedTarget as Node);

      if (!isInMenu && isOpen) {
        closePopover(event);
      }
    }

    const placement = React.useMemo(() => {
      return alignment === PopoverAlignment.center
        ? position
        : `${position}-${alignment}`;
    }, [position, alignment]);

    const { refs, floatingStyles, context, elements, update } = useFloating({
      //flip() - Changes the placement of the floating element to keep it in view.
      //offset() - Translates the floating element along the specified axes. (Space between the Trigger and the Content).
      //shift() - Shifts the floating element along the specified axes to keep it in view within the clipping context or viewport.
      //arrow() - Positions an arrow element pointing at the reference element, ensuring proper alignment.
      middleware: [
        flip(),
        shift({ padding: 12 }),
        offset(hasPointer ? 12 : 4),
        arrow({ element: arrowRef }),
      ],
      placement: placement as AlignedPlacement,
      whileElementsMounted: autoUpdate,
    });

    React.useEffect(() => {
      const referenceElement = elements.reference;
      const floatingElement = elements.floating;

      if (isOpen && referenceElement && floatingElement) {
        return autoUpdate(referenceElement, floatingElement, update);
      }
    }, [isOpen, elements, update]);

    const maxHeightString =
      typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;

    const widthString =
      width === 'target'
        ? `${refs.reference.current?.getBoundingClientRect().width}px`
        : typeof width === 'number'
          ? `${width}px`
          : width;

    const onFocus = () => {
      if (hoverable && !isDisabled && !hasActiveElements) {
        openPopover();
      }
    };

    return (
      <PopoverContext.Provider
        value={{
          floatingStyles,
          position: placement as PopoverPlacement,
          closePopover,
          popoverTriggerId,
          popoverContentId,
          openPopover,
          isInverse,
          isOpen,
          maxHeight: maxHeightString,
          width: widthString,
          contentRef,
          setIsOpen,
          setFloating: refs.setFloating,
          setReference: refs.setReference,
          arrowRef,
          arrowContext: context,
          toggleRef,
          isDisabled,
          hoverable,
          hasPointer,
          focusTrap,
          hasActiveElements,
        }}
      >
        <StyledContainer
          {...other}
          onKeyDown={handleKeyDown}
          onBlur={handlePopoverBlur}
          ref={ref}
          data-testid={testId}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          id={popoverId}
          onFocus={onFocus}
        >
          {children}
        </StyledContainer>
      </PopoverContext.Provider>
    );
  }
);
