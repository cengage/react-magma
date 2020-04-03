import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { Card } from '../Card';
import { DropdownContext, DropdownAlignment, DropdownDropDirection } from '.';
import { DropdownMenuItem } from './DropdownMenuItem';

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
    props.alignment === 'right' &&
    css`
      left: auto;
      right: 5px;
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
  const { itemRefArray } = context;

  const childrenLength = React.Children.toArray(children).length;

  if (itemRefArray.current.length !== childrenLength) {
    itemRefArray.current = Array(childrenLength)
      .fill(null)
      .map((_, i) => itemRefArray.current[i] || React.createRef());
  }

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
    >
      <StyledDiv ref={context.menuRef} role="menu">
        {context.itemRefArray &&
          React.Children.toArray(children).map((child: any, index) => {
            return child.type === DropdownMenuItem && !child.props.isDisabled
              ? React.cloneElement(child, {
                  ref: itemRefArray.current[index],
                  index: index
                })
              : child;
          })}
      </StyledDiv>
    </StyledCard>
  );
};
