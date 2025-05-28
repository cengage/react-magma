import * as React from 'react';

import styled from '@emotion/styled';
import { IconProps } from 'react-magma-icons';

import { DropdownContext } from './Dropdown';
import { MenuItemStyles, IconWrapper } from './DropdownMenuItem';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import useOSDetect from '../../hooks/useOSDetect';
import { ThemeContext } from '../../theme/ThemeContext';
import { Omit, useForkedRef, collectTextFromReactNode } from '../../utils';

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

  const { isFirefox } = useDeviceDetect();
  const { isWindows } = useOSDetect();

  const ariaLabel = React.useMemo(() => {
    if (isWindows && isFirefox) {
      const collectedText = collectTextFromReactNode(children);

      return collectedText.length > 0 ? collectedText : undefined;
    }

    return undefined;
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
      aria-label={ariaLabel}
    >
      {icon && <IconWrapper theme={theme}>{icon}</IconWrapper>}
      {children}
    </StyledItem>
  );
});

DropdownMenuNavItem.displayName = 'DropdownMenuNavItem';
