import * as React from 'react';
import styled from '../../theme/styled';

export enum DropdownDropDirection {
  down = 'down', //default
  up = 'up'
}

export enum DropdownAlignment {
  left = 'left', //default
  right = 'right'
}

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  activeIndex?: number;
  alignment?: DropdownAlignment;
  dropDirection?: DropdownDropDirection;
  maxHeight?: string;
  ref?: any;
  testId?: string;
  width?: string;
}

const Container = styled.div`
  display: inline-block;
  position: relative;
`;

interface DropdownContextInterface {
  activeItemIndex?: number;
  alignment?: DropdownAlignment;
  closeDropdown?: () => void;
  dropDirection?: DropdownDropDirection;
  itemRefArray?: any;
  isFixedWidth?: boolean;
  isOpen?: boolean;
  maxHeight?: string;
  menuRef?: any;
  openDropdown?: () => void;
  setActiveItemIndex?: React.Dispatch<React.SetStateAction<number>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleRef?: any;
  width?: string;
}

export const DropdownContext = React.createContext<DropdownContextInterface>({
  isOpen: false,
  setIsOpen: () => false
});

export const useDropdownContext = () => React.useContext(DropdownContext);

export const Dropdown: React.FunctionComponent<
  DropdownProps
> = React.forwardRef(
  (
    {
      activeIndex,
      alignment,
      children,
      dropDirection,
      maxHeight,
      testId,
      width,
      ...other
    }: DropdownProps,
    ref: any
  ) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const [activeItemIndex, setActiveItemIndex] = React.useState<number>(
      activeIndex || -1
    );

    const itemRefArray = React.useRef([]);

    const toggleRef = React.useRef<HTMLButtonElement>();
    const menuRef = React.useRef<any>([]);

    React.useEffect(() => {
      if (activeIndex >= 0) {
        setActiveItemIndex(activeIndex);
      }
    }, [activeIndex]);

    function openDropdown() {
      setIsOpen(true);
    }

    function closeDropdown() {
      setIsOpen(false);

      setTimeout(() => {
        if (toggleRef.current) {
          toggleRef.current.focus();
        }
      }, 0);
    }

    function useFilteredItems(): [any, number] {
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
        closeDropdown();
      }

      if (event.key === 'ArrowDown') {
        const [filteredItems, filteredItemIndex] = useFilteredItems();

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
        const [filteredItems, filteredItemIndex] = useFilteredItems();

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

    function handleMenuBlur(event: React.SyntheticEvent) {
      const { currentTarget } = event;

      setTimeout(() => {
        const isInMenu = currentTarget.contains(document.activeElement);

        if (!isInMenu && isOpen) {
          setIsOpen(false);
        }
      }, 0);
    }

    return (
      <DropdownContext.Provider
        value={{
          activeItemIndex,
          alignment,
          closeDropdown,
          dropDirection,
          itemRefArray,
          isFixedWidth: !!width,
          isOpen,
          maxHeight,
          menuRef,
          openDropdown,
          setActiveItemIndex,
          setIsOpen,
          toggleRef,
          width
        }}
      >
        <Container
          {...other}
          ref={ref}
          data-testid={testId}
          onBlur={handleMenuBlur}
          onKeyDown={isOpen ? handleKeyDown : null}
        >
          {children}
        </Container>
      </DropdownContext.Provider>
    );
  }
);
