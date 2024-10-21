import * as React from 'react';
import { useState } from 'react';
import { useDescendants } from '../../hooks/useDescendants';
import { resolveProps, useForkedRef } from '../../utils';
import { useIsInverse } from '../../inverse';
import { ButtonGroupContext } from '../ButtonGroup';
import styled from '@emotion/styled';
import {
  AlignedPlacement,
  autoUpdate,
  flip,
  offset,
  useFloating,
} from '@floating-ui/react-dom';
import { ReferenceType } from '@floating-ui/react-dom/dist/floating-ui.react-dom';

export enum DropdownDropDirection {
  down = 'down', //default
  left = 'left',
  right = 'right',
  up = 'up',
}

export enum DropdownAlignment {
  start = 'start', //default
  end = 'end',
}

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Index of the item that will active/selected. If none is provided, no item will appear active
   * @default -1
   */
  activeIndex?: number;
  /**
   * Alignment of the dropdown content
   * @default DropdownAlignment.start
   */
  alignment?: DropdownAlignment;
  /**
   * Position of the dropdown content
   * @default DropdownDropDirection.down
   * @deprecated = true
   */
  dropDirection?: DropdownDropDirection;
  /**
   * If true, the component will have inverse styling to better appear on a dark background
   * @default false
   */
  isInverse?: boolean;
  /**
   * Max-height of dropdown content
   * @default 250px
   */

  maxHeight?: string | number;
  /**
   * Function called when closing the dropdown menu
   */
  onClose?: (event: React.SyntheticEvent) => void;
  /**
   * Function called when opening the dropdown menu
   */
  onOpen?: () => void;
  /**
   * @internal
   */
  testId?: string;
  /**
   * Width of menu
   * @default Width of longest menu item
   */
  width?: string | number;
}

const Container = styled.div`
  display: inline-block;
  position: relative;
`;

interface DropdownContextInterface {
  activeItemIndex?: number;
  alignment?: DropdownAlignment;
  closeDropdown?: (event: React.SyntheticEvent | React.KeyboardEvent) => void;
  dropdownButtonId?: React.MutableRefObject<string>;
  dropDirection?: DropdownDropDirection;
  floatingStyles?: React.CSSProperties;
  handleDropdownBlur?: (event: React.FocusEvent) => void;
  itemRefArray?: React.MutableRefObject<React.MutableRefObject<Element>[]>;
  isFixedWidth?: boolean;
  isInverse?: boolean;
  isOpen?: boolean;
  maxHeight?: string;
  menuRef?: any;
  openDropdown?: () => void;
  registerDropdownMenuItem: (
    itemRefArray: React.MutableRefObject<React.MutableRefObject<Element>[]>,
    itemRef: React.MutableRefObject<Element>
  ) => void;
  setActiveItemIndex?: React.Dispatch<React.SetStateAction<number>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFloating?: (node: ReferenceType) => void;
  setReference?: (node: ReferenceType) => void;
  toggleRef?: any;
  width?: string;
}

export const DropdownContext = React.createContext<DropdownContextInterface>({
  isOpen: false,
  registerDropdownMenuItem: (elements, element) => {},
  setIsOpen: () => false,
});

export const useDropdownContext = () => React.useContext(DropdownContext);

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (props, forwardedRef) => {
    const contextProps = React.useContext(ButtonGroupContext);
    const resolvedProps = resolveProps(contextProps, props);

    const {
      activeIndex,
      alignment,
      children,
      dropDirection,
      maxHeight,
      onClose,
      onOpen,
      testId,
      width,
      ...other
    } = resolvedProps;

    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const [activeItemIndex, setActiveItemIndex] = React.useState<number>(
      activeIndex || -1
    );

    const ownRef = React.useRef<any>();
    const toggleRef = React.useRef<HTMLButtonElement>();
    const menuRef = React.useRef<any>([]);
    const dropdownButtonId = React.useRef<string>('');

    const ref = useForkedRef(forwardedRef, ownRef);

    const [itemRefArray, registerDropdownMenuItem] = useDescendants();

    React.useEffect(() => {
      if (activeIndex >= 0) {
        setActiveItemIndex(activeIndex);
      }
    }, [activeIndex]);

    function openDropdown() {
      const [filteredItems] = getFilteredItem();

      setIsOpen(true);

      if (filteredItems.length > 0) {
        setTimeout(() => {
          filteredItems[0].current && filteredItems[0].current.focus();
        }, 0);
      } else {
        setTimeout(() => {
          menuRef.current.focus();
        }, 0);
      }

      onOpen && typeof onOpen === 'function' && onOpen();
    }

    function closeDropdown(event) {
      setIsOpen(false);

      toggleRef.current.focus();

      onClose && typeof onClose === 'function' && onClose(event);
    }

    function getFilteredItem(): [any, number] {
      const filteredItems = itemRefArray.current.filter(
        itemRef => itemRef.current
      );
      const filteredItemIndex = filteredItems
        .map(filteredItem => filteredItem.current)
        .indexOf(document.activeElement);

      return [filteredItems, filteredItemIndex];
    }

    function handleKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Escape') {
        event.nativeEvent.stopImmediatePropagation();
        closeDropdown(event);
      }

      if (event.key === 'ArrowDown') {
        const [filteredItems, filteredItemIndex] = getFilteredItem();

        if (filteredItems.length === 0) {
          return;
        }

        event.preventDefault();

        if (
          filteredItemIndex === -1 ||
          filteredItemIndex === filteredItems.length - 1
        ) {
          filteredItems[0].current.focus();
        } else {
          filteredItems[filteredItemIndex + 1].current.focus();
        }
      }

      if (event.key === 'ArrowUp') {
        const [filteredItems, filteredItemIndex] = getFilteredItem();

        if (filteredItems.length === 0) {
          return;
        }

        event.preventDefault();

        if (filteredItemIndex === -1 || filteredItemIndex === 0) {
          filteredItems[filteredItems.length - 1].current.focus();
        } else {
          filteredItems[filteredItemIndex - 1].current.focus();
        }
      }
    }

    function handleDropdownBlur(event: React.FocusEvent) {
      const { currentTarget, relatedTarget } = event;

      const isInMenu =
        relatedTarget && currentTarget.contains(relatedTarget as Node);

      if (!isInMenu && isOpen) {
        closeDropdown(event);
      }
    }

    const maxHeightString =
      typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;

    const widthString = typeof width === 'number' ? `${width}px` : width;

    const isInverse = useIsInverse(resolvedProps.isInverse);

    const [placement, setPlacement] = useState('bottom-start');

    const changePlacement = (
      dropDirection: string = DropdownDropDirection.down,
      alignment: string = DropdownAlignment.start
    ) => {
      const placementMap = new Map([
        ['up-start', 'top-start'],
        ['up-end', 'top-end'],
        ['right-start', 'right-start'],
        ['right-end', 'right-end'],
        ['down-end', 'bottom-end'],
        ['left-start', 'left-start'],
        ['left-end', 'left-end'],
      ]);

      const contentPosition = `${dropDirection}-${alignment}`;

      setPlacement(placementMap.get(contentPosition) ?? 'bottom-start');
    };

    const { refs, floatingStyles } = useFloating({
      middleware: [flip(), offset(2)],
      placement: placement as AlignedPlacement,
      whileElementsMounted: autoUpdate,
    });

    React.useEffect(() => {
      changePlacement(dropDirection, alignment);
    }, [dropDirection, alignment]);

    return (
      <DropdownContext.Provider
        value={{
          activeItemIndex,
          alignment,
          closeDropdown,
          dropdownButtonId,
          dropDirection,
          floatingStyles,
          handleDropdownBlur,
          itemRefArray,
          isFixedWidth: !!width,
          isOpen,
          isInverse,
          maxHeight: maxHeightString,
          menuRef,
          openDropdown,
          registerDropdownMenuItem,
          setActiveItemIndex,
          setIsOpen,
          setReference: refs.setReference,
          setFloating: refs.setFloating,
          toggleRef,
          width: widthString,
        }}
      >
        <Container
          {...other}
          ref={ref}
          data-testid={testId}
          onKeyDown={isOpen ? handleKeyDown : null}
          onBlur={handleDropdownBlur}
        >
          {children}
        </Container>
      </DropdownContext.Provider>
    );
  }
);
