import * as React from 'react';
import styled from '../../theme/styled';
import { css } from '@emotion/core';
import { Card } from '../Card';
import {
  DropdownContext,
  DropdownAlignment,
  DropdownDropDirection,
} from './Dropdown';
import { ThemeContext } from '../../theme/ThemeContext';
import { useForkedRef } from '../../utils';

/**
 * @children required
 */
export interface DropdownContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isInverse?: boolean;
  /**
   * @internal
   */
  testId?: string;
}

const StyledCard = styled(Card)<{
  alignment?: DropdownAlignment;
  dropDirection?: DropdownDropDirection;
  isInverse?: boolean;
  isOpen?: boolean;
  maxHeight?: string;
  width?: string;
}>`
  background: ${props =>
    props.isInverse
      ? props.theme.colors.primary500
      : props.theme.colors.neutral100};
  display: ${props => (props.isOpen ? 'block' : 'none')};
  left: ${props => props.theme.spaceScale.spacing02};
  max-height: ${props =>
    props.maxHeight ? props.maxHeight : props.theme.dropdown.content.maxHeight};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  outline: 0;
  overflow-y: auto;
  padding: ${props => props.theme.spaceScale.spacing03} 0;
  position: absolute;
  transition: opacity 0.3s;
  white-space: nowrap;
  z-index: 2;
  &:focus {
    outline: 2px solid ${props =>
      props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
    }
    outline-offset: 0;
  }

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

export const DropdownContent = React.forwardRef<
  HTMLDivElement,
  DropdownContentProps
>((props, forwardedRef) => {
  const { children, testId, ...other } = props;
  const context = React.useContext(DropdownContext);
  const theme = React.useContext(ThemeContext);
  const ref = useForkedRef(forwardedRef, context.menuRef);

  let hasItemChildren = false;

  // For Expandable Dropdowns that don't require a max-height
  let hasExpandableItems = false;

  React.Children.forEach(children, (child: any) => {
    if (
      child?.type?.displayName === 'DropdownMenuItem' ||
      child?.type?.displayName === 'DropdownMenuGroup'
    ) {
      hasItemChildren = true;
    }
    if (child.type?.displayName === 'DropdownExpandableMenuGroup') {
      hasExpandableItems = true;
    }
    return;
  });

  return (
    <StyledCard
      {...other}
      alignment={context.alignment}
      dropDirection={context.dropDirection}
      hasDropShadow
      isInverse={context.isInverse}
      isOpen={context.isOpen}
      maxHeight={context.maxHeight}
      ref={ref}
      style={
        hasExpandableItems
          ? { maxHeight: 'inherit', overflow: 'hidden' }
          : props.style
      }
      tabIndex={-1}
      testId={testId || 'dropdownContent'}
      theme={theme}
      width={context.width}
    >
      <StyledDiv
        aria-labelledby={context.dropdownButtonId.current}
        role={hasItemChildren ? 'menu' : null}
        style={hasExpandableItems ? { padding: '0' } : {}}
        theme={theme}
      >
        {children}
      </StyledDiv>
    </StyledCard>
  );
});
