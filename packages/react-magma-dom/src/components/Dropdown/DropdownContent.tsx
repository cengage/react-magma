import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { Card } from '../Card';
import { DropdownContext, DropdownAlignment, DropdownDropDirection } from '.';
import { ThemeContext } from '../../theme/ThemeContext';

const StyledCard = styled(Card)<{
  alignment?: DropdownAlignment;
  dropDirection?: DropdownDropDirection;
  isOpen?: boolean;
  maxHeight?: string;
  width?: string;
}>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  left: ${props => props.theme.spaceScale.spacing02};
  max-height: ${props => (props.maxHeight ? props.maxHeight : '250px')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  outline: 0;
  overflow-y: auto;
  padding: ${props => props.theme.spaceScale.spacing03} 0;
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
      top: ${props.theme.spaceScale.spacing02};
    `}

  ${props =>
    props.dropDirection === 'right' &&
    css`
      left: 100%;
      top: ${props.theme.spaceScale.spacing02};
    `}

  ${props =>
    props.alignment === 'end' &&
    props.dropDirection !== 'left' &&
    props.dropDirection !== 'right' &&
    css`
      left: auto;
      right: ${props.theme.spaceScale.spacing02};
    `}

 ${props =>
    props.alignment === 'end' &&
    (props.dropDirection === 'left' || props.dropDirection === 'right') &&
    css`
      bottom: ${props.theme.spaceScale.spacing02};
      top: auto;
    `}
`;

const StyledDiv = styled.div`
  padding: ${props => props.theme.spaceScale.spacing02} 0;
`;

export const DropdownContent: React.FunctionComponent = ({
  children,
  ...other
}) => {
  const context = React.useContext(DropdownContext);
  const theme = React.useContext(ThemeContext);

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
      theme={theme}
      width={context.width}
      onBlur={context.handleMenuBlur}
    >
      <StyledDiv
        aria-labelledby={context.dropdownButtonId.current}
        ref={context.menuRef}
        role="menu"
        theme={theme}
      >
        {children}
      </StyledDiv>
    </StyledCard>
  );
};
