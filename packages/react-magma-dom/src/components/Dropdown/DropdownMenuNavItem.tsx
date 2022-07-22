import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { MenuItemStyles, IconWrapper } from './DropdownMenuItem';
import { DropdownContext } from './Dropdown';
import { IconProps } from 'react-magma-icons';
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

  React.useEffect(() => {
    context.registerDropdownMenuItem(context.itemRefArray, ownRef);
  }, []);

  return (
    <StyledItem
      {...other}
      href={to}
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
