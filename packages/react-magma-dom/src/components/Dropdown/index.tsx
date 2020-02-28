import * as React from 'react';
import { css } from '@emotion/core';
import styled from '../../theme/styled';
import { Card } from '../Card';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownToggle } from './DropdownToggle';

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
}

const Container = styled.div`
  display: inline-block;
  position: relative;
`;

const StyledCard = styled(Card)<{
  alignment?: DropdownAlignment;
  dropDirection?: DropdownDropDirection;
  isOpen?: boolean;
}>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  left: 5px;
  position: absolute;
  z-index: 999;

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

export const Dropdown: React.FunctionComponent<
  DropdownProps
> = React.forwardRef(
  (
    { children, alignment, dropDirection, testId, ...other }: DropdownProps,
    ref: any
  ) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    function toggleDropdown() {
      setIsOpen(!isOpen);
    }

    return (
      <Container {...other} ref={ref} data-testid={testId}>
        <DropdownToggle onClick={toggleDropdown}>Toggle me</DropdownToggle>
        <StyledCard
          alignment={alignment}
          dropDirection={dropDirection}
          isOpen={isOpen}
          testId="dropdownMenu"
        >
          <DropdownMenu>
            <DropdownMenuItem>Menu item 1</DropdownMenuItem>
            <DropdownMenuItem>Menu item 2</DropdownMenuItem>
          </DropdownMenu>
        </StyledCard>
      </Container>
    );
  }
);
