import styled from '@emotion/styled';
import React from 'react';
import {
  useFloating,
  offset,
  flip,
  autoUpdate,
  ReferenceType,
  AlignedPlacement,
} from '@floating-ui/react-dom';
import { resolveProps, useForkedRef, useGenerateId } from '../../utils';
import { useIsInverse } from '../../inverse';
import { ButtonGroupContext } from '../ButtonGroup';

export enum PopoverPosition {
  bottom = 'bottom', //default
  top = 'top',
}

export interface PopoverApi {
  closePopoverManually(event): void;
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
   * @default false
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
   */
  apiRef?: React.MutableRefObject<PopoverApi | undefined>;
}

export interface PopoverContextInterface {
  floatingStyles?: React.CSSProperties;
  position?: PopoverPosition;
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
  toggleRef?: any;
  isDisabled?: boolean;
  hoverable?: boolean;
  hasPointer?: boolean;
}

const StyledContainer = styled.div`
  display: inline-block;
`;

export const PopoverContext = React.createContext<PopoverContextInterface>({
  isOpen: false,
  setIsOpen: () => false,
});

export function hasActiveElements(ref) {
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
      hasPointer,
      openByDefault,
      id: defaultId,
      apiRef,
      ...other
    } = props;

    React.useEffect(() => {
      if (apiRef) {
        apiRef.current = {
          closePopoverManually(event) {
            closePopover(event);
          },
        };
      }

      if (openByDefault) {
        openPopover();
      }
    }, []);

    const popoverId = useGenerateId(defaultId);

    popoverTriggerId.current = `${popoverId}_trigger`;
    popoverContentId.current = `${popoverId}_content`;

    const ref = useForkedRef(forwardedRef, ownRef);

    const isInverse = useIsInverse(resolvedProps.isInverse);

    const handleMouseOver = () => {
      if (hoverable && !hasActiveElements(contentRef)) {
        setIsOpen(true);
      }
    };

    const handleMouseLeave = () => {
      if (hoverable && !hasActiveElements(contentRef)) {
        setIsOpen(false);
      }
    };

    function openPopover() {
      setIsOpen(true);
      toggleRef.current.focus();

      onOpen && typeof onOpen === 'function' && onOpen();
    }

    function closePopover(event) {
      setIsOpen(false);

      if (toggleRef.current !== event.target) {
        toggleRef.current.focus();
      }

      onClose && typeof onClose === 'function' && onClose(event);
    }

    function handleKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Escape' && event.target !== toggleRef.current) {
        event.nativeEvent.stopImmediatePropagation();
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

    const { refs, floatingStyles, placement } = useFloating({
      //flip() - Changes the placement of the floating element to keep it in view.
      // offset - Translates the floating element along the specified axes. (Space between the Trigger and the Content).
      middleware: [flip(), offset(hasPointer ? 14 : 4)],
      placement: position as AlignedPlacement,
      whileElementsMounted: autoUpdate,
    });

    const maxHeightString =
      typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;

    const widthString =
      width === 'target'
        ? `${refs.reference.current?.getBoundingClientRect().width}px`
        : typeof width === 'number'
        ? `${width}px`
        : width;

    return (
      <PopoverContext.Provider
        value={{
          floatingStyles,
          position: placement as AlignedPlacement,
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
          toggleRef,
          isDisabled,
          hoverable,
          hasPointer,
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
        >
          {children}
        </StyledContainer>
      </PopoverContext.Provider>
    );
  }
);
