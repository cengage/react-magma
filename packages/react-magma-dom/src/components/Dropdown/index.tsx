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
  alignment?: DropdownAlignment;
  dropDirection?: DropdownDropDirection;
  ref?: any;
  testId?: string;
  width?: string;
}

const Container = styled.div`
  display: inline-block;
  position: relative;
`;

interface DropdownContextInterface {
  alignment?: DropdownAlignment;
  closeDropdown?: () => void;
  dropDirection?: DropdownDropDirection;
  itemRefArray?: any;
  isFixedWidth?: boolean;
  isOpen?: boolean;
  menuRef?: any;
  openDropdown?: () => void;
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
      children,
      alignment,
      dropDirection,
      testId,
      width,
      ...other
    }: DropdownProps,
    ref: any
  ) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const itemRefArray = React.useRef([]);

    const toggleRef = React.useRef<HTMLButtonElement>();
    const menuRef = React.useRef<any>([]);

    function openDropdown() {
      setIsOpen(true);
    }

    function closeDropdown() {
      setIsOpen(false);

      setTimeout(() => {
        toggleRef.current.focus();
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
        event.preventDefault();

        const [filteredItems, filteredItemIndex] = useFilteredItems();

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
        event.preventDefault();

        const [filteredItems, filteredItemIndex] = useFilteredItems();

        if (filteredItemIndex === -1 || filteredItemIndex === 0) {
          filteredItems[filteredItems.length - 1].current.focus();
        } else {
          filteredItems[filteredItemIndex - 1].current.focus();
        }
      }
    }

    function handleMenuBlur(event: React.SyntheticEvent) {
      const { currentTarget, target } = event;

      setTimeout(() => {
        const isInMenu = currentTarget.contains(target as Node);

        if (!isInMenu && isOpen) {
          setIsOpen(false);
        }
      }, 0);
    }

    return (
      <DropdownContext.Provider
        value={{
          alignment,
          closeDropdown,
          dropDirection,
          itemRefArray,
          isFixedWidth: !!width,
          isOpen,
          menuRef,
          openDropdown,
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
