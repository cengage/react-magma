import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { Card } from '../Card';
import { DropdownContext, DropdownAlignment, DropdownDropDirection } from '.';

const StyledMenu = styled.ul`
  margin: 0;
  padding: 5px 0;
`;

const StyledCard = styled(Card)<{
  alignment?: DropdownAlignment;
  dropDirection?: DropdownDropDirection;
  isOpen?: boolean;
  width?: string;
}>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  left: 5px;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  position: absolute;
  transition: opacity 0.3s;
  z-index: 2;

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
      hasDropShadow
      isOpen={context.isOpen}
      {...other}
      testId="dropdownMenu"
      width={context.width}
    >
      <StyledMenu role="menu">{children}</StyledMenu>
    </StyledCard>
  );
};
