import * as React from 'react';

import styled from '@emotion/styled';
import { IconProps } from 'react-magma-icons';

import { DropdownContext } from './Dropdown';
import { MenuItemStyles, IconWrapper } from './DropdownMenuItem';
import { ThemeContext } from '../../theme/ThemeContext';
import { Omit, useForkedRef } from '../../utils';

export interface DropdownMenuNavItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  /**
   * Leading icon for the menu item
   */
  icon?: React.ReactElement<IconProps>;
  /**
   * The href value of the link
   */
  to: string;
}

const StyledItem = styled.a<{
  disabled?: boolean;
  isFixedWidth?: boolean;
  isInactive?: boolean;
  isInverse?: boolean;
}>`
  ${MenuItemStyles}
  text-decoration: none;
`;

export const DropdownMenuNavItem = React.forwardRef<
  HTMLAnchorElement,
  DropdownMenuNavItemProps
>((props, forwardedRef) => {
  const { children, icon, to, ...other } = props;

  const ownRef = React.useRef<HTMLDivElement>();
  const theme = React.useContext(ThemeContext);
  const context = React.useContext(DropdownContext);

  const ref = useForkedRef(forwardedRef, ownRef);

  const index = context.itemRefArray.current.findIndex(({ current: item }) => {
    if (!item || !ownRef.current) return false;

    return item === ownRef.current;
  });

  const isActive =
    context.activeItemIndex >= 0 && context.activeItemIndex === index;

  const isInactive =
    context.activeItemIndex >= 0 && context.activeItemIndex !== index;

  React.useEffect(() => {
    context.registerDropdownMenuItem(context.itemRefArray, ownRef);
  }, []);

  return (
    <StyledItem
      {...other}
      aria-current={isActive ? 'true' : null}
      href={to}
      isInactive={isInactive}
      isFixedWidth={context.isFixedWidth}
      isInverse={context.isInverse}
      ref={ref}
      role="menuitem"
      tabIndex={-1}
      theme={theme}
    >
      {icon && <IconWrapper theme={theme}>{icon}</IconWrapper>}
      {children}
    </StyledItem>
  );
});

DropdownMenuNavItem.displayName = 'DropdownMenuNavItem';
