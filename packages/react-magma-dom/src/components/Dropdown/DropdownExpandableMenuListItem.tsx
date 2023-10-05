import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { DropdownContext } from './Dropdown';
import { Omit, useForkedRef } from '../../utils';
import { DropdownExpandableMenuGroupContext } from './DropdownExpandableMenuGroup';
import {
  DropdownMenuItem,
  DropdownMenuItemProps,
  menuBackground,
} from './DropdownMenuItem';

export interface DropdownExpandableMenuListItemProps
  extends Omit<DropdownMenuItemProps, 'icon'> {}

function menuItemPadding(props) {
  //For DropdownExpandableMenu styling with an icon
  if (props.expandableMenuButtonHasIcon && props.isExpandablePanel) {
    return `${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing05} ${props.theme.spaceScale.spacing03} 72px`;
  }
  //For DropdownExpandableMenu styling without an icon
  else if (props.isExpandablePanel) {
    return `${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing05} ${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing08}`;
  }
}

const StyledDropdownMenuItem = styled(DropdownMenuItem)<{
  disabled?: boolean;
  expandableMenuButtonHasIcon?: boolean;
  isExpandablePanel?: boolean;
  isFixedWidth?: boolean;
  isInverse?: boolean;
}>`
  padding: ${menuItemPadding};
  &:hover,
  &:focus {
    background: ${menuBackground};
  }
`;

export const DropdownExpandableMenuListItem = React.forwardRef<
  HTMLDivElement,
  DropdownExpandableMenuListItemProps
>((props, forwardedRef) => {
  const { children, disabled, ...other } = props;

  const ownRef = React.useRef<HTMLDivElement>();
  const theme = React.useContext(ThemeContext);
  const context = React.useContext(DropdownContext);

  const menuGroupContext = React.useContext(DropdownExpandableMenuGroupContext);

  const ref = useForkedRef(forwardedRef, ownRef);

  React.useEffect(() => {
    if (!disabled)
      context.registerDropdownMenuItem(context.itemRefArray, ownRef);
  }, []);

  return (
    <StyledDropdownMenuItem
      {...other}
      expandableMenuButtonHasIcon={menuGroupContext.expandableMenuButtonHasIcon}
      isExpandablePanel={menuGroupContext.isExpandablePanel}
      isFixedWidth={context.isFixedWidth}
      isInverse={context.isInverse}
      ref={disabled ? null : ref}
      role="menuitem"
      theme={theme}
    >
      {children}
    </StyledDropdownMenuItem>
  );
});

DropdownExpandableMenuListItem.displayName = 'DropdownExpandableMenuListItem';
