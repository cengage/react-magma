import * as React from 'react';
import { css } from '@emotion/react';
import { Card } from '../Card';
import {
  DropdownAlignment,
  DropdownContext,
  DropdownDropDirection,
} from './Dropdown';
import { ThemeContext } from '../../theme/ThemeContext';
import { useForkedRef } from '../../utils';
import styled from '@emotion/styled';

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
  max-height: ${props =>
    props.maxHeight ? props.maxHeight : props.theme.dropdown.content.maxHeight};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  outline: 0;
  overflow-y: auto;
  padding: ${props => props.theme.spaceScale.spacing03} 0;
  transition: opacity 0.3s;
  white-space: nowrap;
  &:focus {
    outline: 2px solid
      ${props =>
        props.isInverse
          ? props.theme.colors.focusInverse
          : props.theme.colors.focus};
    outline-offset: 0;
  }

  ${props =>
    props.width &&
    css`
      white-space: normal;
      width: ${props.width};
    `}
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
    <div
      ref={context.setFloating}
      style={{ ...context.floatingStyles, zIndex: '2' }}
    >
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
        <div
          aria-labelledby={context.dropdownButtonId.current}
          role={hasItemChildren ? 'menu' : null}
        >
          {children}
        </div>
      </StyledCard>
    </div>
  );
});
