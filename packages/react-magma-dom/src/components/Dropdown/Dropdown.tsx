import * as React from 'react';
import styled from '../../theme/styled';
import { useDescendants, useForkedRef } from '../../utils';

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
   * @default `DropdownAlignment.start`
   */
  alignment?: DropdownAlignment;
  /**
   * Position of the dropdown content
   * @default `DropdownDropDirection.down`
   */
  dropDirection?: DropdownDropDirection;
  /**
   * Max-height of dropdown content
   * @default 250px
   */
  maxHeight?: string | number;
  /**
   * Function called on dropdown close before focusing the toggle button
   * @deprecated true
   */
  onBeforeShiftFocus?: (event: React.SyntheticEvent) => void;
  /**
   * Function called when closing the dropdown menu
   */
  onClose?: (event: React.SyntheticEvent) => void;
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
  handleButtonBlur?: (event: React.FocusEvent) => void;
  handleMenuBlur?: (event: React.FocusEvent) => void;
  itemRefArray?: React.MutableRefObject<React.MutableRefObject<Element>[]>;
  isFixedWidth?: boolean;
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
    const {
      activeIndex,
      alignment,
      children,
      dropDirection,
      maxHeight,
      onBeforeShiftFocus,
      onClose,
      testId,
      width,
      ...other
    } = props;

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

    React.useEffect(() => {
      if (isOpen) {
        document.addEventListener('click', globalClickListener);
      }

      return () => {
        document.removeEventListener('click', globalClickListener);
      };
    }, [isOpen]);

    function globalClickListener(event) {
      if (isOpen && ownRef.current && !ownRef.current.contains(event.target)) {
        closeDropdown(event);
      }
    }

    function openDropdown() {
      setIsOpen(true);
      toggleRef.current.focus();
    }

    function closeDropdown(event) {
      setIsOpen(false);

      if (onBeforeShiftFocus && typeof onBeforeShiftFocus === 'function') {
        event.preventMagmaFocus = handlePreventMagmaFocus;
        onBeforeShiftFocus(event);
      }

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

    function handleButtonBlur() {
      setTimeout(() => {
        const isInMenu = menuRef.current.contains(document.activeElement);

        if (!isInMenu && isOpen) {
          setIsOpen(false);
        }
      }, 0);
    }

    function handleMenuBlur(event: React.SyntheticEvent) {
      const { currentTarget } = event;

      setTimeout(() => {
        const isInMenu = currentTarget.contains(document.activeElement);

        if (!isInMenu && isOpen) {
          setIsOpen(false);
        }
      }, 0);
    }

    function handlePreventMagmaFocus() {}

    const maxHeightString =
      typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;

    const widthString = typeof width === 'number' ? `${width}px` : width;

    return (
      <DropdownContext.Provider
        value={{
          activeItemIndex,
          alignment,
          closeDropdown,
          dropdownButtonId,
          dropDirection,
          handleButtonBlur,
          handleMenuBlur,
          itemRefArray,
          isFixedWidth: !!width,
          isOpen,
          maxHeight: maxHeightString,
          menuRef,
          openDropdown,
          registerDropdownMenuItem,
          setActiveItemIndex,
          setIsOpen,
          toggleRef,
          width: widthString,
        }}
      >
        <Container
          {...other}
          ref={ref}
          data-testid={testId}
          onKeyDown={isOpen ? handleKeyDown : null}
        >
          {children}
        </Container>
      </DropdownContext.Provider>
    );
  }
);
