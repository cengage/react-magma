import * as React from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import { DropdownContext } from './Dropdown';
import { Omit, useForkedRef } from '../../utils';
import { DropdownExpandableMenuGroupContext } from './DropdownExpandableMenuGroup';
import { DropdownMenuItem, DropdownMenuItemProps } from './DropdownMenuItem';
import { DropdownExpandableMenuItemContext } from './DropdownExpandableMenuItem';
import styled from '@emotion/styled';

export interface DropdownExpandableMenuListItemProps
  extends Omit<DropdownMenuItemProps, 'icon'> {
  disabled?: boolean;
  testId?: string;
}

function menuItemPadding(props) {
  if (props.isExpandablePanel) {
    if (props.expandableMenuButtonHasIcon) {
      return `${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing05} ${props.theme.spaceScale.spacing03} 72px`;
    }
    return `${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing05} ${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing08}`;
  }
}

const StyledDropdownMenuItem = styled(DropdownMenuItem)<{
  expandableMenuButtonHasIcon?: boolean;
  isExpandablePanel?: boolean;
}>`
  padding: ${menuItemPadding};
`;

export const DropdownExpandableMenuListItem = React.forwardRef<
  HTMLDivElement,
  DropdownExpandableMenuListItemProps
>((props, forwardedRef) => {
  const { children, ...other } = props;

  const ownRef = React.useRef<HTMLDivElement>();
  const theme = React.useContext(ThemeContext);
  const context = React.useContext(DropdownContext);

  const menuGroupContext = React.useContext(DropdownExpandableMenuGroupContext);

  const expandableMenuItemContext = React.useContext(
    DropdownExpandableMenuItemContext
  );

  const ref = useForkedRef(forwardedRef, ownRef);

  React.useEffect(() => {
    if (!expandableMenuItemContext.disabled)
      context.registerDropdownMenuItem(context.itemRefArray, ownRef);
  }, []);

  return (
    <StyledDropdownMenuItem
      {...other}
      disabled={disabled}
      expandableMenuButtonHasIcon={menuGroupContext.expandableMenuButtonHasIcon}
      isExpandablePanel={menuGroupContext.isExpandablePanel}
      ref={expandableMenuItemContext.disabled ? null : ref}
      theme={theme}
      role="menuitem"
    >
      {children}
    </StyledDropdownMenuItem>
  );
});

DropdownExpandableMenuListItem.displayName = 'DropdownExpandableMenuListItem';
