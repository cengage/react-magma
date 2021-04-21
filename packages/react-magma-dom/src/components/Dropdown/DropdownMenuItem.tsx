import * as React from 'react';
import { css } from '@emotion/core';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';
import { DropdownContext } from './Dropdown';
import { IconProps, CheckIcon } from 'react-magma-icons';
import { Omit, useForkedRef } from '../../utils';

export interface DropdownMenuItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * Leading icon for the menu item
   */
  icon?: React.ReactElement<IconProps>;
  /**
   * @internal
   */
  index?: number;
  /**
   * @internal
   */
  isActive?: boolean;
  /**
   * If true, item will be disabled; it will appear dimmed and onClick event (or any other events) will not fire
   * @default false
   */
  disabled?: boolean;
  /**
   * Action that fires when the menu item is clicked. If the menuitem also has a value prop, the value will be passed to the onClick handler
   */
  onClick?: (value?: string) => void;
  /**
   * Value of the component, gets passed to the onClick event
   */
  value?: string;
}

export const MenuItemStyles = props => {
  return css`
    align-items: center;
    color: ${props.disabled
      ? props.theme.colors.disabledText
      : props.theme.colors.neutral};
    cursor: ${props.disabled ? 'not-allowed' : 'pointer'};
    display: flex;
    font-size: ${props.theme.typeScale.size03.fontSize};
    line-height: ${props.theme.typeScale.size03.lineHeight};
    margin: 0;
    padding: ${props.isInactive
      ? `${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing05} ${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing11}`
      : `${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing05}`};
    white-space: ${props.isFixedWidth ? 'normal' : 'nowrap'};

    &:hover,
    &:focus {
      background: ${props.disabled ? 'none' : props.theme.colors.neutral07};
    }

    &:focus {
      outline-offset: -3px;
    }
  `;
};

const StyledItem = styled.div<{
  as?: string;
  disabled?: boolean;
  isFixedWidth?: boolean;
  isInactive?: boolean;
  value?: string;
}>`
  ${MenuItemStyles}
`;

export const IconWrapper = styled.span`
  color: ${props => props.theme.colors.neutral03};
  display: inline-flex;
  margin-right: ${props => props.theme.spaceScale.spacing05};

  svg {
    height: ${props => props.theme.iconSizes.medium}px;
    width: ${props => props.theme.iconSizes.medium}px;
  }
`;

export const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>((props, forwardedRef) => {
  const { children, disabled, icon, onClick, value, ...other } = props;

  const ownRef = React.useRef<HTMLDivElement>();
  const theme = React.useContext(ThemeContext);
  const context = React.useContext(DropdownContext);

  const ref = useForkedRef(forwardedRef, ownRef);

  const index = context.itemRefArray.current.findIndex(({ current: item }) => {
    if (!item || !ownRef.current) return false;

    return item === ownRef.current;
  });

  function handleClick(event: React.SyntheticEvent | React.KeyboardEvent) {
    if (context.activeItemIndex >= 0) {
      context.setActiveItemIndex(index);
    }

    if (onClick && !disabled) {
      onClick(value);
    }

    if (!disabled && context.activeItemIndex < 0) {
      context.closeDropdown(event);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  }

  const isActive =
    context.activeItemIndex >= 0 && context.activeItemIndex === index;

  const isInactive =
    context.activeItemIndex >= 0 && context.activeItemIndex !== index;

  React.useEffect(() => {
    if (!disabled)
      context.registerDropdownMenuItem(context.itemRefArray, ownRef);
  }, []);

  const i18n = React.useContext(I18nContext);

  return (
    <StyledItem
      {...other}
      aria-disabled={disabled}
      disabled={disabled}
      isFixedWidth={context.isFixedWidth}
      isInactive={isInactive}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={disabled ? null : ref}
      role="menuitem"
      theme={theme}
      tabIndex={disabled ? null : -1}
      value={value}
    >
      {icon && <IconWrapper theme={theme}>{icon}</IconWrapper>}
      {isActive && (
        <IconWrapper theme={theme}>
          <CheckIcon aria-label={i18n.dropdown.menuItemSelectedAriaLabel} />
        </IconWrapper>
      )}
      {children}
    </StyledItem>
  );
});

DropdownMenuItem.displayName = 'DropdownMenuItem';
