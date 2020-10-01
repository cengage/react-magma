import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { Card } from '../Card';
import { DropdownContext, DropdownAlignment, DropdownDropDirection } from '.';

const StyledCard = styled(Card)<{
  alignment?: DropdownAlignment;
  dropDirection?: DropdownDropDirection;
  isOpen?: boolean;
  maxHeight?: string;
  width?: string;
}>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  left: 5px;
  max-height: ${props => (props.maxHeight ? props.maxHeight : '250px')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  outline: 0;
  overflow-y: auto;
  position: absolute;
  transition: opacity 0.3s;
  white-space: nowrap;
  z-index: 2;

  ${props =>
    props.width &&
    css`
      white-space: normal;
      width: ${props.width};
    `}

  ${props =>
    props.dropDirection === 'up' &&
    css`
      top: auto;
      bottom: 100%;
    `}

  ${props =>
    props.dropDirection === 'left' &&
    css`
      left: auto;
      right: 100%;
      top: 5px;
    `}

  ${props =>
    props.dropDirection === 'right' &&
    css`
      left: 100%;
      top: 5px;
    `}

  ${props =>
    props.alignment === 'end' &&
    props.dropDirection !== 'left' &&
    props.dropDirection !== 'right' &&
    css`
      left: auto;
      right: 5px;
    `}

 ${props =>
    props.alignment === 'end' &&
    (props.dropDirection === 'left' || props.dropDirection === 'right') &&
    css`
      bottom: 5px;
      top: auto;
    `}
`;

const StyledDiv = styled.div`
  padding: 5px 0;
`;

export const DropdownContent: React.FunctionComponent = ({
  children,
  ...other
}) => {
  const context = React.useContext(DropdownContext);

  return (
    <StyledCard
      {...other}
      alignment={context.alignment}
      dropDirection={context.dropDirection}
      hasDropShadow
      isOpen={context.isOpen}
      maxHeight={context.maxHeight}
      tabIndex={-1}
      testId="dropdownContent"
      width={context.width}
      onBlur={context.handleMenuBlur}
    >
      <StyledDiv ref={context.menuRef} role="menu">
        {children}
      </StyledDiv>
    </StyledCard>
  );
};
