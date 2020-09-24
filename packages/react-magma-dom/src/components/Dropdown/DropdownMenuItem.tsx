import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { DropdownContext } from '.';
import { IconProps, CheckIcon } from 'react-magma-icons';
import { Omit, useForkedRef } from '../../utils';

export interface DropdownMenuItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  icon?: React.ReactElement<IconProps>;
  index?: number;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: (value?: string) => void;
  value?: string;
}

const StyledItem = styled.div<{
  isDisabled?: boolean;
  isFixedWidth?: boolean;
  isInactive?: boolean;
  value?: string;
}>`
  color: ${props =>
    props.isDisabled
      ? props.theme.colors.disabledText
      : props.theme.colors.neutral01};
  cursor: ${props => (props.isDisabled ? 'not-allowed' : 'pointer')};
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

export const DropdownMenuItem: React.FunctionComponent<DropdownMenuItemProps> = React.forwardRef(
  (
    { children, isDisabled, icon, onClick, value, ...other },
    forwardedRef: React.Ref<any>
  ) => {
    const ownRef = React.useRef<HTMLDivElement>();
    const theme = React.useContext(ThemeContext);
    const context = React.useContext(DropdownContext);

    const ref = useForkedRef(forwardedRef, ownRef);

    const index = context.itemRefArray.current.findIndex(
      ({ current: item }) => {
        if (!item || !ownRef.current) return false;

        return item === ownRef.current;
      }
    );

    function handleClick(event: React.SyntheticEvent | React.KeyboardEvent) {
      if (context.activeItemIndex >= 0) {
        context.setActiveItemIndex(index);
      }

      if (onClick && !isDisabled) {
        onClick(value);
      }

      if (!isDisabled && context.activeItemIndex < 0) {
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
      if (!isDisabled) context.registerDropdownMenuItem(ownRef);
    }, []);

    return (
      <StyledItem
        {...other}
        aria-disabled={isDisabled}
        aria-selected={isActive}
        isDisabled={isDisabled}
        isFixedWidth={context.isFixedWidth}
        isInactive={isInactive}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={isDisabled ? null : ref}
        role="menuitem"
        theme={theme}
        tabIndex={isDisabled ? null : -1}
        value={value}
      >
        {icon && <IconWrapper theme={theme}>{icon}</IconWrapper>}
        {isActive && (
          <IconWrapper theme={theme}>
            <CheckIcon />
          </IconWrapper>
        )}
        {children}
      </StyledItem>
    );
  }
);

DropdownMenuItem.displayName = 'DropdownMenuItem';
