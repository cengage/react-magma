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
  isFixedWidth?: boolean;
  isOpen?: boolean;
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

    const toggleRef = React.useRef<HTMLButtonElement>();

    function toggleDropdown() {
      setIsOpen(!isOpen);
    }

    function handleKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current.focus();
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
          alignment: alignment,
          dropDirection: dropDirection,
          isFixedWidth: !!width,
          isOpen: isOpen,
          setIsOpen: setIsOpen,
          toggleDropdown: toggleDropdown,
          toggleRef: toggleRef,
          width: width
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
