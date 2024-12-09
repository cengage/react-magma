import styled from '@emotion/styled';
import React from 'react';
import {
  useFloating,
  offset,
  flip,
  Placement,
  autoUpdate,
  ReferenceType,
} from '@floating-ui/react-dom';
import { resolveProps, useForkedRef, useGenerateId } from '../../utils';
import { useIsInverse } from '../../inverse';
import { ButtonGroupContext } from '../ButtonGroup';

export enum PopoverPositioning {
  bottom = 'bottom', //default
  top = 'top',
  left = 'left',
  right = 'right',
}

export interface PopoverProps {
  onClose?: (event: React.SyntheticEvent) => void;
  onOpen?: () => void;
  testId?: string;
  positioning?: PopoverPositioning;
  maxHeight?: string | number;
  width?: string | number;
  hoverable?: boolean;
  focusable?: boolean;
  isInverse?: boolean;
  isDisabled?: boolean;
  matchedWidth?: boolean;
  withoutPointer?: boolean;
  openByDefault?: boolean;
}

export interface PopoverContextInterface {
  floatingStyles?: React.CSSProperties;
  positioning?: PopoverPositioning;
  closePopover?: (event: React.SyntheticEvent | React.KeyboardEvent) => void;
  popoverTriggerId?: React.MutableRefObject<string>;
  popoverContentId?: React.MutableRefObject<string>;
  openPopover?: () => void;
  isInverse?: boolean;
  isOpen: boolean;
  maxHeight?: string;
  width?: string;
  isFixedWidth?: boolean;
  contentRef?: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFloating?: (node: ReferenceType) => void;
  setReference?: (node: ReferenceType) => void;
  toggleRef?: any;
  isDisabled?: boolean;
  hoverable?: boolean;
  focusable?: boolean;
  withoutPointer?: boolean;
}

const Container = styled.div`
  display: inline-block;
`;

export const PopoverContext = React.createContext<PopoverContextInterface>({
  isOpen: false,
  setIsOpen: () => false,
});

export const usePopoverContext = () => React.useContext(PopoverContext);

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (props, forwardedRef) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const contextProps = React.useContext(ButtonGroupContext);
    const resolvedProps = resolveProps(contextProps, props);

    const ownRef = React.useRef<any>();
    const toggleRef = React.useRef<HTMLButtonElement>();
    const contentRef = React.useRef<any>(null);
    const popoverContentId = React.useRef<string>('');
    const popoverTriggerId = React.useRef<string>('');

    const idPrefix = useGenerateId();

    popoverTriggerId.current = `${idPrefix}_trigger`;
    popoverContentId.current = `${idPrefix}_content`;

    const ref = useForkedRef(forwardedRef, ownRef);

    const {
      onClose,
      onOpen,
      positioning = PopoverPositioning.bottom,
      children,
      testId,
      maxHeight,
      width,
      hoverable,
      focusable,
      isDisabled,
      matchedWidth,
      withoutPointer,
      openByDefault,
      ...other
    } = props;

    React.useEffect(() => {
      if (openByDefault) {
        openPopover();
      }
    }, [openByDefault]) // Do I need this?

    const maxHeightString =
      typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;

    const widthString = matchedWidth
      ? toggleRef.current && window.getComputedStyle(toggleRef.current).width
      : typeof width === 'number'
      ? `${width}px`
      : width;

    const isInverse = useIsInverse(resolvedProps.isInverse);

    const handleMouseOver = () => {
      if (hoverable && !isDisabled) {
        setIsOpen(true);
      }
    };

    const handleMouseLeave = () => {
      if (hoverable) {
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

    function onFocus() {
      if (focusable && !isOpen) {
        openPopover();
      }
    }

    const { refs, floatingStyles } = useFloating({
      middleware: [flip(), offset(withoutPointer ? 4 : 14)],
      placement: positioning as Placement,
      whileElementsMounted: autoUpdate,
    });

    return (
      <PopoverContext.Provider
        value={{
          floatingStyles,
          positioning,
          closePopover,
          popoverTriggerId,
          popoverContentId,
          openPopover,
          isInverse,
          isOpen,
          maxHeight: maxHeightString,
          width: widthString,
          isFixedWidth: !!width,
          contentRef,
          setIsOpen,
          setFloating: refs.setFloating,
          setReference: refs.setReference,
          toggleRef,
          isDisabled,
          hoverable,
          focusable,
          withoutPointer,
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
          onFocus={onFocus}
        >
          {children}
        </Container>
      </PopoverContext.Provider>
    );
  }
);
