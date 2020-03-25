import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { DropdownContext } from '.';
import { IconProps } from '../Icon/utils';
import { CheckIcon } from '../Icon/types/CheckIcon';
import { Omit } from '../../utils';

export interface DropdownMenuItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, 'onClick'> {
  icon?: React.ReactElement<IconProps>;
  index?: number;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: (value?: string) => void;
  value?: string;
}

const StyledItem = styled.li<{
  isDisabled?: boolean;
  isFixedWidth?: boolean;
  isInactive?: boolean;
}>`
  color: ${props =>
    props.isDisabled
      ? props.theme.colors.disabledText
      : props.theme.colors.neutral02};
  cursor: ${props => (props.isDisabled ? 'not-allowed' : 'pointer')};
  display: flex;
  line-height: 20px;
  list-style: none;
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
  display: inline-flex;
  margin-right: 15px;

  svg {
    height: 20px;
    width: 20px;
  }
`;

export const DropdownMenuItem: React.FunctionComponent<
  DropdownMenuItemProps
> = React.forwardRef(
  (
    { children, index, isDisabled, icon, onClick, value, ...other },
    ref: React.Ref<any>
  ) => {
    const theme = React.useContext(ThemeContext);
    const context = React.useContext(DropdownContext);

    function handleClick() {
      if (context.activeItemIndex >= 0) {
        context.setActiveItemIndex(index);
      }

      if (onClick && !isDisabled) {
        onClick(value);
      }

      if (!isDisabled && context.activeItemIndex < 0) {
        context.closeDropdown();
      }
    }

    function handleKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    }

    const isActive =
      context.activeItemIndex >= 0 && context.activeItemIndex === index;

    const isInactive =
      context.activeItemIndex >= 0 && context.activeItemIndex !== index;

    return (
      <StyledItem
        {...other}
        aria-disabled={isDisabled}
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
        {icon && <IconWrapper>{icon}</IconWrapper>}
        {isActive && (
          <IconWrapper>
            <CheckIcon />
          </IconWrapper>
        )}
        {children}
      </StyledItem>
    );
  }
);

DropdownMenuItem.displayName = 'DropdownMenuItem';
