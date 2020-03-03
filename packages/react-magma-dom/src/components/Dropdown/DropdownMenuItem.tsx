import * as React from 'react';
import styled from '../../theme/styled';
import { ThemeContext } from '../../theme/ThemeContext';
import { DropdownContext } from '.';
import { IconProps } from '../Icon/utils';

export interface DropdownMenuItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  icon?: React.ReactElement<IconProps>;
  onClick?: () => void;
}

const StyledItem = styled.li<{ isFixedWidth?: boolean }>`
  color: ${props => props.theme.colors.neutral02};
  cursor: pointer;
  display: flex;
  line-height: 18px;
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
> = ({ children, icon, onClick, ...other }) => {
  const theme = React.useContext(ThemeContext);
  const context = React.useContext(DropdownContext);

  function handleClick() {
    console.log('CLICK IT');
    onClick();
  }

  return (
    <StyledItem
      {...other}
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
