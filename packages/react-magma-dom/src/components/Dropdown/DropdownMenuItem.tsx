import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { I18nContext } from '../../i18n';
import { DropdownContext } from '.';
import { IconProps, CheckIcon } from 'react-magma-icons';
import { Omit, useForkedRef } from '../../utils';

export interface DropdownMenuItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  icon?: React.ReactElement<IconProps>;
  index?: number;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: (value?: string) => void;
  value?: string;
}

const StyledItem = styled.div<{
  disabled?: boolean;
  isFixedWidth?: boolean;
  isInactive?: boolean;
  value?: string;
}>`
  color: ${props =>
    props.disabled
      ? props.theme.colors.disabledText
      : props.theme.colors.neutral01};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  line-height: 20px;
  margin: 0;
  padding: ${props => (props.isInactive ? '10px 20px 10px 55px' : '10px 20px')};
  white-space: ${props => (props.isFixedWidth ? 'normal' : 'nowrap')};

  &:hover,
  &:focus {
    background: ${props => props.theme.colors.neutral07};
  }

  &:focus {
    outline-offset: -3px;
  }
`;

const IconWrapper = styled.span`
  color: ${props => props.theme.colors.neutral03};
  display: inline-flex;
  margin-right: 15px;

  svg {
    height: 20px;
    width: 20px;
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
