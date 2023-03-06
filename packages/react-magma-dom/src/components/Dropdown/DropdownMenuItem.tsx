import * as React from 'react';
import { css } from '@emotion/core';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';
import { DropdownContext } from './Dropdown';
import { IconProps, CheckIcon } from 'react-magma-icons';
import { transparentize } from 'polished';
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
  onClick?: (value?: string | number) => void;
  /**
   * Value of the component, gets passed to the onClick event
   */
  value?: string | number;
}

export function menuColors(props) {
  if (props.disabled) {
    if (props.isInverse) {
      return transparentize(0.6, props.theme.colors.neutral100);
    }
    return transparentize(0.4, props.theme.colors.neutral500);
  }
  if (props.isInverse) {
    return props.theme.colors.neutral100;
  }
  return props.theme.colors.neutral700;
}

export function menuBackground(props) {
  if (props.disabled) {
    return 'none';
  }
  if (props.isInverse) {
    return props.theme.colors.primary600;
  }
  return props.theme.colors.neutral200;
}

export const MenuItemStyles = props => {
  return css`
    align-items: center;
    color: ${menuColors(props)};
    cursor: ${props.disabled ? 'not-allowed' : 'pointer'};
    display: flex;
    font-size: ${props.theme.typeScale.size03.fontSize};
    font-family: ${props.theme.bodyFont};
    line-height: ${props.theme.typeScale.size03.lineHeight};
    margin: 0;
    padding: ${props.isInactive
      ? `${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing05} ${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing11}`
      : `${props.theme.spaceScale.spacing03} ${props.theme.spaceScale.spacing05}`};
    white-space: ${props.isFixedWidth ? 'normal' : 'nowrap'};

    &:hover,
    &:focus {
      background: ${menuBackground(props)};
    }

    &:focus {
      outline-color: ${props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
      outline-offset: -2px;
    }
    &:active {
      outline-color: ${props.isInverse
        ? props.theme.colors.focusInverse
        : props.theme.colors.focus};
    }
  `;
};

const StyledItem = styled.div<{
  as?: string;
  disabled?: boolean;
  isFixedWidth?: boolean;
  isInactive?: boolean;
  isInverse?: boolean;
  value?: string | number;
}>`
  ${MenuItemStyles}
`;

export const IconWrapper = styled.span<{ isInverse?: boolean }>`
  color: ${props =>
    props.isInverse
      ? props.theme.colors.neutral100
      : props.theme.colors.neutral500};
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
      isInverse={context.isInverse}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={disabled ? null : ref}
      role="menuitem"
      theme={theme}
      tabIndex={disabled ? null : -1}
      value={value}
    >
      {icon && (
        <IconWrapper theme={theme} isInverse={context.isInverse}>
          {icon}
        </IconWrapper>
      )}
      {isActive && (
        <IconWrapper isInverse={context.isInverse} theme={theme}>
          <CheckIcon aria-label={i18n.dropdown.menuItemSelectedAriaLabel} />
        </IconWrapper>
      )}
      {children}
    </StyledItem>
  );
});

DropdownMenuItem.displayName = 'DropdownMenuItem';
