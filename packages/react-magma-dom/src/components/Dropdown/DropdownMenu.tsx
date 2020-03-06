import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { Card } from '../Card';
import { DropdownContext, DropdownAlignment, DropdownDropDirection } from '.';

const StyledMenu = styled.ul`
  margin: 0;
  padding: 0;
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

export const DropdownMenu: React.FunctionComponent = ({
  children,
  ...other
}) => {
  const context = React.useContext(DropdownContext);

  return (
    <StyledCard
      alignment={context.alignment}
      dropDirection={context.dropDirection}
      isOpen={context.isOpen}
      testId="dropdownMenu"
      width={context.width}
    >
      <StyledMenu {...other} role="menu">
        {children}
      </StyledMenu>
    </StyledCard>
  );
};
