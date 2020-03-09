import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { DropdownContext } from '.';
import { IconProps } from '../Icon/utils';

export interface DropdownMenuItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  icon?: React.ReactElement<IconProps>;
  isDisabled?: boolean;
  onClick?: () => void;
}

const StyledItem = styled.li<{ isDisabled?: boolean; isFixedWidth?: boolean }>`
  color: ${props =>
    props.isDisabled
      ? props.theme.colors.disabledText
      : props.theme.colors.neutral02};
  cursor: ${props => (props.isDisabled ? 'not-allowed' : 'pointer')};
  display: flex;
  line-height: 20px;
  list-style: none;
  margin: 0;
  padding: 10px 20px;
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
> = ({ children, isDisabled, icon, onClick, ...other }) => {
  const theme = React.useContext(ThemeContext);
  const context = React.useContext(DropdownContext);

  function handleClick() {
    if (onClick && !isDisabled) {
      onClick();
    }
  }

  return (
    <StyledItem
      {...other}
      isDisabled={isDisabled}
      isFixedWidth={context.isFixedWidth}
      onClick={handleClick}
      role="menuitem"
      theme={theme}
      tabIndex={-1}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </StyledItem>
  );
};
