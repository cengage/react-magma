import * as React from 'react';
import { css } from '@emotion/core';
import styled from '../../theme/styled';
import { Card } from '../Card';

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

const StyledCard = styled(Card)<{
  alignment?: DropdownAlignment;
  dropDirection?: DropdownDropDirection;
  isOpen?: boolean;
  width?: string;
}>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  left: 5px;
  position: absolute;
  z-index: 999;

  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}

  ${props =>
    props.dropDirection === 'up' &&
    css`
      top: auto;
      bottom: 100%;
    `}

  ${props =>
    props.alignment === 'right' &&
    css`
      left: auto;
      right: 5px;
    `}
`;

export interface DropdownContextInterface {
  dropDirection?: DropdownDropDirection;
  isFixedWidth?: boolean;
  toggleDropdown?: () => void;
}

export const DropdownContext = React.createContext<DropdownContextInterface>(
  {}
);

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

    function toggleDropdown() {
      setIsOpen(!isOpen);
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
          dropDirection: dropDirection,
          isFixedWidth: !!width,
          toggleDropdown: toggleDropdown
        }}
      >
        <Container
          {...other}
          ref={ref}
          data-testid={testId}
          onBlur={handleMenuBlur}
        >
          {children[0]}

          <StyledCard
            alignment={alignment}
            dropDirection={dropDirection}
            isOpen={isOpen}
            testId="dropdownMenu"
            width={width}
          >
            {children[1]}
          </StyledCard>
        </Container>
      </DropdownContext.Provider>
    );
  }
);
