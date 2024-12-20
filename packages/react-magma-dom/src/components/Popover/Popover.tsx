import styled from '@emotion/styled';
import React from 'react';
import {
  useFloating,
  offset,
  flip,
  autoUpdate,
  ReferenceType,
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
  onClose?: (event: React.SyntheticEvent) => void;
  onOpen?: () => void;
  testId?: string;
  position?: PopoverPosition;
  maxHeight?: string | number;
  width?: string | number;
  hoverable?: boolean;
  isInverse?: boolean;
  isDisabled?: boolean;
  hasPointer?: boolean;
  openByDefault?: boolean;
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

const Container = styled.div`
  display: inline-block;
`;

export const PopoverContext = React.createContext<PopoverContextInterface>({
  isOpen: false,
  setIsOpen: () => false,
});

export function isExistedActiveElements(ref) {
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

export const usePopoverContext = () => React.useContext(PopoverContext);

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
    }, []);

    const popoverId = useGenerateId(defaultId);

    popoverTriggerId.current = `${popoverId}_trigger`;
    popoverContentId.current = `${popoverId}_content`;

    const ref = useForkedRef(forwardedRef, ownRef);

    React.useEffect(() => {
      if (openByDefault) {
        openPopover();
      }
    }, []);

    const isInverse = useIsInverse(resolvedProps.isInverse);

    const handleMouseOver = () => {
      if (hoverable && !isDisabled && !isExistedActiveElements(contentRef)) {
        setIsOpen(true);
      }
    };

    const handleMouseLeave = () => {
      if (hoverable && !isExistedActiveElements(contentRef)) {
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
      middleware: [flip(), offset(hasPointer ? 14 : 4)],
      placement: position,
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
          position: placement as PopoverPosition,
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
        <Container
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
        </Container>
      </PopoverContext.Provider>
    );
  }
);
