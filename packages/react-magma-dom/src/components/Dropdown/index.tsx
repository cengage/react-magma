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
  dropDirection?: DropdownDropDirection;
  itemRefArray?: any;
  isFixedWidth?: boolean;
  isOpen?: boolean;
  menuRef?: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDropdown?: () => void;
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

    function toggleDropdown() {
      setIsOpen(!isOpen);
    }

    function focusNextItem(filteredItemIndex: number) {
      const nextItemIndex = filteredItemIndex + 1;
      if (!itemRefArray.current[nextItemIndex]) {
        return;
      }

      if (itemRefArray.current[nextItemIndex].current) {
        itemRefArray.current[nextItemIndex].current.focus();
      } else {
        focusNextItem(nextItemIndex);
      }
    }

    function focusPrevItem(filteredItemIndex: number) {
      const prevItemIndex = filteredItemIndex - 1;

      if (!itemRefArray.current[prevItemIndex]) {
        return;
      }

      if (itemRefArray.current[prevItemIndex].current) {
        itemRefArray.current[prevItemIndex].current.focus();
      } else {
        focusPrevItem(prevItemIndex);
      }
    }

    function handleKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current.focus();
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();

        const filteredItemIndex = itemRefArray.current
          .map(filteredItem => filteredItem.current)
          .indexOf(document.activeElement);

        if (
          filteredItemIndex === -1 ||
          filteredItemIndex === itemRefArray.current.length - 1
        ) {
          itemRefArray.current
            .filter(itemRef => itemRef.current)[0]
            .current.focus();
        } else {
          focusNextItem(filteredItemIndex);
        }
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();

        const filteredItemIndex = itemRefArray.current
          .map(filteredItem => filteredItem.current)
          .indexOf(document.activeElement);

        if (filteredItemIndex === -1 || filteredItemIndex === 0) {
          itemRefArray.current
            .filter(itemRef => itemRef.current)
            [itemRefArray.current.length - 1].current.focus();
        } else {
          focusPrevItem(filteredItemIndex);
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
          alignment,
          dropDirection,
          itemRefArray,
          isFixedWidth: !!width,
          isOpen,
          menuRef,
          setIsOpen,
          toggleDropdown,
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
